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
  for (const principle of principlesData) {
    principlesHtml += `<article id="${principle.id}" class="principle-item card">`;
    principlesHtml += `<h3 class="section-title">${principle.text} <a href="#${principle.id}" class="anchor-link" aria-label="Link to section: ${principle.text}">🔗</a></h3>`;
    principlesHtml += await markedInstance.parse(principle.originalMarkdown);
    principlesHtml += `</article>`;
  }

  const recommendationsCategoryData = preParseRecommendations(recommendationsMd);
  let recommendationsHtml = '';
  for (const category of recommendationsCategoryData) {
    recommendationsHtml += `<div id="${category.id}" class="recommendation-category">`;
    recommendationsHtml += `<h3 class="category-title section-title">${category.text} <a href="#${category.id}" class="anchor-link" aria-label="Link to section: ${category.text}">🔗</a></h3>`;
    for (const rec of category.children || []) {
      recommendationsHtml += `<article id="${rec.id}" class="recommendation-item card">`;
      recommendationsHtml += `<h4 class="section-title">${rec.text} <a href="#${rec.id}" class="anchor-link" aria-label="Link to section: ${rec.text}">🔗</a></h4>`;
      recommendationsHtml += await markedInstance.parse(rec.originalMarkdown);
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
      --header-height: 55px;
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
    .site-header .site-title { font-size: 1.1rem; font-weight: 600; margin: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .site-header .menu-toggle { display: none; background: none; border: 1px solid var(--primary-blue); color: var(--primary-blue); padding: 0.375rem 0.75rem; font-size: 1rem; cursor: pointer; border-radius: 0.25rem; }
    .github-btn { padding: 0.4rem 0.8rem; background: var(--primary-blue); color: #fff; border-radius: 0.25rem; font-weight: 500; text-decoration: none; font-size: 0.875rem; white-space: nowrap; }
    .github-btn:hover { background: #0056b3; }

    /* Removed .toc-mobile-only styles */

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
        /* Content inside menubar will be hidden by overflow:hidden or specific rules */
    }
    .app-layout:not(.menubar-open) .menubar > * {
        display: none; /* Hide children when collapsed */
    }


    .content-wrapper {
      grid-area: content;
      display: grid; 
      overflow: hidden; /* Prevent double scrollbars, individual panes will scroll */
      height: 100%;
      /* Grid definition moved to media queries */
    }
        
    .left-pane-content { 
      grid-area: rfi; 
      background-color: var(--bg-pane-left);
      overflow-y: auto;
      height: 100%; /* Fill available space in its grid area */
    }
    .right-pane-content-wrapper { 
      grid-area: principles; 
      background-color: var(--bg-pane-right); 
      overflow-y: auto; /* This wrapper will scroll if its content (main) overflows */
      height: 100%; /* Fill available space in its grid area */
    }
    
    /* .actual-content-for-right-pane is the <main> tag */
    .actual-content-for-right-pane {
      color: var(--text-light); /* Different font color for right pane */
      /* No specific height/overflow here, let it be natural height. Parent .right-pane-content-wrapper scrolls. */
    }

    .left-pane-content > section, 
    .actual-content-for-right-pane > section { padding: 1.5rem; } /* Consistent padding for sections within panes */
    
    /* Adjust padding for sections if their first child is a sticky header */
     .left-pane-content > section:has(> .sticky-section-header:first-child),
     .actual-content-for-right-pane > section:has(> .sticky-section-header:first-child) {
        padding-top: 0; 
    }
    .left-pane-content > section > .sticky-section-header:first-child,
    .actual-content-for-right-pane > section > .sticky-section-header:first-child {
         /* No top margin if it's the very first element and sticky */
    }


    .content-section > h2 { 
      margin-top: 0; 
      padding-bottom: 0.5rem; 
      border-bottom: 1px solid var(--card-border-top); 
      font-size: 1.75rem; 
      color: #111827; 
      margin-bottom: 1rem; 
    }

    .sticky-section-header {
      position: sticky;
      top: -1px; /* Small negative top to ensure border is above scrolled content */
      background-color: var(--bg-pane-left); /* Default, override for right pane */
      padding-top: 1rem; /* Add some padding above the text */
      padding-bottom: 0.75rem; /* Keep existing padding-bottom logic or adjust */
      margin-bottom: 1rem; /* Keep existing margin or adjust */
      z-index: 10;
      /* border-bottom: 1px solid var(--card-border-top); /* Keep border */
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
    article h3, article h4 { margin-top: 0; margin-bottom: 0.5em; color: #1f2937; }

    a.internal-link { color: var(--primary-blue); text-decoration: none; }
    a.internal-link:hover { text-decoration: underline; }
    code { background-color: #e9ecef; padding: 0.2em 0.4em; margin: 0; font-size: 85%; border-radius: 3px; font-family: Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; word-break: break-word; }
    pre { background-color: #e9ecef; padding: 1rem; border-radius: 0.25rem; overflow-x: auto;}
    pre code { padding:0; background-color: transparent; font-size: inherit; }

    .section-title {
      position: relative; /* For potential positioning of anchor, or just as a hook */
    }
    .anchor-link {
      font-size: 0.8em; /* Smaller than heading */
      font-weight: normal; /* Ensure it's not bold if heading is */
      text-decoration: none;
      color: var(--primary-blue);
      opacity: 0.25; /* Subtle by default */
      transition: opacity 0.2s ease-in-out;
      margin-left: 0.3em;
      vertical-align: middle; /* Align with text better */
    }
    .section-title:hover .anchor-link,
    .anchor-link:hover, /* Make link itself hoverable */
    .anchor-link:focus {
      opacity: 1; /* Visible on hover/focus */
      text-decoration: none; /* Keep no underline on hover for icon */
    }

    .highlighted-item-temp { animation: highlight-animation 2.5s ease-out; }
    @keyframes highlight-animation { 0% { background-color: var(--highlight-bg); } 80% { background-color: var(--highlight-bg); } 100% { background-color: transparent; } }
    
    [id] { scroll-margin-top: calc(var(--header-height) + 15px); } /* Keep this for in-page links */

    /* Styles for .desktop-toc (now inside .menubar) */
    .desktop-toc { 
      /* display: none; by default, shown by .menubar logic */
      width: 100%; /* Fill menubar width */
      font-size: 0.9rem; /* Slightly larger for better readability in menubar */
      height: auto; /* Allow it to take natural height within menubar */
      overflow-y: visible; /* Menubar handles scrolling */
      padding-right: 0; /* Padding is on menubar itself */
      /* remove sticky-within-pane if it was here, menubar handles its position */
    }
    .desktop-toc h4 { margin-top: 0; font-size: 1.1em; color: var(--text-dark); margin-bottom: 0.75rem; }
    .desktop-toc ul { list-style: none; padding-left: 0; margin-bottom: 0.75rem; }
    .desktop-toc ul.nested { padding-left: 0.75rem; }
    .desktop-toc ul.nested-further { padding-left: 0.75rem; }
    .desktop-toc li a { display: block; padding: 2px 0 2px 7px; text-decoration: none; color: var(--primary-blue); border-left: 3px solid transparent; }
    .desktop-toc li a:hover { text-decoration: underline; border-left-color: #0056b3; }
    .desktop-toc li a.active-toc-item { font-weight: 600; color: #0056b3; border-left-color: var(--primary-blue); }

    @media (min-width: 1024px) { /* Desktop layout */
      .site-header .menu-toggle { display: block; } /* Keep toggle visible for desktop too */
      /* .toc-mobile-only { display: none !important; } /* Removed */
      
      .app-layout.menubar-open .content-wrapper {
        /* Optional: add a margin or padding if needed when menu is open, though grid handles push */
      }

      .content-wrapper {
        grid-template-columns: 45% 1fr; /* RFI letter (left), Principles/Recs (right) */
        grid-template-rows: 100%; /* Single row, full height */
        grid-template-areas:
          "rfi principles";
        height: 100%; /* Ensure it fills the app-layout area */
      }
      .left-pane-content { 
        border-right: 1px solid var(--border-color); 
        height: 100%; 
        overflow-y: auto;
      }
      .right-pane-content-wrapper {
        /* Desktop: right-pane-content-wrapper itself scrolls if its main content is too tall */
         overflow-y: auto; 
      }
      .actual-content-for-right-pane { 
         /* Desktop: actual content takes natural height, parent scrolls */
         height: auto; 
         overflow-y: visible; 
      }
      .left-pane-content {
        overflow-y: auto; /* Ensure left pane scrolls independently */
      }
    }

    @media (max-width: 1023px) { /* Mobile/Tablet layout */
      .site-header .menu-toggle { display: block; }
      .site-header .site-title { font-size: 1rem; max-width: calc(100% - 150px); }
      .github-btn { font-size: 0.8rem; padding: 0.3rem 0.6rem; }
      [id] { scroll-margin-top: calc(var(--header-height) + 10px); }

      .app-layout.menubar-open {
        grid-template-columns: var(--menubar-width-expanded-mobile) 1fr;
      }
      .menubar {
         /* On mobile, when open, it uses menubar-width-expanded-mobile */
      }
      .content-wrapper {
        display: flex; /* Use flex for mobile stacking */
        flex-direction: column;
        overflow: hidden; /* content-wrapper itself should not scroll */
        height: 100%; /* Ensure it fills available space */
      }
      .left-pane-content { 
        border-right: none; 
        border-bottom: 1px solid var(--border-color);
        height: 50%; /* Takes 50% of parent height */
        overflow-y: auto; /* This pane scrolls if its content is too tall */
        flex-shrink: 0; /* Prevent shrinking if content below is large */
      }
      .right-pane-content-wrapper {
        overflow-y: auto; /* This pane scrolls */
        flex-grow: 1; /* Takes remaining space */
        height: 0; /* Fix for flex item with overflow:auto to scroll correctly */
      }
      .actual-content-for-right-pane {
        height: auto; /* Content determines height within the scrollable wrapper */
         /* overflow-y: visible; /* Not needed, parent scrolls */
      }
      .content-section > h2.sticky-section-header {
        font-size: 1rem; /* Reduced font size for mobile */
        padding-top: 0.2rem; 
        padding-bottom: 0.2rem;
      }
    }
  </style>
</head>
<body>
  <header class="site-header sticky">
    <button class="menu-toggle" id="menu-toggle-btn" aria-expanded="false" aria-controls="main-menubar">Menu</button>
    <h1 class="site-title">Health Tech RFI Response</h1>
    <a class="github-btn" href="https://github.com/jmandel/cms-rfi-collab" target="_blank" rel="noopener">Contribute on GitHub</a>
  </header>

  <!-- Removed mobileTocHtml placeholder -->
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
    const DESKTOP_BREAKPOINT = 1024;
    const appLayout = document.querySelector('.app-layout');
    const headerElement = document.querySelector('.site-header');
    const headerHeight = headerElement ? headerElement.offsetHeight : 55;
    
    document.documentElement.style.setProperty('--header-height', \`\${headerHeight}px\`);


    const menuToggleBtn = document.getElementById('menu-toggle-btn');
    const mainMenubar = document.getElementById('main-menubar');
    
    const leftPaneHost = document.getElementById('rfi-letter-pane-host'); // Scrolls itself
    const rightPaneScroller = document.getElementById('principles-recommendations-pane-wrapper'); // This div scrolls on desktop
    const rightPaneObservedContent = document.getElementById('principles-recommendations-pane-host'); // Content within the scroller, root for observer
    const desktopTocElement = mainMenubar.querySelector('.desktop-toc');

    if (menuToggleBtn && mainMenubar && appLayout) {
        menuToggleBtn.addEventListener('click', () => {
            const isExpanded = menuToggleBtn.getAttribute('aria-expanded') === 'true';
            menuToggleBtn.setAttribute('aria-expanded', String(!isExpanded));
            appLayout.classList.toggle('menubar-open');
            // No longer need to manage body overflow for this type of menu
        });

        // Close menubar when a link inside it is clicked ONLY ON MOBILE
        mainMenubar.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', (event) => {
                if (window.innerWidth < DESKTOP_BREAKPOINT) { // Only close on mobile
                    if (appLayout.classList.contains('menubar-open')) {
                        // Check if it's a link that JS will handle for scrolling within the page
                        const isTocLink = link.closest('.desktop-toc') && link.getAttribute('href')?.startsWith('#');
                        const isInterPaneLink = link.classList.contains('internal-link') && link.dataset.targetPaneItem;

                        if (isTocLink || isInterPaneLink || !link.getAttribute('href')?.startsWith('#')) {
                             // Close for TOC links, inter-pane links, or non-hash links
                            menuToggleBtn.setAttribute('aria-expanded', 'false');
                            appLayout.classList.remove('menubar-open');
                        }
                        // If it's a simple hash link not handled by other JS, let it navigate and stay open if user prefers
                    }
                }
                // On desktop, menubar remains open when clicking links inside it.
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

        // Calculate the target's top position relative to the scroll container's content area
        const scrollTopTo = targetRect.top - containerRect.top + scrollContainer.scrollTop;
        
        return scrollTopTo - 15; // 15px offset from top of pane
    }


    function handleDesktopInterPaneLinking() { // Links from left-pane (RFI) to right-pane (Principles/Recs)
        if (!rightPaneScroller) return;
        document.querySelectorAll('a.internal-link[data-target-pane-item]').forEach(link => {
            link.addEventListener('click', function(event) {
                if (window.innerWidth >= DESKTOP_BREAKPOINT) {
                    event.preventDefault(); // Always prevent default for these inter-pane links on desktop
                    const targetId = this.dataset.targetPaneItem;
                    const targetElement = document.getElementById(targetId);
                    
                    if (targetElement) { 
                        // If targetElement is found, assume it's the correct one in the right pane for these specific links.
                        // The .closest() check was removed as it might have been the source of the issue for principle links.
                        const scrollTopTo = getScrollTargetOffset(targetElement, rightPaneScroller);
                        rightPaneScroller.scrollTo({ top: scrollTopTo, behavior: 'instant' });
                        highlightTarget(targetElement);
                        updateDesktopTocActiveState(targetId); // Update TOC in menubar
                    } else {
                        // If targetElement is not found, then fallback to hash and log a warning.
                        console.warn('Inter-pane link target ID not found: ' + targetId); // Simplified console.warn
                        window.location.hash = this.getAttribute('href'); 
                    }
                }
                // On mobile, default hash navigation will occur (event.preventDefault() is not called).
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

    function setupDesktopTocInteractions() { // Links within menubar TOC clicking to right-pane
        if (window.innerWidth < DESKTOP_BREAKPOINT || !desktopTocElement || !rightPaneScroller || !rightPaneObservedContent) return;

        desktopTocElement.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function(event) {
                event.preventDefault(); // Prevent default hash jump, we'll scroll smoothly
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                // Ensure targetElement is within the right pane's observed content area
                if (targetElement && rightPaneObservedContent && targetElement.closest('#' + rightPaneObservedContent.id)) {
                     const scrollTopTo = getScrollTargetOffset(targetElement, rightPaneScroller);
                    rightPaneScroller.scrollTo({ top: scrollTopTo, behavior: 'instant' });
                    highlightTarget(targetElement);
                    updateDesktopTocActiveState(targetId);
                }
            });
        });

        // Intersection Observer for active TOC item on scroll in right pane
        const contentHeadings = Array.from(rightPaneObservedContent.querySelectorAll('h2[id], h3[id], h4[id], article[id]'));
        
        let lastVisibleTocLink = null;

        const observer = new IntersectionObserver(entries => {
            let bestVisibleEntry = null;
            // Find the "best" visible entry (highest on screen or most visible)
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
                    desktopTocElement.querySelectorAll('a').forEach(a => a.classList.remove('active-toc-item'));
                    tocLink.classList.add('active-toc-item');
                    lastVisibleTocLink = tocLink;
                    // Optional: scroll TOC to keep active link in view
                    // tocLink.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
                }
            }
        }, { 
            root: rightPaneScroller, // Observe within the actual scrolling container
            rootMargin: \`-\${headerHeight + 10}px 0px -75% 0px\`, // Adjust rootMargin if needed, this aims for top 25% of viewport
            threshold: 0.01 // A small part of the element must be visible
        });
        contentHeadings.forEach(heading => observer.observe(heading));
    }
    
    function handleInitialHash() {
        const hash = window.location.hash.substring(1);
        if (!hash) return;
        const targetElement = document.getElementById(hash);
        if (!targetElement) return;

        setTimeout(() => { 
            if (window.innerWidth >= DESKTOP_BREAKPOINT) {
                // Check if target is in the right pane (scrolled by rightPaneScroller)
                if (rightPaneScroller && rightPaneObservedContent && targetElement.closest('#' + rightPaneObservedContent.id)) {
                    const scrollTopTo = getScrollTargetOffset(targetElement, rightPaneScroller);
                    rightPaneScroller.scrollTo({ top: scrollTopTo, behavior: 'instant' });
                    updateDesktopTocActiveState(hash);
                // Check if target is in the left pane (scrolled by leftPaneHost)
                } else if (leftPaneHost && targetElement.closest('#' + leftPaneHost.id)) {
                     const scrollTopTo = getScrollTargetOffset(targetElement, leftPaneHost);
                    leftPaneHost.scrollTo({ top: scrollTopTo, behavior: 'instant' });
                } else { // Fallback for elements not in specific panes or if panes are missing
                    targetElement.scrollIntoView({ behavior: 'instant', block: 'start'});
                }
            } else { // Mobile scrolling
                const elementTop = targetElement.getBoundingClientRect().top + window.pageYOffset;
                window.scrollTo({ top: elementTop - headerHeight - 10, behavior: 'instant' });
            }
            highlightTarget(targetElement);
        }, 100);
    }

    handleDesktopInterPaneLinking();
    if (window.innerWidth >= DESKTOP_BREAKPOINT) {
        setupDesktopTocInteractions();
    }
    handleInitialHash();
    window.addEventListener('hashchange', handleInitialHash, false);
    
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Re-calculate header height on resize as it might change if title wraps etc.
            const newHeaderHeight = headerElement ? headerElement.offsetHeight : 55;
            document.documentElement.style.setProperty('--header-height', \`\${newHeaderHeight}px\`);
            
            if (window.innerWidth >= DESKTOP_BREAKPOINT) {
                setupDesktopTocInteractions(); 
                // If menubar was open and screen resizes to desktop, it remains open, which is fine.
                // If it was open on mobile and screen resizes to desktop, user can toggle it.
            } else {
                // If resizing to mobile, ensure the menubar state is appropriate.
                // If it was open and user resizes to mobile, it might be too wide.
                // However, the CSS grid should handle the reflow.
                // If menubar was open, ensure toggle button state is correct.
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
