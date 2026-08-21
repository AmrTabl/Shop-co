// ========================================
// SIGN IN
// ========================================


// Get form

const signinForm =
    document.querySelector("#signin-form");


// ========================================
// CHECK FORM
// ========================================

if (!signinForm) {

    console.error(
        "Sign in form was not found."
    );

}


// ========================================
// SUBMIT FORM
// ========================================

if (signinForm) {

    signinForm.addEventListener(
        "submit",
        function(event) {

            // Prevent page refresh

            event.preventDefault();


            // ====================================
            // GET VALUES
            // ====================================

            const email =
                document
                    .querySelector("#email")
                    .value
                    .trim()
                    .toLowerCase();


            const password =
                document
                    .querySelector("#password")
                    .value;


            const remember =
                document
                    .querySelector("#remember")
                    .checked;


            // ====================================
            // VALIDATE EMAIL
            // ====================================

            if (email === "") {

                alert(
                    "Please enter your email."
                );

                return;

            }


            // ====================================
            // VALIDATE PASSWORD
            // ====================================

            if (password === "") {

                alert(
                    "Please enter your password."
                );

                return;

            }


            // ====================================
            // GET USERS
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
            // CHECK IF USERS EXIST
            // ====================================

            if (users.length === 0) {

                alert(
                    "No account found. Please sign up first."
                );

                return;

            }


            // ====================================
            // FIND USER
            // ====================================

            const user =
                users.find(
                    function(user) {

                        return (
                            user.email === email &&
                            user.password === password
                        );

                    }
                );


            // ====================================
            // INVALID LOGIN
            // ====================================

            if (!user) {

                alert(
                    "Incorrect email or password."
                );

                return;

            }


            // ====================================
            // CREATE LOGGED-IN USER
            // ====================================

            const loggedInUser = {

                name: user.name,

                email: user.email

            };


            // ====================================
            // SAVE LOGIN
            // ====================================

            if (remember) {

                localStorage.setItem(
                    "currentUser",
                    JSON.stringify(loggedInUser)
                );

            }

            else {

                sessionStorage.setItem(
                    "currentUser",
                    JSON.stringify(loggedInUser)
                );

            }


            // ====================================
            // SUCCESS
            // ====================================

            alert(
                `Welcome back, ${user.name}!`
            );


            // ====================================
            // REDIRECT TO HOME
            // ====================================

            window.location.href =
                "index.html";

        }
    );

}
