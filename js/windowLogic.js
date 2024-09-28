var volume = 1;
var mobileMode = false;

var lockCursorX = false;
var lockCursorY = false;

var parse;
import('https://cdn.jsdelivr.net/npm/smol-toml@1.1.4/+esm').then((toml) => {
    parse = toml.parse;
});

//localStorage.removeItem("icon-placement")

var iconPlacement = localStorage.getItem("icon-placement") !== null? JSON.parse(localStorage.getItem("icon-placement")) : {}; 
placeIcons();

function placeIcons() {
    try {
        for (const [ iconIndex, iconPosition ] of Object.entries(iconPlacement)) {
            if (iconPosition === undefined) continue;

            $("#desktop")[0].children[iconIndex].style.gridColumn = iconPosition[0];
            $("#desktop")[0].children[iconIndex].style.gridRow = iconPosition[1];
        }
    } catch (error) {
        console.error("Failed to place icons in the saved location", error)
    }
}

var colorAssociations = {
    "purple": [155, 54, 255],
    "blue": [180, 145, 255],
    "cyan": [180, 255, 255],
    "green": [65, 215, 100],
    "yellow": [250, 255, 160],
    "red": [220, 31, 102],
    "pink": [240, 115, 240],
    "orange": [230, 215, 155],
    "white": [255, 255, 255]
}
var colorArray = Object.keys(colorAssociations);

volume = localStorage.getItem("volume") !== null? localStorage.getItem("volume") : 1;
var rgb = false;

function getRGBValues(hex) {
    const regex = /^#?([A-Fa-f0-9]{3}){1,2}$/m;

    if (regex.test(hex) || hex in colorAssociations) {
        localStorage.setItem("theme-color", hex)
    }

    if (regex.test(hex)) {
        if (hex.length == 3 || hex.length == 4) {
            return {
                red: parseInt(hex[hex.length-3] + hex[hex.length-3], 16),
                green: parseInt(hex[hex.length-2] + hex[hex.length-3], 16),
                blue: parseInt(hex[hex.length-1] + hex[hex.length-3], 16)
            }
        } else {
            return {
                red: parseInt(hex[hex.length-6] + hex[hex.length-5], 16),
                green: parseInt(hex[hex.length-4] + hex[hex.length-3], 16),
                blue: parseInt(hex[hex.length-2] + hex[hex.length-1], 16)
            }
        }
    } else {
        if (hex in colorAssociations) {
            return {
                red: colorAssociations[hex][0],
                green: colorAssociations[hex][1],
                blue: colorAssociations[hex][2]
            }
        }
        return null;
    }
}

async function changeVolume(sliderObject) {
    localStorage.setItem("volume", sliderObject.value/100);
    volume = sliderObject.value/100;
}

async function applyColor(scroll) {
    localStorage.setItem("theme-color", scroll.value);
    const rgbFromText = getRGBValues(scroll.value);
    if (rgbFromText !== null) {
        document.querySelector(":root").style.setProperty("--theme-color", `${rgbFromText.red}, ${rgbFromText.green}, ${rgbFromText.blue}`);
    }
}

function getVolume() {
    return localStorage.getItem("volume")*100 || 100;
}

function getTheme() {
    return localStorage.getItem("theme-color") || "Purple";
}

function checkColor(scroll) {
    const regex = /^#?([A-Fa-f0-9]{3}){1,2}$/m;
    return (scroll.input in colorAssociations || regex.test(scroll.input));
}

if (localStorage.getItem("theme-color") !== undefined) {
    const rgbFromText = getRGBValues(localStorage.getItem("theme-color"));
    if (rgbFromText !== null) {
        document.querySelector(":root").style.setProperty("--theme-color", `${rgbFromText.red}, ${rgbFromText.green}, ${rgbFromText.blue}`);
    }
}

window.mobileCheck = function() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
  };

if (mobileCheck()) {
    document.querySelector(":root").style.setProperty("font-size", "1.75em");
    $("#taskbar-hide-button, #taskbar-unhide-button").remove()
    mobileMode = true;
}

jQuery.event.special.touchstart = {
    setup: function( _, ns, handle ) {
        this.addEventListener("touchstart", handle, { passive: false });
    }
};
jQuery.event.special.touchmove = {
    setup: function( _, ns, handle ) {
        this.addEventListener("touchmove", { passive: false });
    }
};

