let reachedBottom = false;

window.addEventListener('scroll', function(event) {
    var limit = Math.max( document.body.scrollHeight, document.body.offsetHeight, 
        document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight );
    // console.log(window.scrollY, limit);
    // console.log((Math.abs(window.scrollY - limit)-window.innerHeight));

    if((Math.abs(window.scrollY - limit)-window.innerHeight)<5 && reachedBottom==false){
        console.log("reached ze bottom")
        reachedBottom = true;
    }


}) 





// references

// https://javascript.info/size-and-scroll-window
// https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight

