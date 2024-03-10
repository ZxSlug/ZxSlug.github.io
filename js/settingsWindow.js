if (localStorage.getItem("localstorage-warning") == undefined) {

    summonErrorMessage("WARNING\nThis stuff saves your preferences locally!\nThere are no data-collection shenanigans going on\nI just wanted to let you know", [
        {
            name: "Alright",
            function: "localStorage.setItem('localstorage-warning', false); killErrorMessage(this);"
        },
        {
            name: "Close Settings",
            function: "killErrorMessage(this); $('#' + $('.settings-window')[0].getAttribute('associated-taskbar')).remove(); $('.settings-window').remove();"
        }
    ]);
}

if (localStorage.getItem("theme-color") != null) {
    $(".settings-theme-color .settings-choice-value").text(localStorage.getItem("theme-color"));
}
if (localStorage.getItem("volume") != null) {
    $(".settings-volume")[0].closest(".settings-element").querySelector(".settings-slider-value").innerHTML = localStorage.getItem("volume");
    $(".settings-volume .settings-choice-slider-thumb").css("left", `${localStorage.getItem("volume")-(localStorage.getItem("volume")-50)*0.08-5}%`);
    $(".settings-volume .settings-choice-slider-progress").css("width", `${localStorage.getItem("volume")}%`)
}

$("body").on("keypress", ".settings-theme-color .settings-choice-value", async (eventObject) => {
    if (eventObject.which == 13) {
        eventObject.preventDefault()
        eventObject.currentTarget.blur();

        const rgbFromText = getRGBValues(eventObject.currentTarget.textContent.toLowerCase());
        $(".settings-theme-color .settings-choice-value").text(localStorage.getItem("theme-color"));
        if (rgbFromText !== null) {
            document.querySelector(":root").style.setProperty("--theme-color", `${rgbFromText.red}, ${rgbFromText.green}, ${rgbFromText.blue}`);
        }
    }
    if (eventObject.currentTarget.textContent.length > 17) {
        eventObject.preventDefault();
    }
})

async function resetLocalStorage() {
    summonErrorMessage("Resetting LocalStorage will remove all of your preferences\nand refresh the website.\nDo you want to continue?", [
        {
            name: "Yes",
            function: "localStorage.clear(); location.reload();"
        },
        {
            name: "No",
            function: "killErrorMessage(this);"
        }
    ]);
}

function hslToRgb(h, s, l) {
    let r, g, b;
  
    if (s === 0) {
      r = g = b = l; // achromatic
    } else {
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hueToRgb(p, q, h + 1/3);
      g = hueToRgb(p, q, h);
      b = hueToRgb(p, q, h - 1/3);
    }
  
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
  }  
  
  function hueToRgb(p, q, t) {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1/6) return p + (q - p) * 6 * t;
    if (t < 1/2) return q;
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
    return p;
  }

async function enableRGB() {
    if (rgb) return; //i don't want any seizures
    rgb = !rgb;
    
    summonErrorMessage("RGB Mode: Engaged", [
        {
            name: "OK",
            function: "killErrorMessage(this);"
        }
    ]);

    let currentHue = 0;
    setInterval(() => {
        if (!rgb) clearInterval(this)
        currentHue = currentHue < 256? currentHue+2 : (currentHue+2)%256;
        
        document.querySelector(":root").style.setProperty("--theme-color", hslToRgb(currentHue/255, 1, 0.5).join(", "))
    }, 100);
}


$("body").off("click", ".settings-theme-color .settings-choice-scroll-left");
$("body").on("click", ".settings-theme-color .settings-choice-scroll-left", async (eventObject) => {
    let index = Object.keys(colorArray).length-1;;
    if (localStorage.getItem("theme-color") in colorArray) {
        index = Object.keys(colorArray).indexOf(localStorage.getItem("theme-color")) > 0 ? Object.keys(colorArray).indexOf(localStorage.getItem("theme-color")) - 1 : Object.keys(colorArray).length-1;
    }

    const rgbFromText = getRGBValues(Object.keys(colorArray)[index]);
    $(".settings-theme-color .settings-choice-value").text(localStorage.getItem("theme-color"));
    document.querySelector(":root").style.setProperty("--theme-color", `${rgbFromText.red}, ${rgbFromText.green}, ${rgbFromText.blue}`);
});

