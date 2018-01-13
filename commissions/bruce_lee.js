
//simulate Bruce's Game of Death costume

var ALPHA;
var MARGIN;

//sampled by kim:
/*Bright: #e7be20, #000000
Vintage: #f1cb64, #242018*/

// more mellow yellow: #ea0
function bruce() {
  //blendTest();
  //return;
  var yellow = "#fc0"; //"#ea0";
  //ecb145 ...fb4
  ALPHA =80;
  MARGIN = height/15;
  var box_width = width/5;
  for(i = 0; i < 2; i++) {
    //middle black spine
    spine(width/2,box_width, "#333",1.5,"center");
    var yellow_width = box_width*1.5;

    /*//left side (right aligned)
    spine(width/2 - box_width/2, yellow_width, yellow,1, "right");
    //right side (left aligned)
    spine(width/2 + box_width/2, yellow_width, yellow,1,"left");*/
  }

  //nevermind... I don't think librsvg supports "blend-mix-mode" styles, yet.
  // svgBlendMode("multiply");

}

//a single stripe of color
// wild: wildness (1:normal, 0.5:half, 2: 200%, etc)
function spine(x, base_box_width, daColor, wild, alignment) {
  margin = MARGIN;
  //backround("#99aaff");
  //turn our string into a real colour
  daColor = color(daColor)
  //re-create with alpha
  daColor = color(daColor._getRed(), daColor._getGreen(), daColor._getBlue(),ALPHA)

  //create color from string parameter
  //daColor = changeBrightness(daColor,1.3);
  noStroke();
  //stroke(daColor);
  //strokeWeight(20);
  fill(daColor);
  //noFill();
  var box_height = base_box_width * 0.1;
  var y = margin;

  while(y < height - margin) {
    //box...
    box_height *= random(0.95,1.05);
    //var box_width = base_box_width * random(1-wild,1+wild);
    box_width = noise(y/height*5) * 2 * wild * base_box_width;

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




/*  STUDIES */



function blendTest() {
  //doesn't work w/ SVG canvas (:
  //blendMode(MULTIPLY);
  //but the below works. Now in a custom function (see utils.js)
  //$("path").css("mix-blend-mode","multiply");

  fill("#fc0");
  //stroke("#fc0");
  //noFill();
  noStroke();
  //strokeWeight(width/5);
  ellipse(width*3/8,height/2,width/3,width/3);
  //stroke("#da0");
  ellipse(width*5/8,height/2,width/3,width/3);


strokeWeight(30);
stroke(80, 150, 255);
line(25, 25, 75, 75);
stroke(255, 50, 50);
line(75, 25, 25, 75);

//see custom function.
//Apply after drawing vectors as this applies a class after the fact
svgBlendMode("multiply");

}
