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


function setup() {
  createCanvas(window.innerWidth, window.innerHeight);

backgroundColor = color("#fc0");
  textAlign(CENTER);

  env = new p5.Env();
  env.setADSR(attackTime, decayTime, susPercent, releaseTime);
  env.setRange(attackLevel, releaseLevel);

  osc = getOsc(env);

  //start a lower pitch
  //osc2 = getOsc(env);
  frameRate(6);

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
  octave = Math.round(random(0,4));
  osc.freq(midiToFreq(bottom_pitch + octave * 12 + random(notes)));
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
      background("#fc0");
      playing = true;
    } else {
      env.triggerRelease();
      background("#fff");
      //stop recording after reverbtime + 10%
      setTimeout(function() {
        debug('stopping recording (after reverb stops)');
        stopRecording()}, (reverbTime + releaseTime) * 1000 * 1.1);
      playing = false;
    }
  }
}