$("body").off("click", ".settings-theme-color .settings-choice-scroll-right");
$("body").on("click", ".settings-theme-color .settings-choice-scroll-right", async (eventObject) => {
    let index = 1;
    if (localStorage.getItem("theme-color") in colorArray) {
        index = Object.keys(colorArray).indexOf(localStorage.getItem("theme-color")) < Object.keys(colorArray).length-1? Object.keys(colorArray).indexOf(localStorage.getItem("theme-color")) + 1 : 0
    }

    const rgbFromText = getRGBValues(Object.keys(colorArray)[index]);
    $(".settings-theme-color .settings-choice-value").text(localStorage.getItem("theme-color"));
    document.querySelector(":root").style.setProperty("--theme-color", `${rgbFromText.red}, ${rgbFromText.green}, ${rgbFromText.blue}`);
});

var sliderX;
var sliderOffsetWidth;
var sliderProgress;
var sliderThumb;
var settingsSliderValue;
var sliderSetting;

$("body").off("mousedown touchstart", ".settings-slider");
$("body").on("mousedown touchstart", ".settings-slider", async (eventObject) => {
    eventObject.preventDefault();
    eventObject.stopPropagation();

    if (eventObject.target.closest("settings-choice-scroll-button") != null ||
        eventObject.target.classList.contains("settings-choice-scroll-button") ||
        eventObject.target.parentElement.classList.contains("settings-choice-scroll-button")) return;

    sliderSetting = eventObject.currentTarget.getAttribute("setting-changed");
    sliderX = eventObject.currentTarget.getClientRects()[0].x;
    sliderOffsetWidth = eventObject.currentTarget.querySelector(".settings-choice-slider").offsetWidth;
    settingsSliderValue = eventObject.target.closest(".settings-element").querySelector(".settings-slider-value");
    sliderProgress = eventObject.currentTarget.querySelector(".settings-choice-slider-progress");
    sliderThumb = eventObject.currentTarget.querySelector(".settings-choice-slider-thumb");
    setSliderPosition(eventObject);

    document.onmousemove = setSliderPosition;
    document.onmouseup = cancelSlider;

    document.addEventListener("touchmove", setSliderPosition, { passive: false });
    document.addEventListener("touchend", cancelSlider, { passive: false });
});

async function setSliderPosition(eventObject) {
    eventObject.preventDefault();
    eventObject.stopPropagation();

    let clientX;
    if (eventObject.type == "touchmove" || eventObject.type == "touchstart") {
        clientX = eventObject.targetTouches[0].clientX;
    } else {
        clientX = eventObject.clientX;
    }

    let percentage = Math.floor((clientX - sliderX)/sliderOffsetWidth*100)-10;
    if (percentage > 100) percentage = 100;
    if (percentage < 0) percentage = 0;

    settingsSliderValue.innerHTML = percentage;
    sliderProgress.style.width = `${percentage}%`;
    sliderThumb.style.left = `${percentage-(percentage-50)*0.08-5}%`;

    localStorage.setItem(sliderSetting, percentage);
    eval(`${sliderSetting} = ${percentage/100}`);
}

async function cancelSlider(eventObject) {
    eventObject.preventDefault();
    eventObject.stopPropagation();
    
    document.onmousemove = null;
    document.onmouseup = null;

    document.removeEventListener("touchmove", setSliderPosition);
    document.removeEventListener("touchend", cancelSlider);
}

$("body").off("click touchend", ".settings-slider .settings-choice-scroll-button");
$("body").on("click touchend", ".settings-slider .settings-choice-scroll-button", async (eventObject) => {
    const settingsElement = eventObject.currentTarget.closest(".settings-element");
    let percentage = parseInt(settingsElement.querySelector(".settings-slider-value").innerHTML);

    if (eventObject.currentTarget.classList.contains("settings-choice-scroll-left")) {
        if (percentage > 0) percentage--;
    } else {
        if (percentage < 100) percentage++;
    }

    settingsElement.querySelector(".settings-slider-value").innerHTML = percentage;
    settingsElement.querySelector(".settings-choice-slider-thumb").style.left = `${percentage-(percentage-50)*0.08-5}%`;
    settingsElement.querySelector(".settings-choice-slider-progress").style.width = `${percentage}%`
})

$("body").off("mouseup touchend", ".settings-slider");
$("body").on("mouseup touchend", ".settings-slider", async (eventObject) => {
    localStorage.setItem(eventObject.currentTarget.getAttribute("setting-changed"), parseInt(eventObject.currentTarget.closest(".settings-element").querySelector(".settings-slider-value").innerHTML));
    eval(`${eventObject.currentTarget.getAttribute("setting-changed")} = ${localStorage.getItem(eventObject.currentTarget.getAttribute("setting-changed"))/100}`);
});