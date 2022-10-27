// console.log("what");

// let count = 12345;

chrome.runtime.onMessage.addListener((request, sender, sendResponse)=> {
    //   console.log(sender.tab ?
    //               "from a content script:" + sender.tab.url :
    //               "from the extension");
    //     console.log(request);
    console.log("background script: GOT MESSAGE:", request)
});