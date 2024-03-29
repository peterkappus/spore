// TODO: borrow from panton/dasCurve

function tree() {
  //strokeJoin(MITRE);
  strokeCap(ROUND);
  noFill();
  //stroke(color(0,0,0,50));
  stroke("#000");
  angleMode(DEGREES);
  branch(width/2,height,width/120,0,width/10,0);
  branch(width/3,height,width/120,0,width/10,0);
  branch(2*width/3,height,width/120,0,width/10,0);

}

function branch(x,y,thickness,angle,length, depth){
  strokeWeight(thickness);
  var newX = x - (sin(angle)*length);
  var newY = y - (cos(angle)*length);
  //debug(depth);
  line(x,y,newX,newY);
  da = 50;
    if(depth < 9){
      for(var i=0; i < 1 + random(1); i++) {
        //debug(i);
        branch(newX,newY,thickness * random(0.6,0.85),angle - (da/2) + random(0,da),length * random(0.5,0.9),depth+1);
        //MUTATION!
        //branch(newX,newY,thickness * random(0.6,0.85),angle - (da/2) + random(0,da),length * random(0.5,0.9) * random([1,1,1,1,1,1,1,1,1,1,1,1,1,random(1,5)]),depth+1);
      }
    } else {
      flower(newX,newY);
    }
}

function flower(x,y) {
  ellipse(x,y, width/200);
  
}
