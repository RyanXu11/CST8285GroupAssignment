//define a global variables
const emailErrorMsg = "❌ Email address should be non-empty with the format xyx@xyz.xyz";
const loginErrorMsg = "❌ User name should be non-empty, and within 30 characters long.";
const passErrorMsg = "❌ Password should be at least 8 characters: 1 uppercase, 1 lowercase.";
const pass2ErrorMsg = "❌ Please retype password.";
const defaultMSg = "";

const emailInput = document.getElementById("email");
const loginInput = document.getElementById("login");
const passInput = document.getElementById("pass");
const pass2Input = document.getElementById("pass2");
const passDiv = document.getElementById("passDiv");
const pass2Div = document.getElementById("pass2Div");
const termsInput = document.getElementById("showPass");

const editBtn = document.getElementById("editBtn");
const resetPassBtn = document.getElementById("resetPassBtn");
const cancelBtn = document.getElementById("cancelBtn");

const displayUsername = document.getElementById("displayUsername");
const p1 = document.getElementById("p1");
const p2 = document.getElementById("p2");

// This function is used to set the three button status
let formStateVar="default";
function formState(state) {
    switch (state) {
        case "edit":
            console.log("formstate: edit");
            emailInput.disabled = false;
            loginInput.disabled = false;
            passDiv.style.display = "none";
            pass2Div.style.display = "none";

            editBtn.disabled = false;
            resetPassBtn.disabled = true;
            cancelBtn.disabled = false;

            formStateVar="edit";
            break;
        case "resetPass":
            console.log("formstate: resetPass");
            emailInput.disabled = true;
            loginInput.disabled = true;
            passDiv.style.removeProperty("display");
            pass2Div.style.removeProperty("display");

            editBtn.disabled = true;
            resetPassBtn.disabled = false;
            cancelBtn.disabled = false;

            formStateVar="resetPass";
            break;
        default:
            console.log("formstate: default");
            emailInput.disabled = true;
            loginInput.disabled = true;
            passDiv.style.display = "none";
            pass2Div.style.display = "none";

            editBtn.disabled = false;
            resetPassBtn.disabled = false;

            cancelBtn.disabled = true;
            formStateVar="default";
    }
}

// create paragraph to display the error Msg returented by validateEmail() function
// and assign this paragraph to the class warning to style the error MSg
let emailError = document.createElement("p");
emailError.setAttribute("class", "warning");
//append the created element to the parent of email div
document.querySelectorAll(".textfield")[0].append(emailError);

// create paragraph to display the error Msg returented by validateLogin() function
// and assign this paragraph to the class warning to style the error MSg
let loginError = document.createElement("p");
loginError.setAttribute("class", "warning");
//append the created element to the parent of check div
document.querySelectorAll(".textfield")[1].append(loginError);

// create paragraph to display the error Msg returented by validatePass() function
// and assign this paragraph to the class warning to style the error MSg
let passError = document.createElement("p");
passError.setAttribute("class", "warning");
//append the created element to the parent of check div
document.querySelectorAll(".textfield")[2].append(passError);

// create paragraph to display the error Msg returented by validatePass2() function
// and assign this paragraph to the class warning to style the error MSg
let pass2Error = document.createElement("p");
pass2Error.setAttribute("class", "warning");
//append the created element to the parent of check div
document.querySelectorAll(".textfield")[3].append(pass2Error);

//===Following functions are used for validation===================================================
//method to validate email
function validateEmail() {
    let email = emailInput.value; // access the value of the email
    let regexp = /\S+@\S+\.\S+/; //reg. expression
    let error;

    if (regexp.test(email)) {
      //test is predefiend method to check if the entered email matches the regexp
        error = defaultMSg;
    } else {
        error = emailErrorMsg;
    }
    return error;
}

//method to validate login
function validateLogin() {
    // console.log("loginInput:", loginInput);
    let login = loginInput.value; // access the value of the login (User Name)
    let error;
    if (login.trim() === "" || login.length > 30) {
        error = loginErrorMsg;
    } else {
      // login = login.toLowerCase();?
        login = login;
        loginInput.value = login;  // update the value to lowercase
        error = defaultMSg;
    }
    return error;
}

//method to validate Password
function validatePass() {
    let error;
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
function validatePass2() {
    let pass = passInput.value;
    let pass2 = pass2Input.value; // access the value of the Re-type password
    let error;
    if (pass2.trim() === "" || pass2 !== pass) {
        error = pass2ErrorMsg;
    } else {
        error = defaultMSg;
    }
    return error;
}

// function to check if email and login(username) are valid before saving
function validateEmailLogin() {
    let valid = true;

    //validate email
    let emailValidation = validateEmail();
    if (emailValidation !== defaultMSg) {
        emailError.textContent = emailValidation;
        valid = false;
    }

    //validate login
    let loginValidation = validateLogin();
    if (loginValidation !== defaultMSg) {
        loginError.textContent = loginValidation;
        valid = false;
    }

    return valid;
}

// function to check if two password fields are valid before password reset
function validatePassPass2() {
    let valid = true; 

    //validate Password
    let passValidation = validatePass();
    if (passValidation !== defaultMSg) {
        passError.textContent = passValidation;
        valid = false;
    }

    //validate Password2
    let pass2Validation = validatePass2();
    if (pass2Validation !== defaultMSg) {
        pass2Error.textContent = pass2Validation;
        valid = false;
    }

    return valid;
}

//===Following functions are used for edit profile=================================================
// This function is used to display user profile
let MemberID = document.getElementById("displayUsername").getAttribute("name");
function fetchProfile() {
    console.log("MemberID: ", MemberID);
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "php/getProfile.php?memberID=" + MemberID, true);
    // xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    // displayDateTime();
    xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let profiles = JSON.parse(this.responseText);
            console.log("This is profiles:\n", profiles);
            for (let key in profiles) {
                let element = document.getElementById(key.toLowerCase());
                if (element) {
                    element.value = profiles[key];
                }
            }
        }
    };
    xhr.send();
}


