---
id: "td9-001"
rfi_question_code: "TD-9a; TD-9b" # Combined a/b as they are closely related in the detailed principles.
point_key: "API_FIRST_CERTIFICATION_MUST_ENSURE_ALL_EHI_ACCESS"
short_title: "API-First Cert Must Ensure ALL EHI Access"
summary: "Prioritizing API-enabled capabilities in ONC certification is beneficial. However, this must not reduce patient access to their *complete* EHI. If direct APIs cannot (yet) represent all EHI aspects, then an API-driven mechanism to request, monitor, and retrieve the *full EHI Export* becomes an even more critical certified capability. The drawback of API-first is only if it leads to neglect of comprehensive EHI access."
categories:
  - "Audience_RFI_Section:Tech_Vendor_Network"
  - "Policy_Regulation:ONC_Certification"
  - "Core_Theme:Data_Access_Completeness"
  - "Core_Theme:EHI_Export_Modernization"
  - "Core_Theme:Standards_Interoperability"
  - "Key_Technology_Mechanism:EHI_Export"
  - "Key_Technology_Mechanism:FHIR_API"
---
**Benefits of API-Enabled Capabilities Prioritization (TD-9a):** Redefining ONC certification to prioritize API-enabled capabilities over traditional software functionality is generally beneficial. It drives the industry towards more modular, extensible, and interoperable systems, fostering innovation and enabling a more diverse ecosystem of applications that can connect to core health IT platforms.

**Drawbacks and Mitigation (TD-9b):** The primary drawback of prioritizing API-enabled capabilities arises *only if* it leads to a neglect of, or reduction in, access to the patient's *complete* Electronic Health Information (EHI). Many crucial aspects of a patient's record may not (yet) be represented by standardized, granular FHIR APIs.

Therefore, if certification prioritizes APIs, it **must simultaneously ensure that there is a robust, API-driven mechanism to access the entirety of the EHI not covered by those granular APIs.** This means:
*   The **API-driven EHI Export** (as proposed in TD-11 and elsewhere) becomes an even more critical certified capability. It serves as the bridge to comprehensive data when specific FHIR APIs are insufficient.
*   CMS policy should motivate providers to respond to *all* API-based data requests (whether for USCDI, richer FHIR data, or the full EHI Export) with the best possible coverage and quality of data.
An API-first approach is positive, provided it is implemented holistically to guarantee access to all EHI.
