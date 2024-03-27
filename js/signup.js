let emailInput = document.getElementById("email");
let loginInput = document.getElementById("login");
let passInput = document.getElementById("pass");
let pass2Input = document.getElementById("pass2");
// let newsletterInput = document.getElementById('newsletter');
let termsInput = document.getElementById("terms");

// create paragraph to display the error Msg returented by vaildateEmail() function
// and assign this paragraph to the class warning to style the error MSg
let emailError = document.createElement("p");
emailError.setAttribute("class", "warning");
//append the created element to the parent of email div
document.querySelectorAll(".textfield")[0].append(emailError);

// create paragraph to display the error Msg returented by vaildateLogin() function
// and assign this paragraph to the class warning to style the error MSg
let loginError = document.createElement("p");
loginError.setAttribute("class", "warning");
//append the created element to the parent of check div
document.querySelectorAll(".textfield")[1].append(loginError);

// create paragraph to display the error Msg returented by vaildatePass() function
// and assign this paragraph to the class warning to style the error MSg
let passError = document.createElement("p");
passError.setAttribute("class", "warning");
//append the created element to the parent of check div
document.querySelectorAll(".textfield")[2].append(passError);

// create paragraph to display the error Msg returented by vaildatePass2() function
// and assign this paragraph to the class warning to style the error MSg
let pass2Error = document.createElement("p");
pass2Error.setAttribute("class", "warning");
//append the created element to the parent of check div
document.querySelectorAll(".textfield")[3].append(pass2Error);

// create paragraph to display the error Msg returented by vaildateTerms() function
// and assign this paragraph to the class warning to style the error MSg
let termsError = document.createElement("p");
termsError.setAttribute("class", "warning");
//append the created element to the parent of check div
document.querySelectorAll(".checkbox")[0].append(termsError);

//define a global variables
let emailErrorMsg =
  "❌ Email address should be non-empty with the format xyx@xyz.xyz";
let loginErrorMsg =
  "❌ User name should be non-empty, and within 30 characters long.";
let passErrorMsg =
  "❌ Password should be at least 8 characters: 1 uppercase, 1 lowercase.";
let pass2ErrorMsg = "❌ Please retype password.";
let termsErrorMsg = "❌ Please accept the terms and conditions";
let defaultMSg = "";

//method to validate email
function vaildateEmail() {
  let email = emailInput.value; // access the value of the email
  let regexp = /\S+@\S+\.\S+/; //reg. expression

  if (regexp.test(email)) {
    //test is predefiend method to check if the entered email matches the regexp
    error = defaultMSg;
  } else {
    error = emailErrorMsg;
  }
  return error;
}

//method to validate login
function vaildateLogin() {
  let login = loginInput.value; // access the value of the login (User Name)
  if (login.trim() === "" || login.length > 30) {
    error = loginErrorMsg;
  } else {
    login = login.toLowerCase();
    loginInput.value = login;  // update the value to lowercase
    error = defaultMSg;
  }
  return error;
}

//method to validate Password
function vaildatePass() {
  let pass = passInput.value; // access the value of the password
  let hasUpperCase = /[A-Z]/.test(pass);
  let hasLowerCase = /[a-z]/.test(pass);
  // let hasNumber = /\d/.test(pass);
  // let hasSpecialChar = /\W|_/g.test(pass);

  if (pass.length < 8 || pass.trim() === "" || !hasUpperCase || !hasLowerCase) {
    error = passErrorMsg;
  } else {
    error = defaultMSg;
  }
  return error;
}

//method to validate Password2
function vaildatePass2() {
  let pass = passInput.value;
  let pass2 = pass2Input.value; // access the value of the Re-type password
  if (pass2.trim() === "" || pass2 !== pass) {
    error = pass2ErrorMsg;
  } else {
    error = defaultMSg;
  }
  return error;
}

//method to validate the terms
function validateTerms() {
  if (termsInput.checked) return defaultMSg;
  else return termsErrorMsg;
}

