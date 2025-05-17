import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { LocState } from '../hooks/useHashLocation'; // Import LocState

interface MarkdownRendererProps {
  content: string;
  loc: LocState;
  buildHash: (state: LocState) => string;
  // onNavigateToPrinciple?: (principleKey: string) => void; // Removed
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, loc, buildHash }) => {
  return (
    <ReactMarkdown 
      remarkPlugins={[remarkGfm]}
      components={{
        // Custom renderer for links
        a: ({node, ...props}) => {
          // if (props.href && props.href.startsWith('#') && onNavigateToPrinciple) { // Old condition
          if (props.href && props.href.startsWith('#')) {
            const potentialKey = props.href.substring(1);
            // Check if it's a cross-cutting principle key (e.g., API_PERFORMANCE)
            // The original regex /^[A-Z_]+$/ might be too simple if keys can have numbers, etc.
            // For now, sticking to the user's example logic, assuming keys are like "API_PERFORMANCE"
            if (/^[A-Z_][A-Z0-9_]*$/.test(potentialKey)) { // Adjusted regex to allow numbers after first char
              const nextHash = buildHash({ 
                ...loc, 
                page: 'principles', 
                anchor: `cc-${potentialKey}`,
                filters: new Set() // Clear filters when navigating to a principle from markdown
              });
              return (
                // <button 
                //   onClick={(e) => {
                //     e.preventDefault(); 
                //     onNavigateToPrinciple(potentialKey);
                //   }}
                //   className="text-link principle-inline-link"
                //   title={`View principle: ${potentialKey}`}
                // >
                //   {props.children}
                // </button>
                <a href={`#${nextHash}`} {...props} title={`View principle: ${potentialKey}`}>
                  {props.children}
                </a>
              );
            }
          }
          // Default rendering for other links (external or non-principle internal anchors)
          return <a {...props}>{props.children}</a>;
        }
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer; 