var mouseInitialX = 0, mouseInitialY = 0;
var activeWindowObject = null;
var activeWindowX = 0, activeWindowY = 0;

/* Window-moving logic */

$("body").on("mousedown", ".window-titlebar", windowHoldStart);
$("body").on("touchstart", ".window-titlebar", windowHoldStart);

async function windowHoldStart(eventObject) {
    if (eventObject.target.parentElement.classList.contains("window-control")) return;

    eventObject.preventDefault();
    eventObject.stopPropagation();
    
    if (eventObject.type == "touchstart") {
        mouseInitialX = eventObject.changedTouches[0].clientX;
        mouseInitialY = eventObject.changedTouches[0].clientY;
    } else {
        mouseInitialX = eventObject.clientX;
        mouseInitialY = eventObject.clientY;
    }

    activeWindowObject = eventObject.currentTarget.parentElement;

    if (activeWindowObject.classList.contains("maximized-window")) {
        if (mobileMode) {
            return;
        } else {
            activeWindowObject.classList.remove("maximized-window");
        }
    }

    let windowBounding = activeWindowObject.getBoundingClientRect();
    activeWindowX = windowBounding.x;
    activeWindowY = windowBounding.y;

    document.onmousemove = windowHoldDrag;
    document.onmouseup = windowHoldStop;

    document.addEventListener("touchmove", windowHoldDrag, { passive: false });
    document.addEventListener("touchend", windowHoldStop, { passive: false });

    focusWindow(activeWindowObject);

    const mouseDownSFX = new Audio("./sounds/mouse_down.m4a");
    mouseDownSFX.volume = volume;
    mouseDownSFX.muted = (volume == 0);
    mouseDownSFX.play();
}

async function windowHoldDrag(eventObject) {
    eventObject.preventDefault();
    eventObject.stopPropagation();

    if (eventObject.type == "touchmove") {
        clientX = eventObject.targetTouches[0].clientX;
        clientY = eventObject.targetTouches[0].clientY;
    } else {
        clientX = eventObject.clientX;
        clientY = eventObject.clientY;
    }

    let mouseDeltaX = 0, mouseDeltaY = 0;

    if (clientX > 0) {
        mouseDeltaX = window.innerWidth > clientX? clientX - mouseInitialX : 0;
    }

    if (clientY > 0) {
        mouseDeltaY = window.innerHeight > clientY? clientY - mouseInitialY : 0;
    }

    mouseInitialX = clientX;
    mouseInitialY = clientY;

    activeWindowX+=mouseDeltaX;
    activeWindowY+=mouseDeltaY;

    activeWindowObject.style.top = `${activeWindowY}px`;
    activeWindowObject.style.left = `${activeWindowX}px`;

    taskbarFullscreenCheck()
}

async function windowHoldStop() {
    document.onmousemove = null;
    document.onmouseup = null;

    document.removeEventListener("touchmove", windowHoldDrag);
    document.removeEventListener("touchend", windowHoldStop);
}

var errorTemplateCode;
$.ajax({
    url: `html/errorMessageTemplate.html`,
    success: (result) => {
        errorTemplateCode = result;
    },
    error: (error) => {
        console.error(error, "Couldn't load errorMessage HTML. See error for more.")
        return;
    }
});

var errorMessageSFX = [];

/** summonErrorMessage
 * @argument messageText The text the error window will have.
 * @argument messageButtons The buttons the user can click on.
 */
