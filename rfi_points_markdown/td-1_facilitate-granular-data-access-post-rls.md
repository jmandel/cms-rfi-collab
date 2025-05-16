---
id: "td1-005"
rfi_question_code: "TD-1"
point_key: "FACILITATE_GRANULAR_DATA_ACCESS_POST_RLS_DISCOVERY"
short_title: "Facilitate Granular Data Access Post-RLS Discovery"
summary: "Following a successful RLS query identifying data holders, the patient-authorized application must then be able to leverage the same trusted identity and authorization framework to request and retrieve specific health data. This includes USCDI (and richer data where available) via direct FHIR APIs from identified data holders, or through TEFCA IAS, and the ability to initiate and retrieve automated EHI Exports."
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
Once a Record Locator Service (RLS) query (as per TD1-004) has successfully identified potential data holders for a patient, the ecosystem must facilitate the next step: granular data access. The patient-authorized application must then be able to:
*   Leverage the same trusted identity and authorization framework used for RLS access.
*   Request and retrieve specific health data from the identified data holders. This includes:
    *   Accessing USCDI data (and richer standardized data where available) via direct ONC-certified FHIR APIs exposed by those data holders.
    *   Accessing data through TEFCA Individual Access Services (IAS) if the data holder participates and this is the preferred route.
    *   Initiating and retrieving automated EHI Exports from these data holders to obtain comprehensive data not covered by granular APIs.
This ensures a seamless workflow from discovery to data retrieval for developers building patient-facing applications.
