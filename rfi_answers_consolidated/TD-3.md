---
rfi_question_code: "TD-3"
short_title: "Architecting Secure & Interoperable Digital Identity in Healthcare"
summary: "Digital ID must enable patient-controlled app authorization via trusted IAL2/AAL2 credentials and standard protocols (OIDC/OAuth2). Architect with a 'narrow waist' of trusted, independent ID/Auth services to enhance security. #DigitalIdentity #Security #HealthIT"
categories:
  - "Audience_RFI_Section:Tech_Vendor_Network"
  - "Core_Theme:Digital_Identity_Authorization"
  - "Core_Theme:Patient_Empowerment_Control"
  - "Core_Theme:Permissionless_Innovation"
  - "Key_Technology_Mechanism:Digital_Identity"
  - "Key_Technology_Mechanism:Authorization_Consent"
  - "Policy_Regulation:Data_Privacy_Security"
  - "Core_Theme:Standards_Interoperability"
  - "Audience_RFI_Section:Patient_Caregiver"
  - "Core_Theme:TEFCA_Evolution"
  - "Key_Technology_Mechanism:TEFCA_IAS"
  - "Key_Technology_Mechanism:SMART_on_FHIR"
  - "Policy_Regulation:ONC_Certification"
---
Digital identity implementation in healthcare (TD-3) must be architected for security, interoperability, and patient control:

1.  **Patient-Controlled ID for Secure App Authorization:** Implementation must directly support a patient's ability to use their personal, trusted credential (IAL2/AAL2) to securely authenticate and subsequently authorize applications for access to their own data. This requires robust protocols (OpenID Connect, OAuth 2.0) with authorization cryptographically bound to identity, as per the (see **Cross-Cutting Principle: [Assured Identity and Verifiable Authorization](#IDENTITY_AUTH_STACK)**) principle, empowering (see **Cross-Cutting Principle: [Patient Control: Transparency and Prospective Data-Sharing Preferences](#PATIENT_CONTROL)**).
2.  **"Narrow Waist" Architecture for Identity and Authorization:** The ecosystem should rely on a limited number of highly trusted, independent service providers for Identity Verification and Authorization Management. Applications must delegate these critical functions, fundamentally limiting the "blast radius" of any single application by not handling sensitive credentialing or making unilateral authorization decisions.
3.  **Universal TEFCA Identity & Authorization Trust Framework:** For TEFCA, a universal trust framework for identity (IAL2/AAL2) and patient-mediated authorization (SMART scopes/FHIR Consent, cryptographically bound) is essential. This framework, aligned with the (see **Cross-Cutting Principle: [Assured Identity and Verifiable Authorization](#IDENTITY_AUTH_STACK)**), must be leveraged for all individual-directed data access, whether via formal IAS Providers or (see **Cross-Cutting Principle: [Individual Access Parity within TEFCA](#PERMISSIONLESS_TEFCA_ACCESS)**) pathways.