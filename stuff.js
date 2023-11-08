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

// Make the DIV element draggable:
dragElement(document.getElementById("window"));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    //document.getElementById(elmnt.id + "header").ontouchstart = dragMouseDown;
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
    //document.ontouchend = closeDragElement;
    
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
    //document.ontouchmove = elementDrag;
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
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";

    e.preventDefault();
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    //document.ontouchend = null;

    document.onmousemove = null;
    //document.ontouchmove = null;
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
        $("body").css("backgroundImage", "none")
        $("#turnphone").css("fontSize", "75px")
        $("#turnphone").css("visibility", "visible")
    } else {
        $("#pfp").css("visibility", "visible")
        $("*").css("visibility", "visible")
        $("body").css("backgroundImage", "var(--bg)")
        $("#turnphone").css("fontSize", "0")
        //mobileAdapt()
    }
}

orientationCheck();

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
        $("#windowheader").remove();
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

        console.log(`${window.innerHeight} : ${window.innerWidth}\n${window.innerHeight/69*106}`)
        console.log($("#content").width())

        
    }
}

mobileAdapt()