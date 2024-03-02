//Thanks tymeJV on stackoverflow!

async function updateTime() {
    $("#taskbar-clock").html(new Date().toLocaleTimeString('en-US', { hour: "numeric", minute: "2-digit"}));
}

updateTime()

var time = new Date(),
    secondsRemaining = (60 - time.getSeconds()) * 1000;

setTimeout(function() {
    setInterval(updateTime, 60000);
}, secondsRemaining);