function grass() {
  var x = margin;
  stroke("#000");
  var scale = height/3;
  var xscale = scale/3;
  while (x < width-margin) {
    strokeWeight(random(width/12000,width/3000));
    //Use perlin noise!
    var x2 = x + random(-noise(x)*xscale, noise(x)*xscale);
    var y2 = height/2 - noise(x)*scale;

    line(x,height,x2,y2);
    if(Math.random() > 0.9) {
      fill(255,255,255,random(220,250));
      ellipse(x2,y2 + random(-height/10,height/5),random(width/80,width/20));
    }
    //move...
    x += random(width/800,width/600);
  }
}
