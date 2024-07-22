$(document).ready (function () {
  var timeleft = 0;
  var score = 0;
  var answer = 0;
  var solution = 0;
  var highScore = 0;
  $('#highScore').html("Today's High Score: " + highScore);

  var generateProblem = function (min, max) {
    min = parseInt($('#chooseMin').val());
    max = parseInt($('#chooseMax').val());
    var numberOne = Math.floor(Math.random() * (max - min + 1)) + min;
    var numberTwo = Math.floor(Math.random() * (max - min + 1)) + min;
    $('#displayProblem').html('problem: ' + numberOne + '+' + numberTwo);
    solution = numberOne + numberTwo;
  }

  var startTimer = function () {
    timeleft = 10;
    var downloadTimer = setInterval(function(){
      if(timeleft <= 0){
        clearInterval(downloadTimer);
        gameOver();
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
    if (score >= highScore) {
      highScore = score;
      $('#highScore').html("Today's High Score: " + highScore);
    }
    $('#answer').val('');
    $('#playAgain').removeClass('d-none');
    $('#displayTimer').html("Game Over. Final Score: " + score);
    $('#highScore').html("Today's High Score: " + highScore);
  }

  var playGame = function () {
    score = 0;
    startTimer();
    generateProblem();
    $('#currentScore').html('Current Score: ' + score);
    $(document).on('click', '#submit', function (event) {
      event.preventDefault();
      answer = parseInt($('#answer').val());
      if (timeleft > 0 && answer === solution) {
        $('#answer').val('');
        generateProblem();
        timeleft ++;
        score ++;
        $('#currentScore').html('Current Score: ' + score);
      }
      if (timeleft === 0) {
        gameOver();
      }
    })
  }
  
  $(document).on('submit', '.chooseRange', function (event) {
    event.preventDefault();
    playGame();
  })

  $(document).on('click', '#playAgain', function () {
    playGame()
    $('#playAgain').addClass('d-none');
  })

});