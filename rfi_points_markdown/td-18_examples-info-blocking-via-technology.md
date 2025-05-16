---
id: "td18-001"
rfi_question_code: "TD-18a" # Specifically addresses 18a
point_key: "EXAMPLES_OF_POTENTIAL_INFO_BLOCKING_VIA_TECHNOLOGY_IMPLEMENTATION"
short_title: "Examples of Potential Info Blocking via Technology Implementation"
summary: "Information blocking practices by technology vendors can include: providing certified APIs (Patient Access, Bulk Data, EHI Export) that are unreasonably slow, frequently unavailable, or consistently fail; failing to return all permissible EHI; imposing unnecessarily cumbersome or non-standard EHI Export workflows; creating undue friction for patient-authorized dynamic app registration (especially for self-use); or charging unreasonable fees or imposing discriminatory terms for certified API use for individual access."
categories:
  - "Audience_RFI_Section:Tech_Vendor_Network"
  - "Policy_Regulation:Information_Blocking_Policy"
  - "Core_Theme:API_Performance_Reliability"
  - "Core_Theme:EHI_Export_Modernization"
  - "Core_Theme:Permissionless_Innovation"
  - "Policy_Regulation:Cost_Accessibility_Equity"
  - "Core_Theme:Information_Blocking"
---
As a technology vendor or actor in the ecosystem, practices experienced that may constitute information blocking by other Health IT developers or data holders include:

1.  **API Non-Performance or Unreliability:**
    *   Providing certified Patient Access APIs or Bulk Data APIs that are consistently and unreasonably slow, frequently unavailable during expected operational hours, or that regularly fail for valid, compliant requests. This effectively makes the data inaccessible "without special effort."
    *   Setting arbitrarily low rate limits for certified APIs that choke legitimate use by patient-authorized applications.

2.  **Incomplete Data Return:**
    *   Failing to return all EHI that is electronically available and permissible to share under law in response to a valid Patient Access API request (for data beyond USCDI if available) or an EHI Export request.
    *   Omitting required data elements from USCDI responses without valid justification.

3.  **Cumbersome or Obstructed EHI Export:**
    *   Implementing the EHI Export capability only through unnecessarily cumbersome, non-standard, or manual workflows (e.g., requiring multiple phone calls, faxes, or obscure portal navigation) when an API-driven or more streamlined process is technically feasible and expected by the certification rule's intent.
    *   Significant, unexplained delays in providing the EHI Export.

4.  **Barriers to Patient-Authorized Application Access:**
    *   Refusing to support or creating undue technical or administrative friction for the dynamic registration of patient-authorized applications, especially those using self-signed certificates for an individual patient accessing their own data (when coupled with strong patient authentication).
    *   Requiring developers of patient-facing apps to enter into onerous, unnecessary, or discriminatory business agreements solely to enable patient-directed access via certified APIs.

5.  **Unreasonable Fees or Discriminatory Terms:**
    *   Charging unreasonable fees specifically for the use of certified API functionalities when used by a patient or their authorized app for accessing that patient's own EHI.
    *   Imposing contractual terms that unfairly restrict the use of data obtained through certified APIs, beyond what is necessary for security or privacy compliance.

These practices, whether intentional or due to persistent neglect, can prevent or materially discourage the access, exchange, or use of EHI.
