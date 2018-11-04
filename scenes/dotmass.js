function dotMass() {
  var maxDiam = width/10;
  var x = 0;
  
	clear();
	background("#000");
	push();
	translate(width / 2, height / 2);
	fill("#fff");
	//colorMode(HSB);
	strokeWeight(width/200);
  //noFill();
  stroke("#fff");
  //stroke(random(90),80,random(80));
	/*beginShape();
	var x =0;
	while(x < width) {
		curveVertex(cos(x)*width/5+x*cos(x),sin(x)*width/5);
		x += 10.5
	}
	endShape();
  */
  var angle = 0;
  var diam = maxDiam;
  while(x < width/2) {
    angleMode(DEGREES); // Change the mode to DEGREES
    var angle = random(0,360);
    //angle += 360/50;
    //debug(angle);
    //var diam = maxDiam * ((width-x)/width);
    //wobbleRect(sin(angle) * x,cos(angle) * x,diam,diam);  
    var wonkFactor = 0.08;
    //fill(random(220,255),random(220,255),random(220,255),250);
    //fill("#fff");
    fill(setAlpha(randColor(),240));
    noStroke();
    ellipse(sin(angle)*x,cos(angle)*x,diam * random(1 - wonkFactor,1 + wonkFactor),diam * random(1 - wonkFactor,1 + wonkFactor));
    //wonkyCirc(sin(angle) * x,cos(angle) * x,diam);
    //x += diam * 0.2;
    x += width/2000;
    //debug(x);
    diam *= 0.995;
    //must call on each element
    //svgBlendMode("SCREEN");
    svgBlendMode(SCREEN);
    //svgBlendMode(SCREEN);

  }
	pop();
}
