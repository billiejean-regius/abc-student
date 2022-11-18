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

let webPage = [
    webPage01,
    webPage02,
    webPage03,
];

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
    webPages.append(webPage[0], webPage[1], webPage[2]);

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

    webPage01.innerHTML = innards;
    webPage02.innerHTML = innards;
    webPage03.innerHTML = innards;

    let sliderWrap = document.createElement('div');
        sliderWrap.classList.add('sliderWrap');
    let slider = document.createElement('div');
        slider.classList.add('slider');
    let clonesWidth;
    let sliderWidth;
    let clones =[];
    let disableScroll = false;
    let scrollPos;

    let items = [];
    // console.log(webPage)

    for(let i = 1; i < 4; i++) {
        let sliderItem = document.createElement('div');
        // sliderItem.setAttribute("id", "item" + i);
        slider.append(sliderItem);
        sliderItem.append(webPage[i - 1]);
        webPage[i - 1].setAttribute('class', 'pages')
        items.push(sliderItem);
    };

    sliderWrap.appendChild(slider);
    document.body.append(sliderWrap);
    
    items.forEach(item => {
        let clone = item.cloneNode(true);
        clone.classList.add('clone');
        slider.append(clone);
        clones.push(clone);
    });

    function getClonesWidth() {
        let width = 0; 
        clones.forEach(clone => {
            width += clone.offsetWidth;
        })
        return width;
    }

    function getScrollPos() {
        return window.scrollY;
    }

    let intervalCount = 2;
    
    
    function scrollUpdate() {
        scrollPos = getScrollPos();
        if(clonesWidth + scrollPos >= sliderWidth) {
            window.scrollTo(0, intervalCount);
            
        } else if (scrollPos <= 0) {
            window.scrollTo({top: sliderWidth - clonesWidth -1})
        }

        slider.style.transform = `translateX(${-window.scrollY}px)`
        requestAnimationFrame(scrollUpdate);
    }

    function onLoad() {
        calculateDimension();
        document.body.style.height = `${sliderWidth}px`;
        window.scrollTo(0, intervalCount);
        setInterval(()=>{
            window.scrollBy(0, intervalCount);
        }, 50);
        scrollUpdate();
    }

    function calculateDimension() {
        sliderWidth = slider.getBoundingClientRect().width;
        clonesWidth = getClonesWidth();
    }

    onLoad()
}

 scrollVert.addEventListener("click", scrollVertPage)
 scrollHrzn.addEventListener("click", scrollHrznPage)

 
     
