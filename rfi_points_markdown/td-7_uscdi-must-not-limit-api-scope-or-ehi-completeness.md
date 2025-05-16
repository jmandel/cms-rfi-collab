---
id: "td7-002"
rfi_question_code: "TD-7"
point_key: "USCDI_MUST_NOT_LIMIT_API_SCOPE_OR_EHI_COMPLETENESS"
short_title: "USCDI Must Not Limit API Scope or EHI Completeness"
summary: "ONC-certified APIs must expose data *beyond* USCDI if present in patient's EHI. USCDI is a floor, not a ceiling for API access or EHI Export content."
categories:
  - "Audience_RFI_Section:Tech_Vendor_Network"
  - "Core_Theme:Data_Access_Completeness"
  - "Policy_Regulation:ONC_Certification"
  - "Key_Technology_Mechanism:USCDI"
  - "Key_Technology_Mechanism:FHIR_API"
  - "Key_Technology_Mechanism:EHI_Export"
---
APIs certified by ONC must be capable of exposing data elements *beyond* USCDI if the underlying system captures such data and it's part of the patient's EHI. USCDI defines a floor for standardized data, not a ceiling for API-based data access or for the content of the EHI Export.
