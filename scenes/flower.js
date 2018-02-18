
function nonflower() {
	clear();
	background("#fff");
	push();
	translate(width / 2, height / 2);
	noFill();
	colorMode(HSB);
	strokeWeight(0.2);

	stroke(random(50),80,random(80));
	beginShape();
	var x =0;
	while(x < width) {
		curveVertex(cos(x)*width/5+x*cos(x),sin(x)*width/5);
		x += 0.5
	}
	endShape();
	pop();
}




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
	var count = 2500;// random(100,5000);

	var factor = randFactor();
	var k = Math.PI*2/(factor + random(0.001,0.01));//random(5);
	console.log(factor);
	//1/8,2/3,1/3,1/2,1,2,7,3,5,4,9
	var factorB = random([1,3,5,6,7,10,1,1,1]);
	var v = Math.PI*2/(factor * factorB + random(0.001,0.01));// + random(0.00001,0.0002);//random(1,5);
	var dr = 1.00038;
	var angle = 0;
	var angleIncrement = 5;
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

function randFactor() {
	return random([3,6,7,8,4,12,15,13,17,21]);
	//return random([1/3,3/5,2,3,5,4,7,12,15,21]);
}
/*function mouseDragged() {
	console.log(window.event.clientX);
	var mouseX = window.event.clientX;
	flower(mouseX/width);
}*/
