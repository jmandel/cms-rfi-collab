---
rfi_question_code: "PR-5"
short_title: "Leveraging Standardized FHIR APIs for Provider Workflows"
summary: "Providers need robust, performant FHIR APIs: USCDI Patient Access, Bulk Data, CDS Hooks, and standalone SMART launch are key for data access, decision support, and innovation. #FHIR #HealthIT #ProviderWorkflows"
categories:
  - "Audience_RFI_Section:Provider"
  - "Core_Theme:API_Performance_Reliability"
  - "Core_Theme:Standards_Interoperability"
  - "Policy_Regulation:ONC_Certification"
  - "Key_Technology_Mechanism:USCDI"
  - "Key_Technology_Mechanism:FHIR_API"
  - "Core_Theme:Certification_Enforcement"
  - "Core_Theme:VBC_Enablement"
  - "Key_Technology_Mechanism:Bulk_Data_FHIR"
  - "Key_Technology_Mechanism:CDS_Hooks"
  - "Core_Theme:Permissionless_Innovation"
  - "Key_Technology_Mechanism:SMART_on_FHIR"
---
For effective provider workflows and data exchange (PR-5), robust support and high performance of several FHIR APIs and capabilities are essential:

1.  **USCDI Patient Access API:** Must be universally available, robust, and critically, performant (see **Cross-Cutting Principle: [API Performance Parity with Proprietary Data Channels](#API_PERFORMANCE)**). ONC certification must enforce this through (see **Cross-Cutting Principle: [Certification for Real-World Usability: Validating Functional Interoperability](#CERTIFICATION_FOR_REAL_WORLD_USABILITY)**).
2.  **Bulk Data FHIR API:** Highly performant and reliable Bulk FHIR APIs are non-negotiable for population health, quality reporting, and VBC. This includes effective Group ID filtering and rigorous performance certification.
3.  **CDS Hooks:** Valuable for seamlessly integrating external clinical decision support into EHR workflows, supporting evidence-based care and provider efficiency, aligning with (see **Cross-Cutting Principle: [Addressing Provider Burden Through Technology: Designing for Clinician Efficiency](#ADDRESSING_PROVIDER_BURDEN_THROUGH_TECHNOLOGY)**).
4.  **Standalone SMART on FHIR Launch:** Critical for enabling permissionless innovation, allowing patient/developer apps to connect via patient authorization (using (see **Cross-Cutting Principle: [Assured Identity and Verifiable Authorization](#IDENTITY_AUTH_STACK)**)) without requiring direct EHR vendor integration for every app.
5.  **Event-Driven Data Exchange:** Requiring support for standards-based subscription mechanisms (e.g., FHIR Subscriptions as profiled in Argonaut US Core Patient Data Feed) is crucial for enabling near real-time notifications of data changes. This reduces latency and polling inefficiencies, directly benefiting time-sensitive workflows, clinical decision support, and proactive care coordination (see **Cross-Cutting Principle: [Event-Driven Data Exchange](#EVENT_DRIVEN_DATA_EXCHANGE)**).

These (see **Cross-Cutting Principle: [Prioritization of Publicly Specified Interfaces](#OPEN_STANDARDS_FIRST)**) capabilities are foundational.