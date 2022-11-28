// let sw = window.screen.availWidth; //screen.width;
// let sh = window.screen.availHeight; //screen.height;

// let sw = screen.width;
// let sh = screen.height;

// name, link, image

var myElement = document.getElementById('myElement');

// create a simple instance
// by default, it only adds horizontal recognizers
var mc = new Hammer(myElement);

// listen to events...
mc.on("panleft panright tap press", function(ev) {
    myElement.textContent = ev.type +" gesture detected.";
});

// class Project {
//   constructor(name, link, image) {
//       this.name = name;
//       this.link = link;
//       this.image = image;
//   }
// };

// let projects = [
//   projectA = new Project ("Project A", "url('linktoProject')", "url('linktoImage')"),
//   projectB = new Project ("Project B", "url('linktoProject')", "url('linktoImage')"),
//   projectB = new Project ("Project C", "url('linktoProject')", "url('linktoImage')"),
//   minProject1 = new Project ("MiniProject 1", "url('linktoProject')", "url('linktoImage')"),
//   minProject2 = new Project ("MiniProject 2", "url('linktoProject')", "url('linktoImage')"),
//   minProject3 = new Project ("MiniProject 3", "url('linktoProject')", "url('linktoImage')"),
//   minProject4 = new Project ("MiniProject 4", "url('linktoProject')", "url('linktoImage')"),
//   minProject5 = new Project ("MiniProject 5", "url('linktoProject')", "url('linktoImage')"),
//   minProject6 = new Project ("MiniProject 6", "url('linktoProject')", "url('linktoImage')"),
//   minProject7 = new Project ("MiniProject 7", "url('linktoProject')", "url('linktoImage')"),
// ];

// let ww = window.innerWidth;
// let wh = window.innerHeight;

// console.log("hello?");

// let cardWidth = 150;
// let cardHeight = 250;

// let handWidth = 225;
// let handHeight = 400;

// const getOffset = (el) => {
//     const rect = el.getBoundingClientRect();
//     return {
//       left: rect.left,
//       right: rect.right,
//       top: rect.top,
//       width: rect.width,
//       height: rect.height,
//       bottom: rect.bottom, 
//     };
//   };

// //create elements

// // let carousel = document.createElement('div');
// // carousel.setAttribute('class', 'carousel');

// // let beams = document.createElement('div');
// // beams.setAttribute('class', 'beams');

// // let seats = document.createElement('div');
// // seats.setAttribute('class', 'seats');

// // //mobile specific elements
// // let slides = document.createElement('div');
// // slides.setAttribute('class', 'slides');

// // let info = document.createElement('div');
// // info.setAttribute('class', 'info');

// // let title = document.createElement('div');
// // title.setAttribute('class', 'title');

// // let titleText = document.createElement('div');
// // titleText.setAttribute('class', 'titleText');

// // let link = document.createElement('div');
// // link.setAttribute('class', 'link');

// // let linkText = document.createElement('div');
// // linkText.setAttribute('class', 'linkText');

// let sliderContainer = document.createElement('div');
// sliderContainer .setAttribute('class', 'swiper');
// let sliderWrapper = document.createElement('div');
// sliderWrapper .setAttribute('class', 'swiper-wrapper');

// for (let i = 0; i < 10 ; i++) {
//   let slides = document.createElement('div');
//     slides.setAttribute('class', 'swiper-slide');

//   let carousel = document.createElement('div');
//     carousel.setAttribute('class', 'carousel');
  
//   let beams = document.createElement('div');
//     beams.setAttribute('class', 'beams');
  
//   let seats = document.createElement('div');
//     seats.setAttribute('class', 'seats');

//   let info = document.createElement('div');
//     info.setAttribute('class', 'info');

//   let title = document.createElement('div');
//     title.setAttribute('class', 'title');

//   let titleText = document.createElement('div');
//     titleText.setAttribute('class', 'titleText');

//   let link = document.createElement('div');
//     link.setAttribute('class', 'link');

//   let linkText = document.createElement('div');
//     linkText.setAttribute('class', 'linkText');

//   titleText.innerHTML = projects[i].name;
  
//   // titleText.innerHTML = "Project Name";
//   linkText.innerHTML = "Project Link";
  
//   beams.style.backgroundImage = 'url(assets/sketches/beamSketch.png)';
//   seats.style.backgroundImage = 'url(assets/sketches/seatSketch.png)';

//     document.body.append(sliderContainer);
//     sliderContainer.append(sliderWrapper)
//     sliderWrapper.append(slides);
//     slides.append(carousel, info);
//     info.append(title, link);
//     title.append(titleText);
//     link.append(linkText)
//     carousel.append(beams, seats);
// }

// // append elements


// if( screen.width <= 480 ) {
//   console.log("this is a mobile phone");
//   // iterate over every => slides
  
// } else {
//   // document.body.append(carousel);
//   // carousel.append(beams, seats);
// }


// window.onresize = () => {
//     console.log(ww, wh);
// }



