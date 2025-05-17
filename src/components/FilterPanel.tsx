import React, { useState, useEffect, useMemo } from 'react';
import { CategoriesHierarchy, CategoryGroup, Category, CrossCuttingPrinciple, ProcessedRfiPoint } from '../types';

export const PRINCIPLE_FILTER_PREFIX = 'ccp:';

interface FilterPanelProps {
  categoriesHierarchy: CategoriesHierarchy;
  crossCuttingPrinciples: CrossCuttingPrinciple[];
  allRfiPoints: ProcessedRfiPoint[];
  activeFilters: Set<string>;
  onFilterChange: (filterId: string, isActive: boolean) => void;
  onClearFilters: () => void;
  categoryCounts: Map<string, number>;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ 
  categoriesHierarchy, 
  crossCuttingPrinciples,
  allRfiPoints,
  activeFilters, 
  onFilterChange, 
  onClearFilters, 
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

  return (
    <div className="filter-panel">
      <div className="filter-panel-header">
        <h3>Filter Options</h3>
        <button onClick={onClearFilters} disabled={activeFilters.size === 0}>
          Clear All Filters
        </button>
      </div>
      
      <div className="filter-section">
        <h4 onClick={() => setExpandedCategoryGroups(prev => prev.size === sortedCategoryGroups.length ? new Set() : new Set(sortedCategoryGroups.map(g => g.group_id)))} className="filter-section-header">
            Filter by Category {expandedCategoryGroups.size === sortedCategoryGroups.length ? '▼' : '▶'}
        </h4>
        {sortedCategoryGroups.map((group: CategoryGroup) => (
          <div key={group.group_id} className="filter-group">
            <h5 onClick={() => toggleCategoryGroup(group.group_id)}>
              {group.group_name} {expandedCategoryGroups.has(group.group_id) ? '▼' : '▶'}
            </h5>
            {expandedCategoryGroups.has(group.group_id) && (
              <ul>
                {group.categories.map((category: Category) => {
                  const displayCount = categoryCounts.get(category.id) || 0;
                  return (
                    <li key={category.id}>
                      <label title={`${category.name} - ${displayCount} item${displayCount === 1 ? '' : 's'}`}>
                        <input 
                          type="checkbox" 
                          checked={activeFilters.has(category.id)}
                          onChange={(e) => onFilterChange(category.id, e.target.checked)}
                          disabled={displayCount === 0 && !activeFilters.has(category.id)}
                        />
                        <span className="filter-item-title">{category.name}</span>
                        <span className="filter-item-count">({displayCount})</span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        ))}
      </div>

      {sortedPrinciples.length > 0 && (
        <div className="filter-section principle-filter-section">
          <h4 onClick={() => setIsPrinciplesExpanded(!isPrinciplesExpanded)} className="filter-section-header">
            Cross-Cutting Principles {isPrinciplesExpanded ? '▼' : '▶'}
          </h4>
          {isPrinciplesExpanded && (
            <div className="filter-group">
              <ul>
                {sortedPrinciples.map((principle: CrossCuttingPrinciple) => {
                  const displayCount = principleCounts.get(principle.key) || 0;
                  const filterKey = `${PRINCIPLE_FILTER_PREFIX}${principle.key}`;
                  return (
                    <li key={principle.key}>
                      <label title={`${principle.title} (${principle.key}) - ${displayCount} item${displayCount === 1 ? '' : 's'}`}>
                        <input 
                          type="checkbox" 
                          checked={activeFilters.has(filterKey)}
                          onChange={(e) => onFilterChange(filterKey, e.target.checked)}
                          disabled={displayCount === 0 && !activeFilters.has(filterKey)}
                        />
                        <span className="filter-item-title">{principle.title}</span>
                        <span className="filter-item-count">({displayCount})</span>
                      </label>
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