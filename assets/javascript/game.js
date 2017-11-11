$(document).ready(function(){
	var charList = [], originalList = [];
	var hero = {}, opponents = [], charID;
	var opponent1_id = -1, opponent2_id = -1 , opponent3_id = -1;
	var opp1_hp = 0, opp2_hp = 0, opp3_hp = 0;
	var opp1_catk = 0, opp2_catk = 0, opp3_catk = 0;
	var currentOpponentID, currentOpponent = {}, htmlID;
	var counter = 2;
	var clickSound = new Audio("assets/audio/click.wav");
	var lockInSound = new Audio("assets/audio/lock-in.mp3");
	var backgroundMusic = new Audio("assets/audio/battle-background-music.mp3");
	var hitSound = [new Audio("assets/audio/hit.flac"), new Audio("assets/audio/hit2.flac"), new Audio("assets/audio/hit3.flac")];
	var koSound = new Audio("assets/audio/ko.mp3");
	var opponentCount = 0;
	var heroCurrentHP, heroCurrentAP, heroBaseHP, heroBaseAP;
	var oppoCurrentHP, oppoCurrentCP, oppoBaseHP, oppoBaseCP;
	var opponentLeft = 3;

	function pauseAudio(){
		if(document.getElementById("navAudio").classList.contains('play')){
			document.getElementById("navAudio").classList.add('mute');
			document.getElementById("navAudio").classList.remove('play');
			document.getElementById("audio_on").style.display = "none";
			document.getElementById("audio_mute").style.display = "inline";
			backgroundMusic.pause();
			backgroundMusic.currentTime = 0;
		}else if(document.getElementById("navAudio").classList.contains('mute')){
			document.getElementById("navAudio").classList.add('play');
			document.getElementById("navAudio").classList.remove('mute');
			document.getElementById("audio_on").style.display = "inline";
			document.getElementById("audio_mute").style.display = "none";
			backgroundMusic.play();	
		}
	}
	$("#navAudio").click(pauseAudio);

	function pickRandomScene(){
	var scene = ["scene1", "scene2", "scene3", "scene4", "scene5", "scene6", "scene7", "scene8", "scene9", "scene10", "scene11", "scene12", "scene13", "scene14", "scene15", "scene20"];
	$(".fight-scene").attr("style", "background:url(assets/images/" + scene[(Math.floor(Math.random() * scene.length))] + ".gif);")	
	}

	function pickHero(userPick){
	hero = charList[userPick];
	console.log(hero);
	return hero;
	}

	if($.isEmptyObject(hero) && opponents.length <2){
		$(".fight-scene").hide();
	}

	if($("#btnHero").css("display") !="none"){
		$("#msg-center").addClass("alert-success");
	}
	//click on hero
	$(document).on("click", '.char', function(){
		console.log("here");
		if($.isEmptyObject(hero) && $("#btnHero").css("display") !== "none"){
			clickSound.play();
			$(charID).removeClass("hero-selected");
			console.log($(this).attr("id"));
			charID = "#" +$(this).attr("id");
			console.log(charID);
			if($(charID).hasClass("hero-selected")){ 
				console.log($(this));
				$(charID).removeClass("hero-selected");	
			}else{
				$(charID).addClass("hero-selected");
			}
		}else if($.isEmptyObject(hero) == false && $("#btnHero").css("display") == "none" && $(".character-selection").css("display") != "none"){
			console.log($(this).attr("id"));
			var opponentID = "#"+$(this).attr("id");
			if(opponentCount <3){
				clickSound.play();
				//remove class if user decided not to fight against that character.
				if($(opponentID).hasClass("opponent-selected")){
					opponentCount--;
					$(opponentID).removeClass("opponent-selected");
				}else{
					if($(opponentID).hasClass("opponent-selected") == false){
						//only allow three opponents
						opponentCount++;
						$(opponentID).addClass("opponent-selected");
					}
					
				}
			}
		}
		return false;
	})	

	//lock in user's hero
	$("#btnHero").on("click",function(){
		if($(".char").hasClass("hero-selected")){
			lockInSound.play();
			$(charID).off();
			hero = pickHero($(charID).attr("value"));
			heroBaseHP = hero.hp;
			heroBaseAP = hero.ap;
			console.log("in btnHero click function: hero is ");
			console.log(hero);
			console.log("inside btnHero click, isemptyobject " + $.isEmptyObject(hero))
			$("imgHero").attr("src", "../images/" + hero.img );
			$("#btnHero").hide();
			$("#msg-center").show();
			$("#msg-center").removeClass("alert-success").addClass("alert-danger");
			$("#msg-center").html("Select <b>three</b> opponents you want to fight against and lock in!");
			$("#imgHero").attr("src", "assets/images/" + hero.img);
		}else {
			$("#msg-center").show();
			$("#msg-center").html("Select your favorite hero and lock in!");
			shake($(this));
		}
	});

	$("#btnOpponents").on("click", function(){
		if($.isEmptyObject(hero) == false){
			$(".char").each(function(i){
				if($(this).hasClass("opponent-selected")){
					opponents.push($(this).attr("value"));
				}else{
					$("#msg-center").addClass("alert-danger").removeClass("alert-success").removeClass("alert-warning");
					$("#msg-center").html("Select your hero first!");
					shake($(this));
				}
				if(opponents.length == 3){
					lockInSound.play();
					$("#btnOpponents").hide();
						if($("#btnOpponents").css("display") == "none" && $("#btnHero").css("display") == "none"){
							$(".character-selection").slideUp();
							pickRandomScene();
							$(".fight-scene").show();
							$(".fight-scene").slideDown();
						}
					$("#msg-center").addClass("alert-success").removeClass("alert-danger");
					$("#cmdAttack").hide();
					$("#imgOpponent0").attr("src", "assets/images/" + charList[opponents[0]].img);
					$("#imgOpponent0").attr("data-value", charList[opponents[0]].id);
					$("#imgOpponent0").attr("baseHP", charList[opponents[0]].hp);
					$("#imgOpponent1").attr("src", "assets/images/" + charList[opponents[1]].img);
					$("#imgOpponent1").attr("data-value", charList[opponents[1]].id);
					$("#imgOpponent1").attr("baseHP", charList[opponents[1]].hp);
					$("#imgOpponent2").attr("src", "assets/images/" + charList[opponents[2]].img);
					$("#imgOpponent2").attr("data-value", charList[opponents[2]].id); 
					$("#imgOpponent2").attr("baseHP", charList[opponents[2]].hp);
					$("#msg-center").html("Select your first opponent!");
				}else{
					$("#msg-center").addClass("alert-danger").removeClass("alert-success").removeClass("alert-warning");
					$("#msg-center").html("Select your favorite hero first before locking in your opponents!");
					shake($("#btnOpponents"));
				}
			})
			return false;
		}else{
			$("#msg-center").addClass("alert-danger").removeClass("alert-success").removeClass("alert-warning");
			$("#msg-center").html("Select your hero first!");
			shake($(this));
		}
	})

$(document).on("click", ".fight-opponent", function(){
	console.log("here");
	$("#msg-center").html("Ready, fight!!");
	if(opponentLeft >0){
		currentOpponentID = $(this).attr("data-value");
		htmlID = "#"+$(this).attr("ID");

		if($(htmlID).hasClass("opponent0")){
			$(".oppo1_row").hide();
			$(".oppo2_row").hide();
		}else if($(htmlID).hasClass("opponent1")){
			$(".oppo0_row").hide();
			$(".oppo2_row").hide();
		}else if($(htmlID).hasClass("opponent2")){
			$(".oppo0_row").hide();
			$(".oppo1_row").hide();
		}
		if(counter >= 0) {
			if(counter == 2){
				console.log("current opponent ID: " + currentOpponentID);
				oppoBaseHP = charList[currentOpponentID].hp;
				opp1_catk = charList[currentOpponentID].counter;
				console.log("first opponent selected! " + charList[currentOpponentID].name);
			}else if(counter == 1){
				opponent2_id = $(this).attr("data-value");
				oppoBaseHP = charList[currentOpponentID].hp;
				opp2_catk = charList[currentOpponentID].counter;
				console.log("second opponent selected! " + charList[currentOpponentID].name);
			}else if(counter == 0){
				opponent3_id = $(this).attr("data-value");
				oppoBaseHP	 = charList[currentOpponentID].hp;
				opp3_catk = charList[currentOpponentID].counter;
				console.log("third opponent selected! " + charList[currentOpponentID].name);
			}
			counter--;
		}
	}
	opponentLeft--;	
	$("#cmdAttack").show();
	return false;
})

$("#cmdAttack").on("click", function(){
	currentOpponent = charList[currentOpponentID];
	shake($(htmlID));
	console.log(currentOpponent);
	if(currentOpponent.hp > 0){
		hitSound[(Math.floor(Math.random() * hitSound.length))].play();
		hero.hp -= currentOpponent.counter;
		currentOpponent.hp -= hero.ap;
		hero.ap += hero.increment;
		var targetOpponent = "."+htmlID.substring(1)+".progress-bar";
		progressBarHP($(".hero-progress-hp"), hero.hp, heroBaseHP);
		progressBarHP($(targetOpponent),  currentOpponent.hp, oppoBaseHP);
		console.log(hero);
		console.log(currentOpponent);
	}

	if($.isEmptyObject(currentOpponent) == false){
		if(currentOpponent.hp <= 0){
			if(hero.hp >0){
				koSound.play();
				if(opponentLeft <3){
					console.log(currentOpponent.name + "is dead");
					$("#msg-center").html();	
					$(htmlID).addClass("ko");
					//Help from TAs (Brian and Chris)
					$(htmlID).off();
					$("#cmdAttack").hide();
					$(".oppo0_row").show();
					$(".oppo1_row").show();
					$(".oppo2_row").show();
				}
				if(opponentLeft == 2){
				$("#msg-center").html("<h1>ko!</h1> select your second opponent!");
				}else if(opponentLeft == 1){
					$("#msg-center").html("<h1>ko!</h1>pick your last opponent!");
				}else if(opponentLeft == 0){
					if(hero.hp >0){
						$("msg-center").addClass("alert-success").removeClass("alert-danger").removeClass("alert-warning");
						$("#msg-center").html("<h1>You win!!</h1> Press '<b>y</b>' to fight the same opponent again, '<b>r</b>' to back to character selection");
						resetGame();
					}
				}
			}else if(hero.hp <= 0) {
				koSound.play();
				$("#cmdAttack").hide();
				$("#msg-center").html("<h1>You die kamizake style!</h1> Press '<b>y</b>' to fight the same opponent again, '<b>r</b>' to back to character selection");
				resetGame();
			}
		}else if(currentOpponent.hp >0){
			 if(hero.hp <= 0){
				koSound.play();
				$("#cmdAttack").hide();
				$("#msg-center").html("<h1>You lose..</h1> Press '<b>y</b>' to fight the same opponent again, '<b>r</b>' to back to character selection");
				resetGame();
			}
		}
	return false;
}
})

function resetGame(){
	document.onkeyup = function(event) {
		var userEnter = event.key.toLowerCase();
		if(userEnter == "y"){
			hero.hp = heroBaseHP;
			hero.ap = heroBaseAP;
			var oppo0ID = $("#imgOpponent0").attr("data-value");
			var oppo1ID = $("#imgOpponent1").attr("data-value");
			var oppo2ID = $("#imgOpponent2").attr("data-value");
			charList[oppo0ID].hp = parseInt($("#imgOpponent0").attr("basehp"));
			charList[oppo1ID].hp = parseInt($("#imgOpponent1").attr("basehp"));
			charList[oppo2ID].hp = parseInt($("#imgOpponent2").attr("basehp"));
			console.log(charList);
			opponentLeft = 3;
			counter = 2
			$(".fight-opponent").removeClass("ko").on();
			$(".progress-bar").css("width", "100%");
			$(".progress-bar").addClass("progress-bar-success").removeClass("progress-bar-warning").removeClass("progress-bar-danger");
			$("#cmdAttack").hide();
			$(".oppo0_row").show();
			$(".oppo1_row").show();
			$(".oppo2_row").show();
			$("#msg-center").html("Select your first opponent!");
		}else if(userEnter == "r"){
			location.reload();
		}
		$(document).unbind("keyup");
	}

}

function progressBarHP(characterID, current, base){
	var progressBar = ((current)/base) * 100;
	$(characterID).css("width", progressBar+"%");
	if(progressBar <=70){
		$(characterID).addClass("progress-bar-warning").removeClass("progress-bar-success");
	}
	if(progressBar <=30){
		$(characterID).addClass("progress-bar-danger").removeClass("progress-bar-warning").removeClass("progress-bar-success");
	}
}

const char0 = {
	name : "deadpool",
	img : "char0.png",
	ap : 4,
	increment : 2,
	hp : 130,
	counter: 5,
	id : 0
}

const char1 = {
	name : "captain fury",
	img : "char1.png",
	ap : 4,
	increment :5,
	hp : 100,
	counter:9,
	id : 1
}

const char2 = {
	name : "hellboy",
	img : "char2.png",
	ap : 4,
	increment : 2,
	hp : 145,
	counter: 6,
	id : 2
}

const char3 = {
	name : "captain america",
	img : "char3.png",
	ap : 6,
	increment : 2,
	hp : 140,
	counter: 8,
	id : 3
}

const char4 = {
	name : "venom",
	img : "char4.png",
	ap : 5,
	increment : 2,
	hp : 114,
	counter: 9,
	id : 4
}

const char5 = {
	name : "leonardo",
	img : "char5.png",
	ap : 4,
	increment : 2,
	hp : 130,
	counter: 5,
	id : 5
}

const char6 = {
	name : "michelangelo",
	img : "char6.png",
	ap : 4,
	increment :5,
	hp : 100,
	counter:9,
	id : 6
}

const char7 = {
	name : "raphael",
	img : "char7.png",
	ap : 4,
	increment : 2,
	hp : 145,
	counter: 6,
	id : 7
}

const char8 = {
	name : "donatello",
	img : "char8.png",
	ap : 6,
	increment : 2,
	hp : 140,
	counter: 8,
	id : 8
}

const char9 = {
	name : "cyclops",
	img : "char9.png",
	ap : 5,
	increment : 2,
	hp : 114,
	counter: 9,
	id : 9
}


const char10 = {
	name : "thor",
	img : "char10.png",
	ap : 4,
	increment : 2,
	hp : 130,
	counter: 5,
	id : 10
}


const char11 = {
	name : "cthulhu",
	img : "char11.png",
	ap : 4,
	increment :5,
	hp : 100,
	counter:9,
	id : 11
}


const char12 = {
	name : "manhattan",
	img : "char12.png",
	ap : 4,
	increment : 2,
	hp : 145,
	counter: 6,
	id : 12
}

const char13 = {
	name : "rorachach",
	img : "char13.png",
	ap : 6,
	increment : 2,
	hp : 140,
	counter: 8,
	id : 13
}

const char14 = {
	name : "hulk",
	img : "char14.png",
	ap : 5,
	increment : 2,
	hp : 114,
	counter: 9,
	id : 14
}

const char15 = {
	name : "shrek",
	img : "char15.png",
	ap : 4,
	increment : 2,
	hp : 130,
	counter: 5,
	id : 15
}

const char16 = {
	name : "terminator",
	img : "char16.png",
	ap : 4,
	increment :5,
	hp : 100,
	counter:9,
	id : 16
}

const char17 = {
	name : "captain jack",
	img : "char17.png",
	ap : 4,
	increment : 2,
	hp : 145,
	counter: 6,
	id : 17
}

const char18 = {
	name : "green lantern",
	img : "char18.png",
	ap : 6,
	increment : 2,
	hp : 140,
	counter: 8,
	id : 18
}

const char19 = {
	name : "star lord",
	img : "char19.png",
	ap : 4,
	increment : 2,
	hp : 130,
	counter: 5,
	id : 19
}

const char20 = {
	name : "groot",
	img : "char20.png",
	ap : 4,
	increment :5,
	hp : 100,
	counter:9,
	id : 20
}

const char21 = {
	name : "rocket",
	img : "char21.png",
	ap : 4,
	increment : 2,
	hp : 145,
	counter: 6,
	id : 21
}

const char22 = {
	name : "drax",
	img : "char22.png",
	ap : 6,
	increment : 2,
	hp : 140,
	counter: 8,
	id : 22
}

const char23 = {
	name : "freddy",
	img : "char23.png",
	ap : 5,
	increment : 2,
	hp : 114,
	counter: 9,
	id : 23
}

const char24 = {
	name : "lecter",
	img : "char24.png",
	ap : 4,
	increment : 2,
	hp : 130,
	counter: 5,
	id : 24
}
const char25 = {
	name : "bruce lee",
	img : "char25.png",
	ap : 4,
	increment :5,
	hp : 100,
	counter:9,
	id : 25
}

const char26 = {
	name : "chewbacca",
	img : "char26.png",
	ap : 4,
	increment : 2,
	hp : 145,
	counter: 6,
	id : 26
}
const char27 = {
	name : "han",
	img : "char27.png",
	ap : 6,
	increment : 2,
	hp : 140,
	counter: 8,
	id : 27
}
const char28 = {
	name : "luke",
	img : "char28.png",
	ap : 5,
	increment : 2,
	hp : 114,
	counter: 9,
	id : 28
}
const char29 = {
	name : "trevor",
	img : "char29.png",
	ap : 4,
	increment : 2,
	hp : 130,
	counter: 5,
	id : 29
}

backgroundMusic.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);
backgroundMusic.play();	

charList.push(char0, char1, char2, char3, char4, char5, char6, char7, char8, char9, char10, char11, char12, char13, char14, char15, char16, char17, char18, char19, char20, char21, char22, char23, char24, char25, char26, char27, char28, char29);
for(var i = 0; i < charList.length; i++){
var newDiv = $("<div>");
var newHyp = $("<a></a>");
var newImg = $("<img ></img>");
var newLbl = $("<label>");
newDiv.addClass("img-container");
newHyp.attr({
			id : "hypChar"+ charList[i].id,
			value: charList[i].id,
			hp: charList[i].hp,
			ap: charList[i].ap,
			name: charList[i].name,
			href: "#",
			increment: charList[i].increment,
			counter: charList[i].counter,
			'class' : "thumbnail char"
});
newImg.attr({
			id: "imgChar"+ charList[i].id,
			src: "assets/images/" + charList[i].img,
			alt: charList[i].name,
			'class': "img-char img-char" + [i] 
});
newLbl.addClass("char-name name" + [i]);
newLbl.html(charList[i].name);
$(".character-selection").append(newDiv.append(newHyp.append(newImg).append(newLbl)));
}
$("#msg-center").hide();
})


//Help from TA (Chris)
let previousShake;
function shake(idToShake) {
	$(idToShake).addClass("shake");
	if(previousShake) clearTimeout(previousShake)
		previousShake = setTimeout(function() {
		$(idToShake).removeClass('shake')
	}, 0.82 * 1000)
}


/*
<a id="hypChar0" href="#" class="thumbnail char" value="0">
	<img id="imgChar0" src="assets/images/char0.png" alt="char0" class="img-char img-char0">
	<label class="char-name name0">deadpool</label>
</a>
*/