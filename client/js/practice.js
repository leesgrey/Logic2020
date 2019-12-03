"use strict";

// get DOM elements
const questions = document.getElementsByClassName('questionLink');
const assignmentName = document.querySelector("#assignmentName")

// parse ending
const mode = window.location.href.split('/').pop()

if (mode === "new") {

} else {
  getAssignment()
}

function getAssignment() {
  const url = ("/api/ass/" + mode)

  fetch(url).then((res) => {
    if (res.status === 200) {
      return res.json()
    } else {
      alert("Could not load assignment")
    }
  }).then((json) => {
    assignmentName.innerText = json.name
  })
}

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
