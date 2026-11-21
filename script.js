
let selectedLanguage = "en";
let pendingPayment = null;

// HTML elements
const englishBtn = document.getElementById("englishBtn");
const teluguBtn = document.getElementById("teluguBtn");

const voiceBtn = document.getElementById("voiceBtn");
const keyboardBtn = document.getElementById("keyboardBtn");
const typingArea = document.getElementById("typingArea");
const paymentInput = document.getElementById("paymentInput");
const sendBtn = document.getElementById("sendBtn");
const message = document.getElementById("message");

const confirmationArea = document.getElementById("confirmationArea");
const confirmationText = document.getElementById("confirmationText");
const confirmBtn = document.getElementById("confirmBtn");
const cancelBtn = document.getElementById("cancelBtn");

const pinArea = document.getElementById("pinArea");
const pinInput = document.getElementById("pinInput");
const verifyPin = document.getElementById("verifyPin");
const deletePin = document.getElementById("deletePin");
const clearPin = document.getElementById("clearPin");
const numberButtons = document.querySelectorAll(".number-btn");

// Language selection
englishBtn.addEventListener("click", function () {
    selectedLanguage = "en";

    englishBtn.classList.add("active");
    teluguBtn.classList.remove("active");

    message.textContent = "English selected.";
});

teluguBtn.addEventListener("click", function () {
    selectedLanguage = "te";

    teluguBtn.classList.add("active");
    englishBtn.classList.remove("active");

    message.textContent = "తెలుగు ఎంచుకున్నారు.";
});

// Text-to-speech
function speak(text, language = selectedLanguage) {
    const speech = new SpeechSynthesisUtterance(text);

    speech.lang = language === "te" ? "te-IN" : "en-IN";
    speech.rate = 0.9;
    speech.pitch = 1;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(speech);
}

// Keyboard input
keyboardBtn.addEventListener("click", function () {
    typingArea.classList.remove("hidden");
    paymentInput.focus();
    message.textContent = "";
});

// Voice input
voiceBtn.addEventListener("click", function () {
    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
        message.textContent =
            "Voice recognition is not supported. Please use Chrome or Edge.";
        return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = selectedLanguage === "te" ? "te-IN" : "en-IN";
    recognition.continuous = false;
    recognition.interimResults = false;

    message.textContent =
        selectedLanguage === "te" ? "వింటున్నాను..." : "Listening...";

    recognition.onresult = function (event) {
        const spokenText = event.results[0][0].transcript;
// Voice commands to scan QR code
const command = spokenText.toLowerCase();

if (
    (command.includes("scan") && command.includes("qr")) ||
    (command.includes("scan") && command.includes("chey")) ||
    (command.includes("scan") && command.includes("cheyyi")) ||
    (command.includes("స్కాన్") &&
        (command.includes("చేయి") ||
         command.includes("చెయ్యి") ||
         command.includes("చేయండి")))
) {
    qrBtn.click();
    message.textContent = "Opening QR scanner...";
    return;
}
        paymentInput.value = spokenText;
        typingArea.classList.remove("hidden");

        message.textContent =
            (selectedLanguage === "te" ? "మీరు చెప్పింది: " : "I heard: ") +
            spokenText;

        processPaymentRequest();
    };

    recognition.onerror = function () {
        message.textContent =
            selectedLanguage === "te"
                ? "క్షమించండి, మళ్లీ ప్రయత్నించండి."
                : "Sorry, I couldn't hear that. Please try again.";
    };

    recognition.start();
});

// Process payment request

