//Alexander Calder Cacti

// TODO: borrow from panton/dasCurve

function cacti() {
  var thickness = width/50;
  noFill();
  strokeWeight(thickness);
  stroke("#000");
  strokeJoin(ROUND);
  
  var points = [];

  var y = height;
  var x = width/2;
  var min_dy = height / 50;
  var max_dy = height * 0.5;
  var min_dx = min_dy / 3;
  var max_dx = max_dy * 0.8;
  var max_rad = height/20;
  var min_rad = height/40;

  beginShape();
  //begin at the bottom...
  vertex(x,y);
  var limit = random(height/2);
  while(y - max_dy > limit) {
      //up!
      vertex(x,newY(x,y));

      points.push(new Point(x,y));
      
      //over (left or right, less than up)
      findNewPoint(x,y,dx());
      vertex(newX(x,y),y);
      
      points.push(new Point(x,y));
      
      debug(x);
      //thickness *= 0.9;
      stroke(thickness);
  }
  endShape();
  
  //cactus top
  fill("#fc0");
  strokeWeight(width/200);
  ellipse(x,y, min_rad + random(max_rad * ((height-y)/height)));
  
  //ellipse(p.getX(), p.getY(), height/4);
  //return(new Point(x,y));
  
}

//moveX
function newX(x,y) {
  
}

function newY(x,y) {
  proposedY = y - min_dy + random(max_dy);
  for(var j in points ) {
    //check this one
    if(this.overlaps(circs[j])) {
      //oops overlapping one
      return(true);
    }
  }
  while(dist(x,y,x,proposedY)
}

function overlaps() {
  
}

function findNewPoint(x,y,func){
  proposedX = x + min_dx + random(max_dx) - (max_dx / 2);
  proposedY = 
}
