import React, { useState, useMemo } from 'react';
import { RfiPoint, CategoriesHierarchy } from '../types';
import FilterPanel from './FilterPanel';
import ResponseList from './ResponseList'; // Imported

interface ResponseBrowserPageProps {
  allRfiPoints: RfiPoint[];
  categoriesHierarchy: CategoriesHierarchy;
}

const ResponseBrowserPage: React.FC<ResponseBrowserPageProps> = ({ allRfiPoints, categoriesHierarchy }) => {
  const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set());

  const filteredRfiPoints = useMemo(() => {
    if (activeFilters.size === 0) {
      return allRfiPoints; // Show all if no filters are active
    }
    const activeFilterArray = Array.from(activeFilters); 
    // OR logic: Include if the point's categories array contains AT LEAST ONE of the active filter IDs.
    return allRfiPoints.filter(point => 
      activeFilterArray.some(filterId => point.categories.includes(filterId))
    );
  }, [allRfiPoints, activeFilters]);

  const handleFilterChange = (filterId: string, isActive: boolean) => {
    setActiveFilters(prevFilters => {
      const newFilters = new Set(prevFilters);
      if (isActive) {
        newFilters.add(filterId);
      } else {
        newFilters.delete(filterId);
      }
      return newFilters;
    });
  };

  const handleClearFilters = () => {
    setActiveFilters(new Set());
  };

  // Placeholder for actual components
  // const MockFilterPanel = () => ( ... ); // Removed MockFilterPanel

  return (
    <div className="response-browser-page">
      <FilterPanel 
        categoriesHierarchy={categoriesHierarchy} 
        activeFilters={activeFilters} 
        onFilterChange={handleFilterChange} 
        onClearFilters={handleClearFilters} 
      />
      <ResponseList rfiPoints={filteredRfiPoints} /> {/* Used actual component */}
      {/* <MockFilterPanel /> */}
    </div>
  );
};

export default ResponseBrowserPage; 