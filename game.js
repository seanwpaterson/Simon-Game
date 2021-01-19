var gameSquence = [];
var userClickedPattern = [];

var buttonColours = ["green", "red", "yellow", "blue"];

var started = false;
var level = 0;

$("body").keypress(function() {
  if (!started) {
    started = true;
    $("h1").html("Level "+level);
    nextSquence();
  }
});

$("button").click(function(event) {
    userClickedPattern.push(event.target.id);
    playAudio(event.target.id);
    animatePress(event.target.id);
    checkAnswer(userClickedPattern.length);
});

function nextSquence() {
  var next = Math.floor(Math.random() * 4);

  var randomChosenColour = buttonColours[next];

  gameSquence.push(randomChosenColour);

  level++;

  $("h1").html("Level "+level);

  $("#"+randomChosenColour).fadeOut(200).fadeIn(200);
  playAudio(randomChosenColour);
}

function playAudio(name) {
  var audio = new Audio('sounds/'+name+'.mp3');
  audio.play();
}

function animatePress(currentColour) {
  $("#"+currentColour).addClass("pressed");

  setTimeout(function() {
    $("#"+currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  console.log(gameSquence);
  console.log(userClickedPattern);

  if (userClickedPattern[currentLevel-1] == gameSquence[currentLevel-1]) {
    console.log("success");

    if (gameSquence.length == currentLevel) {
        setTimeout(function() {
          nextSquence();
        }, 1000);
        userClickedPattern = [];
    }

  } else {
    console.log("loser");
    playAudio("wrong");
    $("body").addClass("game-over");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    $("h1").html("Game Over, Press any key to restart")
    startOver();
  }
}

function startOver() {
  started = false;
  level = 0;
  gameSquence = [];
  userClickedPattern = [];
}
