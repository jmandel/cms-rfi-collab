---
rfi_question_code: "TD-9"
short_title: "API-First Certification: Prioritizing APIs While Ensuring Full EHI Access"
summary: "Prioritizing API-enabled capabilities in ONC cert is good, but must ensure access to ALL EHI. If direct APIs are insufficient, an API-driven EHI Export is critical. Certify for API access to all chart data elements. #API #EHI #ONCCertification"
categories:
  - "Audience_RFI_Section:Tech_Vendor_Network"
  - "Policy_Regulation:ONC_Certification"
  - "Core_Theme:Data_Access_Completeness"
  - "Core_Theme:EHI_Export_Modernization"
  - "Core_Theme:Standards_Interoperability"
  - "Key_Technology_Mechanism:EHI_Export"
  - "Key_Technology_Mechanism:FHIR_API"
  - "Key_Technology_Mechanism:USCDI"
---
Regarding certification of health IT (TD-9):

**Prioritizing API-Enabled Capabilities (TD-9a, TD-9b):**
Redefining ONC certification to prioritize API-enabled capabilities is beneficial for fostering modular, interoperable systems. However, the primary drawback is if this neglects access to the patient's *complete* EHI. If granular APIs cannot yet represent all EHI, then an (see **Cross-Cutting Principle: [Automated, Standardized Retrieval of Complete EHI](#EHI_EXPORT_API)**) becomes even more critical. The (see **Cross-Cutting Principle: [Data Completeness: USCDI Minimum, FHIR API for Richer Exchange, EHI Export for Comprehensiveness](#DATA_COMPLETENESS)**) principle's tiered approach must be holistically implemented and validated via (see **Cross-Cutting Principle: [Certification for Real-World Usability: Validating Functional Interoperability](#CERTIFICATION_FOR_REAL_WORLD_USABILITY)**).

**Certifying API-Driven Access to All Chart Data (TD-9c):**
To ensure APIs enable access to *all aspects of the patient's chart*, certification must require:
1.  Performant, direct FHIR API access for USCDI and richer standardized datasets.
2.  A mandatory, standardized (see **Cross-Cutting Principle: [Automated, Standardized Retrieval of Complete EHI](#EHI_EXPORT_API)**) for patients/apps to request, monitor, and download the complete EHI Export.
This ensures standardized data is available via direct APIs, while all EHI is accessible through a modernized export process, fully supporting (see **Cross-Cutting Principle: [Data Completeness: USCDI Minimum, FHIR API for Richer Exchange, EHI Export for Comprehensiveness](#DATA_COMPLETENESS)**). CMS policy should motivate providers to respond to all API-based data requests with the best possible coverage and quality.