let sw = screen.width;
let sh = screen.height;

// random card window
function randCard(){
    // generating a random y and x location for the card
    // let ranX = Math.random()*sh - 200;
    // let ranY = Math.random()*sh - 200;

    // let win = window.open("css/assets", "_blank", "width=215, height=300, left="+ranX+", top="+ranY);
    let win1 = window.open("css/assets", "_blank", "width=215, height=300, left="+200+", top="+100);
    let win2 = window.open("css/assets", "_blank", "width=215, height=300, left="+400+", top="+100);
    let win3 = window.open("css/assets", "_blank", "width=215, height=300, left="+600+", top="+100);
  
}; 

button.addEventListener("click", randCard);
