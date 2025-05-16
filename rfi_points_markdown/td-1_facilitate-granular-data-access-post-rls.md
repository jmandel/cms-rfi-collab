---
id: "td1-005"
rfi_question_code: "TD-1"
point_key: "FACILITATE_GRANULAR_DATA_ACCESS_POST_RLS_DISCOVERY"
short_title: "Facilitate Granular Data Access Post-RLS Discovery"
summary: "Post-RLS, patient-authorized apps must use trusted ID/auth to retrieve specific data (USCDI via FHIR, richer data, automated EHI Exports) from holders or TEFCA IAS."
categories:
  - "Audience_RFI_Section:Tech_Vendor_Network"
  - "Core_Theme:Data_Access_Completeness"
  - "Core_Theme:Digital_Identity_Authorization"
  - "Core_Theme:TEFCA_Evolution"
  - "Key_Technology_Mechanism:USCDI"
  - "Key_Technology_Mechanism:EHI_Export"
  - "Key_Technology_Mechanism:FHIR_API"
  - "Key_Technology_Mechanism:TEFCA_IAS"
  - "Key_Technology_Mechanism:Record_Locator_Service_RLS"
---
Following a successful RLS query, the patient-authorized application must then be able to leverage the same trusted identity and authorization framework to request and retrieve specific health data. This includes USCDI (and richer data where available) via direct FHIR APIs from identified data holders, or through TEFCA IAS, and the ability to initiate and retrieve automated EHI Exports for comprehensive data.
