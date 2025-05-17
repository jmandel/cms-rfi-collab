import React, { useState, useEffect } from 'react';
import { RfiPoint, CrossCuttingPrinciple } from '../types';
import MarkdownRenderer from './MarkdownRenderer';
import Toast from './Toast';
import { LocState } from '../hooks/useHashLocation';

interface ResponseCardProps {
  loc: LocState;
  buildHash: (state: LocState) => string;
  point: RfiPoint;
  onCategoryClick?: (categoryId: string) => void;
  cardId: string;
  crossCuttingPrinciples: CrossCuttingPrinciple[];
}

const sanitizeForId = (text: string) => text.replace(/\W/g, '-');

const ResponseCard: React.FC<ResponseCardProps> = React.memo(({ 
  loc,
  buildHash,
  point, 
  onCategoryClick, 
  cardId, 
  crossCuttingPrinciples, 
}) => {
  const [showToast, setShowToast] = useState(false);
  const [canShareNatively, setCanShareNatively] = useState(false);

  useEffect(() => {
    if (typeof navigator.share === 'function') {
      setCanShareNatively(true);
    }
  }, []);

  const handleCopyText = async () => {
    let textToCopy = `## ${point.short_title} (ID: ${point.id}, Question: ${point.rfi_question_code})\n\n**Summary:**\n${point.summary}\n\n**Body:**\n${point.markdown_content}`;

    if (referencedPrinciplesDetails.length > 0) {
      const principlesText = referencedPrinciplesDetails
        .map(p => {
          return `### Cross-Cutting Principle: ${p.key} - ${p.title}\n${p.content}`;
        })
        .join('\n---\n'); // Separator between principles
      textToCopy += `\n\n---\n**Referenced Cross-Cutting Principles:**\n\n${principlesText}`;
    }

    try {
      await navigator.clipboard.writeText(textToCopy);
      setShowToast(true);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      setShowToast(true); // Show toast even on error, maybe with a different message? For now, same.
    }
  };
  
  let constructedFileName = '';
  if (point.source_filename) {
    constructedFileName = point.source_filename;
  } else if (point.rfi_question_code) { 
    constructedFileName = `${point.rfi_question_code}.md`; 
  }
  
  const githubBaseUrl = 'https://github.com/jmandel/cms-rfi-collab/blob/main/rfi_answers_consolidated';
  const githubLink = constructedFileName 
    ? `${githubBaseUrl}/${constructedFileName}` 
    : undefined;

  const getShareText = (): string => {
    if (point.summary && point.summary.trim() !== '') {
      return point.summary;
    }
    const plainTextContent = point.markdown_content
      .replace(/\n+/g, ' ')
      .replace(/#+\s*/g, '')
      .replace(/\*\*/g, '')
      .replace(/[\[\]\(\)]/g, '')
      .replace(/<[^>]+>/g, '')
      .trim(); 
    return plainTextContent;
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
      console.warn('Native share failed:', error);
    }
  };

  const sortedCategories = point.categories ? [...point.categories].sort() : [];

  const referencedPrinciplesDetails = point.referenced_principles
    .map(key => crossCuttingPrinciples.find(p => p.key === key))
    .filter(p => p !== undefined) as CrossCuttingPrinciple[];

  return (
    <div className="response-card" id={cardId}>
      <h3>
        {point.short_title}
        <a href={`#${cardId}`} className="deep-link-icon card-deep-link" aria-label={`Link to RFI point ${point.id}`}>#</a>
      </h3>
      <div className="card-meta">
        {point.id === point.rfi_question_code ? (
          <span>RFI Question: {point.rfi_question_code}</span>
        ) : (
          <span>RFI Question: {point.rfi_question_code} | Response ID: {point.id}</span>
        )}
      </div>
      <div className="summary-section summary-text-wrapper">
        <p className="summary-text">
          <strong>Summary:</strong> {point.summary}
        </p>
      </div>
      
      <div className="markdown-content-wrapper">
        <MarkdownRenderer 
            content={point.markdown_content} 
            loc={loc}
            buildHash={buildHash}
        />
      </div>

      {referencedPrinciplesDetails.length > 0 && (
        <div className="referenced-principles-container">
          <strong>Supported by Principles:</strong>
          {referencedPrinciplesDetails.map(principle => {
            const principleLink = `#${buildHash({ ...loc, page: 'principles', anchor: `cc-${principle.key}`, filters: new Set() })}`
            return (
            <a
              href={principleLink}
              key={principle.key}
              className="principle-tag clickable"
              title={`View principle: ${principle.key} - ${principle.title}`}
            >
              {principle.title}
            </a>
            );
          })}
        </div>
      )}

      <div className="categories-container">
        <strong>Categories:</strong>
        {sortedCategories.map(catString => {
          const categoryId = catString.split(':').pop() || catString;
          const categoryName = categoryId.replace(/_/g, ' ');
          return { catString, categoryId, categoryName };
        })
        .sort((a, b) => a.categoryName.localeCompare(b.categoryName))
        .map(catObj => {
          const targetFilters = new Set([catObj.categoryId]);
          // Ensure page is browser, set anchor to filter panel
          const targetHash = buildHash({ 
            ...loc, // preserve current page and anchor unless specified
            page: 'browser', // Explicitly set page to browser
            filters: targetFilters, 
            anchor: 'filter-panel' 
          });
          return (
          // <button 
          //   type="button"
          //   key={catObj.catString} 
          //   className="category-tag clickable"
          //   onClick={() => onCategoryClick && onCategoryClick(catObj.categoryId)}
          //   title={`Filter by category: ${catObj.categoryName}`}
          // >
          //   {catObj.categoryName} 
          // </button>
          <a
            href={`#${targetHash}`}
            key={catObj.catString}
            className="category-tag clickable"
            onClick={(e) => {
              e.preventDefault();
              if (onCategoryClick) {
                onCategoryClick(catObj.categoryId);
              }
            }}
            title={`Filter by category: ${catObj.categoryName}`}
          >
            {catObj.categoryName}
          </a>
          );
        })}
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
});

export default ResponseCard; 