# Hii Pay – Voice-First Payment Assistant

## About the Project

Hii Pay is a bilingual, voice-first payment assistant designed to make digital payment interactions simpler and more accessible, particularly for elderly users.

It supports English and Telugu and allows users to initiate demo payment requests through voice commands or keyboard input.

## Key Features

1. **Voice Payments:** Initiate payments using spoken commands.
2. **Mobile Number Payments:** Identify demo contacts using their mobile numbers.
3. **QR Code Payments:** Scan demo merchant QR codes using the camera.
4. **Bilingual Interface:** Supports English and Telugu.
5. **Payment Confirmation:** Displays payment details for confirmation before proceeding.
6. **Demo PIN Verification:** Uses a demonstration PIN to simulate payment authorization.

## Technologies Used

- HTML
- CSS
- JavaScript
- Node.js
- Express.js
- Multer
- Browser Speech Recognition API
- QR Code Scanner Library

## Project Structure

```text
hii-pay-paypal-integration/
│
├── index.html
├── styles.css
├── script.js
├── server.js
├── paymentService.js
├── package.json
├── package-lock.json
├── .env
├── .gitignore
└── README.md
```

## How to Run

1. Install Node.js.
2. Open the project folder in VS Code.
3. Install dependencies:

```bash
npm install
```

4. Configure `.env`:

```env
PAYMENT_MODE=demo
```

5. Start the server:

```bash
node server.js
```

6. Open the application:

```text
http://localhost:3000
```

## Payment Simulation

Hii Pay currently uses a simulated payment backend.

- Payment requests are validated by the Node.js backend.
- A demo transaction ID is generated.
- No real money is transferred.
- No actual PayPal API transaction is performed.

## Project Objective

The objective of Hii Pay is to explore how voice interaction and multilingual interfaces can make digital payment experiences easier to understand and use.

## Future Scope

- Integration with a payment provider's approved APIs.
- Improved multilingual speech recognition.
- Enhanced accessibility features.
- Secure payment authorization through an approved payment system.

## Disclaimer

This is an educational demonstration project. All payments are simulated. It is not an official PayPal application and does not process real transactions.