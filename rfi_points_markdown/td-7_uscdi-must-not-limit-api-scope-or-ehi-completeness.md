---
id: "td7-002"
rfi_question_code: "TD-7"
point_key: "USCDI_MUST_NOT_LIMIT_API_SCOPE_OR_EHI_COMPLETENESS"
short_title: "USCDI Must Not Limit API Scope or EHI Completeness"
summary: "While USCDI defines a standardized core, ONC-certified APIs must be capable of exposing data elements *beyond* USCDI if such data is present in the patient's EHI and permissible to share. USCDI is a floor for standardized data exchange, not a ceiling that restricts API access or the comprehensive content of the EHI Export. The Cures Act requires access to ALL EHI."
categories:
  - "Audience_RFI_Section:Tech_Vendor_Network"
  - "Core_Theme:Data_Access_Completeness"
  - "Policy_Regulation:ONC_Certification"
  - "Key_Technology_Mechanism:USCDI"
  - "Key_Technology_Mechanism:FHIR_API"
  - "Key_Technology_Mechanism:EHI_Export"
---
While USCDI is foundational, it is critical that its existence does not inadvertently limit the scope of data accessible through APIs or included in EHI Exports.
*   **APIs Beyond USCDI:** ONC-certified APIs (specifically the Patient Access API) must be capable of, and Health IT developers should be encouraged to support, exposing data elements *beyond* the currently defined USCDI version if such data is electronically available in the patient's EHI and permissible to share under applicable privacy laws. USCDI represents the *minimum* standardized set, not the maximum extent of API-accessible data.
*   **EHI Export Comprehensiveness:** The EHI Export must include *all* of a patient's electronic health information, far exceeding the USCDI. The definition of USCDI should not be misconstrued to limit the scope of the EHI Export.
The 21st Century Cures Act's intent is for patients to access their *entire* EHI. USCDI is a crucial tool for standardizing a core part of that EHI for interoperable exchange, but it is a floor, not a ceiling. Adding more elements to USCDI is valuable if it reflects broad, common data needs for standardization, but it doesn't replace the need for access to the full EHI.
