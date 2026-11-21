
async function createDemoPayment(amount, recipient) {
    if (!Number.isFinite(amount) || amount <= 0) {
        throw new Error("Invalid payment amount.");
    }

    if (!recipient || !recipient.trim()) {
        throw new Error("Recipient is required.");
    }

    return {
        success: true,
        mode: "demo",
        transactionId: "DEMO-" + Date.now(),
        amount: amount,
        recipient: recipient.trim(),
        message: "Demo payment processed successfully. No real money was transferred."
    };
}

module.exports = { createDemoPayment };
