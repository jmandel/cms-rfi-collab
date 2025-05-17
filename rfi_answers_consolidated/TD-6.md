---
rfi_question_code: "TD-6"
short_title: "Evaluating TEFCA's Role Relative to Direct API Access for Patients"
summary: "TEFCA's RLS for individuals offers discovery value. However, its utility for patient data retrieval needs careful evaluation against direct, performant EHR FHIR APIs (incl. EHI Export). TEFCA shouldn't create higher barriers for individuals. #TEFCA #PatientAccess #API"
categories:
  - "Audience_RFI_Section:Tech_Vendor_Network"
  - "Core_Theme:TEFCA_Evolution"
  - "Core_Theme:Standards_Interoperability"
  - "Core_Theme:Patient_Empowerment_Control"
  - "Key_Technology_Mechanism:FHIR_API"
  - "Key_Technology_Mechanism:EHI_Export"
  - "Key_Technology_Mechanism:TEFCA_IAS"
---
Regarding TEFCA's unique interoperability functions (TD-6), particularly for individual patients:

While a TEFCA Record Locator Service (RLS) for individuals (potentially informed by a (see **Cross-Cutting Principle: [Public, No-Fee Endpoint Registry](#PROVIDER_DIRECTORY)**)) offers unique value in *discovery*, the distinct advantage of TEFCA for the actual *retrieval of an individual patient's data* by their chosen app requires ongoing assessment against:
*   Universally implemented, direct, and performant ONC-certified EHR FHIR APIs (for USCDI and richer data, per (see **Cross-Cutting Principle: [API Performance Parity with Proprietary Data Channels](#API_PERFORMANCE)**)).
*   A modernized, API-driven (see **Cross-Cutting Principle: [Automated, Standardized Retrieval of Complete EHI](#EHI_EXPORT_API)**) providing comprehensive data.

Pathways within TEFCA for individual access, such as (see **Cross-Cutting Principle: [Individual Access Parity within TEFCA](#PERMISSIONLESS_TEFCA_ACCESS)**), should not impose higher barriers, offer less (see **Cross-Cutting Principle: [Patient Control: Transparency and Prospective Data-Sharing Preferences](#PATIENT_CONTROL)**), or exhibit poorer performance than these direct API methods. TEFCA should primarily complement, not complicate or impede, existing Cures Act pathways for patient data retrieval.