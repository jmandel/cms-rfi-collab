---
id: "pr5-004"
rfi_question_code: "PR-5"
point_key: "SMART_STANDALONE_ENABLES_PERMISSIONLESS_INNOVATION"
short_title: "Standalone SMART Enables Permissionless Innovation"
summary: "Highlight the critical importance of supporting standalone SMART on FHIR app launch (in addition to EHR-launched). This is crucial for enabling permissionless innovation, allowing individual patients and developers to create and use apps that connect to EHR data via patient authorization, without requiring direct EHR vendor integration or approval for every app."
categories:
  - "Audience_RFI_Section:Provider"
  - "Core_Theme:Permissionless_Innovation"
  - "Core_Theme:Standards_Interoperability"
  - "Key_Technology_Mechanism:SMART_on_FHIR"
---
While EHR-launched SMART on FHIR applications are valuable, it is critically important to also mandate and ensure robust support for *standalone SMART on FHIR app launch*. This capability allows applications to be initiated outside the EHR, typically by a patient or provider directly, and then connect to the EHR's FHIR server using patient-brokered authorization (e.g., OAuth 2.0).

Standalone launch is crucial for:
*   **Permissionless Innovation:** It enables individual patients, researchers, and third-party developers to create and use applications that access EHR data (with patient consent) without needing deep integration into the EHR itself or requiring the EHR vendor's explicit approval or partnership for every app.
*   **Broader App Ecosystem:** It fosters a more diverse range of applications that can serve niche needs or offer innovative functionalities not prioritized by EHR vendors.
*   **Patient Choice and Control:** It empowers patients to choose the tools they want to use to manage their health data.
This includes mandating SMART 2.1 features like PKCE for all client types and `offline_access` scope for browser-based apps.
