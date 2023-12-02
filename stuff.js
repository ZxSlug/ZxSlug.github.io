/*
I am really
really
sorry
for everyone
who decided to just
"huh lemme check this out"
and stumbled upon this mess
 - toaddx
*/

jQuery.fn.removeInlineCss = function (properties) {
  if (properties == null) return this.removeAttr('style')
  properties = properties.split(/\s+/)
  return this.each(function () {
    for (var i = 0; i < properties.length; i++)
      this.style.removeProperty(properties[i])
  })
} //- thx Yukulélé on StackOverflow

var textPage0 = `animator (1-2 years exp)
15 | guy

socials:
twitter - @ZxSlug
youtube - @ZxSlug
roblox - ZxSIug (with an i not an L)
tiktok - @zxslug

proud niko plush owner`
var metPage0 = "Met: Moldova"

var textPage1 = `animation prices:
base price - 6,000 robux | $16.00
--- everything below is temporary ---
(still haven't decided)
+ [REDACTED] robux | $[REDACTED] per character
+ [REDACTED] robux | $[REDACTED] per second of animation`
var metPage1 = "@zxslug on discord"

var page = 0;

var maximized=false

var searchParams = new URLSearchParams(window.location.search)

var prevX;
var prevY;

// Make the DIV element draggable:
dragElement(document.getElementById("window"));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0, finalX = 0, finalY = 0;
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
    document.ontouchmove = elementDrag;
    //document.addEventListener("ontouchmove", elementDrag, {passive: false});

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

    finalX = elmnt.offsetTop - pos2
    finalY = elmnt.offsetLeft - pos1

    if (finalX > 0) {
      finalX = finalX > window.innerHeight-(elmnt.offsetHeight/4)? window.innerHeight-(elmnt.offsetHeight/4) : finalX //buggy
    } else {
      finalX = finalX < 0? 0 : finalX
    }

    if (finalY > 0) {
      finalY = finalY > window.innerWidth-(elmnt.offsetWidth/4)? window.innerWidth-(elmnt.offsetWidth/4) : finalY //buggy
    } else {
      finalY = finalY < -(elmnt.offsetWidth/4)? -(elmnt.offsetWidth/4) : finalY
    }
    // set the element's new position:
    elmnt.style.top = finalX + "px";
    elmnt.style.left = finalY + "px";

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
    $(".taskbar-element").css("fontSize", `${tbarh/2.5}px`);
    $(".taskbar-element span").css("height", `${tbarh/2.5+10}px`);
    $("#time").css("fontSize", `${tbarh/2.5}px`);
    $("#windowtitle").css("width", `${tbarh/0.03}px`);
    $("#windowheader img").css("height", `${tbarh*0.8}px`);
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

    if (maximized) maximizeRefresh()

    if ($("#desccontent").width() > window.innerWidth) {
      $("#desccontent").width(innerWidth)
    } else {
      $("#desccontent").removeInlineCss("width")
    }
}

$(window).on("resize", function() {
    tbarResize()
})

var desc = document.getElementById("desc")
var nameString = document.getElementById("namestring")
var metString = document.getElementById("met")
var content = document.getElementById("content")
var button = document.getElementById("maximize-button")

function maximizeRefresh() {
  if (!maximized) {
    $("#windowheader").css("display", "flex")
    $("#minimize-button").removeInlineCss()
    $("body").removeInlineCss()
    $("#window").removeInlineCss("border")
    $("#window").removeInlineCss("height")
    $("#taskbar").css("display", "flex")
    $("#credits").css("display", "block")
    $("#content").removeInlineCss("width")
    $("#content").removeInlineCss("height")
    tbarResize()
    document.getElementById("window").style.top = prevX
    document.getElementById("window").style.left = prevY
  } else if (!searchParams.has("old")) {
    $("body").css("background-image", "none")
    $("#credits").css("display", "none")
    $("#windowheader").css("display", "none");
    $("#taskbar").css("display", "none")
    $("#window").css("border", "none")
    $("#window").css("top", "0")
/*     $("#window").css("left", "0") */
    $("#content").css("height", "100vh")
/*     $("#content").css("width", "100vw") */
    $("#window").css("height", "100vh")
    //$("#windowheader").css("position", "absolute")
    //$("#windowheader").css("width", "100vw")
    $("#minimize-button").css("display", "block")
    $("#minimize-button").css("width", `${Math.min(window.innerWidth, window.innerHeight)/21.4}px`)

    if (window.innerWidth/window.innerHeight >= 106/69) {
      $("#content").css("width", (window.innerHeight/69*106))
      $("#window").css("left", ((window.innerWidth-(window.innerHeight/69*106))/2))
    } else {
      $("#content").css("width", window.innerWidth)
      $("#window").css("left", 0)
    }
  }
  //tbarResize()
}

