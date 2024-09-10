async function playerSliderModify(scroll) {
    setPlayerSliderText(scroll);
}

function padTime(time) {
    return time.toString().padStart(2, 0);
}
  
$("body").on("mouseup touchend", ".player-progressbar", async (eventObject) => {
    const scroll = eventObject.currentTarget;
    setPlayerSliderText(scroll);
    setTimeout(() => {
        eventObject.currentTarget.parentElement.querySelector(".playervideo").currentTime = scroll.value;
    }, 10)

});

$("body").on("mouseup", ".player-pausebutton", async (eventObject) => {
    const windowContent = eventObject.currentTarget.parentElement.parentElement;
    windowContent.querySelector(".playervideo").pause();
    windowContent.querySelector(".player-progressbar").setAttribute("paused", true);
    eventObject.currentTarget.style.display = "none";
    windowContent.querySelector(".player-playbutton").style.display = "";
});

$("body").on("mouseup", ".player-playbutton", async (eventObject) => {
    const windowContent = eventObject.currentTarget.parentElement.parentElement;
    windowContent.querySelector(".playervideo").play();
    windowContent.querySelector(".player-progressbar").removeAttribute("paused");
    eventObject.currentTarget.style.display = "none";
    windowContent.querySelector(".player-pausebutton").style.display = "";

    if (windowContent.querySelector(".player-progressbar").max == windowContent.querySelector(".player-progressbar").value) {
        windowContent.querySelector(".player-progressbar").value = 0;
        windowContent.querySelector(".playervideo").currentTime = 0;
    }
})
  
async function setPlayerSliderText(scroll) {
    const totalMinutes = Math.floor(scroll.max/60);
    const totalSeconds = Math.floor(scroll.max-totalMinutes*60);
  
    const minutes = Math.floor(scroll.value/60);
    const seconds = Math.floor(scroll.value-minutes*60);
  
    scroll.textLabel.innerHTML = `${padTime(minutes)}:${padTime(seconds)} / ${padTime(totalMinutes)}:${padTime(totalSeconds)}`;
}

async function playerSliderAutoscroll(scroll) {
    let interval = 1;
    setInterval(() => {
        if (scroll.value >= scroll.max) {
            if (!scroll.hasAttribute("paused")) {
                scroll.setAttribute("paused", true);
                scroll.parentElement.querySelector(".player-playbutton").style.display = "";
                scroll.parentElement.querySelector(".player-pausebutton").style.display = "none";
            }
            return;
        }
        if (scroll.hasAttribute("paused")) return;
        if (interval % 10 == 0) {
            scroll.setAttribute("value", scroll.value+1);
            interval = 1;
        } else {
            interval++

        }
        scroll.parentElement.querySelector(".playervideo").volume = volume;
    }, 100);
}

async function testPlayer(windowObject, arguments) {
    if (arguments !== undefined) {
        windowObject.querySelector(".playervideo").src = `./videos/${arguments}`;
    }

    windowObject.querySelector(".playervideo").addEventListener("loadedmetadata", async (videoObject) => {
        windowObject.querySelector(".player-progressbar").setAttribute("max", Math.floor(videoObject.srcElement.duration))
        playerSliderAutoscroll(windowObject.querySelector(".player-progressbar"));
    });

    //fuck you mozilla

/*     if (navigator.userAgent.indexOf("Firefox") != -1) {
        setTimeout(() => {
            console.log("mozilla please fix this")
            windowObject.querySelector(".player-progressbar").setAttribute("max", Math.floor(windowObject.querySelector(".playervideo").duration))
            playerSliderAutoscroll(windowObject.querySelector(".player-progressbar"));
        }, 10)
    } */
}