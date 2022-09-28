let range = document.querySelector('#myRange');
let valueField = document.querySelector('#valueField')
function changeHappened() {
    console.log("change happened");
}
range.addEventListener("change", changeHappened);

function inputHappened(){
    console.log("input happened");
    //let value = range.value;
    valueField.innerHTML = range.value;
    // valueField.style.left = range.value + "px";
    range.style.left = -range.value + "px";

}
range.addEventListener("input", inputHappened);