function processPaymentRequest() {
    // Hii Pay fictional demo contact directory
    const demoContacts = {
    "0000000001": "Ravi",
    "0000000002": "Suresh",
    "0000000003": "Lakshmi",
    "9123456789": "Durga"
};

    const request = paymentInput.value.trim();

    if (!request) {
        message.textContent =
            selectedLanguage === "te"
                ? "దయచేసి చెల్లింపు వివరాలు నమోదు చేయండి."
                : "Please enter a payment request.";
        return;
    }

    // Convert Telugu numerals into ordinary digits
    const teluguDigits = {
        "౦": "0", "౧": "1", "౨": "2", "౩": "3",
        "౪": "4", "౫": "5", "౬": "6", "౭": "7",
        "౮": "8", "౯": "9"
    };

    const normalizedRequest = request.replace(
        /[౦-౯]/g,
        digit => teluguDigits[digit]
    );
console.log("Hii Pay received:", normalizedRequest);
    // Detect a 10-digit demo mobile number
    const mobileMatch = normalizedRequest.match(
        /(?:\+91[\s-]?)?(\d{10})\b/
    );

    let recipient = "";
    let mobileNumber = "";

    if (mobileMatch) {
        mobileNumber = mobileMatch[1];

        // Find the number in our fictional demo directory
        recipient = demoContacts[mobileNumber];

        if (!recipient) {
            message.textContent =
                selectedLanguage === "te"
                    ? "ఈ మొబైల్ నంబర్ మా డెమో కాంటాక్ట్స్‌లో లేదు."
                    : "This mobile number is not in the Hii Pay demo contacts.";

            speak(message.textContent);
            return;
        }
    } else {
        // Detect recipient name for ordinary payments
        const englishMatch =
            normalizedRequest.match(/\bto\s+(.+?)$/i);

        const teluguMatch =
            normalizedRequest.match(/^(.+?)కి/);

        const romanTeluguMatch =
            normalizedRequest.match(/^(.+?)\s+ki\s+\d+/i);

        if (englishMatch) {
            recipient = englishMatch[1].trim();
        } else if (teluguMatch) {
            recipient = teluguMatch[1].trim();
        } else if (romanTeluguMatch) {
            recipient = romanTeluguMatch[1].trim();
        }
    }

    // Remove the mobile number before detecting the amount
    const amountText = mobileMatch
        ? normalizedRequest.replace(mobileMatch[0], " ")
        : normalizedRequest;

    const amountMatch = amountText.match(
        /(\d+(?:\.\d{1,2})?)/
    );

    if (!amountMatch || !recipient) {
        message.textContent =
            selectedLanguage === "te"
                ? "దయచేసి పేరు లేదా మొబైల్ నంబర్ మరియు మొత్తాన్ని సరిగ్గా నమోదు చేయండి."
                : "Please provide a valid recipient or demo mobile number and amount.";
        return;
    }

    const amount = Number(amountMatch[1]);

    if (!Number.isFinite(amount) || amount <= 0) {
        message.textContent = "Please enter a valid amount.";
        return;
    }

    // Store demo payment details
    pendingPayment = {
        recipient: recipient,
        mobileNumber: mobileNumber,
        amount: amount
    };

    // Show confirmation details
    if (mobileNumber) {
        confirmationText.textContent =
            selectedLanguage === "te"
                ? `${recipient} (${mobileNumber}) కి ₹${amount} పంపించాలనుకుంటున్నారా?`
                : `You are sending ₹${amount} to ${recipient} (${mobileNumber}).`;
    } else {
        confirmationText.textContent =
            selectedLanguage === "te"
                ? `${recipient} కి ₹${amount} పంపించాలనుకుంటున్నారా?`
                : `You are sending ₹${amount} to ${recipient}.`;
    }

    confirmationArea.classList.remove("hidden");
    pinArea.classList.add("hidden");
    message.textContent = "";

    if (selectedLanguage === "te") {
        speak(
            `${recipient} కి ${amount} రూపాయలు పంపించాలనుకుంటున్నారా?`
        );
    } else {
        speak(
            `You are sending ${amount} rupees to ${recipient}. Do you want to confirm this demo payment?`
        );
    }
}
sendBtn.addEventListener("click", processPaymentRequest);
console.log("Hii Pay submit button connected");
// Confirm payment
confirmBtn.addEventListener("click", function () {
    if (!pendingPayment) return;

    confirmationArea.classList.add("hidden");
    pinArea.classList.remove("hidden");

    pinInput.value = "";

    if (selectedLanguage === "te") {
        message.textContent = "దయచేసి మీ డెమో పిన్ ఎంటర్ చేయండి.";
        speak("దయచేసి మీ డెమో పిన్ ఎంటర్ చేయండి.");
    } else {
        message.textContent = "Please enter your demo PIN.";
        speak("Please enter your demo PIN.");
    }
});

// Cancel payment
cancelBtn.addEventListener("click", function () {
    pendingPayment = null;

    confirmationArea.classList.add("hidden");
    pinArea.classList.add("hidden");

    message.textContent =
        selectedLanguage === "te"
            ? "చెల్లింపు అభ్యర్థి రద్దు చేయబడింది."
            : "Payment request cancelled.";

    speak(message.textContent);
});

