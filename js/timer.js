var timer;
function startTimer(e_i, m_i){
	console.log("startTimer("+e_i+", "+m_i+")");
//	tizen.power.request("CPU", "CPU_AWAKE");
	if (typeof e_i === 'undefined' && typeof m_i === 'undefined') {
		//continued from before...
		console.log("startTimer: e_i, m_i undefined, time must continue...")
		countdown = document.getElementById("timer-countdown");
		countdown = countdown.innerHTML.split(":");
		console.log("startTimer: harvested countdown is "+countdown);
		var min = parseInt(countdown[0]);
		var sec = parseInt(countdown[1]);
	} else {
		//new timer
//		resetTimer();
		stopTimer();
		var excercise = excercises.filter(function(obj){return obj.id == e_i})[0];
		var move = excercise.moves[m_i];
		var min = move.time[0];
		var sec = move.time[1];
	}
	function setTimerStr(m, s){
		sec_string = sec.toString().length > 1 ? sec.toString() : "0" + sec.toString();
		min_string = min.toString().length > 1 ? min.toString() : "0" + min.toString();
		countdown = document.getElementById("timer-countdown");
		countdown.innerHTML = min_string + ":" + sec_string;
	}
	setTimerStr(min, sec);
	
	timer = setInterval(function(){
		sec--;
		
		if (sec < 0) {
			min--;
			sec = 59;
		} else if (sec == 0 && min == 0) {
			timer_notification();
			stopTimer();
			nextMove();
		}
		setTimerStr(min, sec);
	}, 1000);
}
function stopTimer() {
//	tizen.power.release("CPU");
	clearInterval(timer);
	timer=false;
}
function resetTimer() {
	stopTimer();
	countdown = document.getElementById("timer-countdown");
	countdown.innerHTML = "00:00";
}
play = document.getElementById("play");
play.style.display = "none";
function toggleTimer(){
	pause = document.getElementById("pause");
	play = document.getElementById("play");
	if (timer) {
		console.log("Timer running, must pause");
		pause.style.display = "none";
		play.style.display = "inline-block";
		stopTimer();
	} else {
		console.log("Timer not running, must start");
		play.style.display = "none";
		pause.style.display = "inline-block";
		startTimer();
	}
}