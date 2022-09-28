// let randColor = [
//     [185, 220, 172],
//     [135, 208, 213],
//     [201, 188, 213],
//     [249, 183, 176],
//     [252, 207, 166],
//     [249, 232, 154],
// ];

// const getColor = (randColor) => {
//     return randColor[Math.floor(Math.random() * randColor.length)];
// };

// console.log(getColor(randColor));

// let coolors = getColor(randColor);
// coolorsArray = [coolors[0], coolors[1], coolors[2]];
// console.log(coolors[0], coolors[1], coolors[2]);

let zones = ["11 P.M.", "Midnight", "1 A.M.", "2 A.M.", "3 A.M.", "4 A.M.", "5 A.M.", "6 A.M.", "7 A.M.", "8 A.M.", "9 A.M.", "10 A.M.", "11 A.M.", "Noon", "1 P.M.", "2 P.M.", "3 P.M.", "4 P.M.", "5 P.M.", "6 P.M.", "7 P.M.", "8 P.M.", "9 P.M.", "10 P.M."];

function timeHeader() {
    let header_blocks = document.getElementById("header_blocks");
    let footer_blocks = document.getElementById("footer_blocks");
    
    for (let i = 0; i < 24; i++) {
        let single_header = document.createElement("div");
        let single_footer = document.createElement("div");

        header_blocks.appendChild(single_header);
        single_header.classList.add("single_block", "test");
            // single_header.style.backgroundColor = "rgb("+ coolors[0] +","+ coolors[1] +","+ coolors[2] +")";
            // single_header.innerHTML = zones[i]
        footer_blocks.appendChild(single_footer);
        single_footer.classList.add("single_block");
            // single_footer.style.backgroundColor = "rgb("+ coolors[0] +","+ coolors[1] +","+ coolors[2] +")";

 
    }
}

timeHeader();
    

//12:00am - 5:59am: night hours(0:5)
//6:00am - 11:59am: morning hours(6:11)
//12:00pm - 5:59pm: afternoon hours(12:17)
//6:00pm - 11:59pm: evening hours(18:23)

let setTime = document.getElementById('time');
let setBackground = document.getElementById('content');

let now = new Date();
let minutes = now.getMinutes();
mins = ('0' + now.getMinutes()).slice(-2);
let hours = now.getHours();
console.log(hours, minutes);
        
function myTime() {
    if (hours   < 10) {hours   = "0"+hours;} {
        if (minutes < 10) {minutes = "0"+minutes;} {
            if (hours <= 5 && hours >= 0 && minutes <= 59 && minutes >= 0) {
                // setTime.innerHTML = "The current time is" + " " + hours + ":" + minutes + " " + "AM" + " " + "-" + " " + "Good Night!"; //Good Night
                setBackground.style.setProperty("--cp-time01", "0, 0, 0;");
                setBackground.style.setProperty("--cp-time02", "31, 48, 199");
                setBackground.style.setProperty("--cp-time03", "63, 83, 129");
                setBackground.style.setProperty("--cp-time04", "154, 31, 199");
                setBackground.style.setProperty("--cp-time05", "0, 0, 0;");
                setBackground.style.setProperty("--cp-time06", "0, 0, 0;");
                console.log("Night");
            } else if (hours <= 11 && hours >= 6 && minutes <= 59 && minutes >= 0) {
                // setTime.innerHTML = "The current time is" + " " + hours + ":" + minutes + " " + "AM" + " " + "-" + " " + "Good Morning!"; //Good Morning
                setBackground.style.setProperty("--cp-time01", "0, 0, 0;");
                setBackground.style.setProperty("--cp-time02", "31, 48, 199");
                setBackground.style.setProperty("--cp-time03", "63, 83, 129");
                setBackground.style.setProperty("--cp-time04", "154, 31, 199");
                setBackground.style.setProperty("--cp-time05", "0, 0, 0;");
                setBackground.style.setProperty("--cp-time06", "0, 0, 0;");
                console.log("Morning");
            } else if (hours <= 17 && hours >= 12 && minutes <= 59 && minutes >= 0) {
                // setTime.innerHTML = "The current time is" + " " + hours + ":" + minutes + " " + "PM" + " " + "-" + " " + "Good Afternoon!"; //Good Afternoon
                setBackground.style.setProperty("--cp-time01", "146, 162, 240");
                setBackground.style.setProperty("--cp-time02", "240, 226, 136");
                setBackground.style.setProperty("--cp-time03", "250, 147, 114");
                setBackground.style.setProperty("--cp-time04", "146, 162, 240");
                setBackground.style.setProperty("--cp-time05", "17, 109, 224");
                setBackground.style.setProperty("--cp-time06", "0, 0, 0");
                console.log("Afternoon");
            } else if (hours <= 23 && hours >= 18 && minutes <= 59 && minutes >= 0) {
                // setTime.innerHTML = "The current time is" + " " + hours + ":" + minutes + " " + "PM" + " " + "-" + " " + "Good Evening!"; //Good Evening
                setBackground.style.setProperty("--cp-time01", "199, 148, 194");
                setBackground.style.setProperty("--cp-time02", "255, 175, 141");
                setBackground.style.setProperty("--cp-time03", "146, 162, 240");
                setBackground.style.setProperty("--cp-time04", "17, 109, 224");
                setBackground.style.setProperty("--cp-time05", "84, 28, 148");
                setBackground.style.setProperty("--cp-time06", "0, 0, 0");
                console.log("Evening");
            }
        }
    }
}

myTime();
          
        