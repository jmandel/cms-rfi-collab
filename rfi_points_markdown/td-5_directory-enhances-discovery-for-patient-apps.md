---
id: "td5-001"
rfi_question_code: "TD-5"
point_key: "DIRECTORY_ENHANCES_DISCOVERY_FOR_PATIENT_APPS"
short_title: "Provider Directory Enhances Discovery for Patient Apps"
summary: "A reliable, comprehensive, publicly accessible nationwide provider directory that includes validated FHIR server base URLs (for both individual patient access APIs and, where applicable, TEFCA participation endpoints) is essential. This would significantly simplify the discovery process for patient-authorized applications seeking to connect to EHRs and other data sources, particularly for direct EHR access outside of a TEFCA RLS query."
categories:
  - "Audience_RFI_Section:Tech_Vendor_Network"
  - "Core_Theme:Standards_Interoperability"
  - "Core_Theme:Data_Access_Completeness"
  - "Key_Technology_Mechanism:Provider_Directory"
  - "Key_Technology_Mechanism:FHIR_API"
  - "Key_Technology_Mechanism:TEFCA_IAS"
---
A reliable, comprehensive, and publicly accessible nationwide provider directory containing validated FHIR server base URLs would significantly improve access to health information for patients, providers, and payers. For patients and their authorized applications, such a directory is essential for:
*   **Discovering where to connect:** It allows apps to find the correct FHIR endpoint for a patient's providers, especially for direct EHR API access (as mandated by ONC certification for Patient Access).
*   **Facilitating data aggregation:** By making it easier to locate multiple data sources for a single patient.
*   **Supporting TEFCA integration:** The directory could also list TEFCA participation status and relevant QHIN endpoints for providers.

This directory would simplify a major hurdle for app developers and reduce the friction patients experience when trying to connect their apps to different providers.
