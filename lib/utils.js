

window.randColor = function() {
  return(color(random(255),random(255),random(255)));
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
