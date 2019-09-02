var appControl = new tizen.ApplicationControl(
		"http://tizen.org/appcontrol/operation/default",
		null, null, null, null
	);
var app = tizen.application.getCurrentApplication();

var notificationGroupDict = {
	content: "LETS LIFT",
	images: {
		iconPath: "./icon.png",
		backgroundImagePath: "./icon.png"
	},
	actions: {
		appControl: appControl,
		vibration: true,
		appId: app.appInfo.id //"a18hU3Vw0V.SetTracker" 
		// dont enable appId, resets to home page on relaunch for some fucking reason?
	},
	iconPath: "images/icon.png"
};

timer_notification = function(){
	var move_complete_notification = new tizen.UserNotification(
		"SIMPLE", "Move Complete!", notificationGroupDict
	);
	tizen.notification.post(move_complete_notification);
};
