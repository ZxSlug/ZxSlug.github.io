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
/* if (localStorage.getItem("volume") != null) {
    $(".settings-volume")[0].closest(".settings-element").querySelector(".settings-slider-value").innerHTML = localStorage.getItem("volume");
    $(".settings-volume .settings-choice-slider-thumb").css("left", `${localStorage.getItem("volume")-(localStorage.getItem("volume")-50)*0.08-5}%`);
    $(".settings-volume .settings-choice-slider-progress").css("width", `${localStorage.getItem("volume")}%`)
} */

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