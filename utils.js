
window.randColor = function() {
  return(color(random(255),random(255),random(255)));
}

window.getRandPointOnLine = function(x1,y1,x2,y2) {
  var dx = x2 - x1;
  var dy = y2 - y1;
  var distance = dist(x1,y1,x2,y2); //same as Math.hypot?
  var distance2 = Math.random() * distance;
  var freshX = x1 + ((distance2/distance) * dx);
  var freshY = y1 + ((distance2/distance) * dy);
  return(new Point(freshX,freshY));

  //a^2 + b^2 = c^2
  //hyp = sqrt((x1-x2)^2 + (y2 - y1)^2))
  //x1

}
