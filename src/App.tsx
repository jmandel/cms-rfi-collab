// src/App.tsx
import React from 'react';
import { RfiPoint, CategoriesHierarchy, RfiStructure } from './types';
import ResponseBrowserPage from './components/ResponseBrowserPage';

// Directly import the JSON data
// Note: Adjust paths if your bundler configuration or file structure is different
// Bun should handle these imports and bundle the JSON content.
import rfiPointsData from '../public/build/db.json';
import categoriesHierarchyData from '../public/data/categories_hierarchy.json';
import rfiStructureData from '../public/data/rfi.json';

// Cast the imported data and pre-process RFI points
const rawRfiPoints: Omit<RfiPoint, 'categoryIds'>[] = rfiPointsData as Omit<RfiPoint, 'categoryIds'>[];

const allRfiPoints: RfiPoint[] = rawRfiPoints.map(point => ({
  ...point,
  categoryIds: new Set(point.categories.map(catString => catString.split(':').pop() || ''))
}));

const categoriesHierarchy: CategoriesHierarchy = categoriesHierarchyData as CategoriesHierarchy;
const rfiStructure: RfiStructure = rfiStructureData as RfiStructure;

function App() {
  // No need for useState for data, isLoading, or error if data is imported directly

  if (!allRfiPoints || !categoriesHierarchy || !rfiStructure) {
    // This case should ideally not be hit if imports are successful
    // and files exist at build time.
    return <p className="error-message">Error: Data could not be loaded. Check build process and file paths.</p>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>CMS RFI: SMART Response Browser</h1>
        {/* Links to RFI info, GitHub repo can be added here */}
      </header>

      {/* Data is now loaded at build time, so no loading/error states for fetching */}
      <ResponseBrowserPage 
        allRfiPoints={allRfiPoints} 
        categoriesHierarchy={categoriesHierarchy} 
        rfiStructure={rfiStructure}
      />

      <footer>
        <p>Site Footer</p>
      </footer>
    </div>
  );
}

export default App; 