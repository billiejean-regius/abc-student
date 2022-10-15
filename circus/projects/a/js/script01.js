let mainText = document.getElementById("main-text");
let allowButton = document.getElementById("allowButton")

// from: https://stackoverflow.com/a/14301832
window.mobileAndTabletcheck = function() {
    var check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
};

if(window.mobileAndTabletcheck()){
    mainText.innerHTML = "🌀";
    document.getElementById("getGyroAccess").style.display = "block";
    allowButton.addEventListener("click", permission)

}else{
    mainText.innerHTML = "The stars do not align on this device. Choose another fate.";
}

// let on = document.getElementById("on");
// let off = document.getElementById("off");


let hertzDisplay = document.getElementById("hertzDisplay");
let minSlider = document.getElementById("min");
let minLabel = document.getElementById("min-label");
let maxSlider = document.getElementById("max");
let maxLabel = document.getElementById("max-label");


// let volumeRange = document.getElementById("volumeInput");

let context = new AudioContext();
let destination = context.destination;

let oscillator = context.createOscillator();
oscillator.type = "triangle";
oscillator.frequency.value = 440;

let gain = context.createGain();

oscillator.connect(gain);
gain.connect(destination);



// // initialise the volume:
// // we divide the value from the slider by 100 to bring it back to
// // a value between 0 and 1
gain.gain.value = 1;

let minHz = 65;
let maxHz = 1050;
let initalMin = 65;
let initalMax = 1050
minSlider.min = minHz;
minSlider.max = maxHz;
minSlider.value = initalMin;
minLabel.innerHTML = initalMin;
minHz = initalMin;

maxSlider.min = minHz;
maxSlider.max = maxHz;
maxSlider.value = initalMax;
maxLabel.innerHTML = initalMax;
maxHz = initalMax;


minSlider.addEventListener("input", ()=>{
    minHz = Number(minSlider.value);
    minLabel.innerHTML = minSlider.value;
})
maxSlider.addEventListener("input", ()=>{
    maxHz = Number(maxSlider.value);
    maxLabel.innerHTML = maxSlider.value;
})

// let midHz = (minHz + maxHz)/2;
function map(value, x1, y1, x2, y2){
    return (value - x1) * (y2 - x2) / (y1 - x1) + x2;
  }

let mappedHertz = map(1, 0, 100, minHz, maxHz);
// console.log("mapped hertz is", mappedHertz)
oscillator.frequency.value = mappedHertz;
hertzDisplay.innerHTML = mappedHertz;


let showDebug = false;
let debugButton = document.getElementById("debugbutton");
let debugInfo = document.getElementById("debug");
debugButton.addEventListener("click", ()=>{
    showDebug = !showDebug;
    debugInfo.style.display = showDebug?"block":"none";
    
})

let faceDownTimer = undefined;
let faceDownAlarm = false;
let wasFacedownBefore = false;
let playing = false;
let oscillatorStarted = false;

let instruct = document.getElementById('instructions');
// let quote = document.getElementById('quote');
// quote.style.display = "none";

class Item {
    constructor(name, state) {
        this.name = name;
        this.state = state;
    }
};
class Card extends Item { // extend: Card is a subclass of item 
    constructor (name, damage, state, rarity, image) {
        super(name, state); // super() refers to the parent class item. The arguments are fed into the parent item
        this.damage = damage; 
        this.rarity = rarity;
        this.image = image;
    }
};

