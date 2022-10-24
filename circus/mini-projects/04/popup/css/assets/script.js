let swat = document.getElementById('swatBug');

function swatBug(){
    let chance = Math.random() * 100

    if (chance >= 0 && chance < 50) {
        alert("hi");
      }
      else if (chance >= 50 && chance <= 100) {
        alert("bye");
      }
    //if coackroach create two
    //% chance of kill
}; 


swat.addEventListener("click", swatBug);