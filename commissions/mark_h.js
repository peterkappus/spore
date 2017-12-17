//Artwork for Mark H's new EP coming Jan 2018

//a big blue disk with a mountain/wave in front of it.

function mark() {
  fill("#289ecd");
  //fill("#0ae");
  noStroke();
  var diam = width*0.6;

  //big ol' disk
  ellipse(width/2,height/2,diam,diam);
  moon(diam);
  hills();

  //draw a "mask" around everyhting... which is really a circle with an incredibly thick stroke.
  var weight = width;
  strokeWeight(weight);
  stroke("#333");
  noFill();
  ellipse(width/2,height/2,diam+weight,diam+weight);
}


function hills() {
  //should we fade to red?
  //usually, yes. (2/3 times)
  var fade_color = random([true,false,true]);
  //mountain wave things
  stroke("#fff");
  angleMode(DEGREES);
  var angle = 130;
  var rad = width/3;
  var thickness = width/(2*random(0.5,150));
  var noise_scale = 20 * random(0.25,50); //smaller is smoother
  var x1 = -width/4;
  var y1 = height*random(0.7,0.9); //below centre
  var cap_rad = rad;
  //march across
  strokeWeight(thickness);
  //how much gets added on top
  var delta = 0.25; //how much to vary each iteration (%)
  noiseSeed(random(0,5000));

  while(x1 < width) {
    //draw the bottom part of the line
    var x2 = x1 + (cos(angle) * rad);
    var y2 = y1 + (sin(angle) * rad);
    line(x1,y1,x2,y2);
    //draw the random top part of the line
    //cap_rad += delta; random(1-delta, 1 + delta);
    cap_rad = noise(x1/noise_scale)*rad*2;

    //move along...
    x1 += thickness * 1.8;
    //other red: #f30
    if(fade_color) {
      stroke(lerpColor(hexToRGB("#fff"),hexToRGB("#fa502a"),x1/width));
    }
    var x2 = x1 + (cos(180 + angle) * cap_rad);
    var y2 = y1 + (sin(180 + angle) * cap_rad);
    line(x1,y1,x2,y2);
    //y1 *= delta;
  }
}

function moon(diam) {
  //sun moon things
  fill("#fff");
  noStroke();
  var moon_diam = diam * random(0.1,0.5);
  ellipse(width * random(0.2,0.8),height * random( 0.2,0.5),moon_diam,moon_diam);
}
