---
id: "pc14-001"
rfi_question_code: "PC-14"
point_key: "TRUSTED_IDENTITY_AND_AUTHORIZATION_SERVICES_ARE_FOUNDATIONAL"
short_title: "Trusted Identity & Authorization Services are Foundational"
summary: "Robust digital ID (IAL2/AAL2) must be coupled with trusted, independent services for both identity verification AND authorization management. Applications must delegate these functions to limit their risk, ensuring apps don't manage credentials or make unilateral authorization decisions."
categories:
  - "Audience_RFI_Section:Patient_Caregiver"
  - "Core_Theme:Digital_Identity_Authorization"
  - "Policy_Regulation:Data_Privacy_Security"
  - "Core_Theme:TEFCA_Evolution"
  - "Key_Technology_Mechanism:Digital_Identity"
  - "Key_Technology_Mechanism:Authorization_Consent"
  - "Core_Theme:Standards_Interoperability"
---
The availability of robust, widely accepted digital identity credentials (e.g., achieving NIST IAL2/AAL2) is a critical first step, but it is not sufficient on its own to ensure secure and patient-controlled data access. These credentials must be coupled with trusted, independent services responsible for:
1.  **Identity Verification:** Consistently verifying the user's identity to the required assurance level.
2.  **Authorization Management:** Securely obtaining, managing, storing, and enforcing the patient's explicit, granular consent for specific data access by specific applications. This includes managing the lifecycle of authorizations (grant, revoke, expiration).

Critically, patient-facing applications must *delegate* these functions to such trusted services (e.g., services offered by QHINs for TEFCA IAS, or other designated neutral entities). Applications should not be handling sensitive identity credentialing processes themselves nor should they be making unilateral decisions about the scope of data access based on broad, unmanaged consent. This architectural principle is fundamental to limiting the potential risk or "blast radius" of any single application compromise and ensuring patient control.
