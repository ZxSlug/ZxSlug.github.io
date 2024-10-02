$(".fullscreen").remove();

if (window.screenTop || window.screenY) {
    document.documentElement.requestFullscreen();
} else {
    document.exitFullscreen();
}