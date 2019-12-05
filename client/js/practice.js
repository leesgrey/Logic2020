"use strict";

// get DOM elements
const questions = document.getElementsByClassName('questionLink');
const assignmentName = document.querySelector("#assignmentName");
const assignmentDate = document.querySelector("#assignmentDate")
const allList = document.querySelector("#allQuestions")
let assignmentCount = 0
let assignmentQuestions = []
let unsavedAssignmentQuestions = []
let allQuestions = []

// parse ending
const mode = window.location.href.split('/').pop()

function getAssignment(mode) {
  const url = "/api/ass/" + mode
  fetch(url).then((res) => {
    if (res.status === 200) {
      return res.json()
    } else {
      alert("Could not load assignment")
    }
  }).then((json) => {
    if (mode === ""){
      assignmentCount = json.length
    } else {
      assignmentName.value = json.name
      assignmentQuestions = json.questions
      assignmentDate.value = json.due.slice(0, 10)
      setTimeout(loadAssignmentQuestions, 10)
    }
  })
}

function getAllQuestions() {
  const url = ("/api/questions")

  fetch(url).then((res) => {
    if (res.status === 200) {
      return res.json()
    } else {
      alert("Could not load questions")
    }
  }).then((json) => {
    allQuestions = json
    showQuestions();
  })
}

function showQuestions() {
  // Building a list of all questions
  var promise = new Promise(function(resolve, reject) {
    allQuestions.map((q) => {
      const newLink = document.createElement('div')
      newLink.innerHTML = `<a id="${q.qid}" class="questionLink">
      <li class="questionListItem">
        <p class="cyan-txt">${q.qid}</p>
        <p class="questionPreviewText sm-txt">${q.question}</p>
      </li></a>`;
      allList.appendChild(newLink.children[0]);
    });
    resolve(1);
  });

  // Going through and
  promise.then(function(val) {
    // get DOM elements
    const questions = document.getElementsByClassName('questionLink');

    // Add questionLink
    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      question.onclick = function() {
        if (question.children[0].classList.contains("done")) {
          removeQuestion(question.id);
        } else {
          addQuestion(question.id);
          question.children[0].classList.add("done");
        }
      }
    }
  });

}

function loadAssignmentQuestions() {
  assignmentQuestions.map( (q) => {
    addQuestion(q);
  })
}

function addQuestion(id) {
  const q = document.getElementById(id);
  const qt = q.children[0].children[0].innerText;
  const newDiv = document.createElement("div")
  newDiv.innerHTML = `<div id="selected_${id}">
    <li class="selectedQuestionListItem">
      <p class="cyan-txt">${qt}</p>
      <a class="closeButton removeSelectedQuestionBtn" href="javascript: removeQuestion('${id}')"></a>
    </li>
  <div>`;
  document.getElementById('selectedQuestionList').appendChild(newDiv.children[0]);
  document.getElementById(id).children[0].classList.add("done");

  unsavedAssignmentQuestions.push(id);
}

function removeQuestion(id) {
  const sq = document.getElementById("selected_"+id);
  sq.parentNode.removeChild(sq);
  const selected_q = document.getElementById('selected_' + id);
  const q = document.getElementById(id);
  q.children[0].classList.remove("done");

  unsavedAssignmentQuestions = unsavedAssignmentQuestions.filter(qid => qid != id);
}

function updateAssignment(e) {
  e.preventDefault()
  let request = null;
  console.log("date:" + assignmentDate.value);
  const ddate = new Date(assignmentDate.value);
  console.log("ddddate:" + ddate);
  let data = {
    "name": assignmentName.value,
    "question": unsavedAssignmentQuestions,
    "aid": mode === "new" ? assignmentCount : mode,
    "due": ddate
  };

  let url = "";
  if (mode === "new") {
    url = "/api/ass";
  } else {
    url = "/api/ass/" + mode;
  }

  request = new Request(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
  })

  fetch(request).then(function(res) {
    if (res.status === 200) {
      alert("Assignment created!")
      window.location.href = "/admin/dashboard";
    } else {
      alert("Could not add assignment")
    }
  })
}


// ----------- Main -----------
getAllQuestions();

if (mode==="new") {
  getAssignment("");
} else {
  getAssignment(mode);
}
updateAssignmentButton.addEventListener("click", updateAssignment);
