let questionAnswer = ""
let myAssignments = []
let currentAid = ""
let currentAssignment = {}
let questionTexts = []
let studentAnswered = []

// ID of currently displayed question
curURL = window.location.href.split('/')
currentQuestion = curURL.pop();
curAssignment = curURL.pop();

// get DOM elements
const assignmentTitle = document.querySelector('#assignmentTitle');
const assignmentDue = document.querySelector('#assignmentDue');
const assignmentCompletion = document.querySelector('#assignmentCompletion');
const assignmentSidebar = document.querySelector('.sideCol');
const questionList = document.querySelector('#questions');
const answerInput = document.querySelector('#answer');
const submitButton = document.querySelector('#submitButton');

const questionDisplay = document.querySelector('.formalStructure');
const questionTitleDisplay = document.querySelector('#questionTitle');
const questionCategoryDisplay = document.querySelector('#questionCategory');
const questionPromptDisplay = document.querySelector('#questionPrompt');

const feedbackText = document.querySelector('#feedback');

let user = ""

fetch('/api/student/login').then((res) => {
  if (res.status === 200) {
    return res.json()
  }
  else {
    alert ("could not get current user")
  }
}).then((json) => {
  user = json["user"]
  return 0
}).then(() => {
  console.log(user)
})


// get question text and answer, should get from server
function getQuestion() {
  const url = '/api/questions/' + currentQuestion

  fetch(url).then((res) => {
    if (res.status === 200) {
      return res.json()
    } else {
      alert('Could not get question')
    }
  }).then((json) => {
    // questionDisplay.innerText =
    questionTitleDisplay.innerText = json.question;
    questionCategoryDisplay.innerText = json.qid;
    questionPromptDisplay.innerText = getForQuestionType(json.qid, json.question);
    answerInput.value = "";
    feedbackText.style.display = "none";
    questionAnswer = json.answer;
  })
}

// add event listeners
submitButton.addEventListener('click', checkAnswer);

// get user assignments, requires server call
function getAssignments() {
  const url = '/api/ass'

  fetch(url).then((res) => {
    if (res.status === 200) {
      return res.json()
    } else {
      alert('Could not get assignments')
    }
  }).then((json) => {
    myAssignments = json;
    if (myAssignments.length == 0 || currentAid == "practice") {
      assignmentSidebar.style.display = "none";
    } else {
      // displayAssignment(myAssignments[0].aid)
      for (let i = 0; i < myAssignments.length; i++) {
        if (myAssignments[i].aid === curAssignment) {
          displayAssignment(i);
          break;
        }
      }
    }
  });
}

function displayAssignment(position){
  const thisA = myAssignments[position];
  assignmentTitle.innerText = thisA.name;
  const due = new Date(thisA.due);
  let formattedDate = `${due.getFullYear()}/${due.getMonth()}/${due.getDate()} 23:59`;
  assignmentDue.innerText = formattedDate;
  // assignmentCompletion.innerText = (myAssignments[0].completed / myAssignments[0].total).toFixed(2) * 100 + '%';
  questionList.innerHTML = "";

  // fetching student's answered
  const studentUrl = "/api/students/" + user;
  fetch(studentUrl).then((res) => {
    if (res.status === 200) {
      console.log(res)
      return res.json()
    } else {
      alert('Could not get student');
    }
  }).then((json) => {
    json.solved = studentAnswered
    return json
  }).then((json) =>
    // for each question, add to sidebar - requires server calls
    for (let i = 0; i < thisA.questions.length; i++){
      const questionUrl = `/practice/${curAssignment}/${thisA.questions[i]}`;
      console.log(questionUrl)

      newQuestion = document.createElement('a');
      newQuestion.href = questionUrl;
      let done = "";
      let answer;
      // if question is in user's answered, mark as done
      console.log("questions:")
      console.log(thisA.questions)
      if (thisA.questions[i] in studentAnswered){
        done = 'done'
      }
/*
      try {
        for (let j = 0; j < json.solutions.length; j++){
          console.log("here");
          // if question is in user's answered, change done
          if (json.solutions[j].qid === thisA.questions[i]) {
            if (json.solutions[j].answer != ""){
              console.log("here2");
              done = 'done';
              if (json.solutions[j].qid === currentQuestion){
                answerInput.value = json.solutions[j].answer;
              }
            }
            break;
          }
        }
      } catch (error) {
        console.log("error");
      }
      */

      const innerSidebar = `
      <li class="questionListItem ${done}">
        <p class="cyan-txt">${thisA.questions[i]}</p>
      </li>
      `;

      newQuestion.innerHTML = innerSidebar;
      questionList.append(newQuestion);
    }
  });
}

function getForQuestionType(qid, q) {
  switch (qid.slice(0, 1)) {
    case "R":
      parseToFormalStructure(q);
      return "Enter the correct rule (MP, MT, DN, R or None):";
    default:
      return "";
  }
}

function parseToFormalStructure(question) {
  const list = question.split(/(?<=\.)/g);
  const div = document.createElement('div');
  div.className = 'formalStructureContainer';

  let formatted = `<div class="formalStructure">`;
  for (let i = 0; i < list.length - 1; i++) {
    formatted += `<p class="questionTitle">${list[i]}</p>`;
  }
  formatted += `<div class="h-line"></div>`;
  formatted += `<p class="questionTitle">${list[list.length-1]}</p>`;
  div.innerHTML = formatted;

  const qDetails = document.getElementById('questionDetails');
  qDetails.innerHTML = "";
  qDetails.appendChild(div);
}

function checkAnswer(){
  if (answerInput.value.toLowerCase() == questionAnswer){
    feedbackText.className = "";
    feedbackText.classList.add("mint-txt");
    feedbackText.innerText = "Correct!";
  }
  else {
    feedbackText.className = "";
    feedbackText.innerText = "Incorrect, please try again.";
    feedbackText.classList.add("pink-txt");
  }
  feedbackText.style.display = "block";
}

getQuestion()
getAssignments()

answerInput.addEventListener("keyup", event => {
  if (event.isComposing || event.keyCode === 229) {
    return;
  }
  feedbackText.style.display = "none";
});
