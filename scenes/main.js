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

  //var canvasWidth = window.innerWidth * 0.8
  //var canvasHeight = canvasWidth * 10/8;

  //8x10 portrait
  var canvasHeight = window.innerHeight * 0.8;
  var canvasWidth = canvasHeight * 8/10;
  //square
  var canvasHeight = canvasWidth = window.innerHeight * 0.8;
  if(window.innerWidth > minWidthForSVG) {
    canvas = createCanvas(canvasWidth, canvasHeight,SVG);
  }else {
    //regular canvas (much faster for mobile :)
    canvas = createCanvas(canvasWidth, canvasHeight);
  }
  //createCanvas(600, 200, SVG); // Create SVG Canvas

  //createCanvas(window.innerWidth-margin*2, window.innerWidth-margin*2);
  frameRate(80);
  background("#fff");

  //flower();
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

function rando_variance(variance) {
  return rando(1-variance, 1+variance)
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

//boom!
//TODO: add "baseColor" parameter and do shades of that color...somehow.
function wreath(){
  //clear();
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

/*function generate(whichOne) {
  eval(whichOne + "()");
  lastFuncString = whichOne;
}*/

function texture() {
    for(var i = 0; i < 800; i++){
      strokeWeight(random(width/80,))
    }
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
