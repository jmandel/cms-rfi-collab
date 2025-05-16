---
id: "td3-002"
rfi_question_code: "TD-3"
point_key: "NARROW_WAIST_ARCHITECTURE_FOR_IDENTITY_AND_AUTHORIZATION"
short_title: "Narrow Waist Architecture for Identity & Authorization"
summary: "Architect ecosystem around limited trusted, independent providers for Identity Verification (IAL2/AAL2) and Authorization Management, limiting app blast radius."
categories:
  - "Audience_RFI_Section:Tech_Vendor_Network"
  - "Core_Theme:Digital_Identity_Authorization"
  - "Policy_Regulation:Data_Privacy_Security"
  - "Core_Theme:Standards_Interoperability"
  - "Key_Technology_Mechanism:Digital_Identity"
  - "Key_Technology_Mechanism:Authorization_Consent"
---
The ecosystem must be architected around a "narrow waist" of a limited number of highly trusted, independent service providers. These services will be responsible for:
*   Identity Verification: Robustly verifying user identity to at least IAL2/AAL2.
*   Authorization Management: Securely obtaining, managing, and enforcing the patient's explicit, granular consent for data access by specific applications (e.g., using FHIR Consent resources or similar standardized mechanisms, cryptographically bound to the verified identity). Applications delegate these critical functions, thus fundamentally LIMITING\_THE\_APP\_BLAST\_RADIUS by not handling sensitive credentialing or making unilateral authorization decisions.
