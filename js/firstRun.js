const yippeeSFX = new Audio("./sounds/yippee-tbh.mp3");

summonErrorMessage("happy 10th anniversary oneshot", [
    {
        name: "yippee =D",
        function: "yippeeSFX.cloneNode(true).play();"
    },
    {
        name: "steam",
        function: "window.open('https://store.steampowered.com/app/420530/OneShot/', '_blank', 'popup=yes'); killErrorMessage(this);"
    }
])

//I'm sorry i just rembered ;-;