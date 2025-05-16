---
id: "pc10-formal-ias-registered-apps"
rfi_question_code: "PC-10"
point_key: "TEFCA_FORMAL_IAS_FOR_REGISTERED_APPS"
short_title: "TEFCA: Formal IAS Provider Role for Registered Third-Party Apps"
summary: "TEFCA must support a pathway where QHINs (or their designated Participants) can act as formal 'Individual Access Service (IAS) Providers.' This enables registered third-party applications to connect, using the TEFCA Trust Framework for identity and patient consent, to access RLS and retrieve data network-wide on behalf of patients."
categories:
  - "Audience_RFI_Section:Patient_Caregiver"
  - "Audience_RFI_Section:Tech_Vendor_Network"
  - "Core_Theme:TEFCA_Evolution"
  - "Core_Theme:Digital_Identity_Authorization"
  - "Core_Theme:Patient_Empowerment_Control"
  - "Key_Technology_Mechanism:TEFCA_IAS" # Specifically the formal IAS Provider role
  - "Key_Technology_Mechanism:Digital_Identity"
  - "Key_Technology_Mechanism:Authorization_Consent"
  - "Key_Technology_Mechanism:SMART_on_FHIR"
  - "Policy_Regulation:CMS_Policy_Role"
---
For TEFCA to enable a broad ecosystem of trusted applications serving individuals, it must clearly define and support a pathway involving a formal **Individual Access Service (IAS) Provider role**. This role, typically fulfilled by a QHIN or its designated Participant, would:

1.  **Serve Registered Applications:** Act as a dedicated TEFCA entry point for legitimate third-party applications that have undergone a defined onboarding/registration process.
2.  **Leverage TEFCA Trust Framework:** Rely entirely on the foundational TEFCA Identity and Authorization Trust Framework (see TD3-TEFCA_UNIVERSAL_ID_AUTH_FRAMEWORK) to:
    *   Ensure patients authenticate with high-assurance credentials.
    *   Mediate the capture of granular, revocable patient consent for the registered application.
3.  **Provide Network-Wide Access:** Once a patient has authenticated and consented via the Trust Framework, the IAS Provider facilitates the registered application's requests to:
    *   Utilize QHIN-provided Record Locator Services (RLS) across the network.
    *   Request and retrieve health data from any TEFCA Participant holding data for that consenting patient.
4.  **App Trust Delegation:** Registered applications delegate identity and authorization functions to the TEFCA Trust Framework; they do not self-attest patient consent for network access.

This formal IAS Provider pathway provides a structured, accountable mechanism for established applications to offer TEFCA-powered services to patients, ensuring consistent application of TEFCA policies and trust principles.
