//sketches start here before they mature enough to move to their own files... I think. Let's see how this goes.

var MIN_WIDTH = 10;
var THICKNESS = 1;
//martin luther king
function mlk() {
    var i = 0;
    var cols = 30;
    noStroke();
    //strokeWeight(THICKNESS);
    noFill();
    fill("#000");
    rect(0,0,(width/4)-(width/cols/2),height);
    rect(width/2,0,(width/4)-(width/cols/2),height);
    fill("#C90000");
    rect(0,height*0.75,width,height);
    mlk_recurse(0,30);
    fill("#f00");
}

function mlk_recurse(y,cols) {
  var x = 0;
  var w = (width)/cols;
  while(x < width) {
    if(i % 2 == 0) {
      fill("#000");
    }else {
      fill("#fff");
    }

    //rect(x,y,w,w);
    ellipse(x,y,w,w);

    x += w;
    i ++;
  }
  //recurse if we're not too small (or at the bottom)
  if(w >= MIN_WIDTH) {
    mlk_recurse(y+w,cols);
  }
}
