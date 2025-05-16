---
id: "td3-001"
rfi_question_code: "TD-3"
point_key: "PATIENT_CONTROLLED_ID_FOR_SECURE_APP_AUTHORIZATION"
short_title: "Patient-Controlled ID for Secure App Authorization"
summary: "Digital identity implementation must directly support a patient's ability to use their personal, trusted credential (IAL2/AAL2) to securely authenticate themselves and subsequently authorize applications—including self-registered ones—for access to their own data only. This requires robust protocols like OpenID Connect and OAuth 2.0."
categories:
  - "Audience_RFI_Section:Tech_Vendor_Network"
  - "Core_Theme:Digital_Identity_Authorization"
  - "Core_Theme:Patient_Empowerment_Control"
  - "Core_Theme:Permissionless_Innovation"
  - "Key_Technology_Mechanism:Digital_Identity"
  - "Key_Technology_Mechanism:Authorization_Consent"
  - "Policy_Regulation:Data_Privacy_Security"
---
The implementation of digital identity in healthcare must directly support a patient's ability to:
1.  **Use a personal, trusted digital credential** (meeting NIST IAL2 for identity proofing and AAL2 for authentication strength) to securely authenticate themselves to data access systems (e.g., EHR FHIR servers, QHIN IAS portals).
2.  **Subsequently authorize specific applications**—including applications they have dynamically registered for personal use—to access *their own health data only*, and only for the scopes they explicitly approve.

This necessitates the widespread adoption and consistent implementation of robust, open standards-based protocols such as **OpenID Connect (OIDC)** for authentication and **OAuth 2.0** for authorization. Requiring OIDC would standardize the identity layer, improving interoperability and security for app connections. Cybersecurity and data exchange are enhanced when strong authentication is tied to fine-grained, patient-managed authorization, preventing apps from overreaching their approved access.
