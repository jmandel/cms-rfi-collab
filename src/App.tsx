// src/App.tsx
import React, { useState, useCallback, useEffect } from 'react';
import { CategoriesHierarchy, RfiPoint, ProcessedRfiPoint, RfiStructure, CrossCuttingPrinciple } from './types';
import ResponseBrowserPage from './components/ResponseBrowserPage';
import CrossCuttingPrinciplesPage from './components/CrossCuttingPrinciplesPage';
import './styles/global.css'; // Import global styles

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

type PageView = 'browser' | 'principles';

function App() {
  const [currentPage, setCurrentPage] = useState<PageView>('browser');
  const readmeIntroLink = "https://github.com/jmandel/cms-rfi-collab/blob/main/README.md#introduction-responding-to-the-cms-health-technology-ecosystem-rfi";

  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash.substring(1);
      let newPage = currentPage; // Default to current, might be changed by hash

      if (hash.startsWith('rfi-q-') || hash.startsWith('rfi-sec-') || hash.startsWith('rfi-subsec-') || hash.startsWith('point-')) {
        newPage = 'browser';
      } else if (hash.startsWith('cc-')) {
        newPage = 'principles';
      } else if (!hash) {
        // If hash is empty, it might be due to clicking main nav buttons.
        // The primary mechanism for page change via nav buttons is their own onClick. 
        // This popstate is more for back/forward. If hash is empty on back/forward, 
        // we might infer page from current path or simply not change it if not clear.
        // For now, if hash is empty, we don't force a page change here, 
        // assuming the page was already set correctly if user used nav buttons.
      }

      if (newPage !== currentPage) {
        setCurrentPage(newPage);
      }

      // Attempt to scroll if a hash is present.
      // This scroll should ideally occur after the newPage has been rendered.
      if (hash) {
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            element.scrollIntoView({ behavior: 'auto', block: 'start' });
          } else {
            console.warn(`Popstate: Could not find element with ID ${hash} to scroll to.`);
          }
        }, 50); // Small delay for DOM update after setCurrentPage
      }
    };

    window.addEventListener('popstate', handlePopState);
    // Call on mount to handle initial URL state (e.g. deep link with hash)
    handlePopState(); 

    return () => window.removeEventListener('popstate', handlePopState);
  }, [currentPage, setCurrentPage]); // Dependencies

  // Callback to switch to browser and scroll to a question
  const handleNavigateToRfiQuestion = useCallback((questionId: string) => {
    setCurrentPage('browser');
    setTimeout(() => {
      const targetId = `rfi-q-${sanitizeForId(questionId)}`;
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'auto', block: 'start' });
        window.location.hash = targetId; // Also update hash for consistency and direct linkability
      } else {
        console.warn(`Could not find element with ID ${targetId} to scroll to.`);
      }
    }, 0);
  }, []);

  // New callback for navigating to a principle section on the Principles Page
  const handleNavigateToPrincipleSection = useCallback((principleKey: string) => {
    setCurrentPage('principles');
    setTimeout(() => {
      const targetId = `cc-${sanitizeForId(principleKey)}`; // Matches ID format in CrossCuttingPrinciplesPage
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'auto', block: 'start' });
        window.location.hash = targetId; // Also update hash
      } else {
        console.warn(`Could not find element with ID ${targetId} to scroll to.`);
      }
    }, 0);
  }, []);

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
          <button onClick={() => { setCurrentPage('browser'); window.location.hash = ''; }} className={currentPage === 'browser' ? 'active' : ''}>
            RFI Browser
          </button>
          <button onClick={() => { setCurrentPage('principles'); window.location.hash = ''; }} className={currentPage === 'principles' ? 'active' : ''}>
            Cross-Cutting Principles
          </button>
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

      {currentPage === 'browser' && (
        <ResponseBrowserPage 
          allRfiPoints={processedRfiPoints}
          categoriesHierarchy={categoriesHierarchyData} 
          rfiStructure={rfiStructureData}
          crossCuttingPrinciples={crossCuttingPrinciplesData}
          onNavigateToPrinciple={handleNavigateToPrincipleSection}
        />
      )}
      {currentPage === 'principles' && (
        <CrossCuttingPrinciplesPage 
          principles={crossCuttingPrinciplesData}
          allRfiPoints={processedRfiPoints}
          onNavigateToRfiQuestion={handleNavigateToRfiQuestion}
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