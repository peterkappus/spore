/* misc useful stuff... */

//use the built in p5 random method instead of this...
window.randColor = function() {
  return(color(random(255),random(255),random(255)));
}

function getCustomBackground() {
    background(prompt("Hex Color for background:"));
}

function setAlpha(colorToChange,alpha) {
  return(color(colorToChange._getRed(),colorToChange._getGreen(),
  colorToChange._getBlue(), alpha));
}


function changeBrightness(colorToChange, percentChange) {
  return(color(colorToChange._getRed() * percentChange,colorToChange._getGreen() * percentChange,
  colorToChange._getBlue() * percentChange, colorToChange._getAlpha()));
}


window.shuffle = function(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
  }
}

//dervied from https://stackoverflow.com/questions/22581345/click-button-copy-to-clipboard-using-jquery
/*
window.copyTextToClipboard = function(text) {
    var temp = $("<input>");
    $("body").append(temp)//.css("width","100%");
    temp.val(text).select();
    //$("#data").val(text).select();
    document.execCommand("copy");
    //$("#data").val(text).blur();
    temp.remove();
}
*/

window.rgbToHex = function(c) {
  return('#'+('000000'+(c._getRed()<<16|c._getGreen()<<8|c._getBlue()).toString(16)).slice(-6)); // r, g, and b are ints 0..255
}

window.hexToRGB = function(hexString) {
    var c = color(hexString);
    return (color(c._getRed(), c._getGreen(), c._getBlue(),255));
}

window.roundRand = function(min,max) {
  //round to two decimal places
  return(Math.round(random(min,max)*100)/100);
}

window.getRandPointOnLine = function(x1,y1,x2,y2) {
  var dx = x2 - x1;
  var dy = y2 - y1;
  var distance = dist(x1,y1,x2,y2); //same as Math.hypot?
  var distance2 = Math.random() * distance;
  var freshX = x1 + ((distance2/distance) * dx);
  var freshY = y1 + ((distance2/distance) * dy);
  return(new Point(freshX,freshY));

  //a^2 + b^2 = c^2
  //hyp = sqrt((x1-x2)^2 + (y2 - y1)^2))
  //x1

}

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
    saveAs(blob, "abstraktor" + Date.now() + ".svg");

    //saveSVG(SVG, "svg","thing");
  }
}

//draw a wobbly rectangle using the current stroke & fill
function wobbleRect(x,y,w,h) {
  curveTightness(0);
  beginShape();
  var wobble = 3;//width/8000; //pixels
  wobblyVertex(x,y,wobble);
  wobblyVertex(x,y,wobble);
  wobblyVertex(x+w,y,wobble);
  wobblyVertex(x+w, y+h,wobble);
  wobblyVertex(x,y+h,wobble);
  endShape(CLOSE);
}

function wobblyVertex(x,y,wobble) {
  //curveVertex(x,y);
  curveVertex(x + random(-wobble,wobble), y + random(-wobble,wobble));
}

function wonkyCirc(x,y,rad) {
  //4 points...
  var points = 4;
  //top right
  var x1 = x;
  var y1 = y - rad;
  var cx1 = x + rad;//(rad * 4 * tan(Math.PI/2*points)/3);
  var cy1 = y1;
  var cx2 = x + rad;
  var cy2 = y - (rad * 4 * tan(Math.PI/2*points)/3);
  var x2 = x + rad;
  var y2 = y;
  bezier(x1,y1,cx1,cy1,cx2,cy2,x2,y2);




//alert((4 * tan(Math.PI/2*points)/3));
  //right side

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

//TODO: use the built-in "random" function in P5, instead.
function rando(min,max) {
  return (min + (Math.random()*(max-min)))
}

//shortcut to print to console
function debug(msg) {
  console.log(msg);
}
