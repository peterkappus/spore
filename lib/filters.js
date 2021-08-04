// Various filters and splatters, crackles, etc. to add to images.

function splatter(daColor) {
  /*if(daColor != "") {
    c = daColor;
  }*/
  noStroke();
  //stroke(c);
  cx = random(width);
  cy = random(height);

  var angle, distance, i, j, max_distance, max_size, min_distance, min_size, ref, size, x, y;
  max_distance = width/3;
  min_distance = 0;
  min_size = width / 1200;
  max_size = width / 120;
  count = random(3,200);
  for (i = 0; i < count; i++) {
    fill(random(["#000","#fff"]));
    angle = Math.PI * 2 * Math.random();
    distance = random(min_distance, max_distance);
    size = min_size + random(0, (max_distance - distance) / max_distance * (max_size - min_size));
    x = cx + (Math.cos(angle) * distance);
    y = cy + (Math.sin(angle) * distance);
    ellipse(x,y,size);
  }
}

function svgBlendMode(mode) {
  //slightly weird hack...
  // add this CSS to every path since the "blendMode()" function doesn't work.
  $("path").css("mix-blend-mode",mode);
}

function cast(daColor) {
  var x = width/2;
  var y = height/2;
  var rad = 1;
  //var howMany = 80;
  var alpha = 30;
  var weight = width/100;

  while(rad < (width) * Math.sqrt(2)){
    push();
      noFill();
      strokeWeight(weight);
      stroke(color(daColor._getRed(), daColor._getGreen(), daColor._getBlue(),alpha));
      ellipse(x,y,rad);
      rad += weight;
      //alpha *= 0.998;
    pop();
  }
}

function goCrackle() {
  var daColor = random(["#300","#000"]);
  crackle(random(width),random(height),random(200,10000),daColor);
}

//small fuzzy cracklybits like dirt
function crackle(x,y,steps,daColor) {
  var dx = width/150
  var dy = height/150
  stroke(daColor);
  strokeWeight(0.05)
  for(var i =0; i < steps; i++) {
    var x2 = x + random(-dx,dx);
    var y2 = y + random(-dy,dy);
    line(x,y,x2,y2)
    x = x2
    y = y2
  }
}

function vignette() {
  var x = width/2;
  var y = height/2;
  var rad = width/8;
  var alpha = 1;
  var weight = width/300;

  while(rad < (width) * Math.sqrt(2)){
    push();
      noFill();
      strokeWeight(weight);
      stroke(color(0,0,0,alpha));
      ellipse(x,y,rad);
      rad += weight;
      alpha *= 1.015;
    pop();
  }
}
