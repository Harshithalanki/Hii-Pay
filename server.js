require("dotenv").config();
const { createDemoPayment } = require("./paymentService");
const express = require("express");
const multer = require("multer");

const app = express();
const PORT = 3000;
console.log("Payment mode:", process.env.PAYMENT_MODE);

app.use(express.static(__dirname));
app.use(express.json());
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 10 * 1024 * 1024
    }
});

app.get("/api/test", (req, res) => {
    res.json({
        message: "Hello from Hii Pay backend!"
    });
});

app.post("/api/payment", async (req, res) => {
    try {
        if (process.env.PAYMENT_MODE !== "demo") {
            return res.status(403).json({
                success: false,
                message: "Only demo payments are enabled."
            });
        }

        const { amount, recipient } = req.body || {};

        if (
            amount === undefined ||
            amount === null ||
            !Number.isFinite(Number(amount)) ||
            Number(amount) <= 0 ||
            typeof recipient !== "string" ||
            !recipient.trim()
        ) {
            return res.status(400).json({
                success: false,
                message: "Please provide a valid amount and recipient."
            });
        }

        const result = await createDemoPayment(
            Number(amount),
            recipient
        );

        res.json(result);

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});
app.listen(PORT, () => {
    console.log(`Hii Pay is running at http://localhost:${PORT}`);
});
