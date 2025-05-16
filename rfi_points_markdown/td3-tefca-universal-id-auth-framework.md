---
id: "td3-tefca-universal-id-auth-framework"
rfi_question_code: "TD-3"
point_key: "TEFCA_UNIVERSAL_ID_AUTH_FRAMEWORK"
short_title: "TEFCA: Universal Identity & Authorization Trust Framework"
summary: "TEFCA requires a universal trust framework for identity (IAL2/AAL2) and patient-mediated authorization (SMART scopes/FHIR Consent, cryptographically bound to identity). This framework must be leveraged for *all* individual-directed data access, whether via formal IAS Providers or permissionless patient-tool connections to Participants."
categories:
  - "Audience_RFI_Section:Tech_Vendor_Network"
  - "Audience_RFI_Section:Patient_Caregiver"
  - "Core_Theme:TEFCA_Evolution"
  - "Core_Theme:Digital_Identity_Authorization"
  - "Core_Theme:Standards_Interoperability"
  - "Core_Theme:Patient_Empowerment_Control"
  - "Core_Theme:Permissionless_Innovation" # Enables both pathways
  - "Key_Technology_Mechanism:TEFCA_IAS" # Relied upon by formal IAS
  - "Key_Technology_Mechanism:Digital_Identity"
  - "Key_Technology_Mechanism:Authorization_Consent"
  - "Key_Technology_Mechanism:SMART_on_FHIR"
  - "Policy_Regulation:Data_Privacy_Security"
  - "Policy_Regulation:ONC_Certification"
---
The integrity and success of *all* TEFCA pathways for individual-directed data access (whether through formal IAS Providers serving registered apps, or patients connecting their own tools directly to Participants) depend on a **universal TEFCA Identity and Authorization Trust Framework**. This framework, overseen by the RCE and ONC, establishes the "rules of the road" for patient identity and consent:

1.  **Approved Patient Identity Providers (IdPs):** TEFCA must designate or approve IdPs capable of verifying patient identities to NIST IAL2 (identity proofing) and AAL2 (authentication strength) standards. Patients use credentials from these IdPs to initiate any data access authorization process.

2.  **Standardized Patient-Mediated Authorization Services:** TEFCA must specify requirements for, or endorse, Authorization Services that:
    *   Allow a patient, after strong authentication, to grant explicit, granular consent for a specific application (registered or personal tool) to access their data.
    *   Utilize standard protocols (OAuth 2.0, OpenID Connect).
    *   Define access scope using **SMART on FHIR scopes** as a baseline, with **FHIR Consent Resources** for more complex needs.
    *   Ensure consent is revocable and auditable by the patient.

3.  **Cryptographic Binding of Authorization to Identity:** All patient-granted authorizations (e.g., access tokens) must be cryptographically bound to the patient's authenticated identity. This ensures the authorization is authentic, unforgeable, and verifiably from the correct individual.

4.  **Universal Reliance by TEFCA Actors:**
    *   **QHINs (as IAS Providers or RLS providers):** Must trust and validate patient identities and authorization tokens issued according to this framework when serving registered apps or patient-directed tools.
    *   **TEFCA Participants (as data holders):** Must trust and validate patient identities and authorization tokens issued according to this framework when fulfilling data requests from patient-directed tools or requests relayed via an IAS Provider.

This universal trust framework forms a "narrow waist," ensuring that no matter the application or access pathway, patient identity is strongly verified, and their consent is explicitly captured and securely communicated, underpinning trustworthy data exchange across the TEFCA network for individual access.
