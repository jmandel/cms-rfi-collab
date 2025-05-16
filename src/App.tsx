// src/App.tsx
import React from 'react';
import { CategoriesHierarchy, RfiPoint, ProcessedRfiPoint, RfiStructure } from './types';
import ResponseBrowserPage from './components/ResponseBrowserPage';

// Directly import the JSON data
// Note: Adjust paths if your bundler configuration or file structure is different
// Bun should handle these imports and bundle the JSON content.
import rawRfiPoints from '../public/build/db.json';
import rawCategoriesHierarchy from '../public/data/categories_hierarchy.json';
import rawRfiStructure from '../public/data/rfi.json';

// Type assertion for safety, using RfiPoint from types/index.ts
const rfiPointsData = rawRfiPoints as RfiPoint[];
const categoriesHierarchyData = rawCategoriesHierarchy as CategoriesHierarchy;
const rfiStructureData = rawRfiStructure as RfiStructure;

// Pre-process RFI points to include categoryIds as a Set for faster filtering
// The type ProcessedRfiPoint[] for processedRfiPoints ensures the transformation is correct.
const processedRfiPoints: ProcessedRfiPoint[] = rfiPointsData.map(point => ({
  ...point,
  // Ensure categories exists and is an array before mapping. If point.categories can be undefined, handle it.
  // Assuming point.categories is always string[] as per RfiPoint type.
  categoryIds: new Set((point.categories || []).map(cat => cat.split(':').pop()!).filter(Boolean))
}));

function App() {
  const readmeIntroLink = "https://github.com/jmandel/cms-rfi-collab/blob/main/README.md#introduction-responding-to-the-cms-health-technology-ecosystem-rfi";

  if (!processedRfiPoints || !categoriesHierarchyData || !rfiStructureData) {
    // This basic check might not be sufficient if files are empty but valid JSON (e.g., [])
    // A more robust check would be for length if arrays are expected to be non-empty
    console.error("Data loading error: One or more data files might be empty or missing.");
    return <p className="error-message">Error: Data could not be loaded. Check build process and file paths.</p>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>CMS RFI: Draft Response Browser</h1>
        <a 
          href={readmeIntroLink} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="about-link"
          title="About this application (opens README on GitHub)"
          aria-label="About this application (opens README on GitHub)"
        >
          About
        </a>
      </header>

      {/* Data is now loaded at build time, so no loading/error states for fetching */}
      <ResponseBrowserPage 
        allRfiPoints={processedRfiPoints}
        categoriesHierarchy={categoriesHierarchyData} 
        rfiStructure={rfiStructureData}
      />

      <footer>
        <p>
          The RFI responses and ideas compiled here are curated by Josh Mandel, MD. 
          Unless otherwise specified within an individual contribution, they represent his personal perspectives and recommendations. 
          This is an open, collaborative effort, and contributions from others are welcome. 
          These views do not necessarily represent the official positions of Microsoft or any other organization.
        </p>
        <p>
          View the source and contribute on <a href="https://github.com/jmandel/cms-rfi-collab" target="_blank" rel="noopener noreferrer">GitHub</a>.
        </p>
      </footer>
    </div>
  );
}

export default App; 