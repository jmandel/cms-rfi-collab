# CMS RFI: Draft Response Browser

## Introduction: Responding to the CMS Health Technology Ecosystem RFI

In May 2025, The Centers for Medicare & Medicaid Services (CMS) and ASTP/ONC released a significant Request for Information (RFI) on the "Health Technology Ecosystem" (Document 2025-08701), seeking broad input on critical areas like interoperability, digital tools, provider burden, digital identity, and information blocking. The deadline for comments is June 16, 2025.

This project, the **CMS RFI SMART Response Browser**, is part of an open, collaborative effort to draft and share recommendations in response to this RFI. The primary collection of these responses and ideas is managed in the `jmandel/cms-rfi-collab` GitHub repository.

**Disclaimer:** The RFI responses and ideas compiled here are curated by Josh Mandel, MD. Unless otherwise specified within an individual contribution, they represent his personal perspectives and recommendations. This is an open, collaborative effort, and contributions from others are welcome. These views do not necessarily represent the official positions of Microsoft or any other organization.

## Purpose of this Web Application

This web application serves as a user-friendly interface to explore, browse, filter, and analyze the RFI response points being developed in the collaborative GitHub repository. It aims to make the wealth of information more accessible and understandable, allowing users to:

*   See how different ideas map to the RFI's structure.
*   Filter responses by various thematic categories and Cross-Cutting Principles using a unified filter panel.
*   Explore Cross-Cutting Principles on a dedicated page, view their definitions (problem/capability), and see which RFI answers reference them.
*   Navigate seamlessly between RFI points and their related principles with instant scrolling and back/forward browser button support.
*   Quickly find and review specific points of interest, with clear visual hierarchy and styling.

## Key Features of the Web Application

*   **RFI Browser**: Explore RFI responses organized by the RFI's structure (Sections, Subsections, Questions).
    *   Response cards display a title, RFI question code (and response ID if different), a styled summary, full markdown content, and associated categories and supporting Cross-Cutting Principles.
    *   Inline links within RFI answer content (e.g., `[Text](#CC_KEY)`) navigate to the specific principle on the Cross-Cutting Principles page.
    *   Clickable category tags and principle titles on response cards allow for quick navigation.
*   **Cross-Cutting Principles Page**: A dedicated page listing all principles.
    *   Each principle is displayed in a visually distinct card, showing its title, problem statement, capability description, and a list of RFI Question codes that reference it.
    *   Clickable RFI question codes navigate directly to the relevant question in the RFI Browser view.
*   **Unified Filter Panel**: 
    *   Filter RFI responses by thematic categories (organized into collapsible, sortable groups) and by Cross-Cutting Principles (also sortable by count and title).
    *   Categories and Principles display counts of associated RFI points.
    *   Filter selections are reflected in the URL for shareable links and browser history navigation.
*   **Navigation & Usability**:
    *   Deep linking to sections, subsections, questions, individual response points, and Cross-Cutting Principles.
    *   Instant scrolling when navigating via links or filters.
    *   Functional browser back/forward buttons for navigating between views and scroll positions.
*   **Content Interaction**:
    *   "Copy Full Text" for each response point, which includes the RFI point's summary, body, and the full definitions (problem/capability) of any referenced Cross-Cutting Principles.
    *   "View/Edit on GitHub" links directly to the source markdown file for each RFI point.
*   **Technical**: Responsive design, built with React, TypeScript, and Bun. Data is processed from markdown into JSON during a build step.

## Technical Overview

This is a single-page web application built using:
*   React
*   TypeScript
*   Bun (for development, building, and running scripts)

## Project Structure

```
.
├── .github/workflows/      # GitHub Actions for deployment
├── public/
│   ├── build/
│   │   ├── db.json       # Generated RFI points data
│   │   └── cross_cutting_principles.json # Generated Cross-Cutting Principles data
│   ├── data/               # Static data files
│   │   ├── categories_hierarchy.json # Defines filter categories and groups
│   │   └── rfi.json            # Defines the RFI structure (sections, questions)
│   └── index.html          # Main HTML entry point
├── rfi_answers_consolidated/ # Source markdown files for RFI points (consolidated)
├── cross_cutting_concerns.md # Source markdown for Cross-Cutting Principles
├── scripts/
│   ├── build-rfi-json.bun.ts # Script to process RFI markdown and generate db.json
│   └── build-cc-json.bun.ts  # Script to process CC markdown and generate cross_cutting_principles.json
├── src/
│   ├── components/         # React components
│   ├── hooks/              # Custom React hooks (if any)
│   ├── styles/             # CSS styles (global.css)
│   ├── types/              # TypeScript type definitions
│   ├── App.tsx             # Main application component
│   └── index.tsx           # React entry point
├── .gitignore
├── bun.lockb               # Bun lockfile
├── package.json            # Project dependencies
├── README.md               # This file
└── tsconfig.json           # TypeScript configuration
```

## Setup and Running Locally

1.  **Prerequisites:**
    *   Ensure you have [Bun](https://bun.sh/) installed.

2.  **Clone the repository:**
    ```bash
    git clone https://github.com/jmandel/cms-rfi-collab.git # Or your fork
    cd cms-rfi-collab
    ```

3.  **Install dependencies:**
    ```bash
    bun install
    ```

4.  **Generate RFI and Cross-Cutting Principles data:**
    The application expects `public/build/db.json` and `public/build/cross_cutting_principles.json` to exist. These files are generated from markdown sources.
    ```bash
    mkdir -p public/build # Ensure the directory exists
    bun run scripts/build-rfi-json.bun.ts > public/build/db.json
    bun run scripts/build-cc-json.bun.ts > public/build/cross_cutting_principles.json
    ```

5.  **Run the development server:**
    ```bash
    bun dev
    ```
    This will typically start the application on `http://localhost:3000` (or another port if 3000 is in use).

## Building for Production

To create a production build (static files for deployment):

1.  **Ensure data is generated:**
    Follow step 4 from the "Setup" section if you haven't already.

2.  **Run the build command:**
    ```bash
    bun build ./public/index.html --outdir ./build
    ```
    This will place the optimized static assets in the `./build` directory.

## Data Sources

*   **RFI Points (`public/build/db.json`):** Contains RFI response points. Generated by `scripts/build-rfi-json.bun.ts` from `rfi_answers_consolidated/*.md`. This script parses markdown links like `[Text](#CC_KEY)` to populate `referenced_principles`.
*   **Cross-Cutting Principles (`public/build/cross_cutting_principles.json`):** Contains principle definitions (key, title, problem, capability). Generated by `scripts/build-cc-json.bun.ts` from `cross_cutting_concerns.md`.
*   **Category Hierarchy (`public/data/categories_hierarchy.json`):** Defines filter categories and groups.
*   **RFI Structure (`public/data/rfi.json`):** Defines the RFI's hierarchy.

## Deployment

This project includes a GitHub Actions workflow (`.github/workflows/deploy-pages.yml`) that automatically builds and deploys the application to GitHub Pages when changes are pushed to the `main` branch. The workflow includes steps to generate both `db.json` and `cross_cutting_principles.json`.

To enable GitHub Pages for your repository (if it's a fork or new setup):
1.  Go to your repository's **Settings** tab.
2.  Navigate to the **Pages** section under "Code and automation".
3.  Under "Build and deployment", select **GitHub Actions** as the source.

The workflow will handle the build process and deployment. 