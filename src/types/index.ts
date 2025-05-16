export interface RfiPoint {
  id: string; // Derived from point_key or a unique identifier
  point_key: string; // e.g., "PATIENT-1_SUMMARY-1"
  rfi_question_code: string; // e.g., "B.1"
  short_title: string;
  summary: string;
  markdown_content: string; // Changed from 'body' to 'markdown_content'
  categories: string[]; // Array of category IDs, e.g., ["Patient_Caregiver", "Data_Access_Completeness"]
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