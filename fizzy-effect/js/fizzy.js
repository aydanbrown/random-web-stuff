var MakeFizzy = (function(container) {
	const svgns = 'http://www.w3.org/2000/svg';

	const fps = 24;
	const bubblesPerSecond = 30;
	const colour = '#fff';
	const size = { min: 1, max: 5 };
	const duration = { min: 1, max: 3 };
	const speed = { min: 40, max: 80 };
	const acceleration = 20;
	const spawnHeightFrac = 0.4;

	var bubbles = [];

	var svg = document.createElementNS(svgns, 'svg');
	svg.setAttribute('width', '100%');
	svg.setAttribute('height', '100%');
	svg.setAttributeNS('http://www.w3.org/2000/xmlns/', 'xmlns:xlink', 'http://www.w3.org/1999/xlink');
	container.appendChild(svg);

	function randomRange(range) {
		return Math.random() * (range.max - range.min) + range.min;
	}

	function spawnBubble() {
		var x = randomRange({ min: 0, max: svg.scrollWidth });
		var y = randomRange({ min: svg.scrollHeight * (1 - spawnHeightFrac), max: svg.scrollHeight });
		var element = document.createElementNS(svgns, 'circle');
		element.setAttributeNS(null, 'cx', x + 'px');
		element.setAttributeNS(null, 'cy', y + 'px');
		element.setAttributeNS(null, 'r',  '0');
		element.setAttributeNS(null, 'fill', colour);
		svg.appendChild(element);
		var bubble = {
			element: element,
			position: { x: x, y: y },
			phase: 0,
			size: 0,
			speed: 0,
			targetSize: randomRange(size),
			targetSpeed: randomRange(speed),
			duration: randomRange(duration)
		};
		bubbles.push(bubble);
	}

	function updateBubbles() {
		for(var i = bubbles.length - 1; i >= 0; i--) {
			switch(bubbles[i].phase) {
			case 0:
				bubbles[i].size += bubbles[i].targetSize / bubbles[i].duration / fps;
				if(bubbles[i].size >= bubbles[i].targetSize) {
					bubbles[i].size = bubbles[i].targetSize;
					bubbles[i].phase = 1;
				}
				bubbles[i].element.setAttributeNS(null, 'r', bubbles[i].size);
				bubbles[i].element.setAttributeNS(null, 'cx', bubbles[i].position.x - bubbles[i].size / 2);
				bubbles[i].element.setAttributeNS(null, 'cy', bubbles[i].position.y - bubbles[i].size / 2);
				break;
			case 1:
				if(bubbles[i].speed < bubbles[i].targetSpeed) {
					bubbles[i].speed += acceleration / fps;
					if(bubbles[i].speed > bubbles[i].targetSpeed) bubbles[i].speed = bubbles[i].targetSpeed;
				}
				bubbles[i].position.y -= bubbles[i].speed / fps;
				bubbles[i].element.setAttributeNS(null, 'cy', bubbles[i].position.y - bubbles[i].size / 2);
				if(bubbles[i].position.y <= -(bubbles[i].size / 2)) {
					svg.removeChild(bubbles[i].element);
					bubbles.splice(i, 1);
				}
				break;
			}
		}
	}

	setInterval(spawnBubble, 1000 / bubblesPerSecond);
	setInterval(updateBubbles, 1000 / fps);
});