// Number keypad
numberButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        if (pinInput.value.length < 4) {
            pinInput.value += button.textContent;
        }
    });
});

// Allow keyboard number entry
pinInput.addEventListener("input", function () {
    pinInput.value = pinInput.value
        .replace(/\D/g, "")
        .slice(0, 4);
});

// Delete PIN digit
deletePin.addEventListener("click", function () {
    pinInput.value = pinInput.value.slice(0, -1);
});

// Clear PIN
clearPin.addEventListener("click", function () {
    pinInput.value = "";
});

// Verify demo PIN

verifyPin.addEventListener("click", async function () {
    if (pinInput.value.length !== 4) {
        message.textContent =
            selectedLanguage === "te"
                ? "దయచేసి నాలుగు అంకెల పిన్ నమోదు చేయండి."
                : "Please enter all 4 digits.";
        return;
    }

    if (pinInput.value === "2468") {
        if (!pendingPayment) {
            message.textContent = "No pending demo payment found.";
            return;
        }

        const paymentDetails = { ...pendingPayment };

        pinArea.classList.add("hidden");
        message.textContent = "Processing demo payment...";

        try {
            const response = await fetch("/api/payment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    amount: Number(paymentDetails.amount),
                    recipient: paymentDetails.recipient
                })
            });

            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(result.message || "Payment failed.");
            }

            if (selectedLanguage === "te") {
                message.textContent =
                    "డెమో పేమెంట్ విజయవంతమైంది.";
                speak("డెమో పేమెంట్ విజయవంతమైంది.");
            } else {
                message.textContent =
                    "Demo payment successful!";
                speak("Demo payment successful.");
            }

            console.log("Demo payment result:", result);

            pendingPayment = null;

        } catch (error) {
            message.textContent =
                "Payment could not be processed: " + error.message;

            speak(message.textContent);
        }

        pinInput.value = "";

    } else {
        message.textContent =
            selectedLanguage === "te"
                ? "తప్పు పిన్. మళ్లీ ప్రయత్నించండి."
                : "Incorrect demo PIN. Please try again.";

        speak(message.textContent);
        pinInput.value = "";
    }
});

// QR Code Scanner
const qrBtn = document.getElementById("qrBtn");
const qrReader = document.getElementById("qrReader");
const qrMessage = document.getElementById("qrMessage");

let qrScanner = null;

qrBtn.addEventListener("click", async function () {
    if (!window.Html5Qrcode) {
        qrMessage.textContent =
            "QR scanner library could not load. Check your internet connection.";
        return;
    }

    qrReader.classList.remove("hidden");
    qrMessage.textContent = "Opening camera...";

    qrScanner = new Html5Qrcode("qrReader");

    try {
        await qrScanner.start(
            { facingMode: "environment" },
          {
    fps: 15,
    aspectRatio: 1.0,
    disableFlip: false
},
            async function (decodedText) {
                console.log("QR DETECTED:", decodedText);

                let qrData;

                try {
                    qrData = JSON.parse(decodedText);
                } catch {
                    qrMessage.textContent =
                        "Invalid Hii Pay demo QR code. Please try another.";
                    return;
                }

                if (
                    qrData.type !== "hii-pay-demo" ||
                    typeof qrData.merchant !== "string" ||
                    !qrData.merchant.trim() ||
                    !Number.isFinite(Number(qrData.amount)) ||
                    Number(qrData.amount) <= 0
                ) {
                    qrMessage.textContent =
                        "This QR code does not contain valid demo payment details.";
                    return;
                }

                await qrScanner.stop();
                await qrScanner.clear();
                qrReader.classList.add("hidden");

                paymentInput.value =
                    `send ${Number(qrData.amount)} rupees to ${qrData.merchant.trim()}`;

                typingArea.classList.remove("hidden");

                qrMessage.textContent =
                    "Demo merchant details scanned successfully.";

                processPaymentRequest();
            }
        );

        qrMessage.textContent =
            "Camera is ready. Point it at a Hii Pay demo QR code.";

    } catch (error) {
        qrMessage.textContent =
            "Camera could not start. Please check camera permission.";
        console.error("QR scanner error:", error);
    }
});

