export interface RfiPoint {
  id: string; // Derived from point_key or a unique identifier
  point_key: string; // e.g., "PATIENT-1_SUMMARY-1"
  rfi_question_code: string; // e.g., "PC-1", "TD-8" - This should match RfiQuestion.question_id
  short_title: string;
  summary: string;
  markdown_content: string; // Changed from 'body' to 'markdown_content'
  categories: string[]; // Array of category IDs, e.g., ["Audience_RFI_Section:Patient_Caregiver", "Core_Theme:Data_Access_Completeness"]
  categoryIds?: Set<string>; // For optimized filtering
  source_filename?: string; // The actual filename from rfi_points_markdown/
  // Add any other fields that will be present in db.json
  source_document?: string;
  source_section?: string;
  tags?: string[];
}

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