// ============================
// MOBILE MENU
// ============================

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");


// Open / close mobile menu

menuBtn.addEventListener("click", () => {

    navLinks.classList.toggle("active");

});


// ============================
// CLOSE MOBILE MENU
// WHEN A LINK IS CLICKED
// ============================

const navItems =
    document.querySelectorAll(".nav-links a");


navItems.forEach((link) => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

    });

});

// ============================
// CONTACT FORM
// ============================

const contactForm =
    document.getElementById("contactForm");

const formMessage =
    document.getElementById("formMessage");


// When user submits the form

contactForm.addEventListener("submit", async (event) => {

    // Stop the browser from refreshing the page

    event.preventDefault();


    // ============================
    // GET FORM VALUES
    // ============================

    const name =
        document.getElementById("name").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const message =
        document.getElementById("message").value.trim();


    // ============================
    // CHECK EMPTY FIELDS
    // ============================

    if (!name || !email || !message) {

        formMessage.textContent =
            "Please fill in all fields.";

        return;

    }


    // ============================
    // SHOW SENDING MESSAGE
    // ============================

    formMessage.textContent =
        "Sending message...";


    // ============================
    // SEND DATA TO BACKEND
    // ============================

    try {

        const response = await fetch("/api/contact", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                name: name,

                email: email,

                message: message

            })

        });


        // ============================
        // GET RESPONSE FROM SERVER
        // ============================

        const data =
            await response.json();


        // ============================
        // CHECK RESPONSE
        // ============================

        if (data.success) {

            formMessage.textContent =
                "Your message has been sent successfully!";

            // Clear the form

            contactForm.reset();

        } else {

            formMessage.textContent =
                data.message || "Unable to send message.";

        }


    } catch (error) {

        console.log("Error:", error);

        formMessage.textContent =
            "Something went wrong. Please try again.";

    }

});