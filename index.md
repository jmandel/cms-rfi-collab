# Guiding Principles

### Patient Primacy and Empowerment | `principle_patient_primacy`
The individual is a primary stakeholder. All systems, regulations, and network designs must support the individual's right to easily access, understand, correct, control, and use their complete health data, free of charge.

### Comprehensive and Performant Data Access | `principle_comprehensive_performant_data_access`
All authorized users and their designated tools and applications must have pervasive, timely, and efficient access to both standardized data (e.g., USCDI via individual and bulk FHIR APIs) and to complete, computable Electronic Health Information (EHI via API) as a foundational backstop. Usability and performance of these access methods are paramount.

### Open Innovation and Individual Participation | `principle_open_innovation_individual_participation`
The ecosystem must actively support innovation from all sources, including individual patients developing or choosing their own tools to access and manage their own data. Barriers to entry for good-faith individual participation must be eliminated, ensuring pathways that do not require commercial-grade registration for individuals developing tools and applications for their own use. Our data access frameworks must anticipate and support the rapidly growing ability for individuals to "scratch their own itch," especially as current and near-future AI enables new forms of personal tool development.

### Transparent and Accountable Networks with Federal Oversight | `principle_tefca_oversight_accountability`
National-scale exchange frameworks like TEFCA, and their participating entities (like QHINs and health systems), must evolve under federal guidance to ensure individual transparency (e.g., clear pathways for individuals to access network audit logs revealing usage of their own data) and granular control (e.g., consent, opt-out). The Federal government should actively steer TEFCA's evolution to incorporate these as core, non-negotiable design tenets.

### Fostering Competition Through Open and Fair Market Foundations | `principle_market_competition_foundations`

To foster a competitive and innovative health IT market, foundational infrastructure and access pathways must be established on fair and open terms. This includes:
1.  **Publicly Accessible Directories:** Core directory services (e.g., for participant endpoints and capabilities) must be publicly available and free of charge to facilitate discovery and interconnection.
2.  **Non-Discriminatory, Cost-Based Access for Commercial Entities:** Fees for network participation and data access services for commercial entities should be reasonable, non-discriminatory, and based on the actual costs of providing those services, preventing anti-competitive pricing.
3.  **Cost-Free Pathways for Individual Innovation:** Clear, secure, and cost-free pathways must exist for individuals to access their own data using tools they choose or develop themselves, ensuring that personal innovation and patient-driven solutions are not stifled by commercial fee structures.

---

# Technology Policy Recommendations

## EHR Certification Program Ensures Foundational Product Functionality

### Steward USCDI Development for Pragmatic Interoperability | `req_steward_uscdi_development`
**Recommendation:**
ONC must lead an improved, evidence-based USCDI development and adoption process to ensure that an expanding set of meaningfully standardized and clinically relevant patient data elements is defined. This enhanced USCDI will serve as the common data foundation for all mandated FHIR-based APIs.

**Rationale & Specifics:**
1.  **Evidence-Based Prioritization:** The process for expanding USCDI must prioritize data elements with demonstrated, widespread real-world use cases and significant benefits for patient care, interoperability, research, or public health.
2.  **Clear Functional Expectations for SDOs:** When new data elements are added to USCDI, ONC should clearly articulate the functional expectations and provide illustrative examples of intended real-world usage. This high-level guidance enables ONC to work effectively with Standard Development Organizations (SDOs) to drive the downstream development of detailed, API-specific technical specifications and implementation guides (e.g., US Core FHIR profiles for single-patient access, and relevant profiles for Bulk FHIR operations).
3.  **Iterative Refinement:** An active feedback loop post-USCDI version release should be established to assess implementation quality and consistency across all API types, allowing for refinement of functional expectations or guidance.
4.  **Conformance Testing:** Certification testing for all FHIR APIs mandated to expose USCDI data must verify that the implementation of USCDI data elements aligns with the detailed specifications in relevant SDO-developed FHIR Implementation Guides (e.g., US Core), serving as a practical proxy for ensuring consistency with ONC's articulated functional expectations.

### Keep Single-Patient API Certification Current with SMART App Launch & Backend Services Specifications | `req_update_smart_app_launch_cert`
**Recommendation:**
The ONC Health IT Certification Program must ensure certified Health IT systems implement current, stable, industry-adopted versions of the SMART App Launch Framework and related backend services specifications to support secure and functional single-patient FHIR API access.

**Rationale & Specifics:**
To enable a broad ecosystem of secure and innovative single-patient applications:
1.  **Current SMART App Launch Versions:** Continue to require support for current, stable, industry-adopted versions of the SMART App Launch Framework (e.g., SMART 2.2 or subsequent releases), building on the SMART 2.1 foundation in HTI-1, to incorporate up-to-date security protocols and evolving capabilities. Certification must validate adherence to the specific security functionalities and protocols mandated by the required version.
2.  **Full CORS Support:** Mandate full Cross-Origin Resource Sharing (CORS) support on single-patient FHIR API endpoints to enable purely browser-based applications, lowering barriers for innovative patient-facing tools. Certification must validate correct and complete implementation.
3.  **Unrestricted `offline_access` Scope:** Ensure the `offline_access` scope is available for consumer approval for any registered app type (public, confidential, native, browser-based) to empower applications with persistent access and improve user experience. Certification must validate correct and complete implementation.
4.  **Standardized Endpoint Discovery (User-Facing Brands):** Mandate published endpoint lists supporting discovery by physical locations, organizational hierarchies, patient-facing brand names, and institution logos (e.g., aligning with initiatives like the "SMART Patient Access Brands" IG) to improve user experience in app connection.

### Keep Bulk Data API Certification Current with FHIR Bulk Data Specifications | `req_update_bulk_data_cert`
**Recommendation:**
The ONC Health IT Certification Program must ensure certified Health IT systems implement current, stable, industry-adopted versions of the FHIR Bulk Data Access (Flat FHIR) specification to support efficient, population-level export of USCDI data.

**Rationale & Specifics:**
To enable scalable population health, research, and system transition use cases:
1.  **Essential Parameter Support:** Mandate support for critical FHIR Bulk Data parameters, including `_since` for incremental updates and `_typeFilter` (or equivalent mechanisms) for granular data scoping of exported resources. Certification must validate correct implementation. Incremental updates enable systems to use efficient bulk exports that only contain required data and can be processed rapidly. In contrast to notifications when there are changes, incremental export requests represent a simpler approach to integration, support export of historical data, and do not require both the data provider system and the data consumer system to be continuously online. 
2.  **Basic Group Management:** Require EHR systems to support standardized API-based creation, modification, and deletion of FHIR Group resources for use in Bulk FHIR exports, without arbitrary group size limitations. Signal intent to adopt community-developed standards via SVAP for more advanced group management capabilities. Group APIs for both roster based groups (e.g., the DaVinci Member Attribution List Implementation Guide) and characteristic based groups (e.g., Argonaut work on FHIR Group API for Bulk Data Access IG) are needed to fully realize the potential of the Bulk Data API.

### Ensure Foundational Design and Performance for Bulk Data API | `req_ensure_bulk_api_performance_parity`
**Recommendation:**
Certified Health IT implementing FHIR Bulk Data APIs must be foundationally designed to operate efficiently at the population level, and their performance in exporting USCDI data must achieve parity with any proprietary bulk export mechanisms offered by the same system.

**Rationale & Specifics:**
To ensure the regulated Bulk FHIR API is a viable and primary mechanism for population data export, rather than a secondary, underperforming option:
1.  **Performance Parity:** The speed, efficiency, scalability, timeliness, and customization capabilities of the regulated FHIR Bulk Data export operation for USCDI data must be comparable to that of any non-FHIR, proprietary bulk export formats or methods (e.g., CSV exports from a data warehouse) offered by the same Health IT Module when exporting similar volumes of data for comparable patient cohorts. This is not directly certifiable in pre-market testing but should be an explicit expectation and potentially monitored through post-market surveillance or programs like the EHR Reporting Program.
2.  **Designed for Population Scale:** Health IT developers must attest that their FHIR Bulk Data API implementation is architected for efficient operation at population scale (e.g., leveraging appropriate database indexing, asynchronous processing, and scalable infrastructure), rather than being a simple iteration over single-patient APIs.

### Mandate API-Accessible, Computable Full EHI Export, Aligning with Industry Specifications | `req_api_ehi_export_argonaut`

