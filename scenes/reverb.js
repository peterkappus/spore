

var muted = false;
var reverbTime = 40;
var myVerb;
//var reverbs = [];

//press "M" to mute
//press ENTER to save

function reverby() {
  //alert(")

  mic = new p5.AudioIn();
  mic.start();

  myVerb = new p5.Reverb();
  myVerb.process(mic,reverbTime,1);

  startRecording();
}


function keyPressed() {
  //alert(keyCode);

  if(keyCode == 13){
    stopRecording();
  }

  //s to "set" reverb
  //need a way to start a new reverb object...
  //okay, but how to remove them?
  if(keyCode == 83) {
    myVerb.set(reverbTime);
    /*newVerb = new p5.Reverb();
    newVerb.process(mic,reverbTime,1);
    reverbs.push(newVerb);
    */
  }

  //myVerb.set(reverbTime);

  //mute "m"
  if(keyCode == 77 ) {
    if(muted) {
      mic.start();
    }else{
      mic.stop();
    }
    muted = !muted;
  }
  //alert(keyCode);
}
