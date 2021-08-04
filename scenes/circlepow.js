window.circlePow = function() {
  clear();
  background(0,0,50);
  var howMany = 800;
  var minRad = width/200;
  var maxRad = width/3;

  circs = [];
  shade = 0;
  for(var i = 0; i < howMany; i++ ) {
    //shade += 255/howMany;
    //find a place
    var c = new SmartCirc();
    c.x = random(margin, width-margin);
    c.y = random(margin,height-margin);
    c.rad = random(minRad,maxRad);
    c.color = 255//240 + (c.rad/maxRad * 15) //color(200 + random(55));
    //c.color = randColor();
    var attempts = 0;
    while(c.overlapsAny(circs)) {
      if(attempts > 20) {
        console.log("giving up! after " + attempts + " attempts");
        c = null;
        break;
      }
      //move away from circs[j]
      //debug("move away!");
      c.x=random(margin, width-margin)
      c.y = random(margin,height-margin);
      //10% smaller...
      c.rad *= 0.9;

      attempts++;
    }
    //do we still have a circ? or did we nuke it?
    if(c != null) {
      circs.push(c);
      c.draw();
    }
  }
  //vignette();
}

class SmartCirc {

  distanceTo(circ) {
    return Math.hypot(this.x - circ.x,this.y - circ.y);
    //could also use built in p5 "dist(x1,y1,x2,y2)" function... but glad we know about hypot now :) 
  }

  overlaps(circ) {
    //if distance less than rad1 + rad2
    var overlap_margin = width/200;
    var overlap_amount = this.rad + circ.rad - this.distanceTo(circ);
    //console.log(overlap_amount);
    return (overlap_amount > -overlap_margin );
  }

  //overlaps any circ
  overlapsAny(circs) {
    //check 'em all
    for(var j in circs ) {
      //check this one
      if(this.overlaps(circs[j])) {
        //oops overlapping one
        return(true);
      }
    }
    //all clear!
    return(false);
  }

  fancyInside(x,y,rad,daColor) {
    if(rad < width/500) {
      return;
    }

    push();
    var sides = Math.round(random(2,12));
    noStroke();
    fill(daColor);
    ellipse(x,y,rad*2);
    fill(20);
    ellipse(x,y,rad);
    for(var i = 0; i < sides; i++){
      var angle = Math.PI + (2 * Math.PI) * i / sides;

      //inner discs
      var mini_x = x + rad * 0.5 * Math.sin(angle);
      var mini_y = y + rad * 0.5 * Math.cos(angle);

      ellipse(mini_x,mini_y,rad/4);
      this.fancyInside(mini_x,mini_y,rad/10,daColor)

      //middle
      var mini_x = x + rad * 0.75 * Math.sin(angle);
      var mini_y = y + rad * 0.75 * Math.cos(angle);

      ellipse(mini_x,mini_y,rad/7);
      this.fancyInside(mini_x,mini_y,rad/16,daColor)

      //offset middle
      var offset_angle = angle+((Math.PI*2)/(sides*2));
      var mini_x = x + rad * 0.75 * Math.sin(offset_angle);
      var mini_y = y + rad * 0.75 * Math.cos(offset_angle);

      ellipse(mini_x,mini_y,rad/6);

      this.fancyInside(mini_x,mini_y,rad/6.5,daColor)

      //lines
      var x2 = x + rad * Math.sin(angle);
      var y2 = y + rad * Math.cos(angle);

      push();
        strokeWeight(rad/32);
        stroke(20);
        line(x,y,x2,y2);
      pop();

      //centre ring
      push();
        noFill();
        stroke(daColor);
        strokeWeight(rad/30);
        ellipse(x,y,rad*0.7);
      pop();
    }

    //middle dot
    fill(color(255,180,0));
    ellipse(x,y,rad*0.3);

    //this.fancyInside(x,y,rad*0.2,daColor)

    pop();
  }

  draw() {
    //fancy!
    this.fancyInside(this.x,this.y,this.rad,this.color);
  }
}
