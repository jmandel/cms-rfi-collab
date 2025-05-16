---
id: "td15-002"
rfi_question_code: "TD-15"
point_key: "ADDRESS_BULK_CHALLENGES_WITH_ROBUST_STANDARDS_CERTIFICATION_AND_PERFORMANCE_REQUIREMENTS"
short_title: "Address Bulk FHIR Challenges with Robust Standards & Certification"
summary: "Bulk FHIR challenges (server load, large data) are implementation issues, best addressed via strict IG adherence, stringent performance testing in cert, and ONC-facilitated best practices."
categories:
  - "Audience_RFI_Section:Tech_Vendor_Network"
  - "Core_Theme:API_Performance_Reliability"
  - "Key_Technology_Mechanism:Bulk_Data_FHIR"
  - "Policy_Regulation:ONC_Certification"
  - "Core_Theme:Standards_Interoperability"
  - "Core_Theme:Certification_Enforcement"
---
Potential disadvantages sometimes cited (e.g., server load during large exports, complexity of managing large data volumes) are primarily implementation challenges. These are best addressed through:
*   Strict adherence to and robust implementation of FHIR Bulk Data IG specifications (including efficient use of \_since and \_typeFilter parameters for optimized querying).
*   Clear, stringent performance requirements and testing within the ONC Health IT Certification Program (benchmarked against realistic workloads and, where applicable, proprietary export speeds).
*   ONC-facilitated development and dissemination of implementation best practices and reference architectures, rather than by diluting the mandate or accepting sub-par performance.
