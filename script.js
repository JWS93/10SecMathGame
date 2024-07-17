var startTimer = function () {
  var timeleft = 10;
  var downloadTimer = setInterval(function(){
    if(timeleft <= 0){
      clearInterval(downloadTimer);
      $('#displayTimer').html("Game Over");
    } else {
      $('#displayTimer').html(timeleft + " seconds remaining");
    }
    timeleft -= 1;
  }, 1000);
}

var generateProblem = function () {
  var numOne = function (min, max) {
    var min = parseInt($('#chooseMin').val());
    var max = parseInt($('#chooseMax').val());
    var numberOne = Math.floor(Math.random() * (max - min + 1)) + min;
    return numberOne;
  }
  var numTwo = function (min, max) {
    var min = parseInt($('#chooseMin').val());
    var max = parseInt($('#chooseMax').val());
    var numberTwo = Math.floor(Math.random() * (max - min + 1)) + min;
    return numberTwo
  }
  var numberOne = numOne();
  var numberTwo = numTwo();
  $('#displayProblem').html('problem: ' + numberOne + '+' + numberTwo);
  var answer = numberOne + numberTwo;

}

$(document).ready (function() {
  $(document).on('click', '.start', function() {
    startTimer();
    generateProblem();
  })
});