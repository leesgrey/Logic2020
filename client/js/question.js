let questionAnswer = ""
let myAssignments = []

// ID of currently displayed question
currentQuestion = window.location.href.split('/').pop()
console.log(currentQuestion)

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

// get question text and answer, should get from server
function getQuestion() {
  const url = '/api/questions/' + currentQuestion
  console.log(url)

  fetch(url).then((res) => {
    if (res.status === 200) {
      return res.json()
    } else {
      alert('Could not get question')
    }
  }).then((json) => {
    console.log(json)
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
    myAssignments = json
    console.log(json)
    if (myAssignments.length == 0){
      assignmentSidebar.style.display = "none";
    } else {
      displayAssignment(myAssignments[0].aid)
    }
  })
}

function displayAssignment(aid){
  assignmentTitle.innerText = myAssignments[aid].name;
  // assignmentDue.innerText = myAssignments[aid].dueDateTime;
  // assignmentCompletion.innerText = (myAssignments[0].completed / myAssignments[0].total).toFixed(2) * 100 + '%';
  questionList.innerHTML = "";
  // for each question, add to sidebar - requires server calls
  for (let i = 0; i < myAssignments[aid].questions.length; i++){
    const questionUrl = '/api/questions/' + myAssignments[aid].questions[i]
    console.log(questionUrl)

    fetch(questionUrl).then((res) => {
      if (res.status === 200) {
        return res.json()
      } else {
        alert('Could not get assignment question')
      }
    }).then((json) => {
      console.log(json)
      newQuestion = document.createElement('li');
      newQuestion.classList.add('questionListItem');
      newQuestionType = document.createElement('p');
      newQuestionType.classList.add('cyan-txt');
      newQuestionType.innerText = json.qid
      newQuestion.appendChild(newQuestionType);
      newPreview = document.createElement('p');
      newPreview.classList.add('questionPreviewText');
      newPreview.classList.add('sm-txt');
      newPreview.innerText = questions[myAssignments[0].questions[i]];
      newQuestion.appendChild(newPreview);
      /*
      if (questions[myAssignments[0].questions[i]].completed){
        newQuestion.classList.add('done');
      }
      newQuestion.addEventListener('click', function(){
        updateQuestion(i)
      });
      */
      questionList.append(newQuestion);
    })
  }
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

  document.getElementById('questionTitleContainer').appendChild(div);
}

function checkAnswer(){
  if (answerInput.value.toLowerCase() == questionAnswer){
    feedbackText.className = "";
    feedbackText.classList.add("mint-txt");
    feedbackText.innerText = "Correct!";
    /* if (!questions[currentQuestion].completed){
      questions[currentQuestion].completed = true;
      myAssignments[0].completed++;
      updateAssignment();
    }
    */
  }
  else {
    feedbackText.className = "";
    feedbackText.innerText = "Incorrect, please try again.";
    feedbackText.classList.add("pink-txt");
  }
  feedbackText.style.display = "block";
}

//updateQuestion(0);
//updateAssignment();

getQuestion()
getAssignments()

answerInput.addEventListener("keyup", event => {
  if (event.isComposing || event.keyCode === 229) {
    return;
  }
  feedbackText.style.display = "none";
});