**Recommendation:**
1. Certified Health IT must provide a robust, functional, and *computable* "Electronic Health Information" (EHI) Export for single patients. This EHI export *must* be available via a standardized API, aligning with or providing functionality equivalent to the Argonaut Project's EHI Export API Implementation Guide, to allow for automated retrieval by patient-authorized applications. This serves as a comprehensive backstop for any information not available through USCDI FHIR APIs and must include structured and unstructured data, along with necessary vendor documentation for interpretation.
2. In addition to providing access to a computable EHI export through the API, systems *must* also offer patients an API endpoint to export the full HIPAA designated record set in a human readable form. 

**Rationale & Specifics:**
A complete, computable, and API-accessible export of all EHI is a cornerstone of patient data access rights and enables numerous use cases, from personal health record aggregation to data migration and advanced analytics by patient-chosen tools.

1.  **Alignment with Argonaut EHI Export API IG (or Equivalent Functionality):**
    *   Implementations should support the SMART App Launch flow (e.g., `patient/$ehi-export` scope) for patient-facing app authorization, as defined in the Argonaut EHI Export API IG.
    *   The API should follow the FHIR Asynchronous Request Pattern, including the kick-off request, status polling, and manifest response, as detailed in the Argonaut EHI Export API IG.
    *   The manifest returned upon completion should include links to all exported data files (which may include FHIR NDJSON, vendor-specific formats, CSVs, etc.) and, importantly, a link to top-level public vendor documentation (`ehiDocumentationUrl`) necessary for interpreting the contents of the export, as specified in the Argonaut IG.
    *   Support for FHIR DocumentReference resources to describe non-FHIR data files within the export (as profiled in the Argonaut EHI Export API IG's EHIDocumentReference Profile) is crucial for providing metadata and context for diverse data formats.
    *   CORS support must be enabled to ensure web-based applications can fully utilize the API and access necessary headers.
2.  **Completeness:** The export must include *all* EHI as defined by ONC, encompassing both standardized (e.g., USCDI) and non-standardized data, including clinical notes, images (or references to them if not directly included), and other relevant information.
3.  **Computability:** Data should be provided in machine-readable formats. While vendor-specific formats are permissible within the EHI export (as anticipated by the Argonaut IG through DocumentReferences), they must be accompanied by the aforementioned vendor documentation to enable programmatic interpretation by recipient applications. FHIR NDJSON should be used for data that can be represented in FHIR.
   **Human Readability:** Data should also be provided through the API in human-readable format so patients can use an app to request and share their complete record from multiple sites with providers, researchers, and AI agents without needing to learn each site's process for submitting and tracking a record request.
4.  **Usability and Patient Interaction:**
    *   As described in the Argonaut EHI Export API IG, if the EHI Server supports returning a subset of EHI or requires additional user interaction (e.g., for filtering by date ranges or data types), it should support the `Link` header with `rel="patient-interaction"` to direct the user to a page for specifying these options.
    *   The process should accommodate workflows that may involve manual steps (e.g., HIM staff review), returning appropriate in-progress status responses until the data is ready for retrieval.
5.  **Certification Rigor for EHI Export:** Certification testing must rigorously verify:
    *   API Accessibility: Conformance to the specified asynchronous API pattern (kick-off, status, manifest) and SMART App Launch for authorization.
    *   Completeness: Mechanisms or attestations to ensure all EHI is included.
    *   Computability: Availability of data in machine-readable formats and the presence of the required `ehiDocumentationUrl` in the manifest.
    *   Functionality: Correct handling of patient interaction links (if supported), status updates, and manifest generation, aligning with the functional expectations of the Argonaut EHI Export API IG or equivalent.

By aligning with industry-developed specifications like the Argonaut EHI Export API IG, ONC can ensure a more consistent, interoperable, and functional approach to fulfilling the Cures Act requirement for full EHI export, making it truly useful for patients and the applications they authorize.


### Mandate Self-Service Electronic EHI Request Functionality in Certified Health IT | `req_self_service_ehi_request`

**Recommendation:**
Certified Health IT must provide a clear, easily discoverable, and entirely electronic self-service mechanism for patients to request their complete Electronic Health Information (EHI). This functionality must allow patients to initiate and track their EHI export requests without resorting to manual processes such as phone calls, paper forms, or faxes.

**Rationale & Specifics:**
Patients have a right to access their EHI without undue burden. Current manual request processes are often slow, opaque, and frustrating for patients, creating significant barriers to accessing their own health information. A self-service electronic mechanism is a fundamental step towards empowering patients.

1.  **Electronic Request Initiation:** Patients must be able to submit a request for their full EHI through a secure electronic interface, such as a patient portal or a dedicated online form provided by the certified Health IT.
2.  **Elimination of Manual Intermediaries for Request Submission:** The system must not require the patient to print forms, send faxes, or make phone calls to *initiate* the EHI request. While backend fulfillment might involve some staff review, the patient's initial interaction and submission must be fully electronic.
3.  **Status Tracking and Notification:** The system should provide patients with a way to electronically track the status of their EHI export request and receive electronic notifications (e.g., email, portal message) upon completion or if further information is needed.
4.  **Electronic Fulfillment:** While the format of the EHI export itself is covered by other requirements (e.g., computability, completeness), the *delivery* of the export, once ready, should also be facilitated electronically where feasible and secure (e.g., secure download link, direct deposit to a patient-authorized application if an API is used).
5.  **Discoverability:** This self-service EHI request functionality must be prominently displayed and easily accessible within patient-facing interfaces of the certified Health IT.
6.  **Cost-Free to Patient:** Initiating and receiving EHI through this mandated self-service electronic mechanism must be free of charge to the patient.
7.  **Certification:** Certification testing must verify the presence, functionality, and discoverability of this self-service electronic EHI request capability, including the ability to submit a request, track status, and receive notifications entirely through electronic means.


### Mandate Patient-Initiated Secure Messaging via Standardized APIs | `req_patient_app_messaging_argonaut`
**Recommendation:**
Certified Health IT must support secure, patient-initiated messaging to healthcare providers from third-party applications, utilizing standardized APIs. Signal intent to adopt community-developed standards such as the Argonaut Project's Provider/Patient Secure Messaging API Implementation Guide (https://hackmd.io/@argonaut/H1dQ95xG3) via SVAP.

**Rationale & Specifics:**
To improve patient engagement and streamline communication within the healthcare system:
1.  **Patient Convenience and Engagement:** Enables patients to communicate with their care teams directly from applications they are already using to manage their health, improving navigation of the healthcare system, reducing communication friction, and fostering continuous engagement.
2.  **Contextual Communication:** Facilitates more effective communication by allowing patients to, for example, select specific data within an app (e.g., a portion of a clinical note they are viewing, a concerning lab result, a self-tracked observation) and easily include it as context within their secure message to the provider.
3.  **Standardized Approach:** Adherence to community-developed standards like the Argonaut messaging API (which leverages FHIR Communication) ensures interoperability and provides a consistent, predictable interface for app developers. This includes:
    *   Discoverable messaging endpoints.
    *   Standardized FHIR resources for message construction and exchange.
    *   Alignment with existing security and authorization frameworks like SMART App Launch.
    *   Clear expectations for message payloads, including text and potentially references or attachments.
4.  **EHR Workflow Integration:** Certified Health IT must be capable of integrating these incoming patient-initiated messages into existing provider communication workflows (e.g., EHR in-basket, designated messaging queues) to ensure they are reviewed and responded to in a timely and appropriate manner by the care team.
5.  **Use Case Example:** A patient is reviewing a recently released clinical note in their preferred patient-facing application. They identify a section containing medical jargon they don't understand or have a question about their medication dosage. The application, using the standardized API, allows them to highlight this specific text snippet and send a secure message, with the selected text automatically included as context, directly to their provider's EHR system.
6.  **Certification:** ONC certification testing should verify the EHR's capability to:
    *   Expose the necessary API endpoints for receiving patient-initiated messages.
    *   Correctly process and route messages according to the Argonaut (or similar ONC-specified) messaging IG.
    *   Handle contextual data included with messages.
    *   Ensure messages are appropriately presented to providers within their standard workflows.
    *   Confirm adherence to security and authorization requirements.

### Mandate Electronic Pathways for Patient Record Amendment Requests | `req_patient_amendment_pathways`

**Recommendation:**
Certified Health IT must provide clear, secure, and entirely electronic pathways for individuals to request amendments to their medical records, track the status of these requests, and receive responses, thereby making HIPAA-granted rights more accessible and usable. These pathways must be available through patient-facing interfaces (e.g., patient portals) and programmatically via APIs for patient-authorized applications.

**Rationale & Specifics:**
Making the HIPAA right to request record amendments electronically functional is crucial for data accuracy, patient trust, and engagement. Current manual processes are often burdensome. This could be combined with the approach for "Mandate Patient-Initiated Secure Messaging via Standardized APIs". 

1.  **Electronic Submission:** Patients must be able to identify information they believe is incorrect and electronically submit an amendment request with their reasoning, via patient portals and APIs for authorized apps.
2.  **Status Tracking & Response:** The system must provide electronic confirmation of receipt, allow patients to track the request status, and deliver the provider's electronic response (acceptance or denial).
3.  **Statement of Disagreement:** If a request is denied, the system must support the patient's right to electronically submit a statement of disagreement to be included with their record.
4.  **Provider Workflow Support:** Certified Health IT must include tools for providers to efficiently receive, review, manage, and respond to these electronic amendment requests.
5.  **Certification:** Testing should verify the functionality for electronic submission (portal and API), status tracking, electronic response delivery, and the system's support for providers managing these requests, including statements of disagreement.

This ensures patients can exercise their amendment rights efficiently through modern electronic means, contributing to better data quality and patient empowerment.

## Advance EHR Capabilities for Modern, Dynamic, and Comprehensive Interoperability

### Mandate FHIR Subscriptions for Event-Driven Workflows | `req_mandate_fhir_subscriptions`
**Recommendation:**
Certified Health IT must implement support for a defined starter set of FHIR Subscription topics to enable event-driven data synchronization and application workflows, reducing inefficient polling and supporting timely notifications.
**Rationale & Specifics:**
Real-time awareness of data changes is crucial for many clinical and patient-facing applications.
1.  **Core Subscription Topics:** At a minimum, support should include topics such as "Patient data updates" (for changes to key USCDI resources associated with a patient) and "Encounter data update" (for new or updated encounters). ONC should align these with industry efforts like the Argonaut Project's US Core Patient Data feed design.
2.  **Technical Standards:** Implementations should align with stable versions of FHIR Subscription specifications (e.g., FHIR R4 Subscriptions Backport IG).
3.  **Use Cases:** This enables use cases like patient apps receiving updates without constant polling, public health systems being notified of reportable encounters, and clinical systems triggering workflows based on new data availability.
4.  **Certification:** Testing should verify the ability to create subscriptions to defined topics and receive notifications when corresponding events occur.

### Mandate CDS Hooks for Seamless Clinical Decision Support Integration | `req_mandate_cds_hooks`
**Recommendation:**
Certified Health IT must support the CDS Hooks specification as a standardized method for integrating external clinical decision support (CDS) services directly into EHR workflows.
**Rationale & Specifics:**
Integrating evidence-based guidance and advanced analytics at the point of care requires a standard interface.
1.  **Core Hooks and Functionality:** Mandate support for key CDS Hooks (e.g., version 2.0, including the `patient-view` hook for context-aware information display and potentially `order-sign` or `order-select` for interventional CDS).
2.  **Data Prefetch and Authorization:** Support must include prefetch of relevant US Core data elements and use of `fhirAuthorization` access tokens to allow CDS services to securely access necessary patient data via FHIR APIs.
3.  **Alternative to InfoButton:** Position CDS Hooks as a modern, more interactive alternative to older context-passing mechanisms like InfoButton.
4.  **Certification:** Testing should validate the EHR's ability to invoke CDS services at specified hook points, pass context correctly, handle returned CDS cards (information, suggestions, app links), and manage authorization for data access.

### Ensure Programmatic and Automated Access to Medical Images | `req_programmatic_image_access`
**Recommendation:**
Certified Health IT must provide programmatic and automatable API access to diagnostic quality medical images, using consistent, standardized authorization flows and ensuring images are shareable and usable by authorized applications.
**Rationale & Specifics:**
Medical images are critical clinical data, yet their accessibility via APIs has lagged. EHRs could certify to these capabilities by integrating with an underlying Picture Archiving and Communication System (PACS) as long as all the configuration was in place to make the user and app experience seamless; EHRs are not required to directly store and manage detailed study metadata and raw imaging data, as long as they allow seamless access alongside other clinical data.
1.  **Standardized API Access:** Access should be facilitated via standardized APIs (e.g., DICOMweb for image retrieval) referenced from FHIR resources (e.g., an ImagingStudy resource containing DICOMweb endpoints).
2.  **Consistent Authorization:** Image access must use the same SMART on FHIR authorization mechanisms as used for other clinical data, ensuring a consistent security model for applications.
3.  **Avoidance of Non-Programmatic "Links":** The requirement is for truly programmatic access, not just "imaging links" within a portal that may be context-bound, require manual user interaction to dereference, or are not shareable with third-party applications.
4.  **Industry Alignment:** Encourage alignment with industry efforts such as the Argonaut Project's Imaging Access specifications.
5.  **Certification:** Testing should verify that an authorized application can discover available imaging studies for a patient via FHIR and then programmatically retrieve diagnostic quality images using the specified APIs and authorization flow.

### Ensure Patient Access to Remote, High-Assurance Portal Account Provisioning | `req_coordinated_remote_provisioning_access`

**Recommendation:**
To ensure patients can establish patient portal accounts securely and conveniently online:
1.  **ONC/CEHRT Requirement:** Certified Health IT (CEHRT) offering patient portal capabilities must include the functionality to enable at least one pathway for new patient account provisioning that is fully remote and electronic, and relies on a high-assurance identity proofing process comparable to **NIST 800-63 Identity Assurance Level 2 (IAL2)**.
2.  **CMS/Provider Requirement:** Healthcare provider organizations participating in Medicare and/or Medicaid programs must configure and offer such a compliant remote, high-assurance patient portal account provisioning option to their patients, leveraging the capabilities of their CEHRT. This could be established, for example, as a Condition of Participation or through other relevant program requirements.

**Rationale & Specifics:**
The fundamental goal is to make secure, online patient portal account creation a standard, accessible option for all patients. This requires a two-pronged approach: CEHRT must provide the necessary robust technical capabilities, and healthcare providers must make these capabilities available to patients as part of their participation in federal healthcare programs.

1.  **CEHRT Capability as the Technical Foundation:** ONC's certification ensures that the technology itself possesses the robust, implementable functionality for remote, high-assurance provisioning. This includes:
    *   Supporting a fully remote, electronic process.
    *   Meeting high-assurance identity proofing standards (e.g., IAL2-comparable).
    *   Flexibility for CEHRT developers in how this is achieved (e.g., integration with IAL2 IdPs, or direct implementation of a compliant workflow).
    *   Certification would verify the functionality, security, integrity, and practical usability/configurability by provider organizations.
2.  **Provider Obligation for Patient Access:** CMS's role is to ensure that providers make this ONC-certified capability operational for patients. By establishing this as an expectation for program participation:
    *   It makes remote, high-assurance account creation a standard offering, critical for equitable patient access and convenience.
    *   It leverages the security enhancements built into CEHRT, ensuring accounts are established on a strong identity basis.
    *   It drives adoption of modern, patient-centric digital services.
3.  **Enhanced Security and Trust:** This coordinated approach ensures that remotely provisioned accounts are based on a strong, verifiable identity proofing process, establishing a consistent, high bar for trust.
4.  **Patient Convenience:** Eliminates mandatory in-person steps or reliance on lower-assurance methods, aligning with modern digital service expectations.

## TEFCA and Health Information Networks Must Prioritize Individual Rights, Security, and Access

### Empower Individuals with Transparency and Control Over TEFCA Data Sharing | `req_tefca_individual_transparency_control`

**Recommendation:**
ONC must ensure, through proactive engagement with the RCE and evolution of the TEFCA Common Agreement, Qualified Health Information Network Technical Framework (QTF), and associated Standard Operating Procedures (SOPs), that individuals have visibility into and control over how their data is exchanged under TEFCA. Individuals must have robust mechanisms to review audit logs and manage data sharing, accessible through TEFCA-designated services that ensure their choices are honored by all TEFCA QHINs and Participants.

**Rationale & Specifics:**
Building public trust in TEFCA requires empowering individuals with direct oversight and control. The TEFCA framework, its participating QHINs, and connected Health IT systems must support the following:

1.  **TEFCA-level Patient Sharing Controls and Notifications via Discoverable Interfaces:**
    *   Individuals must be able to manage their TEFCA data sharing choices and notification settings through at least one clearly designated and easily accessible central point of interaction provided at the TEFCA level.
    *   QHINs may also offer their own interfaces for managing these choices and settings, provided they are compatible with and reflect the authoritative settings managed via the TEFCA-level mechanism.
    *   These sharing choices and notification settings, once set through a TEFCA-recognized interface, must be propagated and honored by all TEFCA QHINs and their Participants. Supported controls must include:
        *   **"Freeze Access" Capability:** A mechanism for individuals to (reversibly) block all TEFCA-facilitated data disclosures for their data. This freeze would be registered through a TEFCA-level mechanism and honored by all QHINs and their Participants attempting to retrieve data for that individual via TEFCA.
        *   **"Ask Me First" for Query Approval/Disclosure:** An option for individuals to require their explicit, real-time (or near real-time) consent via a notification (e.g., from their chosen QHIN or a TEFCA-designated function) before their data is released in response to specific TEFCA queries, especially for non-treatment purposes or other sensitive exchanges as defined by the individual or TEFCA policy. This represents a specific sharing choice configuration.
        *   **Network Access Notifications:** An option for individuals to receive notifications for TEFCA-based queries or disclosures of their health records. (These could also serve as the trigger for "Ask Me First" approvals.)

2.  **Patient-Accessible TEFCA Audit Logs:**
    *   The RCE, under TEFCA, or a TEFCA-designated entity, must provide or facilitate a standardized, secure, cost-free, human-readable, and API-accessible method for individuals to obtain a comprehensive audit log of TEFCA-related activity, potentially accessible via the same interfaces used for managing sharing choices.
    *   This log must reflect queries for their data and data disclosures across QHINs and their Participants operating under TEFCA, incorporating relevant audit information from QHINs and from participating data holders (e.g., EHR systems) regarding TEFCA-facilitated exchanges.
    *   The architecture for providing this consolidated view must prioritize individual privacy and data minimization. This can be achieved by TEFCA-designated entities querying distributed audit logs maintained by participants (QHINs and data holders) in real-time or near real-time upon an authenticated patient's request, assembling a temporary, consolidated view for the individual, rather than creating a permanent, centralized repository of all log details.

3.  **Certified Health IT Support for Honoring TEFCA Patient Sharing Choices and Enabling TEFCA Audit Log Access:**
    *   **Recommendation:** The ONC Health IT Certification Program must include criteria requiring certified Health IT (used by TEFCA Participants/Subparticipants) to be capable of:
        *   Receiving, interpreting, and honoring patient sharing choices (e.g., freeze, settings for "Ask Me First") that are communicated to them through TEFCA-designated mechanisms.
        *   Securely responding to authorized audit log queries, initiated on behalf of a patient, by providing relevant local audit event data concerning TEFCA-facilitated exchanges.
    *   **Rationale:** For TEFCA patient controls to be effective end-to-end, and for audit trails to be comprehensive and trustworthy for the patient, EHR systems at the point of data holding must act upon patient sharing choices communicated via TEFCA-designated mechanisms and enable their local TEFCA-related transaction data to be included in the patient's consolidated audit view of TEFCA-facilitated exchanges.
    *   **Specifics for EHR Certification:**
        *   **Consumption and Honoring of TEFCA Patient Sharing Choices:** Certified Health IT must be capable of subscribing to, receiving standardized signals or data from, and acting upon instructions from TEFCA-designated mechanisms responsible for conveying patient sharing choices. This includes appropriately withholding data or awaiting further network instruction based on an individual’s active sharing choices.
        *   **Responding to Authorized TEFCA Audit Log Queries:** Certified Health IT must implement a standardized, secure API endpoint to receive and process authorized audit log queries. These queries, authenticated as being on behalf of a specific patient, would originate from TEFCA-designated services responsible for consolidating patient audit views, or potentially from other TEFCA-authorized client applications acting for the patient. Upon such a query, the EHR must return relevant local audit event data regarding TEFCA-facilitated exchanges for that patient.


### Establish a "TEFCA Patient-Developer Credential" for Comprehensive, Direct Data Access | `req_tefca_patient_developer_credential`

**Recommendation:**
ONC, in coordination with the RCE, must define, oversee, and mandate support for a "TEFCA Patient-Developer Credential." This program will provide individuals with a unique, identity-bound digital credential. This credential will enable applications they develop and directly control to securely access *only their own data* via all standard TEFCA QHIN APIs, *and* to facilitate simplified registration and access directly with participant EHR FHIR API endpoints, free of network or prohibitive registration access charges for this specific personal use.

**Rationale & Specifics:**
To fully empower individuals, foster grassroots innovation, and ensure patients can directly participate in managing their health information, a dedicated and comprehensive pathway is needed. This pathway allows individuals, acting as their own developers, to bypass commercial IAS provider intermediaries for TEFCA network access *and* simplifies direct connection to EHRs for their personal data. It positions the patient as a direct, albeit limited-scope, participant across the ecosystem for their own information.

1.  **Issuance and Nature of the Patient-Developer Credential:**
    *   **Identity Verification:** The credential must be issued to an individual only after high-assurance identity verification through a federally recognized or TEFCA-approved Identity Provider (IdP) (as per `req_tefca_trustworthy_ias_architecture`).
    *   **Cryptographic Binding & Purpose Designation:** The issued credential (e.g., a specific type of client certificate or token) must be cryptographically and uniquely bound to the verified individual’s identity and explicitly designated for "self-access/patient-developer" use only.
    *   **Cost-Free to the Individual:** Obtaining this Patient-Developer Credential must be free of charge.
2.  **TEFCA Network Access using the Credential:**
    *   **Full TEFCA QHIN API Access (for Own Data):** When presented by an application, this credential must grant access to the full suite of TEFCA QHIN APIs (e.g., query, retrieve) that a commercial IAS provider or other network participant would use.
    *   **Strictly Scoped to Own Data (Network Level):** Access granted via this credential at the QHIN level must be technically restricted to only the data pertaining to the credentialed individual.
    *   **Mandatory QHIN Recognition & Fee Exemption:** All TEFCA QHINs must recognize valid Patient-Developer Credentials and not charge individuals or their apps network access fees for this personal use.
3.  **Facilitating Direct EHR FHIR API Access for Patient-Developers:**
    *   **EHR Recognition of Patient-Developer Context:** The TEFCA framework (or related ONC certification criteria for TEFCA participants) should ensure that EHR systems of TEFCA participants are capable of recognizing a context or assertion associated with the Patient-Developer Credential (or a derivative token) to streamline app registration for direct EHR FHIR API access for that specific patient's data.
    *   **Simplified EHR Dynamic Registration Pathway:** For applications presenting evidence of being operated by a patient for their own data (potentially signaled via the Patient-Developer Credential context), EHRs supporting dynamic registration must offer a simplified pathway. This could involve accepting specific assertions or self-attestations for app identity in lieu of more complex commercial registration requirements, enabling individual/hobbyist app development for personal data access directly from an EHR's FHIR API is achieved through this mechanism).
    *   **No Prohibitive EHR Registration Fees for Personal Use:** This simplified pathway for patient-developers accessing their own data directly from an EHR should not involve prohibitive registration or certification fees from the EHR vendor.
4.  **Clear Distinction from Commercial Pathways:** This entire Patient-Developer Credential pathway is explicitly for individual, non-commercial use by patients developing tools for their own data. It does not replace or alter requirements for commercial IAS providers or other applications operating at scale or for multiple users.

### Mandate a Trustworthy and Accountable Architecture for All TEFCA Individual Access Services (IAS) | `req_tefca_trustworthy_ias_architecture`

**Recommendation:**
The TEFCA Common Agreement and QTF must mandate a high-assurance security and authorization architecture for all Individual Access Services (whether commercial IAS providers or services facilitating the Patient-Developer Credential). This architecture must ensure that applications accessing data on behalf of an individual do so based on explicit, verifiable individual consent, mediated by a narrow set of trusted identity and authorization service providers, with verifiable binding between identity and authorization.

**Rationale & Specifics:**
Protecting patient data shared via any individual access pathway within TEFCA requires a robust, standardized architecture that clearly separates roles and ensures accountability. This model prevents applications from self-attesting permissions and helps limit the potential impact of a compromised application.

#### 1. **Federated Trust with Approved Identity Providers (IdPs) for All IAS:** 
All Individual Access Service pathways, including those used by commercial providers and those facilitating the Patient-Developer Credential, must rely on a defined, limited set of federally recognized or TEFCA-approved, high-assurance Identity Providers (IdPs) for initial individual identity verification. This establishes a "narrow waist" for trusted identity proofing.

#### 2. **Explicit, Verifiable Individual Authorization Mediated by Trusted Services:** 
The act of an individual authorizing an application to access their data must be a distinct, explicit step mediated by a trusted authorization service that leverages the verified identity from an approved IdP. The resulting authorization artifact (e.g., a SMART on FHIR authorization code exchanged for an access token, a FHIR Consent resource, or other digitally signed permission) must be cryptographically bound to the verified individual identity and the specific application being authorized, ensuring non-repudiation and that permissions are granted by the legitimate data subject to a specific recipient for defined purposes.

**Critical Architecture Constraints:**
- **Applications CANNOT create identity credentials or authorization credentials** - they may only consume credentials issued by trusted services
- **Narrow waist enforcement**: Only the limited set of approved IdPs and authorization services may issue their respective credential types
- **Verifiability**: Relying parties (QHINs, EHRs) must be able to cryptographically verify that both identity and authorization credentials were issued by approved trusted services
- **Security properties of binding must ensure**:
  - Non-transferability: Authorization cannot be used by a different identity
  - Non-forgeability: Applications cannot modify or create credentials
  - Accountability: All credential issuance is auditable to specific trusted entities

#### 3. **Scoped Access Based on Authorization:** 
Applications, upon presenting a valid, identity-bound authorization credential, are granted access only to the data permitted by that specific authorization. This principle, combined with fine-grained consent capabilities, helps limit the "blast radius" of any single compromised application or token.

#### 4. **Support for Diverse IAS Provider Models, Including Non-Reciprocal Patient-Controlled Storage:** 
- The TEFCA framework must explicitly acknowledge and support IAS providers that function solely as agents for patient-directed data retrieval and local/personal storage (e.g., on a patient's device or personal cloud).
- Such "patient-controlled storage" IAS providers, when authorized by an individual to retrieve data on their behalf, should not be mandated to become queryable TEFCA network nodes themselves or to make the retrieved data available for reciprocal sharing via TEFCA. Their role is to facilitate the patient's right to access and personally hold their data, respecting a patient's choice to keep that consolidated data private and outside of further network exchange, unless explicitly re-authorized by the patient for a different purpose.

#### 5. **Facilitation of Individual Data Retrieval within this Architecture:** 
Within this trustworthy and flexible framework, QHINs must provide or ensure individuals have access to functionalities enabling them to:
- Discover which TEFCA participants are likely to hold their records (Record Locator Service - RLS), via user-friendly interfaces (website and API).
- Initiate cost-free queries for their *own* USCDI data (and eventually their full Electronic Health Information) from all participating data holders via TEFCA.

### Establish Public Foundational Infrastructure for Nationwide Discovery | `req_public_discovery_infrastructure`
**Recommendation:** ONC should lead or actively support the establishment, maintenance, and governance of publicly available, free, and machine-readable national directory services crucial for enabling nationwide health information exchange and interoperability.
**Rationale & Specifics:**
Effective, scalable interoperability across a diverse national landscape requires common, trusted, and easily accessible infrastructure for discovering participants, their capabilities, and their electronic endpoints. This reduces friction for all stakeholders, from application developers to HINs and individual patients seeking to connect.

*   **Comprehensive National Provider & Health IT Endpoint Directory:**
    *   **Content:** This directory must include, at a minimum: healthcare providers (individual and organizational); organizational affiliations; certified Health IT product information in use; publicly accessible electronic service endpoint information (e.g., FHIR API base URLs for patient access, organization-level endpoints, TEFCA QHIN participation details and IAS capabilities); and supported standards and implementation guides (e.g., FHIR versions, US Core versions, other relevant IGs, supported TEFCA Exchange Purposes).
    *   **Accessibility:** The directory must be publicly available, queryable via API, and downloadable in bulk, free of charge for informational and connection purposes.
    *   **Data Quality & Maintenance:** Clear processes for data submission, validation, and regular updates must be established to ensure accuracy and timeliness, potentially leveraging existing data sources (e.g., NPPES) but enhancing them with necessary interoperability-specific details.
    *   **Governance:** A clear governance model for the directory is essential, ensuring neutrality, sustainability, and responsiveness to ecosystem needs.

# Response Letter

## B. Patients and Caregivers

### PC-2. Do you have easy access to your own and all your loved ones' health information in one location (for example, in a single patient portal or another software system)?

Easy access to complete health information in one location is currently the exception, not the rule, for most patients and caregivers. Obstacles include:
1.  **Limited Scope of Current APIs:** Often restricted to USCDI, excluding much of the complete EHI.
2.  **Lack of API Access to Full EHI:** EHI exports are often manual and not computable.
3.  **Difficult Image Access:** Images are rarely available via patient-facing APIs.
4.  **Fragmented Identity and Portal Logins:** Managing numerous accounts is a burden. Our recommendation for [Ensure Patient Access to Remote, High-Assurance Portal Account Provisioning](#req_coordinated_remote_provisioning_access) and broader adoption of federated identity could alleviate this.


Achieving comprehensive access is fundamental and is directly supported by several of our guiding principles and recommendations:


#### Guiding Principles:
*   [Patient Primacy and Empowerment](#principle_patient_primacy): Individuals must have easy access to their complete health data.
*   [Comprehensive and Performant Data Access](#principle_comprehensive_performant_data_access): Access must be to complete Electronic Health Information (EHI), not just a limited subset.

#### Key Recommendations for enabling comprehensive access:
*   [Mandate API-Accessible, Computable Full EHI Export, Aligning with Industry Specifications](#req_api_ehi_export_argonaut): This is crucial for patients to obtain *all* their EHI via API, including notes and images, enabling truly comprehensive personal health records.
*   [Mandate Self-Service Electronic EHI Request Functionality in Certified Health IT](#req_self_service_ehi_request): Provides a baseline electronic, self-service method for patients to request their full EHI.
*   [Ensure Programmatic and Automated Access to Medical Images](#req_programmatic_image_access): Addresses the common unavailability of diagnostic images via patient-facing APIs.
*   [Steward USCDI Development for Pragmatic Interoperability](#req_steward_uscdi_development): Ensures an expanding common data foundation of standardized elements.
*   [Establish a "TEFCA Patient-Developer Credential" for Comprehensive, Direct Data Access](#req_tefca_patient_developer_credential): Empowers individuals to use tools to aggregate their own data from various sources.


### PC-5. What can CMS and its partners do to encourage patient and caregiver interest in these digital health products?

CMS's primary role should be to ensure foundational data access and protect patient rights, rather than reviewing or approving most digital health products, especially those individuals choose or develop for their own use. Our approach is guided by:

#### Guiding Principles:
*   [Patient Primacy and Empowerment](#principle_patient_primacy): Patients should choose tools that meet their needs.
*   [Open Innovation and Individual Participation](#principle_open_innovation_individual_participation): Support innovation from all sources, including AI-enabled individual development.
*   [Fostering Competition Through Open and Fair Market Foundations](#principle_market_competition_foundations): Focus on enabling access, not picking winners.

#### Recommendations to encourage interest and adoption by ensuring robust and trustworthy data access and functionality:
*   [Mandate API-Accessible, Computable Full EHI Export, Aligning with Industry Specifications](#req_api_ehi_export_argonaut)
*   [Keep Single-Patient API Certification Current with SMART App Launch & Backend Services Specifications](#req_update_smart_app_launch_cert)
*   [Ensure Programmatic and Automated Access to Medical Images](#req_programmatic_image_access)
*   [Establish a "TEFCA Patient-Developer Credential" for Comprehensive, Direct Data Access](#req_tefca_patient_developer_credential): This enables individual innovation by lowering access barriers.
*   [Empower Individuals with Transparency and Control Over TEFCA Data Sharing](#req_tefca_individual_transparency_control): Builds trust necessary for engagement.
*   [Ensure Patient Access to Remote, High-Assurance Portal Account Provisioning](#req_coordinated_remote_provisioning_access): Simplifies foundational access.
*   [Mandate Electronic Pathways for Patient Record Amendment Requests](#req_patient_amendment_pathways): Allowing patients to easily request corrections to their data via portals and apps makes digital tools more empowering and essential.
*   [Mandate Patient-Initiated Secure Messaging via Standardized APIs](#req_patient_app_messaging_argonaut): Enabling patients to communicate with providers directly from their chosen apps, potentially with relevant data context, greatly increases the utility and stickiness of digital health products.

CMS should avoid becoming an app "approver" for general health tools, which could stifle innovation. Focus on open, secure, comprehensive data pipes and core functionalities, allowing the market and patients to determine value.
### PC-8. In your experience, what health data is readily available and valuable to patients or their caregivers or both?

While basic structured data (USCDI) is increasingly available, much of the richest data remains difficult to access programmatically.

#### Guiding Principle:
*   [Comprehensive and Performant Data Access](#principle_comprehensive_performant_data_access)

#### Readily Available & Valuable (Increasingly):
*   USCDI data elements via FHIR APIs.
*   Medicare claims data via Blue Button 2.0.

#### Valuable but Hard to Access (PC-8a):
Making the following valuable data types more accessible programmatically is crucial. Many of these challenges can be significantly addressed by two overarching recommendations: ensuring comprehensive data availability via [Mandate API-Accessible, Computable Full EHI Export, Aligning with Industry Specifications](#req_api_ehi_export_argonaut) and by expanding standardized data elements through [Steward USCDI Development for Pragmatic Interoperability](#req_steward_uscdi_development). Specific data types include:

*   **Diagnostic quality medical images:** Critical but rarely API-accessible (though imaging reports may sometimes be available, the images themselves are harder to obtain programmatically). This is primarily solved by [Ensure Programmatic and Automated Access to Medical Images](#req_programmatic_image_access), and also supported by the EHI export.
*   **Full flowsheet data:** Comprehensive view of patient status and interventions. Addressed by EHI export and potentially USCDI expansion.
*   **Detailed/granular lab results (e.g., cancer, microbiology):** Beyond simple numerics, including narratives, structured reports, and interpretations.
*   **Schedules/appointment information:** Programmatic access is rare.
*   **Patient-Reported Outcomes (PROs).** Addressed by EHI export and USCDI expansion.
*   **Price information (patient-specific cost estimates).** Addressing this likely takes new functional requirements on providers and certified EHR technology.

### PC-10. How is the Trusted Exchange Framework and Common AgreementTM (TEFCATM) currently helping to advance patient access to health information in the real world?

TEFCA's impact on *individual patient-initiated access* is still nascent. Its potential requires significant evolution towards patient empowerment.

#### Guiding Principles for TEFCA Evolution:
*   [Patient Primacy and Empowerment](#principle_patient_primacy)
*   [Transparent and Accountable Networks with Federal Oversight](#principle_tefca_oversight_accountability)
*   [Open Innovation and Individual Participation](#principle_open_innovation_individual_participation)

#### Changes Suggested for TEFCA (PC-10b):
Our recommendations aim to make TEFCA truly serve individuals:
*   [Empower Individuals with Transparency and Control Over TEFCA Data Sharing](#req_tefca_individual_transparency_control): Provide API-accessible audit logs and TEFCA-level patient controls (opt-out, "ask me first," freeze access).
*   [Establish a "TEFCA Patient-Developer Credential" for Comprehensive, Direct Data Access](#req_tefca_patient_developer_credential): Offer a cost-free pathway for individuals to use/develop tools for their own data via QHIN APIs.
*   [Mandate a Trustworthy and Accountable Architecture for All TEFCA Individual Access Services (IAS)](#req_tefca_trustworthy_ias_architecture): Ensure all IAS rely on high-assurance identity verification and explicit, verifiable individual consent, supporting patient-controlled storage models.
*   **EHI as a TEFCA Data Source:** Evolve TEFCA to support exchange of full EHI, as available through systems compliant with [Mandate API-Accessible, Computable Full EHI Export, Aligning with Industry Specifications](#req_api_ehi_export_argonaut).

#### Impactful Use Cases if Implemented Through a Reformed TEFCA (PC-10c):
Patient-initiated aggregation of complete health records; secure sharing with new specialists; individual research with consented data.

#### Adequate Alternatives Outside TEFCA (PC-10g):
Direct patient access via certified EHR FHIR APIs remains crucial, especially if enhanced by our EHI export recommendations. TEFCA's unique value for querying unknown data holders will only be realized if it fully incorporates patient-centric reforms. Otherwise, direct-to-EHR API access will remain the preferred, more trustworthy pathway for patients.

### PC-14. Regarding digital identity credentials (for example, CLEAR, Login.gov, ID.me, other NIST 800-63-3 IAL2/AAL2 credentialing service providers (CSPs)):
**b. What could be the benefits to patients/caregivers if digital identity credentials were more widely used?**
**d. How would encouraging the use of CSPs improve access to health information?**
**e. What role should CMS/payers, providers, and app developers have in driving adoption?**

Wider use of high-assurance digital identity is key to simplifying and securing patient access. However, identity credentials alone are insufficient without robust, bound authorization credentials that specify what data an identified user is permitted to access and for what purpose. We expand on this in our recommendation for a [Trustworthy and Accountable Architecture for All TEFCA Individual Access Services](#req_tefca_trustworthy_ias_architecture).

#### Guiding Principle:
*   [Patient Primacy and Empowerment](#principle_patient_primacy)

#### Benefits (PC-14b) and Improved Access (PC-14d):
Reduced login fatigue, enhanced security, and critically, **simplified and secure account provisioning**.
*   This is directly supported by [Ensure Patient Access to Remote, High-Assurance Portal Account Provisioning](#req_coordinated_remote_provisioning_access), which would leverage IAL2 CSPs for secure online patient portal account creation.
*   A strong, federated identity also underpins recommendations like [Establish a "TEFCA Patient-Developer Credential" for Comprehensive, Direct Data Access](#req_tefca_patient_developer_credential) and [Mandate a Trustworthy and Accountable Architecture for All TEFCA Individual Access Services (IAS)](#req_tefca_trustworthy_ias_architecture).

#### Role in Driving Adoption (PC-14e):
*   **CMS/ONC:** Mandate CEHRT support for IAL2 CSPs for portal account creation/login, as per [Ensure Patient Access to Remote, High-Assurance Portal Account Provisioning](#req_coordinated_remote_provisioning_access), and encourage for CMS/TEFCA services.
*   **Providers & Payers:** Offer IAL2 CSP-based login options.
*   **App Developers:** Integrate with IAL2 CSPs.
Focusing on *account provisioning* using trusted digital identities is crucial for adoption.

---

## C. Providers

### PR-3. How important is it for healthcare delivery and interoperability in urban and rural areas that all data in an EHR system be accessible for exchange, regardless of storage format (for example, scanned documents, faxed records, lab results, free text notes, structured data fields)? Please address all of the following:
**a. Current challenges in accessing different data formats.**
**b. Impact on patient care quality.**
**c. Technical barriers to full data accessibility.**

It is critically important for *all* data in an EHR to be accessible for exchange to ensure patient safety and effective care.

#### Guiding Principle:
*   [Comprehensive and Performant Data Access](#principle_comprehensive_performant_data_access)

#### Importance and Impact (PR-3b):
Missing data negatively impacts patient safety, care coordination, diagnostic accuracy, and efficiency.

#### Key Recommendations for Addressing Challenges (PR-3a, PR-3c):
*   [Mandate API-Accessible, Computable Full EHI Export, Aligning with Industry Specifications](#req_api_ehi_export_argonaut): This is the core solution, ensuring the EHI export includes *all* EHI (structured, notes, scans, etc.) via API with documentation for computability, overcoming current format-based access barriers.
*   Technical barriers are less about format and more about lack of certified capabilities to package and expose all data via APIs, which this recommendation addresses.

---

## D. Payers

### PA-1. What policy or technical limitations do you see in TEFCA? What changes would you suggest to address those limitations? To what degree do you expect these limitations to hinder participation in TEFCA?

Payers will find TEFCA more valuable if it evolves to prioritize individual control, transparency, and broader innovation.

#### Guiding Principles for TEFCA Evolution:
*   [Transparent and Accountable Networks with Federal Oversight](#principle_tefca_oversight_accountability)
*   [Open Innovation and Individual Participation](#principle_open_innovation_individual_participation)
*   [Patient Primacy and Empowerment](#principle_patient_primacy)

#### Policy/Technical Limitations and Suggested Changes (Consistent with PC-10):
*   **Insufficient Individual Control/Transparency:** Addressed by [Empower Individuals with Transparency and Control Over TEFCA Data Sharing](#req_tefca_individual_transparency_control) to build member trust.
*   **Barriers to Innovation for Member-Facing Tools:** Lowered by pathways like [Establish a "TEFCA Patient-Developer Credential" for Comprehensive, Direct Data Access](#req_tefca_patient_developer_credential).
*   **Need for Robust Identity/Authorization:** Supported by [Mandate a Trustworthy and Accountable Architecture for All TEFCA Individual Access Services (IAS)](#req_tefca_trustworthy_ias_architecture).
*   **Limited Data Scope:** Expand beyond USCDI by enabling exchange of full EHI from systems compliant with [Mandate API-Accessible, Computable Full EHI Export, Aligning with Industry Specifications](#req_api_ehi_export_argonaut).
*   **Lack of Public Foundational Infrastructure:** Addressed by [Establish Public Foundational Infrastructure for Nationwide Discovery](#req_public_discovery_infrastructure).

These limitations hinder payer participation; a member-trusted TEFCA is more valuable to payers.

### PA-4. What would be the value to payers of a nationwide provider directory that included FHIR end points and used digital identity credentials?

A nationwide provider directory with FHIR endpoints that included provider credentialing informtaion (e.g. signed digital assertions about the states in which a provider is licensed to practice) would be immensely valuable to payers.

#### Guiding Principle:
*   [Fostering Competition Through Open and Fair Market Foundations](#principle_market_competition_foundations)

#### Technology Policy Recommendation:
*   [Establish Public Foundational Infrastructure for Nationwide Discovery](#req_public_discovery_infrastructure): This directly calls for such a free, publicly accessible directory.

#### Value to Payers:
Streamlined provider data management, facilitated interoperability for API-based workflows (prior auth, quality data), support for VBC, improved member experience (knowing provider digital capabilities), and enhanced network management.

---

## E. Technology Vendors, Data Providers, and Networks

### TD-1. What short term (in the next 2 years) and longer-term steps can CMS take to stimulate developer interest in building digital health products for Medicare beneficiaries and caregivers?

Developer interest hinges on an open, accessible, and reliable data ecosystem.

#### Guiding Principles:
*   [Open Innovation and Individual Participation](#principle_open_innovation_individual_participation)
*   [Fostering Competition Through Open and Fair Market Foundations](#principle_market_competition_foundations)
*   [Comprehensive and Performant Data Access](#principle_comprehensive_performant_data_access)

#### Short-Term Steps (Next 2 Years):
*   Aggressively advance [Mandate API-Accessible, Computable Full EHI Export, Aligning with Industry Specifications](#req_api_ehi_export_argonaut).
*   Strengthen single-patient FHIR APIs via [Keep Single-Patient API Certification Current with SMART App Launch & Backend Services Specifications](#req_update_smart_app_launch_cert).
*   Launch a pilot for [Establish a "TEFCA Patient-Developer Credential" for Comprehensive, Direct Data Access](#req_tefca_patient_developer_credential) to lower barriers for individual/small developers.
*   Commit to and begin developing [Establish Public Foundational Infrastructure for Nationwide Discovery](#req_public_discovery_infrastructure).

#### Longer-Term Steps:
*   Ensure TEFCA prioritizes individuals via [Empower Individuals with Transparency and Control Over TEFCA Data Sharing](#req_tefca_individual_transparency_control) and [Mandate a Trustworthy and Accountable Architecture for All TEFCA Individual Access Services (IAS)](#req_tefca_trustworthy_ias_architecture).
*   Expand certified API capabilities (e.g., [Mandate FHIR Subscriptions for Event-Driven Workflows](#req_mandate_fhir_subscriptions), [Mandate CDS Hooks for Seamless Clinical Decision Support Integration](#req_mandate_cds_hooks)).
*   Maintain performance parity for standard APIs ([Ensure Foundational Design and Performance for Bulk Data API](#req_ensure_bulk_api_performance_parity)).

Make access to comprehensive data less about gatekeepers and more about open, standardized interfaces.

### TD-5. How could a nationwide provider directory of FHIR endpoints improve access to health information for patients, providers, and payers? Who should publish such a directory, and should users bear a cost?

A nationwide, free, publicly accessible directory of provider FHIR endpoints is foundational.

#### Guiding Principle:
*   [Fostering Competition Through Open and Fair Market Foundations](#principle_market_competition_foundations)

#### Technology Policy Recommendation:
*   [Establish Public Foundational Infrastructure for Nationwide Discovery](#req_public_discovery_infrastructure): Explicitly calls for ONC to lead or support this directory.

#### How it Improves Access:
Enables apps to easily discover and connect to provider FHIR APIs for patients; facilitates provider-to-provider exchange; aids payers (as in PA-4); and drastically reduces complexity for app developers.

#### Who Should Publish and Cost:
ONC should lead/govern. The directory must be publicly available and **free of charge** to maximize utility and adoption.

### TD-6. What unique interoperability functions does TEFCA perform?
**a. What existing alternatives should be considered?**
**b. Are there redundant standards, protocols or channels or both that should be consolidated?**

TEFCA's *intended* unique function is nationwide querying of unknown data holders under a common trust agreement. Its current realization needs strengthening.

#### Guiding Principles for Evaluating TEFCA:
*   [Transparent and Accountable Networks with Federal Oversight](#principle_tefca_oversight_accountability)
*   [Patient Primacy and Empowerment](#principle_patient_primacy)
*   [Open Innovation and Individual Participation](#principle_open_innovation_individual_participation)

#### Critique and Necessary Evolution to Bolster Unique Value:
*   [Empower Individuals with Transparency and Control Over TEFCA Data Sharing](#req_tefca_individual_transparency_control)
*   [Establish a "TEFCA Patient-Developer Credential" for Comprehensive, Direct Data Access](#req_tefca_patient_developer_credential)
*   [Mandate a Trustworthy and Accountable Architecture for All TEFCA Individual Access Services (IAS)](#req_tefca_trustworthy_ias_architecture)

#### Existing Alternatives (TD-6a):
Direct EHR FHIR APIs (strengthened by [Mandate API-Accessible, Computable Full EHI Export, Aligning with Industry Specifications](#req_api_ehi_export_argonaut)); regional/state HIEs; proprietary vendor networks.

TEFCA should complement, not replace, direct patient-to-EHR API access, offering value for discovery, provided it fully embraces patient empowerment.

### TD-7. To what degree has USCDI improved interoperability and exchange and what are its limitations?
**a. Does it contain the full extent of data elements you need?**
**b. If not, is it because of limitations in the definition of the USCDI format or the way it is utilized?**
**c. If so, would adding more data elements to USCDI add value or create scoping challenges? How could such challenges be addressed?**
**d. Given improvements in language models, would you prefer a non-proprietary but less structured format that might improve data coverage even if it requires more processing by the receiver?**

USCDI is a valuable baseline but limited in scope and granularity.

#### Guiding Principle:
*   [Comprehensive and Performant Data Access](#principle_comprehensive_performant_data_access)

#### Technology Policy Recommendations:
*   [Steward USCDI Development for Pragmatic Interoperability](#req_steward_uscdi_development): Advocate for an improved, evidence-based expansion of USCDI.
*   [Mandate API-Accessible, Computable Full EHI Export, Aligning with Industry Specifications](#req_api_ehi_export_argonaut): Serves as the crucial backstop for data beyond USCDI.

#### Limitations (TD-7a, TD-7b):
Primarily scope; USCDI is intentionally a "core" set.

#### Adding More Data Elements to USCDI (TD-7c):
Yes, thoughtfully adding more elements via the process in [Steward USCDI Development for Pragmatic Interoperability](#req_steward_uscdi_development) adds value. Address scoping via iterative expansion and clear value propositions.

#### Less Structured Formats and LLMs (TD-7d):
We need **both**: expanding standardized USCDI and API access to complete EHI (including less structured data) via [Mandate API-Accessible, Computable Full EHI Export, Aligning with Industry Specifications](#req_api_ehi_export_argonaut). LLMs can process the unstructured parts of EHI, while standardized USCDI remains vital for precision tasks.

### TD-10. For EHR and other developers subject to the ONC Health IT Certification Program, what further steps should ASTP/ONC consider to implement the 21st Century Cures Act's API condition of certification (42 U.S.C. 300jj-11(c)(5)(D)(iv)) that requires a developer's APIs to allow health information to be accessed, exchanged, and used without special effort, including providing access to all data elements of a patient's electronic health record to the extent permissible under applicable privacy laws?

The Cures Act's vision of data being accessed, exchanged, and used "without special effort" extends beyond simple retrieval. It encompasses the full lifecycle of patient interaction with their data, including ensuring its accuracy and completeness.

#### Guiding Principle:
*   [Patient Primacy and Empowerment](#principle_patient_primacy)
*   [Comprehensive and Performant Data Access](#principle_comprehensive_performant_data_access)

#### Primary Technology Policy Recommendation:
*   [Mandate API-Accessible, Computable Full EHI Export, Aligning with Industry Specifications](#req_api_ehi_export_argonaut): This is precisely designed to fulfill the Cures Act's "all data elements... without special effort" provision by requiring API accessibility, inclusion of all EHI, and computability via vendor documentation.

#### Further Supporting Recommendations ensuring "without special effort" for access and use:
*   [Keep Single-Patient API Certification Current with SMART App Launch & Backend Services Specifications](#req_update_smart_app_launch_cert): Ensures modern, secure, and functional single-patient API access.
*   [Ensure Programmatic and Automated Access to Medical Images](#req_programmatic_image_access): Makes critical image data accessible without special effort.
*   [Mandate Electronic Pathways for Patient Record Amendment Requests](#req_patient_amendment_pathways): Fulfilling the HIPAA right to request amendment "without special effort" is a crucial aspect of "using" one's health information. Current manual processes create significant burdens. Mandating certified electronic pathways (via portals and APIs) for patients to submit, track, and receive responses to amendment requests directly aligns with the Cures Act's intent to empower patients and improve data quality.
*   [Mandate Patient-Initiated Secure Messaging via Standardized APIs](#req_patient_app_messaging_argonaut): Enabling patients to communicate with providers directly from their chosen apps, potentially with relevant data context, greatly increases the utility and stickiness of digital health products.

By mandating these capabilities through the ONC Health IT Certification Program, ONC can ensure that "without special effort" becomes a practical reality for patients seeking to truly engage with and manage their complete health information.

### TD-11. As of January 1, 2024, many health IT developers with products certified through the ONC Health IT Certification Program are required to include the capability to perform an electronic health information export or “EHI export” for a single patient as well as for patient populations (45 CFR 170.315(b)(10))...
**a. Should this capability be revised to specify standardized API requirements for EHI export?**
**b. Are there specific workflow aspects that could be improved?**
**c. Should CMS consider policy changes to support this capability's use?**

Yes, the EHI export capability urgently needs revision to specify standardized API requirements.

#### Guiding Principle:
*   [Comprehensive and Performant Data Access](#principle_comprehensive_performant_data_access)

#### Technology Policy Recommendation:
*   [Mandate API-Accessible, Computable Full EHI Export, Aligning with Industry Specifications](#req_api_ehi_export_argonaut): This directly addresses how to revise the capability.

#### Standardized API Requirements for EHI Export (TD-11a):
*   **Yes, unequivocally.** The current non-API approach is insufficient. ONC should require alignment with or equivalence to the **Argonaut Project's EHI Export API IG**, as detailed in our recommendation.

#### Workflow Aspects for Improvement (TD-11b):
*   Patient-initiated API-driven workflow, as per [Mandate API-Accessible, Computable Full EHI Export, Aligning with Industry Specifications](#req_api_ehi_export_argonaut).
*   Electronic request initiation, as per [Mandate Self-Service Electronic EHI Request Functionality in Certified Health IT](#req_self_service_ehi_request).
*   Clear API-based status tracking.

#### CMS Policy Changes to Support Use (TD-11c):
Promote beneficiary awareness, ensure TEFCA can eventually support full EHI exchange, and reinforce that API-accessible EHI export must be free to patients.

---

## F. Value-Based Care Organizations

### VB-3. What are essential health IT capabilities for value-based care arrangements?
**a. Examples (not comprehensive) may include: care planning, patient event notification, data extraction/normalization, quality performance measurement, access to claims data, attribution and patient ID matching, remote device interoperability, or other patient empowerment tools.**
**b. What other health IT capabilities have proven valuable to succeeding in value-based care arrangements?**

VBC success depends on timely, comprehensive data access, robust analytics, and proactive engagement.

#### Guiding Principle:
*   [Comprehensive and Performant Data Access](#principle_comprehensive_performant_data_access)

#### Essential Health IT Capabilities Supported by Our Recommendations:
*   **Efficient Data Extraction/Aggregation:** [Keep Bulk Data API Certification Current with FHIR Bulk Data Specifications](#req_update_bulk_data_cert), [Ensure Foundational Design and Performance for Bulk Data API](#req_ensure_bulk_api_performance_parity), and [Mandate API-Accessible, Computable Full EHI Export, Aligning with Industry Specifications](#req_api_ehi_export_argonaut).
*   **Timely Patient Event Notifications:** [Mandate FHIR Subscriptions for Event-Driven Workflows](#req_mandate_fhir_subscriptions).
*   **Advanced CDS/Workflow Integration:** [Mandate CDS Hooks for Seamless Clinical Decision Support Integration](#req_mandate_cds_hooks).
*   **Comprehensive Data for Quality Measurement:** [Steward USCDI Development for Pragmatic Interoperability](#req_steward_uscdi_development) and Bulk FHIR capabilities.
*   **Enhanced Patient Engagement:** Patient data access through [Mandate API-Accessible, Computable Full EHI Export, Aligning with Industry Specifications](#req_api_ehi_export_argonaut) and [Keep Single-Patient API Certification Current with SMART App Launch & Backend Services Specifications](#req_update_smart_app_launch_cert).
*   **Nationwide Data Discovery:** [Establish Public Foundational Infrastructure for Nationwide Discovery](#req_public_discovery_infrastructure) and a reformed TEFCA (e.g., per [Empower Individuals with Transparency and Control Over TEFCA Data Sharing](#req_tefca_individual_transparency_control)).

### VB-15. How could a nationwide provider directory of FHIR endpoints help improve access to patient data and understanding of claims data sources? What key data elements would be necessary in a nationwide FHIR endpoints directory to maximize its effectiveness?

A nationwide provider directory of FHIR endpoints would greatly benefit VBC organizations.

#### Guiding Principle:
*   [Fostering Competition Through Open and Fair Market Foundations](#principle_market_competition_foundations)

#### Technology Policy Recommendation:
*   [Establish Public Foundational Infrastructure for Nationwide Discovery](#req_public_discovery_infrastructure): Details the need for this free, public directory.

#### Benefits for VBC Organizations:
Improved data access for attributed populations, facilitated care coordination, better understanding of claims data by linking to clinical sources, support for transitions of care, and identification of technically capable partners.

#### Key Data Elements (as detailed in `req_public_discovery_infrastructure`):
FHIR API base URLs, supported FHIR versions/IGs, TEFCA participation details, authentication mechanisms, organizational affiliations, and certified Health IT product info.

---

## Key Recommendations for Technology Platform and Cloud Vendors

Several recommendations within this document are particularly pertinent for major technology and cloud platform vendors (such as Microsoft, Google, AWS) to consider supporting, as they align with fostering a robust, innovative, and scalable digital health ecosystem. Publicly supporting these could accelerate progress in critical areas:

1.  **[Mandate API-Accessible, Computable Full EHI Export, Aligning with Industry Specifications](#req_api_ehi_export_argonaut):**
    *   **Relevance:** Foundational for enabling advanced analytics, AI/ML applications, and patient-centric tools that rely on comprehensive, computable data. Cloud platforms are ideal for hosting and processing such large-scale EHI.
2.  **[Steward USCDI Development for Pragmatic Interoperability](#req_steward_uscdi_development):**
    *   **Relevance:** Expanded and well-defined standardized data elements (USCDI) simplify data integration, improve data quality for AI, and reduce the burden on developers building cross-platform solutions.
3.  **[Keep Bulk Data API Certification Current with FHIR Bulk Data Specifications](#req_update_bulk_data_cert) & [Ensure Foundational Design and Performance for Bulk Data API](#req_ensure_bulk_api_performance_parity):**
    *   **Relevance:** Efficient, performant, and standardized bulk data access is critical for population health analytics, research, and training AI models at scale—all key workloads for cloud health data platforms.
4.  **[Mandate FHIR Subscriptions for Event-Driven Workflows](#req_mandate_fhir_subscriptions):**
    *   **Relevance:** Enables modern, real-time data synchronization and event-driven architectures, which are well-suited for cloud-native applications and services, improving efficiency and timeliness of information flow.
5.  **[Mandate CDS Hooks for Seamless Clinical Decision Support Integration](#req_mandate_cds_hooks):**
    *   **Relevance:** Provides a standardized way to integrate innovative CDS services, including those powered by AI/ML, into clinical workflows. Platform vendors can offer tools and services to build and deploy such CDS Hooks.
6.  **[Ensure Programmatic and Automated Access to Medical Images](#req_programmatic_image_access):**
    *   **Relevance:** Medical imaging AI is a rapidly growing field. Standardized, programmatic access to images is essential for developing, training, and deploying imaging AI solutions on cloud platforms.
7.  **[Keep Single-Patient API Certification Current with SMART App Launch & Backend Services Specifications](#req_update_smart_app_launch_cert):**
    *   **Relevance:** Supports a vibrant ecosystem of secure, interoperable applications. Platform vendors benefit from a standardized environment that makes it easier for developers to build and deploy innovative health apps.
8.  **[Establish Public Foundational Infrastructure for Nationwide Discovery](#req_public_discovery_infrastructure):**
    *   **Relevance:** Publicly accessible directories for discovery (e.g., of FHIR endpoints) reduce friction for developers and organizations seeking to connect and exchange data, fostering a more interconnected ecosystem that benefits platform providers.
9.  **[Mandate a Trustworthy and Accountable Architecture for All TEFCA Individual Access Services (IAS)](#req_tefca_trustworthy_ias_architecture):**
    *   **Relevance:** Strong security, identity, and consent mechanisms are crucial for building trust in digital health platforms and services. Supporting robust architectures aligns with enterprise-grade security expectations.

Supporting these recommendations would not only align with the business interests of technology platform vendors by creating a larger, more standardized, and more innovative market for their services but also contribute significantly to advancing the national health IT infrastructure for the benefit of patients, providers, and the entire healthcare ecosystem.