//function to validate
function validate() {
  let valid = true; //global validation

  //validate email
  let emailValidation = vaildateEmail();
  if (emailValidation !== defaultMSg) {
    emailError.textContent = emailValidation;
    valid = false;
  }

  //validate login
  let loginValidation = vaildateLogin();
  if (loginValidation !== defaultMSg) {
    loginError.textContent = loginValidation;
    valid = false;
  }

  //validate Password
  let passValidation = vaildatePass();
  if (passValidation !== defaultMSg) {
    passError.textContent = passValidation;
    valid = false;
  }

  //validate Password2
  let pass2Validation = vaildatePass2();
  if (pass2Validation !== defaultMSg) {
    pass2Error.textContent = pass2Validation;
    valid = false;
  }

  //validate Terms
  let termsValidation = validateTerms();
  if (termsValidation !== defaultMSg) {
    termsError.textContent = termsValidation;
    valid = false;
  }
  return valid;
}

// event listner to empty the text inside the two paragraph when reset
function resetFormError() {
  emailError.textContent = defaultMSg;
  loginError.textContent = defaultMSg;
  passError.textContent = defaultMSg;
  pass2Error.textContent = defaultMSg;
  termsError.textContent = defaultMSg;
  // emailError.remove();
  // loginError.remove();
  // passError.remove();
  // pass2Error.remove();
  // termsError.remove();
}


// add event listner to the email if you entered correct email,the error paragraph will be empty
emailInput.addEventListener("blur", () => {
  // arrow function
  let x = vaildateEmail();
  if (x == defaultMSg) {
    emailError.textContent = defaultMSg;
  }
});

// add event listner to the login if you entered correct User Name,the error paragraph will be empty
loginInput.addEventListener("blur", () => {
  // arrow function
  let x = vaildateLogin();
  if (x == defaultMSg) {
    loginError.textContent = defaultMSg;
  }
});

// add event listner to the login if you entered correct Password,the error paragraph will be empty
passInput.addEventListener("blur", () => {
  // arrow function
  let x = vaildatePass();
  if (x == defaultMSg) {
    passError.textContent = defaultMSg;
  }
});

// add event listner to the login if you Re-type correct Password,the error paragraph will be empty
pass2Input.addEventListener("blur", () => {
  // arrow function
  let x = vaildatePass2();
  if (x == defaultMSg) {
    pass2Error.textContent = defaultMSg;
  }
});

// add event listner to the newsletter checkbox if you check the newsletter box,the error paragraph will be empty
// newsletterInput.addEventListener("change", function () {
//   // anonymous function
//   if (this.checked) {
//     alert('Please check your spam folder regularly as our emails might end up there.');
//   }
// });

// add event listner to the terms checkbox if you check the terms box,the error paragraph will be empty
termsInput.addEventListener("change", function () {
  // anonymous function
  if (this.checked) {
    termsError.textContent = defaultMSg;
    // console.log("termsError:", termsError.textContent);
  }
});

// add event listner for reset button
document.querySelector("form").addEventListener("reset", resetFormError);

// add event listner for "Sign-Up" button
document.querySelector("form").addEventListener("submit", function(event) {
  event.preventDefault(); // prevent the form from submitting normally
  registerUser();
});

function registerUser() {
    if (validate()) {
        let username = document.getElementById('login').value;
        let password = document.getElementById('pass').value;
        let email = document.getElementById('email').value;
        let data = new FormData();
        data.append("username", username);
        data.append("password", password);   
        data.append("email", email);
    
        let xhr = new XMLHttpRequest();
        xhr.open('POST', './php/signup.php', true);
        xhr.send(data);
    
        xhr.onload = function() {
            let response = JSON.parse(this.responseText);
            if (response.success) {
                alert("Signup successed!");
                window.location.href="login.html";
            } else {
                alert("Signup failed!");
            }
        };
      }
}
