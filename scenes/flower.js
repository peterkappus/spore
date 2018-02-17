/*function setup() {
	createCanvas(windowWidth, windowHeight,SVG);
	drawIt();
}*/

function flower() {
	clear();
	push();
	noFill();
	colorMode(HSB);
	strokeWeight(0.2);
	//var hue = 0;
	stroke(random(100),80,random(80));
	//hue = (hue++ % 100);
	beginShape();
	var rad = width*0.15;
	var k = random(50);
	var v = random(50);
	//v = k*5/3;
	//1.6180339;
	//good!
	/*k =1;
	v = k * 1.002;*/

	/*k = 0.8;
	v = k *2/3;*/
	var count = random(500,10000);
	console.log("k" + k + "v" + v + "count:" +count);
	translate(width/2,height/2);
	for(var i =0; i < count; i++) {
		rad*=1.00015;
		curveVertex(cos(i*k)*rad,sin(i*v)*rad);
	}
	endShape();
	pop();
}

/*
function mousePressed() {
	clear();
	flower();
	console.log(window.event.clientX);
}*/

/*
noFill();
beginShape();
curveVertex(84, 91);
curveVertex(84, 91);
curveVertex(68, 19);
curveVertex(21, 17);
curveVertex(32, 100);
curveVertex(32, 100);
endShape();
*/
