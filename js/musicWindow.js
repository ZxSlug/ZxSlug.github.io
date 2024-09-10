function padTime(time) {
  return time.toString().padStart(2, 0);
}

async function musicSliderModify(scroll) {
setMusicSliderText(scroll);
/*   player.seekTo(scroll.value); */
/*   musicSliderAutoscroll(scroll); */
}

$("body").on("mouseup", ".musicbox-progressbar", async (eventObject) => {
const scroll = eventObject.currentTarget;
setTimeout(() => {
  setMusicSliderText(scroll);
  player.seekTo(scroll.value);
  console.log(scroll.value)
}, 50)
})

async function setMusicSliderText(scroll) {
  const totalMinutes = Math.floor(scroll.max/60);
  const totalSeconds = Math.floor(scroll.max-totalMinutes*60);

  const minutes = Math.floor(scroll.value/60);
  const seconds = Math.floor(scroll.value-minutes*60);

  scroll.textLabel.innerHTML = `${padTime(minutes)}:${padTime(seconds)} / ${padTime(totalMinutes)}:${padTime(totalSeconds)}`;
}

async function setPlaybackSpeed(scroll) {
player.setPlaybackRate(scroll.value/100);
clearInterval(playerAutoscrollInterval);
musicSliderAutoscroll($(".musicbox-progressbar")[0]);
}

async function setPlaybackVolume(scroll) {
player.setVolume(scroll.value);
}

if (tag == undefined) {
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
}
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
window.onYouTubeIframeAPIReady = function() {
player = new YT.Player('ytplayer', {
  width: '0',
  height: '0',
  autoplay: true,
  videoId: 'A1I680Mirq4',
  origin: window.location.hostname,
  playerVars: {
    'playsinline': 1
  },
  events: {
    'onReady': onPlayerReady,
    'onStateChange': onPlayerStateChange
  }
});
}

function onPlayerReady() {
$(".musicbox-name")[0].querySelector(".scroll-input").innerHTML = player.getVideoData().title;
$(".musicbox-progressbar")[0].setAttribute("max", player.getDuration());
$(".musicbox-progressbar")[0].setAttribute("value", 0);
musicSliderAutoscroll($(".musicbox-progressbar")[0]);

player.playVideo()
}

var playerAutoscrollInterval;
function onPlayerStateChange() {
  clearInterval(playerAutoscrollInterval);
  musicSliderAutoscroll($(".musicbox-progressbar")[0]);
}

async function musicSliderAutoscroll(scroll) {
playerAutoscrollInterval = setInterval(() => {
  scroll.setAttribute("value", scroll.value+0.05);
}, 50/player.getPlaybackRate());
}