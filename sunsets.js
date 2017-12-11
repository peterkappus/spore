window.randomSunset = function(paletteString = "") {
  debug(paletteString.length);
  //set variables
  //skycolor
  var skyColor = randColor();

  //sun
  var sunColor = randColor();
  var xSun = roundRand(0,1);
  var ySun = roundRand(0,0.5);
  var sunDiam = roundRand(1/15,1);

  //land
  var landColor = randColor();
  var yLandStart = roundRand(0.1,0.9);
  var yLandEnd = roundRand(0.1,0.9);

  //copy to clipboard:
  var data = "Made by @abstraktor. #sunset #abstractart #modernart #hardedge #colorful #bright #vibrant #shapes #sun #moon #minimal #geometric #contemporaryart #instaart#landscape#dailyart#horizon#sky#evening#dawn#poster#dailyart#circle data: [" +  [rgbToHex(skyColor),rgbToHex(sunColor),xSun,ySun,sunDiam,rgbToHex(landColor),yLandStart,yLandEnd].join(",") + "]";
  $("#placeholder").val(data);
  //$("#placeholder").select();
  //$("#placeholder").selectionStart=0;
  //$("#placeholder").selectionEnd=$("#placeholder").value.length;
  //copyTextToClipboard(data);

  //with myles
  //var yeah = paletteString.length > 0;

  if(paletteString.length > 0) {
    var daColors = shuffle(paletteString.split(" "));
    debug(daColors.pop());
    skyColor = daColors.pop();
    sunColor = daColors.pop();
    landColor = daColors.pop();
  }

  //draw!
  sunset(skyColor,sunColor,xSun,ySun,sunDiam,landColor,yLandStart,yLandEnd);
}

window.sunset = function(skyColor,sunColor,xSun,ySun,sunDiam,landColor,yLandStart,yLandEnd) {
  clear();
  //sky
  background(skyColor);
  noStroke();

  //sun
  fill(sunColor);
  var
  rad = ellipse(width * xSun, width * ySun, width * sunDiam, width * sunDiam);

  //land
  fill(landColor);
  beginShape();
  vertex(0,height * yLandStart);
  vertex(width, height * yLandEnd);
  vertex(width,height);
  vertex(0,height);
  endShape(CLOSE);
}

window.retreiveSunset = function() {
  var string = prompt("Paste your param string [xxx]:");
  var paramArray = string.match(/\[(.+?)\]/)[1].split(",");
  sunset(paramArray[0],paramArray[1],paramArray[2],paramArray[3],paramArray[4],paramArray[5],paramArray[6],paramArray[7]);
}
