import React, { useState, useEffect } from 'react';
import { CategoriesHierarchy, CategoryGroup, Category } from '../types';

interface FilterPanelProps {
  categoriesHierarchy: CategoriesHierarchy;
  activeFilters: Set<string>;
  onFilterChange: (filterId: string, isActive: boolean) => void;
  onClearFilters: () => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ 
  categoriesHierarchy, 
  activeFilters, 
  onFilterChange, 
  onClearFilters 
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

  // Initialize all groups to be expanded by default
  useEffect(() => {
    const initialExpanded = new Set<string>();
    if (categoriesHierarchy && categoriesHierarchy.category_groups) {
        categoriesHierarchy.category_groups.forEach(group => initialExpanded.add(group.group_id));
    }
    setExpandedGroups(initialExpanded);
  }, [categoriesHierarchy]);

  return (
    <div className="filter-panel">
      <div className="filter-panel-header">
        <h3>Filter by Category</h3>
        <button onClick={onClearFilters} disabled={activeFilters.size === 0}>
          Clear All Filters
        </button>
      </div>
      {categoriesHierarchy.category_groups.map((group: CategoryGroup) => (
        <div key={group.group_id} className="filter-group">
          <h4 onClick={() => toggleGroup(group.group_id)}>
            {group.group_name} {expandedGroups.has(group.group_id) ? '▼' : '▶'}
          </h4>
          {expandedGroups.has(group.group_id) && (
            <ul>
              {group.categories.map((category: Category) => (
                <li key={category.id}>
                  <label>
                    <input 
                      type="checkbox" 
                      checked={activeFilters.has(category.id)}
                      onChange={(e) => onFilterChange(category.id, e.target.checked)}
                    />
                    {category.name}
                  </label>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default FilterPanel; 