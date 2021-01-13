var gamePattern = [];
var buttonColours = ["red","blue","green","yellow"];
var userClickedPattern = [];
var level = 0;
var started = false;

function updateLevel(){
  $("#level-title").text("Level " + level);
}

$(document).keypress(function() {
  if (!started) {
    updateLevel();
    nextSequence();
    started = true;
  }
});

$(".btn").click(function(){

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
})

function checkAnswer(choosed){

  if(userClickedPattern[choosed] == gamePattern[choosed]){
    if (userClickedPattern.length === gamePattern.length){

      setTimeout(function () {
        nextSequence();
      }, 1000);

    }

  }else{
      console.log("wrong");
  }
}

function nextSequence(){
  userClickedPattern = [];
  level++;
  updateLevel();

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name){
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}


function animatePress(currentColor){
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
