$(document).ready(function(){

	var hero = {}, opponents = [], charList = [], charID;
	var opponent1_id = -1, opponent2_id = -1 , opponent3_id = -1;
	var opp1_hp = 0, opp2_hp = 0, opp3_hp = 0;
	var opp1_catk = 0, opp2_catk = 0, opp3_catk = 0;
	var currentOpponentID, currentOpponent, htmlID;
	var counter = 2;
	var clickSound = new Audio("assets/audio/click.wav");
	



	function pickRandomScene(){
	var scene = ["scene1", "scene2", "scene3", "scene4", "scene5", "scene6", "scene7", "scene8", "scene9", "scene10", "scene11", "scene12", "scene13", "scene14", "scene15", "scene20"];
	$(".fight-scene").attr("style", "background:url(assets/images/" + scene[(Math.floor(Math.random() * scene.length))] + ".gif);")	
	}

	function pickHero(userPick){
	hero = charList[userPick];
	console.log(hero);
	return hero;
	}

	if($("#btnOpponents").css("display") != "none" && $("#btnHero").css("display") != "none"){
		$(".fight-scene").hide();
	}

	if($("#btnHero").css("display") !="none"){
		$("#msg-center").addClass("alert-success");
		$("#msg-center").html("Select your favorite hero and lock in!");
	}

	//click on hero
	$(".char").on("click", function(){
		clickSound.play();
		if($.isEmptyObject(hero) && $("#btnHero").css("display") !== "none"){
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
			//remove class if user decided not to fight against that character.
			if($(opponentID).hasClass("opponent-selected")){
				$(opponentID).removeClass("opponent-selected");
			}else{
				//only allow three opponents
				if(opponents.length <= 2){
					$(opponentID).addClass("opponent-selected");
				}
			}
		}
	})	

	//lock in user's hero
	$("#btnHero").on("click",function(){
		hero = pickHero($(charID).attr("value"));
		console.log("in btnHero click function: hero is ");
		console.log(hero);
		console.log("inside btnHero click, isemptyobject " + $.isEmptyObject(hero))
		$("imgHero").attr("src", "../images/" + hero.img );
		$("#btnHero").hide();
		$("#msg-center").removeClass("alert-success").addClass("alert-danger");
		$("#msg-center").html("Select <b>three</b> opponents you want to fight against and lock in!");
		$("#imgHero").attr("src", "assets/images/" + hero.img)
	});

	$("#btnOpponents").on("click", function(){
		$(".char").each(function(i){
			if($(this).hasClass("opponent-selected")){
				opponents.push($(this).attr("value"));
			}
			$("#btnOpponents").hide();
			if($("#btnOpponents").css("display") == "none" && $("#btnHero").css("display") == "none"){
				$(".character-selection").slideUp();
				pickRandomScene();
				$(".fight-scene").show();
				$(".fight-scene").slideDown();
			} 
		})
		$("#msg-center").addClass("alert-success").removeClass("alert-danger");
		$("#msg-center").html("Select your first opponent!");
		console.log("log all opponents " + opponents);
		$("#imgOpponent0").attr("src", "assets/images/" + charList[opponents[0]].img);
		$("#imgOpponent0").attr("data-value", charList[opponents[0]].id);
		$("#imgOpponent1").attr("src", "assets/images/" + charList[opponents[1]].img);
		$("#imgOpponent1").attr("data-value", charList[opponents[1]].id);
		$("#imgOpponent2").attr("src", "assets/images/" + charList[opponents[2]].img);
		$("#imgOpponent2").attr("data-value", charList[opponents[2]].id);
	})


$(".fight-opponent").on("click", function(){
	currentOpponentID = $(this).attr("data-value");
	htmlID = "#"+$(this).attr("ID");
	console.log("html ID " + htmlID);

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


			opp1_hp = charList[currentOpponentID].hp;
			opp1_catk = charList[currentOpponentID].counter;
			console.log("first opponent selected! " + charList[currentOpponentID].name);
		}else if(counter == 1){
			opponent2_id = $(this).attr("data-value");
			opp2_hp = charList[currentOpponentID].hp;
			opp2_catk = charList[currentOpponentID].counter;
			console.log("second opponent selected! " + charList[currentOpponentID].name);
		}else if(counter == 0){
			opponent3_id = $(this).attr("data-value");
			opp3_hp	 = charList[currentOpponentID].hp;
			opp3_catk = charList[currentOpponentID].counter;
			console.log("third opponent selected! " + charList[currentOpponentID].name);
		}
		console.log("fight opponent selected: " + $(this).attr("data-value"));
		counter--;
	}
})

$("#cmdAttack").on("click", function(){
	currentOpponent = charList[currentOpponentID];
	if(currentOpponent.hp > 0){
		console.log("hero hp before counter: " + hero.hp);
		hero.hp -= currentOpponent.counter;
		console.log("hero hp after counter: " + hero.hp);
		console.log("opponent hp before atk" + currentOpponent.hp);
		currentOpponent.hp -= hero.ap;
		console.log("opponent hp after atk" + currentOpponent.hp);
		console.log("hero ap before increment:" + hero.ap);
		hero.ap += hero.increment;
		console.log("hero ap after increment:" + hero.ap);
		
		if(currentOpponent.hp <= 0 && hero.hp <= 0) {
			$("#msg-box").html("You die kamizake style");
		}
		if(currentOpponent.hp <= 0 && currentOpponent.hp > 0){
			$("#msg-box").html("You dead, <a href='index.html'>play again?</a>");
		}

		if($.isEmptyObject(currentOpponent) == false && currentOpponent.hp <= 0){
			console.log(currentOpponent.name + "is dead");
			$("#msg-box").html("ko! select your second opponent!");	
			$(htmlID).addClass("ko");
			$(htmlID).attr("disabled", "disabled");
			$(htmlID).click(function(event){
				event.preventDefault();
			})
			$(".oppo0_row").show();
			$(".oppo1_row").show();
			$(".oppo2_row").show();
		}

	}
})



