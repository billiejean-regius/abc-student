let formOne = ["11 P.M.", "12 A.M", "1 A.M.", "2 A.M.", "3 A.M.", "4 A.M.", "5 A.M.", "6 A.M.", "7 A.M.", "8 A.M.", "9 A.M.", "10 A.M.", "11 A.M.", "12 P.M.", "1 P.M.", "2 P.M.", "3 P.M.", "4 P.M.", "5 P.M.", "6 P.M.", "7 P.M.", "8 P.M.", "9 P.M.", "10 P.M."];
let formTwo = ["+11", "+12|-12", "-11", "-10", "-9", "-8", "-7", "-6", "-5", "-4","-3", "-2", "-1", "0", "+1", "+2", "+3", "+4", "+5", "+6", "+7", "+8", "+9", "+10"];

function timeHeader() {
    let header_blocks = document.getElementById("header_blocks");
    let foo_blocks = document.getElementById("footer_blocks");
    
    for (let i = 0; i < 24; i++) {
        let single_header = document.createElement("div");
        let single_foo = document.createElement("div");

        header_blocks.appendChild(single_header);
        single_header.classList.add("single_block", "head");
            // single_header.style.backgroundColor = "rgb("+ coolors[0] +","+ coolors[1] +","+ coolors[2] +")";
        single_header.innerHTML = formOne[i];

        foo_blocks.appendChild(single_foo);
        single_foo.classList.add("single_block", "foo");
            // single_footer.style.backgroundColor = "rgb("+ coolors[0] +","+ coolors[1] +","+ coolors[2] +")";
            single_foo.innerHTML = formTwo[i];

 
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
                setTime.innerHTML = "The current time is" + " " + hours + ":" + minutes + " " + "AM" + " " + "-" + " " + "Good Night!"; //Good Night
                setBackground.style.setProperty("--cp-time01", "0, 0, 0;");
                setBackground.style.setProperty("--cp-time02", "31, 48, 199");
                setBackground.style.setProperty("--cp-time03", "63, 83, 129");
                setBackground.style.setProperty("--cp-time04", "154, 31, 199");
                setBackground.style.setProperty("--cp-time05", "0, 0, 0;");
                setBackground.style.setProperty("--cp-time06", "0, 0, 0;");
                console.log("Night");
            } else if (hours <= 11 && hours >= 6 && minutes <= 59 && minutes >= 0) {
                setTime.innerHTML = "The current time is" + " " + hours + ":" + minutes + " " + "AM" + " " + "-" + " " + "Good Morning!"; //Good Morning
                setBackground.style.setProperty("--cp-time01", "243, 234, 108");
                setBackground.style.setProperty("--cp-time02", "255, 175, 141");
                setBackground.style.setProperty("--cp-time03", "146, 162, 240");
                setBackground.style.setProperty("--cp-time04", "199, 148, 194");
                setBackground.style.setProperty("--cp-time05", "255, 175, 141");
                setBackground.style.setProperty("--cp-time06", "146, 162, 240");
                console.log("Morning");
            } else if (hours <= 17 && hours >= 12 && minutes <= 59 && minutes >= 0) {
                setTime.innerHTML = "The current time is" + " " + hours + ":" + minutes + " " + "PM" + " " + "-" + " " + "Good Afternoon!"; //Good Afternoon
                setBackground.style.setProperty("--cp-time01", "146, 162, 240");
                setBackground.style.setProperty("--cp-time02", "240, 226, 136");
                setBackground.style.setProperty("--cp-time03", "250, 147, 114");
                setBackground.style.setProperty("--cp-time04", "146, 162, 240");
                setBackground.style.setProperty("--cp-time05", "17, 109, 224");
                setBackground.style.setProperty("--cp-time06", "0, 0, 0");
                console.log("Afternoon");
            } else if (hours <= 23 && hours >= 18 && minutes <= 59 && minutes >= 0) {
                setTime.innerHTML = "The current time is" + " " + hours + ":" + minutes + " " + "PM" + " " + "-" + " " + "Good Evening!"; //Good Evening
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

    