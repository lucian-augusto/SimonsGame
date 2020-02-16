var gamePattern = []; // Empty array that is going to save all the colours in the sequence that the player will have to follow
var buttonColours = ['red','blue','green','yellow']; // Array that contains all the possible colours (options)
var userClickedPattern = []; // // Empty array that is going to save all the colours that the user chooses
var level = 0; // Variable that stores the level taht the player is at

$('.btn').click(clickHandler); // Creates an event listener that checks for clicks in every element that has the '.btn' class

$(document).keypress(function(){ // Command that requires the user to press a key to start the game
  if (level == 0){ // If test that checks if the starting level is '0', if so, the game starts, otherwise, nothing happens when
    // the user press a key
    nextSequence(); // Starts the game
  }
});

function nextSequence(){ // Function that generates a random colour (from the options presented in the 'buttonColours' array)
  level++;
  userClickedPattern = [];
  $('#level-title').text('Level ' + level);
  var randomNumber = Math.floor(Math.random()*4); // Generates a random number between 0 and 3
  var randomChosenColour = buttonColours[randomNumber]; // Selects a new colour based on the random number generated above

  gamePattern.push(randomChosenColour); // Saves the new colour to the sequence pattern variable (gamePattern)

  $('#'+randomChosenColour).fadeOut(100).fadeIn(100); // Makes the selected coloured button flash
  playSound(randomChosenColour); // Plays the sound related to the generated colour
}

function clickHandler(){ // Function that saves the id of the element that the user clicked and saves it in the
  // 'userClickedPattern' array
  var userChosenColour = $(this).attr('id'); // Saves the id of the clicked element and saves it into a variable
  userClickedPattern.push(userChosenColour); // Inserts the id of the clicked element (its colour) into the 'userClickedPattern'
  // array
  animatePress(userChosenColour);
  playSound(userChosenColour); // Plays the sound related to the selected colour
  checkAnswer(userClickedPattern.length-1);
}

function playSound(name){ // Function that plays a sound based on the input argument (the selected or randomly generated
  // colour)
  var sound = new Audio('sounds/' + name + '.mp3'); // Creates a new object (sound) of the 'Audio' class using the 'name' input
  // variable as a creation parameter
  sound.play(); // plays the sound file attatched to the sound object
}

function animatePress(currentColour){
  $('#' + currentColour).addClass('pressed');
  setTimeout(function(){
    $('#' + currentColour).removeClass('pressed');
  },100);
}

function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel] == gamePattern[currentLevel]){
    if(userClickedPattern.length == gamePattern.length){
      setTimeout(nextSequence,1000);
    }
  }
  else{
    var sound = new Audio('sounds/wrong.mp3');
    sound.play();
    $('body').addClass('game-over');
    setTimeout(function(){
      $('body').removeClass('game-over');
    },200);
    $('#level-title').text('Game Over, Press Any Key to Restart');
    startOver();
  }
}

function startOver(){
  level = 0;
  gamePattern = [];
}