var char0 = {
	name : "deadpool",
	img : "char0.png",
	ap : 5,
	increment : 2,
	hp : 100,
	counter: 5,
	id : 0
}

var char1 = {
	name : "captain fury",
	img : "char1.png",
	ap : 5,
	increment : 2,
	hp : 100,
	counter: 5,
	id : 1
}

var char2 = {
	name : "hellboy",
	img : "char2.png",
	ap : 5,
	increment : 2,
	hp : 100,
	counter: 5,
	id : 2
}

var char3 = {
	name : "captain america",
	img : "char3.png",
	ap : 5,
	increment : 2,
	hp : 100,
	counter: 5,
	id : 3
}

var char4 = {
	name : "venom",
	img : "char4.png",
	ap : 5,
	increment : 2,
	hp : 100,
	counter: 5,
	id : 4
}

var char5 = {
	name : "leonardo",
	img : "char5.png",
	ap : 5,
	increment : 2,
	hp : 100,
	counter: 5,
	id : 5
}

var char6 = {
	name : "michelangelo",
	img : "char6.png",
	ap : 5,
	increment : 2,
	hp : 100,
	counter: 5,
	id : 6
}

var char7 = {
	name : "raphael",
	img : "char7.png",
	ap : 5,
	increment : 2,
	hp : 100,
	counter: 5,
	id : 7
}

var char8 = {
	name : "donatello",
	img : "char8.png",
	ap : 5,
	increment : 2,
	hp : 100,
	counter: 5,
	id : 8
}

var char9 = {
	name : "cyclops",
	img : "char9.png",
	ap : 5,
	increment : 2,
	hp : 100,
	counter: 5,
	id : 9
}


var char10 = {
	name : "thor",
	img : "char10.png",
	ap : 5,
	increment : 2,
	hp : 100,
	counter: 5,
	id : 10
}


var char11 = {
	name : "cthulhu",
	img : "char11.png",
	ap : 5,
	increment : 2,
	hp : 100,
	counter: 5,
	id : 11
}


var char12 = {
	name : "manhattan",
	img : "char12.png",
	ap : 5,
	increment : 2,
	hp : 100,
	counter: 5,
	id : 12
}

var char13 = {
	name : "rorachach",
	img : "char13.png",
	ap : 5,
	increment : 2,
	hp : 100,
	counter: 5,
	id : 13
}

var char14 = {
	name : "hulk",
	img : "char14.png",
	ap : 5,
	increment : 2,
	hp : 100,
	counter: 5,
	id : 14
}

var char15 = {
	name : "shrek",
	img : "char15.png",
	ap : 5,
	increment : 2,
	hp : 100,
	counter: 5,
	id : 15
}

var char16 = {
	name : "terminator",
	img : "char16.png",
	ap : 5,
	increment : 2,
	hp : 100,
	counter: 5,
	id : 16
}

var char17 = {
	name : "captain jack",
	img : "char17.png",
	ap : 5,
	increment : 2,
	hp : 100,
	counter: 5,
	id : 17
}

var char18 = {
	name : "green lantern",
	img : "char18.png",
	ap : 5,
	increment : 2,
	hp : 100,
	counter: 5,
	id : 18
}

var char19 = {
	name : "star lord",
	img : "char19.png",
	ap : 5,
	increment : 2,
	hp : 100,
	counter: 5,
	id : 19
}

var char20 = {
	name : "groot",
	img : "char20.png",
	ap : 5,
	increment : 2,
	hp : 100,
	counter: 5,
	id : 20
}

var char21 = {
	name : "rocket",
	img : "char21.png",
	ap : 5,
	increment : 2,
	hp : 100,
	counter: 5,
	id : 21
}

var char22 = {
	name : "drax",
	img : "char22.png",
	ap : 5,
	increment : 2,
	hp : 100,
	counter: 5,
	id : 22
}

var char23 = {
	name : "freddy",
	img : "char23.png",
	ap : 5,
	increment : 2,
	hp : 100,
	counter: 5,
	id : 23
}

var char24 = {
	name : "lecter",
	img : "char24.png",
	ap : 5,
	increment : 2,
	hp : 100,
	counter: 5,
	id : 24
}
var char25 = {
	name : "bruce lee",
	img : "char25.png",
	ap : 5,
	increment : 2,
	hp : 100,
	counter: 5,
	id : 25
}

var char26 = {
	name : "chewbacca",
	img : "char26.png",
	ap : 5,
	increment : 2,
	hp : 100,
	counter: 5,
	id : 26
}
var char27 = {
	name : "han",
	img : "char27.png",
	ap : 5,
	increment : 2,
	hp : 100,
	counter: 5,
	id : 27
}
var char28 = {
	name : "luke",
	img : "char28.png",
	ap : 5,
	increment : 2,
	hp : 100,
	counter: 5,
	id : 28
}
var char29 = {
	name : "trevor",
	img : "char29.png",
	ap : 5,
	increment : 2,
	hp : 100,
	counter: 5,
	id : 29
}
charList.push(char0, char1, char2, char3, char4, char5, char6, char7, char8, char9, char10, char11, char12, char13, char14, char15, char16, char17, char18, char19, char20, char21, char22, char23, char24, char25, char26, char27, char28, char29);








})