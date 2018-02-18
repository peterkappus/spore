function flower(x = 0.5) {
	clear();
	background("#fff");
	push();
	noFill();
	colorMode(HSB);
	strokeWeight(0.2);

	stroke(random(50),80,random(80));
	beginShape();

	var rad = width*0.15;
	var count = 4500;// random(100,5000);

	var k = random(20);
	var v = random(20);
	var dr = 1.00018;
	var angle = 0;
	var angleIncrement = 0.5;
	//var v = k * factor;
	console.log("k " + k + " v" + v + "count:" + count);
	translate(width / 2, height / 2);

	for(var i = 0; i < count; i++) {
		curveVertex(sin(angle * k) * rad, cos(angle * v) * rad);
		angle += angleIncrement;
		rad *= dr;
	}
	endShape();
	pop();
}

/*function mouseDragged() {
	console.log(window.event.clientX);
	var mouseX = window.event.clientX;
	flower(mouseX/width);
}*/
