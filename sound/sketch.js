var playing = false;

//seconds
var reverbTime = 15;


var attackLevel = 0.2; //low to prevent clipping in captured file
var releaseLevel = 0;

var attackTime = 1;
var decayTime = 0.2;
var susPercent = 1;
var releaseTime = 5;

//var notes = [0,6,7,9,12,14,16,19,24];
//var notes = [ 0, 2, 4, 7, 9, 11 ];
var notes = [0, 2, 4, 7, 9, 11, 14];

//lowest note
var bottom_pitch = 45;

var env, osc;

//let's record
var recorder, soundFile;

//frame counter
//var frame =0;
var rate = 6;

var bgColor;

function setup() {
  createCanvas(window.innerHeight, window.innerHeight);

  bgColor = color("#375fa3");
  backgroundColor = color(bgColor);
  textAlign(CENTER);

  env = new p5.Env();
  env.setADSR(attackTime, decayTime, susPercent, releaseTime);
  env.setRange(attackLevel, releaseLevel);

  osc = getOsc(env);

  //start a lower pitch
  //osc2 = getOsc(env);


  frameRate(rate);

  //record it!
  recorder = new p5.SoundRecorder();

  //avoid clipping in captured audio
  masterVolume(0.5)

}

function getOsc(envelope) {
  var myOsc = new p5.Oscillator('sin');
  myOsc.amp(envelope);

  reverb = new p5.Reverb();
  reverb.process(myOsc,reverbTime,1);

  myOsc.start();
  return(myOsc);
}


function draw() {
  var index = Math.round(random(notes.length));

  if(playing) {
    //circles
    //fill(randColor());
    fill(0,0,0,150);
    noStroke();
    var cols = 10;
    var diam = width/cols;
    ellipse(Math.round(random(cols-1)) * diam + (diam/2),Math.round(random(cols-1)) * diam + (diam/2),diam*0.8);
  }

  //fade....
  fill(color(bgColor._getRed(),bgColor._getGreen(),bgColor._getBlue(),20));
  rect(0,0,width,height);


  octave = Math.round(random(0,4));
  note = random(notes);
  osc.freq(midiToFreq(bottom_pitch + octave * 12 + random(notes)));

  //lower note... change more slowly (every 16 beats)
  /*octave = Math.round(random(0,2));
  if(frame % 16 == 0) {
    osc2.freq(midiToFreq(bottom_pitch + octave * 12 + random(notes)));
  }
  */
  //rate += 0.01;

  //frameRate(rate);
}


function startRecording() {
  debug('start recording');
  soundFile = new p5.SoundFile();
  recorder.record(soundFile);
}

function debug(msg){
  console.log(msg);
}

function stopRecording() {
  recorder.stop();
  save(soundFile, 'abstraktor.wav');
}

function mousePressed() {
  if (mouseX > 0 && mouseX < width && mouseY < height && mouseY > 0) {
    if (!playing) {
      startRecording();
      env.triggerAttack();
      background(bgColor);
      playing = true;
    } else {
      env.triggerRelease();
      //stop recording after reverbtime + 10%
      setTimeout(function() {
        debug('stopping recording (after reverb stops)');
        stopRecording()}, (reverbTime + releaseTime) * 1000 * 1.1);
      playing = false;
    }
  }
}
