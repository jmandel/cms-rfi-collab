---
id: "td9-002"
rfi_question_code: "TD-9c"
point_key: "CERTIFY_API_DRIVEN_ACCESS_TO_ALL_CHART_DATA"
short_title: "Certify API-Driven Access to ALL Chart Data"
summary: "ONC certification must require that APIs, or API-driven processes, enable access to *all data elements of a patient's chart*. This means performant FHIR API access for USCDI and richer standardized datasets, AND a mandatory, standardized, API-driven method to initiate, monitor, and download the complete EHI Export for any data not yet covered by direct FHIR APIs."
categories:
  - "Audience_RFI_Section:Tech_Vendor_Network"
  - "Policy_Regulation:ONC_Certification"
  - "Core_Theme:Data_Access_Completeness"
  - "Core_Theme:EHI_Export_Modernization"
  - "Core_Theme:Standards_Interoperability"
  - "Key_Technology_Mechanism:EHI_Export"
  - "Key_Technology_Mechanism:FHIR_API"
  - "Key_Technology_Mechanism:USCDI"
---
To ensure that ONC Health IT Certification enables access to *all aspects of the patient's chart* (including faxed records converted to digital, free text, discrete data, etc.), certification criteria must be revised to require:
1.  **Performant, direct FHIR API access** for USCDI and an expanding set of richer, standardized datasets as FHIR resources and profiles mature.
2.  A **mandatory, standardized, API-driven method** (as detailed in TD-11) to allow a patient or their authorized application to:
    *   Request the generation of the complete EHI Export.
    *   Monitor the status of this generation.
    *   Securely download the EHI Export package.
This two-pronged approach ensures that standardized data is available efficiently via direct APIs, while the entirety of the EHI (including data not yet suitable for granular API access) is accessible through a modernized, automatable export process. This directly addresses the challenge of making *all* data formats interoperable by providing a defined pathway to obtain them in a computable, documented form.
