// Vaguely inspired by verner panton...

//funny curve

function dasCurve() {
  var divisions = 3;
  var thickness = width/divisions;
  strokeWeight(thickness);
  strokeJoin(ROUND);
  var colors = "#C90000 #D90 #0ad";
  stroke(random(colors.split(" ")));

  var x = thickness/2 + (width * Math.round(random(divisions))/divisions);
  var y = height - (thickness/2);

  //segment 1 - up!
  var x2 = x;
  var y2 = y - (height * Math.round(random(divisions))/divisions);
  line(x,y,x2,y2);

  //segment 2 - over!
  x = x2;
  y = y2;
  x2 = x + (width * Math.round(random(divisions))/divisions);
  y2 = y;
  line(x,y,x2,y2);

  //segment 3 - up!
  x = x2;
  y = y2;
  x2 = x
  y2 = 0 //y - (height * random([1,2,3])/4);
  line(x,y,x2,y2);


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
