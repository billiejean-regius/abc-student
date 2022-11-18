const fullURL = document.URL;
console.log("Document URL:", fullURL);
let s = fullURL;

let documentTitle = document.querySelector('title');
let cardContainer = document.getElementById('cardContainer');
let card = document.getElementById('card');

class Card { 
  constructor (name, image) {
      this.name = name;
      this.image = image;
  }
};

// all tarot cards
const cards = [
  // creating card objects
  "death",
  "hate",
  "fear",
];

function shuffle(cards) {
  let currentIndex = cards.length, randomIndex;
  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    // And swap it with the current element.
    [cards[currentIndex], cards[randomIndex]] = [cards[randomIndex], cards[currentIndex]];
  }
  return cards;
}

shuffle(cards);
console.log(cards);

// console.log(collectibles)
// use the shuffle method

// get rid of the first page
// need two more phones

// 4th phones isnt included
// learn more about your fate => button 
// ramdom seet? seed? 

s = s.replace(/(\/public)\/[^\/]+/, '$1');
s = removeAfter(s, 'public');
  
function removeAfter(s, keyword) {
  return s.replace(
      new RegExp('(\/' + keyword + ')\/[^\/]+'), '$1'
  );
}

function divine() {
  if(documentTitle.innerHTML === "Tarot") {
    modURL = s + "/assets/present.html"
    console.log("ModifiedURL:", modURL)
    card.innerHTML = "Past: " + cards[0] + " Present: " + cards[1] + " Future: " + cards[2];
  } else if(documentTitle.innerHTML === "Present") {
    modURL = s + "/assets/future.html"
    console.log("ModifiedURL:", modURL)
    card.innerHTML = cards[1];
  } else if(documentTitle.innerHTML === "Future") {
    modURL = s + "/assets/divine.html"
    console.log("ModifiedURL:", modURL)
    card.innerHTML = cards[2];
  } else if(documentTitle.innerHTML === "Divine") {
    card.innerHTML = cards[0] + cards[1] + cards[2];
  }
  let url = new URL(modURL);

  let search_params = url.searchParams;
  // console.log(search_params)
  // search_params.set('tense', 'past');
  search_params.set('past', cards[0]);
  search_params.set('present', cards[1]);
  search_params.set('future', cards[2]);

  url.search = search_params.toString();
  let new_url = url.toString();

  let qrc = new QRCode(document.getElementById("qrcode"), new_url);
  console.log("URL Param", new_url);
}
divine();

