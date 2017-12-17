function haystack() {
  clear();
  randomInvert();
  setColors();
  margin = width/20
  x = margin
  startY = height/2;
  how_many = rando(10,800);
  ball_size = height/rando(20,200);
  setThickness(rando(width/15000,width/200));

  for(i = 0; i < how_many; i++) {
    x = rando(margin, width-margin);
    y = startY * rando(0.05,1.02);
    angle = Math.PI / 2* rando(0.9, 1.1);

    x2 = rando(margin, width-margin);
    y2 = rando(startY, height-margin);

    line(x,y, x2, y2);

    if(Math.random() > 0.5) {
      fill(background_color);
    }else{
      fill(randColor());
      //fill(foreground_color);
    }
    ellipse(x,y,ball_size);
    ellipse(x2,y2, ball_size);
    //stroke("#000");
  }
}
