# Playwright API Automation — Booking API (RESTful Booker)

This repository contains my API Automation portfolio focusing on **Playwright APIRequest**, covering:

- CRUD Testing (Create, Read, Update, Delete)  
- Negative Testing (Auth errors, invalid tokens, missing fields)  
- End-to-End API Flow (Create → Get → Update → Delete → Verify)  
- Reusable API Utilities (baseURL, token manager, API helpers)

The goal of this project is to demonstrate a **real-world API automation framework** that is clean, modular, and maintainable.

---

## 🚀 Tech Stack

| Component | Description |
|----------|-------------|
| Playwright APIRequest | API Test runner & HTTP client |
| Node.js | Runtime |
| JavaScript | Scripting language |
| RESTful Booker | Public API used for demo automation |
| Modular Utilities | Reusable helper modules |

---

## 📂 Project Structure

```
api-automation-playwright/
│
├── tests/
│   ├── create_booking.spec.js
│   ├── update_booking.spec.js
│   ├── delete_booking.spec.js
│   ├── negative_case.spec.js
│   └── e2e_booking_flow.spec.js       <-- Full end-to-end test  
│
├── utils/
│   ├── apiClient.js                   <-- Base URL + request context
│   ├── tokenManager.js                <-- Token retrieval
│   └── apiHelper.js                   <-- Common API helpers
│
└── package.json
```

---

## ✨ Features

### 1. CRUD API Testing
- Create Booking  
- Get Booking by ID  
- Update Booking (requires token)  
- Delete Booking  
- Verify deletion via 404 response  

### 2. Negative Testing
Includes:
- Wrong auth credentials  
- Update booking without token (403)  
- Update with invalid token  
- Delete without token  
- Delete invalid booking ID (405)  
- Create booking missing mandatory field  

### 3. End-to-End API Scenario
A complete flow:

```
Create booking →
Get booking →
Update booking →
Verify updated fields →
Delete booking →
Verify booking no longer exists
```

This demonstrates real-world API automation capability.

---

## 🧪 How to Run

### Install dependencies
```
npm install
```

### Run all tests
```
npx playwright test
```

### Run only E2E test
```
npx playwright test tests/e2e_booking_flow.spec.js
```

### View HTML report
```
npx playwright show-report
```

---

## 🔧 Utility Helpers

### apiClient.js
Handles:
- Base URL  
- API request context  

### tokenManager.js
Automates:
- Token retrieval  
- Reusable session auth  

### apiHelper.js
Reusable methods:
- Get booking by ID  
- Get random booking ID  
- Support negative test scenarios  

---

## 🏁 Example: End-to-End Booking Flow

Includes:

- POST → Validate response  
- GET → Validate fields  
- PUT → Assert updated data  
- DELETE → Assert 201 Created  
- GET → Assert 404 Not Found  

This is the strongest part of the project for portfolio demonstration.

---

## 📌 Why This Project Matters

- Demonstrates strong understanding of **REST API testing**  
- Token-based authentication  
- Modular utilities (industry standard)  
- Production-like automation structure  
- Negative test coverage (often skipped by junior QA)  
- End-to-end business flow validation  
- Good GitHub practices & test organization  

---

## 👨‍💻 Author

**Marco — QA Automation Engineer**

Specialized in:
- UI Automation (Playwright)
- API Testing (Playwright APIRequest)
- Performance Testing (k6)
- CI/CD Integration
- 4+ Years Experience in QA & Software Testing

**LinkedIn:**  
https://www.linkedin.com/in/marco-maureece-maribondang-145260190

**GitHub:**  
https://github.com/marco0778/api-automation-playwright

---

This repository is part of my complete QA Automation portfolio, including:

- Playwright UI Automation  
- Playwright API Automation  
- Performance Testing (k6 – coming soon)

