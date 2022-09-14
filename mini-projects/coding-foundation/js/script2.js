var inputField = document.getElementById('inputField')
var svgField = document.getElementById('svgField')

clickMe.addEventListener("click", () => {
    svgField.innerHTML = "";
    var result = inputNum.value;

    let num = Number(result);

    

    console.log(num);

    for (let i = 0; i < num ; i++) {
        var newSVG = document.createElement('div');
        newSVG.classList.add('svgDiv');
        svgField.appendChild(newSVG);

        const svgns = "http://www.w3.org/2000/svg";

        let cSVG = document.createElementNS(svgns, "svg");
            cSVG.setAttribute("xmlns", svgns);
            cSVG.setAttribute("width", "100");
            cSVG.setAttribute("height", "100");
            cSVG.setAttribute("viewBox", "0 0 400 400");
        // rectangle
        let nRect = document.createElementNS(svgns, "rect");
            nRect.setAttribute("x", "100");
            nRect.setAttribute("y", "100");
            nRect.setAttribute("width", "200");
            nRect.setAttribute("height", "200");
            nRect.setAttribute("fill", "red");
        // circle
        let nCirc = document.createElementNS(svgns, "circle");
            nCirc.setAttribute("cx", "200");
            nCirc.setAttribute("cy", "200");
            nCirc.setAttribute("r", "125");
            nCirc.setAttribute("fill", "blue");

        newSVG.appendChild(cSVG);
        cSVG.appendChild(nCirc);
    }

        
});


