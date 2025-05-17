import React, { useState, useEffect, useMemo } from 'react';
import { CategoriesHierarchy, CategoryGroup, Category, CrossCuttingPrinciple, ProcessedRfiPoint } from '../types';
import { LocState, buildHash as importedBuildHash } from '../hooks/useHashLocation'; // Renamed to avoid conflict if also passed as prop

export const PRINCIPLE_FILTER_PREFIX = 'ccp:';

interface FilterPanelProps {
  loc: LocState;
  setLoc: (draft: Partial<LocState>, push?: boolean) => void;
  buildHash: (state: LocState) => string; // Expect buildHash as a prop
  categoriesHierarchy: CategoriesHierarchy;
  crossCuttingPrinciples: CrossCuttingPrinciple[];
  allRfiPoints: ProcessedRfiPoint[];
  categoryCounts: Map<string, number>;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ 
  loc,
  setLoc,
  buildHash, // Use passed buildHash prop
  categoriesHierarchy, 
  crossCuttingPrinciples,
  allRfiPoints,
  categoryCounts,
}) => {
  const [expandedCategoryGroups, setExpandedCategoryGroups] = useState<Set<string>>(new Set());
  const [isPrinciplesExpanded, setIsPrinciplesExpanded] = useState<boolean>(true);

  const toggleCategoryGroup = (groupId: string) => {
    setExpandedCategoryGroups(prev => {
      const newSet = new Set(prev);
      if (newSet.has(groupId)) {
        newSet.delete(groupId);
      } else {
        newSet.add(groupId);
      }
      return newSet;
    });
  };

  useEffect(() => {
    const initialExpanded = new Set<string>();
    if (categoriesHierarchy && categoriesHierarchy.category_groups) {
        categoriesHierarchy.category_groups.forEach(group => initialExpanded.add(group.group_id));
    }
    setExpandedCategoryGroups(initialExpanded);
  }, [categoriesHierarchy]);

  const sortedCategoryGroups = useMemo(() => {
    return categoriesHierarchy.category_groups.map(group => ({
      ...group,
      categories: [...group.categories].sort((a, b) => {
        const countA = categoryCounts.get(a.id) || 0;
        const countB = categoryCounts.get(b.id) || 0;
        if (countB !== countA) {
          return countB - countA;
        }
        return a.name.localeCompare(b.name);
      })
    })).sort((a,b) => a.group_name.localeCompare(b.group_name));
  }, [categoriesHierarchy, categoryCounts]);

  const principleCounts = useMemo(() => {
    const counts = new Map<string, number>();
    if (allRfiPoints && crossCuttingPrinciples) {
      crossCuttingPrinciples.forEach(principle => {
        const count = allRfiPoints.filter(point => point.referenced_principles.includes(principle.key)).length;
        counts.set(principle.key, count);
      });
    }
    return counts;
  }, [allRfiPoints, crossCuttingPrinciples]);

  const sortedPrinciples = useMemo(() => {
    return [...crossCuttingPrinciples].sort((a,b) => {
      const countA = principleCounts.get(a.key) || 0;
      const countB = principleCounts.get(b.key) || 0;
      if (countB !== countA) {
        return countB - countA;
      }
      return a.title.localeCompare(b.title);
    });
  }, [crossCuttingPrinciples, principleCounts]);

  const handleFilterItemClick = (filterId: string, isPrinciple: boolean, /* categoryGroupId?: string */) => {
    const newFilters = new Set(loc.filters);

    if (!isPrinciple) {
      // Single selection across ALL category filters
      // First, collect all *current* category filters to check if the clicked one is active
      const currentCategoryFilters = new Set<string>();
      loc.filters.forEach(f => {
        if (!f.startsWith(PRINCIPLE_FILTER_PREFIX)) {
          currentCategoryFilters.add(f);
        }
      });

      // Clear all existing category filters from newFilters
      currentCategoryFilters.forEach(f => newFilters.delete(f));

      // If the clicked filter was not the one just cleared (or if no category filter was active),
      // add it. This achieves toggling: click active to deactivate, click inactive to activate (and deactivate others).
      if (!currentCategoryFilters.has(filterId) || currentCategoryFilters.size > 1) { // size > 1 condition is redundant if we clear all first
         newFilters.add(filterId);
      } // If currentCategoryFilters.has(filterId) and size was 1, it means it was the sole active one, and clearing it above achieved deselection.
      
    } else {
      // Principle filters: toggle as before (multi-select)
      if (newFilters.has(filterId)) {
        newFilters.delete(filterId);
      } else {
        newFilters.add(filterId);
      }
    }

    setLoc({ filters: newFilters });
  };

  return (
    <div className="filter-panel" id="filter-panel">
      <div className="filter-panel-header">
        <h3>Filter Options</h3>
        <a 
          href={`#${buildHash({ ...loc, filters: new Set() })}`}
          onClick={(e) => { 
            e.preventDefault(); 
            setLoc({ filters: new Set() }); 
          }}
          className={`clear-filters-link ${loc.filters.size === 0 ? 'disabled-link' : ''}`}
          aria-disabled={loc.filters.size === 0}
        >
          Clear All Filters
        </a>
      </div>
      
      {sortedCategoryGroups.map((group: CategoryGroup) => (
        <div key={group.group_id} className="filter-group filter-section">
          <h5 onClick={() => toggleCategoryGroup(group.group_id)}>
            {group.group_name} {expandedCategoryGroups.has(group.group_id) ? '▼' : '▶'}
          </h5>
          {expandedCategoryGroups.has(group.group_id) && (
            <ul className="filter-list">
              {group.categories.map((category: Category) => {
                const displayCount = categoryCounts.get(category.id) || 0;
                const isActive = loc.filters.has(category.id);
                
                // Logic for Href (simulates the click for direct navigation / new tab)
                const newFiltersForHref = new Set(loc.filters);
                // Clear all *other* category filters for href
                loc.filters.forEach(f => {
                  if (!f.startsWith(PRINCIPLE_FILTER_PREFIX) && f !== category.id) {
                    newFiltersForHref.delete(f);
                  }
                });
                // Toggle the current category.id for href
                if (newFiltersForHref.has(category.id)) { // If it's still there (was the one clicked or only one active)
                  newFiltersForHref.delete(category.id); 
                } else {
                  newFiltersForHref.add(category.id); // Add it if it wasn't active or was cleared with others
                }
                
                const targetHash = buildHash({ ...loc, filters: newFiltersForHref });

                return (
                  <li key={category.id} className={`filter-item ${isActive ? 'active' : ''} ${displayCount === 0 && !isActive ? 'disabled' : ''}`}>
                    <a 
                      href={`#${targetHash}`}
                      onClick={(e) => {
                        e.preventDefault();
                        if (!(displayCount === 0 && !isActive)) { // Prevent action if disabled
                          handleFilterItemClick(category.id, false /*, group.group_id */); // categoryGroupId no longer needed here
                        }
                      }}
                      className={`filter-action-link ${isActive ? 'active' : ''}`}
                      aria-current={isActive ? 'page' : undefined} // 'page' is better for current links
                      aria-disabled={displayCount === 0 && !isActive}
                    >
                      <span className="filter-item-title">{category.name}</span>
                      <span className="filter-item-count">({displayCount})</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      ))}

      {sortedPrinciples.length > 0 && (
        <div className="filter-section principle-filter-section">
          <h4 onClick={() => setIsPrinciplesExpanded(!isPrinciplesExpanded)} className="filter-section-header">
            Cross-Cutting Principles {isPrinciplesExpanded ? '▼' : '▶'}
          </h4>
          {isPrinciplesExpanded && (
            <div className="filter-group">
              <ul className="filter-list"> {/* Changed class to filter-list */}
                {sortedPrinciples.map((principle: CrossCuttingPrinciple) => {
                  const displayCount = principleCounts.get(principle.key) || 0;
                  const filterKey = `${PRINCIPLE_FILTER_PREFIX}${principle.key}`;
                  const isActive = loc.filters.has(filterKey);
                  
                  const newFiltersForHref = new Set(loc.filters);
                  // For principles, assume multi-select still, so just toggle for href
                  if (newFiltersForHref.has(filterKey)) newFiltersForHref.delete(filterKey);
                  else newFiltersForHref.add(filterKey);
                  const targetHash = buildHash({ ...loc, filters: newFiltersForHref });

                  return (
                    <li key={principle.key} className={`filter-item ${isActive ? 'active' : ''} ${displayCount === 0 && !isActive ? 'disabled' : ''}`}>
                      <a 
                        href={`#${targetHash}`}
                        onClick={(e) => {
                          e.preventDefault();
                          if (!(displayCount === 0 && !isActive)) { // Prevent action if disabled
                             handleFilterItemClick(filterKey, true);
                          }
                        }}
                        className={`filter-action-link ${isActive ? 'active' : ''}`}
                        aria-current={isActive ? 'page' : undefined}
                        aria-disabled={displayCount === 0 && !isActive}
                      >
                        <span className="filter-item-title">{principle.title}</span>
                        <span className="filter-item-count">({displayCount})</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterPanel; 