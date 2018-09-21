$( window ).on( "load", function() { 
var currentQuestion; 
var correctAnswer; 
var incorrectAnswer; 
var unanswered; 
var seconds; 
var time; 
var answered; 
var userSelect;
var triviaQuestions = [{
    question: 'In which national park would you find the geyser known as "Old Faithful"?',/*1*/
    answerList: ['Yellowstone National Park','Glacier National Park','Yosemite','Denali National Park'],
    answer:0
    },
    {
    question: 'Bogota is the high altitude capital of which country?',/*2*/
    answerList: ['Panama','Argentina','Colombia','Spain'],
    answer:2
    },
    {
    question: 'Tenochtitlan, founded in 1324, is now known as what city?',/*3*/
    answerList: ['Lisbon','Mexico City','Beijing','Chang Mai'],
    answer:1  
	},
	{
	question: 'Macau is an autonomous territory belonging to which country?',/*4*/
	answerList: ['China','Thailand','Portugal','Angola'],
	answer:0  
	},
	{
	question: 'Chile shares the majority of its border with which other South American country?',/*5*/
	answerList: ['Paraguay','Uraguay','Brazil','Argentina'],
	answer:3  
	},
	{
	question: 'What city in Australia has the highest population?',/*6*/
	answerList: ['Melbourne','Sydney','Darwin','Adelaide'],
	answer:1  
	},
	{
	question: 'What is the largest ocean on planet Earth?',/*7*/
	answerList: ['Pacific Ocean','Atlantic Ocean','Indian Ocean','Arctic Ocean'],
	answer:0  
	},
	{
	question: 'In what country would you find the temple Angkor Wat?',/*8*/
	answerList: ['Vietnam','Laos','Thailand','Cambodia'],
	answer:3  
	},
	{
	question: 'What is the oldest city in the world?',/*9*/
	answerList: ['Baghdad','Beijing','Damascus','Venice'],
	answer:2  
	},
	{
	question: 'Which U.S. state has the most active volcanoes?',/*10*/
	answerList: ['Hawaii','Alaska','Washington','California'],
	answer:1  
		}];

var gifArray = ['question1', 'question2', 'question3','question4','question5','question6','question7','question8','question9','question10'];
var messages = {
	correct: "Correct!",
	incorrect: "Nope! The correct answer is:",
	endTime: "Out of time!",
	finished: "All done. Here's how you did."
}

$('#startOverBtn').hide();

$('#startBtn').on('click', function(){
	$(this).hide();
	$('#startOverBtn').hide();
	newGame();
});

$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	//clear previous question
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();
	answered = true;
	//sets up new questions & answerList
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	//clicking an answer will pause the time and setup answerPage
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 30;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	//sets timer to go down
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

$('.answerList').hover(function() {
	$(this).css('color','red');
},
function(){
	$(this).css("color", "black");
});


function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); //Clears question page
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	$('#gif').html('<img src = "assets/images/'+ gifArray[currentQuestion] +'.gif" width = "450px">');
	//checks to see correct, incorrect, or unanswered
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer is: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer is: ' + rightAnswerText);
		answered = true;
	}
	

	//timer for answer screen
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 3900)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 3900);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}
})