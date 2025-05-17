import React, { useState, useEffect, useCallback } from 'react';
import ReactMarkdown from 'react-markdown'; // Import ReactMarkdown
import remarkGfm from 'remark-gfm'; // Import remark-gfm
import { CrossCuttingPrinciple, ProcessedRfiPoint } from '../types';
import Toast from './Toast';
// import { Link } from 'react-router-dom'; // Removed as not using React Router yet

interface CrossCuttingPrinciplesPageProps {
  principles: CrossCuttingPrinciple[];
  allRfiPoints: ProcessedRfiPoint[];
  onNavigateToRfiQuestion: (questionId: string) => void; // Callback to handle navigation
}

const sanitizeForId = (text: string) => text.replace(/\W/g, '-');
const GITHUB_CC_FILE_URL = 'https://github.com/jmandel/cms-rfi-collab/blob/main/cross_cutting_principles.md';

const CrossCuttingPrinciplesPage: React.FC<CrossCuttingPrinciplesPageProps> = ({ principles, allRfiPoints, onNavigateToRfiQuestion }) => {
  const [showToast, setShowToast] = useState(false);
  const [canShareNatively, setCanShareNatively] = useState(false);

  useEffect(() => {
    if (typeof navigator.share === 'function') {
      setCanShareNatively(true);
    }
  }, []);

  const rfiPointsByPrinciple = React.useMemo(() => {
    const map = new Map<string, ProcessedRfiPoint[]>();
    principles.forEach(principle => {
      const relevantPoints = allRfiPoints.filter(point => 
        point.referenced_principles.includes(principle.key)
      );
      // Get unique question codes from these points
      const questionCodes = new Set<string>();
      relevantPoints.forEach(p => questionCodes.add(p.rfi_question_code));
      
      // For display, we might just want the question codes, or a sample of points
      // Here, we store the points, but you could adapt to store just question summaries or codes
      map.set(principle.key, relevantPoints);
    });
    return map;
  }, [principles, allRfiPoints]);

  const handleCopyPrinciple = useCallback(async (principle: CrossCuttingPrinciple) => {
    const principleAnchorId = `cc-${sanitizeForId(principle.key)}`;
    const deepLink = `${window.location.origin}${window.location.pathname}#${principleAnchorId}`;
    let textToCopy = `## Cross-Cutting Principle: ${principle.title} (${principle.key})\n\n`;
    textToCopy += `${principle.content}\n\n`; // Use new content field
    textToCopy += `Link: ${deepLink}`;

    try {
      await navigator.clipboard.writeText(textToCopy);
      setShowToast(true);
    } catch (err) {
      console.error('Failed to copy principle text: ', err);
      // Optionally show an error toast or different message
      setShowToast(true); 
    }
  }, []);

  const handleSharePrinciple = useCallback(async (principle: CrossCuttingPrinciple) => {
    const principleAnchorId = `cc-${sanitizeForId(principle.key)}`;
    const deepLink = `${window.location.origin}${window.location.pathname}#${principleAnchorId}`;
    const shareData: ShareData = {
      title: `Principle: ${principle.title}`,
      text: principle.content || 'Cross-Cutting Principle from CMS RFI Responses', // Use content field
      url: deepLink,
    };
    try {
      await navigator.share(shareData);
    } catch (error) {
      console.warn('Native share for principle failed:', error);
    }
  }, []);

  if (!principles || principles.length === 0) {
    return <p>No cross-cutting principles available.</p>;
  }

  return (
    <div className="cross-cutting-principles-page">
      <h2>Cross-Cutting Principles</h2>
      <p className="page-intro">
        This document outlines foundational principles intended to guide the development and implementation of a modern, interoperable, and patient-centric health technology ecosystem. These principles are designed to address systemic challenges and promote scalable, secure, and equitable access to health information for all stakeholders.
      </p>
      <p className="page-intro">
        You can click on an RFI question code (e.g., PC-10) linked under a principle to navigate to that question in the main browser.
      </p>
      {principles.map(principle => {
        const principleAnchorId = `cc-${sanitizeForId(principle.key)}`;
        const relevantPointsForPrinciple = rfiPointsByPrinciple.get(principle.key) || [];
        const uniqueQuestionCodes = Array.from(new Set(relevantPointsForPrinciple.map(p => p.rfi_question_code))).sort();

        return (
          <div key={principle.key} id={principleAnchorId} className="principle-card">
            <h3 title={`Principle Key: ${principle.key}`}>
              {principle.title}
              <a href={`#${principleAnchorId}`} className="deep-link-icon" aria-label={`Link to principle ${principle.title}`}>#</a>
            </h3>
            <div className="principle-details">
              {/* Render markdown content here */}
              <div className="markdown-content">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{principle.content}</ReactMarkdown>
              </div>
              {uniqueQuestionCodes.length > 0 && (
                <section className="linked-rfi-section">
                  <h4>Referenced in RFI Answers:</h4>
                  <ul className="referenced-rfi-list">
                    {uniqueQuestionCodes.map(qCode => (
                      <li key={qCode}>
                        {/* 
                          This uses a callback for navigation. 
                          If using React Router, this would be a <Link> component.
                          Example: <Link to={`/?q=${qCode}#rfi-q-${sanitizeForId(qCode)}`}>{qCode}</Link> 
                        */}
                        <button 
                          onClick={() => onNavigateToRfiQuestion(qCode)} 
                          className="text-link"
                          title={`View RFI answers for ${qCode}`}
                        >
                          {qCode}
                        </button>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>
            <div className="principle-actions rfi-point-actions"> {/* Re-use rfi-point-actions for styling consistency */}
              <button onClick={() => handleCopyPrinciple(principle)} className="action-button">
                Copy Principle Text
              </button>
              {canShareNatively && (
                <button onClick={() => handleSharePrinciple(principle)} className="action-button">
                  Share Principle
                </button>
              )}
              <a 
                href={GITHUB_CC_FILE_URL} 
                target="_blank" 
                rel="noopener noreferrer"
                className="action-button"
                title="View/Edit all principles on GitHub (cross_cutting_principles.md)"
              >
                View/Edit on GitHub
              </a>
            </div>
          </div>
        );
      })}
      {showToast && <Toast message="Principle text copied to clipboard!" onClose={() => setShowToast(false)} />}
    </div>
  );
};

export default CrossCuttingPrinciplesPage; 