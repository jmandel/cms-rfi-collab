export interface RfiPoint {
  id: string; // Will be populated with rfi_question_code
  // point_key: string; // Removed, consolidated answers use rfi_question_code as primary ID
  rfi_question_code: string; // e.g., "PC-1", "TD-8"
  short_title: string;
  summary: string;
  markdown_content: string;
  categories: string[];
  referenced_principles: string[]; // Added for Cross-Cutting Principles
  categoryIds?: Set<string>; // For optimized filtering, will be populated in App.tsx
  source_filename?: string;
  rfi_question_text?: string; // Was missing, but present in build script frontmatter interface
  // Remove fields not present in the consolidated frontmatter
  // source_document?: string;
  // source_section?: string;
  // tags?: string[];
}

// ProcessedRfiPoint ensures categoryIds is always present and a Set after initial processing.
// It inherits all fields from RfiPoint, including referenced_principles.
export type ProcessedRfiPoint = RfiPoint & {
  categoryIds: Set<string>; 
};

export interface Category {
  id: string;
  name: string;
  description: string;
}

export interface CategoryGroup {
  group_id: string;
  group_name: string;
  description: string;
  categories: Category[];
}

export interface CategoriesHierarchy {
  category_groups: CategoryGroup[];
}

export interface RfiQuestion {
  question_id: string; // e.g., "PC-1"
  summary_text: string;
}

export interface RfiSubsection {
  subsection_id: string; // e.g., "B.1"
  subsection_title: string;
  questions: RfiQuestion[];
}

export interface RfiSection {
  section_id: string; // e.g., "B"
  section_title: string;
  subsections: RfiSubsection[];
}

export type RfiStructure = RfiSection[];

// Add the new CrossCuttingPrinciple interface
export interface CrossCuttingPrinciple {
  key: string;
  title: string;
  content: string; // Replaces problem and capability
} 