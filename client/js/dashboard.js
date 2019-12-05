"use strict";
const API_URL = 'http://localhost:5000'
let user = ""

// get DOM elements
const assignmentBox = document.querySelector('#assignments');
let myAssignments = [];
let grades = []
let numberOfAssignments = 0;

class Assignment {
  constructor(title, dueDateTime, questions){
    this.title = title;
    this.dueDateTime = dueDateTime;
    this.questions = questions;
    this.completed = 0;
    this.total = questions.length;
    this.assignmentId = numberOfAssignments;
    numberOfAssignments++;
  }
}

// GETs all assignments, adds them to assignment list
function getAssignments() {
  const url = API_URL + '/api/ass'
  fetch(url).then((res) => {
    if (res.status == 200){
      return res.json()
    } else {
      alert('Could not get assignments')
    }
  }).then((json) => {
    myAssignments = json

    assignmentBox.innerHTML = '';
    for (let i = 0; i < myAssignments.length; i++){
      console.log(myAssignments[i].aid)
      const newCardContainer = document.createElement('div');
      newCardContainer.classList.add('flex-item');
      const newLink = document.createElement('a');
      newLink.href = "/practice/" + myAssignments[i].aid + "/" + myAssignments[i].questions[0]
      newCardContainer.appendChild(newLink);
      const newCard = document.createElement('div');
      newCard.classList.add('card--h');
      newLink.appendChild(newCard);
      const newHeader = document.createElement('div');
      newHeader.classList.add('card__header');
      newCard.appendChild(newHeader);
      const newTitle = document.createElement('h4');
      newTitle.innerText = myAssignments[i].name;
      newHeader.appendChild(newTitle);
      const newDueDate = document.createElement('p');
      newDueDate.innerText = "Due " + myAssignments[i].due.slice(0,10);
      newHeader.appendChild(newDueDate);
      const newCompletion = document.createElement('p');
      newCompletion.id = myAssignments[i].aid
      newCompletion.innerText = "Progress:\n"
      newHeader.appendChild(newCompletion);

      assignmentBox.appendChild(newCardContainer);
    }
  }).then(() => {
      fetch("/api/student/login").then((res) => {
        if (res.status === 200) {
          return res.json()
        } else {
          alert("Could not get current user")
        }
      }).then((json) => {
        user = json.user
        return json.user
      }).then((currentUser) => {
        fetch("/api/students/" + currentUser).then((res) => {
          if (res.status === 200) {
            return res.json()
          } else {
            alert ("Could not get current user")
          }
        }).then((json) => {
          grades = json.assignments
          return 0
        }).then(() => {
          myAssignments.map((a) => {
            document.getElementById(a.aid).innerText += grades[a.aid]
          })
        })
      })
    })
}

// get current assignments - requires server call
getAssignments()