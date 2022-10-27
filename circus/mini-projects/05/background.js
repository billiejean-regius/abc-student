chrome.runtime.onMessage.addListener((request, sender, sendResponse)=> {
    //   console.log(sender.tab ?
    //               "from a content script:" + sender.tab.url :
    //               "from the extension");
    //     console.log(request);
    console.log("background script: GOT MESSAGE:", request)
});

chrome.storage.local.get({clippyKnows: []}, function (result) {
    let clippyKnows = result.clippyKnows;
    // clippyKnows.push({name: name, HasBeenUploadedYet: false});
    clippyKnows.push({name: myName});
    chrome.storage.local.set({clippyKnows: clippyKnows}, function () {
      chrome.storage.local.get('clippyKnows', function (result) {
        console.log(clippyKnows)
        console.log(myName);
      });
    });
  });