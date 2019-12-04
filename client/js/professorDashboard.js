// DOM elements
const courseCode = document.querySelector("#courseCode")
const assignmentBox = document.querySelector("#assignments")

let myAssignments = []
/*
// get Course
function getCourse() {
}
*/

// get Assignments
function getAssignments() {
  const url = "/api/ass"

  fetch(url).then((res) => {
    if (res.status === 200) {
      return res.json()
    } else {
      alert("Could not load assignments")
    }
  }).then((json) => {
     console.log(json)
      myAssignments = json

      assignmentBox.innerHTML = '';
      for (let i = 0; i < myAssignments.length; i++){
        const newCardContainer = document.createElement('div');
        newCardContainer.classList.add('flex-item');
        const newLink = document.createElement('a');
        newLink.href = "/admin/assignment/" + myAssignments[i].aid
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
        newDueDate.innerText = "Due " + myAssignments[i].due.slice(0, 10);
        newHeader.appendChild(newDueDate);
    //    const newCompletion = document.createElement('p');
    //    newCompletion.innerText = myAssignments[i].completed / myAssignments[i].total + "% completed"
    //    newHeader.appendChild(newCompletion);

        assignmentBox.appendChild(newCardContainer);
        }
  })
}

getAssignments()