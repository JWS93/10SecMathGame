$(document).ready (function () {
  var timeleft = 0;
  var score = 0;
  var answer = 0;
  var solution = 0;
  var highScore = 0;
  $('#highScore').html("Today's High Score: " + highScore);

  var generateProblem = function () {
    var numOne = function (min, max) {
      min = parseInt($('#chooseMin').val());
      max = parseInt($('#chooseMax').val());
      var numberOne = Math.floor(Math.random() * (max - min + 1)) + min;
      return numberOne;
    }
    var numTwo = function (min, max) {
      min = parseInt($('#chooseMin').val());
      max = parseInt($('#chooseMax').val());
      var numberTwo = Math.floor(Math.random() * (max - min + 1)) + min;
      return numberTwo
    }
    var numberOne = numOne();
    var numberTwo = numTwo();
    $('#displayProblem').html('problem: ' + numberOne + '+' + numberTwo);
    solution = numberOne + numberTwo;
  }

  var startTimer = function () {
    timeleft = 10;
    var downloadTimer = setInterval(function(){
      if(timeleft <= 0){
        clearInterval(downloadTimer);
        $('#displayTimer').html("Game Over. Final Score: " + score);
      } else {
        $('#displayTimer').html(timeleft + " seconds remaining");
      }
      timeleft -= 1;
    }, 1000);
  }

  var gameOver = function () {
    window.clearInterval();
    timeleft = 0;
    timer = null;
    solution = 0;
    $('#answer').val('');
    $('#displayTimer').html("Game Over. Final Score: " + score);
    $('#playAgain').removeClass('d-none');
  }

  var playGame = function () {
    score = 0;
    startTimer();
    generateProblem();
    $('#currentScore').html('Current Score: ' + score);
    $('#playAgain').addClass('d-none');
    $(document).on('click', '#submit', function (event) {
      event.preventDefault();
      answer = parseInt($('#answer').val());
      if (timeleft > 0 && answer === solution) {
        $('#answer').val('');
        generateProblem();
        timeleft ++;
        score ++;
        $('#currentScore').html('Current Score: ' + score)
      } else if (timeleft <= 0) {
        gameOver();
        $('#displayTimer').html("Game Over. Final Score: " + score);
        $('#answer').val('');
        if (score >= highScore) {
          highScore = score;
          $('#highScore').html("Today's High Score: " + highScore);
        }
      }
      else if (answer !== solution) {
        gameOver();
        $('#displayTimer').html("Game Over. Final Score: " + score);
        $('#answer').val('');
        if (score >= highScore) {
          highScore = score;
          $('#highScore').html("Today's High Score: " + highScore);
        }
      }
    })
  }
  
  $(document).on('click', '.start', function () {
    playGame();
  })

  $(document).on('click', '#playAgain', function () {
    playGame()

  })

});