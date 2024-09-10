$("body").off("click", ".profile-scroll-left, .profile-scroll-right");
$("body").on("click", ".profile-scroll-left, .profile-scroll-right", async (eventObject) => {
    loadProfilePage(eventObject.currentTarget.getAttribute("page-link"));
})

var profilePages;
var currentProfileIndex = 0;
$.ajax({
    url: "./profile-pages/settings.json",
    success: async (result) => {
        profilePages = result;
        loadProfilePage(currentProfileIndex);
    },
    failure: async (error) => { console.error(error, `There was an error while getting the Profile Pages. \n Check the errors for more info.`); }
})

async function loadProfilePage(pageNumber) {
    $.ajax({
        url: `./profile-pages/${profilePages[pageNumber]}.toml`,
        success: async (result) => {
            const pageInfo = parse(result);

            pageNumber = parseInt(pageNumber);

            if (!("title" in pageInfo)) {
                console.error("The TOML must have a valid title.")
                return;
            }
            $(".profile-page-name").text(pageInfo.title);

            $(".profile-scroll-left").attr("page-link", (pageNumber != 0 ? pageNumber - 1 : profilePages.length - 1));
            $(".profile-scroll-right").attr("page-link", (pageNumber != profilePages.length - 1 ? pageNumber + 1 : 0));

            changeBackground(pageInfo.background);
            changeMet(pageInfo.met);
            changeDescription(pageInfo.description);
            changeSocials(pageInfo.social);
            changeResources(pageInfo.resources);
        },
        failure: async (error) => { console.error("There was an error while retrieving a Profile Page TOML file. \n Check the errors for more info."); }
    })
}

async function changeBackground(backgroundObject) {
    if (!backgroundObject) {
        $(".profile-content").css("background-image", "");
    }
    
    if (backgroundObject.enabled) {
        $.ajax({
            url: `images/${backgroundObject.filename}`,
            success: async (result) => {
                $(".profile-content").css("background-image", `url(./images/${backgroundObject.filename})`);
            },
            failure: async (error) => { console.error(error, "There was an error while retrieving the Profile Background image. \n Check the errors for more info."); }
        });
    } else {
        $(".profile-content").css("background-image", "");
    }
}

async function changeMet(metObject) {
    if (!metObject) {
        $(".profile-met").css("visibility", "hidden");
    }

    if (metObject.enabled) {
        $(".profile-met").css("visibility", "");

        if (metObject.text != undefined && metObject.text != "") {
            $(".profile-met-text").text(metObject.text);
        } else {
            console.warn("The met object string is empty or missing. The text will not be changed.");
        }
    } else {
        $(".profile-met").css("visibility", "hidden");
    }
}

async function changeDescription(descriptionObject) {
    if (!descriptionObject) {
        $(".profile-description").css("visibility", "hidden");
    }

    if (descriptionObject.enabled) {
        $(".profile-description").css("visibility", "");

        if (descriptionObject.text != undefined && descriptionObject.text != "") {
            $(".profile-description").html(descriptionObject.text.replaceAll("\n", "<br>"));
        } else {
            console.warn("The description object string is empty or missing. The text will not be changed.");
        }
    } else {
        $(".profile-description").css("visibility", "hidden");
    }
}

async function changeSocials(socialObject) {
    if (!socialObject) {
        $(".profile-socials").css("visibility", "hidden");
    }

    if (socialObject.enabled) {
        $(".profile-socials").css("visibility", "");

        $(".profile-socials").empty()

        delete socialObject.enabled;
        const socialMedias = Object.keys(socialObject)
            .filter((key) => { return (socialObject[key].enabled !== false) })
            .reduce((object, key) => {
                object[key] = socialObject[key];
                return object;
            }, []);

        for (const [ platformName, platform ] of Object.entries(socialMedias)) {
            if (platform.url === undefined) {
                console.warn(`The ${platformName} link on the Profile App is required to have a URL. Skipping...`);
                continue;
            }

            let linkObject = $.parseHTML(`<a target="_blank" rel="noopener noreferrer" class="hoverable profile-social-link"><img src="images/placeholder.webp"></a>`)[0];
            linkObject.href = platform.url;

            if (platform.icon_path != undefined) {
                let imageObject = linkObject.firstChild;
                imageObject.src = platform.icon_path;

                if (platform.icon_path.slice(-4) == ".svg") {
                    imageObject.setAttribute("onload", "SVGInject(this)")
                }
            }

            $(".profile-socials").append(linkObject.outerHTML);
        }
    } else {
        $(".profile-socials").css("visibility", "hidden");
    }
}

async function changeResources(resourcesObject) {
    if (!resourcesObject) {
        $(".profile-images").css("visibility", "hidden");
    }

    if (resourcesObject.enabled) {
        $(".profile-images").css("visibility", "");

        if (resourcesObject.pfp != undefined && resourcesObject.pfp.enabled) {
            $(".profile-pfp").css("visibility", "");

            $.ajax({
                url: `images/${resourcesObject.pfp.filename}`,
                success: async (result) => {
                    $(".profile-pfp").attr("src", `./images/${resourcesObject.pfp.filename}`);
                },
                failure: async (error) => {
                    console.warn(error, "There was an error while retrieving the Profile PFP image. \n Check the errors for more info.");
                    $(".profile-pfp").css("visibility", "hidden");
                }
            });
        } else {
            $(".profile-pfp").css("visibility", "hidden");
        }

        if (resourcesObject.sprites != undefined && resourcesObject.sprites.enabled) {
            $(".profile-sprites").css("visibility", "");
            
            $.ajax({
                url: `images/${resourcesObject.sprites.filename}`,
                success: async (result) => {
                    $(".profile-sprites").attr("src", `./images/${resourcesObject.sprites.filename}`);
                },
                failure: async (error) => {
                    console.warn(error, "There was an error while retrieving the Profile Sprites image. \n Check the errors for more info.");
                    $(".profile-sprites").css("visibility", "hidden");
                }
            });
        } else {
            $(".profile-sprites").css("visibility", "hidden");
        }

    } else {
        $(".profile-images").css("visibility", "hidden");
    }
}