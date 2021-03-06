
window.brain = function() {
  squigCounter = 1;
  x = width/2;
  y = height/2;
  angle = random(2*PI);
  //length = width/5; //random(width/50,width/500);
  thickness = 0.5;
  origX = x;
  origY = y;
  radius = width/3;
//  smoothSquig(width/2,height/2, 200000, width/3, "#003");
}


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

    //save these to return to the caller for making spools, etc.
    var result = new Object();
    result.thickness = thickness;
    result.x = x;
    result.y = y;
  }

  //send back a result object with some useful properties.
  return(result);
}

//viva manchester
window.spool = function(originX, originY, x,y,thickness, spoolWidth, turns, daColor) {
  push();
  stroke(daColor);
  var spoolHeight = spoolWidth * 0.3;
  var offset = spoolWidth/2 * ((x - originX)/Math.abs(x - originX));
  var fatness = thickness;
  strokeWeight(fatness);
  line(originX,originY,x,y);

  //flip it over if it's above the fold
  if(originY < height/2) {
    var yDirection = -1;
  } else {
    var yDirection = 1;
  }

  //flip it over if on the left
  if(originX < width/2) {
    var xDirection = -1;
    //var yOffset = yDirection * fatness*1.001;// + (i * fatness * 1.5);
    x += xDirection * spoolWidth;
    y += xDirection * spoolHeight;
  }

  for(var i = 0; i < turns; i++ ) {
    strokeWeight(fatness);
    //get fatter as we go down
    fatness *= 1.05;

    var yOffset = yDirection * i * fatness*1.001;// + (i * fatness * 1.5);
    stroke(lerpColor(color(0,0,0,255),color(200,0,0,255),i/turns));
    line(x,y + yOffset, x + spoolWidth, y + yOffset + spoolHeight);
    //arc(x,y,spoolWidth,width/80,PI/2,PI*1.8,OPEN);
    //fill("#783937");
    //fill("#EAD94E");
    //ellipse(x+offset,y + (i * thickness * 2),spoolWidth,spoolHeight);
    //break before we hit the top or bottom
    if(y+yOffset+spoolHeight < margin*2 || y+yOffset+spoolHeight > height-margin*2) {
      break;
    }
  }
  pop();
}

window.manchester = function() {
  var clumpCount = 10;
  var margin = width/30;
  var colors = "#0E3A53 #EB3C27 #3267AD #EAD94E".split(" ");

  //clumps
  for(var i = 0; i < clumpCount; i ++){
    var daColor = colors[i % colors.length];
    var cellWidth = ( ( width - ( margin * 2 ) ) / clumpCount);
    var radius = cellWidth*0.6 // radius is less than half cell width so we have some margin.
    var cx = margin + (cellWidth / 2) + (i * cellWidth);
    var cy = margin*2 + (radius);
    var result = smoothSquig(cx,cy, random(8000,50000), radius, daColor);

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

    //draw the gate
    line(cx + (gapWidth/2), gateY, gateEndX ,gateY);

    //line down to the spools
    push();
    stroke(daColor);
    strokeWeight(result.thickness);
    line(result.x,result.y,cx, gateY);
    pop();

    //spool beneath
    //spool(cx,gateY, cx-radius/2, gateY + radius, result.thickness, radius*1.5, 48, daColor);
    //window.spool = function(originX, originY, x,y,thickness, spoolWidth, turns, daColor) {
  }
}

window.dreamcatcher = function() {//function(x,y,rad,count,color,thickness) {
  var x = width/2;
  var y = height/2;
  var count = 1336; //Law has this many twitter followers :)
  var rad = width*0.25;
  stroke("#000");
  var thickness = width/2000;
  strokeWeight(thickness);
  var hole_size = 0.5 //% of rad
  var wildness = 0.95;//=random([0.85,0.95,0.98,0.9]);
  for(i = 0; i < count; i++) {
    var angle = random(2*PI)
    var x1 = x + sin(angle)*rad;
    var y1 = y + cos(angle)*rad;
    var angle2 = angle + random(-PI*(1-hole_size/2), PI*(1-hole_size/2));
    var x2 = x + sin(angle2)*rad;
    var y2 = y + cos(angle2)*rad;

    line(x1,y1,x2,y2);
    if(random(1) > wildness) {
      /*var point = getRandPointOnLine(x1,y1,x2,y2);
      //debug(point.getY());
      x2 = point.getX();
      y2 = point.getY();
      */
      var x3 = x + sin(angle2) * rad * random(1.1,1.75);
      var y3 = y + cos(angle2) * rad * random(1.1,1.75);
      spool(x2,y2,x3,y3,thickness * 1.2 ,  width/random(15,40), random(10,40), "#000");
    }//spool(x2,y2,))
    //originX, originY, x,y,thickness, spoolWidth, turns, daColor
  }
}
