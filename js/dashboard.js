"use strict";

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

// get current assignments - requires server call
myAssignments.push(new Assignment('A1', 'October 16, 2019 23:59', [1,2]));

// create card for each assignment
for (let i = 0; i < myAssignments.length; i++){
  const newCardContainer = document.createElement('div');
  newCardContainer.classList.add('flex-item');
  const newLink = document.createElement('a');
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
