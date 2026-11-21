# Hii Pay – Voice-First Payment Assistant

A bilingual, voice-first payment assistant prototype that explores how conversational interfaces can make digital payment workflows easier to follow, especially for elderly users.

Hii Pay supports English and Telugu and lets users enter a demo payment request by speaking or typing. It then displays the recipient and amount for confirmation before continuing through a demonstration PIN step.

> **Project status:** Educational prototype. Payments are simulated only. No real money is transferred, and this is not an official PayPal application.

## Problem & motivation

Digital payment interfaces can feel difficult to navigate for people who are less comfortable with multi-step screens, small controls, or text-heavy workflows. Hii Pay explores a simpler interaction: users can speak or type a payment request in a familiar language, review the details, and follow clear confirmation steps.

## Features

- **English and Telugu interface:** Switch between the two supported languages.
- **Voice input:** Use the browser's Speech Recognition API to capture a spoken payment request.
- **Text input:** Type a payment request when voice input is unavailable or not preferred.
- **Demo contact lookup:** Resolve supported sample mobile numbers against a small, fictional in-app contact directory.
- **QR scanning:** Scan a Hii Pay demo QR payload containing a merchant and amount.
- **Payment review:** Display the recipient and amount and let the user confirm or cancel.
- **Demo PIN step:** Enter a four-digit demonstration PIN to continue the simulated flow.
- **Simulated backend response:** Send the confirmed demo request to the Node.js backend, which returns a generated demo transaction ID.

## Technology stack

| Technology | Use in the prototype |
|---|---|
| HTML | Application structure |
| CSS | Interface styling and responsive layout |
| JavaScript | User interactions, voice handling, language selection, and payment flow |
| Browser Speech Recognition API | Speech-to-text input |
| Browser Speech Synthesis API | Spoken prompts and feedback |
| Node.js | Server runtime |
| Express.js | Static file hosting and demo payment endpoint |
| Multer | Included as a server dependency; file upload is not part of the documented user flow |
| html5-qrcode | QR scanning in the browser |
| qrcode.js | QR-code library included by the page |

## Project structure

```text
Hii-Pay/
├── index.html
├── style.css
├── script.js
├── server.js
├── paymentService.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

The `.env` file and `node_modules/` directory are intentionally not included in the repository. Create your local `.env` file when running the project, and let npm install the dependencies.

## Run locally

### Prerequisites

- [Node.js](https://nodejs.org/) and npm
- A modern browser with support for the browser speech features used by the app
- Camera permission for QR scanning

### Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/Harshithalanki/Hii-Pay.git
   cd Hii-Pay
   ```

2. Install the project dependencies:

   ```bash
   npm install
   ```

3. Create a local file named `.env` in the project root with demo mode enabled:

   ```env
   PAYMENT_MODE=demo
   ```

4. Start the server:

   ```bash
   node server.js
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Demo flow

1. Choose English or Telugu.
2. Select **Speak** to dictate a request, or **Type** to enter one manually.
3. For contact-based requests, use a supported sample contact from the fictional demo directory in `script.js`.
4. Review the displayed recipient and amount, then confirm or cancel.
5. Enter the prototype's demonstration PIN to continue.
6. The frontend sends the request to the Express `/api/payment` endpoint. In demo mode, the backend validates the request and returns a simulated success response with a demo transaction ID.

The PIN check is implemented in client-side JavaScript for demonstration purposes. It is **not secure authentication** and must not be used to protect real payments.

## Screenshots

_Add project screenshots or a short demo GIF here._

| Main screen | Payment confirmation |
|---|---|
| `![Hii Pay main screen](docs/screenshots/main-screen.png)` | `![Payment confirmation](docs/screenshots/payment-confirmation.png)` |

| PIN screen | QR scanner |
|---|---|
| `![Demo PIN screen](docs/screenshots/pin-screen.png)` | `![QR scanner](docs/screenshots/qr-scanner.png)` |

_To display these images, add your own screenshots at the matching paths under `docs/screenshots/`, or update the paths to match your image filenames._

## Future enhancements

- Integrate a payment provider through its approved APIs and required security controls.
- Move authentication and authorization checks fully to a secure backend.
- Improve speech recognition and handling of natural-language requests in both languages.
- Expand accessibility options and usability testing with intended users.
- Add automated tests and improve input validation and error handling.

## Disclaimer

Hii Pay is an educational prototype created to demonstrate a voice-first, bilingual payment interaction. **All transactions are simulated; no real money is transferred.** It does not connect to PayPal or any other payment provider for live transactions, and it is not an official PayPal application. The demonstration PIN and sample contacts are for testing only. Do not enter real payment credentials or sensitive personal information.
