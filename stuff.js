var textPage0 = `animator and gfx artist
15 | guy
animating for 3-4 years

socials:
twitter - @ZxSlug
youtube - @ZxSlug
roblox - ZxSIug (with an i not an L)
tiktok - @zxslug

proud niko plush owner`
var metPage0 = "Met: Moldova"

var textPage1 = `gfx prices:
base price - 100 robux
+50 robux per character

animation prices:
base price - 700 robux
+50 robux per character`
var metPage1 = "@zxslug on twitter"

var page = 0;

// Make the DIV element draggable:
dragElement(document.getElementById("window"));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    document.getElementById(elmnt.id + "header").ontouchstart = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
    elmnt.ontouchstart = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.ontouchend = closeDragElement;
    
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
    //document.ontouchmove = elementDrag;
    document.addEventListener("ontouchmove", elementDrag, {passive: false});

    //e.preventDefault();
  }

  function elementDrag(e) {
    e = e || window.event;
    //e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";

    e.preventDefault();
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.ontouchend = null;

    document.onmousemove = null;
    document.ontouchmove = null;
  }
}

function tbarResize() {
    tbarh = $("#windowheader").height()
    $("#windowtitle").css("fontSize", `${tbarh/2.5}px`);
    $("#taskbar").css("height", `${tbarh*10/7}px`);

    conth = $("#content").height()
    $("#name h1").css("fontSize", `${conth*0.0471}px`)
    $("#name img").css("fontSize", `${conth*0.0471}px`)

    $("#desccontent").css("height", `${conth*0.5}px`)
    $("#met").css("fontSize", `${conth*0.02536}px`)
    $("#desc").css("fontSize", `${conth*0.02536}px`)

    var pfp = document.getElementById("pfp")
    pfp.height=conth*0.1739

    var scrleft = document.getElementById("scrleft")
    scrleft.height=conth*0.058

    var scrright = document.getElementById("scrright")
    scrright.height=conth*0.058
}

$(window).on("resize", function() {
    tbarResize()
})

var desc = document.getElementById("desc")
var nameString = document.getElementById("namestring")
var metString = document.getElementById("met")

function pageRefresh() {
    switch (page) {
        case 0: {
            desc.innerText = textPage0;
            nameString.innerHTML = "ZxSlug"
            metString.innerHTML = metPage0
            $("#content").css("backgroundImage", "url(./pics/art.png)")
            $("#pfp").css("visibility", "visible")
            page = 1;
            break;
        }
        case 1: {
            desc.innerText = textPage1;
            nameString.innerHTML = "Slug Comms"
            metString.innerHTML = metPage1
            $("#content").css("backgroundImage", "url(./pics/art2.png)")
            $("#pfp").css("visibility", "hidden")
            page = 0;
            break;
        }
        default: {
            desc.innerText = `placeholder`;
            break;
        }
    }
}

tbarResize();

tbarResize();

pageRefresh();

$("#scrleft").click(function() {
    page = page=0? page = 1 : page--;
    pageRefresh()
})

$("#scrright").click(function() {
    page = page=0? page = 0 : page++;
    pageRefresh()
})

window.addEventListener("orientationchange", function() {
    orientationCheck()
  }, false);

function orientationCheck() {
    if (screen.orientation.type == "portrait-primary") {
        $("#pfp").css("visibility", "hidden")
        $("*").css("visibility", "hidden")
        $("body").css("backgroundColor", "black")
        $("body").css("backgroundImage", "none")
        $("#turnphone").css("fontSize", "75px")
        $("#turnphone").css("visibility", "visible")
    } else {
        $("#pfp").css("visibility", "visible")
        $("*").css("visibility", "visible")
        $("body").css("backgroundColor", "none")
        $("body").css("backgroundImage", "var(--bg)")
        $("#turnphone").css("fontSize", "0")
    }
}

orientationCheck();

var windowthing = document.getElementById("window")

$("#window").css("top", `${(window.innerHeight-$("#window").height())/2}px`)
$("#window").css("left", `${(window.innerWidth-$("#window").width())/2}px`)