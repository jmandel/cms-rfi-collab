---
rfi_question_code: "PR-3"
short_title: "Ensuring Provider Access to All EHI Formats for Quality Care"
summary: "Access to all EHI formats (scanned, notes, non-discrete, structured) is critical for care quality and reducing provider burden. An API-driven EHI Export is key, with FHIR APIs evolving for richer direct data access. #EHR #Interoperability #ProviderBurden"
categories:
  - "Audience_RFI_Section:Provider"
  - "Core_Theme:Data_Access_Completeness"
  - "Core_Theme:Data_Quality_Integrity"
  - "Key_Technology_Mechanism:EHI_Export"
  - "Core_Theme:EHI_Export_Modernization"
  - "Key_Technology_Mechanism:FHIR_API"
  - "Core_Theme:Standards_Interoperability"
  - "Key_Technology_Mechanism:USCDI"
---
Access to all data in an EHR system, regardless of storage format (scanned documents, digitized faxes, free text notes, non-discrete data, structured fields), is critically important for healthcare delivery and interoperability (PR-3). This comprehensive access is vital for care quality, efficiency, and (see **Cross-Cutting Principle: [Addressing Provider Burden Through Technology: Designing for Clinician Efficiency](#ADDRESSING_PROVIDER_BURDEN_THROUGH_TECHNOLOGY)**).

Key considerations:
1.  **All EHI Access is Critical:** Lack of access to any part of the EHI creates blind spots and inefficiencies.
2.  **EHI Export as the Bridge:** The EHI Export criterion is the current regulatory floor for this full scope. Mandating a standardized, API-driven EHI Export request and retrieval process (see **Cross-Cutting Principle: [Automated, Standardized Retrieval of Complete EHI](#EHI_EXPORT_API)**) is crucial to make all EHI truly accessible, supporting the (see **Cross-Cutting Principle: [Data Completeness: USCDI Minimum, FHIR API for Richer Exchange, EHI Export for Comprehensiveness](#DATA_COMPLETENESS)**) strategy.
3.  **Evolving APIs for Comprehensiveness:** While a modernized EHI Export provides bulk access, future API development (see **Cross-Cutting Principle: [Prioritization of Publicly Specified Interfaces](#OPEN_STANDARDS_FIRST)**) should strategically aim to make more unstructured and non-standardized EHI (e.g., notes via FHIR DocumentReference) directly queryable, reducing reliance on bulk export for common needs over time.