---
id: "td1-002"
rfi_question_code: "TD-1"
point_key: "ENABLE_PATIENT_DRIVEN_APPLICATION_REGISTRATION_AND_ACCESS_MANDATE_DYNREG"
short_title: "Mandate Identity-Scoped Dynamic App Registration"
summary: "Patients, using their trusted digital identity credential, must be empowered to dynamically register any application of their choosing—including self-developed tools—with all ONC-certified Health IT Modules (EHRs) and QHINs (for TEFCA IAS). This registration must programmatically restrict app scope to act only on behalf of that specific patient, via a trusted authorization service, enabling true permissionless innovation."
categories:
  - "Audience_RFI_Section:Tech_Vendor_Network"
  - "Core_Theme:Permissionless_Innovation"
  - "Core_Theme:Digital_Identity_Authorization"
  - "Core_Theme:Patient_Empowerment_Control"
  - "Policy_Regulation:ONC_Certification"
  - "Key_Technology_Mechanism:TEFCA_IAS"
  - "Key_Technology_Mechanism:Digital_Identity"
  - "Key_Technology_Mechanism:Authorization_Consent"
---
A critical step to stimulate developer interest, especially from individual innovators and smaller entities, is to *mandate identity-scoped dynamic application registration*. This means:
*   Patients, authenticated using their trusted digital identity credential (as per TD1-001), must be empowered to dynamically register *any application of their choosing* with:
    *   All ONC-certified Health IT Modules (primarily EHRs) that expose patient access APIs.
    *   QHINs for the purpose of TEFCA Individual Access Services (IAS).
*   This registration process must, through technical means (e.g., OAuth 2.0 token issuance tied to the patient's authenticated session), programmatically restrict the application's operational scope to act *only on behalf of that specific, authenticated patient*.
*   The application itself does not require extensive pre-vetting, business-level agreements with each data holder, or inclusion in a limited "trusted app" list if its access is strictly governed by an authenticated patient's explicit, ongoing consent, ideally managed through a trusted, independent authorization service (as outlined in TD3-002).
This approach is foundational for enabling true permissionless innovation by individuals and fostering a diverse app ecosystem.
