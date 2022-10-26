
// let value = 3;
let isNameGiven = false;

let myClippyKnows = [];

let clippy = document.getElementById('clippy');
let speak = document.getElementById('clippySpeaks');

function isClicking(e){
  var target = e.target;
  var tag = [];
  tag.tagType = target.tagName.toLowerCase();
  tag.tagClass = target.className.split(' ');
  tag.id = target.id;
  tag.parent = target.parentNode.tagName.toLowerCase();

  return tag;
}

var tagsToIdentify = ['img','a'];

document.body.onclick = function(e){
  elem = isClicking(e);

  for (i=0; i < tagsToIdentify.length; i++){
      if (elem.tagType == tagsToIdentify[i] && elem.parent == 'a'){
          console.log('You\'ve clicked a monitored tag (' + elem.tagType + ', in this case and one inside an "a" element, no less!).');
          return false; // or do something else.
      }
      else if (elem.tagType == tagsToIdentify[i]){
          console.log('You\'ve clicked a monitored tag (' + elem.tagType + ', in this case).');
          return false; // or do something else.
      }
  }
};

if(isNameGiven == false) {
  let name = "Name";
  
  speak.innerHTML = "Hello, "
  console.log("bkg script: TELLING BKG the", name);
  chrome.runtime.sendMessage({message: "The name is not given"});

  // function myClippyLearns() {
  //   addNewItem(name);
  //   console.log(getAllItems());
  // }
  // myClippyLearns(name);

  // function addNewItem (item) {
  //   // let myClippyKnows = JSON.parse(localStorage.getItem("myClippyKnows", "[]"));
  //   let myClippyKnows = JSON.parse(chrome.storage.local.get(['myClippyKnows', '[]'], function(result) {
  //     console.log('Value currently is ' + result.key);
  //   }));
  //   myClippyKnows.push(item);
  //   // localStorage.setItem("myClippyKnows", JSON.stringify(myClippyKnows));
  //   chrome.storage.local.set({key: ("myClippyKnows", JSON.stringify(myClippyKnows))});
  //   console.log("doing a thing")
  // }
  // function getAllItems () {
  //   console.log("thing is done");

  //   return JSON.parse(chrome.storage.local.get('myClippyKnows', '[]'));
  // }

  chrome.storage.local.get({myClippyKnows: []}, function (result) {
  var myClippyKnows = result.myClippyKnows;
  // myClippyKnows.push({name: name, HasBeenUploadedYet: false});
  myClippyKnows.push({name: name, HasBeenUploadedYet: false});
  chrome.storage.local.set({myClippyKnows: myClippyKnows}, function () {
      chrome.storage.local.get('myClippyKnows', function (result) {
          console.log(result.myClippyKnows)
          
      });
  });
});


} else if(!isNameGiven) {

}

// chrome.storage.sync.set({key: value}, function() {
//     console.log('Value is set to ' + value);
//   });
  
// chrome.storage.sync.get(['key'], function(result) {
// console.log('Value currently is ' + result.key);
// });

//tell bkg script increased count
// console.log("popup script: TELLING BKG the ", count);
// chrome.runtime.sendMessage({message: "count went up"});
 
 
//  //ask background for current count
//  chrome.runtime.sendMessage({message: "remind me of the count"}, function(response) {
//    display.innerHTML = response.theCount;
//    count = response.theCount;
//  });

