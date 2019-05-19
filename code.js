// progress
let questionNumber = 0;
// score
let score = 0;

// quiz started
//check if start quizz button clicked
function startQuiz() {
    $(document).on('click', '.coverPage button', function (event) {
        
        removeCover();
        displayScoreBoard();
        //display question box
        $('.questionBox').css('display', 'block');
        
    });
}
//remove the cover page text
function removeCover() {
    //removing cover page
    $('.coverPage').remove();
}
//display question box to start the quiz
function displayScoreBoard() {
    $('.board').css('display', 'block');
}
//update score board to the new number
function updateScoreBoard() {
    score++;
    $('#score').text(score);
}
//generate a question for the user
function generateQuestion() {
    if (questionNumber < STORE.length) {
        return `<div class="questions">
     <h2>${STORE[questionNumber].question}</h2>
     <div class="pictureContainer">
      <img src="${STORE[questionNumber].picture}" alt="${STORE[questionNumber].alt}">
     </div>
     <form>
        <fieldset>
          <label class="answerOption first-answer">
            <input type="radio" value="${STORE[questionNumber].answers[0]}" name="answer">
            <span>${STORE[questionNumber].answers[0]}</span>
          </label>

          <label class="answerOption second-answer">
            <input type="radio" value="${STORE[questionNumber].answers[1]}" name="answer">
            <span>${STORE[questionNumber].answers[1]}</span>
          </label>

          <label class="answerOption third-answer">
            <input type="radio" value="${STORE[questionNumber].answers[2]}" name="answer">
            <span>${STORE[questionNumber].answers[2]}</span>
          </label>

          <label class="answerOption fourth-answer">
            <input type="radio" value="${STORE[questionNumber].answers[3]}" name="answer">
            <span>${STORE[questionNumber].answers[3]}</span>
          </label>

        </fieldset>
        <button type="submit" class="submitbtn">Check Answer</button>
     </form>
     </div>`;
    } else {
        renderEndOfQuizPanel();
        restartQuiz();
    }

}

//render the generated question
function renderQuestion() {
    $('.questionBox').html(generateQuestion());
}

//submit clicked
//check if answer is correct
function getUserAnswer() {
    $(document).on('submit', 'form', function (event) {
        event.preventDefault();
        let selected = $('input:checked');
        let answer = selected.val();
        let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
        if (answer === correctAnswer) {
            //remove previous question
            $('.questions').remove();
            feedbackCorrect();
            updateScoreBoard();
        } else {
            //remove previous question
            $('.questions').remove();
            feedbackWrong();
        }
    });
}
//increase score
function updateScoreBoard() {
    score++;
    $('#score').text(score);
}
//increase question remaining
function updateQuestion() {
    if(questionNumber+1 != 10){
        questionNumber++;
        $('#remaining').text(questionNumber + 1);
    }
    

}



//feedback if the answer is correct.
//let them know more info on the question also
function feedbackCorrect() {
    let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
    let fact = `${STORE[questionNumber].fact}`;
    $('.questionBox').append(`<div class="feedback">
  <h1 id="corrctIncorect">Correct</h1>
  <h2>The correct answer is: </h2>
  <h2>${correctAnswer}</h2>
  <h3>Fact:</h3>
  <h3>${fact}</h3>
  <button class="next-btn">Next Question</button>
  </div>`);
}

//feedback for getting feedback on the wrong answer
function feedbackWrong() {
    let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
    let fact = `${STORE[questionNumber].fact}`;
    $('.questionBox').append(`<div class="feedback">
  <h1 id="corrctIncorect">Incorrect</h1>
  <h2>The correct answer is: </h2>
  <h2>${correctAnswer}</h2>
  <h3>Fact:</h3>
  <h3>${fact}</h3>
  <button class="next-btn">Next Question</button>
  </div>`);
}

//get new question
function next() {

    $(document).on('click', '.next-btn', function () {
        //remove feedback
        $('.feedback').remove();
        //update question remaining
        updateQuestion();
        //generate new question
        renderQuestion();
    });
}

//end of quiz review
function endOfQuizPanel(passFail, comment) {
    return `<div class="review">
          <h1>Review</h1>
          <h2 class="passFail">${passFail}</h2>
          <p>Final Score: <span id="finalScore">${score}</span>/10</p>
          <p><span class="comments">${comment}</span></p>
          <button class="restart">Restart</button>
        </div>`;
}

//render end of quiz panel check if passed and add comment
function renderEndOfQuizPanel() {
    const pass = 'Passed Quiz';
    const fail = 'Failed Quiz';
    const passComment = "Great Job! You really know your geography";
    const failComment = "Better luck next time. Do some review and try again";
    if (score >= 7) {
        $('main').append(endOfQuizPanel(pass, passComment));
    } else {
        $('main').append(endOfQuizPanel(fail, failComment));
    }
}

//restart quiz
function restartQuiz() {
    $(document).on('click', '.restart', function () {
        location.reload();
    });
}


// display answers and mark correct and incorrect
//reset button
function createQuiz() {
    startQuiz();
    renderQuestion();
    getUserAnswer();
    next();
}

(function () {
    //start quiz
    $(createQuiz);

}());