"use strict"

let form = document.querySelector(".form");
let firstNameBox = document.getElementById("first-name").parentElement;
let lastNameBox = document.getElementById("last-name").parentElement;
let emailBox = document.getElementById("email").parentElement;
let passwordBox = document.getElementById("password").parentElement;
let minLength = 8;

form.addEventListener("submit", handleSubmit);
form.addEventListener("input", handleInput);

function handleInput(event) {
  if (event.target.classList.contains("color--error")) {
    event.target.classList.remove("color--error");
  }
}

function handleSubmit(event) {
  event.preventDefault();

  let { firstName, lastName, email, password } = Object.fromEntries(new FormData(form));

  let firstNameErrorMessage = validateName(firstName, true);
  updateError(firstNameErrorMessage, firstNameBox);

  let lastNameErrorMessage = validateName(lastName, false);
  updateError(lastNameErrorMessage, lastNameBox);

  let emailErrorMessage = validateEmail(email);
  updateError(emailErrorMessage, emailBox);

  let passwordErrorMessage = validatePassword(password, minLength);
  updateError(passwordErrorMessage, passwordBox);

  checkAllFields();
}

function validateName(value, isFirstName) {
  if (!value && isFirstName) {
    return "First Name cannot be empty";
  } else if (!value && !isFirstName) {
    return "Last Name cannot be empty";
  }

  let isName = /^[a-zA-Z]{2,15}$/;
  if (!isName.test(value) && isFirstName) {
    return "Looks like this is not a valid first name";
  } else if (!isName.test(value) && !isFirstName) {
    return "Looks like this is not a valid last name"
  }
  return "";
}

function validateEmail(value) {
  if (!value) return "Email address cannot be empty";

  let isValidEmail = /[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/;
  if (!isValidEmail.test(value)) return "Looks like this is not a valid email";
  return "";
}

function validatePassword(value, minLength) {
  if (!value) return "Password cannot be empty";

  if (value.length < minLength) return `Password must contain at least ${minLength} or more characters`;

  let hasUppercase = /[A-Z]/g;
  if (!hasUppercase.test(value)) return "Password must contain at least one uppercase";

  let hasNumber = /\d/g;
  if (!hasNumber.test(value)) return "Password must contain at least one number";

  return "";
}

function updateError(message, element) {
  if (message) {
    element.classList.add("error");
  } else {
    element.classList.remove("error");
  }
  element.nextElementSibling.textContent = message;
}

function checkAllFields() {
  let inputFields = document.querySelectorAll(".input");

  let isNoError = true;
  for (let field of inputFields) {
    if (field.parentElement.classList.contains("error")) {
      isNoError = false;
      field.classList.add("color--error");
    }
  }
  if (isNoError) form.submit();
}






