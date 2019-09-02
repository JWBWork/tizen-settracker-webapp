//define exit method
function closeApp(){
	var curApp = tizen.application.getCurrentApplication();
	//curApp.hide() 
	// use this to hide the application
	// maybe I'll add a watchface button? return to watchface?
	curApp.exit();
}

//	populating excercise list
var ul = document.getElementById("excercises-ul");
var bottom_ul = document.getElementById("bottomExcList");
for( var i=excercises.length-1, l=-1; i>l; i-- ){
	var excercise = excercises[i];
	var li = document.createElement("li");
	li.appendChild(document.createTextNode(excercise.name));
	li.classList.add("excercise-style");
	li.id = "excercise-"+excercise.id+"-li";
	var tid = excercise.id;
	li.onclick = (function(tid){
		return function(){
			addSelectedStyle(tid);
			select_excercise(tid);
		}
	})(tid);

	ul.insertBefore(li, ul.firstChild);
}

/*
 * So excercises that are outside of the scroll window 
 * wont have their selected excercise class removed?
 * Wild.
 * */

//highlight selected excercise
var current_ex = localStorage.getItem("current_excercise");
console.log("current: "+current_ex)
addSelectedStyle(current_ex)

//select ex. apply and remove style
function removeSelectedStyle(){
	var lis = document.getElementsByTagName("li");
	console.log(lis);
	var lis = document.getElementsByClassName("excercise-selected");
	console.log(lis);
	while (lis.length) {
		lis[0].classList.remove("excercise-selected");
	}
}
function addSelectedStyle(e_id){
	removeSelectedStyle();
	var this_li = document.getElementById("excercise-"+e_id+"-li");
	if (this_li) {
		this_li.classList.add("excercise-selected");
	}
}

// Select excercise - set up the page - display page
function select_excercise(e_i){
	tizen.notification.removeAll();
	prev_e_i = localStorage.getItem("current_excercise");
	if (prev_e_i === null || e_i != prev_e_i){ //if new excercise
		renderMove(e_i, 0);
		return
	}
	renderMove();
}

function renderMove(e_i, m_i){
	console.log("renderMove("+e_i+", "+m_i+")")
	if (typeof e_i !== 'undefined' && typeof m_i !== 'undefined') { 
		//checked if undefined or whatever it is
		console.log("NEW EXCERCIES");
		localStorage.setItem("current_excercise", e_i);
		localStorage.setItem("current_move", m_i);
		var new_e = true;
	} else {
		console.log("OLD EXCERCIES");
		e_i = localStorage.getItem("current_excercise");
		m_i = localStorage.getItem("current_move");
	}
	console.log("rendering excercise and move:");
	var excercise = excercises.filter(function(obj){return obj.id == e_i})[0];
	console.log(excercise);
	var move = excercise.moves[m_i];
	console.log(move);
	
	//if I've cycled through and get no move:
	if (!move && m_i > 0) {
		removeSelectedStyle();
		localStorage.clear();
		tau.changePage("complete");
		return
	} else if (!move){
		removeSelectedStyle();
		localStorage.clear();
		tau.changePage("main");
		return
	}

	resetTimer();
	if (new_e) { // reset and overwrite
		//Excercise type specifc reset stuff
		if ( move.type == "set" ){
			//pass
		} else if ( move.type == "time" ) {
			startTimer(e_i, m_i);
		}
	}
	//setup for new or old
	if (move.type == "set") {
		e_name = document.getElementById("e-name-set");
	} else if (move.type == "time") {
		e_name = document.getElementById("e-name-time");
	}
	e_name.innerHTML = move.name;

	tau.changePage("#" + move.type);
}

// Next/Prev buttons
function nextMove(){
	var e_i = localStorage.getItem("current_excercise");
	var m_i = localStorage.getItem("current_move");
	var excercise = excercises.filter(function(e){return e.id == e_i})[0];
	console.log("NEXT MOVE EXCERCISE:", excercise);
	if ( excercise.moves[m_i].type == "time" ) {
		resetTimer();
	}
	m_i++;
	renderMove(e_i, m_i);
}
function prevMove(){
	var e_i = localStorage.getItem("current_excercise");
	var m_i = localStorage.getItem("current_move");
	m_i--;
	renderMove(e_i, m_i);
}

// Making New Excercises
function addExcercise(){
	console.log("New Exercise!");
}

// Going back pages, closing when back at home page
window.addEventListener("tizenhwkey", function (ev) {
	var back_to_main = ["set", "time", "complete"];
	var activePopup = null,
		page = null,
		pageId = "";

	if (ev.keyName === "back") {
		activePopup = document.querySelector(".ui-popup-active");
		page = document.getElementsByClassName("ui-page-active")[0];
		pageId = page ? page.id : "";

		if (pageId === "main" && !activePopup) {
			try {
				tizen.application.getCurrentApplication().exit();
			} catch (ignore) {
			}
		} else if(back_to_main.includes(pageId)) {
			tau.changePage("main");
		} else {
			tau.back();
		}
	}
});