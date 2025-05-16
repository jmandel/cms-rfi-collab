---
id: "td11-001"
rfi_question_code: "TD-11"
point_key: "YES_MANDATE_A_STANDARDIZED_API_FOR_EHI_EXPORT"
short_title: "Yes! Mandate Standardized API for EHI Export"
summary: "Emphatically yes. ONC *must* revise the EHI Export certification criterion (§170.315(b)(10)) to require a specific, standardized, FHIR-based API operation. This API must enable a patient (or their duly authorized application) to electronically and programmatically request the EHI Export, monitor its status, and securely download the complete package. This transforms EHI Export from a manual, opaque process into an integrated, automatable, and genuinely useful component for comprehensive data access and innovation."
categories:
  - "Audience_RFI_Section:Tech_Vendor_Network"
  - "Core_Theme:EHI_Export_Modernization"
  - "Policy_Regulation:ONC_Certification"
  - "Core_Theme:Data_Access_Completeness"
  - "Core_Theme:Standards_Interoperability"
  - "Key_Technology_Mechanism:EHI_Export"
  - "Key_Technology_Mechanism:FHIR_API"
  - "Core_Theme:Certification_Enforcement"
---
**a. Should this capability be revised to specify standardized API requirements for EHI export?**
Emphatically, **YES**. The current EHI Export capability (§ 170.315(b)(10)), while requiring export of all EHI for single patients and populations, critically lacks a standardized, API-driven mechanism for initiation and retrieval by patient-authorized applications. This is a major gap.

ONC *must* revise this certification criterion to require a **specific, standardized, FHIR-based API operation (or a set of operations)**. This API must enable a patient (or their duly authorized application, leveraging a trusted identity and authorization framework as discussed elsewhere) to:
1.  Electronically and programmatically *request* the EHI Export for that single patient.
2.  Electronically and programmatically *monitor the status* of the export generation process (e.g., pending, in-progress, completed with success/failure, estimated time to completion if asynchronous). This could leverage asynchronous FHIR patterns.
3.  Securely and programmatically *download* the complete EHI Export package (which includes all EHI and its format documentation) once it is ready.

**b. Are there specific workflow aspects that could be improved?**
The entire workflow can be improved by the API standardization above. Key improvements would be:
*   **Automation:** Replacing manual portal clicks with API calls.
*   **Transparency:** API-based status monitoring instead of an opaque waiting period.
*   **Interoperability for Retrieval:** Standardized secure download method usable by any authorized app.
*   **Error Handling:** Standardized API responses for errors during request or generation.
*   **Performance:** While the API defines the *how*, certification must also address the *how fast and reliably* (see TD-10 and API performance points).

**c. Should CMS consider policy changes to support this capability's use?**
Yes, CMS policy changes can support its use:
*   **Reinforce Patient Right:** Clearly articulate that patients have a right to use authorized third-party apps to invoke this standardized EHI Export API.
*   **Information Blocking:** Consider failure to implement or performantly support this standardized EHI Export API as a potential information blocking practice.
*   **Awareness/Education:** Promote awareness among beneficiaries and providers about this enhanced capability once available.

Transforming EHI Export from its current state—often a manual, opaque, and inconsistently implemented process—into an integrated, automatable, and genuinely useful component is vital for comprehensive data aggregation by patient-facing applications and for fostering innovation that requires access to the "long tail" of EHI.
