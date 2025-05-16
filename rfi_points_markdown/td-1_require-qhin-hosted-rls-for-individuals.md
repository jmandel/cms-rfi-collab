---
id: "td1-004"
rfi_question_code: "TD-1"
point_key: "REQUIRE_QHIN_HOSTED_RECORD_LOCATOR_SERVICES_FOR_INDIVIDUALS"
short_title: "Require QHIN-Hosted Record Locator Services (RLS) for Individuals"
summary: "To help patients and their apps find where their data resides, TEFCA QHINs must be required to offer a standardized, API-accessible Record Locator Service (RLS). This RLS must be available to individuals (via their authorized and dynamically registered applications) to discover which healthcare organizations across the TEFCA network hold their health records. This 'discovery' is essential before granular data retrieval."
categories:
  - "Audience_RFI_Section:Tech_Vendor_Network"
  - "Core_Theme:TEFCA_Evolution"
  - "Core_Theme:Data_Access_Completeness"
  - "Core_Theme:Patient_Empowerment_Control"
  - "Key_Technology_Mechanism:Record_Locator_Service_RLS"
  - "Key_Technology_Mechanism:TEFCA_IAS"
  - "Key_Technology_Mechanism:FHIR_API"
---
A significant challenge for patients and their applications is knowing *where* their health records are located across a fragmented healthcare system. To address this and stimulate developer interest in apps that can provide a comprehensive view:
*QHINs participating in TEFCA must be required to offer a standardized, API-accessible Record Locator Service (RLS).*
This RLS must be securely available to:
*   Individuals, via their authorized and dynamically registered applications (as described in TD1-002).
*   The RLS API should allow these patient-authorized apps to query (based on the patient's verified identity) and discover which specific healthcare organizations (Participants and Subparticipants in TEFCA) across the network are likely to hold health records for that patient.
This "discovery" step is essential before more granular data retrieval can be effectively initiated by patient-facing applications, significantly simplifying the data aggregation challenge for developers.