// all collectible cards
let collectibles = [
    // creating card objects
    
    chariot = new Card ("The Chariot", 5, 1, 0, "url('js/cards/tarot01.png')"),
    strength = new Card ("Strength", 5, 1, 0, "url('js/cards/tarot02.png')"),
    highpriestess = new Card ("The High Priestess", 5, 1, 0, "url('js/cards/tarot03.png')"),
    ninerings = new Card ("Nine of Rings", 5, 1, 0, "url('js/cards/tarot04.png')"),
    magician = new Card ("The Magician", 5, 1, 0, "url('js/cards/tarot05.png')"),
    threerings = new Card ("Three of Rings", 5, 1, 0, "url('js/cards/tarot06.png')"),
    eightrings = new Card ("Eight of Rings", 5, 1, 0, "url('js/cards/tarot07.png')"),
    fool = new Card ("The Fool", 5, 1, 0, "url('js/cards/tarot08.png')"),
    twoswords = new Card ("Two of Swords", 5, 1, 0, "url('js/cards/tarot09.png')"),
    world = new Card ("The World", 5, 1, 0, "url('js/cards/tarot10.png')"),
    moon = new Card ("The Moon", 5, 1, 1, "url('js/cards/tarot11.png')"),
    star = new Card ("The Star", 5, 1, 1, "url('js/cards/tarot12.png')"),
    threewands = new Card ("Three of Wands", 5, 1, 1, "url('js/cards/tarot13.png')"),
    death = new Card ("Death", 5, 1, 2, "url('js/cards/tarot14.png')"),
    empress = new Card ("The Empress", 5, 1, 3, "url('js/cards/tarot15.png')"),
];

//card descriptions
chariot.description = "The Chariot shows that you should pursue the plan with a structured and ordered approach.";
strength.description = "Your resilience will greatly aid you, and your fearlessness means that you should have no issues speaking your mind.";
highpriestess.description = "Her appearance in a reading can signify that it is time for you to listen to your intuition rather than prioritizing your intellect and conscious mind.";
ninerings.description = "Realize you are free to create a secure, enduring, and satisfying lifestyle for yourself.";
magician.description = "Remember that you are powerful, create your inner world, and the outer will follow.";
threerings.description = "The Three of Rings is about spending quality time with people you cherish in your life.";
eightrings.description = "You are coming to a realization that you must step away from what is familiar.";
fool.description = "He inspires courage, for he understands that every day is a chance to open up new areas in your life, and with that comes a mixture of anticipation, wonder, awe and curiosity.";
twoswords.description = "We find ourselves in a situation where we must make a choice...Neither seems particularly appealing.";
world.description = "To encounter the World in your cards is to encounter a great unity and wholeness.";
moon.description = "The moon's light can bring you clarity and understanding and you should allow your intuition to guide you through this darkness.";
star.description = "To see this card is a message to have faith, for the universe will bless you and bring forth all that you need.";
threewands.description = "The Three of Wands hints that you are creating a stable foundation for yourself.";
death.description = "The Death card signals that one major phase in your life is ending, and a new one is going to start.";
empress.description = "The Empress is associated with fertility, expression, creativity and nurturing among many other aspects.";

// array for cards based on rarity 
// all common cards
var common = [];
// all uncommon cards
var uncommon = [];
// all rare cards
var rare = [];
// all epic cards
var epic = [];

// push to array based on rarity
for (let i of collectibles) {
    if (i.rarity == 0) {
        common.push(i.name);
    } else if (i.rarity == 1) {
        uncommon.push(i.name);
    } else if (i.rarity == 2) {
        rare.push(i.name);
    } else if (i.rarity == 3) {
        epic.push(i.name);
    }
}; 

let cardFront = document.getElementById('front');
    // cardFront.style.display = "none";
let cardBack = document.getElementById('back');
    backCard = new Card ("back card", 5, 1, 0, "url('js/cards/tarotback.png')"),
    cardBack.style.backgroundImage = backCard.image;
    // cardBack.style.display = "block";
let displaycardName = document.getElementById('cardName');
let displaycardInfo = document.getElementById('cardMeaning');

// let cardInterface = document.getElementsById('cardInterface');
// cardInterface.style.display = "none";

var cardCollection = []; 

function gachaCard(name, state, image) {
        let random = collectibles[Math.floor(Math.random() * collectibles.length)];
        // random.state = 3;
        cardCollection.push(random.name);
        console.log(random);
        console.log(cardCollection);
        cardFront.style.backgroundImage = random.image;
        displaycardName.innerHTML = random.name;
        displaycardInfo.innerHTML = random.description;
        // console.log(random.image)
        // return random
    };

    gachaCard();



            


