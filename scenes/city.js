function city() {
  clear();
  randomInvert();
  count = 300;
  setThickness(width/1500);
  xScale = rando(3,40);
  yScale = rando(20,80);
  //yScale = 1
  variance_amount = rando(0,0.01);
  for(i = 1; i <= count; i++ ) {
    skyline(i/count,xScale,yScale, variance_amount);
  }
}

function city2 () {
  clear();
  maxThickness = 5;
  minThickness = 0.5;
  count = 1000;
  minWidth = width/50;
  maxWidth = width*0.2;
  minHeight = height/10;
  maxHeight = height-(margin * 2);
  margin = width/20;
  for(i = 1; i <= count; i ++) {
    maxHeight *= 0.999;
    fill("#fff");
    thickness = minThickness + (maxThickness * i / count);
    strokeWeight(thickness);

    buildingHeight = minHeight + (maxHeight * Math.random());
    //if (Math.random() > 0.95)
    //  buildingHeight *= 1.2;

    x = margin + width*Math.random()
    buildingWidth = minWidth + Math.random() * maxWidth
    if(x + buildingWidth < width - (margin*2)) {
      rect(x, height-buildingHeight, buildingWidth, buildingHeight);
    }
  }

}


function skyline (height_multiplier,xScale,yScale, variance_amount) {
  //set in parent function and passed in as an argument
  //xScale = 20;
  //yScale = 10;
  margin = width/10;
  //variance_amount = rando(0,0.05) * height_mulitiplier;
  variance_amount *= height_multiplier;
  x1 = x2 = margin;
  y1 = y2 = height-margin;
  while(x2 + width/xScale * rando_variance(variance_amount) < width-(margin*2)) {
    x2 = x1 * rando_variance(variance_amount);
    y2 = (height - margin) - (height_multiplier * (margin + ((height-(margin*3)) * Math.round(Math.random() * yScale)/yScale * rando_variance(variance_amount))));

    //vert
    line(x1,y1,x2,y2);

    x1 = x2 + width/xScale * rando_variance(variance_amount);
    y1 = y2 * rando_variance(variance_amount);

    //horiz
    line(x2,y2,x1,y1);
  }

  //vert
  line(x1,y1,x1,height-margin);


}
