var gamePattern = [];
var userClickedPattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

var gameStarted = 0;
var level = 0;

function nextSequence() {
	userClickedPattern = [];
	++level;
	var randomNumber = Math.floor(Math.random()*4);
	$("h1").text("Level " + level);
	randomChosenColour = buttonColours[randomNumber];
	gamePattern.push(randomChosenColour);
	$("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  	playSound(randomChosenColour);
}


$( ".btn" ).click(function(event) {
	var myClass = $(this).attr("class");
   	var colorClass = myClass.split(" ")[1];
   	userClickedPattern.push(colorClass);
   	playSound(colorClass);
   	animatePress(colorClass);

   	checkAnswer(userClickedPattern.length-1);
});

function playSound(name) {
	var audio = new Audio("sounds/"+name + ".mp3");
	audio.play();
}

function animatePress(currentColour) {
	$("." + currentColour).addClass("pressed");
	setTimeout(() => {  $("." + currentColour).removeClass("pressed"); }, 100);
}


$(document).on('keypress',function(e) {
    if(gameStarted === 0) {
        gameStarted = 1;
        nextSequence();
    }
});

function checkAnswer(currentLevel) {
	if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      if (userClickedPattern.length === gamePattern.length){

        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {

      console.log("wrong");
      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
      playSound("wrong");

      $("#level-title").text("Game Over, Press Any Key to Restart");
      startOver();

    }
}


function startOver() {

  level = 0;
  gamePattern = [];
  gameStarted = 0;
}

