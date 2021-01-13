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

function startOver(){
  started = false;
  level = 0;
  userClickedPattern = [];
  gamePattern = [];
}

function checkAnswer(choosed){

  if(userClickedPattern[choosed] == gamePattern[choosed]){
    if (userClickedPattern.length === gamePattern.length){

      setTimeout(function () {
        nextSequence();
      }, 1000);

    }
  }else{
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
      $("#level-title").text("Press Any Key to Restart");
      startOver();
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function nextSequence(){
  userClickedPattern = [];
  level++;
  updateLevel();

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  for(var i = 0; i < gamePattern.length; ++i){
      await sleep(500);
      $("#"+gamePattern[i]).fadeIn(100).fadeOut(100).fadeIn(100);
      playSound(gamePattern[i]);

  }
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
