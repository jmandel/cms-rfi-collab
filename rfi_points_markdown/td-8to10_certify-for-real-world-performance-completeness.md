---
id: "td8to10-001"
rfi_question_code: "TD-8; TD-9a/b; TD-9c; TD-10"
point_key: "CERTIFY_FOR_REAL_WORLD_PERFORMANCE_AND_COMPLETENESS_AND_NO_SPECIAL_EFFORT"
short_title: "Certification: Real-World Performance, Completeness, No 'Special Effort'"
summary: "ONC Certification must validate real-world API performance (Bulk Data), data completeness (all EHI via APIs + automated EHI Export), and no 'special effort', supporting patient-driven app registration."
categories:
  - "Audience_RFI_Section:Tech_Vendor_Network"
  - "Policy_Regulation:ONC_Certification"
  - "Core_Theme:API_Performance_Reliability"
  - "Core_Theme:Data_Access_Completeness"
  - "Core_Theme:EHI_Export_Modernization"
  - "Core_Theme:Permissionless_Innovation"
  - "Core_Theme:Certification_Enforcement"
  - "Key_Technology_Mechanism:FHIR_API"
  - "Key_Technology_Mechanism:Bulk_Data_FHIR"
  - "Key_Technology_Mechanism:EHI_Export"
---
*   **CERTIFY\_FOR\_REAL\_WORLD\_PERFORMANCE\_AND\_COMPLETENESS (TD-8):** The most effective certification criteria are those that move beyond mere attestation or checkbox compliance. Certification must rigorously validate *real-world API performance (including Bulk Data), data completeness (ensuring access to all EHI via a combination of direct APIs and automated EHI Export), and the absence of "special effort"* for all mandated capabilities, including support for patient-driven app registration.
*   **API\_FIRST\_CERTIFICATION\_MUST\_ENSURE\_ALL\_EHI\_ACCESS (TD-9a/b):** Prioritizing API-enabled capabilities in certification is beneficial for driving interoperability. However, this strategic shift must not inadvertently reduce patient access to their *complete* EHI. If a direct API cannot (yet) represent all aspects of the EHI, then the API-driven mechanism to request, monitor, and retrieve the *full EHI Export* becomes an even more critical certified capability.
*   **CERTIFY\_API\_DRIVEN\_ACCESS\_TO\_ALL\_CHART\_DATA (TD-9c):** ONC certification *must* require that APIs, or API-driven processes, enable access to *all data elements of a patient's chart*. This translates to:
    *   Performant, direct FHIR API access for USCDI and an expanding set of richer, standardized datasets.
    *   A mandatory, standardized, API-driven method to initiate, monitor the status of, and securely download the complete EHI Export package for any data not yet covered by direct FHIR APIs.
*   **"WITHOUT\_SPECIAL\_EFFORT"\_INTERPRETATION\_FOR\_CERTIFICATION (TD-10):** The Cures Act's "without special effort" mandate for APIs must be robustly interpreted and strictly enforced through ONC certification. This means certified systems must demonstrate:
    *   PERFORMANCE: FHIR APIs (single patient and Bulk Data) and the API-driven EHI Export retrieval process must meet clearly defined performance benchmarks. Sub-par performance constitutes "special effort."
    *   COMPLETENESS: Certified systems must provide access to *all data elements* of a patient's EHI, utilizing direct APIs for standardized data and the API-driven EHI Export as the comprehensive mechanism for all other EHI.
    *   ACCESSIBILITY & USABILITY: Clear, publicly available documentation for all APIs and EHI Export formats. Support for patient-driven dynamic app registration using trusted identity credentials.
    *   NO\_UNREASONABLE\_BARRIERS: Absence of prohibitive fees for individual access, excessive or discriminatory contractual obligations for API use, or unnecessarily complex workflows that impede standards-based access.
