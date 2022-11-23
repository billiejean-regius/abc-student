console.log("Billie Jean was here");

function repl(wordToFind, wordToReplace){
    console.log("replacing", wordToFind, "with", wordToReplace);

    let finder = new RegExp(wordToFind, "g");

    // console.log()

    document.body.innerHTML = document.body.innerHTML.replace(finder, wordToReplace);
}

// setTimeout(() =>{
//     repl("and", "XOXOXOXOXOX");
// }, 300)

chrome.runtime.onMessage.addListener((request, sender, sendResponse)=>{
    console.log(request);
    repl(request.find, request.replace);
    // request.find;
    // request.replace;
});