// This function is used to update user profile
function updateProfile() {
    console.log("validateEmailLogin(): ", validateEmailLogin());
    if (validateEmailLogin()) {
        let username = loginInput.value;
        let email = emailInput.value;
        let data = {
            MemberID: MemberID,
            username: username,
            email: email,
        };
        data = JSON.stringify(data);
        console.log("data in updateProfile: ", data);

        let xhr = new XMLHttpRequest();
        xhr.open("POST", "./php/updateProfile.php", true);
        xhr.send(data);

        xhr.onload = function () {
            console.log("Response Text:", this.responseText);
            let response = JSON.parse(this.responseText);
            if (response.success) {
                alert("Profile updated successed!");
                location.reload();
            } else {
                alert("Profile updated failed! \n" + "Error Code: " + response.code + "\n" + response.message);
            }
        };
    } 
}

// This function is used to update password
function resetPassword() {
    console.log("validatePassPass2(): ", validatePassPass2());
    if (validatePassPass2()) {
        let data = {
            MemberID: MemberID,
            password: passInput.value,
        };
        data = JSON.stringify(data);
        console.log("data in resetPassword: ", data);

        let xhr = new XMLHttpRequest();
        xhr.open("POST", "./php/resetPassword.php", true);
        xhr.send(data);

        xhr.onload = function () {
            console.log("Response Text:", this.responseText);
            let response = JSON.parse(this.responseText);
            if (response.success) {
                alert("Password reset successful!");
                location.reload();
            } else {
                alert("Password reset failed! \n" + "Error Code: " + response.code + "\n" + response.message);
            }
        };
    } 
}

//===addEventlistener for four input fields========================================================
// add event listner to the email if you entered correct email,the error paragraph will be empty
emailInput.addEventListener("blur", () => {
    // arrow function
    let x = validateEmail();
    if (x == defaultMSg) {
        emailError.textContent = defaultMSg;
    }
});

// add event listner to the login if you entered correct User Name,the error paragraph will be empty
loginInput.addEventListener("blur", () => {
// arrow function
let x = validateLogin();
if (x == defaultMSg) {
    loginError.textContent = defaultMSg;
}
});

// add event listner to the login if you entered correct Password,the error paragraph will be empty
passInput.addEventListener("blur", () => {
// arrow function
let x = validatePass();
if (x == defaultMSg) {
    passError.textContent = defaultMSg;
}
});

// add event listner to the login if you Re-type correct Password,the error paragraph will be empty
pass2Input.addEventListener("blur", () => {
// arrow function
let x = validatePass2();
if (x == defaultMSg) {
    pass2Error.textContent = defaultMSg;
}
});

//===addEventlistener for show password checkbox===================================================
// add event listner to the terms checkbox if you check the terms box,the error paragraph will be empty
termsInput.addEventListener("change", function () {
    // anonymous function
    if (this.checked) {
        // display the password
        passInput.type = "text";
        pass2Input.type = "text";
    } else {
        // hiding the password
        passInput.type = "password";
        pass2Input.type = "password";
    }
});

//===addEventlistener for four buttons=============================================================
// event listener for edit email/username button
editBtn.addEventListener("click", function (event) {
    event.preventDefault();
    let email = emailInput.value;
    let login = loginInput.value;
    if (this.textContent.includes("Edit")){
        this.textContent = "Save email/username";
        p1.textContent = email;
        p2.textContent = login;
        formState("edit");
        emailInput.focus();
    } else {
        if (validateEmailLogin()) {
            if (email === p1.textContent && login === p2.textContent) {
                alert("No change for email and username!");
            } else {
                updateProfile();
                this.textContent = "Edit email/username";
            }
        } 
    }
});

// event listener for reset password button
resetPassBtn.addEventListener("click", function (event) {
    event.preventDefault();
    if (this.textContent.includes("Reset")){
        this.textContent = "Save Password";
        formState("resetPass");
        passInput.focus();
    } else {
        if (validatePassPass2()){
            resetPassword();
            this.textContent = "Reset Password";
        }
    }
});


// event listner to empty the text inside the two paragraph when reset
function resetFormError() {
    // console.log("emailError <p>: ", emailError);
    emailError.textContent = defaultMSg;
    loginError.textContent = defaultMSg;
    passError.textContent = defaultMSg;
    pass2Error.textContent = defaultMSg;
}

// event listener for cancel button
cancelBtn.addEventListener("click", function (event) {
    event.preventDefault();
    editBtn.textContent = "Edit email/username";
    resetPassBtn.textContent = "Reset Password";
    resetFormError();
    formState();
});

// functions for window.onload
window.onload = function () {
    fetchProfile();

    // default formstate
    formState();
    // displayDateTime();
};