
// tense?id=past&card=death

// console.log(documentTitle.innerHTML === "Past")

//abc-student/circus/projects/a/public/assets/past.html
// const htmlDocument = document.implementation.createHTMLDocument();
// const customURL = htmlDocument.createElement( 'base' );
// customURL.href = "https://www.tutorialspoint.com/java/index.htm";
// htmlDocument.head.append( customURL );
// console.log("Base URL="+customURL.href);
// const modifiedURL = htmlDocument.createElement("a");
// modifiedURL.href = "../java/java_questions_answers.html";
// htmlDocument.body.append( modifiedURL );
// console.log("After Modifying URL="+ modifiedURL.href );


// console.log(fullURL.split('/')[3])

// output(s + '<br/>');
// s = s.replace(/(\/public)\/[^\/]+/, '$1');
// output(s + '<hr/>');

// output(s + '<br/>');
// s = removeAfter(s, 'public');
// output(s + '<hr/>');

// helpers
// function removeAfter(s, keyword) {
//     return s.replace(
//         new RegExp('(\/' + keyword + ')\/[^\/]+'), '$1'
//     );
// }
// function output(s) {
//     document.body.innerHTML += s;
// }

// const pastURL = document.URL;
// console.log(fullURL);

// let path = "public\assets\past.html";
// const fullURL = path.URL;
// console.log(fullURL);
// let url = new URL(fullURL);

// abc-student\circus\projects\a\public\assets\past.html

// console.log(s + "/assets/future.html");

const fullURL = document.URL;
console.log("Document URL:", fullURL);
let s = fullURL;

let documentTitle = document.querySelector('title');
// console.log(documentTitle);
// console.log("PageURL:", s);

s = s.replace(/(\/public)\/[^\/]+/, '$1');
s = removeAfter(s, 'public');
  
function removeAfter(s, keyword) {
  return s.replace(
      new RegExp('(\/' + keyword + ')\/[^\/]+'), '$1'
  );
}

class Card { 
  constructor (name, image) {
      this.name = name;
      this.image = image;
  }
};

// all tarot cards
const collectibles = [
  // creating card objects
  "death",
  "hate",
  "fear",
];
// console.log(collectibles)

let random = collectibles[Math.floor(Math.random() * collectibles.length)];
console.log(random);



function divine() {
  if(documentTitle.innerHTML === "Tarot") {
    modURL = s + "/assets/past.html"
    console.log("ModifiedURL:", modURL)
  } else if(documentTitle.innerHTML === "Past") {
    modURL = s + "/assets/present.html"
    console.log("ModifiedURL:", modURL)
  } else if(documentTitle.innerHTML === "Present") {
    modURL = s + "/assets/future.html"
    console.log("ModifiedURL:", modURL)
  } else if(documentTitle.innerHTML === "Future") {
    modURL = s + "/assets/divine.html"
    console.log("ModifiedURL:", modURL)
  }
  let url = new URL(modURL);

  let search_params = url.searchParams;
  // console.log(search_params)
  // search_params.set('tense', 'past');
  search_params.set('fate', random);

  url.search = search_params.toString();
  let new_url = url.toString();

  let qrc = new QRCode(document.getElementById("qrcode"), new_url);
  console.log("URL Param", new_url);
}
divine();





// url.search = search_params.toString();
// let new_url = url.toString();
// console.log(new_url);

// window.addEventListener("load", () => {
//   var qrc = new QRCode(document.getElementById("qrcode"), new_url);
// });

// let QRCode = require('qrcode')
 
// QRCode.toDataURL('I am a pony!', function (err, url) {
//   console.log(url)
// })