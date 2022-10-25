chrome.runtime.onMessage.addListener((request, sender, sendResponse)=> {
    //   console.log(sender.tab ?
    //               "from a content script:" + sender.tab.url :
    //               "from the extension");
    //     console.log(request);
    console.log("background script: GOT MESSAGE:", request)


   
    let myResponse = {theCount: count}
    console.log("background script: REPLYING:", myResponse)
      if (request.message === "remind me of the count") {
        sendResponse(myResponse);
    }else if(request.message == "count went up"){
        console.log("background script: COUNT WENT UP:", count);
        count++;
    }
});

