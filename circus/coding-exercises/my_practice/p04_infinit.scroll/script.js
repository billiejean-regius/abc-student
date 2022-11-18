// scroll buttons
let scrollVert = document.createElement('button');
scrollVert.innerHTML = "ScrollVert";
scrollVert.setAttribute('id', 'scrollVert');

let scrollHrzn = document.createElement('button');
scrollHrzn.innerHTML = "ScrollHrzn";
scrollHrzn.setAttribute('id', 'scrollHrzn');

// html content
let innards = document.body.innerHTML;

let webPages = document.createElement('div');
webPages.setAttribute('id', 'webPages');

let webPage01 = document.createElement('div');
webPage01.setAttribute('id', 'webPage01');
let webPage02 = document.createElement('div');
webPage02.setAttribute('id', 'webPage02');
let webPage03 = document.createElement('div');
webPage03.setAttribute('id', 'webPage03');


webPages.append(webPage01, webPage02, webPage03);
document.body.append(scrollVert, scrollHrzn);

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



// window.onresize = () => {
//     const {
//       clientWidth,
//       clientHeight
//     } = document.body;
//     console.log(clientWidth, clientHeight)
//   }

Element.prototype.appendAfter = function (element) {
    element.parentNode.insertBefore(this, element.nextSibling);
}, false;

function scrollVertPage() {
    document.getElementsByTagName("body")[0].innerHTML = "";
    document.body.append(webPages);

    webPage01.innerHTML = innards;
    webPage02.innerHTML = innards;
    webPage03.innerHTML = innards;

    webPage01.setAttribute("class", "stretchPages");
    webPage02.setAttribute("class", "stretchPages");
    webPage03.setAttribute("class", "stretchPages");

    console.log("vertical scroll");

    let intervalCount = 3;
    setInterval(()=>{
        window.scrollBy(0, intervalCount);
        // console.log("This is", intervalCount);
            
        if(getOffset(webPage01).bottom < 0) {
            webPage01.appendAfter(webPage03);
            console.log("Moved Page 1");
        } else if(getOffset(webPage02).bottom < 0) {
            webPage02.appendAfter(webPage01);
            console.log("Moved Page 2");
        } else if(getOffset(webPage03).bottom < 0) {
            webPage03.appendAfter(webPage02);
            console.log("Moved Page 3");
        }
    }, 50);
}

function scrollHrznPage() {
    document.getElementsByTagName("body")[0].innerHTML = "";
    document.body.append(webPages);

    webPage01.innerHTML = innards;
    webPage02.innerHTML = innards;
    webPage03.innerHTML = innards;

    webPages.setAttribute("id", "parentPage");
    webPage01.setAttribute("class", "childPages");
    webPage02.setAttribute("class", "childPages");
    webPage03.setAttribute("class", "childPages");

    console.log("horizontal scroll");

    let intervalCount = 3;
    setInterval(()=>{
        window.scrollBy(intervalCount, 0);
        // console.log("This is", intervalCount);
        
        //the removed elements is causing all the other elements to shift left
        if(getOffset(webPage01).right > 0) {
            webPage01.appendAfter(webPage03);
            console.log("Moved Page 1");
        }
        // if(getOffset(webPage02).right < 0) {
        //     webPage02.appendAfter(webPage01);
        //     console.log("Moved Page 2");
        // }
        // if(getOffset(webPage03).right < 0) {
        //     webPage03.appendAfter(webPage02);
        //     console.log("Moved Page 3");
        // }
    }, 50);
 
}

 scrollVert.addEventListener("click", scrollVertPage)
 scrollHrzn.addEventListener("click", scrollHrznPage)

 
     
