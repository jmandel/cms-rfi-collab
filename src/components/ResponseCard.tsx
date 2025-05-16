import React, { useState, useEffect } from 'react';
import { RfiPoint } from '../types';
import MarkdownRenderer from './MarkdownRenderer'; // Imported
import Toast from './Toast'; // Import Toast component

interface ResponseCardProps {
  point: RfiPoint;
  onCategoryClick?: (categoryId: string) => void;
  cardId: string; // Unique ID for deep linking to this card
}

// Wrap the component with React.memo
const ResponseCard: React.FC<ResponseCardProps> = React.memo(({ point, onCategoryClick, cardId }) => {
  // State for Toast visibility
  const [showToast, setShowToast] = useState(false);
  const [canShareNatively, setCanShareNatively] = useState(false);

  useEffect(() => {
    if (typeof navigator.share === 'function') {
      setCanShareNatively(true);
    }
  }, []);

  const handleCopyText = async () => {
    const textToCopy = `## ${point.short_title} (ID: ${point.id}, Question: ${point.rfi_question_code}, Key: ${point.point_key})\n\n**Summary:**\n${point.summary}\n\n**Body:**\n${point.markdown_content}`;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setShowToast(true);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      setShowToast(true);
    }
  };
  
  // const MockMarkdownRenderer: React.FC<{content: string}> = ({content}) => ( ... ); // Removed

  const githubBaseUrl = 'https://github.com/jmandel/cms-rfi-collab/blob/main/rfi_points_markdown'; // Updated repository name
  // This logic assumes your markdown files are named like 'PC-10.md' or similar, derived from rfi_question_code.
  // And that point_key refers to an anchor within them, or that the file is point_key.md
  // A more robust solution would be to have a specific `source_filename` field in your `db.json`.
  // For now, trying to link to a potential file named like point_key.md or rfi_question_code + .md
  // This is highly speculative and needs to match your actual file structure in rfi_points_markdown/
  let constructedFileName = '';
  if (point.source_filename) {
    constructedFileName = point.source_filename;
  } else if (point.rfi_question_code && point.point_key) { // Fallback to old heuristic
    const questionCodeSlug = point.rfi_question_code.toLowerCase();
    const pointKeySlug = point.point_key.toLowerCase().replace(/_/g, '-');
    constructedFileName = `${questionCodeSlug}_${pointKeySlug}.md`;
  }

  // Fallback if construction fails, though ideally it shouldn't if data is consistent.
  const githubLink = constructedFileName 
    ? `${githubBaseUrl}/${constructedFileName}` 
    : undefined; // Set to undefined if no link can be made

  const getShareText = (): string => {
    if (point.summary && point.summary.trim() !== '') {
      return point.summary; // Return full summary
    }
    // Basic stripping of markdown for summary if actual summary is not available
    const plainTextContent = point.markdown_content
      .replace(/\n+/g, ' ') // Replace newlines with a space
      .replace(/#+\s*/g, '') // Remove markdown headers
      .replace(/\*\*/g, '')    // Remove bold/italics markers
      .replace(/[\[\]\(\)]/g, '') // Remove link/image markdown syntax remnants
      .replace(/<[^>]+>/g, '') // Remove any HTML tags
      .trim(); 
    return plainTextContent; // Return full plain text content
  };

  const deepLink = `${window.location.origin}${window.location.pathname}#${cardId}`;

  const handleNativeShare = async () => {
    const shareText = getShareText();
    try {
      await navigator.share({
        title: point.short_title,
        text: shareText,
        url: deepLink,
      });
    } catch (error) {
    }
  };

  const sortedCategories = point.categories ? [...point.categories].sort() : [];

  return (
    <div className="response-card" id={cardId}>
      <h3>
        {point.short_title}
        <a href={`#${cardId}`} className="deep-link-icon card-deep-link" aria-label={`Link to RFI point ${point.point_key}`}>#</a>
      </h3>
      <div className="card-meta">
        <span>ID: {point.id}</span> | 
        <span>Question: {point.rfi_question_code}</span> | 
        <span className="point-key-meta">Key: {point.point_key}</span>
      </div>
      <div className="summary-section">
        <p className="summary-text">
          <strong>Summary:</strong> {point.summary}
        </p>
      </div>
      
      <div className="markdown-content-wrapper">
        <MarkdownRenderer content={point.markdown_content} /> {/* Used actual component */}
        {/* <MockMarkdownRenderer content={point.markdown_content} /> */}
      </div>

      <div className="categories-container">
        <strong>Categories:</strong>
        {sortedCategories.map(catString => {
          const categoryId = catString.split(':').pop() || catString;
          const categoryName = categoryId.replace(/_/g, ' ');
          return { catString, categoryId, categoryName }; // Create objects for sorting
        })
        .sort((a, b) => a.categoryName.localeCompare(b.categoryName)) // Sort alphabetically by name
        .map(catObj => ( // Map over sorted array
          <button 
            type="button"
            key={catObj.catString} 
            className="category-tag clickable"
            onClick={() => onCategoryClick && onCategoryClick(catObj.categoryId)}
            title={`Filter by category: ${catObj.categoryName}`}
          >
            {catObj.categoryName} 
          </button>
        ))}
      </div>

      <div className="rfi-point-actions">
        <button onClick={handleCopyText} className="action-button">
          Copy Full Text
        </button>
        {canShareNatively && (
          <button onClick={handleNativeShare} className="action-button">
            Share
          </button>
        )}
        {githubLink ? (
          <a 
            href={githubLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="action-button"
          >
            View/Edit on GitHub
          </a>
        ) : (
          <span className="action-button disabled" title="GitHub link cannot be determined for this item.">
            View/Edit on GitHub
          </span>
        )}
      </div>
      {showToast && <Toast message="Full text copied to clipboard!" onClose={() => setShowToast(false)} />}
    </div>
  );
}); // Close React.memo here

export default ResponseCard; 