---
id: "vb11-001"
rfi_question_code: "VB-11"
point_key: "VBC_DEPENDS_ON_COMPREHENSIVE_PERFORMANT_DATA_ACCESS"
short_title: "VBC Depends on Comprehensive, Performant Data Access"
summary: "Successful Value-Based Care (VBC) program implementation is profoundly hindered by interoperability challenges. These include: lack of timely access to comprehensive patient data from disparate sources; inadequate performance and reliability of Bulk Data FHIR APIs for population-level analytics; and difficulty obtaining complete patient histories (the 'long tail' of data often outside USCDI) needed for accurate risk assessment and care coordination. Modernizing EHI Export to be API-driven would help address the 'long tail' data access issue."
categories:
  - "Audience_RFI_Section:VBC_Organization"
  - "Core_Theme:VBC_Enablement"
  - "Core_Theme:Data_Access_Completeness"
  - "Core_Theme:API_Performance_Reliability"
  - "Key_Technology_Mechanism:Bulk_Data_FHIR"
  - "Core_Theme:EHI_Export_Modernization" # To address long tail
---
Successful Value-Based Care (VBC) program implementation is profoundly hindered by several key interoperability challenges encountered in the real world:

1.  **Lack of Timely Access to Comprehensive Patient Data:** VBC models require a holistic view of the patient, often drawing data from disparate sources (multiple EHRs, claims, labs, pharmacies). Obtaining this data in a timely, aggregated, and usable format is a major hurdle. Current systems often result in fragmented patient records.

2.  **Inadequate Performance and Reliability of Bulk Data FHIR APIs:** While Bulk Data FHIR APIs are designed for population-level data extraction critical for VBC analytics (e.g., risk stratification, quality measurement, cohort management), their current real-world performance is often insufficient (as documented in the MedRxiv paper "Real World Performance of the 21st Century Cures Act Population Level Application Programming Interface"). Slow export times, unreliability, and inability to handle large patient populations efficiently prevent VBC organizations from leveraging these APIs effectively.

3.  **Difficulty Obtaining Complete Patient Histories (the "Long Tail" of Data):** Much of the critical information for accurate risk assessment, understanding patient context, and effective care coordination lies in data elements outside the current USCDI scope (e.g., detailed clinical notes, historical data, social determinants of health information not yet standardized). Accessing this "long tail" of EHI is difficult, and an API-driven, modernized EHI Export capability (as proposed in TD-11) is essential to address this gap for VBC.

4.  **Challenges with Data Normalization and Quality:** Even when data is accessible, inconsistencies in coding, format, and quality across different sources make it difficult and resource-intensive to aggregate and analyze meaningfully for VBC purposes.
