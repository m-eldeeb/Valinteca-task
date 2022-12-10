/******************************************************************* */
// (welcome screen)
const startBtn = document.getElementById("start-btn");

if (startBtn) {
  startBtn.addEventListener("click", () => {
    window.location.href = "/signup.html";
  });
}
/******************************************************************* */

/******************************************************************* */
/* second page (register page)*/

//select elements from document
const nameError = document.getElementById("name-error");
const emailError = document.getElementById("email-error");
const passwordError = document.getElementById("password-error");
const confirmPasswordError = document.getElementById("cPassword-error");
const formError = document.getElementById("form-error");
const form = document.getElementById("signup-form");
const submitBtn = document.getElementById("submit");

// function for display error in html pages
function printErrorMsg(msg, location) {
  document.getElementById(location).innerHTML = msg;
  document.getElementById(location).style.display = "block";
}

// function validate name
function validateName() {
  const name = document.getElementById("name-input").value;

  if (name.length == 0) {
    printErrorMsg("username is required", "name-error");
    return false;
  }

  if (!name.match(/^[^0-9][a-zA-Z0-9]{3,13}\D$/)) {
    printErrorMsg(
      `username must be at least 5 characters with no
    numbers at the beginning or the end`,
      "name-error"
    );

    return false;
  }

  nameError.style.display = "none";
  return true;
}

// function validate email
function validateEmail() {
  const email = document.getElementById("email-input").value;

  if (email.length == 0) {
    printErrorMsg("email is required", "email-error");
    return false;
  }

  if (!email.match(/^\S+@\S+\.\S+$/)) {
    printErrorMsg("please enter a valid email", "email-error");
    return false;
  }

  emailError.style.display = "none";
  return true;
}

// function validate password
function validatePassword() {
  const password = document.getElementById("password-input").value;

  if (password.length == 0) {
    printErrorMsg("password is required", "password-error");
    return false;
  }

  if (
    !password.match(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    )
  ) {
    printErrorMsg(
      ` Password must contain at least one uppercase letter, number, symbol and minimum 8 characters`,
      "password-error"
    );
    return false;
  }

  passwordError.style.display = "none";
  return true;
}

// function validate and confirm password
function validateConfirmPassword() {
  const confirmPassword = document.getElementById("cPassword-input").value;
  const password = document.getElementById("password-input").value;

  if (confirmPassword.length == 0) {
    printErrorMsg("password is required", "cPassword-error");
    return false;
  }

  if (
    !confirmPassword.match(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    )
  ) {
    printErrorMsg(
      ` Password must contain at least one uppercase letter, number, symbol and minimum 8 characters`,
      "cPassword-error"
    );
    return false;
  }

  if (confirmPassword != password) {
    printErrorMsg("your passwords don't match", "cPassword-error");
    return false;
  }

  confirmPasswordError.style.display = "none";
  return true;
}

// submit handler
if (submitBtn) {
  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();

    // check if no errors in validation
    if (
      !validateName() ||
      !validateEmail() ||
      !validatePassword() ||
      !validateConfirmPassword()
    ) {
      printErrorMsg("please fix errors to submit", "form-error");
      return;
    }
    formError.style.display = "none";

    // get values from form inputs
    const username = form.user.value;
    const email = form.email.value;
    const password = form.password.value;
    const password_confirmation = form.confirmPassword.value;

    // invoke function to send data to api
    sendData(username, email, password, password_confirmation);
  });
}

// function to send user data
async function sendData(username, email, password, password_confirmation) {
  try {
    const data = await fetch("https://goldblv.com/api/hiring/tasks/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
        password_confirmation,
      }),
    });
    const result = await data.json();

    // save response in localstorage
    localStorage.setItem("user", JSON.stringify(result));
    window.location.href = "succeed.html";
  } catch (error) {
    formError.innerHTML = error
  }
}



/************************************************************ */
// last page (logged in successfully)
const user = document.getElementById("user-email");
if (localStorage.getItem("user")) {
  const userData = JSON.parse(localStorage.getItem("user"));
  if (user) {
    user.innerHTML = userData.email;
  }
}
/************************************************************ */
