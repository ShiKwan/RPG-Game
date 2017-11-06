
var randomNumber = 0;
var addUp = 0;
var win = 0;
var loss = 0;

winSound = new Audio("assets/audio/win.mp3");
loseSound = new Audio("assets/audio/lose.mp3")


function getRandomNumber(min, max){
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min +1)) + min;
}

function initializeGame(newNumber){
	$("#imgCard1").attr("value", getRandomNumber(1,12));
	$("#imgCard2").attr("value", getRandomNumber(1,12));
	$("#imgCard3").attr("value", getRandomNumber(1,12));
	$("#imgCard4").attr("value", getRandomNumber(1,12));
	newNumber = getRandomNumber(19, 120);
	$("#lblRandom").text(newNumber);
	addUp = 0;
	$("#lblCurrent").text(addUp);
	console.log("initialize : addUp = " + addUp + " , randomNumber = " + newNumber);

	return newNumber;
}

function calculateWinLoss(){
	$("#lblWin").text(win);
	$("#lblLose").text(loss);
}

$(document).ready(function(){
	calculateWinLoss();
	randomNumber = initializeGame(randomNumber);

	$(".card").on("click", function(){
		var cardValue = $(this).attr("value");
		
		addUp += parseInt(cardValue);

		if(parseInt(addUp) == parseInt(randomNumber)){
			console.log("a == r : addUp = " + addUp + " , randomNumber = " + randomNumber);
			console.log("You win");
			winSound.play();
			win++;
			calculateWinLoss();
			randomNumber = initializeGame(randomNumber);
		}else if(parseInt(addUp) > parseInt(randomNumber)){
			console.log("a > r : addUp = " + addUp + " , randomNumber = " + randomNumber);
			console.log("You lose");
			loseSound.play();
			loss++;
			calculateWinLoss();
			randomNumber = initializeGame(randomNumber);
		}else if(parseInt(addUp) < parseInt(randomNumber)){
			console.log("a < r : addUp = " + addUp + " , randomNumber = " + randomNumber);
			$("#lblCurrent").text(addUp);
			//do nothing
			console.log("add up = " + addUp + ", randomNumber = " + randomNumber);
		}
	});
});