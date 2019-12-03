"use strict";

// get DOM elements
const idInput = document.querySelector('#userName');
const pwInput = document.querySelector('#passWord');
const loginButton = document.querySelector('#loginButton');
let students = []

// add event listener to login
loginButton.addEventListener('click', checkCredentials);
pwInput.addEventListener('keyup', checkEnter);

// get all users
function getStudents() {
  const url = "/api/students"

  fetch(url).then((res) => {
    if (res.status === 200) {
      console.log("returning")
      return res.json()
    } else {
      alert('Could not load users')
    }
  }).then((json) => {
    students = json
  })
}

getStudents()

// check login credentials and go to appropriate dashboard
function checkCredentials(e) {
  const user = idInput.value
  const pw = pwInput.value

  for (let i = 0; i < students.length; i++) {
    if (user == students[i].username && pw == students[i].password){
      window.location.href = '/student/dashboard';
      break
    }
    else if (user== 'admin' && pw== 'admin'){
      document.location.href = '/admin/dashboard';
    }
  }
  let field = document.querySelector('#errorMessage');
  let message = document.createElement('p');
  if (field.innerHTML.trim().length === 0) {
    message.innerHTML = "*username or password entered is incorrect";
    message.style.color = "red"
  }
  field.appendChild(message)
}


// if enter pressed on pwInput, click button
function checkEnter(e) {
  if (e.keyCode == 13) {
    loginButton.click();
  }
}
