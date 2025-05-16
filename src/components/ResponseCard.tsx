import React, { useState } from 'react';
import { RfiPoint } from '../types';
import MarkdownRenderer from './MarkdownRenderer'; // Imported
import Toast from './Toast'; // Import Toast component

interface ResponseCardProps {
  point: RfiPoint;
}

const ResponseCard: React.FC<ResponseCardProps> = ({ point }) => {
  // State for Toast visibility and message
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleCopyText = async () => {
    const textToCopy = `## ${point.short_title} (ID: ${point.id}, Question: ${point.rfi_question_code}, Key: ${point.point_key})\n\n**Summary:**\n${point.summary}\n\n**Body:**\n${point.markdown_content}`;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setToastMessage('Full text copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy text: ', err);
      setToastMessage('Failed to copy text.');
    }
  };
  
  // const MockMarkdownRenderer: React.FC<{content: string}> = ({content}) => ( ... ); // Removed

  const githubBaseUrl = 'https://github.com/jmandel/rfi-cms-healthtech-responses-v5/blob/main/rfi_points_markdown'; // Updated placeholder
  // This logic assumes your markdown files are named like 'PC-10.md' or similar, derived from rfi_question_code.
  // And that point_key refers to an anchor within them, or that the file is point_key.md
  // A more robust solution would be to have a specific `source_filename` field in your `db.json`.
  // For now, trying to link to a potential file named like point_key.md or rfi_question_code + .md
  // This is highly speculative and needs to match your actual file structure in rfi_points_markdown/
  let constructedFileName = '';
  if (point.rfi_question_code && point.point_key) {
    const questionCodeSlug = point.rfi_question_code.toLowerCase();
    const pointKeySlug = point.point_key.toLowerCase().replace(/_/g, '-');
    constructedFileName = `${questionCodeSlug}_${pointKeySlug}.md`;
  }

  // Fallback if construction fails, though ideally it shouldn't if data is consistent.
  const githubLink = constructedFileName 
    ? `${githubBaseUrl}/${constructedFileName}` 
    : githubBaseUrl; // Fallback to the directory if filename can't be constructed

  return (
    <div className="response-card">
      {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage(null)} />}
      <h3>{point.short_title}</h3>
      <div className="card-meta">
        <span>ID: {point.id}</span> | 
        <span>Question: {point.rfi_question_code}</span> | 
        <span>Key: {point.point_key}</span>
      </div>
      <p className="summary">{point.summary}</p>
      
      <div className="markdown-content-wrapper">
        <MarkdownRenderer content={point.markdown_content} /> {/* Used actual component */}
        {/* <MockMarkdownRenderer content={point.markdown_content} /> */}
      </div>

      <div className="categories-container">
        <strong>Categories:</strong>
        {point.categories.map(catId => (
          <span 
            key={catId} 
            className="category-tag"
          >
            {catId.split(':').pop()?.replace(/_/g, ' ')} 
          </span>
        ))}
      </div>

      <div className="action-buttons">
        <button onClick={handleCopyText} style={{ marginRight: '0' }}>
          Copy Full Text
        </button>
        {constructedFileName ? (
          <a 
            href={githubLink} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            View/Edit on GitHub
          </a>
        ) : (
          <span style={{opacity: 0.5, cursor: 'not-allowed'}} title="GitHub link cannot be determined for this item.">
            View/Edit on GitHub (Link unavailable)
          </span>
        )}
      </div>
    </div>
  );
};

export default ResponseCard; 