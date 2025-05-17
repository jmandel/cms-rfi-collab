# Cross-Cutting Principles for a Modern Health Technology Ecosystem

This document outlines foundational principles intended to guide the development and implementation of a modern, interoperable, and patient-centric health technology ecosystem. These principles are designed to address systemic challenges and promote scalable, secure, and equitable access to health information for all stakeholders.

---

### 1. IDENTITY_AUTH_STACK — Assured Identity and Verifiable Authorization

**Problem:** The secure exchange of health information necessitates unambiguous identification of all participating entities (patients, providers, applications) and verifiable confirmation of their access privileges. Absent robust identity assurance and explicit authorization artefacts, systems cannot make reliable, policy-conformant access control decisions, thereby undermining trust and security.

**Capability:** The ecosystem must support credentials proofed to NIST Identity Assurance Level 2 (IAL2) and authenticated at Authenticator Assurance Level 2 (AAL2) (e.g., Login.gov, compliant state-issued mobile Driver's Licenses, or equivalent Verifiable Credentials). Following successful authentication, an OAuth 2.0 / OpenID Connect flow should issue an access token. This token must encode granular, standardized scopes (e.g., SMART on FHIR scopes) and, when applicable, reference a machine-readable consent directive (e.g., a FHIR `Consent` resource). The token must be cryptographically bound to the authenticated identity, enabling resource servers to validate both identity and authorization with high assurance in a single, verifiable step. Identity proofing and authorization services may be distinct but must be coordinated to ensure this verifiable binding.

---

### 2. PROVIDER_DIRECTORY — Public, No-Fee Endpoint Registry

**Problem:** Client applications, including those used by patients and providers, cannot programmatically discover or connect to essential health information services (e.g., Patient Access APIs, organizational FHIR endpoints) without a reliable mechanism to locate validated service endpoint URLs and associated metadata.

**Capability:** A publicly accessible, national directory must be established and maintained, listing validated FHIR base URLs for healthcare organizations. This directory should include metadata such as participation in exchange frameworks (e.g., TEFCA), supported API versions, and potentially, supported identity/authorization mechanisms. The directory itself must expose a standards-based query interface to support automated discovery and should be refreshed through routine endpoint health and validation checks. Access to this directory for patient-centred discovery and individual data access use cases must be free of charge; cost-recovery models, if necessary, should be confined to high-volume, commercial, or non-patient-facing queries.

---

### 3. PERMISSIONLESS_TEFCA_ACCESS — Individual Access Parity within TEFCA

**Problem:** Current TEFCA implementations and the Individual Access Services (IAS) model primarily address pathways for established commercial applications acting as intermediaries. There is a significant gap in enabling individual patients or developers of niche tools to directly participate in TEFCA for accessing *their own data* without becoming formal, complex IAS Participants or relying on a limited set of pre-approved IAS providers.

**Capability:** The TEFCA framework must explicitly support a low-barrier, "permissionless" pathway for individuals to leverage their trusted TEFCA-conformant digital identity and authorization tokens to directly query TEFCA Record Locator Services (RLS) and retrieve their own health information from TEFCA Participants. This pathway would enable a patient, using a self-authorized tool (e.g., a personal script, a niche application not formally registered as an IAS), to interact with QHINs for discovery and with Participants for data retrieval, predicated on the strength of their TEFCA-validated identity and explicit authorization. This does not replace the formal IAS Provider role for multi-tenant applications but offers essential parity for individual-driven access.

---

### 4. OPEN_STANDARDS_FIRST — Prioritization of Publicly Specified Interfaces

**Problem:** The proliferation of proprietary or redundant data exchange interfaces fragments the health IT ecosystem, increases integration costs and complexity, hinders innovation, and perpetuates data silos.

**Capability:** The ecosystem must prioritize the adoption and rigorous implementation of open, consensus-based, publicly specified standards for all core interoperability functions. This includes HL7 FHIR (Release 4 or subsequent stable versions) as the primary protocol for patient-centred, provider-facing, and population-level data exchange, encompassing critical specifications such as SMART on FHIR for application integration, FHIR Bulk Data Access for population-level exchange, CDS Hooks for clinical decision support integration, and standardized mechanisms for comprehensive EHI Export. As robust open standards mature, legacy or proprietary formats should be deprecated to consolidate development efforts and community expertise.

---

### 5. API_PERFORMANCE — Parity with Proprietary Data Channels

**Problem:** If certified open APIs operate with significantly higher latency, lower throughput, or reduced reliability compared to proprietary data channels offered by the same Health IT developer or data holder, stakeholders will inevitably bypass or underutilize the open pathways, thereby defeating interoperability objectives and perpetuating vendor lock-in.

**Capability:** Mandated open APIs (including Patient Access APIs, FHIR Bulk Data Access APIs, and comprehensive EHI Export mechanisms) must achieve performance levels—encompassing latency, throughput, and availability—that are comparable to, or not materially worse than, any proprietary interfaces offered by the same vendor for similar data access functions from equivalent underlying data stores. Qualitative parity ("no material degradation") is essential and must be validated through rigorous, real-world performance testing within certification processes.

---

### 6. EHI_EXPORT_API — Automated, Standardized Retrieval of Complete EHI

**Problem:** While ONC rules mandate the capability to export all Electronic Health Information (EHI), current implementations are often manual, reliant on proprietary portal workflows, and lack standardized, API-driven mechanisms for initiation, status monitoring, and programmatic retrieval. This renders the comprehensive EHI largely inaccessible for automated use by patients or their authorized applications.

**Capability:** Certified Health IT must support a standardized, asynchronous, FHIR-based API operation (or set of operations) enabling an authorized entity (e.g., a patient via their application) to: (i) programmatically initiate an export job for a single patient's complete EHI (or for a defined population where appropriate); (ii) programmatically poll for or receive notifications regarding the job's status; and (iii) programmatically and securely retrieve the complete EHI package. This package must contain all EHI and a machine-readable manifest detailing file formats and logical relationships, adhering to specifications such as the Argonaut Electronic Health Information (EHI) Export Implementation Guide.

---

### 7. REALTIME_SUBSCRIPTIONS — Event-Driven Data Exchange

**Problem:** Reliance on polling mechanisms for data updates introduces latency, consumes unnecessary network and server resources, and hinders the development of time-sensitive clinical and patient-facing applications.

**Capability:** Certified Health IT should be required to support standards-based, event-driven subscription mechanisms, such as those outlined in the Argonaut US Core Patient Data Feed Implementation Guide (which back-ports FHIR R5 Topic-Based Subscriptions to FHIR R4). This enables subscribed client applications to receive near real-time notifications when new or updated health information for a patient becomes available, facilitating timely clinical decision-making, proactive care coordination, and enhanced patient engagement without the inefficiencies of continuous polling.

---

### 8. FULL_DICOM_ACCESS — Interoperable Access to Diagnostic-Quality Imaging

**Problem:** Access to medical imaging is often limited to static, rendered views within portals or proprietary systems, lacking the diagnostic quality, metadata, and multi-frame data necessary for clinical review, secondary interpretation, quantitative analysis, or machine learning applications.

**Capability:** Certified Health IT, when managing imaging studies, must support the exchange of imaging metadata via FHIR `ImagingStudy` resources. These resources must include resolvable, access-controlled URLs adhering to the DICOMweb WADO-RS standard, enabling authorized applications to retrieve the original DICOM objects in their entirety. Authentication and authorization for DICOMweb access should leverage the same security framework (e.g., OAuth 2.0 tokens) used for other FHIR API interactions, ensuring consistent security and access control.

---

### 9. DATA_COMPLETENESS — USCDI Minimum, FHIR API for Richer Exchange, EHI Export for Comprehensiveness

**Problem:** Restricting API responses or data exchange capabilities solely to the elements defined within the United States Core Data for Interoperability (USCDI) omits a significant volume of electronically available and clinically relevant patient information. While EHI Export provides a mechanism for all data, more granular, standardized access to richer datasets beyond USCDI is also needed for many use cases.

**Capability:** A multi-tiered approach is necessary to ensure comprehensive yet efficient data access:
    1.  **USCDI via FHIR API as Baseline:** USCDI, accessible via performant FHIR APIs, serves as the essential, standardized *minimum* dataset for interoperable exchange.
    2.  **Richer FHIR API Exchange Beyond USCDI:** Certified Health IT should be capable of, and actively encouraged to support, exchanging additional structured data elements *beyond* the current USCDI version via FHIR APIs, leveraging mature FHIR resources and community-defined profiles where available. This allows for more granular and standardized access to richer datasets without resorting immediately to a full export.
    3.  **API-Driven EHI Export as Comprehensive Backstop:** For all EHI not efficiently or appropriately accessible via granular FHIR APIs (including unstructured data, complex legacy data, or data not yet profiled in FHIR), the modernized, API-driven EHI Export (as defined in Principle 6) serves as the critical mechanism to ensure *complete* access to the patient's entire electronic health record.

This layered strategy ensures a standardized floor (USCDI), promotes the evolution of richer standardized API exchange (FHIR beyond USCDI), and guarantees ultimate comprehensiveness through EHI Export. The 21st Century Cures Act's intent for patients to access their *entire* EHI is thus met through a practical, evolving framework.

---

### 10. ZERO_PATIENT_FEES — Cost-Free Individual Use of Exchange Pathways

**Problem:** The imposition of direct fees on individuals for accessing or directing the exchange of their own health information via mandated interoperability pathways creates significant financial barriers, undermines statutory rights of access, and disproportionately affects vulnerable populations.

**Capability:** Policies must explicitly prohibit Health IT developers, healthcare providers, and network operators from charging fees to individual patients (or their directly authorized personal applications) for accessing their own EHI through ONC-certified APIs (including Patient Access and EHI Export APIs) or TEFCA-facilitated individual access pathways. Cost recovery models for interoperability infrastructure must be designed to avoid imposing direct financial burdens on patients exercising their fundamental data access rights.

---

### 11. PATIENT_CONTROL — Transparency and Prospective Data-Sharing Preferences

**Problem:** Patients often lack clear visibility into how, when, and by whom their health information is accessed and exchanged. Furthermore, they have limited mechanisms to proactively express granular preferences or exercise control over future data sharing events.

**Capability:** The health technology ecosystem must provide patients with: (i) readily accessible, understandable audit logs of all access to and exchange of their EHI, ideally leveraging standardized formats like FHIR `AuditEvent` resources; and (ii) mechanisms to prospectively manage and express data sharing preferences. These preferences should allow for granular control (e.g., ability to "Freeze" access, or request "Ask Me First" notifications for certain query types, temporary suspension of routine sharing where legally permissible) and must be honored by participating systems.

---

### 12. APP_TRANSPARENCY_CRITERIA — Baseline Disclosures for Third-Party Applications

**Problem:** Patients cannot make informed decisions about authorizing third-party applications to access their health information without clear, standardized disclosures regarding the application's identity, data handling practices, and security posture.

**Capability:** Any application seeking to connect to certified APIs for patient-authorized data access must publish, and attest to the accuracy of, a machine-readable manifest. This manifest should, at a minimum, identify the legal entity responsible for the application, provide a link to a plain-language privacy policy detailing data collection, use, sharing, retention, and deletion practices, and attest to adherence to data minimization and recognized security best practices. This transparency enables informed patient choice without necessitating direct governmental assessment of application efficacy or comprehensive technical security audits for all apps.

---

### 13. INFOBLOCKING_ENFORCEMENT — Focused Oversight of Material Impediments

**Problem:** Declarative interoperability policies and technical standards alone are insufficient to deter practices that deliberately or negligently limit data liquidity. Effective, consistent enforcement is required to ensure that the spirit and letter of interoperability mandates are met.

**Capability:** Regulatory bodies (ONC, CMS, OIG) must prioritize robust and consistent enforcement of information blocking regulations. Enforcement should focus on practices that materially restrict or discourage the access, exchange, or use of EHI, including but not limited to: systematic degradation of certified API performance, imposition of unreasonable fees or discriminatory contractual terms for API access, failure to provide complete EHI via export mechanisms, and creating undue friction for patient-authorized application connections. Transparent reporting of enforcement actions and proportionate sanctions are necessary to signal that open, performant, and complete data access is an operational requirement.

---

### 14. CERTIFICATION_FOR_REAL_WORLD_USABILITY — Validating Functional Interoperability

**Problem:** ONC Health IT Certification has historically focused on the presence of specified capabilities, which does not always translate to practical, real-world usability, performance, or completeness of data access for end-users (patients, providers, and application developers).

**Capability:** The ONC Health IT Certification Program must evolve to rigorously validate not just the *existence* of mandated functionalities but their *effective real-world implementation*. This requires: (i) testing API performance (e.g., USCDI Patient Access, FHIR Bulk Data Access, EHI Export API) against defined, realistic benchmarks; (ii) verifying actual data completeness for EHI Exports and the scope of API responses relative to available EHI; (iii) assessing the practical usability of workflows for data access and patient-driven application registration; and (iv) ensuring that the "without special effort" criterion is demonstrably met in typical operational scenarios. Certification must serve as a reliable attestation of functional, usable interoperability.

---

### 15. ADDRESSING_PROVIDER_BURDEN_THROUGH_TECHNOLOGY — Designing for Clinician Efficiency

**Problem:** Poorly designed, non-interoperable, or inefficient health information technology significantly contributes to provider burden, burnout, and detracts from patient care. Technology intended to support clinicians often becomes an impediment.

**Capability:** A core objective in the design, development, and implementation of health IT systems and interoperability solutions must be the explicit reduction of provider burden. This involves: (i) ensuring high performance and reliability of all data access and exchange mechanisms; (ii) streamlining clinical workflows through intelligent integration of data and decision support (e.g., via CDS Hooks); (iii) automating administrative tasks (e.g., quality reporting data submission via performant Bulk FHIR APIs); and (iv) prioritizing user-centered design principles to enhance the intuitiveness and efficiency of clinical interfaces and tools. Technology should demonstrably simplify, not complicate, the provision of care.

---

---

### 16. PATIENT_AUTHORIZED_ACCESS_PARITY (Portals and APIs) — Ensuring Continuous Access Rights

**Problem:** A significant gap often exists between the health information a patient can view within a provider's patient portal and the data accessible to the patient or their authorized third-party applications via mandated APIs. This disparity can arise from incomplete API implementations, performance deficiencies, or scope limitations of current API standards relative to the data available in the portal. When APIs fall short, and technical measures actively obstruct patient-authorized tools (such as Robotic Process Automation - RPA) from accessing portal-visible data, patients are effectively denied access to their own information "without special effort," potentially constituting information blocking.

**Capability:** To ensure patients can continuously exercise their right to access their EHI using tools of their choice, particularly when certified APIs are deficient, the following approach is necessary:
    1.  **Primacy of APIs:** The foremost objective remains the universal availability of robust, performant, and comprehensive APIs (as outlined in principles such as `API_PERFORMANCE`, `DATA_COMPLETENESS`, and `EHI_EXPORT_API`) that provide programmatic access to all EHI.
    2.  **Non-Obstruction of Patient-Authorized Portal Agents:** As an interim measure, and specifically when equivalent data is not reasonably available to the patient or their designated application through certified, functional APIs, certified Health IT products providing patient portals **must not implement technical measures specifically designed to prevent or obstruct legitimate, patient-authorized agents** (which may include RPA tools) from accessing the same information that the authenticated patient can view directly within the portal.
        *   This includes avoiding practices such as frequent, unannounced UI changes intended solely to break such tools, or overly aggressive anti-bot measures that indiscriminately block legitimate patient-authorized agents.
    3.  **Strong Authentication Prerequisite:** The use of any such patient-authorized agent to interact with a portal is contingent upon the patient first authenticating to the portal using strong credentials that meet the standards outlined in the `IDENTITY_AUTH_STACK` principle.
    4.  **Balancing Access with Security:** While reasonable, non-discriminatory security measures to protect against malicious activity are appropriate and necessary, these measures must be implemented in a way that does not unduly prevent or create "special effort" for patient-delegated access via tools of their choice, especially when preferred programmatic API pathways are deficient or incomplete.

This principle advocates for a pragmatic approach to uphold patient data access rights during the ongoing evolution of API capabilities. It is not a mandate for vendors to build or support RPA interfaces, but rather a prohibition against actively blocking patient-authorized tools when those tools represent a necessary, albeit less ideal, means for patients to access their own visible data due to API shortcomings. This aligns with the spirit of the Cures Act and efforts to combat information blocking.

---
