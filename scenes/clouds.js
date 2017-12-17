
function cloud(x,y, rad, isFilled) {
  how_many = rando(4,200);
  //c = "#fff";
  /*if(foreground_color == "#000") {
    c = color(foreground_c,0,0,rando(10,30));
  }else{
    c = color(255,255,255,rando(10,30));
  }*/
  c = color(foreground_color._getRed(), foreground_color._getGreen(), foreground_color._getBlue(), rando(10,30));

  //alert(c);
  //c = color(255,255,255,10);
  for(i = 0; i < how_many; i++) {
    noFill();
    if(isFilled) {
      fill(c);
    }

    noStroke();
    stroke(c);
    rad *= 1.01
    x *= rando(0.99,1.01);
    y *= rando(0.99,1.01);
    ellipse(x,y, rad);
  }
}


function clouds() {
  //clear();
  //randomInvert();
  //background_color =
  background(random(["#fc0","#0af","#fffffe","#332105","#000",randColor()]));


  //console.log(foreground_color);
  //c = color(255,255,255,10);
  how_many  = rando(2,100);
  x = width/2; //rando(margin, width-margin);
  y = height/2; //rando(height*0.2,height*0.8); //rando(margin, height-margin);

  max_rad = rando(height/50, height/10);

  //usually filled
  isFilled = (Math.random() > 0.2);

  //often colorful
  colorful = Math.random() > 0.4;

  foreground_color = randColor();


  //isFilled = true;
  for(j = 0; j < how_many; j++){

    if(colorful) {
      foreground_color = randColor();
    }

    stroke(foreground_color);
    fill(foreground_color);
    //setColors();

    rad = rando(height/500, max_rad);
    x = width * rando(0.25, 0.75);
    y = height * rando(0.25, 0.75);


    //x *= rando(0.9,1.1);
    //y *= rando(0.9,1.1);
    cloud(x,y,rad, isFilled);
  }
}
