var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"]
var level = 0;
var started = false;


$(".btn").on("click",function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

function nextSequence(){

  userClickedPattern = [];
  // adding random color
  var randomNum = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNum];
  gamePattern.push(randomChosenColour);

  // fade effect
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);

  // increasing level everytime
  level++;
  $("#level-title").text("level " + level);
}

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");
  setTimeout(function(){ $("#" + currentColour).removeClass("pressed"); }, 100);
}

// starting of the game
$(document).on("keypress",function(){
  if(!started){
  $("#level-title").text("level " +level);
  nextSequence();
  started=true;
}
});

function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
    if(userClickedPattern.length==gamePattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }
  else {
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("h1").text("Game Over, Press Any Key To Restart");
    startOver();
  }
}

function startOver(){
  level=0;
  gamePattern=[];
  started= false;
}
