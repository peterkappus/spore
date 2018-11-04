


function objects() {
  colorMode(HSB);
  push();
    //translate(random(-width * 0.1, width * 1.1),random(-height * 0.1,height * 1.1));
    translate(random(width),random(height));
    //rotate(50);
    //scale(random(0.5,1.5));
    obj();
  pop();
}


function obj() {
  var rotation = random(-0.005,0.005);
  
  //sometimes, don't rotate at all
  if(random()> 0.9) {
    rotation = 0;
  }
  var c = random(255);
  var maxDC = 0.5
  var dc = random(-maxDC,maxDC);
  var howMany = random(20,500);
  var scaleX = random(0.8,1.2);
  var scaleY = scaleX * random(0.5,1.5);
  var dx = random(-0.5,0.5);
  var dy = random(-0.5,0.5);
  var initW = random(width/50,width/2);
  var initH = random(width/50,width/2);
  //initX = initY = 150;
  
  noStroke();
  push();
  //translate(random(width),random(height));
  for(var i = 0; i < howMany; i++) {
    //rotation = random(-0.01,0.01);
    rotate(rotation);
    c += dc;
    fill(c % 255,255,255);
    rect(0,0,initW,initH); 
    translate(dx,dy);
    //scale(scaleX,scaleY);
  }
  pop();
}
