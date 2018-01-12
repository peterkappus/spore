
//simulate Bruce's Game of Death costume

var ALPHA = 80;
var MARGIN;

function bruce() {
  MARGIN = height/15;
  var box_width = width/8;
  for(i = 0; i < 6; i++) {
    spine(width/2,box_width, "#111",0.5,"center");
    var yellow_width = width/4;
    spine(width/2 - box_width/2, yellow_width, "#ea0",0.2, "right");
    spine(width/2 + box_width/2, yellow_width, "#ea0",0.2,"left");
  }
}

//a single stripe of color
function spine(x, base_box_width, daColor, wild, alignment) {
  margin = MARGIN;
  //backround("#99aaff");
  daColor = color(daColor);
  noStroke();
  fill(color(daColor._getRed(), daColor._getGreen(), daColor._getBlue(),ALPHA));
  var box_height = base_box_width * 0.2;
  var y = margin;

  while(y < height - margin) {
    //box...
    box_height *= random(0.95,1.05);
    //var box_width = base_box_width * random(1-wild,1+wild);
    box_width = noise(y/height) * 2 * base_box_width;

    //console.log(box_width);
    push();
      var start_x = x;
      switch(alignment) {
        case "right":
          start_x = -box_width;
          break;
        case "left":
          start_x = 0;
          break;
        default:
          start_x = -box_width/2;
          break;
        }
        start_x += random(-width/40,width/40);

        translate(x,y);
        rotate(random(-PI/20,PI/20));
      rect(start_x,-box_height/2,box_width,box_height);
    pop();

    y += box_height * random(0.9,1.1);


  }
}
