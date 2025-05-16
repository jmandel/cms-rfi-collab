import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { RfiPoint, CategoriesHierarchy, RfiStructure, RfiSection, RfiSubsection, RfiQuestion } from '../types';
import FilterPanel from './FilterPanel';
import ResponseCard from './ResponseCard';

interface ResponseBrowserPageProps {
  allRfiPoints: RfiPoint[];
  categoriesHierarchy: CategoriesHierarchy;
  rfiStructure: RfiStructure;
}

const ResponseBrowserPage: React.FC<ResponseBrowserPageProps> = ({ allRfiPoints, categoriesHierarchy, rfiStructure }) => {
  // Initialize activeFilters from URL query parameters
  const getFiltersFromUrl = (): Set<string> => {
    const params = new URLSearchParams(window.location.search);
    const filtersParam = params.get('filters');
    if (filtersParam) {
      return new Set(filtersParam.split(',').filter(Boolean)); // filter(Boolean) to remove empty strings if any
    }
    return new Set();
  };

  const [activeFilters, setActiveFilters] = useState<Set<string>>(getFiltersFromUrl);

  // Update URL when activeFilters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (activeFilters.size > 0) {
      params.set('filters', Array.from(activeFilters).join(','));
    }
    // Use replaceState to avoid polluting history for every filter change, 
    // or pushState if you want each distinct filter state in history.
    // For typical filter UX, replaceState is often preferred.
    history.replaceState(null, '', activeFilters.size > 0 ? `?${params.toString()}` : window.location.pathname);
  }, [activeFilters]);

  // Listen to popstate event (browser back/forward)
  useEffect(() => {
    const handlePopState = () => {
      setActiveFilters(getFiltersFromUrl());
    };
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []); // Empty dependency array means this runs once on mount and cleans up on unmount

  const filteredRfiPoints = useMemo(() => {
    if (activeFilters.size === 0) {
      return allRfiPoints;
    }
    const activeFilterArray = Array.from(activeFilters);
    return allRfiPoints.filter(point => 
      activeFilterArray.some(filterId => 
        point.categoryIds?.has(filterId)
      )
    );
  }, [allRfiPoints, activeFilters]);

  // Wrapped in useCallback to stabilize the function reference if passed to memoized children
  const handleFilterChange = useCallback((filterId: string, isActive: boolean) => {
    setActiveFilters(prevFilters => {
      let newFilters = new Set(prevFilters);
      let targetGroupId: string | undefined = undefined;

      // Find the group of the clicked filterId
      for (const group of categoriesHierarchy.category_groups) {
        if (group.categories.some(cat => cat.id === filterId)) {
          targetGroupId = group.group_id;
          break;
        }
      }

      if (targetGroupId) {
        // If a filter is being activated, or if it's being deactivated but was part of the target group
        // Clear filters from other groups
        const filtersToKeep = new Set<string>();
        prevFilters.forEach(activeFilterId => {
          let activeFilterGroupId: string | undefined = undefined;
          for (const group of categoriesHierarchy.category_groups) {
            if (group.categories.some(cat => cat.id === activeFilterId)) {
              activeFilterGroupId = group.group_id;
              break;
            }
          }
          if (activeFilterGroupId === targetGroupId) {
            filtersToKeep.add(activeFilterId);
          }
        });
        newFilters = filtersToKeep;
      }
      
      // Now, apply the change for the clicked filterId
      if (isActive) {
        newFilters.add(filterId);
      } else {
        newFilters.delete(filterId);
      }
      
      return newFilters;
    });
  }, [categoriesHierarchy]); // Added categoriesHierarchy to dependencies

  const handleClearFilters = useCallback(() => {
    setActiveFilters(new Set());
  }, []);

  const handleCategoryTagClick = useCallback((categoryId: string) => {
    setActiveFilters(new Set([categoryId]));
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  // Group filtered RFI points by their rfi_question_code
  const pointsByQuestion = useMemo(() => {
    const grouped: { [key: string]: RfiPoint[] } = {};
    filteredRfiPoints.forEach(point => {
      if (!grouped[point.rfi_question_code]) {
        grouped[point.rfi_question_code] = [];
      }
      grouped[point.rfi_question_code].push(point);
    });
    return grouped;
  }, [filteredRfiPoints]);

  const categoryCountsFromAllPoints = useMemo(() => {
    const counts = new Map<string, number>();
    allRfiPoints.forEach(point => { // Iterate over allRfiPoints
      point.categoryIds?.forEach(catId => {
        counts.set(catId, (counts.get(catId) || 0) + 1);
      });
    });
    return counts;
  }, [allRfiPoints]); // Dependency is allRfiPoints

  return (
    <div className="response-browser-page">
      <FilterPanel 
        categoriesHierarchy={categoriesHierarchy} 
        activeFilters={activeFilters} 
        onFilterChange={handleFilterChange} 
        onClearFilters={handleClearFilters} 
        categoryCounts={categoryCountsFromAllPoints} // Use static counts for display and disabling logic
        categoryCountsForSorting={categoryCountsFromAllPoints} // Use static counts for stable sorting
      />
      <div className="rfi-content-area">
        {rfiStructure.map((section: RfiSection) => {
          const renderableSubsections = section.subsections.map(subsection => {
            const renderableQuestions = subsection.questions.map(question => {
              const relevantPoints = pointsByQuestion[question.question_id] || [];
              // Always omit question if it has no relevant points for the current view (filtered or unfiltered)
              if (relevantPoints.length === 0) {
                return null; 
              }
              const questionIdAnchor = `rfi-q-${question.question_id}`;
              return (
                <article key={question.question_id} className="rfi-question">
                  <h4 id={questionIdAnchor}>
                    {question.question_id}: {question.summary_text}
                    <a href={`#${questionIdAnchor}`} className="deep-link-icon" aria-label="Link to this question">#</a>
                  </h4>
                  {/* If we reach here, relevantPoints.length > 0, so just render them */}
                  <div className="response-list">
                    {relevantPoints.map(point => (
                      <ResponseCard 
                        key={point.id} 
                        point={point} 
                        onCategoryClick={handleCategoryTagClick}
                      />
                    ))}
                  </div>
                </article>
              );
            }).filter(Boolean); // Remove nulls (omitted questions)

            if (renderableQuestions.length === 0) {
              return null; // Omit subsection if no renderable questions
            }

            return (
              <section key={subsection.subsection_id} className="rfi-subsection">
                <h3 id={`rfi-subsec-${subsection.subsection_id}`}>
                  {subsection.subsection_id}: {subsection.subsection_title}
                  <a href={`#rfi-subsec-${subsection.subsection_id}`} className="deep-link-icon" aria-label="Link to this subsection">#</a>
                </h3>
                {renderableQuestions}
              </section>
            );
          }).filter(Boolean); // Remove nulls (omitted subsections)

          if (renderableSubsections.length === 0) {
            return null; // Omit section if no renderable subsections
          }

          return (
            <section key={section.section_id} className="rfi-section">
              <h2 id={`rfi-sec-${section.section_id}`}>
                {section.section_id}: {section.section_title}
                <a href={`#rfi-sec-${section.section_id}`} className="deep-link-icon" aria-label="Link to this section">#</a>
              </h2>
              {renderableSubsections}
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default ResponseBrowserPage; 