async function rgb() {
  let test = 0;
  while (1) {
    test = test==360? 0 : test+5;
    document.documentElement.style.setProperty('--shit-color', `hsl(${test}, 100%, 50%)`)
    await new Promise(resolve => setTimeout(resolve, 100));
  }
}

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
function old() {
  $("#windowheader").remove();

  $("#taskbar").remove();

  $("#window").contents().unwrap()
  
  $("#content").css("height", "100vh")

  $("#content").css("padding", "2%");

  //$("#content").css("maxWidth", `${window.innerHeight/69*106}px`)

  $("#content").css("width", `100vw`)

  //$("#content").css("width", `min(100vw, ${$("#content").height()/69*106}px`)
  $("#content").css("position", "absolute")

  $("#content").css("top", "0");
  $("#content").css("left", "0");
  //$("#content").css("left", `${(window.innerWidth-(window.innerHeight/69*106))/2}px`)
}

if (searchParams.has("break")) throw EvalError;
if (searchParams.has("old")) old();
/* if (searchParams.has("rgb")) rgb(); */
if (searchParams.has("no-tb")) $("#taskbar").remove();
if (searchParams.has("creditless")) $("#credits").remove();


let date = new Date()
let currentTime = date.toLocaleString("en-US", {
  hour12: true,
  minute: "numeric",
  hour: "numeric"
})

$("#time").text(currentTime)

