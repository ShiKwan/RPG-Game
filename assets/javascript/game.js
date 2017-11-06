$(document).ready(function(){

var hero = {}, opponents = [], charList = [], charID;



function pickRandomScene(){
var scene = ["scene1", "scene2", "scene3", "scene4", "scene5", "scene6", "scene7", "scene8", "scene9", "scene10", "scene11", "scene12", "scene13", "scene14", "scene15", "scene20"];
$(".fight-scene").attr("style", "background:url(assets/images/" + scene[(Math.floor(Math.random() * scene.length) + 1)] + ".gif);")	
}

function pickHero(userPick){
hero = charList[userPick];
console.log(hero);
return hero;
}

//click on hero
	$(".char").on("click", function(){
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
		}else if($.isEmptyObject(hero) == false && $("#btnHero").css("display") == "none"){
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
});

$("#btnOpponents").on("click", function(){
	$(".char").each(function(i){

		if($(this).hasClass("opponent-selected")){
			console.log($(this));
			console.log("getting all the IDs.. " + $(this).attr("value"));
			opponents.push($(this).attr("value"));
		}
	})
	console.log("log all opponents " + opponents);
})

console.log("before selection: opponent is.. " + opponents);


var char0 = {
	name : "wolverine",
	img : "1.jpg",
	ap : 5,
	increment : 2,
	hp : 100,
	counter: 5
}

var char1 = {
	name : "iron man",
	img : "2.jpg",
	ap : 5,
	increment : 2,
	hp : 100,
	counter: 5
}

var char2 = {
	name : "saiyan",
	img : "3.jpg",
	ap : 5,
	increment : 2,
	hp : 100,
	counter: 5
}

var char3 = {
	name : "one punch",
	img : "4.jpg",
	ap : 5,
	increment : 2,
	hp : 100,
	counter: 5
}

charList.push(char0, char1, char2, char3);








})