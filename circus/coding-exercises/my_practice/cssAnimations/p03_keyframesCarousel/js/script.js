// let sw = window.screen.availWidth; //screen.width;
// let sh = window.screen.availHeight; //screen.height;

// let sw = screen.width;
// let sh = screen.height;

// name, link, image
class Project {
  constructor(name, link, image) {
      this.name = name;
      this.link = link;
      this.image = image;
  }
};

let projects = [
  projectA = new Project ("Project A", "url('linktoProject')", "url('linktoImage')"),
  projectB = new Project ("Project B", "url('linktoProject')", "url('linktoImage')"),
  projectB = new Project ("Project C", "url('linktoProject')", "url('linktoImage')"),
  minProject1 = new Project ("MiniProject 1", "url('linktoProject')", "url('linktoImage')"),
  minProject2 = new Project ("MiniProject 2", "url('linktoProject')", "url('linktoImage')"),
  minProject3 = new Project ("MiniProject 3", "url('linktoProject')", "url('linktoImage')"),
  minProject4 = new Project ("MiniProject 4", "url('linktoProject')", "url('linktoImage')"),
  minProject5 = new Project ("MiniProject 5", "url('linktoProject')", "url('linktoImage')"),
  minProject6 = new Project ("MiniProject 6", "url('linktoProject')", "url('linktoImage')"),
  minProject7 = new Project ("MiniProject 7", "url('linktoProject')", "url('linktoImage')"),
];

let ww = window.innerWidth;
let wh = window.innerHeight;

console.log("hello?");

let cardWidth = 150;
let cardHeight = 250;

let handWidth = 225;
let handHeight = 400;

const getOffset = (el) => {
    const rect = el.getBoundingClientRect();
    return {
      left: rect.left,
      right: rect.right,
      top: rect.top,
      width: rect.width,
      height: rect.height,
      bottom: rect.bottom, 
    };
  };

//create elements

// let carousel = document.createElement('div');
// carousel.setAttribute('class', 'carousel');

// let beams = document.createElement('div');
// beams.setAttribute('class', 'beams');

// let seats = document.createElement('div');
// seats.setAttribute('class', 'seats');

// //mobile specific elements
// let slides = document.createElement('div');
// slides.setAttribute('class', 'slides');

// let info = document.createElement('div');
// info.setAttribute('class', 'info');

// let title = document.createElement('div');
// title.setAttribute('class', 'title');

// let titleText = document.createElement('div');
// titleText.setAttribute('class', 'titleText');

// let link = document.createElement('div');
// link.setAttribute('class', 'link');

// let linkText = document.createElement('div');
// linkText.setAttribute('class', 'linkText');

for (let i = 0; i < 10 ; i++) {
  let slides = document.createElement('div');
    slides.setAttribute('class', 'slides');

  let carousel = document.createElement('div');
    carousel.setAttribute('class', 'carousel');
  
  let beams = document.createElement('div');
    beams.setAttribute('class', 'beams');
  
  let seats = document.createElement('div');
    seats.setAttribute('class', 'seats');

  let info = document.createElement('div');
    info.setAttribute('class', 'info');

  let title = document.createElement('div');
    title.setAttribute('class', 'title');

  let titleText = document.createElement('div');
    titleText.setAttribute('class', 'titleText');

  let link = document.createElement('div');
    link.setAttribute('class', 'link');

  let linkText = document.createElement('div');
    linkText.setAttribute('class', 'linkText');

  titleText.innerHTML = projects[i].name;
  
  // titleText.innerHTML = "Project Name";
  linkText.innerHTML = "Project Link";
  
  beams.style.backgroundImage = 'url(assets/sketches/beamSketch.png)';
  seats.style.backgroundImage = 'url(assets/sketches/seatSketch.png)';

    document.body.append(slides);
    slides.append(carousel, info);
    info.append(title, link);
    title.append(titleText);
    link.append(linkText)
    carousel.append(beams, seats);
}

// append elements


if( screen.width <= 480 ) {
  console.log("this is a mobile phone");
  // iterate over every => slides
  
} else {
  // document.body.append(carousel);
  // carousel.append(beams, seats);
}

function detectswipe(el,func) {
  swipe_det = new Object();
  swipe_det.sX = 0; swipe_det.sY = 0; swipe_det.eX = 0; swipe_det.eY = 0;
  var min_x = 30;  //min x swipe for horizontal swipe
  var max_x = 30;  //max x difference for vertical swipe
  var min_y = 50;  //min y swipe for vertical swipe
  var max_y = 60;  //max y difference for horizontal swipe
  var direc = "";
  ele = document.getElementById(el);
  ele.addEventListener('touchstart',function(e){
    var t = e.touches[0];
    swipe_det.sX = t.screenX; 
    swipe_det.sY = t.screenY;
  },false);
  ele.addEventListener('touchmove',function(e){
    e.preventDefault();
    var t = e.touches[0];
    swipe_det.eX = t.screenX; 
    swipe_det.eY = t.screenY;    
  },false);
  ele.addEventListener('touchend',function(e){
    //horizontal detection
    if ((((swipe_det.eX - min_x > swipe_det.sX) || (swipe_det.eX + min_x < swipe_det.sX)) && ((swipe_det.eY < swipe_det.sY + max_y) && (swipe_det.sY > swipe_det.eY - max_y) && (swipe_det.eX > 0)))) {
      if(swipe_det.eX > swipe_det.sX) direc = "r";
      else direc = "l";
    }
    //vertical detection
    else if ((((swipe_det.eY - min_y > swipe_det.sY) || (swipe_det.eY + min_y < swipe_det.sY)) && ((swipe_det.eX < swipe_det.sX + max_x) && (swipe_det.sX > swipe_det.eX - max_x) && (swipe_det.eY > 0)))) {
      if(swipe_det.eY > swipe_det.sY) direc = "d";
      else direc = "u";
    }

    if (direc != "") {
      if(typeof func == 'function') func(el,direc);
    }
    direc = "";
    swipe_det.sX = 0; swipe_det.sY = 0; swipe_det.eX = 0; swipe_det.eY = 0;
  },false);  
}

function myfunction(el,d) {
  alert("you swiped on element with id '"+el+"' to "+d+" direction");
}

detectswipe('slides',myfunction);




window.onresize = () => {
    console.log(ww, wh);
}



