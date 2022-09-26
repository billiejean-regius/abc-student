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
          
        