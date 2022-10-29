//https://www.sitepoint.com/get-url-parameters-with-javascript/


let queryString = window.location.search;
let urlParams = new URLSearchParams(queryString);
let n = urlParams.get("name");
alert("hi, "+n+"!");