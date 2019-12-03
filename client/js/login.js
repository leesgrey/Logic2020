"use strict";

// get DOM elements
const idInput = document.querySelector('#userName');
const pwInput = document.querySelector('#passWord');
const loginButton = document.querySelector('#loginButton');

// add event listener to login
loginButton.addEventListener('click', checkCredentials);
pwInput.addEventListener('keyup', checkEnter);

// check login credentials and go to appropriate dashboard
function checkCredentials(e) {
  if (idInput.value == 'user' && pwInput.value == 'user'){
    window.location.href = '/student/dashboard';
  }
  else if (idInput.value == 'admin' && pwInput.value == 'admin'){
    document.location.href = '../tmpl/professorDashboard.html';
  }
  else {
    let field = document.querySelector('#errorMessage');
    let message = document.createElement('p');
    if (field.innerHTML.trim().length === 0) {
      message.innerHTML = "*username or password entered is incorrect";
      message.style.color = "red"
    }
    field.appendChild(message)
  }
}

// if enter pressed on pwInput, click button
function checkEnter(e) {
  if (e.keyCode == 13) {
    loginButton.click();
  }
}
