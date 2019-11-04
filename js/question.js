const myAssignments = []
const questions = [];

// ID of currently displayed question 
let currentQuestion = 0;

class Question {
  constructor(title, HTML, answer, category, answerPrompt, completed){
    this.title = title;
    this.HTML = HTML;
    this.answer = answer;
    this.category = category;
    this.answerPrompt = answerPrompt;
    this.completed = completed;
  }
}

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

// get number of assignments, should get from server
let numberOfAssignments = 0;

// get question text and answer, should get from server 
const HTML1 = "<p class='questionTitle'> W → X. </p>"
                   + "<p class='questionTitle'> ~X. </p>" 
                   + "<div class='h-line'> </div>"
                   + "<p class='questionTitle'> ∴~W </p>" 
const HTML2 = "<p class='questionTitle'> P → P. </p>"
            + "<p class='questionTitle'> P </p>"
            + "<div class='h-line'></div>"
            + "<p class='questionTitle'> P </p>"

questions.push(new Question('W → X.  ~X.  ∴~W', HTML1, "mt", "RECOG 1.003", "Enter the rules that apply:", false));
questions.push(new Question('P → P.  P.  ∴P', HTML2, "mp", "RECOG 1.004", "Enter the rules that apply:", false));


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

// add event listeners
submitButton.addEventListener('click', checkAnswer);

// get user assignments, requires server call
myAssignments.push(new Assignment('A1', 'October 16, 2019 23:59', [0, 1]));

// if no assignments, hide side
if (myAssignments.length == 0){
  assignmentSidebar.style.display = "none";
}

// update question details
function updateQuestion(index){
  currentQuestion = index;
  questionDisplay.innerHTML = questions[currentQuestion].HTML;
  questionTitleDisplay.innerText = questions[currentQuestion].title;
  questionCategoryDisplay.innerText = questions[currentQuestion].category;
  questionPromptDisplay.innerText = questions[currentQuestion].answerPrompt;
  answerInput.value = "";
  feedbackText.style.display = "none";
  updateAssignment();
}

function updateAssignment(){
  assignmentTitle.innerText = myAssignments[0].title;
  assignmentDue.innerText = myAssignments[0].dueDateTime;
  assignmentCompletion.innerText = (myAssignments[0].completed / myAssignments[0].total).toFixed(2) * 100 + '%';
  questionList.innerHTML = "";
  // for each question, add to sidebar - requires server calls
  for (let i = 0; i < myAssignments[0].questions.length; i++){
    newQuestion = document.createElement('li');
    newQuestion.classList.add('questionListItem');
    newQuestionType = document.createElement('p');
    newQuestionType.classList.add('cyan-txt');
    newQuestionType.innerText = questions[myAssignments[0].questions[i]].category
    newQuestion.appendChild(newQuestionType);
    newPreview = document.createElement('p');
    newPreview.classList.add('questionPreviewText');
    newPreview.classList.add('sm-txt');
    newPreview.innerText = questions[myAssignments[0].questions[i]].title;
    newQuestion.appendChild(newPreview);
    if (questions[myAssignments[0].questions[i]].completed){
      newQuestion.classList.add('done');
    }
    newQuestion.addEventListener('click', function(){
      updateQuestion(i)
    });
    questionList.append(newQuestion);
  }
}

function checkAnswer(){
  if (answerInput.value.toLowerCase() == questions[currentQuestion].answer){
    feedbackText.className = "";
    feedbackText.classList.add("mint-txt");
    feedbackText.innerText = "Correct!";
    if (!questions[currentQuestion].completed){
      questions[currentQuestion].completed = true;
      myAssignments[0].completed++;
      updateAssignment();
    }
  }
  else {
    feedbackText.className = "";
    feedbackText.innerText = "Incorrect, please try again.";
    feedbackText.classList.add("pink-txt");
  }
  feedbackText.style.display = "block";
}

updateQuestion(0);
updateAssignment();


answerInput.addEventListener("keyup", event => {
  if (event.isComposing || event.keyCode === 229) {
    return;
  }
  feedbackText.style.display = "none";
});
