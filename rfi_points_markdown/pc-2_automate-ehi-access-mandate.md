---
id: "pc2-003"
rfi_question_code: "PC-2"
point_key: "AUTOMATE_EHI_ACCESS_MANDATE"
short_title: "Mandate Automated EHI Access"
summary: "It is imperative to mandate standardized, API-driven mechanisms for patients (or their authorized applications) to electronically request, monitor the status of, and securely receive their complete EHI Export. The process must be digital end-to-end, with the export in a documented, computable format."
categories:
  - "Audience_RFI_Section:Patient_Caregiver"
  - "Core_Theme:Data_Access_Completeness"
  - "Core_Theme:EHI_Export_Modernization"
  - "Core_Theme:Patient_Empowerment_Control"
  - "Core_Theme:API_Performance_Reliability"
  - "Key_Technology_Mechanism:EHI_Export"
  - "Key_Technology_Mechanism:FHIR_API"
  - "Policy_Regulation:ONC_Certification"
---
To bridge the gap between USCDI-only API access and the need for comprehensive health data, it is imperative to *mandate standardized, API-driven mechanisms* for patients (or their duly authorized applications, leveraging trusted identity and authorization frameworks) to:
1.  Electronically and programmatically *request* their complete EHI Export from a certified Health IT Module.
2.  Electronically and programmatically *monitor the status* of this export generation process (e.g., pending, in-progress, completed, failed).
3.  Securely and programmatically *receive or download* the complete EHI Export package once it is ready.
This entire process must be digital end-to-end, eliminating reliance on out-of-band methods like phone calls, faxes, or custom portal-only workflows that are not accessible to third-party applications. While the specific output package format does not need to be universally standardized across all systems, the developer documentation accompanying the export must be exceptionally clear, comprehensive, and sufficient for an experienced practitioner to successfully understand and work with the file's contents and structure.

Current implementations often fall short in several critical ways:
1.  **Scope Misinterpretation:** Many systems fail to understand the comprehensive scope of "EHI Export," mistakenly offering only summary data (e.g., a Continuity of Care Document) instead of the complete set of Electronic Health Information as required.
2.  **Inadequate Documentation:** The developer documentation provided is frequently insufficient, leaving the meaning of data elements, their interrelationships, and the overall data structure unclear, making it difficult for third-party applications to reliably process and utilize the exported data.
