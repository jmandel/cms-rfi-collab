import { Marked } from 'marked';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import path from 'path';

// These constants should be at the top level of the script
const INPUT_MD_FILE = 'index.md';
const OUTPUT_DIR = 'dist';
const OUTPUT_HTML_FILE = path.join(OUTPUT_DIR, 'print.html');

interface HeadingData {
  level: number;
  text: string;
  id: string;
  originalMarkdown: string;
  children?: HeadingData[];
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

function preParseSection(markdown: string, headingLevel: number, sectionIdPrefix: string = ''): HeadingData[] {
  const items: HeadingData[] = [];
  const headingRegex = new RegExp(`^#{${headingLevel}}\\s+`, 'm');
  const rawItems = markdown.split(headingRegex).slice(1);

  for (const rawItemContent of rawItems) {
    const lines = rawItemContent.trim().split('\n');
    const titleLineFromSplit = (lines[0] || '').trim();

    const explicitId = extractExplicitId(titleLineFromSplit);
    const titleText = stripExplicitId(titleLineFromSplit);
    let finalId;

    if (explicitId) {
        finalId = explicitId;
    } else {
        const slug = slugify(titleText);
        finalId = sectionIdPrefix ? `${sectionIdPrefix}-${slug}` : slug;
    }
    
    items.push({
      level: headingLevel,
      text: titleText || `Untitled H${headingLevel}`,
      id: finalId,
      originalMarkdown: lines.slice(1).join('\n').trim()
    });
  }
  return items;
}

function preParseRecommendations(markdown: string): HeadingData[] {
  const categories: HeadingData[] = [];
  const categoryBlocks = markdown.split(/^##\s+/m).slice(1); 

  for (const categoryMd of categoryBlocks) {
    const lines = categoryMd.trim().split('\n');
    const categoryTitleLine = lines[0] || '';
    const explicitCategoryId = extractExplicitId(categoryTitleLine);
    const categoryTitleText = stripExplicitId(categoryTitleLine);
    const categoryId = explicitCategoryId || slugify(categoryTitleText);

    const category: HeadingData = {
      level: 2,
      text: categoryTitleText || 'Untitled Category',
      id: categoryId,
      originalMarkdown: '', 
      children: []
    };

    const recommendationsMdContent = lines.slice(1).join('\n');
    const recommendationItems = recommendationsMdContent.split(/^###\s+/m).slice(1);

    for (const recItemContent of recommendationItems) {
        const recLines = recItemContent.trim().split('\n');
        const recTitleLine = recLines[0] || '';
        
        const explicitRecId = extractExplicitId(recTitleLine);
        let recTitleText = stripExplicitId(recTitleLine);
        let recId = explicitRecId || slugify(recTitleText);
        let recBodyMarkdown = recLines.slice(1).join('\n');

        category.children?.push({
            level: 3,
            text: recTitleText || 'Untitled Recommendation',
            id: recId,
            originalMarkdown: recBodyMarkdown
        });
    }
    categories.push(category);
  }
  return categories;
}

function preParseRfiQuestions(markdown: string): HeadingData[] {
  const items: HeadingData[] = [];
  const rfiQuestionBlocks = markdown.split(/^###\s+/m).slice(1);

  for (const block of rfiQuestionBlocks) {
    const lines = block.trim().split('\n');
    const titleLine = lines[0] || '';
    const rfiCodeMatch = titleLine.match(/^([A-Z]{2,3}-\d+[a-z]?)\.?\s*(.*)/);
    let id: string;
    let text: string = titleLine;

    if (rfiCodeMatch && rfiCodeMatch[1]) {
      id = slugify(rfiCodeMatch[1]); 
    } else {
      const explicitId = extractExplicitId(titleLine);
      text = stripExplicitId(titleLine);
      id = explicitId || slugify(text);
    }
    
    let originalMarkdown = lines.slice(1).join('\n');
    originalMarkdown = originalMarkdown.replace(
        /\[([^\]]+)\]\((#[\w-]+)\)/g,
        (match, linkText, targetHref) => {
            const targetId = targetHref.substring(1); 
            return `<a href="${targetHref}" class="internal-link">${linkText}</a>`;
        }
    );

    items.push({
      level: 3,
      text: text || 'Untitled Question',
      id: id,
      originalMarkdown: originalMarkdown
    });
  }
  return items;
}

async function generatePrintSite() {
  if (!existsSync(INPUT_MD_FILE)) {
    console.error(`Error: Input file ${INPUT_MD_FILE} not found.`);
    process.exit(1);
  }

  const markdownContent = readFileSync(INPUT_MD_FILE, 'utf-8');
  const markedInstance = new Marked({ gfm: true });

  const majorSections = markdownContent.split(/^# (Guiding Principles|Technology Policy Recommendations|Response Letter)/m);

  if (majorSections.length < 7) {
    console.error("Could not parse the major H1 sections from index.md. Ensure H1 headings are correct: 'Guiding Principles', 'Technology Policy Recommendations', 'Response Letter'.");
    process.exit(1);
  }

  const principlesMd = majorSections[2] || '';
  const recommendationsMd = majorSections[4] || '';
  const letterMd = majorSections[6] || '';

  const principlesData = preParseSection(principlesMd, 3, 'principle');
  let principlesHtml = '';

  for (const principle of principlesData) {
    principlesHtml += `<article id="${principle.id}" class="principle-item">`;
    principlesHtml += `<h3 class="section-title">${principle.text}</h3>`;
    principlesHtml += await markedInstance.parse(principle.originalMarkdown);
    principlesHtml += `</article>`;
  }

  const recommendationsCategoryData = preParseRecommendations(recommendationsMd);
  let recommendationsHtml = '';
  for (const category of recommendationsCategoryData) {
    recommendationsHtml += `<div id="${category.id}" class="recommendation-category">`;
    recommendationsHtml += `<h3 class="category-title">${category.text}</h3>`;
    for (const rec of category.children || []) {
      recommendationsHtml += `<article id="${rec.id}" class="recommendation-item">`;
      recommendationsHtml += `<h4 class="section-title">${rec.text}</h4>`;
      recommendationsHtml += await markedInstance.parse(rec.originalMarkdown);
      recommendationsHtml += `</article>`;
    }
    recommendationsHtml += `</div>`;
  }
  
  const rfiQuestionsData = preParseRfiQuestions(letterMd);
  let letterHtml = '';
  for (const rfiQuestion of rfiQuestionsData) {
    letterHtml += `<article id="${rfiQuestion.id}" class="rfi-question">`;
    letterHtml += `<h3 class="section-title">${rfiQuestion.text}</h3>`;
    letterHtml += await markedInstance.parse(rfiQuestion.originalMarkdown);
    letterHtml += `</article>`;
  }

  const printHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Health Technology Ecosystem: RFI Responses - Print Version</title>
  <style>
    @media print {
      @page {
        margin: 2cm;
      }
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 1000px;
      margin: 0 auto;
      padding: 2rem;
    }

    h1, h2, h3, h4 {
      color: #111827;
    }

    h1 {
      font-size: 2rem;
      border-bottom: 5px solid slateblue;
      padding-bottom: 0.3em;
      margin-top: 2rem;
    }

    h2 {
      font-size: 1.5rem;
      border-bottom: 2px solid #bfdbfe;
      padding-bottom: 0.3em;
      margin-top: 1.5rem;
    }

    h3 {
      font-size: 1.2rem;
      margin-top: 1.2rem;
    }

    h4 {
      font-size: 1.1rem;
      margin-top: 1rem;
    }

    article {
      margin: 1.5rem 0;
    }

    .recommendation-category {
      margin: 2rem 0;
    }

    .category-title {
      color: #0056b3;
      margin-top: 1.5rem;
      margin-bottom: 1rem;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid #bfdbfe;
    }

    a {
      color: #007bff;
      text-decoration: none;
    }

    a:hover {
      text-decoration: underline;
    }

    code {
      background-color: #f8f9fa;
      padding: 0.2em 0.4em;
      border-radius: 3px;
      font-family: Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
      font-size: 85%;
    }

    pre {
      background-color: #f8f9fa;
      padding: 1rem;
      border-radius: 0.25rem;
      overflow-x: auto;
    }

    pre code {
      padding: 0;
      background-color: transparent;
      font-size: inherit;
    }

    table {
      border-collapse: collapse;
      width: 100%;
      margin-bottom: 1rem;
      page-break-inside: avoid;
    }

    th, td {
      border: 1px solid #dee2e6;
      padding: 0.75rem;
      vertical-align: top;
    }

    th {
      background-color: #f8f9fa;
      font-weight: bold;
    }

    blockquote {
      border-left: 4px solid #007bff;
      padding-left: 1rem;
      margin-left: 0;
      color: #6c757d;
    }

    img {
      max-width: 100%;
      height: auto;
      page-break-inside: avoid;
    }

    .toc {
      margin: 2rem 0;
      padding: 1rem;
      background-color: #f8f9fa;
      border-radius: 0.25rem;
      page-break-after: always;
    }

    .toc h2 {
      margin-top: 0;
      border-bottom: none;
    }

    .toc ul {
      list-style: none;
      padding-left: 0;
      margin: 0;
    }

    .toc ul.nested {
      padding-left: 1.5rem;
      margin: 0.5rem 0;
      list-style: disc;
    }

    .toc ul.nested-further {
      padding-left: 1.5rem;
      margin: 0.25rem 0;
      list-style: circle;
    }

    .toc li {
      margin: 0.25rem 0;
    }

    .toc > ul > li {
      list-style: disc;
      margin-left: 1rem;
    }

    .toc a {
      color: #0056b3;
      text-decoration: none;
    }

    .toc a:hover {
      text-decoration: underline;
    }

  </style>
</head>
<body>
  <h1>Health Technology Ecosystem: RFI Responses</h1>

  <nav class="toc">
    <h2>Table of Contents</h2>
    <ul>
      <li><a href="#response-letter-heading">Response Letter</a>
        <ul class="nested">
          ${rfiQuestionsData.map(q => `<li><a href="#${q.id}">${q.text}</a></li>`).join('\n          ')}
        </ul>
      </li>
      <li><a href="#guiding-principles-heading">Guiding Principles</a>
        <ul class="nested">
          ${principlesData.map(p => `<li><a href="#${p.id}">${p.text}</a></li>`).join('\n          ')}
        </ul>
      </li>
      <li><a href="#technology-policy-recommendations-heading">Technology Policy Recommendations</a>
        <ul class="nested">
          ${recommendationsCategoryData.map(cat => `
          <li><a href="#${cat.id}">${cat.text}</a>
            ${cat.children && cat.children.length > 0 ? `
            <ul class="nested-further">
              ${cat.children.map(rec => `<li><a href="#${rec.id}">${rec.text}</a></li>`).join('\n              ')}
            </ul>` : ''}
          </li>`).join('\n          ')}
        </ul>
      </li>
    </ul>
  </nav>

  <section id="response-letter-heading">
    <h2>Response Letter</h2>
    ${letterHtml}
  </section>

  <section id="guiding-principles-heading">
    <h2>Guiding Principles</h2>
    ${principlesHtml}
  </section>

  <section id="technology-policy-recommendations-heading">
    <h2>Technology Policy Recommendations</h2>
    ${recommendationsHtml}
  </section>
</body>
</html>`;

  if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR);
  }
  writeFileSync(OUTPUT_HTML_FILE, printHtml);
  console.log(`Print version generated successfully! Output: ${OUTPUT_HTML_FILE}`);
}

generatePrintSite().catch(console.error); 