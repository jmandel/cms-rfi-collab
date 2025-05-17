---
rfi_question_code: "PC-8"
short_title: "Unlocking Comprehensive Health Data for Patients & Developers"
summary: "While USCDI APIs are valuable, critical data (notes, non-standard data, history, imaging) remains hard to access. An API-driven EHI Export is key to unlocking this for innovation. #HealthData #Interoperability #EHI"
categories:
  - "Audience_RFI_Section:Patient_Caregiver"
  - "Core_Theme:Data_Access_Completeness"
  - "Key_Technology_Mechanism:USCDI"
  - "Key_Technology_Mechanism:FHIR_API"
  - "Core_Theme:EHI_Export_Modernization"
  - "Core_Theme:Permissionless_Innovation"
---
Regarding data availability and value (PC-8):

1.  **USCDI: Valuable but Incomplete:** USCDI data via FHIR APIs is valuable and increasingly available for core structured elements. However, it frequently omits critical contextual information like detailed provider notes, non-standardized but clinically relevant data, complete historical records, and full imaging narratives (see **Cross-Cutting Principle: [Interoperable Access to Diagnostic-Quality Imaging](#FULL_DICOM_ACCESS)**). This data remains very hard for patients and app developers to access programmatically.
2.  **EHI Export Holds the Untapped Key:** The EHI Export capability is the regulatory mechanism intended for this comprehensive data access. However, its current manual, non-standardized, portal-centric retrieval methods render it largely inaccessible for systematic digital use, failing the (see **Cross-Cutting Principle: [Data Completeness: USCDI Minimum, FHIR API for Richer Exchange, EHI Export for Comprehensiveness](#DATA_COMPLETENESS)**) vision.
3.  **Automated EHI Unlocks Developer Innovation:** Transforming EHI Export into a standardized, API-driven process (see **Cross-Cutting Principle: [Automated, Standardized Retrieval of Complete EHI](#EHI_EXPORT_API)**) would unlock this rich dataset. This would enable developers to build far more comprehensive, context-aware, and clinically valuable patient-facing tools that go beyond USCDI capabilities, fostering innovation.
4.  **Interim Access Parity:** Where API-driven EHI export is not yet functional, (see **Cross-Cutting Principle: [Patient-Authorized Access Parity (Portals and APIs): Ensuring Continuous Access Rights](#PATIENT_AUTHORIZED_ACCESS_PARITY)**) should be maintained to prevent blocking of patient-authorized tools accessing portal-visible data.