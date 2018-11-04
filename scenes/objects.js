


function objects() {
  colorMode(HSB);
  push();
    translate(random(width),random(height));
    //rotate(50);
    scale(random(0.5,1.5));
    obj();
  pop();
}


function obj() {
  r = random(-0.001,0.001);
  var c = random(255);
  var howMany = random(50,5000);
  var scaleX = random(0.99,1.001);
  var scaleY = random(0.99,1.001);
  var dx = random(-0.5,0.5);
  var dy = random(-0.5,0.5);
  var initX = random(width/20,width/2);
  var initY = random(width/20,width/2);
  
  noStroke();
  push();
  for(var i = 0; i < howMany; i++) {
    rotate(r);
    c += 0.05;
    fill(c % 255,255,255);
    rect(-initX,-initY,initX,initY); 
    translate(dx,dy);
    scale(scaleX,scaleY);
  }
  pop();
}
