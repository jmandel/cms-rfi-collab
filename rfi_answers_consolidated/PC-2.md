---
rfi_question_code: "PC-2"
short_title: "Achieving Comprehensive & Unified Patient Data Access"
summary: "Patients need unified access to *all* their health data. USCDI APIs are foundational, but an API-driven EHI Export is vital for true data completeness. #HealthIT #PatientAccess #DataCompleteness"
categories:
  - "Audience_RFI_Section:Patient_Caregiver"
  - "Core_Theme:Data_Access_Completeness"
  - "Core_Theme:EHI_Export_Modernization"
  - "Core_Theme:Patient_Empowerment_Control"
  - "Core_Theme:API_Performance_Reliability"
  - "Key_Technology_Mechanism:EHI_Export"
  - "Key_Technology_Mechanism:FHIR_API"
  - "Policy_Regulation:ONC_Certification"
  - "Core_Theme:Standards_Interoperability"
  - "Key_Technology_Mechanism:USCDI"
---
Easy access to all health information in one location (PC-2) is a critical patient need, currently unmet due to fragmented data and access mechanisms. A comprehensive solution requires:

1.  **Foundational USCDI APIs:** Recognizing that USCDI via FHIR APIs offers a crucial standardized baseline for core structured data (see **Cross-Cutting Principle: [Data Completeness: USCDI Minimum, FHIR API for Richer Exchange, EHI Export for Comprehensiveness](#DATA_COMPLETENESS)**). These APIs must be highly performant (see **Cross-Cutting Principle: [API Performance Parity with Proprietary Data Channels](#API_PERFORMANCE)**).
2.  **Addressing the Completeness Gap with EHI Export:** Acknowledging that the majority of a patient's story (notes, non-USCDI data, full imaging reports, historical data) often lies outside USCDI. The current EHI Export capability, while intended for this, is hampered by manual, non-integrated processes.
3.  **Mandating Automated EHI Access:** It is imperative to mandate a standardized, API-driven mechanism for patients/apps to electronically request, monitor, and securely receive their complete EHI Export (see **Cross-Cutting Principle: [Automated, Standardized Retrieval of Complete EHI](#EHI_EXPORT_API)**). This must be validated through (see **Cross-Cutting Principle: [Certification for Real-World Usability: Validating Functional Interoperability](#CERTIFICATION_FOR_REAL_WORLD_USABILITY)**).
4.  **The Single Access Point Vision:** This approach empowers patients to use applications of their choice to seamlessly aggregate data from USCDI FHIR APIs and incorporate richer data from API-driven EHI Exports, providing a truly comprehensive, longitudinal health record view under (see **Cross-Cutting Principle: [Patient Control: Transparency and Prospective Data-Sharing Preferences](#PATIENT_CONTROL)**).
5.  **Ensuring Access Parity:** If API pathways are deficient, it's critical to uphold (see **Cross-Cutting Principle: [Patient-Authorized Access Parity (Portals and APIs): Ensuring Continuous Access Rights](#PATIENT_AUTHORIZED_ACCESS_PARITY)**) to ensure patients are not blocked from accessing portal-visible data via other authorized means.