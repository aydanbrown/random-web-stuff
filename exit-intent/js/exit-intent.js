function ExitIntent(eventCallback) {
	
	// mouse
	var velocity = 0;
	var last = { x: 0, y: 0, time: 0 };
	var velocityHistory = [];
	var historySamples = 10;
	var velocityThreshold = 2;

	for(var i = 0; i < historySamples; i++) velocityHistory[i] = 0;

	// elements
	var elmPos = document.getElementById('mouse-position');
	var elmVel = document.getElementById('mouse-velocity');

	window.addEventListener('mousemove', function(e) {
		var time = (new Date()).getTime();
		var x = e.clientX;
		var y = e.clientY;
		velocityHistory.splice(0, 1);
		velocityHistory[historySamples - 1] = (Math.abs(last.x - x) + Math.abs(last.y - y)) / (time - last.time);
		var total = 0;
		for(var i = 0; i < historySamples; i++) total += velocityHistory[i];
		velocity = total / historySamples;
		last.x = x;
		last.y = y;
		last.time = time;
		elmPos.innerHTML = 'x ' + x + ' y ' + y;
		elmVel.innerHTML = velocity;
	});

	window.addEventListener('mouseout', function(e) {
		if(e.clientY <= 0 && velocity > velocityThreshold) {
			eventCallback();
		}
	});

}

window.addEventListener('load', function() {

	var popup = document.getElementById('popup');
	var popupExit = document.getElementById('popup-exit-button');

	var intent = ExitIntent(function() {
		popup.className = '';
	});

	popupExit.addEventListener('click', function() {
		popup.className = 'hide';
	});

});
