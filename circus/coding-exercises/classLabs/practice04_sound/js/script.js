let on = document.getElementById('on');
let off = document.getElementById('off');

// create a speaker 
let context = new AudioContext();

let destination = context.destination;


// create oscillator
let oscillator = context.createOscillator();
oscillator.frequency.value = 440; //Hertz, 440 correaltes to an A note (4th octave)


//create volume knob
let gain = context.createGain();


// plug oscillator into the volume knob 
oscillator.connect(gain);


// plug the volume knob into the speaker
gain.connect(destination);

// play sound
// use buttons to play sound
let oscillatorHasStarted = false;
on.addEventListener("click", ()=>{
    if(oscillatorHasStarted == false){
        oscillator.start(0);
        oscillatorHasStarted = true;
    }
    gain.gain.value = 1;
});

off.addEventListener("click", ()=>{
    gain.gain.value = 0;
})




