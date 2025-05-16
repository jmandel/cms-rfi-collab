---
id: "td10-001"
rfi_question_code: "TD-10"
point_key: "NO_SPECIAL_EFFORT_INTERPRETATION_FOR_CERTIFICATION"
short_title: "'Without Special Effort' Interpretation for Certification"
summary: "The Cures Act's 'without special effort' API condition must be robustly interpreted and strictly enforced through ONC certification. This means certified systems must demonstrate: 1) API/EHI Export PERFORMANCE, 2) DATA COMPLETENESS (all EHI), 3) ACCESSIBILITY/USABILITY (clear docs, patient-driven app reg), and 4) NO UNREASONABLE BARRIERS (fees, contracts, complex workflows)."
categories:
  - "Audience_RFI_Section:Tech_Vendor_Network"
  - "Policy_Regulation:ONC_Certification"
  - "Core_Theme:API_Performance_Reliability"
  - "Core_Theme:Data_Access_Completeness"
  - "Core_Theme:Permissionless_Innovation"
  - "Policy_Regulation:Cost_Accessibility_Equity"
  - "Core_Theme:Certification_Enforcement"
  - "Policy_Regulation:Information_Blocking_Policy" # Closely related
---
To implement the 21st Century Cures Act's API condition of certification that requires APIs to allow health information to be accessed, exchanged, and used "without special effort" (42 U.S.C. 300jj-11(c)(5)(D)(iv)), ASTP/ONC should consider the following further steps in ONC certification:

The "without special effort" mandate must be robustly interpreted and strictly enforced. This means certified systems must demonstrate through rigorous testing:
1.  **PERFORMANCE:** FHIR APIs (for single patient access and Bulk Data) and the API-driven EHI Export retrieval process must meet clearly defined performance benchmarks. Unreliable or unreasonably slow APIs constitute "special effort."
2.  **DATA COMPLETENESS:** Certified systems must provide access to *all data elements* of a patient's electronic health record to the extent permissible under applicable privacy laws. This is achieved through a combination of direct APIs for standardized data and the mandatory, API-driven EHI Export as the comprehensive mechanism for all other EHI. Failure to provide complete data is "special effort."
3.  **ACCESSIBILITY & USABILITY:**
    *   Clear, comprehensive, and publicly available documentation for all certified APIs and EHI Export formats.
    *   Full support for patient-driven dynamic application registration using trusted identity credentials, without requiring developers to engage in lengthy, bespoke integration processes for each app.
4.  **NO UNREASONABLE BARRIERS:**
    *   Absence of prohibitive or discriminatory fees for individual patient access to their own data via certified APIs or EHI Export.
    *   No imposition of excessive or discriminatory contractual obligations that hinder the use of certified APIs for their intended purpose.
    *   Workflows for accessing data via certified APIs or EHI Export must be standardized and not unnecessarily complex.
Effectively, "without special effort" should mean that the certified technical capabilities are practically usable by patients, providers, and developers as intended by the Cures Act, without encountering undue technical, administrative, or financial friction imposed by the Health IT developer.
