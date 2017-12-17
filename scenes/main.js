//TODO: Split this up into various "scenes"


var canvas;
margin = 40; //match document margin

var minWidthForSVG = 500;//minimum pixels to enable SVG (prevents slow performance on a phone)
//probably should do this based on user agent not size...meh.

var foreground_color;
var background_color;

function setThickness(t) {
  strokeWeight(t);
}

function setup() {
  //createCanvas(window.innerWidth-margin*2, window.innerHeight-margin*2,SVG);
  //createCanvas(window.innerWidth-margin*2, window.innerHeight-margin*2);
  //square on mobile
  //createCanvas(window.innerWidth-margin*2, window.innerWidth-margin*2,SVG);
  //if we're probably on a desktop
  //go with SVG
  if(window.innerWidth > minWidthForSVG) {
    canvas = createCanvas(window.innerWidth-margin*2, window.innerWidth-margin*2,SVG);
  }else {
    //regular canvas (much faster for mobile :)
    canvas = createCanvas(window.innerWidth-margin*2, window.innerWidth-margin*2);
  }
  //createCanvas(600, 200, SVG); // Create SVG Canvas

  //createCanvas(window.innerWidth-margin*2, window.innerWidth-margin*2);
  frameRate(80);
}

function grid(margin,w,h) {
  noFill();
  strokeWeight(0.5);
  stroke("#000");
  cols = 400;
  rows = 400;
  x = y = margin;

  for(row = 0; row < rows; row++){
    for (col=0; col < cols; col++) {
        rect(x,y,w,h);
        x = (width * -2) + margin + (col * (w + margin))
        y = (height * -2) + margin + (row * (h + margin)) + (h/2 * (col % 2));
    }
  }
}

function upshot(){
  clear();
  howMany = 5000;
  strokeWeight(0.1);
  for(var i = 0; i < howMany; i++) {
    twig();
  }
}

function twig() {
  x = width * 0.05// * random(0.05,0.3);
  y = height * 0.95 //random(0.7,0.95);
  //y = height*0.8;
  min_dx = width / random(30,100);
  max_dx = min_dx * random(1.1, 1.2);

  min_dy = -height / random(30,100);
  max_dy = min_dy * random(1.1, 1.3);


  dx = random(min_dx, max_dx);
  dy = random(min_dy, max_dy);

  for(var i = 0; i < 30; i++) {
    dx *= random(0.8,1.2);
    dy *= random(0.8,1.2);
    line(x,y,x+dx,y+dy);
    x += dx// * random(0.9,1.1);
    y += dy// * random(0.9,1.1);
  }

}


function debug(msg) {
  console.log(msg);
}

function pattern() {
  clear();
  turns = 3;
  margin = width/(50+(Math.random()*150));
  w = margin * Math.random()*4;
  h = w * Math.random()*4;

  for(i = 0 ; i < turns; i ++ ) {
    rotate(PI/turns);
    translate(width/-5,height/-2)
    grid(margin,w,h);
  }
}

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

function rando(min,max) {
  return (min + (Math.random()*(max-min)))
}


function star(x,y,radius,thickness,lines, fuzziness) {
  strokeWeight(thickness);
  //stroke("#fff");
  turns = lines;
  //stroke(rando(0,255),rando(0,255),rando(0,255));
  //stroke(rando(0,50),rando(0,80),rando(30,150));


  for(var i = 0 ; i < turns; i ++ ) {
    push()
    translate(x,y);
    rotate((i * 2*PI/turns) * rando(0.99999,1.00001));
    wiggle_rad = radius * rando(1-fuzziness,1+fuzziness);
    line(-wiggle_rad,-wiggle_rad,wiggle_rad,wiggle_rad);
    pop()
  }
}

/*function mousePressed() {
  eval(lastFuncString + "()");
}*/

function keyPressed() {
  //alert(keyCode);
  if(keyCode == 68) {

    if(window.innerWidth < minWidthForSVG) {
      alert("Window must be > " & minWidthForSVG & " to capture an SVG");
      return(false);
    }
    //data = canvas.elt.toBlob();
    var svgString = new XMLSerializer().serializeToString(document.querySelector('svg'));

    var blob = new Blob([svgString], {type: "image/svg+xml;charset=utf-8"});
    saveAs(blob, "spore" + Date.now() + ".svg");

    //saveSVG(SVG, "svg","thing");
  }
}