async function summonErrorMessage(messageText, messageButtons = []) {

    if (errorMessageSFX.length == 0) {
        for (let i = 1; i <= 3; i++) {
            errorMessageSFX.push(new Audio(`./sounds/message_${i}.m4a`))
        }
    }

    let tempError = $.parseHTML(errorTemplateCode)[0];
    tempError.id = `error-${Math.floor(Math.random() * 1000000)}`;

    if (messageButtons.length > 0) {
        const buttonRow = tempError.querySelector(".error-message-buttons");
        for (const button of messageButtons) {
            document.createElement("span");

            buttonRow.innerHTML += (`<span class="hoverable error-message-button" onclick="${button.function}">${button.name}</span>`);
        }
    }

    let errorText = tempError.querySelector(".error-message-text");
    errorText.innerText = messageText;

    tempError = await addTitlebar(tempError);

    $("body").prepend(tempError.outerHTML);

    $(`#${tempError.id}`).css("top", `${((window.innerHeight - $("#taskbar").height()) - $(`#${tempError.id}`).height())/2}px`);
    $(`#${tempError.id}`).css("left", `${(window.innerWidth - $(`#${tempError.id}`).width())/2}px`);;

    focusWindow($(`#${tempError.id}`)[0]);

    const sfxChosen = Math.round(Math.random()*2);
    errorMessageSFX[sfxChosen].volume = volume;
    errorMessageSFX[sfxChosen].muted = (volume == 0);
    errorMessageSFX[sfxChosen].play();
}

var titlebarTemplateCode;
var taskbarTemplateCode;

/** loadWindowFromHTML
 * @argument windowName Name of the file storing the window's HTML.
 * @argument arguments (Optional) Arguments passed to the program
 */
async function loadWindowFromHTML(windowName, arguments) {
    $.ajax({
        url: `html/${windowName}.html`,
        success: async (result) => {
            let windowObject = $.parseHTML(result, true)[0];

            windowObject.id = `window-${Math.floor(Math.random() * 1000000)}`;
            
            if (mobileMode) windowObject.classList.add("maximized-window");
            
            windowObject = await addTitlebar(windowObject);

            $(".taskbar-icon-active").addClass("taskbar-icon-inactive");
            $(".taskbar-icon-active").removeClass("taskbar-icon-active");

            windowObject.setAttribute("associated-taskbar", await createAssociatedTaskbarElement(windowObject, windowObject.id));
            
            $("body").prepend(windowObject.outerHTML);

            /* Windows generally don't share ids so this SHOULD be fine */
            if (!mobileMode) {
                $(`#${windowObject.id}`).css("top", `${((window.innerHeight - $("#taskbar").height()) - $(`#${windowObject.id}`).height())/2}px`);
                $(`#${windowObject.id}`).css("left", `${(window.innerWidth - $(`#${windowObject.id}`).width())/2}px`);
            }

            focusWindow($(`#${windowObject.id}`)[0]);

            if (windowObject.hasAttribute("window-logic") && typeof eval(windowObject.getAttribute("window-logic")) == "function") {
                const windowHTMLObject = $(`#${windowObject.id}`)[0];
                if (arguments !== undefined && arguments !== "") {
                    eval(`${windowObject.getAttribute("window-logic")}(windowHTMLObject, "${arguments}")`);
                } else {
                    eval(`${windowObject.getAttribute("window-logic")}(windowHTMLObject)`);
                }
            }

        },
        error: async (error) => {
            console.error(error, "Couldn't load Window HTML. See error for more.");
            summonErrorMessage("There was an error while trying to open the app.\nCheck the console for more info.", [
                {
                    name: "OK",
                    function: "killErrorMessage(this);"
                }
            ])
        }
    });
}

async function createAssociatedTaskbarElement(windowObject, windowId) {
    if (!taskbarTemplateCode) {
        await $.ajax({
            url: "html/taskbarButtonTemplate.html",
            success: (result) => {
                taskbarTemplateCode = result;
            },
            error: (error) => {
                console.error(error, "Couldn't load TaskbarButton HTML. See error for more.")
                return;
            }
        });
    }

    let tempButton = $.parseHTML(taskbarTemplateCode)[0];

    let buttonText = tempButton.querySelector(".taskbar-icon-name");
    let windowHeaderText = windowObject.querySelector(".window-header-text");
    buttonText.innerText = windowHeaderText.innerText;
    if (mobileMode) buttonText.innerText = "";

    let buttonIcon = tempButton.querySelector(".taskbar-icon-icon");
    let windowHeaderIcon = windowObject.querySelector(".window-icon");
    if (windowHeaderIcon != undefined) {
        buttonIcon.src = windowHeaderIcon.getAttribute("src");
    } else {
        buttonIcon.remove();
    }

    tempButton.setAttribute("associated-window", windowId);

    tempButton.id = `taskbar-${Math.floor(Math.random() * 1000000)}`;
    
    $("#taskbar-icons").append(tempButton.outerHTML);

    return tempButton.id;
}

async function addTitlebar(windowObject) {
    if (!titlebarTemplateCode) {
        await $.ajax({
            url: "html/titlebarTemplate.html",
            success: (result) => {
                titlebarTemplateCode = result;
            },
            error: (error) => {
                console.error(error, "Couldn't load Titlebar HTML. See error for more.")
                return;
            }
        });
    }
    
    let tempTitlebar = $.parseHTML(titlebarTemplateCode)[0];

    const hasExitButton = JSON.parse(windowObject.hasAttribute("has-exit-button")? windowObject.getAttribute("has-exit-button") : true);
    if (!hasExitButton) {
        let exitButton = tempTitlebar.querySelector(".window-exit-button");
        exitButton.remove();
    }

    const hasMaximizeButton = JSON.parse(windowObject.hasAttribute("has-maximize-button")? windowObject.getAttribute("has-maximize-button") : true);
    if (!hasMaximizeButton || mobileMode) {
        let maximizeButton = tempTitlebar.querySelector(".window-maximize-button");
        maximizeButton.remove();
    }

    const hasMinimizeButton = JSON.parse(windowObject.hasAttribute("has-minimize-button")? windowObject.getAttribute("has-minimize-button") : true);
    if (!hasMinimizeButton) {
        let minimizeButton = tempTitlebar.querySelector(".window-minimize-button");
        minimizeButton.remove();
    }

    const hasIcon = JSON.parse(windowObject.hasAttribute("has-icon")? windowObject.getAttribute("has-icon") : true);
    if (!hasIcon) {
        let windowIcon = tempTitlebar.querySelector(".window-icon");
        windowIcon.remove();
    }

    if(windowObject.hasAttribute("window-titlebar-name")) {
        let windowHeaderText = tempTitlebar.querySelector(".window-header-text");
        windowHeaderText.innerText = windowObject.getAttribute("window-titlebar-name");
    }

    if(windowObject.hasAttribute("window-titlebar-icon") && hasIcon) {
        let windowHeaderIcon = tempTitlebar.querySelector(".window-icon");
        windowHeaderIcon.setAttribute("src", `svg/${windowObject.getAttribute("window-titlebar-icon")}.svg`);
    }

    windowObject.insertAdjacentHTML("afterbegin", tempTitlebar.outerHTML);
    return windowObject;
}

$("body").on("mousedown", ".window", (eventObject) => { focusWindow(eventObject.currentTarget) });
$("body").on("touchstart", ".window", (eventObject) => { focusWindow(eventObject.currentTarget) });

/* Window focusing */
async function focusWindow(windowObject) {
    $(".window").css("z-index", 1);
    $(".focused-window").removeClass("focused-window");

    windowObject.classList.add("focused-window");
    windowObject.style.zIndex = 2;

    $(".taskbar-icon-active").addClass("taskbar-icon-inactive");
    $(".taskbar-icon-active").removeClass("taskbar-icon-active");

    let associatedTaskbarId = "#" + windowObject.getAttribute("associated-taskbar");
    $(associatedTaskbarId).addClass("taskbar-icon-active");
    $(associatedTaskbarId).removeClass("taskbar-icon-inactive");

    if (windowObject.classList.contains("minimized-window")) {
        $(windowObject).addClass("unminimized-window");
        $(windowObject).removeClass("minimized-window");
    }

    taskbarFullscreenCheck();
}


/* Control Buttons */
$("body").on("click", ".window-exit-button", async (eventObject) => {
    activeWindowObject = eventObject.target.closest(".window");

    let associatedTaskbarId = "#" + activeWindowObject.getAttribute("associated-taskbar");
    $(associatedTaskbarId).remove()

    activeWindowObject.remove();

    taskbarFullscreenCheck();

    $("#cursor").removeClass("hovering-cursor");
    $("#cursor").removeClass("grab-hover-cursor");
});

$("body").on("click", ".window-maximize-button", async (eventObject) => {
    activeWindowObject = eventObject.target.closest(".window");
    activeWindowObject.classList.remove("unminimized-window");

    if (!activeWindowObject.classList.contains("maximized-window")) {
        activeWindowObject.classList.add("maximized-window");

        activeWindowObject.setAttribute("former-x", activeWindowObject.style.left);
        activeWindowObject.setAttribute("former-y", activeWindowObject.style.top);

        activeWindowObject.style.top = 0;
        activeWindowObject.style.left = 0;
    } else {
        activeWindowObject.classList.remove("maximized-window");

        activeWindowObject.style.left = activeWindowObject.getAttribute("former-x") || 0;
        activeWindowObject.style.top = activeWindowObject.getAttribute("former-y") || 0;
    }

    taskbarFullscreenCheck();

    $("#cursor").removeClass("hovering-cursor");
    $("#cursor").removeClass("grab-hover-cursor");
});

$("body").on("click", ".window-minimize-button", async (eventObject) => {
    activeWindowObject = eventObject.target.closest(".window");
    activeWindowObject.classList.add("minimized-window");
    activeWindowObject.classList.remove("focused-window");

    let associatedTaskbarId = "#" + activeWindowObject.getAttribute("associated-taskbar");
    $(associatedTaskbarId).addClass("taskbar-icon-inactive");
    $(associatedTaskbarId).removeClass("taskbar-icon-active");

    if ($(".minimized-window").length == $(".window").length) {
        $("#taskbar-hide-button").css("display", "none");
        $("#taskbar-unhide-button").css("display", "block");
    }

    taskbarFullscreenCheck();

    $("#cursor").removeClass("hovering-cursor");
    $("#cursor").removeClass("grab-hover-cursor");
});


/* Taskbar Button */

$("body").on("click", ".taskbar-icon", async (eventObject) => {
    let associatedWindowId = "#" + eventObject.currentTarget.getAttribute("associated-window");
    if ($(associatedWindowId).hasClass("minimized-window") || !$(associatedWindowId).hasClass("focused-window")) {
        focusWindow($(associatedWindowId)[0])

        $("#taskbar-unhide-button").css("display", "none");
        $("#taskbar-hide-button").css("display", "block");

    } else {
        eventObject.currentTarget.classList.add("taskbar-icon-inactive");
        eventObject.currentTarget.classList.remove("taskbar-icon-active");

        $(associatedWindowId).addClass("minimized-window");

        if ($(".minimized-window").length == $(".window").length) {
            $("#taskbar-hide-button").css("display", "none");
            $("#taskbar-unhide-button").css("display", "block");
        }
    }
    
});

$("body").on("transitionend", ".unminimized-window", async (eventObject) => {
    eventObject.currentTarget.classList.remove("unminimized-window");
});


/* Taskbar Hide/Unhide */

$("body").on("click", "#taskbar-hide-button", async (eventObject) => {
    $(".taskbar-icon-active").addClass("taskbar-icon-inactive");
    $(".taskbar-icon-active").removeClass("taskbar-icon-active");

    $(".window").addClass("minimized-window");
    $(".unminimized-window").removeClass("unminimized-window");

    $("#taskbar-hide-button").css("display", "none");
    $("#taskbar-unhide-button").css("display", "block");
});

$("body").on("click", "#taskbar-unhide-button", async (eventObject) => {
    $(".window").addClass("unminimized-window");
    $(".window").removeClass("minimized-window");

    $(".focused-window").removeClass("focused-window");

    $("#taskbar-unhide-button").css("display", "none");
    $("#taskbar-hide-button").css("display", "block");
});

async function taskbarFullscreenCheck() {
    if ($(".maximized-window.focused-window").length == 1) {
        $("#taskbar").css("display", "none");
    } else {
        $("#taskbar").css("display", "");
    }
}

/* Desktop icons */

$("body").on("click", "#desktop", async (eventObject) => {
    if (eventObject.target.id == "desktop") {
        $(".highlighted-desktop-icon").removeClass("highlighted-desktop-icon");
        $(".focused-window").removeClass("focused-window");

        $(".taskbar-icon-active").addClass("taskbar-icon-inactive");
        $(".taskbar-icon-active").removeClass("taskbar-icon-active");
    }
});

/* $("body").on("click", ".desktop-icon", async (eventObject) => {
    $(".highlighted-desktop-icon").removeClass("highlighted-desktop-icon");
    eventObject.currentTarget.classList.add("highlighted-desktop-icon");
    $(".focused-window").removeClass("focused-window");

    $(".taskbar-icon-active").addClass("taskbar-icon-inactive");
    $(".taskbar-icon-active").removeClass("taskbar-icon-active");
}); */

var iconSizeX = 0;
var iconSizeY = 0;

var oldGridX = null;
var oldGridY = null;
$("body").on("mousedown touchstart", ".desktop-icon", async (eventObject) => {
    eventObject.preventDefault();
    eventObject.stopPropagation();

    $(".highlighted-desktop-icon").removeClass("highlighted-desktop-icon");
    eventObject.currentTarget.classList.add("highlighted-desktop-icon");
    $(".focused-window").removeClass("focused-window");

    $(".taskbar-icon-active").addClass("taskbar-icon-inactive");
    $(".taskbar-icon-active").removeClass("taskbar-icon-active");

    if (eventObject.type == "touchstart") {
        mouseInitialX = eventObject.changedTouches[0].clientX;
        mouseInitialY = eventObject.changedTouches[0].clientY;
    } else {
        mouseInitialX = eventObject.clientX;
        mouseInitialY = eventObject.clientY;
    }

    activeWindowObject = eventObject.currentTarget;

    let windowBounding = activeWindowObject.getBoundingClientRect();
    activeWindowX = windowBounding.x;
    activeWindowY = windowBounding.y;
    
    iconSizeX = windowBounding.width*1.033;
    iconSizeY = windowBounding.height*1.033;

    oldGridX = activeWindowObject.style.gridColumn;
    oldGridY = activeWindowObject.style.gridRow;

    document.onmousemove = iconHoldDrag;
    document.onmouseup = iconHoldStop;

    document.addEventListener("touchmove", iconHoldDrag, { passive: false });
    document.addEventListener("touchend", iconHoldStop, { passive: false });

    const mouseDownSFX = new Audio("./sounds/mouse_down.m4a");
    mouseDownSFX.volume = volume;
    mouseDownSFX.muted = (volume == 0);
    mouseDownSFX.play();
});

var gridX = 1;
var gridY = 1;
var movedIcon = false;
async function iconHoldDrag(eventObject) {
    eventObject.preventDefault();
    eventObject.stopPropagation();

    movedIcon = true;

    activeWindowObject.style.position = "absolute";
    activeWindowObject.style.gridColumn = null;
    activeWindowObject.style.gridRow = null;

    activeWindowObject.classList.add("grabbable");
    activeWindowObject.classList.remove("hoverable");
    
    $("#cursor").removeClass("hovering-cursor").addClass("grab-hold-cursor");

    if (eventObject.type == "touchmove") {
        clientX = eventObject.targetTouches[0].clientX;
        clientY = eventObject.targetTouches[0].clientY;
    } else {
        clientX = eventObject.clientX;
        clientY = eventObject.clientY;
    }

    let mouseDeltaX = 0, mouseDeltaY = 0;

    if (clientX > 0) {
        mouseDeltaX = window.innerWidth > clientX? clientX - mouseInitialX : 0;
    }

    if (clientY > 0) {
        mouseDeltaY = window.innerHeight > clientY? clientY - mouseInitialY : 0;
    }

    mouseInitialX = clientX;
    mouseInitialY = clientY;

    activeWindowX+=mouseDeltaX;
    activeWindowY+=mouseDeltaY;

    activeWindowObject.style.top = `${activeWindowY}px`;
    activeWindowObject.style.left = `${activeWindowX}px`;

    let currentX = activeWindowX + iconSizeX/2;
    let currentY = activeWindowY + iconSizeY/2;

    gridX = Math.floor(currentX/iconSizeX)+1;
    gridX = Math.min(Math.floor(window.innerWidth/iconSizeX), gridX);

    gridY = Math.floor(currentY/iconSizeY)+1;
    gridY = Math.min(Math.floor(window.innerHeight/iconSizeY)-1, gridY);

    $("#desktop-icon-indicator").css("display", "")
    $("#desktop-icon-indicator").css("grid-column", gridX)
    $("#desktop-icon-indicator").css("grid-row", gridY)

    taskbarFullscreenCheck()
}

async function iconHoldStop() {
    document.onmousemove = null;
    document.onmouseup = null;

    document.removeEventListener("touchmove", iconHoldDrag);
    document.removeEventListener("touchend", iconHoldStop);

    if (!movedIcon) return;
    movedIcon = false;

    $("#desktop-icon-indicator").css("display", "none");
    $("#desktop-icon-indicator").css("grid-column", "");
    $("#desktop-icon-indicator").css("grid-row", "");

    activeWindowObject.classList.remove("grabbable");
    activeWindowObject.classList.add("hoverable");

    activeWindowObject.style.position = "";

    let isPlaceable = true;
    try {
        Object.keys(iconPlacement).forEach(key => {
            if (iconPlacement[key][0] == gridX && iconPlacement[key][1] == gridY) {
                throw SyntaxError;
            }
        });
    } catch (error) {
        isPlaceable = false;
    }

    if (isPlaceable) {
        activeWindowObject.style.gridColumn = gridX;
        activeWindowObject.style.gridRow = gridY;
    
        iconPlacement[Array.from($("#desktop")[0].children).indexOf(activeWindowObject)] = [ gridX, gridY ];
        localStorage.setItem("icon-placement", JSON.stringify(iconPlacement));
    } else {
        activeWindowObject.style.gridColumn = oldGridX;
        activeWindowObject.style.gridRow = oldGridY;
    }

    $("#cursor").removeClass("grab-hold-cursor");
}

$("body").on("dblclick touchend", ".desktop-icon", async (eventObject) => {
    if (movedIcon == true) return;

    $(".highlighted-desktop-icon").removeClass("highlighted-desktop-icon");

    if (eventObject.currentTarget.hasAttribute("focus-if-loaded") && $(`.${eventObject.currentTarget.getAttribute("focus-if-loaded")}`).length != 0) {
        focusWindow($(`.${eventObject.currentTarget.getAttribute("focus-if-loaded")}`)[0]);
        return;
    }

    loadWindowFromHTML(eventObject.currentTarget.getAttribute("loads-app"));
});

/* Playing sounds */

const mouseDownSFX = new Audio("./sounds/mouse_down.m4a");
const mouseUpSFX = new Audio("./sounds/mouse_up.m4a");

$("body").on("mousedown touchstart", async (eventObject) => {
    mouseDownSFX.volume = volume;
    mouseDownSFX.muted = (volume == 0);
    mouseDownSFX.play();
});

$("body").on("mouseup touchend", async (eventObject) => {
    mouseUpSFX.volume = volume;
    mouseUpSFX.muted = (volume == 0);
    mouseUpSFX.play();
});

$("body").on("mousemove", async (eventObject) => {
    $("#cursor").css("left", `${eventObject.clientX-5}px`);
    $("#cursor").css("top", `${eventObject.clientY-5}px`);
});

document.addEventListener("touchmove", cursorMobileDrag, { passive: false });

async function cursorMobileDrag(eventObject) {
    if (eventObject.target.closest("#taskbar") != null || eventObject.target.id == "taskbar") return;
    if (eventObject.target.classList.contains("profile-description")) return;
    eventObject.preventDefault();
    eventObject.stopPropagation();
    if (!lockCursorX) $("#cursor").css("left", `${eventObject.changedTouches[0].clientX-5}px`);
    if (!lockCursorY) $("#cursor").css("top", `${eventObject.changedTouches[0].clientY-5}px`);
}

async function killErrorMessage(errorMessage) {
    errorMessage.closest(".error-message").remove();
    $("#cursor").removeClass("hovering-cursor");
}

$("body").on("mouseenter", ".hoverable", async (eventObject) => {
    $("#cursor").addClass("hovering-cursor");
});

$("body").on("mouseleave", ".hoverable", async (eventObject) => {
    $("#cursor").removeClass("hovering-cursor");
});

$("body").on("mouseenter", ".grabbable", async (eventObject) => {
    $("#cursor").addClass("grab-hover-cursor");
});

$("body").on("mouseleave", ".grabbable", async (eventObject) => {
    $("#cursor").removeClass("grab-hover-cursor");
})

$("body").on("mousedown touchstart", ".grabbable", async (eventObject) => {
    $("#cursor").addClass("grab-hold-cursor");
});

$("body").on("mouseup touchend", async (eventObject) => {
    $("#cursor").removeClass("grab-hold-cursor");
});

// Simple functions

async function loadVideo(link) {
    loadWindowFromHTML("playerWindow", link);
}