function permission() {
    document.getElementById("gyro-text").innerHTML = "getting access to gyroscope.";
    if ( typeof( DeviceMotionEvent ) !== "undefined" && typeof( DeviceMotionEvent.requestPermission ) === "function" ) {
        // (optional) Do something before API request prompt.
        DeviceMotionEvent.requestPermission()
            .then( response => {
            // (optional) Do something after API prompt dismissed.
            if ( response == "granted" ) {
                // document.getElementById("gyro-text").innerHTML = "Ready.";
                document.getElementById("getGyroAccess").style.display = "none";
                document.getElementById("sound-interface").style.display = "block";
                // if(!oscillatorStarted){
                //     oscillator.start(0);
                //     oscillatorStarted = true;
                // }
                // gain.gain.value = 1;
                
                // make button appear
                // attach event listemer to button to show instructions

                


                
                document.getElementById('getCard').onclick = function() {
                    // cardFront.style.display = "none";
                    // cardBack.style.display = "block";
                    console.log('button pressed');
                    document.body.innerHTML += "show instructions ";
                    
                    let toggle = document.getElementById("onofftoggle");

                    oscillator.start(0);
                    oscillatorStarted = true;
                    gain.gain.value = 1;
                    playing = true;
                    toggle.innerHTML = "🔇";
                    

                    toggle.onclick = function() {
                        
                        if(playing) {
                            gain.gain.value = 0;
                            playing = false;
                            toggle.innerHTML = "🔊";

                        } else {
                            gain.gain.value = 1;
                            playing = true;
                            toggle.innerHTML = "🔇";
                        }
                    }
                }

                window.addEventListener('deviceorientation', (event) => {
                    document.getElementById("alpha").innerHTML = event.alpha;
                    document.getElementById("beta").innerHTML = event.beta;
                    document.getElementById("gamma").innerHTML = event.gamma;

                    // let newHertz = map(Math.abs(event.gamma), 0, 90, minHz, maxHz);
                    // // simple solution
                    // if(Math.abs(event.beta) > 150){
                    //     oscillator.frequency.value = 65;
                    //     hertzDisplay.innerHTML = Math.round(65)

                    // }else{
                    //     oscillator.frequency.value = 400;
                    //     hertzDisplay.innerHTML = Math.round(400)
                    // }
                    
                    // jean solution
                    //add gachaCard solution

                    if (Math.abs(event.gamma) <= 10 && Math.abs(event.beta) > 170 ) {
                        
                        // FACE DOWN
                        // oscillator.frequency.value = 400;
                        // hertzDisplay.innerHTML = Math.round(400)
                     
                        // setInterval(function() {
                        // oscillator.frequency.value = 400;
                        // hertzDisplay.innerHTML = Math.round(400)
                        // }, 3000);
                        // document.body.innerHTML += "test"
                        if(!wasFacedownBefore){
                            // hide instructions
                            document.body.innerHTML += "hide instructions ";
                            wasFacedownBefore = true;
                            
                        }

                        if(faceDownTimer == undefined){
                            // document.body.innerHTML += "timeput started";
                            faceDownTimer = setTimeout(function() {
                                // cardFront.style.display = "block";
                                    faceDownAlarm = true;
                                    clearInterval(faceDownTimer)
                                    faceDownTimer = undefined;
                                    oscillator.frequency.value = 900;
                                    hertzDisplay.innerHTML = Math.round(900);
                                    document.getElementById("card").style.display = "block";
                                    
                                    // cardFront.style.display = "block";
                                    // cardBack.style.display = "none";
                                    
                            }, 3000);
                            
                        }
                        else if(faceDownAlarm == false){
                            oscillator.frequency.value = 400;
                            hertzDisplay.innerHTML = Math.round(400)
                        }

                    } else {
                        faceDownAlarm = false;
                        clearInterval(faceDownTimer)
                        faceDownTimer = undefined;
                        oscillator.frequency.value = 65;
                        hertzDisplay.innerHTML = Math.round(65)
                    }
                    
                });
                // window.addEventListener('devicemotion', (event) => {
                //     // console.log(`${event.acceleration.x} m/s2`);
                //     document.getElementById("acc_x").innerHTML = event.acceleration.x;
                //     document.getElementById("acc_y").innerHTML = event.acceleration.y;


                // });
            }
        })
            .catch( console.error )
    } else {
        // alert( "DeviceMotionEvent is not defined" );
        // document.getElementById('doeSupported').innerText = 'still no';
        document.getElementById("gyro-text").innerHTML = "Cannot access your phone's gyroscope.";

    }
}




// btn.addEventListener( "click", permission );