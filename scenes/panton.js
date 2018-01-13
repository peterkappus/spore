// Vaguely inspired by verner panton...

//funny curve

function dasCurve() {
  var divisions = 3;
  var thickness = width/divisions;
  strokeWeight(thickness);
  strokeJoin(ROUND);
  noFill();
  var colors = "#C90000 #D90 #0ad";
  stroke(random(colors.split(" ")));

  //TODO: use vertices
  beginShape();


  var x = thickness/2 + (width * Math.round(random(divisions))/divisions);
  var y = height - (thickness/2);

  //bottom
  vertex(x,y);

  y = y - (height * Math.round(random(divisions))/divisions);

  //up
  vertex(x,y);

  //segment 2 - over!
  x = x + (width * Math.round(random(divisions))/divisions);
  vertex(x,y);

  y = 0
  vertex(x,y);
  endShape();

  //svgBlendMode("multiply");

}

function basicPanton() {
  var thickness = width/4;
  strokeWeight(thickness);
  strokeJoin(ROUND);
  stroke("#C90000");
  line(width/4,height,width/4,height*0.3);
  line(width/4,height*0.3, width, height*0.3);
  stroke("#D90");
  line(width/4+thickness,height,width/4+thickness,(height * 0.3) + thickness);
  line(width/4+thickness,(height * 0.3) + thickness, width/4+(thickness*2),(height * 0.3) + thickness);
  line(width/4+(thickness*2),(height * 0.3) + thickness,width/4+(thickness*2),0);

}
