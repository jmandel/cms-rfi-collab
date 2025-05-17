---
id: "pc8-001"
rfi_question_code: "PC-8"
point_key: "USCDI_API_VALUABLE_BUT_INCOMPLETE"
short_title: "USCDI: Valuable but Incomplete Context"
summary: "USCDI data accessible via FHIR APIs is valuable and increasingly available for structured, core data elements. However, it frequently omits critical contextual information found in provider notes, non-standardized but clinically relevant data, complete historical records before USCDI adoption, and full imaging narratives, which remain very hard for patients and app developers to access programmatically today."
categories:
  - "Audience_RFI_Section:Patient_Caregiver"
  - "Core_Theme:Data_Access_Completeness"
  - "Key_Technology_Mechanism:USCDI"
  - "Key_Technology_Mechanism:FHIR_API"
---
Data corresponding to the United States Core Data for Interoperability (USCDI), accessed via FHIR APIs, is valuable and increasingly available. It provides a standardized set of core, structured data elements that are foundational for many digital health applications.

However, USCDI represents only a fraction of a patient's complete electronic health information (EHI). Data that is valuable but very hard for patients and app developers to access programmatically today includes:
*   **Non-Standardized but Clinically Relevant Data:** Custom flowsheets, specific device data, or other structured/semi-structured data not yet part of USCDI.
*   **Complete Historical Records:** Data created before widespread USCDI adoption or from systems not fully mapped to USCDI.
*   **Full Imaging Data:** While USCDI includes narrative imaging reports, it does not provide access to actual imaging study data.
*   **Appointment Schedules:** While some portals show this, the data are not typically accessible through a standardized API.
