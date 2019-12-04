"use strict";

// get DOM elements
const idInput = document.querySelector('#userName');
const pwInput = document.querySelector('#passWord');
const loginButton = document.querySelector('#loginButton');
let students = []

// add event listener to login
loginButton.addEventListener('click', checkCredentials);
pwInput.addEventListener('keyup', checkEnter);


// check login credentials and go to appropriate dashboard
function checkCredentials(e) {
  const user = idInput.value
  const pw = pwInput.value

  let userInfo = {
    username: user,
    password: pw
  };

  fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(userInfo)
  }).then((res) => {
    if (res.status === 200) {
      document.location.href = '/student/dashboard';
      return 0;
    } else {
      if (user=='admin' && pw=='admin'){
        document.location.href = '/admin/dashboard';
      } else {
        let field = document.querySelector('#errorMessage');
        let message = document.createElement('p');
        if (field.innerHTML.trim().length === 0) {
          message.innerHTML = "*username or password entered is incorrect";
          message.style.color = "#FF357B"
        }
        field.appendChild(message)
      }
      return 0;
    }
  });
}


// if enter pressed on pwInput, click button
function checkEnter(e) {
  if (e.keyCode == 13) {
    loginButton.click();
  }
}
