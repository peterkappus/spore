function boxRose(x,y,minRad,maxRad) {
  var howMany = 100;
  fill(foreground_color._getRed(),foreground_color._getGreen(),foreground_color._getBlue(),30);
  noStroke();
  push();

  translate(x,y);
  for(var i = 0; i < howMany; i++) {
    //angleMode(RADIANS);
    rotate(2*PI/howMany);
    rect(0,0,random(minRad,maxRad),random(minRad,maxRad));
    //rect(0,0,100,250);
  }

  pop();

  /*
  push();
    translate(width/2,height/2);
    var howMany = 600;
    noFill();
  for(var i = 0; i < howMany; i++) {
    rect(0,0,1*i,1.3*i);
    rotate(2*PI/howMany);
    strokeWeight(0.001*i);

  }
  pop();
  */
}

function boxRoses() {
  foreground_color = color(0,0,0);
  var howMany = random(1,5);
  for(var i = 0; i < howMany; i++) {
    //foreground_color = randColor();
    var minRad = width/random(10,80);
    var maxRad = width/random(2,10);
    boxRose(random(margin,width-margin), random(margin, height-margin),minRad,maxRad);
  }
}
