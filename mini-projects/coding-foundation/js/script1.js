// create input field
let div1 = document.createElement("div");
    document.body.appendChild(div1);

let inputElement = document.createElement("input");
  inputElement.setAttribute("type", "number");
  inputElement.setAttribute("class", "numInput");
    div1.appendChild(inputElement);

let div2 = document.createElement("div");
    document.body.appendChild(div2);

let button = document.createElement("button");
    button.setAttribute("onclick", "genShape();");
    button.setAttribute("id", "numInput");

div2.appendChild(button);

let svgDiv = document.createElement("div");
    svgDiv.setAttribute("id", "svgCont");

document.body.appendChild(svgDiv);

// var element = document.createElementNS(namespaceURI, qualifiedName[, options]);
// namespace: http://www.w3.org/2000/svg
// document.createElementNS creates and element w/spec namespace URI and qualified name

// create a constant variable for the namespace

const svgns = "http://www.w3.org/2000/svg";

// create svg element
let cSVG = document.createElementNS(svgns, "svg")
    cSVG.setAttribute("xmlns", svgns);
    cSVG.setAttribute("width", "100");
    cSVG.setAttribute("height", "100");
    cSVG.setAttribute("viewBox", "0 0 400 400");
    // append svg element to the document body
    svgDiv.appendChild(cSVG);
// rectangle
let nRect = document.createElementNS(svgns, "rect");
    nRect.setAttribute("x", "100");
    nRect.setAttribute("y", "100");
    nRect.setAttribute("width", "200");
    nRect.setAttribute("height", "200");
    nRect.setAttribute("fill", "red");
    //append svg shape
    //cSVG.appendChild(nRect);
// circle
let nCirc = document.createElementNS(svgns, "circle");
    nCirc.setAttribute("cx", "200");
    nCirc.setAttribute("cy", "200");
    nCirc.setAttribute("r", "125");
    nCirc.setAttribute("fill", "blue");
star
let nPoly = document.createElementNS(svgns, "polygon");
    nPoly.setAttribute("points", "50 160 55 180 70 180 60 190 65 205 50 195 35 205 40 190 30 180 45 180");
    nPoly.setAttribute("fill", "green");

// array of svg elements
// let svgArr = [
//     nRect, 
//     nCirc, 
//     nPoly,
// ];

// random calc
// const ranSVG = Math.floor(Math.random() * svgArr.length);
// console.log(ranSVG, svgArr[ranSVG]);

const getRandom = (svgArr) => {
    return svgArr[Math.floor(Math.random() * svgArr.length)];
  };
  
let svgArr = [
    nRect, 
    nCirc, 
    // nPoly,
];
  
  console.log(getRandom(svgArr));

// append random svg shape 

cSVG.appendChild(getRandom(svgArr));

// where the squares will go

function genShape() {
    let userInput = document.getElementById("numInput").value; 
    for (let i = 1; i <= userInput; i++) {

      }

      console.log(userInput);
}






  