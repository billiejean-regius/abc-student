let display = document.getElementById("countDisplay")
let button = document.getElementById("up");

let count = 0;

chrome.storage.sync.get(['myCount'], function(result) {
  console.log('Value currently is ' + result.key);
  count = result.count == undefined) {
    count = 0;
    chrome.storage.local.set({myCount: count})
  }

button.addEventListener("click", ()=> {
  count++;
  display.innerHTML = count;

  //tell bkg script increased count
  console.log("popup script: TELLING BGS about COUNT", count);
  chrome.runtime.sendMessage({message: "count went up"});
})


//ask background for current count
chrome.runtime.sendMessage({message: "remind me of the count"}, function(response) {
  display.innerHTML = response.theCount;
  count = response.theCount;
});