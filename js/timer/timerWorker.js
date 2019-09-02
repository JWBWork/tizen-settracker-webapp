onmessage = function(e) {
	min = e.data[0];
	sec = e.data[1];

	setInterval(function(){
		sec--;
		
		if (sec < 0) {
			min--;
			sec = 59;
		} else if (sec == 0 && min == 0) {
			postMessage("DONE");
		}
		postMessage([min, sec]);
	}, 1000);
}
