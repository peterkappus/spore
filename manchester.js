

//For Vix & Law
/*------------------------------------------------------------------------------------------*/
window.smoothSquig = function(origX,origY,steps,radius,daColor) {
  var angle = random(2*PI);
  var length = random(width/750,width/500);
  stroke(daColor);
  var thickness = 0.5;
  var x = origX;
  var y = origY;
  for(var i =0; i < steps; i++) {
    var x2 = x + (cos(angle)*length)
    var y2 = y + (sin(angle)*length)
    strokeWeight(thickness)
    line(x,y,x2,y2)
    //change angle by some small +/- amount
    angle += random(-PI/4,PI/4);
    //bigger angle change if we're near the edge (e.g. go back)
    if(timeToTurnBack(origX,origY,radius,x,y,x2,y2)) {
      angle += random(-PI,PI);
    }

    //change length by some small %
    //length *= random(0.99,1.01);
    length = width/800 * noise(i*0.005);
    //thickness *= randomGaussian(1,0.2);
    //thickness *= random(0.95,1.05)// * width/20000;
    thickness = width/50000 * (80*noise(i*0.008));
    x = x2;
    y = y2;
    //spin off a spool
    /* NO SPOOLS! (for now)
    if(Math.random() > 0.9995) {
      spool(x,y,x+random(-width/10,width/10), y + random(-height/10,height/10), thickness, random(width/30,width/15), random(25,60), "#EB3C27");
    }
    */

  }
}

//viva manchester
window.spool = function(originX, originY, x,y,thickness, spoolWidth, turns, daColor) {
    push();
    strokeWeight(thickness);
    stroke(daColor);
    var spoolHeight = spoolWidth * 0.3;
    var offset = spoolWidth/2 * ((x - originX)/Math.abs(x - originX));
    for(var i = turns; i > 0; i-- ) {
      var yOffset = (i * thickness * 2);
      line(x,y + yOffset,x + spoolWidth,y+yOffset+spoolHeight);
      //arc(x,y,spoolWidth,width/80,PI/2,PI*1.8,OPEN);
      //fill("#783937");
      fill("#EAD94E");
      //ellipse(x+offset,y + (i * thickness * 2),spoolWidth,spoolHeight);
    }
    line(originX,originY,x,y);

    pop();
}

window.manchester = function() {
  var clumpCount = 5;
  var margin = width/30;
  var colors = "#0E3A53 #EB3C27 #3267AD #EAD94E".split(" ");

  //clumps
  for(var i = 0; i < clumpCount; i ++){
    var daColor = colors[i % colors.length];
    var cellWidth = ( ( width - ( margin * 2 ) ) / clumpCount);
    var radius = cellWidth*0.6 // radius is less than half cell width so we have some margin.
    var cx = margin + (cellWidth / 2) + (i * cellWidth);
    var cy = margin*2 + (radius);
    smoothSquig(cx,cy, random(30000,130000), radius, daColor);

    //draw the "gates" that allow the thread through
    var thickness = width / 120;
    var gateY = cy + radius + (margin * 2) + (thickness/2); //add some margin
    var gapWidth = width / 20;
    stroke("#783937");
    strokeWeight(thickness);
    var gateEndX = cx + cellWidth - (gapWidth/2);
    //if we're on the last one...
    if(gateEndX > width) {
      //make it shorter so it doesn't run off the canvas
      gateEndX = cx + cellWidth/2 - (gapWidth/2);
      //and draw the short one on the left, too...
      line(margin, gateY, margin + cellWidth/2 - (gapWidth/2) ,gateY);
    }
    line(cx + (gapWidth/2), gateY, gateEndX ,gateY);

  }

  //gates

}
