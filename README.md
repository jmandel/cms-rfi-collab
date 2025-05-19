# CMS RFI Response Collab

## Introduction: Responding to the CMS Health Technology Ecosystem RFI

In May 2025, The Centers for Medicare & Medicaid Services (CMS) and ASTP/ONC released a significant Request for Information (RFI) on the "Health Technology Ecosystem" (Document 2025-08701), seeking broad input on critical areas like interoperability, digital tools, provider burden, digital identity, and information blocking. The deadline for comments is June 16, 2025.

This project provides a static site generator (`generator.ts`) to process and present a consolidated RFI response, which is maintained in the `index.md` file within the `jmandel/cms-rfi-collab` GitHub repository.

**Disclaimer:** The RFI responses and ideas compiled here are curated by Josh Mandel, MD. Unless otherwise specified within an individual contribution, they represent his personal perspectives and recommendations. This is an open, collaborative effort, and contributions from others are welcome. These views do not necessarily represent the official positions of Microsoft or any other organization.

## Purpose 

Assist in collaborative development of:

*   Guiding Principles
*   Technology Policy Recommendations
*   The RFI Response Letter (organized by RFI questions)

The goal is to provide a clean, accessible way to develop and review the consolidated RFI response.

## Key Features of the Generated Website

*   **Two-Pane Layout**: The Response Letter is displayed in the left pane, while Guiding Principles and Technology Policy Recommendations are in the right pane, allowing for easy cross-referencing.
*   **Navigation Header**:
    *   Direct links to "Response Letter" and "Guiding Principles".
    *   A dropdown menu for "Technology Policy Recommendations" allows quick navigation to specific recommendation categories.
*   **Content Sourced from `index.md`**: All content is derived from a single, structured Markdown file.
*   **Internal Linking**:
    *   Explicit IDs (e.g., `| \`my-id\`` in Markdown headings) are used to generate stable anchor links.
    *   RFI responses in the "Response Letter" section can link to specific principles or recommendations.
*   **Styling**: A clean, responsive stylesheet is generated for readability.
*   **GitHub Link**: A "Contribute on GitHub" button links back to the source repository.

## Input File: `index.md`

The generator expects `index.md` to be structured as follows:

1.  **Guiding Principles Section**:
    *   Starts with `# Guiding Principles`.
    *   Each principle is an H3 heading (e.g., `### Principle Title | \`principle_id\``).
2.  **Technology Policy Recommendations Section**:
    *   Starts with `# Technology Policy Recommendations`.
    *   Recommendation categories are H2 headings (e.g., `## Category Title`).
    *   Individual recommendations within a category are H3 headings (e.g., `### Recommendation Title | \`recommendation_id\``).
3.  **Response Letter Section**:
    *   Starts with `# Response Letter`.
    *   RFI questions are H3 headings (e.g., `### RFI-Question-Code. Question Text`). IDs are typically derived from the question code (e.g., `PC-2`).
    *   Markdown links like `[Link Text](#recommendation_id)` can be used to refer to other sections.

Explicit IDs are optional; if not provided, IDs are slugified from the heading text.

## How the Generator Works

*   The `generator.ts` script is written in TypeScript and runs using Node.js.
*   It reads `index.md` using Node.js `fs` module.
*   It splits the content into the three main H1 sections.
*   It parses headings and content for each section, extracting text and generating IDs.
*   The `marked` library is used to convert Markdown content to HTML.
*   Finally, it assembles the full HTML page and CSS, writing them to `dist/index.html` and `dist/style.css`.

## Project Structure

```
.
├── generator.ts        # The static site generator script
├── index.md            # The primary content input file
├── dist/               # Output directory (created by the script)
│   ├── index.html      # Generated HTML file
│   └── style.css       # Generated CSS file
├── package.json        # Project dependencies and scripts
├── tsconfig.json       # TypeScript configuration
└── README.md           # This file
```

## Setup and Usage

1.  **Prerequisites:**
    *   Node.js (which includes npm)
    *   Bun (or you can adapt `package.json` scripts for npm/yarn)

2.  **Clone the repository:**
    ```bash
    git clone https://github.com/jmandel/cms-rfi-collab.git
    cd cms-rfi-collab
    ```

3.  **Install dependencies:**
    (Assuming `marked` and TypeScript-related dev dependencies are listed in `package.json`)
    ```bash
    bun install
    ```

4.  **Ensure `index.md` is present** in the root directory of the project.

5.  **Run the generator:**
    (Assuming a script like `"generate": "bun run generator.ts"` or `"generate": "tsc && node generator.js"` is in `package.json`)
    ```bash
    bun run generate
    ```
    This will create or update the `dist/` directory with `index.html` and `style.css`.

6.  **View the output:**
    Open `dist/index.html` in your web browser.

## Contributing

1.  **Edit Content**: Make changes directly to the `index.md` file.
2.  **Re-generate**: Run `bun run generate` to update the HTML output in the `dist/` directory.
3.  **Review**: Open `dist/index.html` in your browser to check your changes.
4.  **Commit**: Commit your changes to `index.md`. The `dist/` directory content should also be committed if it's part of the repository's tracked files for deployment (e.g., for GitHub Pages).

## Customization

*   **Styling**: The CSS rules are defined within the `cssContent` constant in `generator.ts`. Modify these rules to change the appearance.
*   **HTML Structure**: The overall HTML layout is defined in the `finalHtml` template string in `generator.ts`.
*   **Logic**: The parsing and HTML generation logic is within the `generateSite` function and its helpers in `generator.ts`.

## Deployment

The generated static files in the `dist/` directory are self-contained and can be deployed to any static web hosting service, including GitHub Pages. If GitHub Pages is configured, pushing changes to `index.md` and the corresponding updated `dist/` files to the `main` branch would update the live site. (Alternatively, a CI/CD workflow could be set up to run the generator and deploy the `dist/` directory automatically.)