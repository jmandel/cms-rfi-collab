---
id: "td3-002"
rfi_question_code: "TD-3"
point_key: "NARROW_WAIST_ARCHITECTURE_FOR_IDENTITY_AND_AUTHORIZATION"
short_title: "Narrow Waist Architecture for Identity & Authorization"
summary: "The digital health ecosystem should be architected around a 'narrow waist' of a limited number of highly trusted, independent service providers responsible for Identity Verification (IAL2/AAL2) and Authorization Management. Applications must delegate these critical functions, thus fundamentally limiting the 'blast radius' of any single application by not handling sensitive credentialing or making unilateral authorization decisions."
categories:
  - "Audience_RFI_Section:Tech_Vendor_Network"
  - "Core_Theme:Digital_Identity_Authorization"
  - "Policy_Regulation:Data_Privacy_Security"
  - "Core_Theme:Standards_Interoperability"
  - "Key_Technology_Mechanism:Digital_Identity"
  - "Key_Technology_Mechanism:Authorization_Consent"
---
To ensure security, interoperability, and patient trust, the digital health ecosystem must be architected around a **"narrow waist" model for identity and authorization**. This means relying on a limited number of highly trusted, independent, and potentially regulated/certified service providers that are solely responsible for:

1.  **Identity Verification:** Robustly verifying user identity to at least NIST IAL2. This could be through services like Login.gov, or systems leveraging state-issued mDLs according to strict standards.
2.  **Authorization Management:** Securely obtaining, managing, storing, and enforcing the patient's explicit, granular consent for data access by specific applications. This would involve standardized mechanisms like FHIR Consent resources, cryptographically bound to the verified identity.

Crucially, **applications must delegate these critical functions** to these trusted services. Apps should *not* be:
*   Handling or storing sensitive identity credentials.
*   Making unilateral decisions about the scope or duration of data access.
*   Managing complex consent logic internally without oversight.

This delegation fundamentally limits the potential "blast radius" or security risk associated with any single application. If an app is compromised, it doesn't compromise the patient's primary identity credential or their master authorization settings. This architecture is a key challenge but offers profound benefits for cybersecurity and trustworthy data exchange.
