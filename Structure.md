
## ✅ 1. **Beneficiary Profile Data**

| Field               | Description            | Type                        | Source    |
| ------------------- | ---------------------- | --------------------------- | --------- |
| Full Name           | As per Aadhaar         | Text                        | Applicant |
| Date of Birth       | For age verification   | Date                        | Applicant |
| Gender              | Male/Female/Other      | Dropdown                    | Applicant |
| Aadhaar Number      | For eKYC/verification  | Number (masked for privacy) | UIDAI     |
| Mobile Number       | For OTP & DBT tracking | Number                      | Applicant |
| Email ID (optional) | For status updates     | Email                       | Applicant |
| Photograph          | For verification       | Image Upload                | Applicant |

---

## ✅ 2. **Caste Verification Data**

| Field                    | Description                   | Type    | Source                     |
| ------------------------ | ----------------------------- | ------- | -------------------------- |
| Caste Certificate Number | Unique ID                     | Text    | State Caste Certificate DB |
| Issuing Authority        | Department or Officer         | Text    | State Portal               |
| Upload Certificate       | For manual validation         | File    | Applicant                  |
| Verified Status          | System or manual verification | Boolean | Auto/Manual                |

---

## ✅ 3. **Socio-Economic Data**

| Field                     | Description                       | Type         | Source                   |
| ------------------------- | --------------------------------- | ------------ | ------------------------ |
| Annual Household Income   | In INR                            | Number       | Self-declared / Verified |
| Employment Status         | Employed/Unemployed/Self-employed | Dropdown     | e-Shram/Applicant        |
| Educational Qualification | Highest level completed           | Dropdown     | UDISE+, Applicant        |
| Existing Scheme Benefits  | PM-KISAN, NSAP, PMAY-G etc.       | Multi-select | Government Portals       |

---

## ✅ 4. **Skill Development & Livelihood Data**

| Field                        | Description                    | Type         | Source         |
| ---------------------------- | ------------------------------ | ------------ | -------------- |
| Current Skill Level          | Skilled/Semi-skilled/Unskilled | Dropdown     | Applicant      |
| Training Completed           | Type of training, duration     | Text         | NSDC/Applicant |
| Willingness for New Training | Yes/No                         | Boolean      | Applicant      |
| Type of Skill Needed         | Agriculture/IT/Handicraft/etc. | Multi-select | Applicant      |
| Income Source                | Primary source of livelihood   | Dropdown     | Applicant      |

---

## ✅ 5. **Geographic & Location Data**

| Field             | Description               | Type               | Source         |
| ----------------- | ------------------------- | ------------------ | -------------- |
| State             | Applicant’s state         | Dropdown           | Applicant      |
| District          | District within the state | Dropdown           | Applicant      |
| Block/Taluk       | Subdivision               | Dropdown           | Applicant      |
| Village/Town Name | Residential area          | Text               | Applicant      |
| Pin Code          | Area code                 | Number             | Applicant      |
| Geo-coordinates   | From GPS or map pin       | Latitude/Longitude | Enumerator/App |

---

## ✅ 6. **Banking & DBT Data**

| Field                    | Description           | Type            | Source    |
| ------------------------ | --------------------- | --------------- | --------- |
| Bank Account Holder Name | As per bank           | Text            | Applicant |
| Bank Name                | Select from dropdown  | Dropdown        | NPCI/PFMS |
| IFSC Code                | Branch identification | Text            | Applicant |
| Account Number           | For DBT               | Number (masked) | Applicant |
| DBT Linked with Aadhaar  | Yes/No                | Boolean         | NPCI/Bank |

---

## ✅ 7. **Enumerator Field Survey Data**

| Field               | Description                | Type     | Source           |
| ------------------- | -------------------------- | -------- | ---------------- |
| Enumerator ID       | Field officer ID           | Text     | System-generated |
| Survey Status       | Pending/Completed/Rejected | Dropdown | App              |
| Timestamp           | Date & time of survey      | Datetime | System           |
| Geo-tag of Survey   | Location captured          | GPS      | App              |
| Offline/Online Mode | Status of form             | Boolean  | App              |

---

## ✅ 8. **Admin Monitoring & Tracking Data**

| Field                       | Description                     | Type        | Source           |
| --------------------------- | ------------------------------- | ----------- | ---------------- |
| Application ID              | Unique for each applicant       | Text        | System-generated |
| Approval Status             | Approved / Rejected / On Hold   | Dropdown    | Admin            |
| Verification Logs           | Actions by officers             | Audit Trail | System           |
| GIA Grant Amount            | Amount sanctioned               | Number      | PM-AJAY MIS      |
| Project Type                | Infrastructure / Skill / Income | Dropdown    | Admin            |
| Training Partner Assigned   | NSDC partner                    | Dropdown    | NSDC             |
| Skill Completion Status     | In Progress / Completed         | Dropdown    | Skill MIS        |
| Feedback/Grievance Received | Text                            | Text        | Portal           |
| Resolution Status           | Resolved / Pending              | Dropdown    | Admin            |

---

## 🧾 Additional Requirements for Real-Time Systems

| Requirement                      | Why It’s Needed                                         |
| -------------------------------- | ------------------------------------------------------- |
| Role-based access control (RBAC) | For different users: applicants, enumerators, officials |
| API Integration                  | To pull data from Aadhaar, PFMS, NSDC, State DBs        |
| OTP & Biometric Support          | For secure logins and field-level verification          |
| Language Localization            | At least English + Hindi + 2 regional languages         |
| Data Encryption                  | At rest and in transit, for privacy compliance          |
| Audit Logs                       | For tracking system usage & edits                       |

---

## 📦 Data Sources You May Need to Connect

| Platform                                        | Purpose                                |
| ----------------------------------------------- | -------------------------------------- |
| **Aadhaar (UIDAI)**                             | Identity verification                  |
| **NSDC / Skill India**                          | Training & certification               |
| **PFMS / NPCI**                                 | Bank validation, DBT status            |
| **e-Shram**                                     | Worker database                        |
| **Caste Certificate DB (State-specific)**       | Verification of SC status              |
| **PM-KISAN, PMAY-G, UDISE+**                    | Cross-checking existing scheme overlap |
| **Geospatial APIs (Google Maps, Bhuvan, etc.)** | Geo-tagging of households and projects |

---