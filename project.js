//generate a random word to compare users letter choices to
//put that word into a variable
//this function does not work url no good********
/*function RandomWord() {
    var requestStr = "http://randomword.setgetgo.com/get.php";

    $.ajax({
        type: "GET",
        url: url,
        dataType: "json",
    });
}*/

//this function does not work url no good********gave up on this shit can not get any api to upload - it goes through but captures nothing
/*var url = "http://www.dictionaryapi.com/api/v1/references/collegiate/xml/hypocrite?key=54f479be-96d5-41ea-a17b-53df7b63ccf4/";

$.ajax({
    url: url,
    type: 'GET',
    dataType: 'XML',
}).always(function(){
      console.log('something happened');
    });*/


/*done(function(response){
        $('h1').html(response.data.Word);/*('something happened');*/
    //});

/*function RandomWordComplete(data) {
    alert(data.Word);
}

//test - did not work**************
var choosenWord = (data.Word);
//****Need to look at above and assign the data.word which was the path
//to follow with above api to work with the below variables - not so wordy
console.log(choosenWord);*/

//need the variables will use in functions
//variable to assign random word to
// var array = [];

// var wordListBank = array;
//variable to place individual letters into - an array - will need to split(Python methos) and place letters here
// var newArray = array;
//an array for choosenletters [maybe which will use to black out letter
// var previousWordChoices = array;
//for number of chances have till hung
/*var livesLeft = 6;
//for remaining letters to pick
var lettersRemaining = Word.Length;
//a test word to start
var word = 'tryout';
//?Displayed Word
var wordDisplay = '';*/
// var currentWord;

// var currentClue;

// var wrongAnswerCount;


//start creating functions
//pull data - set up basic html w/ javascript functions
//******GOING THROUGH AND SQUASHING EVERYTHING AND REMOVING SEMICOLONS ATOM TOLD ME TO ADD AND SEEING WHAT I GET BACK - WILL BE COMMENTED OUT
//*********WHY DOES ATOM TELL ME THERE ARE MISTAKES (ie warnings and erros that will work elsewhere)

$(document).ready (function(){

  var array = [];

  var wordListBank = array;
  //variable to place individual letters into - an array - will need to split(Python methos) and place letters here
  var newWordArray = array;
  //an array for choosenletters [maybe which will use to black out letter
  var previousWordChoices = array;
  //for number of chances have till hung
  /*var livesLeft = 6;
  //for remaining letters to pick
  var lettersRemaining = Word.Length;
  //a test word to start
  var word = 'tryout';
  //?Displayed Word
  var wordDisplay = '';*/
  var currentWord;

  var currentClue;

  var wrongAnswerCount;


  // $.getJSON('wordlist.json',
    for(i=0; i<wordListBank.length; i++){
      wordListBank[i] = array;
      wordListBank[i][0] = wordlist[i].word;
      wordListBank[i][1] = wordlist[i].clue;
        }
      // });

      header();
      // gameScreen();
      // getWord();
      // recognizeKeyUp();
      // checkAnswer();
      // wrongAnswer();
      // victoryMessage();
      // defeatMessage();
      // finalPage();
      //checkAnswer();

    });

      /*alert(wordListBank);*/
//var myTest = document.getElementById('startButton');
  //console.log(myTest);

function header(){
  // took out next line to try to simplify the logic part - less to deal with
  /*$(".header").append('<h1>HANGMAN GAME</h1>');*/
  $(".header").append('<div id="startButton" class="button">Start</div>');
  $("#startButton").on("click", function (){gameScreen();});
}


function gameScreen(){
  $(".container").empty();
  $(".container").append('<div class="imgPlace"><img class ="hangman" src ="man.png"></div>');
  $(".container").append('<div class="wordPlace"></div>');
  $(".container").append('<div class="cluePlace"></div>');
  $(".container").append('<div class="guesses">Previous Guesses: </div>');
  $(".container").append('<div class="feedback"></div>');
  $(".container").append('<form><input type="text" id="dummy"></form>');

 getWord();
  var numberOfTiles=currentWord.length;
  wrongAnswerCount=0;
  previousWordChoices=[];

  for(var i=0; i<numberOfTiles; i++){
    $('.wordPlace').append('<div class="tile" id=t'+i+'></div>');
}

$('.cluePlace').append('Hint: ' + currentClue);
//change to onClick('<element' to reutilizr original idea for interaction)
  $(document).on("keyup", recognizeKeyUp);/*Click('a');*/
  $(document).on("click", function(){$("dummy").focus();});
  $("#dummy").focus();
}
//pull from array and split to start comparing
function getWord(){
  var rnd=Math.floor(Math.random()*wordListBank.length);
  currentWord=wordListBank [rnd][0];
  currentClue=wordListBank [rnd][1];
  wordListBank.splice (rnd, 1);
  newWordArray = currentWord.split("");
}

function recognizeKeyUp(event){
  if(event.keyCode>64 && event.keyCode<91){
    var found=false;
    var previouslyEntered=false;
    var input=String.fromCharCode(event.keyCode).toLowerCase();

    for(var i=0; i<previousWordChoices.length; i++){

      if(input==previousWordChoices[i]){previouslyEntered=true;}
    }

    if(!previouslyEntered){
      previousWordChoices.push(input);

      for(i=0; i<newWordArray.length; i++){

        if(input==newWordArray[i]){found=true;$('#t'+i).append(input);}
      }

      if(found){checkAnswer();}
      else{wrongAnswer(input);}
    }
  }
}

// what to do once comparing with if/else

function checkAnswer(){
  var currentAnswer="";
for(var i=0;i<currentWord.length;i++){
  currentAnswer+=($('#t'+i).text());
}
if(currentAnswer==currentWord){
  victoryMessage();
}
}

function wrongAnswer(a){
	wrongAnswerCount++;
	var pos=(wrongAnswerCount*-75) +"px";
	$('.guesses').append("  "+a);
	$('.hangman').css("left",pos);
	if(wrongAnswerCount==6){
		defeatMessage();}
}

function victoryMessage(){
  document.activeElement.blur();
	$(document).off("keyup", recognizeKeyUp);
	$('.feedback').append("CORRECT!<br><br><div id='replay' class='button'>CONTINUE</div>");
  $('#replay').on("click", function (){
    	if(wordListBank.length>0){
    		gameScreen();}
    		else{finalPage();}
    });
}

function defeatMessage(){
    document.activeElement.blur();
    $(document).off("keyup", recognizeKeyUp);
    $('.feedback').append("You're Dead!<br>(answer= "+ currentWord +")<div id='replay' class='button'>CONTINUE</div>");
    $('#replay').on("click", function (){
    	if(wordListBank.length>0){
    	gameScreen();}
    	else{finalPage();}
	});
}

function finalPage(){
    $('.container').empty();
    $('.container').append('<div id="finalMessage">You have exhausted your options!</div>');
  }
//});



//Not ready for closing tag yet !!!!!!*/

//});

//functions below will become nested in the ready function above once completed
/*function useWord(){

};*/

/*function(){

};

function(){

};

function(){

};*/

//give user a choose of letters - done w/css/html - need onClick to assign letter as variable
//to compare to the variables created after random word is generated
//a.addEventListener
//if letter is a match show in a board - flip hidden letter
//if not have count down to being hung
//when count down reaches zero present a gif from Hang em High


//need a reset button to reload page
