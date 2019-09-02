play = document.getElementById("play");
play.style.display = "none";

var timer = null;

function setTimerStr(min, sec){
	sec_string = sec.toString().length > 1 ? sec.toString() : "0" + sec.toString();
	min_string = min.toString().length > 1 ? min.toString() : "0" + min.toString();
	countdown = document.getElementById("timer-countdown");
	countdown.innerHTML = min_string + ":" + sec_string;
}

var current_alarm_id;
function startTimer(e_i, m_i){
	tizen.power.request("CPU", "CPU_AWAKE"); // PORQUE NO WORK!?
//	tizen.power.request("SCREEN", "SCREEN_NORMAL");
	
	var min; var sec;
	if (typeof e_i === 'undefined' && typeof m_i === 'undefined') {
		//continued from before...
		console.log("startTimer: e_i, m_i undefined, time must continue...")
		countdown = document.getElementById("timer-countdown");
		countdown = countdown.innerHTML.split(":");
		console.log("startTimer: harvested countdown is "+countdown);
		min = parseInt(countdown[0]);
		sec = parseInt(countdown[1]);
	} else {
		stopTimer();
		var excercise = excercises.filter(function(obj){return obj.id == e_i})[0];
		var move = excercise.moves[m_i];
		min = move.time[0];
		sec = move.time[1];
	}
	setTimerStr(min, sec);
	
	// Worker also did't work, might as well remove :\
	if (timer==null) {
		timer = new Worker("js/timer/timerWorker.js");
	}
	
	timer.postMessage([min, sec]);
	timer.onmessage = function(e) {
		console.log("timerController recieved: "+e.data);
		if (e.data == "DONE") {
			timer_notification();
			nextMove();
			stopTimer();
		} else {
			min = e.data[0];
			sec = e.data[1];
			try {
				setTimerStr(min, sec);
			} catch(e) {}
		}
	}
}

function stopTimer(){
	tizen.power.release("CPU");
//	tizen.power.release("SCREEN");
	
//	tizen.power.unsetScreenStateChangeListener();
	
	if (current_alarm_id != null) {
		try {
			tizen.alarm.remove(current_alarm_id);
		} catch(err) {
			console.log("Error on attempted alarm removal.")
			console.log(err);
		}
	}
	current_alarm_id = null;
	if (timer != null) {
		timer.terminate();
	}
	timer = null;
}

function resetTimer() {
	stopTimer();
	countdown = document.getElementById("timer-countdown");
	countdown.innerHTML = "00:00";
}

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
