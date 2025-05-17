// src/App.tsx
import React from 'react';
import { CategoriesHierarchy, RfiPoint, ProcessedRfiPoint, RfiStructure, CrossCuttingPrinciple } from './types';
import ResponseBrowserPage from './components/ResponseBrowserPage';
import CrossCuttingPrinciplesPage from './components/CrossCuttingPrinciplesPage';
import './styles/global.css'; // Import global styles

import { useHashLocation, buildHash } from './hooks/useHashLocation';
import { useScrollOnAnchor } from './hooks/useScrollOnAnchor';

// Directly import the JSON data
// Note: Adjust paths if your bundler configuration or file structure is different
// Bun should handle these imports and bundle the JSON content.
import rawRfiPoints from '../public/build/db.json';
import rawCategoriesHierarchy from '../public/data/categories_hierarchy.json';
import rawRfiStructure from '../public/data/rfi.json';
import rawCrossCuttingPrinciples from '../public/build/cross_cutting_principles.json';

// Type assertion for safety, using RfiPoint from types/index.ts
const rfiPointsData = rawRfiPoints as RfiPoint[];
const categoriesHierarchyData = rawCategoriesHierarchy as CategoriesHierarchy;
const rfiStructureData = rawRfiStructure as RfiStructure;
const crossCuttingPrinciplesData = rawCrossCuttingPrinciples as CrossCuttingPrinciple[];

// Pre-process RFI points to include categoryIds as a Set for faster filtering
// The type ProcessedRfiPoint[] for processedRfiPoints ensures the transformation is correct.
const processedRfiPoints: ProcessedRfiPoint[] = rfiPointsData.map(point => ({
  ...point,
  // Ensure categories exists and is an array before mapping. If point.categories can be undefined, handle it.
  // Assuming point.categories is always string[] as per RfiPoint type.
  categoryIds: new Set((point.categories || []).map(cat => cat.split(':').pop()!).filter(Boolean))
}));

// Helper to sanitize IDs for URL fragments
const sanitizeForId = (text: string) => text.replace(/\W/g, '-');

// type PageView = 'browser' | 'principles';

function App() {
  // const [currentPage, setCurrentPage] = useState<PageView>('browser');
  const [loc, setLoc] = useHashLocation();
  useScrollOnAnchor(loc.anchor);

  const readmeIntroLink = "https://github.com/jmandel/cms-rfi-collab/blob/main/README.md#introduction-responding-to-the-cms-health-technology-ecosystem-rfi";

  // useEffect(() => {
  //   const handlePopState = () => {
  //     const hash = window.location.hash.substring(1);
  //     let newPage = currentPage; // Default to current, might be changed by hash
  // ... existing code ...
  //     }
  //   };

  //   window.addEventListener('popstate', handlePopState);
  //   // Call on mount to handle initial URL state (e.g. deep link with hash)
  //   handlePopState(); 

  //   return () => window.removeEventListener('popstate', handlePopState);
  // }, [currentPage, setCurrentPage]); // Dependencies

  // // Callback to switch to browser and scroll to a question
  // const handleNavigateToRfiQuestion = useCallback((questionId: string) => {
  //   setCurrentPage('browser');
  // ... existing code ...
  //   }, 0);
  // }, []);

  // // New callback for navigating to a principle section on the Principles Page
  // const handleNavigateToPrincipleSection = useCallback((principleKey: string) => {
  //   setCurrentPage('principles');
  // ... existing code ...
  //   }, 0);
  // }, []);

  if (!processedRfiPoints || !categoriesHierarchyData || !rfiStructureData || !crossCuttingPrinciplesData) {
    // This basic check might not be sufficient if files are empty but valid JSON (e.g., [])
    // A more robust check would be for length if arrays are expected to be non-empty
    console.error("Data loading error: One or more data files might be empty or missing.");
    return <p className="error-message">Error: Data could not be loaded. Check build process and file paths.</p>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>CMS RFI: Draft Response Browser</h1>
        <nav className="main-nav">
          {/* <button onClick={() => { setCurrentPage('browser'); window.location.hash = ''; }} className={currentPage === 'browser' ? 'active' : ''}>
            RFI Browser
          </button>
          <button onClick={() => { setCurrentPage('principles'); window.location.hash = ''; }} className={currentPage === 'principles' ? 'active' : ''}>
            Cross-Cutting Principles
          </button> */}
          <a href="#page=browser" onClick={(e) => { e.preventDefault(); setLoc({ page: 'browser' }, true); }} className={loc.page === 'browser' ? 'active' : ''}>
            RFI Browser
          </a>
          <a href="#page=principles" onClick={(e) => { e.preventDefault(); setLoc({ page: 'principles' }, true); }} className={loc.page === 'principles' ? 'active' : ''}>
            Cross-Cutting Principles
          </a>
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
        </nav>
      </header>

      {/* {currentPage === 'browser' && ( */}
      {loc.page === 'browser' && (
        <ResponseBrowserPage 
          key={loc.page}
          loc={loc}
          setLoc={setLoc}
          allRfiPoints={processedRfiPoints}
          categoriesHierarchy={categoriesHierarchyData} 
          rfiStructure={rfiStructureData}
          crossCuttingPrinciples={crossCuttingPrinciplesData}
        />
      )}
      {/* {currentPage === 'principles' && ( */}
      {loc.page === 'principles' && (
        <CrossCuttingPrinciplesPage 
          key={loc.page}
          loc={loc}
          setLoc={setLoc}
          buildHash={buildHash}
          principles={crossCuttingPrinciplesData}
          allRfiPoints={processedRfiPoints}
        />
      )}

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