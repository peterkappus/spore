function neutrinos (){
  var x1 = random(margin, width-margin);
  var y1 = random(margin, height-margin);

  for(i =0; i < 4000; i++) {
    var x2 = random(margin, width-margin);
    var y2 = random(margin, height-margin);
    var weight = random(width/12000,width/3000);
    var diam = width/80;

    //MUTATE!
    if(Math.random() > 0.9) {
        weight *= random(1.1, 10);
        diam *= random(0.5,2);
    }
    strokeWeight(weight);
    line(x1,y1,x2,y2);
    var point = getRandPointOnLine(x1,y1,x2,y2);
    //debug(point.getY());
    x1 = point.getX();
    y1 = point.getY();
    //fill(randColor());
    ellipse(point.getX(), point.getY(),diam);
  }

}