function christmas() {
  $("body").append(`
  <style>

  /* customizable snowflake styling */
  
  .snowflake {
  
    color: #fff;
  
    font-size: 2em;
  
    font-family: Arial, sans-serif;
  
    text-shadow: 0 0 5px #000;
  
  }
  
   
  
  .snowflake,.snowflake .inner{animation-iteration-count:infinite;animation-play-state:running}@keyframes snowflakes-fall{0%{transform:translateY(0)}100%{transform:translateY(110vh)}}@keyframes snowflakes-shake{0%,100%{transform:translateX(0)}50%{transform:translateX(80px)}}.snowflake{position:fixed;top:-10%;z-index:9999;-webkit-user-select:none;user-select:none;cursor:default;animation-name:snowflakes-shake;animation-duration:3s;animation-timing-function:ease-in-out}.snowflake .inner{animation-duration:10s;animation-name:snowflakes-fall;animation-timing-function:linear}.snowflake:nth-of-type(0){left:1%;animation-delay:0s}.snowflake:nth-of-type(0) .inner{animation-delay:0s}.snowflake:first-of-type{left:10%;animation-delay:1s}.snowflake:first-of-type .inner,.snowflake:nth-of-type(8) .inner{animation-delay:1s}.snowflake:nth-of-type(2){left:20%;animation-delay:.5s}.snowflake:nth-of-type(2) .inner,.snowflake:nth-of-type(6) .inner{animation-delay:6s}.snowflake:nth-of-type(3){left:30%;animation-delay:2s}.snowflake:nth-of-type(11) .inner,.snowflake:nth-of-type(3) .inner{animation-delay:4s}.snowflake:nth-of-type(4){left:40%;animation-delay:2s}.snowflake:nth-of-type(10) .inner,.snowflake:nth-of-type(4) .inner{animation-delay:2s}.snowflake:nth-of-type(5){left:50%;animation-delay:3s}.snowflake:nth-of-type(5) .inner{animation-delay:8s}.snowflake:nth-of-type(6){left:60%;animation-delay:2s}.snowflake:nth-of-type(7){left:70%;animation-delay:1s}.snowflake:nth-of-type(7) .inner{animation-delay:2.5s}.snowflake:nth-of-type(8){left:80%;animation-delay:0s}.snowflake:nth-of-type(9){left:90%;animation-delay:1.5s}.snowflake:nth-of-type(9) .inner{animation-delay:3s}.snowflake:nth-of-type(10){left:25%;animation-delay:0s}.snowflake:nth-of-type(11){left:65%;animation-delay:2.5s}
  
  </style>
  
  <div class="snowflakes" aria-hidden="true">
  
    <div class="snowflake">
  
      <div class="inner">❅</div>
  
    </div>
  
    <div class="snowflake">
  
      <div class="inner">❅</div>
  
    </div>
  
    <div class="snowflake">
  
      <div class="inner">❅</div>
  
    </div>
  
    <div class="snowflake">
  
      <div class="inner">❅</div>
  
    </div>
  
    <div class="snowflake">
  
      <div class="inner">❅</div>
  
    </div>
  
    <div class="snowflake">
  
      <div class="inner">❅</div>
  
    </div>
  
    <div class="snowflake">
  
      <div class="inner">❅</div>
  
    </div>
  
    <div class="snowflake">
  
      <div class="inner">❅</div>
  
    </div>
  
    <div class="snowflake">
  
      <div class="inner">❅</div>
  
    </div>
  
    <div class="snowflake">
  
      <div class="inner">❅</div>
  
    </div>
  
    <div class="snowflake">
  
      <div class="inner">❅</div>
  
    </div>
  
    <div class="snowflake">
  
      <div class="inner">❅</div>
  
    </div>`)

    document.documentElement.style.setProperty('--shit-color', `#afe4f0`)

}

if ((date.getMonth() == 11 && (searchParams.get("holiday") == "christmas" || !searchParams.has("holiday"))|| searchParams.get("holiday") == "christmas")) christmas()

if (searchParams.has("color")) {
  let color = searchParams.get("color")
  if (color != undefined) {
    document.documentElement.style.setProperty('--shit-color', `#${color}`)
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

$("#maximize-button").click(function() {
    prevX = document.getElementById("window").style.top
    prevY = document.getElementById("window").style.left
    maximized = !maximized;
    maximizeRefresh()
    tbarResize()
})

$("#minimize-button").click(function() {
  maximized = !maximized;
  maximizeRefresh()
})

$("#close-button").click(function() {
  history.back()
})

window.addEventListener("orientationchange", function() {
    orientationCheck()
  }, false);

var windowthing = document.getElementById("window")

$("#window").css("top", `${(window.innerHeight-$("#window").height())/2}px`)
$("#window").css("left", `${(window.innerWidth-$("#window").width())/2}px`)

window.mobileCheck = function() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
  };

function mobileAdapt() {
    if (mobileCheck()) {
        $("#minimize-button").remove();
        maximized=true;
        maximizeRefresh();
        tbarResize();
    }
}

mobileAdapt()
var kcodeProgress = 0;

function konami() {
  let audio = new Audio('./random_shit/item_get.wav');
  audio.play();
  rgb()
}

$("body").keydown(function(e) {
  let kcode = ["38", "38", "40", "40", "37", "39", "37", "39", "66", "65", "13"]
  if(e.keyCode == 37) { // left
    page = page=0? page = 1 : page--;
    pageRefresh()
  }
  else if(e.keyCode == 39) { // right
    page = page=0? page = 0 : page++;
    pageRefresh()
  }
  if (kcodeProgress < kcode.length) {
    if (e.keyCode == kcode[kcodeProgress]) {
      kcodeProgress++;
      if (kcodeProgress == kcode.length) konami();
    } else {
      kcodeProgress = 0;
    }
  }
});

tbarResize()