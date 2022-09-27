const inputField = document.getElementById('inputField');
let button = document.getElementById("button");
let enough = document.getElementById("enough");


clickMe.addEventListener("click", () => {
    card_deck.innerHTML = "";
    let result = inputNum.value;

    let num = Number(result);
    console.log(num);

    for (let i = 0; i < num ; i++) {
        let card_deck = document.getElementById("card_deck");
        let container = document.createElement("div");
        let flip_card = document.createElement("div");
        let front_side = document.createElement("div");
        let back_side = document.createElement("div");
        let text_cont = document.createElement("div");
        let text_wrap = document.createElement("span");
        let text_span = document.createElement("span");
        
            card_deck.appendChild(container); // A
            container.append(flip_card, text_cont); // A => BC
                container.classList.add("container")
            flip_card.append(front_side, back_side); // B => DE
                flip_card.classList.add("flip_card");
                    front_side.classList.add("front", "side"); 
                    back_side.classList.add("back", "side");
            text_cont.appendChild(text_wrap); // C => F
            text_wrap.appendChild(text_span); // F => G
                text_cont.classList.add("text_container");
                text_wrap.classList.add("text_wrapper");
                text_span.classList.add("letters");
                    text_span.setAttribute("data-period", "2000");

            text_span.innerHTML = "Hello!";    

    }
    const cards = document.querySelectorAll(".flip_card");

    function flipCard() {
    this.classList.toggle("flip");
    }
    cards.forEach((card) => card.addEventListener("click", flipCard));

});

let sw = screen.width;
let sh = screen.height;

// random card window
function randCard(){
    // generating a random y and x location for the card
    let ranX = Math.random()*sh - 200;
    let ranY = Math.random()*sh - 200;

    let win = window.open("css/assets", "_blank", "width=215, height=300, left="+ranX+", top="+ranY);
  
}; 

button.addEventListener("click", randCard);