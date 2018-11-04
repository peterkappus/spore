

//setup
var speed = 10;
var isColor = true;

//luxurious
/*var k = 2;
var kDelta = 0.00001 * speed;
var ampDelta = 0.05 * speed;
var colorDelta = 0.05 * speed;
*/


//spikey
//canvasWith
var width = window.innerWidth;

var amp;
//amp = width * 0.5;


var k = 1.8;
var kDelta = -0.000015 * speed;
var ampDelta = -0.04 * speed;
var colorDelta = 0.04 * speed;
var howMany = 20;


var c = 0;
var rotation = 0;


//color delta
var rotationDelta = 0.00001 * speed;
var thickness = 0.5;


//replace the "draw" function with this one... to make it animate
function altFlower() {
	colorMode(HSB);
  amp = canvas.width/2;
  translate(width/2, height/2);
	window.draw = drawAltFlower;
}

function drawAltFlower() {
	//kDelta *= 0.99;
	//rotationDelta *= 0.99;
  if(amp < 1) {
    return;
  }
  strokeWeight(thickness);
  c += colorDelta;
  stroke(c % 255);

  if(isColor){
    stroke(c % 255,255,255);
    //stroke(c % 255,255,255);
		
  }
  
  noFill();
  //clear();
  rotate(rotationDelta);
  amp += ampDelta;
  
  //stroke(255);

  beginShape();
  
  for(var a = 0.0; a < howMany; a ++) {
    var r = cos(k * a) * amp;
    var x = r * cos(k * a) * cos(a);
    var y = r * cos(k * a) * sin(a);
    curveVertex(x,y);
    //rotate(-0.0001);
  }
  
  endShape();
  
	//console.log(amp);
  //print(k);
  //print("\n");
  //incr *= 1.001;
  k += kDelta;
  //amp *= 0.9999;
  //howMany++;
  //thickness *= 1.01;
  
  //saveFrame("output/flower_#####.png");
  //println(frameRate);
  
  //slowly fade out... draw a slighly opaque square over the image each iteration
  
  /*
	//push();
	translate(-width/2,-height/2);
  noStroke();
  //fill(0,0,0,5);
  rect(0,0,width,height);	
	pop();
  */
}
