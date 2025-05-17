import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { ProcessedRfiPoint, CategoriesHierarchy, RfiStructure, RfiSection, RfiSubsection, RfiQuestion, CrossCuttingPrinciple } from '../types';
import FilterPanel, { PRINCIPLE_FILTER_PREFIX } from './FilterPanel';
import ResponseCard from './ResponseCard';
import { LocState, buildHash } from '../hooks/useHashLocation';

interface ResponseBrowserPageProps {
  loc: LocState;
  setLoc: (draft: Partial<LocState>, push?: boolean) => void;
  allRfiPoints: ProcessedRfiPoint[];
  categoriesHierarchy: CategoriesHierarchy;
  rfiStructure: RfiStructure;
  crossCuttingPrinciples: CrossCuttingPrinciple[];
}

const ResponseBrowserPage: React.FC<ResponseBrowserPageProps> = ({
  loc,
  setLoc,
  allRfiPoints,
  categoriesHierarchy,
  rfiStructure,
  crossCuttingPrinciples,
}) => {
  const [categoryCounts, setCategoryCounts] = useState<Map<string, number>>(new Map());

  useEffect(() => {
    const catCounts = new Map<string, number>();
    allRfiPoints.forEach(point => {
      point.categoryIds.forEach(catId => {
        catCounts.set(catId, (catCounts.get(catId) || 0) + 1);
      });
    });
    setCategoryCounts(catCounts);
  }, [allRfiPoints]);

  const { activeCategoryFilters, activePrincipleFilters } = useMemo(() => {
    const cats = new Set<string>();
    const ccp = new Set<string>();
    loc.filters.forEach(f => {
      if (f.startsWith(PRINCIPLE_FILTER_PREFIX)) {
        ccp.add(f.substring(PRINCIPLE_FILTER_PREFIX.length));
      } else {
        cats.add(f);
      }
    });
    return { activeCategoryFilters: cats, activePrincipleFilters: ccp };
  }, [loc.filters]);

  const filteredRfiPoints = useMemo(() => {
    if (loc.filters.size === 0) {
      return allRfiPoints;
    }
    return allRfiPoints.filter(point => {
      const matchesCategories = activeCategoryFilters.size === 0 || 
        Array.from(activeCategoryFilters).some(filter => point.categoryIds.has(filter));
      
      const matchesPrinciples = activePrincipleFilters.size === 0 ||
        Array.from(activePrincipleFilters).some(filterKey => point.referenced_principles.includes(filterKey));

      return matchesCategories && matchesPrinciples;
    });
  }, [allRfiPoints, loc.filters, activeCategoryFilters, activePrincipleFilters]);

  const pointsByQuestion = useMemo(() => {
    const map = new Map<string, ProcessedRfiPoint[]>();
    filteredRfiPoints.forEach(point => {
      const existing = map.get(point.rfi_question_code) || [];
      existing.push(point);
      map.set(point.rfi_question_code, existing);
    });
    return map;
  }, [filteredRfiPoints]);

  const handleFilterChange = useCallback((filterId: string, isActive: boolean) => {
    const newFilters = new Set(loc.filters);
    const isPrincipleFilter = filterId.startsWith(PRINCIPLE_FILTER_PREFIX);

    if (!isPrincipleFilter) {
      let targetGroupId: string | undefined = undefined;
      for (const group of categoriesHierarchy.category_groups) {
        if (group.categories.some(cat => cat.id === filterId)) {
          targetGroupId = group.group_id;
          break;
        }
      }
      if (targetGroupId) {
        newFilters.forEach(activeFilterId => {
          if (activeFilterId.startsWith(PRINCIPLE_FILTER_PREFIX)) return;
          let activeFilterGroupId: string | undefined = undefined;
          for (const group of categoriesHierarchy.category_groups) {
            if (group.categories.some(cat => cat.id === activeFilterId)) {
              activeFilterGroupId = group.group_id;
              break;
            }
          }
          if (activeFilterGroupId === targetGroupId && activeFilterId !== filterId) {
            newFilters.delete(activeFilterId);
          }
        });
      }
    }
    
    if (isActive) {
      newFilters.add(filterId);
    } else {
      newFilters.delete(filterId);
    }
    
    setLoc({ filters: newFilters });
  }, [categoriesHierarchy, setLoc, loc.filters, loc.page, loc.anchor]);

  const handleClearFilters = useCallback(() => {
    setLoc({ filters: new Set() });
  }, [setLoc]);

  const handleCategoryTagClick = useCallback((categoryId: string) => {
    const newFilters = new Set([categoryId]);
    setLoc({ filters: newFilters, anchor: 'filter-panel' });
  }, [setLoc]);

  const sanitizeForId = (text: string) => text.replace(/\W/g, '-');

  return (
    <div className="response-browser-page">
      <FilterPanel 
        categoriesHierarchy={categoriesHierarchy}
        crossCuttingPrinciples={crossCuttingPrinciples} 
        allRfiPoints={allRfiPoints} 
        categoryCounts={categoryCounts} 
        loc={loc}
        setLoc={setLoc}
        buildHash={buildHash}
      />
      <div className="rfi-content-area">
        {rfiStructure.map((section: RfiSection) => {
          const sectionId = `rfi-sec-${sanitizeForId(section.section_id)}`;
          const renderableSubsections = section.subsections.map(subsection => {
            const subsectionId = `rfi-subsec-${sanitizeForId(section.section_id)}-${sanitizeForId(subsection.subsection_id)}`;
            const renderableQuestions = subsection.questions.map(question => {
              const questionId = `rfi-q-${sanitizeForId(question.question_id)}`;
              const relevantPoints = pointsByQuestion.get(question.question_id) || [];
              
              if (relevantPoints.length === 0) return null;

              return (
                <div key={questionId} className="rfi-question-block">
                  <h4 id={questionId} className="rfi-question-header">
                    {question.question_id}: {question.summary_text}
                    <a href={`#${questionId}`} className="deep-link-icon" aria-label={`Link to question ${question.question_id}`}>#</a>
                  </h4>
                  <div className="response-list">
                    {relevantPoints.map(point => {
                      const cardId = `point-${sanitizeForId(point.id)}`;
                      return (
                        <ResponseCard 
                          key={point.id} 
                          point={point} 
                          onCategoryClick={handleCategoryTagClick} 
                          cardId={cardId}
                          crossCuttingPrinciples={crossCuttingPrinciples}
                          loc={loc}
                          buildHash={buildHash}
                        />
                      );
                    })}
                  </div>
                </div>
              );
            }).filter(Boolean);

            if (renderableQuestions.length === 0) return null;

            return (
              <div key={subsectionId} className="rfi-subsection-block">
                <h3 id={subsectionId} className="rfi-subsection-header">
                  {subsection.subsection_id} {subsection.subsection_title}
                  <a href={`#${subsectionId}`} className="deep-link-icon" aria-label={`Link to subsection ${subsection.subsection_id}`}>#</a>
                </h3>
                {renderableQuestions}
              </div>
            );
          }).filter(Boolean);

          if (renderableSubsections.length === 0) return null;

          return (
            <div key={sectionId} className="rfi-section-block">
              <h2 id={sectionId} className="rfi-section-header">
                {section.section_id}. {section.section_title}
                <a href={`#${sectionId}`} className="deep-link-icon" aria-label={`Link to section ${section.section_id}`}>#</a>
              </h2>
              {renderableSubsections}
            </div>
          );
        }).filter(Boolean)}
        {filteredRfiPoints.length === 0 && loc.filters.size > 0 && (
          <p>No RFI points match the current filter criteria.</p>
        )}
        {allRfiPoints.length === 0 && (
          <p>No RFI points available.</p>
        )}
      </div>
    </div>
  );
};

export default ResponseBrowserPage; 