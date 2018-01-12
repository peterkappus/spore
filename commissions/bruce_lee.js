
//simulate Bruce's Game of Death costume

function bruce() {
  var box_width = width/15;
  spine(width/2,box_width, "#111",0.02);
  var yellow_width = box_width * 4
  spine(width/2 - yellow_width*0.6, yellow_width, "#ea0",0.5);
  spine(width/2 + yellow_width*0.6, yellow_width, "#ea0",0.5);
}

//a single stripe of color
function spine(x,base_box_width, daColor,wild) {
  //backround("#99aaff");
  daColor = color(daColor);
  noStroke();
  fill(color(daColor._getRed(), daColor._getGreen(), daColor._getBlue(),50));
  var margin = height/50;

  var box_height = base_box_width*0.2;
  var y = margin + box_height;

  while(y < height - margin) {
    //box...
    box_height *= random(0.95,1.05);
    //var box_width = base_box_width * random(1-wild,1+wild);
    box_width = noise(y/height * 50*wild) * 2 * base_box_width;

    console.log(box_width);
    push();
      translate(x,y);
      rotate(random(-PI/20,PI/20));
      rect(-box_width/2,-box_height/2,box_width,box_height);
    pop();
    y += box_height * random(0.9,1.1);


  }
}
