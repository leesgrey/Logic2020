"use strict";

// get DOM elements
const questions = document.getElementsByClassName('questionLink');
const assignmentName = document.querySelector("#assignmentName");
const assignmentDate = document.querySelector("#assignmentDate")
const allList = document.querySelector("#allQuestions")
let assignmentQuestions = []
let allQuestions = []

// parse ending
const mode = window.location.href.split('/').pop()

if (mode === "new") {

} else {
  getAssignment()
}

getAllQuestions()

function getAssignment() {
  const url = ("/api/ass/" + mode)

  fetch(url).then((res) => {
    if (res.status === 200) {
      return res.json()
    } else {
      alert("Could not load assignment")
    }
  }).then((json) => {
    assignmentName.value = json.name
    assignmentQuestions = json.questions
    assignmentDate.value = json.due.slice(0, 10)
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
    console.log(allQuestions)
    updateQuestions()
  })
}

function updateQuestions() {
  allQuestions.map( (q) => {
    console.log("fjkda")
    const newLink = document.createElement('a')
    newLink.classList.add("questionLink")
    newLink.innerHTML = `<li class="questionListItem"><p class="red-txt">` + q.qid+ `</p><p class="questionPreviewText sm-txt">` + q.question + `</p></li>`
    allList.appendChild(newLink)
  })
}

/*
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

function addQuestion(id) {
  const q = document.getElementById(id);
  const qt = q.children[0].children[0].innerText;
  const qd = q.children[0].children[1].innerText;
  const content = '<div id="selected_'+id+'" class="selectedQuestion"><li class="selectedQuestionListItem"><p class="red-txt">'+ qt +'</p><p class="questionPreviewText sm-txt">'+qd+'</p></li><a class="closeButton removeSelectedQuestionBtn" href="javascript: removeQuestion(\''+id+'\');"></a></div>';
  document.getElementById('selectedQuestionList').innerHTML += content;
}

function removeQuestion(id) {
  const sq = document.getElementById("selected_"+id);
  sq.parentNode.removeChild(sq);
  const selected_q = document.getElementById('selected_' + id);
  const q = document.getElementById(id);
  q.children[0].classList.remove("done");
}
*/