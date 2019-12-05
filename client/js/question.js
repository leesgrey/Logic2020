let questionAnswer = ""
let myAssignments = []
let currentAid = ""
let currentAssignment = {}
let questionTexts = []
let user = ""
let currentUser = {}

// ID of currently displayed question
curURL = window.location.href.split('/')
currentQuestion = curURL.pop();
currentAid = curURL.pop();

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
  return 0
}).then(() => {
  fetch("/api/students/" + user).then((res) => {
    if (res.status === 200) {
      return res.json()
    } else {
      alert("Could not get current user")
    }
  }).then((json) => {
    currentUser = json
  }).then(() => {
    getQuestion()
    getAssignments()
    return 0
  }).then(() => {
    assignmentCompletion.innerText = currentUser.assignments[currentAid]
    setTimeout(0, updateStudent)
  })
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
      displayAssignment(currentAid)
      /*
      for (let i = 0; i < myAssignments.length; i++) {
        if (myAssignments[i].aid === curAssignment) {
          displayAssignment(i);
          break;
        }
      }
      */
    }
  });
}

function displayAssignment(position){
  const thisA = myAssignments[position];

  assignmentTitle.innerText = thisA.name;
  const due = new Date(thisA.due);
  let formattedDate = `${due.getFullYear()}/${due.getMonth()}/${due.getDate()} 23:59`;
  assignmentDue.innerText = formattedDate;
  questionList.innerHTML = "";

  // fetching solutions
  const solutionUrl = "/api/students/" + user;
  fetch(solutionUrl).then((res) => {
    if (res.status === 200) {
      return res.json()
    } else {
      alert('Could not get solution question');
    }
  }).then((json) => {
    // for each question, add to sidebar - requires server calls
    for (let i = 0; i < thisA.questions.length; i++){
      const questionUrl = `/practice/${currentAid}/${thisA.questions[i]}`;

      newQuestion = document.createElement('a');
      newQuestion.href = questionUrl;
      let done = "";
      let answer;

      if (thisA.questions[i] in json.solutions){
        if (thisA.questions[i] === currentQuestion) {
          answerInput.value = json.solutions[thisA.questions[i]]
        }
        done = 'done';
      }
      const innerSidebar = `
      <li id=${thisA.questions[i]} class="questionListItem ${done}">
        <p class="cyan-txt">${thisA.questions[i]}</p>
      </li>
      `;

      newQuestion.innerHTML = innerSidebar;
      questionList.append(newQuestion);

      // fetch(questionUrl).then((res) => {
      //   if (res.status === 200) {
      //     return res.json()
      //   } else {
      //     alert('Could not get assignment question')
      //   }
      // }).then((json) => {
      //   newQuestion = document.createElement('li');
      //   newQuestion.classList.add('questionListItem');
      //   newQuestionType = document.createElement('p');
      //   newQuestionType.classList.add('cyan-txt');
      //   newQuestionType.innerText = json.qid
      //   newQuestion.appendChild(newQuestionType);
      //   newPreview = document.createElement('p');
      //   newPreview.classList.add('questionPreviewText');
      //   newPreview.classList.add('sm-txt');
      //   newPreview.innerText = questions[myAssignments[0].questions[i]];
      //   newQuestion.appendChild(newPreview);
      //   /*
      //   if (questions[myAssignments[0].questions[i]].completed){
      //     newQuestion.classList.add('done');
      //   }
      //   newQuestion.addEventListener('click', function(){
      //     updateQuestion(i)
      //   });
      //   */
      //   questionList.append(newQuestion);
      // })
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

    if (!(currentQuestion in currentUser.solutions)) {
      currentUser.solutions[currentQuestion] = questionAnswer
      window.setTimeout(updateStudent, 0);
    }
    document.getElementById(currentQuestion).classList.add("done")
  }
  else {
    feedbackText.className = "";
    feedbackText.innerText = "Incorrect, please try again.";
    feedbackText.classList.add("pink-txt");
  }
  feedbackText.style.display = "block";
}

function wrapper() {

  return 0
}

function updateStudent(){
<<<<<<< HEAD
=======
  console.log("here")
>>>>>>> fd31587a62849ec12a60a52b0b760ecb9852727b
  const studentUrl = ("/api/students/" + user)

  const request = new Request(studentUrl, {
    method: 'put',
    body: JSON.stringify(currentUser),
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
  });

  console.log("here again")

  fetch(request).then(function(res) {
    if (res.status === 200) {
      return res.json()
      alert("Yeet")
    } else {
      alert("Bad")
    }
  }).then((json) => {
    console.log(json.currentAid)
    assignmentCompletion.innerText = json.currentAid
  })
  console.log("finished update")
}

answerInput.addEventListener("keyup", event => {
  if (event.isComposing || event.keyCode === 229) {
    return;
  }
  feedbackText.style.display = "none";
});
