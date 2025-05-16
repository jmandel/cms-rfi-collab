# CMS RFI: Draft Response Browser

## Introduction: Responding to the CMS Health Technology Ecosystem RFI

In May 2025, The Centers for Medicare & Medicaid Services (CMS) and ASTP/ONC released a significant Request for Information (RFI) on the "Health Technology Ecosystem" (Document 2025-08701), seeking broad input on critical areas like interoperability, digital tools, provider burden, digital identity, and information blocking. The deadline for comments is June 16, 2025.

This project, the **CMS RFI SMART Response Browser**, is part of an open, collaborative effort to draft and share recommendations in response to this RFI. The primary collection of these responses and ideas is managed in the `jmandel/cms-rfi-collab` GitHub repository.

**Disclaimer:** The RFI responses and ideas compiled here are curated by Josh Mandel, MD. Unless otherwise specified within an individual contribution, they represent his personal perspectives and recommendations. This is an open, collaborative effort, and contributions from others are welcome. These views do not necessarily represent the official positions of Microsoft or any other organization.

## Purpose of this Web Application

This web application serves as a user-friendly interface to explore, browse, filter, and analyze the RFI response points being developed in the collaborative GitHub repository. It aims to make the wealth of information more accessible and understandable, allowing users to:

*   See how different ideas map to the RFI's structure.
*   Filter responses by various thematic categories.
*   Quickly find and review specific points of interest.

## Key Features of the Web Application

*   Browse RFI responses structured hierarchically (matching the RFI's Sections, Subsections, and Questions).
*   Filter responses by categories, organized into collapsible groups.
*   Clickable category tags on response cards to quickly filter by a specific category.
*   Deep linking to sections, subsections, and questions within the application.
*   Filter state managed in URL query parameters, supporting browser history navigation (back/forward).
*   "Copy Full Text" functionality for each response point.
*   "View/Edit on GitHub" links for each response point, linking directly to the source markdown file in the `jmandel/cms-rfi-collab` repository.
*   Responsive design for different screen sizes.
*   Styling based on the SMART Health IT branding.

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
│   ├── build/db.json       # Generated RFI points data (after running build script)
│   ├── data/               # Static data files
│   │   ├── categories_hierarchy.json # Defines filter categories and groups
│   │   └── rfi.json            # Defines the RFI structure (sections, questions)
│   └── index.html          # Main HTML entry point
├── rfi_points_markdown/    # Source markdown files for RFI points (not part of the deployed app)
├── scripts/
│   └── build-rfi-json.bun.ts # Script to process markdown and generate db.json
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

4.  **Generate RFI data:**
    The application expects `public/build/db.json` to exist. This file is generated from markdown sources in `rfi_points_markdown/`.
    ```bash
    mkdir -p public/build # Ensure the directory exists
    bun run scripts/build-rfi-json.bun.ts > public/build/db.json
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

*   **RFI Points (`public/build/db.json`):** This JSON file contains all the individual RFI response points. It is generated by the `scripts/build-rfi-json.bun.ts` script, which processes markdown files located in the `rfi_points_markdown/` directory (note: this directory itself is not part of the deployed static site, only its processed output `db.json` is).
*   **Category Hierarchy (`public/data/categories_hierarchy.json`):** This JSON file defines the structure of the filter panel, including category groups and the categories within them.
*   **RFI Structure (`public/data/rfi.json`):** This JSON file defines the hierarchical structure of the CMS RFI itself (Sections, Subsections, Questions) and is used to organize the display of RFI points.

## Deployment

This project includes a GitHub Actions workflow (`.github/workflows/deploy-pages.yml`) that automatically builds and deploys the application to GitHub Pages when changes are pushed to the `main` branch.

To enable GitHub Pages for your repository (if it's a fork or new setup):
1.  Go to your repository's **Settings** tab.
2.  Navigate to the **Pages** section under "Code and automation".
3.  Under "Build and deployment", select **GitHub Actions** as the source.

The workflow will handle the build process and deployment. 