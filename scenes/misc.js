//sketches start here before they mature enough to move to their own files... I think. Let's see how this goes.

var MIN_WIDTH = 10;
var THICKNESS = 1;
//martin luther king
function mlk() {
    var i = 0;
    var cols = 9;
    noStroke();
    //strokeWeight(THICKNESS);
    noFill();
    fill("#000");
    rect(width/2,0,width,height);
    fill("#C90000");
    rect(0,height-(width*2.5/cols),width,height);
    var y = 0;
    var w = width/cols;
    while(y < height) {
      var x = 0;
      while(x < width) {
        if(i % 2 == 0) {
          fill("#000");
        }else {
          fill("#fff");
        }
        //rect(x,y,w,w);
        ellipse(x+(w/2),y+(w/2),w,w);
        x += w;
        i ++;
      }
      y += w;
      //console.log(y);
    }
  }
