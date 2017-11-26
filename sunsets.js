window.sunset = function() {
  //sky
  background(randColor());
  noStroke();
  var yLandStart = random(width*0.2,width*0.8);
  var yLandEnd = random(width*0.2,width*0.8);

  //sun
  fill(randColor());
  var rad = random(width/15,width/2);
  rad = ellipse(random(0,width),random(0,height/2),rad, rad);
  //land
  fill(randColor());
  beginShape();
  vertex(0,random(height*0.1,height*0.9));
  vertex(width, random(height*0.1,height*0.9));
  vertex(width,height);
  vertex(0,height);
  endShape(CLOSE);
}
