import { Marked } from 'marked';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import path from 'path';

// These constants should be at the top level of the script
const INPUT_MD_FILE = 'index.md';
const OUTPUT_DIR = 'dist';
const OUTPUT_HTML_FILE = path.join(OUTPUT_DIR, 'index.html');
// CSS will be inline in HTML

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
        finalId = explicitId; // Use explicit ID directly if provided
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
            return `<a href="${targetHref}" class="internal-link" data-target-pane-item="${targetId}">${linkText}</a>`;
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

async function generateSite() {
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
  // btoa and atob are not available in Node.js environment directly,
  // but they will be available in the browser environment where the script runs.
  // For Node.js side generation, we'll use Buffer for Base64.

  for (const principle of principlesData) {
    const base64EncodedText = Buffer.from(principle.text).toString('base64');
    const base64EncodedMarkdown = Buffer.from(principle.originalMarkdown).toString('base64');
    
    principlesHtml += `<article id="${principle.id}" class="principle-item card">`;
    principlesHtml += `<div class="card-header">`;
    principlesHtml += `<h3 class="section-title">${principle.text} <a href="#${principle.id}" class="anchor-link" aria-label="Link to section: ${principle.text}">🔗</a></h3>`;
    principlesHtml += `<div class="item-actions">`;
    principlesHtml += `<button class="copy-btn" data-id="${principle.id}" data-text="${base64EncodedText}">Copy</button>`;
    principlesHtml += `<button class="share-btn" data-id="${principle.id}" data-text="${base64EncodedText}" style="display:none;">Share</button>`;
    principlesHtml += `</div></div>`;
    principlesHtml += await markedInstance.parse(principle.originalMarkdown);
    principlesHtml += `<div id="md-${principle.id}" style="display:none;">${base64EncodedMarkdown}</div>`;
    principlesHtml += `</article>`;
  }

  const recommendationsCategoryData = preParseRecommendations(recommendationsMd);
  let recommendationsHtml = '';
  for (const category of recommendationsCategoryData) {
    recommendationsHtml += `<div id="${category.id}" class="recommendation-category">`;
    recommendationsHtml += `<h3 class="category-title section-title">${category.text} <a href="#${category.id}" class="anchor-link" aria-label="Link to section: ${category.text}">🔗</a></h3>`;
    for (const rec of category.children || []) {
      const base64EncodedRecText = Buffer.from(rec.text).toString('base64');
      const base64EncodedRecMarkdown = Buffer.from(rec.originalMarkdown).toString('base64');

      recommendationsHtml += `<article id="${rec.id}" class="recommendation-item card">`;
      recommendationsHtml += `<div class="card-header">`;
      recommendationsHtml += `<h4 class="section-title">${rec.text} <a href="#${rec.id}" class="anchor-link" aria-label="Link to section: ${rec.text}">🔗</a></h4>`;
      recommendationsHtml += `<div class="item-actions">`;
      recommendationsHtml += `<button class="copy-btn" data-id="${rec.id}" data-text="${base64EncodedRecText}">Copy</button>`;
      recommendationsHtml += `<button class="share-btn" data-id="${rec.id}" data-text="${base64EncodedRecText}" style="display:none;">Share</button>`;
      recommendationsHtml += `</div></div>`;
      recommendationsHtml += await markedInstance.parse(rec.originalMarkdown);
      recommendationsHtml += `<div id="md-${rec.id}" style="display:none;">${base64EncodedRecMarkdown}</div>`;
      recommendationsHtml += `</article>`;
    }
    recommendationsHtml += `</div>`;
  }
  
  const rfiQuestionsData = preParseRfiQuestions(letterMd);
  let letterHtml = '';
  for (const rfiQuestion of rfiQuestionsData) {
    letterHtml += `<article id="${rfiQuestion.id}" class="rfi-question card">`;
    letterHtml += `<h3 class="section-title">${rfiQuestion.text} <a href="#${rfiQuestion.id}" class="anchor-link" aria-label="Link to section: ${rfiQuestion.text}">🔗</a></h3>`;
    letterHtml += await markedInstance.parse(rfiQuestion.originalMarkdown);
    letterHtml += `</article>`;
  }

  let mobileTocHtml = '<h4>Navigation</h4><ul>';
  mobileTocHtml += `<li><a href="#response-letter-heading">Response Letter</a></li>`;
  mobileTocHtml += '<ul class="nested">';
  for (const q of rfiQuestionsData) {
    mobileTocHtml += `<li><a href="#${q.id}">${q.text.length > 50 ? q.text.substring(0,47)+'...' : q.text }</a></li>`;
  }
  mobileTocHtml += '</ul>';
  mobileTocHtml += `<li><a href="#guiding-principles-heading">Guiding Principles</a></li>`;
  mobileTocHtml += '<ul class="nested">';
  for (const p of principlesData) {
    mobileTocHtml += `<li><a href="#${p.id}">${p.text}</a></li>`;
  }
  mobileTocHtml += '</ul>';
  mobileTocHtml += `<li><a href="#technology-policy-recommendations-heading">Technology Policy Recommendations</a></li>`;
  mobileTocHtml += '<ul class="nested">';
  for (const cat of recommendationsCategoryData) {
    mobileTocHtml += `<li><a href="#${cat.id}">${cat.text}</a></li>`;
  }
  mobileTocHtml += '</ul>';
  mobileTocHtml += '</ul>';

  // Desktop TOC is now the main menubar content
  let desktopTocHtml = '<nav class="desktop-toc"><h4>Quick Navigation</h4><ul>'; // Removed sticky-within-pane
  desktopTocHtml += `<li><a href="#guiding-principles-heading">Guiding Principles</a></li>`;
  desktopTocHtml += '<ul class="nested">';
  for (const p of principlesData) {
    desktopTocHtml += `<li><a href="#${p.id}">${p.text}</a></li>`;
  }
  desktopTocHtml += '</ul>';
  desktopTocHtml += `<li><a href="#technology-policy-recommendations-heading">Technology Policy Recommendations</a></li>`;
  desktopTocHtml += '<ul class="nested">';
  for (const cat of recommendationsCategoryData) {
    desktopTocHtml += `<li><a href="#${cat.id}">${cat.text}</a></li>`;
     if (cat.children && cat.children.length > 0) {
        desktopTocHtml += '<ul class="nested-further">';
        for (const rec of cat.children) {
            desktopTocHtml += `<li><a href="#${rec.id}">${rec.text.length > 35 ? rec.text.substring(0,32)+'...' : rec.text}</a></li>`;
        }
        desktopTocHtml += '</ul>';
     }
  }
  desktopTocHtml += '</ul>';
  desktopTocHtml += '</ul></nav>';

  const finalHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Health Technology Ecosystem: RFI Responses</title>
  <style>
    :root {
      --header-height: 55px; /* Will be dynamically updated by JS */
      --menubar-width-collapsed: 0px; /* Or a small width if you want a sliver */
      --menubar-width-expanded: 420px; /* Increased by 50% from 280px */
      --primary-blue: #007bff;
      --text-dark: #212529;
      --text-light: #495057;
      --bg-light: #f8f9fa;
      --bg-pane-left: #e9ecef; /* Will be RFI letter background */
      --bg-pane-right: #ffffff; /* Will be Principles/Recs background */
      --bg-menubar: #f8f9fa; /* Changed menubar background slightly for differentiation */
      --border-color: #dee2e6;
      --card-border-top: #ced4da;
      --highlight-bg: #fff3cd;
      --menubar-width-expanded-mobile: 85vw; /* For mobile view when menu is open */
    }
    html {
        box-sizing: border-box;
        scroll-behavior: smooth;
    }
    *, *::before, *::after {
        box-sizing: inherit;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      margin: 0;
      line-height: 1.6;
      color: var(--text-dark);
      background-color: var(--bg-light);
    }

    .sticky { position: sticky; top: 0; z-index: 1020; }
    /* .sticky-within-pane { position: sticky; top: 15px; align-self: flex-start; } /* This class is being removed from HTML */

    .site-header {
      background: #fff;
      border-bottom: 1px solid var(--border-color);
      padding: 0 1rem;
      height: var(--header-height);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .site-header .site-title { font-size: 1.1rem; font-weight: 600; margin: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; flex-grow: 1; }
    .site-header .menu-toggle { display: none; background: none; border: 1px solid var(--primary-blue); color: var(--primary-blue); padding: 0.375rem 0.75rem; font-size: 1rem; cursor: pointer; border-radius: 0.25rem; margin-right: 0.5rem; }
    /* Styles for the moved single-pane toggle */
    .site-header > input[type="checkbox"]#single-pane-toggle {
      margin-left: 0.25rem; /* Space from menu button */
      margin-right: 0.25rem;
      cursor: pointer;
      /* vertical-align: middle; -- Handled by flex parent's align-items: center */
    }
    .site-header > label[for="single-pane-toggle"] {
      margin-right: 0.75rem; /* Space before title */
      font-size: 0.875rem;
      white-space: nowrap;
      cursor: pointer;
      user-select: none;
      color: var(--text-light);
    }
    .header-control-group { display: flex; align-items: center; margin-left: auto; /* Pushes it to the right */ }
    .header-control-group label { margin-right: 0.75rem; font-size: 0.875rem; white-space: nowrap; cursor: pointer; user-select: none; color: var(--text-light); }
    .header-control-group input[type="checkbox"] { margin-right: 0.25rem; cursor: pointer; vertical-align: middle;}

    .github-btn { padding: 0.4rem 0.8rem; background: var(--primary-blue); color: #fff; border-radius: 0.25rem; font-weight: 500; text-decoration: none; font-size: 0.875rem; white-space: nowrap; }
    .github-btn:hover { background: #0056b3; }

    .app-layout {
      display: grid;
      grid-template-columns: var(--menubar-width-collapsed) 1fr; /* Menubar (closed) and content */
      grid-template-rows: calc(100vh - var(--header-height)) auto; /* Full height minus header, then auto for footer if any */
      grid-template-areas:
        "menubar content";
      height: calc(100vh - var(--header-height));
      transition: grid-template-columns 0.3s ease-in-out;
    }

    .app-layout.menubar-open {
      grid-template-columns: var(--menubar-width-expanded) 1fr; /* Menubar (open) and content */
    }

    .menubar {
      grid-area: menubar;
      background-color: var(--bg-menubar);
      border-right: 1px solid var(--border-color);
      overflow-y: auto;
      overflow-x: hidden; /* Prevent horizontal scrollbar during transition */
      padding: 1rem;
      transition: padding 0.3s ease-in-out, width 0.3s ease-in-out; /* Smooth padding transition */
      width: var(--menubar-width-expanded); /* Set fixed width for content inside */
      box-sizing: border-box;
      height: 100%; /* Fill the grid area height */
    }
    
    .app-layout:not(.menubar-open) .menubar {
        padding-left: 0;
        padding-right: 0;
    }
    .app-layout:not(.menubar-open) .menubar > * {
        display: none; /* Hide children when collapsed */
    }

    .content-wrapper {
      grid-area: content;
      display: grid; 
      overflow: hidden; /* Default: Prevent double scrollbars, individual panes will scroll */
      height: 100%;
    }
        
    .left-pane-content { 
      grid-area: rfi; 
      background-color: var(--bg-pane-left);
      overflow-y: auto; /* Default: scrolls itself */
      height: 100%; 
    }
    .right-pane-content-wrapper { 
      grid-area: principles; 
      background-color: var(--bg-pane-right); 
      overflow-y: auto; /* Default: scrolls itself */
      height: 100%;
    }
    
    .actual-content-for-right-pane {
      color: var(--text-light);
    }

    .left-pane-content > section, 
    .actual-content-for-right-pane > section { padding: 1.5rem; } 
    
     .left-pane-content > section:has(> .sticky-section-header:first-child),
     .actual-content-for-right-pane > section:has(> .sticky-section-header:first-child) {
        padding-top: 0; 
    }

    .content-section > h2 { 
      margin-top: 0; 
      color: #111827; 
      border-bottom: 5px solid slateblue;
      padding: 0px;
    }

    .sticky-section-header {
      position: sticky;
      top: -0px;
      background-color: var(--bg-pane-left); 
      font-size :1rem;
      z-index: 10;
    }
    .right-pane-content-wrapper .sticky-section-header {
        background-color: var(--bg-pane-right);
    }

    .recommendation-category > .category-title { font-size: 1.4rem; color: #0056b3; margin-top: 1.5rem; margin-bottom:1rem; padding-bottom:0.5rem; border-bottom: 2px solid #bfdbfe; }
    .recommendation-category:first-child > .category-title { margin-top:0; }

    .card { background: none; border: none; padding-top: 1rem; margin-top: 1rem; border-top: 1px solid var(--card-border-top); }
    .content-section > .card:first-child, .recommendation-category > .card:first-child { border-top: none; margin-top: 0; padding-top: 0; }
    
    article h3 {font-size: 1.2rem;} 
    article h4 {font-size: 1.1rem;}
    /* article h3, article h4 { margin-top: 0; margin-bottom: 0.5em; color: #1f2937; } */ /* Adjusted by card-header */

    .card-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start; /* Align items to the start of the cross axis */
        margin-bottom: 0.5em;
    }
    .card-header .section-title {
        margin-top: 0;
        margin-bottom: 0; /* Remove bottom margin if buttons are present */
        color: #1f2937;
        flex-grow: 1; /* Allow title to take available space */
    }
    .item-actions {
        display: flex;
        gap: 0.5rem;
        margin-left: 1rem; /* Space between title and buttons */
        flex-shrink: 0; /* Prevent buttons from shrinking */
    }
    .item-actions button {
        background-color: #e9ecef;
        border: 1px solid #ced4da;
        color: var(--text-light);
        padding: 0.2rem 0.5rem;
        font-size: 0.75rem;
        border-radius: 0.2rem;
        cursor: pointer;
        white-space: nowrap;
    }
    .item-actions button:hover {
        background-color: #d6dce1;
    }

    a.internal-link { color: var(--primary-blue); text-decoration: none; }
    a.internal-link:hover { text-decoration: underline; }
    code { background-color: #e9ecef; padding: 0.2em 0.4em; margin: 0; font-size: 85%; border-radius: 3px; font-family: Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; word-break: break-word; }
    pre { background-color: #e9ecef; padding: 1rem; border-radius: 0.25rem; overflow-x: auto;}
    pre code { padding:0; background-color: transparent; font-size: inherit; }

    .section-title { position: relative; }
    .anchor-link { font-size: 0.8em; font-weight: normal; text-decoration: none; color: var(--primary-blue); opacity: 0.25; transition: opacity 0.2s ease-in-out; margin-left: 0.3em; vertical-align: middle; }
    .section-title:hover .anchor-link, .anchor-link:hover, .anchor-link:focus { opacity: 1; text-decoration: none; }

    .highlighted-item-temp { animation: highlight-animation 2.5s ease-out; }
    @keyframes highlight-animation { 0% { background-color: var(--highlight-bg); } 80% { background-color: var(--highlight-bg); } 100% { background-color: transparent; } }
    
    [id] { scroll-margin-top: calc(var(--header-height) + 15px); } 

    .desktop-toc { width: 100%; font-size: 0.9rem; height: auto; overflow-y: visible; padding-right: 0; }
    .desktop-toc h4 { margin-top: 0; font-size: 1.1em; color: var(--text-dark); margin-bottom: 0.75rem; }
    .desktop-toc ul { list-style: none; padding-left: 0; margin-bottom: 0.75rem; }
    .desktop-toc ul.nested { padding-left: 0.75rem; }
    .desktop-toc ul.nested-further { padding-left: 0.75rem; }
    .desktop-toc li a { display: block; padding: 2px 0 2px 7px; text-decoration: none; color: var(--primary-blue); border-left: 3px solid transparent; }
    .desktop-toc li a:hover { text-decoration: underline; border-left-color: #0056b3; }
    .desktop-toc li a.active-toc-item { font-weight: 600; color: #0056b3; border-left-color: var(--primary-blue); }

    /* Single Pane Mode Styles */
    body.single-pane-mode .content-wrapper {
        display: flex;
        flex-direction: column;
        overflow-y: auto; /* Main scrollbar here */
        grid-template-columns: 1fr !important; /* Override desktop grid */
        grid-template-areas: none !important; /* Override desktop grid */
    }
    body.single-pane-mode .left-pane-content,
    body.single-pane-mode .right-pane-content-wrapper {
        width: 100%;
        height: auto !important; /* Override fixed heights from mobile or desktop */
        overflow-y: visible; /* Content flows, parent scrolls */
        border-right: none !important; /* Remove inter-pane border */
        flex-basis: auto;
        flex-grow: 0;
        flex-shrink: 0;
    }
    body.single-pane-mode .left-pane-content {
        border-bottom: 1px solid var(--border-color); /* Separate stacked sections */
    }
    body.single-pane-mode .right-pane-content-wrapper {
        border-bottom: none;
    }
     body.single-pane-mode .actual-content-for-right-pane {
        height: auto !important;
        overflow-y: visible !important;
    }


    @media (min-width: 1024px) { /* Desktop layout (two-pane default) */
      .site-header .menu-toggle { display: block; }
      
      body:not(.single-pane-mode) .content-wrapper {
        grid-template-columns: 45% 1fr; 
        grid-template-rows: 100%; 
        grid-template-areas: "rfi principles";
      }
      body:not(.single-pane-mode) .left-pane-content { 
        border-right: 1px solid var(--border-color); 
      }
      /* Other two-pane specific desktop styles remain as they were */
    }

    @media (max-width: 1023px) { /* Mobile/Tablet layout (already somewhat single-flow) */
      .site-header .menu-toggle { display: block; }
      .site-header .site-title { font-size: 1rem; max-width: calc(100% - 180px); /* Adjusted for more controls */ }
      /* Style for the moved label in mobile view */
      .site-header > label[for="single-pane-toggle"] { 
        font-size: 0.8rem; 
        margin-right: 0.5rem;
      }
      /* Original style for label if it were still in header-control-group */
      .header-control-group label { font-size: 0.8rem; margin-right: 0.5rem;}
      .github-btn { font-size: 0.8rem; padding: 0.3rem 0.6rem; }
      [id] { scroll-margin-top: calc(var(--header-height) + 10px); }

      .app-layout.menubar-open {
        grid-template-columns: var(--menubar-width-expanded-mobile) 1fr;
      }
      
      body:not(.single-pane-mode) .content-wrapper { /* Default mobile is two-rows flex */
        display: flex; 
        flex-direction: column;
        overflow: hidden; 
        height: 100%; 
      }
      body:not(.single-pane-mode) .left-pane-content { 
        border-right: none; 
        border-bottom: 1px solid var(--border-color);
        height: 50%; 
        overflow-y: auto; 
        flex-shrink: 0; 
      }
      body:not(.single-pane-mode) .right-pane-content-wrapper {
        overflow-y: auto; 
        flex-grow: 1; 
        height: 0; 
      }
      body:not(.single-pane-mode) .actual-content-for-right-pane {
        height: auto; 
      }

      .content-section > h2.sticky-section-header {
        font-size: 1rem; 
        padding-top: 0.2rem; 
        padding-bottom: 0.2rem;
        border: 0px;
        width: 100%;
        border-left: 5px solid slateblue;
        padding-left: 5px;
      }
    }
  </style>
</head>
<body>
  <header class="site-header sticky">
    <button class="menu-toggle" id="menu-toggle-btn" aria-expanded="false" aria-controls="main-menubar">Menu</button>
    <input type="checkbox" id="single-pane-toggle" name="singlePane">
    <label for="single-pane-toggle">Single Pane</label>
    <h1 class="site-title">Health Tech RFI Response</h1>
    <div class="header-control-group">
        <a class="github-btn" href="https://github.com/jmandel/cms-rfi-collab" target="_blank" rel="noopener">Contribute on GitHub</a>
    </div>
  </header>

  <div class="app-layout">
    <aside id="main-menubar" class="menubar">
      ${desktopTocHtml}
    </aside>

    <div class="content-wrapper">
      <aside class="left-pane-content" id="rfi-letter-pane-host">
        <section id="response-letter-heading" class="content-section">
          <h2 class="sticky-section-header">Response Letter</h2>
          ${letterHtml}
        </section>
      </aside>

      <div class="right-pane-content-wrapper" id="principles-recommendations-pane-wrapper">
         <main class="actual-content-for-right-pane" id="principles-recommendations-pane-host">
           <section id="guiding-principles-heading" class="content-section">
             <h2 class="sticky-section-header">Guiding Principles</h2>
             ${principlesHtml}
           </section>
           <section id="technology-policy-recommendations-heading" class="content-section">
             <h2 class="sticky-section-header">Technology Policy Recommendations</h2>
             ${recommendationsHtml}
           </section>
         </main>
      </div>
    </div>
  </div>

<script>
document.addEventListener('DOMContentLoaded', () => {
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
    const DESKTOP_BREAKPOINT = 1024;
    const bodyElement = document.body;
    const appLayout = document.querySelector('.app-layout');
    const headerElement = document.querySelector('.site-header');
    let headerHeight = headerElement ? headerElement.offsetHeight : 55; // Made let
    
    function updateHeaderHeightVar() {
        headerHeight = headerElement ? headerElement.offsetHeight : 55;
        document.documentElement.style.setProperty('--header-height', \`\${headerHeight}px\`);
    }
    updateHeaderHeightVar(); // Initial call

    const menuToggleBtn = document.getElementById('menu-toggle-btn');
    const mainMenubar = document.getElementById('main-menubar');
    const singlePaneToggle = document.getElementById('single-pane-toggle');
    
    const leftPaneHost = document.getElementById('rfi-letter-pane-host');
    const rightPaneScroller = document.getElementById('principles-recommendations-pane-wrapper');
    const rightPaneObservedContent = document.getElementById('principles-recommendations-pane-host');
    const desktopTocElement = mainMenubar.querySelector('.desktop-toc');
    let tocIntersectionObserver = null;

    // Copy and Share functionality
    document.querySelectorAll('.copy-btn').forEach(button => {
        button.addEventListener('click', async (event) => {
            const buttonEl = event.target; 
            const id = buttonEl.dataset.id;
            const base64Text = buttonEl.dataset.text;
            const text = atob(base64Text || '');
            
            let markdownContent = "Error retrieving markdown content.";
            const markdownHostId = \`md-\${id}\`;
            const markdownHostEl = document.getElementById(markdownHostId);

            if (markdownHostEl) {
                const base64Markdown = markdownHostEl.textContent || '';
                markdownContent = atob(base64Markdown);
            } else {
                console.error(\`Markdown host element not found: #\${markdownHostId}\`);
            }
            
            const url = \`\${window.location.origin}\${window.location.pathname}#\${id}\`;
            const copyText = \`\${text}\n\${url}\n\n\${markdownContent}\`;
            try {
                await navigator.clipboard.writeText(copyText);
                buttonEl.textContent = 'Copied!';
                setTimeout(() => { buttonEl.textContent = 'Copy'; }, 2000);
            } catch (err) {
                console.error('Failed to copy: ', err);
                buttonEl.textContent = 'Error';
                setTimeout(() => { buttonEl.textContent = 'Copy'; }, 2000);
            }
        });
    });

    if (navigator.share) {
        document.querySelectorAll('.share-btn').forEach(button => {
            button.style.display = 'inline-block'; // Show share button
            button.addEventListener('click', async (event) => {
                const buttonEl = event.target;
                const id = buttonEl.dataset.id;
                const base64Text = buttonEl.dataset.text;
                const text = atob(base64Text || '');
                const url = \`\${window.location.origin}\${window.location.pathname}#\${id}\`;
                try {
                    await navigator.share({
                        title: text,
                        text: \`Check out this section: \${text}\`, // Optional: more descriptive text
                        url: url,
                    });
                } catch (err) {
                    console.error('Error sharing: ', err);
                }
            });
        });
    }


    function applySinglePaneMode(isSinglePane) {
        if (isSinglePane) {
            bodyElement.classList.add('single-pane-mode');
        } else {
            bodyElement.classList.remove('single-pane-mode');
        }
        if (singlePaneToggle) {
            singlePaneToggle.checked = isSinglePane;
        }
        // Re-evaluate TOC interactions since layout changed
        setupDesktopTocInteractions(); 
    }

    function updateURLForSinglePane(isSinglePane) {
        const url = new URL(window.location.href);
        if (isSinglePane) {
            url.searchParams.set('singlePane', 'true');
        } else {
            url.searchParams.delete('singlePane');
        }
        history.replaceState({}, '', url.toString());
    }

    if (singlePaneToggle) {
        const urlParams = new URLSearchParams(window.location.search);
        let initialSinglePane;

        if (window.innerWidth < DESKTOP_BREAKPOINT) { // Mobile view
            if (urlParams.has('singlePane')) { // Check if the parameter exists
                initialSinglePane = urlParams.get('singlePane') === 'true'; // Respect explicit param
            } else {
                initialSinglePane = true; // Default to true on mobile if param is absent
            }
        } else { // Desktop view
            initialSinglePane = urlParams.get('singlePane') === 'true'; // Default to false unless param is true
        }
        
        applySinglePaneMode(initialSinglePane); // Applies class and sets checkbox

        singlePaneToggle.addEventListener('change', (event) => {
            const isChecked = event.target.checked;
            applySinglePaneMode(isChecked);
            updateURLForSinglePane(isChecked);
        });
    }


    if (menuToggleBtn && mainMenubar && appLayout) {
        menuToggleBtn.addEventListener('click', () => {
            const isExpanded = menuToggleBtn.getAttribute('aria-expanded') === 'true';
            menuToggleBtn.setAttribute('aria-expanded', String(!isExpanded));
            appLayout.classList.toggle('menubar-open');
        });

        mainMenubar.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', (event) => {
                if (window.innerWidth < DESKTOP_BREAKPOINT) { 
                    if (appLayout.classList.contains('menubar-open')) {
                        const isTocLink = link.closest('.desktop-toc') && link.getAttribute('href')?.startsWith('#');
                        const isInterPaneLink = link.classList.contains('internal-link') && link.dataset.targetPaneItem;
                        if (isTocLink || isInterPaneLink || !link.getAttribute('href')?.startsWith('#')) {
                            menuToggleBtn.setAttribute('aria-expanded', 'false');
                            appLayout.classList.remove('menubar-open');
                        }
                    }
                }
            });
        });
    }

    function highlightTarget(targetElement) {
        if (!targetElement) return;
        targetElement.classList.add('highlighted-item-temp');
        setTimeout(() => {
            targetElement.classList.remove('highlighted-item-temp');
        }, 2500);
    }
    
    function getScrollTargetOffset(targetElement, scrollContainer) {
        if (!targetElement || !scrollContainer) return 0;
        const containerRect = scrollContainer.getBoundingClientRect();
        const targetRect = targetElement.getBoundingClientRect();
        const scrollTopToAlignTop = targetRect.top - containerRect.top + scrollContainer.scrollTop;
        let offsetDueToStickyHeader = 0;
        const isTargetMajorSection = targetElement.matches('#response-letter-heading, #guiding-principles-heading, #technology-policy-recommendations-heading');
        if (!isTargetMajorSection) {
            const contentSection = targetElement.closest('.content-section');
            if (contentSection) {
                const stickyHeader = contentSection.querySelector('.sticky-section-header');
                if (stickyHeader && getComputedStyle(stickyHeader).position === 'sticky' && stickyHeader.parentElement === contentSection) {
                    offsetDueToStickyHeader = stickyHeader.offsetHeight;
                }
            }
        }
        const desiredPadding = 15;
        let finalScrollOffset = desiredPadding; 
        if (!isTargetMajorSection && offsetDueToStickyHeader > 0) {
            finalScrollOffset = offsetDueToStickyHeader + desiredPadding;
        }
        return scrollTopToAlignTop - finalScrollOffset;
    }

    function handleDesktopInterPaneLinking() { 
        if (!rightPaneScroller) return;
        document.querySelectorAll('a.internal-link[data-target-pane-item]').forEach(link => {
            link.addEventListener('click', function(event) {
                const linkElement = this; // The clicked <a> tag
                const targetId = linkElement.dataset.targetPaneItem;
                const targetElement = targetId ? document.getElementById(targetId) : null;

                if (bodyElement.classList.contains('single-pane-mode')) {
                    event.preventDefault(); // Take full control of navigation

                    const sourceElement = linkElement.closest('article[id], div.recommendation-category[id]');
                    const sourceId = sourceElement ? sourceElement.id : null;
                    const currentHash = window.location.hash.substring(1);

                    if (sourceId && sourceId !== targetId && sourceId !== currentHash) {
                        // Push the source anchor to history. This changes URL but doesn't fire hashchange.
                        // The user won't see an immediate scroll to sourceId.
                        history.pushState(null, "", "#" + sourceId);
                    }

                    // Now, set the hash to targetId. This WILL fire hashchange.
                    // handleInitialHash will scroll to targetId and highlight it.
                    // This creates a new history entry if targetId is different from what pushState just set (i.e. sourceId).
                    if (targetId) {
                        // Check if the current hash (which might have been updated by pushState)
                        // is already the targetId. If so, setting it again might be redundant
                        // but harmless, or could ensure hashchange fires if it somehow didn't.
                        // More simply, just set it. If it's the same, no new history entry. If different, new entry.
                        window.location.hash = targetId;
                    }
                    return; 
                }
                
                // Desktop two-pane mode logic:
                if (window.innerWidth >= DESKTOP_BREAKPOINT) {
                    event.preventDefault(); // Prevent default only in two-pane desktop.
                    if (targetElement) { 
                        const scrollTopTo = getScrollTargetOffset(targetElement, rightPaneScroller);
                        rightPaneScroller.scrollTo({ top: scrollTopTo, behavior: 'instant' });
                        highlightTarget(targetElement);
                        updateDesktopTocActiveState(targetId);
                        window.location.hash = targetId; // Update URL hash
                    } else {
                        console.warn('Inter-pane link target ID not found: ' + targetId);
                        window.location.hash = this.getAttribute('href'); 
                    }
                }
                // On mobile (not single-pane mode here, and not desktop two-pane), 
                // default hash navigation occurs as event.preventDefault() is not called.
            });
        });
    }
    
    function updateDesktopTocActiveState(targetId) {
        if (!desktopTocElement) return;
        desktopTocElement.querySelectorAll('a').forEach(a => a.classList.remove('active-toc-item'));
        const activeLink = desktopTocElement.querySelector(\`a[href="#\${targetId}"]\`);
        if (activeLink) {
            activeLink.classList.add('active-toc-item');
        }
    }

    function setupDesktopTocInteractions() { 
        if (tocIntersectionObserver) {
            tocIntersectionObserver.disconnect();
            tocIntersectionObserver = null;
        }
        if (!desktopTocElement) return;

        // Clear previous simple listeners if any, to avoid multiple bindings
        desktopTocElement.querySelectorAll('a').forEach(link => {
            // A bit hacky to remove/re-add, ideally use a flag or more robust event management
            const newLink = link.cloneNode(true);
            link.parentNode.replaceChild(newLink, link);
        });
        
        const currentTocLinks = desktopTocElement.querySelectorAll('a');

        if (bodyElement.classList.contains('single-pane-mode') || window.innerWidth < DESKTOP_BREAKPOINT) {
            // Simple anchor behavior for single-pane or mobile
            currentTocLinks.forEach(link => {
                link.addEventListener('click', function(event) {
                    // Default behavior will scroll. Menubar closing is handled by generic listener.
                    // No preventDefault here.
                });
            });
            return; 
        }

        // For two-pane desktop mode:
        if (!rightPaneScroller || !rightPaneObservedContent) return;

        currentTocLinks.forEach(link => {
            link.addEventListener('click', function(event) {
                event.preventDefault(); 
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement && rightPaneObservedContent && targetElement.closest('#' + rightPaneObservedContent.id)) {
                     const scrollTopTo = getScrollTargetOffset(targetElement, rightPaneScroller);
                    rightPaneScroller.scrollTo({ top: scrollTopTo, behavior: 'instant' });
                    highlightTarget(targetElement);
                    updateDesktopTocActiveState(targetId);
                }
            });
        });

        const contentHeadings = Array.from(rightPaneObservedContent.querySelectorAll('h2[id], h3[id], h4[id], article[id]'));
        let lastVisibleTocLink = null;
        tocIntersectionObserver = new IntersectionObserver(entries => {
            let bestVisibleEntry = null;
            for (const entry of entries) {
                if (entry.isIntersecting) {
                    if (!bestVisibleEntry || entry.boundingClientRect.top < bestVisibleEntry.boundingClientRect.top) {
                        bestVisibleEntry = entry;
                    }
                }
            }
            if (bestVisibleEntry) {
                const id = bestVisibleEntry.target.getAttribute('id');
                const tocLink = desktopTocElement.querySelector(\`a[href="#\${id}"]\`);
                if (tocLink && tocLink !== lastVisibleTocLink) {
                    updateDesktopTocActiveState(id); // Use the function for consistency
                    lastVisibleTocLink = tocLink;
                }
            }
        }, { 
            root: rightPaneScroller, 
            rootMargin: \`-\${headerHeight + 10}px 0px -75% 0px\`, 
            threshold: 0.01 
        });
        contentHeadings.forEach(heading => tocIntersectionObserver.observe(heading));
    }
    
    function handleInitialHash() {
        updateHeaderHeightVar(); // Ensure headerHeight is current before any calculations
        const hash = window.location.hash.substring(1);

        if (!hash) {
            return;
        }
        const targetElement = document.getElementById(hash);
        
        if (!targetElement) {
            console.warn("handleInitialHash: Target element for hash '" + hash + "' not found.");
            return;
        }

        const isSinglePane = bodyElement.classList.contains('single-pane-mode');
        const isDesktop = window.innerWidth >= DESKTOP_BREAKPOINT;

        if (isSinglePane || !isDesktop) { // Single pane mode OR mobile (which is already single flow)
            targetElement.scrollIntoView({ behavior: 'instant', block: 'start' });
            // If scrollIntoView works, next step is to adjust for header.
            // A common, though sometimes imperfect, way after scrollIntoView:
            // if (targetElement.getBoundingClientRect().top < (headerHeight + 15)) { // Check if it's under the header
            //    window.scrollBy(0, -(headerHeight + 15 - targetElement.getBoundingClientRect().top));
            // }
            // Or, more reliably, stick to window.scrollTo with calculated offset if scrollIntoView alone isn't enough.

            if (isSinglePane && isDesktop && desktopTocElement) {
                updateDesktopTocActiveState(hash);
            }
        } else { // Desktop two-pane mode
            if (rightPaneScroller && rightPaneObservedContent && targetElement.closest('#' + rightPaneObservedContent.id)) {
                const scrollTopTo = getScrollTargetOffset(targetElement, rightPaneScroller);
                rightPaneScroller.scrollTo({ top: scrollTopTo, behavior: 'instant' });
                updateDesktopTocActiveState(hash);
            } else if (leftPaneHost && targetElement.closest('#' + leftPaneHost.id)) {
                const scrollTopTo = getScrollTargetOffset(targetElement, leftPaneHost);
                leftPaneHost.scrollTo({ top: scrollTopTo, behavior: 'instant' });
            } else { 
                targetElement.scrollIntoView({ behavior: 'instant', block: 'start'});
            }
        }
        highlightTarget(targetElement);
    }

    handleDesktopInterPaneLinking();
    setupDesktopTocInteractions(); // Initial setup based on current mode/size
    
    // Call handleInitialHash on initial load for any existing hash
    handleInitialHash(); 

    window.addEventListener('hashchange', () => {
        console.log('[HashListener] hashchange event fired. New hash:', window.location.hash);
        handleInitialHash();
    }, false);
    
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            updateHeaderHeightVar(); // Recalculate header height
            setupDesktopTocInteractions(); // Re-evaluate TOC interactions
            
            // Menubar state on resize (existing logic)
            if (window.innerWidth >= DESKTOP_BREAKPOINT) {
                // No specific action needed for menubar itself, CSS handles width.
            } else { // Resizing to mobile
                if (appLayout.classList.contains('menubar-open')) {
                    menuToggleBtn.setAttribute('aria-expanded', 'true');
                } else {
                    menuToggleBtn.setAttribute('aria-expanded', 'false');
                }
            }
        }, 250);
    });
});
</script>
</body>
</html>`;

  if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR);
  }
  writeFileSync(OUTPUT_HTML_FILE, finalHtml);
  console.log(`Site generated successfully! Output: ${OUTPUT_HTML_FILE}`);
}

generateSite().catch(console.error);
