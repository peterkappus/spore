window.randomSunset = function() {

  //set variables

  //skycolor
  var skyColor = randColor();

  //sun
  var sunColor = randColor();
  var xSun = roundRand(0,1);
  var ySun = roundRand(0,0.5);
  var sunDiam = roundRand(1/15,1/2);

  //land
  var landColor = randColor();
  var yLandStart = roundRand(0.1,0.9);
  var yLandEnd = roundRand(0.1,0.9);

  //copy to clipboard:
  var data = "Make your own: [" +  [rgbToHex(skyColor),rgbToHex(sunColor),xSun,ySun,sunDiam,rgbToHex(landColor),yLandStart,yLandEnd].join(",") + "]";
  $("#placeholder").text(data);
  copyTextToClipboard(data);

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


window.createFromParams = function() {
  //open an input popup
  //parse and create a new sunset

}
