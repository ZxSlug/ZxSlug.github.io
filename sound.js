$("body").on("click",function() {
    document.getElementById('warning').remove();

    const banner1sfx = new Audio("./sfx/oneshot_instruction1.wav");
    document.getElementById('banner1').style.setProperty("animation", "fadeIn 1s ease-in forwards")
    banner1sfx.play();

    setTimeout(() => {
        const banner2sfx = new Audio("./sfx/oneshot_instruction2.wav");
        document.getElementById('banner2').style.setProperty("animation", "fadeIn 1s ease-in forwards")
        banner2sfx.play();
    }, 5000)
})