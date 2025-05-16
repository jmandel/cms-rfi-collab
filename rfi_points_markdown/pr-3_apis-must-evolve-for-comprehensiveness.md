---
id: "pr3-003"
rfi_question_code: "PR-3"
point_key: "APIS_MUST_EVOLVE_FOR_COMPREHENSIVENESS"
short_title: "APIs Must Evolve for Comprehensiveness"
summary: "While a modernized EHI Export provides bulk access to all data, future API development (beyond USCDI) should strategically aim to make more unstructured and non-standardized EHI (e.g., notes via FHIR DocumentReference, evolving FHIR note resources) directly queryable and computable, reducing reliance on bulk export for common needs."
categories:
  - "Audience_RFI_Section:Provider"
  - "Core_Theme:Standards_Interoperability"
  - "Core_Theme:Data_Access_Completeness"
  - "Key_Technology_Mechanism:FHIR_API"
  - "Key_Technology_Mechanism:USCDI"
---
While a modernized, API-driven EHI Export is crucial for comprehensive *bulk* access to all data formats, the long-term vision for API-based interoperability should also involve strategic evolution *beyond USCDI*. Future API development and FHIR resource maturation should aim to:
*   Make more types of unstructured or non-standardized EHI (such as clinical notes, potentially leveraging FHIR DocumentReference and Binary resources, or evolving dedicated FHIR resources for notes) directly queryable.
*   Improve the computability of this data once retrieved via APIs.

This gradual expansion of direct API capabilities for richer data types will, over time, reduce the reliance on bulk EHI Export for more common or targeted information needs, further enhancing real-time interoperability. However, EHI Export remains essential for full comprehensiveness in the interim and for data not easily amenable to granular API access.
