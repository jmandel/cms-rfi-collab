---
id: "td6-003"
rfi_question_code: "TD-6"
point_key: "EVALUATE_TEFCA_VS_DIRECT_APIS_FOR_PATIENT_NEEDS"
short_title: "Evaluate TEFCA vs. Direct APIs for Patient Needs"
summary: "TEFCA's unique value for *individual patient data retrieval* (beyond RLS) needs careful evaluation against direct, performant, universal EHR FHIR APIs (incl. automated EHI Export). TEFCA pathways for individuals should not create higher barriers, offer less control, or perform worse than direct, certified API methods."
categories:
  - "Audience_RFI_Section:Tech_Vendor_Network"
  - "Core_Theme:TEFCA_Evolution"
  - "Core_Theme:Standards_Interoperability"
  - "Core_Theme:Patient_Empowerment_Control"
  - "Key_Technology_Mechanism:FHIR_API"
  - "Key_Technology_Mechanism:EHI_Export"
  - "Key_Technology_Mechanism:TEFCA_IAS"
---
While TEFCA's RLS for individuals (TD6-001) offers potential unique value in *discovery*, the unique value proposition of TEFCA for the actual *retrieval of an individual patient's data* by their chosen app needs careful and ongoing evaluation, particularly when compared against:
*   A future state where **direct, performant, and universally implemented ONC-certified EHR FHIR APIs** (for USCDI and richer data) are readily available.
*   A modernized, **API-driven EHI Export** capability providing comprehensive data directly from EHRs.

**Alternatives to TEFCA for patient data retrieval exist and are foundational:**
*   Direct SMART on FHIR APIs from providers are mandated by the Cures Act.
*   The EHI Export requirement also stems from the Cures Act.

Pathways within TEFCA for individual access should not:
*   Create higher technical or administrative barriers for patients or their apps compared to direct API access.
*   Offer less granular patient control over data sharing.
*   Perform significantly worse than direct API methods.
If direct, certified APIs can provide more efficient, performant, or patient-controlled access, these should remain viable and encouraged alternatives. TEFCA's role in data retrieval for individuals should complement, not complicate or hinder, these existing Cures Act pathways.
