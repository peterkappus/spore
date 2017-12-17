
function hydroVents() {
  //stroke(rando(0,255),rando(0,255),rando(0,255));
  //stars();
  for(j = 0; j < 3; j++) {
    fuzzyChain();
  }
}


function fuzzyChain () {
    //x1 = rando(0,)
    //walk the chain, use the previous radius + new radius
    x = rando(0,width);
    y = height;
    max_rad = width/200;
    min_rad = max_rad / 2;
    max_fuzz = 0.08;
    i = 0;
    rad = rando(min_rad, max_rad);
    while(y > 0 && i < 50) {
        thickness = 0.025;
        turns = rando(10,5000);
        fuzziness = rando(max_fuzz * 0.1, max_fuzz)
        star(x,y,rad,thickness, turns, fuzziness);
        angle = (2*Math.PI) + rando(-Math.PI*0.8, Math.PI*0.8);
        old_rad = rad;
        rad = rando(min_rad, max_rad);
        max_rad *= 1.008;
        max_fuzz *= 1.006;
        distance = (rad + old_rad);
        /*old_x = x;
        old_y = y;
        line(old_x, old_y, x,y);*/
        x -= sin(angle) * distance;
        y -= cos(angle) * distance;
        //console.log(y);
        //console.log(i);
        //console.log(sin(angle) * (rad + old_rad));
        //rad = new_rad;
        i++;
    }
}

function stars() {
  clear();
  randomInvert();
  setColors();
  how_many = rando(2,55);

  //fuzziness = rando(0,0.5);

  for(i = 0; i < how_many; i++){
    radius = width/rando(0.25,20);
    turns = rando(10,5000);
    thickness = rando(0.025,0.05);
    //per circle fuzziness
    fuzziness = rando(0.05,0.8);

    star(rando(0,width),rando(0,height),radius,thickness,turns, fuzziness);
    //console.log (rando(0,5));
  }
}


function star(x,y,radius,thickness,lines, fuzziness) {
  strokeWeight(thickness);
  turns = lines;

  for(var i = 0 ; i < turns; i ++ ) {
    push()
    translate(x,y);
    rotate((i * 2*PI/turns) * rando(0.99999,1.00001));
    wiggle_rad = radius * rando(1-fuzziness,1+fuzziness);
    line(-wiggle_rad,-wiggle_rad,wiggle_rad,wiggle_rad);
    pop()
  }
}
