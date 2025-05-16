---
id: "pr5-002"
rfi_question_code: "PR-5"
point_key: "BULK_DATA_PERFORMANCE_NON_NEGOTIABLE"
short_title: "Bulk Data Performance: Non-Negotiable"
summary: "Stress the absolute necessity for *highly performant and reliable* Bulk FHIR APIs (Standardized API for Patient and Population Services) for critical use cases like population health, quality reporting, VBC, and research. This includes mandating effective Group ID-based access filtering and certifying for performance against clear benchmarks."
categories:
  - "Audience_RFI_Section:Provider"
  - "Core_Theme:API_Performance_Reliability"
  - "Core_Theme:Standards_Interoperability"
  - "Core_Theme:VBC_Enablement"
  - "Key_Technology_Mechanism:Bulk_Data_FHIR"
  - "Policy_Regulation:ONC_Certification"
  - "Core_Theme:Certification_Enforcement"
---
For population health management, quality reporting, value-based care initiatives, and clinical research, the availability of *highly performant and reliable* Bulk FHIR APIs (referred to in the RFI as "Standardized API for Patient and Population Services") is non-negotiable. Providers and VBC organizations depend on this capability.
Key requirements include:
*   **Performance Parity:** As stressed in HTI-2 comments and highlighted by research (e.g., MedRxiv paper on Bulk FHIR performance), certified Bulk Data APIs must perform comparably to proprietary bulk export mechanisms from the same vendor.
*   **Effective Filtering:** Mandate support for Group ID-based access filtering to allow for population-specific queries, which is essential for targeted data extraction and reducing unnecessary data transfer.
*   **Certification for Performance:** ONC certification must rigorously test Bulk FHIR implementations against clear, demanding performance benchmarks to ensure they can handle realistic workloads efficiently. Current performance is often inadequate.
