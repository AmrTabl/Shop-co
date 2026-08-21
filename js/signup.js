// ========================================
// SIGN UP
// ========================================


// Get form

const signupForm =
    document.querySelector("#signup-form");


// Get messages

const signupError =
    document.querySelector("#signup-error");

const signupSuccess =
    document.querySelector("#signup-success");


// ========================================
// SUBMIT FORM
// ========================================

signupForm.addEventListener(
    "submit",
    function(event) {

        // Prevent page refresh

        event.preventDefault();


        // Clear previous messages

        signupError.textContent = "";
        signupSuccess.textContent = "";


        // ====================================
        // GET VALUES
        // ====================================

        const name =
            document.querySelector("#name")
                .value
                .trim();


        const email =
            document.querySelector("#signup-email")
                .value
                .trim()
                .toLowerCase();


        const password =
            document.querySelector("#signup-password")
                .value;


        const confirmPassword =
            document.querySelector("#confirm-password")
                .value;


        // ====================================
        // VALIDATE NAME
        // ====================================

        if (name === "") {

            signupError.textContent =
                "Please enter your name.";

            return;

        }


        // ====================================
        // VALIDATE PASSWORD
        // ====================================

        if (password.length < 6) {

            signupError.textContent =
                "Password must be at least 6 characters.";

            return;

        }


        // ====================================
        // CHECK PASSWORDS
        // ====================================

        if (password !== confirmPassword) {

            signupError.textContent =
                "Passwords do not match.";

            return;

        }


        // ====================================
        // GET EXISTING USERS
        // ====================================

        let users = [];


        try {

            users =
                JSON.parse(
                    localStorage.getItem("users")
                ) || [];

        }

        catch (error) {

            console.error(
                "Could not read users:",
                error
            );

            users = [];

        }


        // ====================================
        // CHECK EXISTING EMAIL
        // ====================================

        const existingUser =
            users.find(
                user =>
                    user.email === email
            );


        if (existingUser) {

            signupError.textContent =
                "An account with this email already exists.";

            return;

        }


        // ====================================
        // CREATE USER
        // ====================================

        const newUser = {

            name: name,

            email: email,

            password: password

        };


        // ====================================
        // ADD USER
        // ====================================

        users.push(newUser);


        // ====================================
        // SAVE USERS
        // ====================================

        localStorage.setItem(
            "users",
            JSON.stringify(users)
        );


        // ====================================
        // SUCCESS
        // ====================================

        signupSuccess.textContent =
            "Account created successfully!";


        // ====================================
        // CLEAR FORM
        // ====================================

        signupForm.reset();


        // ====================================
        // GO TO SIGN IN
        // ====================================

        setTimeout(
            function() {

                window.location.href =
                    "signin.html";

            },
            1500
        );

    }
);
