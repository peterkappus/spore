
window.poly_line_mountain = function() {
  clear();
  //noFill();
  noStroke()
  maxShade = 250
  minShade = 20;
  smoothness = height*Math.random();
  xSteps = width * Math.random();
  setThickness(0.2)
  how_many = 10;
  first_y = y = height * rando(0.2, 0.6);
  for(i = 0; i < how_many; i ++) {
    x = 0;
    beginShape();
    while(x < width) {
      vertex(x,y);
      x += rando(width/xSteps,width/xSteps);
      y += rando(-height/smoothness, height/smoothness);
    }

    vertex(width,y);
    vertex(width,height);
    vertex(0,height);
    vertex(0,first_y);
    endShape();

    shade = minShade + ((maxShade - minShade) * (1-(i/how_many)));
    fill(shade, shade, shade);

    console.log(shade);
    y += rando(height/80,height/20);

  }
}


window.mountains = function() {
  clear();
  x = 0;//rando(0, width/800);
  y = height * rando(0.4, 0.6);
  //space = width/900; //width/rando(300,800);
  thickness = 1;
  //thickness = rando(0.025,0.05);
  space = thickness;
  strokeWeight(thickness);
  shade = 240;
  flatness = rando(40,700); //higher is less craggy
  dy = rando(-height/flatness, height/flatness);
  resolution = rando(0.3, 0.9);

  while( y < height) {
    stroke(shade, shade, shade);
    line(x,y,x,height);
    y += dy
    if(Math.random()> resolution){
      dy = rando(-height/flatness, height/flatness);
    }
    x += space //rando(space*0.9, space*1.1);
    if(x >= width) {
      resolution = rando(0.3, 0.6);
      //flatness = rando(100,900); //higher is less craggy
      shade *= 0.7
      //x = 0;
      x = 0//rando(0, width/800);
      y += rando(height/50, height/15); //rando(height/50, height/20);
      //thickness *= 1.3;
      strokeWeight(thickness);
      debug(y);
      debug(height);
    }
  }
}
