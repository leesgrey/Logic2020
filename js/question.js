const myAssignments = []

// get current quetion, requires server call
const currentQuestion = 0;

// below question and assignment info replaces question server calls
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
const questions = [];

// get number of assignments, requires server call
let numberOfAssignments = 0;

// get question text and answer, requires server call
const questionTitle = 'W → X.  ~X.  ∴~W';
const questionHTML = "<p class='questionTitle'> W → X. </p>"
                   + "<p class='questionTitle'> ~X. </p>" 
                   + "<div class='h-line'> </div>"
                   + "<p class='questionTitle'> ∴~W </p>" 
const questionAnswer = "mt";
const questionCategory = "RECOG 1.003";
const questionPrompt = "Enter the rules that apply:";

questions.push(new Question(questionTitle, questionHTML, questionAnswer, questionCategory, questionPrompt, false));
questions.push(new Question('The Bruins fail to win', questionHTML, questionAnswer, "SYMB 1.001", questionPrompt, false));

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
questionDisplay.innerHTML = questions[currentQuestion].HTML;
questionTitleDisplay.innerText = questions[currentQuestion].title;
questionCategoryDisplay.innerText = questions[currentQuestion].category;
questionPromptDisplay.innerText = questions[currentQuestion].answerPrompt;

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
    if (myAssignments[0].questions[i] == currentQuestion){
      newQuestionType.classList.add('cyan-txt');
    }
    else {
      newQuestionType.classList.add('red-txt');
    }
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
    questionList.append(newQuestion);
  }
}

function checkAnswer(){
  if (answerInput.value.toLowerCase() == questionAnswer){
    feedbackText.innerText = "Correct!"
    questions[currentQuestion].completed = true;
    myAssignments[0].completed++;
    updateAssignment();
  }
  else {
    feedbackText.innerText = "Incorrect, please try again.";
  }
  feedbackText.style.display = "block";
}

updateAssignment();
