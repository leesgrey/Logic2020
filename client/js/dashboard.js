"use strict";
const API_URL = 'http://localhost:5000'

// get DOM elements
const assignmentBox = document.querySelector('#assignments');
const myAssignments = [];
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
  const url = API_URL + '/ass'
  fetch(url).then((res) => {
    if (res.status == 200){
      return res.json()
    } else {
      alert('Could not get assignments')
    }
  }).then((json) => {
    console.log(json)
  })
}

getAssignments()

// get current assignments - requires server call
myAssignments.push(new Assignment('A1', 'October 16, 2019 23:59', [1,2]));

// create card for each assignment
for (let i = 0; i < myAssignments.length; i++){
  const newCardContainer = document.createElement('div');
  newCardContainer.classList.add('flex-item');
  const newLink = document.createElement('a');
  newLink.href = "./practice.html"
  newCardContainer.appendChild(newLink);
  const newCard = document.createElement('div');
  newCard.classList.add('card--h');
  newLink.appendChild(newCard);
  const newHeader = document.createElement('div');
  newHeader.classList.add('card__header');
  newCard.appendChild(newHeader);
  const newTitle = document.createElement('h4');
  newTitle.innerText = myAssignments[i].title;
  newHeader.appendChild(newTitle);
  const newDueDate = document.createElement('p');
  newDueDate.innerText = "Due " + myAssignments[i].dueDateTime;
  newHeader.appendChild(newDueDate);
  const newCompletion = document.createElement('p');
  newCompletion.innerText = myAssignments[i].completed / myAssignments[i].total + "% completed"
  newHeader.appendChild(newCompletion);

  assignmentBox.appendChild(newCardContainer);
}
