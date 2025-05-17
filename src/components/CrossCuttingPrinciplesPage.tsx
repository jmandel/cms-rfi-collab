import React from 'react';
import { CrossCuttingPrinciple, ProcessedRfiPoint } from '../types';
// import { Link } from 'react-router-dom'; // Removed as not using React Router yet

interface CrossCuttingPrinciplesPageProps {
  principles: CrossCuttingPrinciple[];
  allRfiPoints: ProcessedRfiPoint[];
  onNavigateToRfiQuestion: (questionId: string) => void; // Callback to handle navigation
}

const sanitizeForId = (text: string) => text.replace(/\W/g, '-');

const CrossCuttingPrinciplesPage: React.FC<CrossCuttingPrinciplesPageProps> = ({ principles, allRfiPoints, onNavigateToRfiQuestion }) => {

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
              <section>
                <h4>Problem:</h4>
                <p>{principle.problem}</p>
              </section>
              <section>
                <h4>Capability:</h4>
                <p>{principle.capability}</p>
              </section>
              {uniqueQuestionCodes.length > 0 && (
                <section>
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
          </div>
        );
      })}
    </div>
  );
};

export default CrossCuttingPrinciplesPage; 