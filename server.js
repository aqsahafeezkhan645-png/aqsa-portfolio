// ============================
// IMPORT PACKAGES
// ============================

const express = require("express");
const nodemailer = require("nodemailer");
const path = require("path");

require("dotenv").config();


// ============================
// CREATE EXPRESS APP
// ============================

const app = express();


// ============================
// PORT
// ============================

const PORT = process.env.PORT || 3000;


// ============================
// MIDDLEWARE
// ============================

// Allow Express to read JSON

app.use(express.json());


// Allow Express to read form data

app.use(express.urlencoded({
    extended: true
}));


// Serve files from the public folder

app.use(
    express.static(
        path.join(__dirname, "public")
    )
);


// ============================
// HOME PAGE
// ============================

app.get("/", (req, res) => {

    res.sendFile(
        path.join(
            __dirname,
            "public",
            "index.html"
        )
    );

});


// ============================
// GMAIL TRANSPORTER
// ============================

const transporter = nodemailer.createTransport({

    service: "gmail",

    auth: {

        user: process.env.EMAIL_USER,

        pass: process.env.EMAIL_PASS

    }

});


// ============================
// TEST EMAIL CONNECTION
// ============================

transporter.verify((error) => {

    if (error) {

        console.log("Email connection error:");
        console.log(error);

    } else {

        console.log("Email server is ready!");

    }

});


// ============================
// CONTACT FORM API
// ============================

app.post("/api/contact", async (req, res) => {

    try {

        // Get data from frontend

        const {
            name,
            email,
            message
        } = req.body;


        // ============================
        // VALIDATE DATA
        // ============================

        if (!name || !email || !message) {

            return res.status(400).json({

                success: false,

                message:
                    "Please fill in all fields."

            });

        }


        // ============================
        // EMAIL CONTENT
        // ============================

        const mailOptions = {

            // Your Gmail account

            from: process.env.EMAIL_USER,


            // Your Gmail inbox

            to: process.env.EMAIL_USER,


            // Reply directly to visitor

            replyTo: email,


            // Email subject

            subject:
                `New Portfolio Message from ${name}`,


            // Email body

            text: `
You received a new message from your portfolio website.

Name:
${name}

Email:
${email}

Message:
${message}
            `

        };


        // ============================
        // SEND EMAIL
        // ============================

        await transporter.sendMail(
            mailOptions
        );


        // ============================
        // SUCCESS
        // ============================

        console.log(
            "Message sent successfully!"
        );


        res.status(200).json({

            success: true,

            message:
                "Your message has been sent successfully!"

        });


    } catch (error) {

        // ============================
        // ERROR
        // ============================

        console.log(
            "Email sending error:"
        );

        console.log(error);


        res.status(500).json({

            success: false,

            message:
                "Unable to send message. Please try again later."

        });

    }

});


// ============================
// START SERVER
// ============================

app.listen(
    PORT,
    "0.0.0.0",
    () => {

        console.log(
            `Portfolio running on port ${PORT}`
        );

    }
);