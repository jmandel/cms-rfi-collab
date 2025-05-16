import React, { useState, useEffect, useMemo } from 'react';
import { CategoriesHierarchy, CategoryGroup, Category } from '../types';

interface FilterPanelProps {
  categoriesHierarchy: CategoriesHierarchy;
  activeFilters: Set<string>;
  onFilterChange: (filterId: string, isActive: boolean) => void;
  onClearFilters: () => void;
  categoryCounts: Map<string, number>;
  categoryCountsForSorting: Map<string, number>;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ 
  categoriesHierarchy, 
  activeFilters, 
  onFilterChange, 
  onClearFilters, 
  categoryCounts,
  categoryCountsForSorting
}) => {
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

  const toggleGroup = (groupId: string) => {
    setExpandedGroups(prev => {
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
    setExpandedGroups(initialExpanded);
  }, [categoriesHierarchy]);

  const sortedCategoryGroups = useMemo(() => {
    return categoriesHierarchy.category_groups.map(group => ({
      ...group,
      categories: [...group.categories].sort((a, b) => {
        const countA = categoryCountsForSorting.get(a.id) || 0;
        const countB = categoryCountsForSorting.get(b.id) || 0;
        if (countB !== countA) {
          return countB - countA;
        }
        return a.name.localeCompare(b.name);
      })
    }));
  }, [categoriesHierarchy, categoryCountsForSorting]);

  return (
    <div className="filter-panel">
      <div className="filter-panel-header">
        <h3>Filter by Category</h3>
        <button onClick={onClearFilters} disabled={activeFilters.size === 0}>
          Clear All Filters
        </button>
      </div>
      {sortedCategoryGroups.map((group: CategoryGroup) => {
        return (
          <div key={group.group_id} className="filter-group">
            <h4 onClick={() => toggleGroup(group.group_id)}>
              {group.group_name} {expandedGroups.has(group.group_id) ? '▼' : '▶'}
            </h4>
            {expandedGroups.has(group.group_id) && (
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
                        {category.name} ({displayCount})
                      </label>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default FilterPanel; 