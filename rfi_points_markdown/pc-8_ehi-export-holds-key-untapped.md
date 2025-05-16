---
id: "pc8-002"
rfi_question_code: "PC-8"
point_key: "EHI_EXPORT_HOLDS_THE_KEY_UNTAPPED"
short_title: "EHI Export: Untapped Key to Comprehensive Data"
summary: "The EHI Export capability, mandated by ONC, is the regulatory mechanism intended to provide access to this comprehensive 'hard to access' data. However, its current predominantly manual, non-standardized, and portal-centric retrieval methods render it largely inaccessible for systematic digital use by patients or their chosen applications."
categories:
  - "Audience_RFI_Section:Patient_Caregiver"
  - "Core_Theme:Data_Access_Completeness"
  - "Core_Theme:EHI_Export_Modernization"
  - "Key_Technology_Mechanism:EHI_Export"
---
The Electronic Health Information (EHI) Export capability, as defined and mandated by ONC's certification criteria (§ 170.315(b)(10)), is the primary regulatory mechanism intended to ensure patients can access their *complete* EHI, including the "hard to access" data types mentioned previously (notes, non-USCDI elements, historical data, etc.).

However, the current implementation of EHI Export by most Health IT developers relies on:
*   **Manual initiation:** Often requiring navigation through a patient portal.
*   **Non-standardized formats:** While documentation is required, the actual structure of the export can vary significantly.
*   **Lack of API-driven retrieval:** Patients typically download a file; their applications cannot programmatically request or ingest this data.
These characteristics render the EHI Export largely inaccessible and unusable for systematic, automated digital use by patients or their chosen third-party applications, severely limiting its value for unlocking comprehensive data.
