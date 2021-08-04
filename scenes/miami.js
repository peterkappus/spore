
function miami() {
    // boxes
    // for each box, 
    // Pick BG color
    // pick FG color
    // pick one overlay shape (diagnonal line, reverse diagnoal, semi-circle, quarter circle, etc)
    cols = 10;
    for(x = 0; x < width; x += width / cols){
        for(y = 0; y < height; y += height / cols) {
            fancyBox(x,y, height / cols);
        }
    }
  }


  function fancyBox(x,y,w){
    var colors = shuffle(["#fc0","#444","#359","#fa9","#fc0","#444","#359","#fa9","#fff"]);
    fill(colors.shift());
    //strokeWeight(30);
    noStroke();
    rect(x, y, w, w);
    //now put something on top
    fill(colors.shift());

    var type = random([1,2,3,4,5,6,7,8]);
    
    switch(type) {
        case 1:
            beginShape();
            //diag
            if(random() < 0.5) {
                vertex(x,y);
                vertex(x + w, y + w);
            }else {
                //reverse orientation
                vertex(x+w,y);
                vertex(x, y);
            }
            vertex(x, y+w);
            endShape();
            break;
        case 2:
            arc(x, y + (w/2), w, w, -PI/2, PI/2, PIE);
            break;
        case 3:
            arc(x+w, y + (w/2), w, w, -PI/2, PI/2, PIE);
            break;
        case 4:
            arc(x, y, w * 2, w * 2, 0, PI/2, PIE);
            break;
        case 5:
            arc(x+w, y+w, w * 2, w * 2, PI, PI * 2, PIE);
            break;
        case 6:
            rect(x,y,w/2,w);
            break;
        case 7:
            rect(x,y + (w/2), w, w / 2);
            break;
        case 8:
            arc(x+w, y + (w/2), w, w, PI/2, 3/2 * PI, PIE);
            break;
      }
    
}