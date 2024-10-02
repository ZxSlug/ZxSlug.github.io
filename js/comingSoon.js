$(`#${$(".unfinished")[0].getAttribute("associated-taskbar")}`).remove();
$(".unfinished").remove();

summonErrorMessage("This app is not finished and the developer\ndecided to lock it out.\nSorry!", [
    {
        name: "OK",
        function: "killErrorMessage(this);"
    }
]);