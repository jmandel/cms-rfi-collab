import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownRendererProps {
  content: string;
  onNavigateToPrinciple?: (principleKey: string) => void; // Optional callback
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, onNavigateToPrinciple }) => {
  return (
    <ReactMarkdown 
      remarkPlugins={[remarkGfm]}
      components={{
        // Custom renderer for links
        a: ({node, ...props}) => {
          if (props.href && props.href.startsWith('#') && onNavigateToPrinciple) {
            // Check if it's potentially a cross-cutting principle key (all caps, underscores)
            const potentialKey = props.href.substring(1);
            if (/^[A-Z_]+$/.test(potentialKey)) {
              return (
                <button 
                  onClick={(e) => {
                    e.preventDefault(); // Prevent default anchor behavior if it was a real link
                    onNavigateToPrinciple(potentialKey);
                  }}
                  className="text-link principle-inline-link" // Apply some styling
                  title={`View principle: ${potentialKey}`}
                >
                  {props.children} {/* This should be the link text, e.g., [Principle Title] */}
                </button>
              );
            }
          }
          // Default rendering for other links
          return <a {...props}>{props.children}</a>;
        }
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer; 