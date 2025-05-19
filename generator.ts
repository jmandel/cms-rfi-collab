import { Marked } from 'marked';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import path from 'path';

// These constants should be at the top level of the script
const INPUT_MD_FILE = 'index.md';
const OUTPUT_DIR = 'dist';
const OUTPUT_HTML_FILE = path.join(OUTPUT_DIR, 'index.html');
const OUTPUT_CSS_FILE = path.join(OUTPUT_DIR, 'style.css');

interface HeadingWithId {
  level: number;
  text: string;
  id: string;
  originalMarkdown: string;
}

// Helper to create a slug for IDs
function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') 
    .replace(/[^\w-]+/g, '') 
    .replace(/--+/g, '-') 
    .replace(/^-+/, '') 
    .replace(/-+$/, ''); 
}

function extractExplicitId(line: string): string | null {
  const idMatch = line.match(/\|\s*\`([a-zA-Z0-9_:-]+)\`\s*$/);
  return idMatch?.[1] || null;
}

function stripExplicitId(line: string): string {
  return line.replace(/\|\s*\`([a-zA-Z0-9_:-]+)\`\s*$/, '').trim();
}

function preParseSection(markdown: string, headingLevel: number, isRecommendation: boolean = false): HeadingWithId[] {
  const items: HeadingWithId[] = [];
  const rawItems = markdown.split(new RegExp(`^#{${headingLevel}}\\s+`, 'm')).slice(1);

  for (const rawItemContent of rawItems) {
    const lines = rawItemContent.trim().split('\n');
    const titleLineFromSplit = (lines[0] || '').trim(); 
    
    let explicitId: string | null = null;
    let titleText = titleLineFromSplit;

    if (isRecommendation) {
      const fullItemMd = `#{${headingLevel}} ${rawItemContent}`; 
      const idMatchInBody = fullItemMd.match(/\|\s*\`([a-zA-Z0-9_:-]+)\`\s*/m);
      if (idMatchInBody) {
        explicitId = idMatchInBody[1] || null;
      }
      titleText = stripExplicitId(titleLineFromSplit); 
    } else {
      explicitId = extractExplicitId(titleLineFromSplit);
      titleText = stripExplicitId(titleLineFromSplit);
    }

    const id = explicitId || slugify(titleText);
    
    items.push({
      level: headingLevel,
      text: titleText,
      id: id,
      originalMarkdown: lines.slice(1).join('\n').replace(/\|\s*\`([a-zA-Z0-9_:-]+)\`\s*$/, '').trim()
    });
  }
  return items;
}

function preParseRfiQuestions(markdown: string): HeadingWithId[] {
  const items: HeadingWithId[] = [];
  const rfiQuestionBlocks = markdown.split(/^###\s+/m);
  
  // Skip the intro part which is rfiQuestionBlocks[0]
  for (let i = 1; i < rfiQuestionBlocks.length; i++) {
    const block = rfiQuestionBlocks[i] || '';
    const lines = block.trim().split('\n');
    const titleLine = lines[0] || ''; 
    
    const rfiQuestionMatch = titleLine.match(/^([A-Z]{2}-\d+)\.?\s*(.*)/);
    const id = rfiQuestionMatch?.[1] ? slugify(rfiQuestionMatch[1]) : slugify(titleLine);
    const titleText = titleLine;

    items.push({
      level: 3,
      text: titleText || 'Untitled Question',
      id: id,
      originalMarkdown: lines.slice(1).join('\n')
    });
  }
  return items;
}


async function generateSite() {
  // Ensure constants are accessible within this function's scope
  // (They are already defined at the top-level, so they are accessible here)

  if (!existsSync(INPUT_MD_FILE)) {
    console.error(`Error: Input file ${INPUT_MD_FILE} not found.`);
    process.exit(1);
  }

  const markdownContent = readFileSync(INPUT_MD_FILE, 'utf-8');

  const sections = markdownContent.split(/^# (Guiding Principles|Technology Policy Recommendations|Response Letter)/m);

  if (sections.length < 7) {
    console.error("Could not parse the major H1 sections from index.md. Ensure H1 headings are correct.");
    process.exit(1);
  }

  const principlesMdContent = sections[2] || '';
  const recommendationsMdContent = sections[4] || '';
  const letterMdContent = sections[6] || '';

  const markedInstance = new Marked({
    gfm: true,
    // mangle: false, // Option likely valid but causing linter issues with current types
    // headerIds: false // Option likely valid but causing linter issues with current types
  });

  // --- Process Principles (H3) ---
  const principlesData = preParseSection(principlesMdContent, 3);
  let principlesHtml = '<section id="guiding-principles" class="content-section"><h2>Guiding Principles</h2>';
  for (const principle of principlesData) {
    principlesHtml += `<div class="card"><article id="${principle.id}" class="principle-item">`;
    principlesHtml += `<h3>${principle.text}</h3>`;
    principlesHtml += await markedInstance.parse(principle.originalMarkdown);
    principlesHtml += `</article></div>`;
  }
  principlesHtml += '</section>';

  // --- Process Recommendations ---
  let recommendationsHtml = '<section id="technology-policy-recommendations" class="content-section"><h2>Technology Policy Recommendations</h2>';
  const recommendationCategories = recommendationsMdContent.split(/^##\s+/m).slice(1);

  for (const categoryMd of recommendationCategories) {
    const categoryLines = categoryMd.trim().split('\n');
    const categoryTitle = categoryLines[0];
    const categoryId = categoryTitle ? slugify(categoryTitle) : '';
    recommendationsHtml += `<div class="recommendation-category">`;
    recommendationsHtml += `<h3 id="${categoryId}">${categoryTitle || 'Untitled Category'}</h3>`;

    const recommendationsInCategoryMd = categoryLines.slice(1).join('\n');
    const recommendationsData = preParseSection(recommendationsInCategoryMd, 3, true); 

    for (const rec of recommendationsData) {
      recommendationsHtml += `<div class="card"><article id="${rec.id}" class="recommendation-item">`;
      recommendationsHtml += `<h4>${rec.text}</h4>`; 
      recommendationsHtml += await markedInstance.parse(rec.originalMarkdown);
      recommendationsHtml += `</article></div>`;
    }
    recommendationsHtml += `</div>`;
  }
  recommendationsHtml += '</section>';

  // --- Process Response Letter ---
  let letterHtml = '<section id="response-letter" class="content-section"><h2>Response Letter</h2>';
  const letterIntroAndRFIBlocks = letterMdContent.split(/^###\s+/m);
  
  const rfiQuestionsData = preParseRfiQuestions(letterMdContent); 
  for (const rfiQuestion of rfiQuestionsData) {
    letterHtml += `<div class="card"><article id="${rfiQuestion.id}" class="rfi-question">`;
    letterHtml += `<h3>${rfiQuestion.text}</h3>`;
    const processedBody = rfiQuestion.originalMarkdown.replace(/\[([^\]]+)\]\((#[\w-]+)\)/g, '<a href="$2">$1</a>');
    letterHtml += await markedInstance.parse(processedBody);
    letterHtml += `</article></div>`;
  }
  letterHtml += '</section>';


  // --- Assemble HTML Page ---
  const finalHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Health Technology Ecosystem: RFI Responses</title> 
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header class="site-header">
    <nav>
      <ul>
        <li><a href="#response-letter">Response Letter</a></li>
        <li><a href="#guiding-principles">Guiding Principles</a></li>
        <li >
          <select id="policy-dropdown" 
                  onchange="if(this.value) { const targetElement = document.querySelector(this.value); if (targetElement) targetElement.scrollIntoView({ behavior: 'auto' }); }" 
                  style="font-size:1em;padding:4px 8px;border-radius:4px;border:1px solid #b3b3b3;color:#007bff;background:#fff;">
            <option value="#technology-policy-recommendations">Technology Policy Recommendations</option>
            <option value="#ehr-certification-program-ensures-foundational-product-functionality">EHR Certification Program Ensures Foundational Product Functionality</option>
            <option value="#advance-ehr-capabilities-for-modern-dynamic-and-comprehensive-interoperability">Advance EHR Capabilities for Modern, Dynamic, and Comprehensive Interoperability</option>
            <option value="#tefca-and-health-information-networks-must-prioritize-individual-rights-security-and-access">TEFCA and Health Information Networks Must Prioritize Individual Rights, Security, and Access</option>
          </select>
        </li>
      </ul>
    </nav>
    <a class="github-btn" href="https://github.com/jmandel/cms-rfi-collab" target="_blank" rel="noopener">Contribute on GitHub</a>
  </header>
  <div class="container">
    <aside class="left-pane">
      <div class="scrollable-content">
        ${letterHtml}
      </div>
    </aside>
    <main class="right-pane">
      <div class="scrollable-content">
        ${principlesHtml}
        ${recommendationsHtml}
      </div>
    </main>
  </div>
</body>
</html>`;

  // --- CSS Styling (Updated) ---
  const cssContent = `
body {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen, Ubuntu, Cantarell, \"Open Sans\", \"Helvetica Neue\", sans-serif;
  margin: 0;
  line-height: 1.6;
  color: #333;
  background-color: #f9f9f9;
  overflow: hidden;
}
.site-header {
  position: sticky;
  top: 0;
  background: #fff;
  z-index: 100;
  border-bottom: 1px solid #d1d5db;
  padding: 0 16px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.site-header nav ul {
  display: flex;
  gap: 24px;
  list-style: none;
  margin: 0;
  padding: 0;
}
.site-header nav li a {
  color: #007bff;
  font-weight: 500;
  text-decoration: none;
  padding: 8px 0;
  transition: color 0.2s, border-bottom 0.2s;
}
.site-header nav li a:hover {
  color: #0056b3;
  border-bottom: 2px solid #0056b3;
}
.container {
  display: flex;
  height: calc(100vh - 40px);
  overflow: hidden;
}
.left-pane, .right-pane {
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}
.left-pane {
  width: 45%;
  background-color: #f0f2f5;
  border-right: 1px solid #d1d5db;
  padding: 0;
}
.right-pane {
  width: 55%;
  background-color: #ffffff;
  padding: 0;
}
.scrollable-content {
  flex-grow: 1;
  overflow-y: auto;
  padding: 20px;
}
.content-section > h2 { 
  margin-top: 0;
  padding-bottom: 10px;
  border-bottom: 1px solid #e5e7eb;
  font-size: 1.5em;
  color: #111827;
  margin-bottom: 20px;
}
.card {
  background: none;
  border: none;
  border-radius: 0;
  box-shadow: none;
  padding-top: 15px;
  margin-top: 15px;
  border-top: 1px solid #e0e0e0;
  transition: none;
}

.content-section > .card:first-child,
.recommendation-category > .card:first-child {
  border-top: none;
  margin-top: 0;
  padding-top: 0;
}

.principle-item h3 { font-size: 1.25em; color: #1f2937; margin-top: 0; margin-bottom: 0.5em; }
.recommendation-category > h3 { 
  font-size: 1.3em;
  color: #0056b3;
  margin-top: 25px; 
  margin-bottom:15px; 
  padding-bottom:8px; 
  border-bottom: 2px solid #bfdbfe;
}
.recommendation-category:first-child > h3 { margin-top:0;}
.recommendation-item h4 { font-size: 1.15em; color: #1f2937; margin-top: 0; margin-bottom: 0.5em;}
.rfi-question h3 { font-size: 1.25em; color: #1f2937; margin-top: 0; margin-bottom: 0.5em;}
h1, h2, h3, h4 { color: #111827; }
a { color: #007bff; text-decoration: none; }
a:hover { text-decoration: underline; color: #0056b3; }
code { 
  background-color: #e5e7eb;
  padding: 0.2em 0.4em; 
  margin: 0;
  font-size: 85%;
  border-radius: 3px; 
  font-family: \"SFMono-Regular\", Consolas, \"Liberation Mono\", Menlo, monospace;
}
pre code { display: block; padding: 10px; overflow-x: auto; }
:target {
  animation: highlight 2.5s ease-out;
}
section[id],
article[id],
h3[id] { }
@keyframes highlight {
  0% { background-color: #fff3cd; }
  70% { background-color: #fff3cd; }
  100% { background-color: transparent; }
}
@media (max-width: 768px) {
  .container { flex-direction: column; height: auto; overflow: visible; }
  .left-pane, .right-pane { width: 100%; height: auto; max-height: none; overflow-y: visible; }
  .left-pane { border-right: none; border-bottom: 1px solid #d1d5db; }
}
.github-btn {
  margin-left: auto;
  padding: 6px 16px;
  background: #2563eb;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-weight: 500;
  font-size: 1em;
  text-decoration: none;
  transition: background 0.2s, box-shadow 0.2s;
  box-shadow: 0 1px 4px rgba(37,99,235,0.08);
  cursor: pointer;
  display: inline-block;
}
.github-btn:hover {
  background: #1d4ed8;
  text-decoration: none;
}
.site-header nav select {
  font-size: 1em;
  padding: 4px 8px;
  margin-left: 8px;
  border-radius: 4px;
  border: 1px solid #b3b3b3;
  color: #007bff;
  background: #fff;
}
.site-header nav select:focus {
`;

  // Create output directory if it doesn't exist
  if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR);
  }

  writeFileSync(OUTPUT_HTML_FILE, finalHtml);
  writeFileSync(OUTPUT_CSS_FILE, cssContent);

  console.log(`Site generated successfully! Output: ${OUTPUT_HTML_FILE}`);
}

generateSite().catch(console.error);