function randomInvert(){
  if(Math.random() < 0.5) {
    background_color = "#fff";
    foreground_color = "#000";
  }else{
    background_color = "#000";
    foreground_color = "#fff";
  }

  //background_color = "#fff";
  //foreground_color = "#005";

}

function setColors() {
  background(background_color);
  stroke(foreground_color);
  fill(foreground_color);
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

function haystack() {
  clear();
  randomInvert();
  setColors();
  margin = width/20
  x = margin
  startY = height/2;
  how_many = rando(10,800);
  ball_size = height/rando(20,200);
  setThickness(rando(width/15000,width/200));

  for(i = 0; i < how_many; i++) {
    x = rando(margin, width-margin);
    y = startY * rando(0.05,1.02);
    angle = Math.PI / 2* rando(0.9, 1.1);

    x2 = rando(margin, width-margin);
    y2 = rando(startY, height-margin);

    line(x,y, x2, y2);

    if(Math.random() > 0.5) {
      fill(background_color);
    }else{
      fill(randColor());
      //fill(foreground_color);
    }
    ellipse(x,y,ball_size);
    ellipse(x2,y2, ball_size);
    //stroke("#000");
  }
}

// a hairball that stays on the screen.
function hairball(origX,origY,radius, steps) {
  //random squiggle
  // if you're in the "turn back" zone, sample the angle from a wider possible angle
  //otherwise, stay relatively strait (possible delta angle is smaller)

  //var steps = 900000;
  strokeWeight(radius/2000);
  var angle = random(2*PI);
  var distance = radius/300;
  var x = origX;
  var y = origY;
  for(var i =0; i < steps; i ++) {
    var x2 = (x + cos(angle) * distance);
    var y2 = (y + sin(angle) * distance);
    line(x,y,x2,y2);
    //are we in the "turnback" zone and heading away from the center?
    if(timeToTurnBack(origX,origY,radius * 0.1, x,y,x2,y2)) {
      angle += random(-PI/8, PI/8);
    }else{
      angle += random(-PI/64,PI/64);
    }

    x = x2;
    y = y2;
  }
}

//if we're more than maxDistance away from origin and our next point is even further away... then it's time to head back to the middle.
function timeToTurnBack(origX,origY,maxDistance,x,y,nextX,nextY) {
  return(dist(origX,origY,x,y) > maxDistance && dist(origX,origY,nextX,nextY) > dist(origX,origY,x,y));
}

function cloud(x,y, rad, isFilled) {
  how_many = rando(4,200);
  //c = "#fff";
  /*if(foreground_color == "#000") {
    c = color(foreground_c,0,0,rando(10,30));
  }else{
    c = color(255,255,255,rando(10,30));
  }*/
  c = color(foreground_color._getRed(), foreground_color._getGreen(), foreground_color._getBlue(), rando(10,30));

  //alert(c);
  //c = color(255,255,255,10);
  for(i = 0; i < how_many; i++) {
    noFill();
    if(isFilled) {
      fill(c);
    }

    noStroke();
    stroke(c);
    rad *= 1.01
    x *= rando(0.99,1.01);
    y *= rando(0.99,1.01);
    ellipse(x,y, rad);
  }
}

function rando_variance(variance) {
  return rando(1-variance, 1+variance)
}

function skyline (height_multiplier,xScale,yScale, variance_amount) {
  //set in parent function and passed in as an argument
  //xScale = 20;
  //yScale = 10;
  margin = width/10;
  //variance_amount = rando(0,0.05) * height_mulitiplier;
  variance_amount *= height_multiplier;
  x1 = x2 = margin;
  y1 = y2 = height-margin;
  while(x2 + width/xScale * rando_variance(variance_amount) < width-(margin*2)) {
    x2 = x1 * rando_variance(variance_amount);
    y2 = (height - margin) - (height_multiplier * (margin + ((height-(margin*3)) * Math.round(Math.random() * yScale)/yScale * rando_variance(variance_amount))));

    //vert
    line(x1,y1,x2,y2);

    x1 = x2 + width/xScale * rando_variance(variance_amount);
    y1 = y2 * rando_variance(variance_amount);

    //horiz
    line(x2,y2,x1,y1);
  }

  //vert
  line(x1,y1,x1,height-margin);


}

function city() {
  clear();
  randomInvert();
  count = 300;
  setThickness(width/1500);
  xScale = rando(3,40);
  yScale = rando(20,80);
  //yScale = 1
  variance_amount = rando(0,0.01);
  for(i = 1; i <= count; i++ ) {
    skyline(i/count,xScale,yScale, variance_amount);
  }
}

// TODO: Port from Spectra
/*
function splatter() {
  class window.Specks
    constructor: (cx,cy,color) ->
      max_distance = sol.width
      min_distance = 0
      min_size = sol.width/1200
      max_size = sol.width/120
      #color = "#000"

      for i in [1..sol.rando(3,200)]
        angle = Math.PI * 2 * Math.random()
        distance = sol.rando(min_distance, max_distance)
        #size = min_size + ((max_distance - distance) / max_distance * (max_size-min_size))
        size = min_size + sol.rando(0,((max_distance - distance) / max_distance * (max_size-min_size)))

        x = cx + (Math.cos(angle) * distance)
        y = cy + (Math.sin(angle) * distance)

        #thickness = sol.rando(sol.width/800,sol.width/90)
        #console.log(x)

        sol.canvas.circle(size).cx(x).cy(y).fill({color: color})
}
*/



function clouds() {
  //clear();
  //randomInvert();
  //background_color =
  background(random(["#fc0","#0af","#fffffe","#332105","#000",randColor()]));


  //console.log(foreground_color);
  //c = color(255,255,255,10);
  how_many  = rando(2,100);
  x = width/2; //rando(margin, width-margin);
  y = height/2; //rando(height*0.2,height*0.8); //rando(margin, height-margin);

  max_rad = rando(height/50, height/10);

  //usually filled
  isFilled = (Math.random() > 0.2);

  //often colorful
  colorful = Math.random() > 0.4;

  foreground_color = randColor();


  //isFilled = true;
  for(j = 0; j < how_many; j++){

    if(colorful) {
      foreground_color = randColor();
    }

    stroke(foreground_color);
    fill(foreground_color);
    //setColors();

    rad = rando(height/500, max_rad);
    x = width * rando(0.25, 0.75);
    y = height * rando(0.25, 0.75);


    //x *= rando(0.9,1.1);
    //y *= rando(0.9,1.1);
    cloud(x,y,rad, isFilled);
  }
}

function city2 () {
  clear();
  maxThickness = 5;
  minThickness = 0.5;
  count = 1000;
  minWidth = width/50;
  maxWidth = width*0.2;
  minHeight = height/10;
  maxHeight = height-(margin * 2);
  margin = width/20;
  for(i = 1; i <= count; i ++) {
    maxHeight *= 0.999;
    fill("#fff");
    thickness = minThickness + (maxThickness * i / count);
    strokeWeight(thickness);

    buildingHeight = minHeight + (maxHeight * Math.random());
    //if (Math.random() > 0.95)
    //  buildingHeight *= 1.2;

    x = margin + width*Math.random()
    buildingWidth = minWidth + Math.random() * maxWidth
    if(x + buildingWidth < width - (margin*2)) {
      rect(x, height-buildingHeight, buildingWidth, buildingHeight);
    }
  }

}

function greenTest() {
  //background("#d0ebdd");
  var green = color(200,250,210,255);
  var white = color(255,255,255,255);
  var black = color(0,0,0,255);
  var a = [];
  //a.push(lerpColor(green,black,0.1));
  a.push(lerpColor(green,black,0.2));
  a.push(lerpColor(green,black,0.3));
  a.push(lerpColor(green,black,0.4));
  a.push(lerpColor(green,black,0.5));
  a.push(lerpColor(green,black,0.6));

  var x = 0;
  noStroke();
  for(i in a) {
    fill(a[i]);
    rect(i*(width/a.length),0,width/a.length,height);
    //fill("#000");
    //text(a[i].toString(), (width/a.length/3) + i*(width/a.length), height * 0.95);
  }
}

function greenback() {
  //background("#d0ebdd");
  var green = color(200,250,210,255);
  var white = color(255,255,255,255);
  var black = color(0,0,0,255);
  //lerp color only works with RGBa color objs
  var lightGreen = lerpColor(green,black,0.4);
  background(lightGreen);
  //background("#e7f1ab");
  //background("#AACA97");
}
/*------------------------------------------------------------------------------------------*/

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



//boom!
//TODO: add "baseColor" parameter and do shades of that color...somehow.
function wreath(){
  clear();
  count = 10000;
  size = width/80
  maxSize = width/20;
  minRad = width*0.15;
  maxRad = width*0.35;
  minShade = 130;
  setThickness(0.5)
  //noStroke();
  //noFill();
  for(i =0; i < count; i++) {
    angle = rando(0, Math.PI*2);
    rad = rando(minRad,maxRad);
    shade =  minShade + ((255-minShade) * (rad-minRad)/(maxRad-minRad))

    if(Math.random() > 0.5) {
      fill(0, shade*rando(0,1), shade);
    }else{
      fill(shade, shade*rando(0,1), 0);
    }
    //fill(shade*rando(0.5,1), shade*rando(0.2,0.4), 0);

    //fill(0, shade*rando(0,1), shade);

    x = width/2  + (Math.sin(angle) * rad);
    y = height/2  + (Math.cos(angle) * rad);
    size = maxSize * ((rad-minRad)/(maxRad-minRad));

    ellipse(x,y,size);
    //ellipse(width/2,height/2,height/10);
  }
}

function generate(whichOne) {
  eval(whichOne + "()");
  lastFuncString = whichOne;
}

function boxRose(x,y,minRad,maxRad) {
  var howMany = 100;
  fill(foreground_color._getRed(),foreground_color._getGreen(),foreground_color._getBlue(),30);
  noStroke();
  push();

  translate(x,y);
  for(var i = 0; i < howMany; i++) {
    //angleMode(RADIANS);
    rotate(2*PI/howMany);
    rect(0,0,random(minRad,maxRad),random(minRad,maxRad));
    //rect(0,0,100,250);
  }

  pop();

  /*
  push();
    translate(width/2,height/2);
    var howMany = 600;
    noFill();
  for(var i = 0; i < howMany; i++) {
    rect(0,0,1*i,1.3*i);
    rotate(2*PI/howMany);
    strokeWeight(0.001*i);

  }
  pop();
  */
}

function boxRoses() {
  foreground_color = color(0,0,0);
  var howMany = random(1,5);
  for(var i = 0; i < howMany; i++) {
    //foreground_color = randColor();
    var minRad = width/random(10,80);
    var maxRad = width/random(2,10);
    boxRose(random(margin,width-margin), random(margin, height-margin),minRad,maxRad);
  }
}

function texture() {
    for(var i = 0; i < 800; i++){
      strokeWeight(random(width/80,))
    }
}

function main() {
  ///hairball(width/2,height/2,width/2,800000);
  //zigs();
  //smoothSquig(width/2,height/2, 20000);
  //grass();
  //circlePow();
  //cast(color(180,200,250));
  //vignette();
  //autumnExplo();
  //city();
  //city2();
  /*(setup();
  clear();
  randomInvert();
  //city();
  */
  //setColors();
  //stars();

  /*foreground_color= "#fff";
  background_color = "#000";*/
  //mountain();
  //poly_line_mountain();
  //haystack();
  //clouds();
}

function parsePalette(data) {
  //debug(data[random(data.length)]['colors']);
  //debug(random(data.length));
  var palette = data[Math.floor(random(data.length))]['colors'];
  zigs(width/200,30,200,palette);
}

function getPalette(keywords, callback) {
  loadJSON("http://www.colourlovers.com/api/palettes/top?format=json&jsonCallback=parsePalette&keywords=" + keywords,"jsonp");
  /*loadJSON("http://www.colourlovers.com/api/palettes/top",{
   onCallback: 'alert',
    format: 'json'
  },"jsonp",'alert');*/

}

function goZigs() {
  //['#000','#fc0','#f09']
  getPalette(random("play ocean mystery funk childhood fun joy colorful wild".split(" ")));
  //zigs(width/20,30,50,["#fc0","#000"]);

}

function zigs(thickness, cols, rows, colors) {
  push();
    strokeCap(ROUND);
    var pointCount = cols;
    var points=[];
    for(i = 0; i < pointCount; i++) {
      var dy = random(height/10,height/50);
      //alternate going up and down
      if( i % 2 == 0) {
        dy *= -1;
      }
      points.push(dy);
    }

    //now we have our deltas... Let's draw our zags
    //var startY = margin*3;
    var yMargin = margin * 3;
    var row_height = (height-yMargin-margin)/rows;
    weight = thickness;
    var x2, y2;
    for(var row = 0; row < rows; row++){
      var x1 = margin;
      var y1 = yMargin + (row * row_height)

      var c = colors[Math.floor(random(colors.length))];
      if(!c.match(/^#/)) {
        c = "#" + c
      }

      debug(c);
      stroke(c);
      strokeWeight(weight);

      for(var p = 0; p < points.length; p++) {
        var dx = (width-(margin*2))/points.length;
        //x1 = margin + p * dx;
        //y1 = margin + (p * )
        x2 = x1 + dx;
        y2 = y1 + points[p];
        //debug(points[p]);
        points[p] *= 0.98;
        line(x1,y1,x2,y2);
        x1 = x2;
        y1 = y2;
      }
      weight *= 1.01;

    }
    pop();
}


function grass() {
  var x = margin;
  stroke("#000");
  var scale = height/3;
  var xscale = scale/3;
  while (x < width-margin) {
    strokeWeight(random(width/12000,width/3000));
    //Use perlin noise!
    var x2 = x + random(-noise(x)*xscale, noise(x)*xscale);
    var y2 = height/2 - noise(x)*scale;

    line(x,height,x2,y2);
    if(Math.random() > 0.9) {
      fill(255,255,255,random(220,250));
      ellipse(x2,y2 + random(-height/10,height/5),random(width/80,width/20));
    }
    //move...
    x += random(width/800,width/600);


  }
}

//TODO: put this somewhere mo betta.
var clot_counter = 0;
var squigCounter = 0;
var x;//width/2;
var y;// = height/2;
var angle;// = random(2*PI);
var length;// = random(width/750,width/500);
var thickness;// = 0.5;
var origX;// = x;
var origY;// = y;
var radius;// = width/3;

//main draw method
// TODO: make this more OO
function draw() {

  if(clot_counter > 0 && clot_counter <= 50) {
    clot();
    clot_counter++;
  }

  if(squigCounter > 0 && squigCounter <= 20000)
  {
    stroke("#000");
    squigCounter++;
//    console.log(squigCounter);
    var x2 = x + (cos(angle)*length)
    var y2 = y + (sin(angle)*length)
    strokeWeight(thickness)
    //line(x,y,x2,y2)
    ellipse(x,y,thickness)
    //change angle by some small +/- amount
    var amt = PI/4 * noise(squigCounter*0.005);
    angle += random(-amt,amt);
    //bigger angle change if we're near the edge (e.g. go back)
    if(timeToTurnBack(origX,origY,radius,x,y,x2,y2)) {
      angle += PI * noise(squigCounter*0.005);
    }

    //change length by some small %
    //length *= random(0.99,1.01);
    length = width*0.008 * noise(squigCounter*0.008);
    //thickness *= randomGaussian(1,0.2);
    //thickness *= random(0.95,1.05)// * width/20000;
    thickness = width/5000 * (80*noise(squigCounter*0.008));
    x = x2;
    y = y2;

    if(squigCounter % 100 == 0) {
      console.log(squigCounter);
      //debug(thickness);
      debug(x);
    }
  }

}

function startClot() {
  //start playing
  clot_counter = 1;
}

function boxPile() {
  for(var i =0; i < 5; i++) {
    //rect()....
    //rotate...
  }
}

function clot() {
  //stroke("#900");
  strokeWeight(random(width/1200,width/300));
  stroke(lerpColor(color("#500"),color("#a00"),random(0,1)));
  var margin = width/20
  /*var x = random(margin, margin*2)
  var y = random(0,margin*2);*/

  var x = width/2;
  var y = height/2;
  var dx = random(-width/100,width/100);
  var dy = random(-width/100,width/100);

  var steps = 300;

  for(var i =0; i < steps; i++){
    dy += random(-width/500,width/500);
    dx += random(-width/500,width/500);

    var x2 = x + dx;
    var y2 = y + dy;

    line(x,y,x2,y2);
    x = x2;
    y = y2;
  }
}


function neutrinos (){
  var x1 = random(margin, width-margin);
  var y1 = random(margin, height-margin);

  for(i =0; i < 4000; i++) {
    var x2 = random(margin, width-margin);
    var y2 = random(margin, height-margin);
    var weight = random(width/12000,width/3000);
    var diam = width/80;

    //MUTATE!
    if(Math.random() > 0.9) {
        weight *= random(1.1, 10);
        diam *= random(0.5,2);
    }
    strokeWeight(weight);
    line(x1,y1,x2,y2);
    var point = getRandPointOnLine(x1,y1,x2,y2);
    //debug(point.getY());
    x1 = point.getX();
    y1 = point.getY();
    //fill(randColor());
    ellipse(point.getX(), point.getY(),diam);
  }

}

class Point {
  constructor (x,y) {
    this.x = x;
    this.y = y;
  }
  getX() {
    return this.x;
  }
  getY() {
    return this.y;
  }
}
