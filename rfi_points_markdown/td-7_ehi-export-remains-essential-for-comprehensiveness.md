---
id: "td7-003"
rfi_question_code: "TD-7"
point_key: "EHI_EXPORT_REMAINS_ESSENTIAL_FOR_COMPREHENSIVENESS"
short_title: "EHI Export Remains Essential for Comprehensiveness"
summary: "The EHI Export capability (especially an API-driven one as proposed) remains critical for accessing the vast amount of EHI not yet covered by USCDI or common FHIR profiles (e.g., unstructured notes, legacy data). While LLMs can process less structured data, a documented, computable EHI export is vital for applications needing to reliably extract and use specific, non-discrete information not yet in granular FHIR resources."
categories:
  - "Audience_RFI_Section:Tech_Vendor_Network"
  - "Core_Theme:Data_Access_Completeness"
  - "Core_Theme:EHI_Export_Modernization"
  - "Key_Technology_Mechanism:USCDI"
  - "Key_Technology_Mechanism:EHI_Export"
  - "Key_Technology_Mechanism:FHIR_API"
---
Even as USCDI expands and FHIR resources mature, the **EHI Export capability remains essential for achieving comprehensive data access**. A very large volume of clinically important EHI exists outside of what is currently (or may ever be) defined in USCDI or commonly available through granular FHIR profiles. This includes:
*   Unstructured clinical notes in their entirety.
*   Complex legacy data.
*   Highly specialized or non-standardized flowsheet information.

While advancements in language models (LLMs) offer new possibilities for processing less structured data, a **documented, computable EHI Export** (especially one that is API-driven as proposed elsewhere in these comments) is vital for applications that need to:
*   Reliably extract and utilize specific information that may be buried in text or non-standard formats.
*   Access the complete historical record for a patient.
*   Perform offline analysis or data migration.
Preferring a non-proprietary but less structured format (like a well-documented EHI Export) is acceptable and necessary for data coverage, with the understanding that receivers will apply their own processing. The key is that the *export itself is accessible and documented*.
