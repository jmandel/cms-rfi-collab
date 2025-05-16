---
id: "td1-005"
rfi_question_code: "TD-1"
point_key: "FACILITATE_GRANULAR_DATA_ACCESS_POST_RLS_DISCOVERY"
short_title: "Facilitate Granular Data Access Post-RLS Discovery"
summary: "Following a successful RLS query identifying data holders within TEFCA, the patient-authorized application must then be able to leverage the same trusted identity and authorization framework to request and retrieve specific health data. This includes data via TEFCA-facilitated individual access pathways, and potentially triggering automated EHI Exports if supported by the discovered data holder through TEFCA."
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
Once a Record Locator Service (RLS) query (as per TD1-004) has successfully identified potential data holders for a patient within the TEFCA network, the ecosystem must facilitate the next step: granular data access through TEFCA. The patient-authorized application must then be able to:
*   Leverage the same trusted identity and authorization framework used for RLS access.
*   Request and retrieve specific health data from the identified data holders via **TEFCA-facilitated individual access pathways supported by QHINs**. This would typically involve standardized transactions (e.g., FHIR queries for USCDI).
*   Ideally, this pathway should also support the ability for the patient's app to initiate and subsequently retrieve automated EHI Exports from these data holders if the data holder's TEFCA participation supports such comprehensive data retrieval requests for individuals.
This ensures a seamless workflow from discovery to data retrieval for developers building patient-facing applications that utilize the TEFCA network.
