/* =====================================================
   WEDDING INVITATION - APP.JS
===================================================== */


/* =====================================================
   DOM READY
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    console.log("Wedding invitation loaded.");


    /* -------------------------------------------------
       LANGUAGE BUTTONS
    ------------------------------------------------- */

    const sinhalaBtn =
        document.getElementById("sinhalaBtn");

    const englishBtn =
        document.getElementById("englishBtn");


    if (sinhalaBtn) {

        sinhalaBtn.addEventListener(
            "click",
            function () {

                console.log("Sinhala button clicked");

                /*
                    Start music INSIDE the click handler,
                    synchronously, before anything is
                    awaited. This keeps the browser's
                    "user gesture" active so audio with
                    sound is allowed to autoplay.
                */

                startMusic();

                selectLanguage("si");

            }
        );

    }


    if (englishBtn) {

        englishBtn.addEventListener(
            "click",
            function () {

                console.log("English button clicked");

                startMusic();

                selectLanguage("en");

            }
        );

    }


    /* -------------------------------------------------
       MUSIC BUTTON
    ------------------------------------------------- */

    const musicButton =
        document.getElementById("musicButton");


    if (musicButton) {

        musicButton.addEventListener(
            "click",
            function () {

                console.log("Music button clicked");

                toggleMusic();

            }
        );

    }


    /* -------------------------------------------------
       FIRST INTERACTION FALLBACK

       Safety net: if for any reason music has not
       started yet (e.g. the click-based start above
       was blocked), start it on the very first tap
       or click anywhere on the page.
    ------------------------------------------------- */

    function firstInteractionStart() {

        const music =
            document.getElementById(
                "weddingMusic"
            );


        if (music && music.paused) {

            startMusic();

        }


        window.removeEventListener(
            "click",
            firstInteractionStart
        );

        window.removeEventListener(
            "touchstart",
            firstInteractionStart
        );

    }


    window.addEventListener(
        "click",
        firstInteractionStart
    );

    window.addEventListener(
        "touchstart",
        firstInteractionStart
    );


    /* -------------------------------------------------
       ADD TO GOOGLE CALENDAR BUTTON
    ------------------------------------------------- */

    const addToCalendarBtn =
        document.getElementById("addToCalendarBtn");


    if (addToCalendarBtn) {

        addToCalendarBtn.addEventListener(
            "click",
            function () {

                console.log("Add to calendar clicked");

                const calendarUrl =
                    buildGoogleCalendarUrl();

                window.open(
                    calendarUrl,
                    "_blank"
                );

            }
        );

    }


    /* -------------------------------------------------
       GALLERY AUTO SLIDESHOW
    ------------------------------------------------- */

    initGalleryAutoSlide();


    /* -------------------------------------------------
       CREATE JASMINE PETALS
    ------------------------------------------------- */

    createPetals();


    /* -------------------------------------------------
       GALLERY AUTO SCROLL
    ------------------------------------------------- */

    startGalleryAutoScroll();


    /* -------------------------------------------------
       START COUNTDOWN
    ------------------------------------------------- */

    updateCountdown();

    setInterval(
        updateCountdown,
        1000
    );

});



/* =====================================================
   LANGUAGE SYSTEM
===================================================== */

async function selectLanguage(language) {

    console.log(
        "Loading language:",
        language
    );


    try {

        /*
            Load language JSON

            Example:

            lang/si.json
            lang/en.json
        */

        const response =
            await fetch(
                `lang/${language}.json?v=${Date.now()}`
            );


        /* Check HTTP response */

        if (!response.ok) {

            throw new Error(
                `Could not load lang/${language}.json`
            );

        }


        const data =
            await response.json();


        console.log(
            "Language data:",
            data
        );


        /* -------------------------------------------------
           HERO
        ------------------------------------------------- */

        setText(
            "heroSmall",
            data.heroSmall
        );


        setText(
            "heroTitle",
            data.heroTitle
        );


        /*
            Apply the Sinhala-only heading font.
            English keeps its original font untouched.
        */

        const heroTitleEl =
            document.getElementById(
                "heroTitle"
            );


        if (heroTitleEl) {

            if (language === "si") {

                heroTitleEl.classList.add(
                    "sinhalaTitle"
                );

            }

            else {

                heroTitleEl.classList.remove(
                    "sinhalaTitle"
                );

            }

        }


        setText(
            "heroDescription",
            data.heroDescription
        );


        setText(
            "heroDate",
            data.heroDate
        );


        /* -------------------------------------------------
           COUNTDOWN
        ------------------------------------------------- */

        setText(
            "countdownTitle",
            data.countdownTitle
        );


        setText(
            "daysText",
            data.days
        );


        setText(
            "hoursText",
            data.hours
        );


        setText(
            "minutesText",
            data.minutes
        );


        setText(
            "secondsText",
            data.seconds
        );


        /* -------------------------------------------------
           STORY
        ------------------------------------------------- */

        setText(
            "storyTitle",
            data.storyTitle
        );


        setText(
            "storyText",
            data.storyText
        );


        /* -------------------------------------------------
           GALLERY
        ------------------------------------------------- */

        setText(
            "galleryTitle",
            data.galleryTitle
        );


        /* -------------------------------------------------
           PORUWA
        ------------------------------------------------- */

        setText(
            "poruwaTitle",
            data.poruwaTitle
        );


        setText(
            "poruwaText",
            data.poruwaText
        );


        setText(
            "poruwaDateTitle",
            data.date
        );


        setText(
            "poruwaDate",
            data.poruwaDate
        );


        setText(
            "poruwaTimeTitle",
            data.time
        );


        setText(
            "poruwaTime",
            data.poruwaTime
        );


        setText(
            "venueTitle",
            data.venue
        );


        setText(
            "venue",
            data.venueName
        );


        /* -------------------------------------------------
           LOCATION
        ------------------------------------------------- */

        setText(
            "locationTitle",
            data.locationTitle
        );


        /* -------------------------------------------------
           RSVP
        ------------------------------------------------- */

        setText(
            "rsvpTitle",
            data.rsvpTitle
        );


        setText(
            "rsvpText",
            data.rsvpText
        );


        setText(
            "rsvpButton",
            data.rsvpButton
        );


        /* -------------------------------------------------
           FOOTER
        ------------------------------------------------- */

        setText(
            "footerText",
            data.footerText
        );


        /* -------------------------------------------------
           SAVE LANGUAGE
        ------------------------------------------------- */

        localStorage.setItem(
            "weddingLanguage",
            language
        );


        /* -------------------------------------------------
           HIDE SPLASH SCREEN
        ------------------------------------------------- */

        const splash =
            document.getElementById(
                "splashScreen"
            );


        if (splash) {

            splash.style.display =
                "none";

        }


        /* -------------------------------------------------
           SHOW MAIN CONTENT
        ------------------------------------------------- */

        const main =
            document.getElementById(
                "mainContent"
            );


        if (main) {

            main.style.display =
                "block";

        }


        /* -------------------------------------------------
           SCROLL TOP
        ------------------------------------------------- */

        window.scrollTo({
            top: 0,
            behavior: "instant"
        });


        console.log(
            "Language successfully changed to:",
            language
        );

    }


    catch (error) {

        console.error(
            "Language loading error:",
            error
        );


        alert(
            "Language file could not be loaded.\n\n" +
            "Please check that:\n" +
            "lang/" + language + ".json exists."
        );

    }

}



/* =====================================================
   SAFE TEXT FUNCTION
===================================================== */

function setText(
    elementId,
    text
) {

    const element =
        document.getElementById(
            elementId
        );


    if (!element) {

        console.warn(
            "Element not found:",
            elementId
        );

        return;

    }


    element.textContent =
        text ?? "";

}



/* =====================================================
   COUNTDOWN
===================================================== */


/*
    WEDDING DATE

    2 November 2026
    9:00 AM

    Sri Lanka time:
    Asia/Colombo
*/


const weddingDate =
    new Date(
        "November 2, 2026 10:05:00 GMT+0530"
    ).getTime();



/* =====================================================
   GOOGLE CALENDAR LINK
===================================================== */

/*
    Formats a JS Date into the UTC format Google
    Calendar expects: YYYYMMDDTHHMMSSZ
*/

function formatDateForGoogle(date) {

    const pad =
        function (num) {

            return String(num).padStart(2, "0");

        };


    return (
        date.getUTCFullYear() +
        pad(date.getUTCMonth() + 1) +
        pad(date.getUTCDate()) +
        "T" +
        pad(date.getUTCHours()) +
        pad(date.getUTCMinutes()) +
        pad(date.getUTCSeconds()) +
        "Z"
    );

}



function buildGoogleCalendarUrl() {

    const startDate =
        new Date(weddingDate);


    /*
        Event covers the Poruwa ceremony through
        the reception. Adjust the hours below if
        your day runs longer or shorter.
    */

    const endDate =
        new Date(
            weddingDate +
            (12 * 60 * 60 * 1000)
        );


    const startFormatted =
        formatDateForGoogle(startDate);


    const endFormatted =
        formatDateForGoogle(endDate);


    const title =
        "Hansika & Janidu's Wedding";


    const details =
        "Join us as we celebrate our Poruwa Ceremony and Wedding Reception.";


    const location =
        "Banquet Hall, Hotel Grand Guardian, Kuruwita, Sri Lanka";


    const url =
        "https://calendar.google.com/calendar/render" +
        "?action=TEMPLATE" +
        "&text=" + encodeURIComponent(title) +
        "&dates=" + startFormatted + "/" + endFormatted +
        "&details=" + encodeURIComponent(details) +
        "&location=" + encodeURIComponent(location);


    return url;

}



function updateCountdown() {

    const now =
        new Date().getTime();


    const difference =
        weddingDate - now;


    const daysElement =
        document.getElementById("days");


    const hoursElement =
        document.getElementById("hours");


    const minutesElement =
        document.getElementById("minutes");


    const secondsElement =
        document.getElementById("seconds");


    if (
        !daysElement ||
        !hoursElement ||
        !minutesElement ||
        !secondsElement
    ) {

        return;

    }


    /* Wedding date reached */

    if (difference <= 0) {

        daysElement.textContent =
            "00";

        hoursElement.textContent =
            "00";

        minutesElement.textContent =
            "00";

        secondsElement.textContent =
            "00";

        return;

    }


    const days =
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        );


    const hours =
        Math.floor(
            (
                difference %
                (1000 * 60 * 60 * 24)
            ) /
            (1000 * 60 * 60)
        );


    const minutes =
        Math.floor(
            (
                difference %
                (1000 * 60 * 60)
            ) /
            (1000 * 60)
        );


    const seconds =
        Math.floor(
            (
                difference %
                (1000 * 60)
            ) /
            1000
        );


    daysElement.textContent =
        String(days).padStart(2, "0");


    hoursElement.textContent =
        String(hours).padStart(2, "0");


    minutesElement.textContent =
        String(minutes).padStart(2, "0");


    secondsElement.textContent =
        String(seconds).padStart(2, "0");

}



/* =====================================================
   MUSIC
===================================================== */

function startMusic() {

    const music =
        document.getElementById(
            "weddingMusic"
        );


    if (!music) {

        return;

    }


    /* Already playing, nothing to do */

    if (!music.paused) {

        return;

    }


    music.volume = 0.5;


    music.play()
        .then(function () {

            updateMusicButton(
                true
            );

        })
        .catch(function (error) {

            console.log(
                "Music autoplay blocked:",
                error
            );

            updateMusicButton(
                false
            );

        });

}



function toggleMusic() {

    const music =
        document.getElementById(
            "weddingMusic"
        );


    if (!music) {

        return;

    }


    if (music.paused) {

        music.play()
            .then(function () {

                updateMusicButton(
                    true
                );

            })
            .catch(function (error) {

                console.log(
                    "Could not play music:",
                    error
                );

            });

    }

    else {

        music.pause();

        updateMusicButton(
            false
        );

    }

}



function updateMusicButton(
    isPlaying
) {

    const button =
        document.getElementById(
            "musicButton"
        );


    if (!button) {

        return;

    }


    button.textContent =
        isPlaying
            ? "⏸️"
            : "🎵";

}



/* =====================================================
   JASMINE PETALS
===================================================== */

/* =====================================================
   GALLERY AUTO SLIDESHOW
===================================================== */

function initGalleryAutoSlide() {

    const gallery =
        document.querySelector(".gallery");


    if (!gallery) {

        return;

    }


    /* Pixels moved per frame - lower is slower/smoother */

    const scrollSpeed = 0.6;


    let isPaused = false;

    let resumeTimeout = null;


    function step() {

        if (!isPaused) {

            gallery.scrollLeft += scrollSpeed;


            /*
                Loop seamlessly back to the start once
                we reach the end of the scrollable area
            */

            const maxScroll =
                gallery.scrollWidth -
                gallery.clientWidth;


            if (gallery.scrollLeft >= maxScroll - 1) {

                gallery.scrollLeft = 0;

            }

        }


        requestAnimationFrame(step);

    }


    requestAnimationFrame(step);


    /* -------------------------------------------------
       PAUSE ON USER INTERACTION

       Pauses the auto-slide while the person is
       browsing manually (mouse, touch, or scroll),
       and resumes a couple seconds after they stop.
    ------------------------------------------------- */

    function pauseAutoSlide() {

        isPaused = true;


        if (resumeTimeout) {

            clearTimeout(resumeTimeout);

        }


        resumeTimeout =
            setTimeout(
                function () {

                    isPaused = false;

                },
                2500
            );

    }


    gallery.addEventListener(
        "mouseenter",
        pauseAutoSlide
    );


    gallery.addEventListener(
        "touchstart",
        pauseAutoSlide,
        { passive: true }
    );


    gallery.addEventListener(
        "wheel",
        pauseAutoSlide,
        { passive: true }
    );


    gallery.addEventListener(
        "pointerdown",
        pauseAutoSlide
    );

}



/* =====================================================
   JASMINE PETALS
===================================================== */

function createPetals() {

    const container =
        document.getElementById(
            "petals"
        );


    if (!container) {

        return;

    }


    /* Prevent duplicate petals */

    container.innerHTML = "";


    const petalCount = 30;


    for (
        let i = 0;
        i < petalCount;
        i++
    ) {

        const petal =
            document.createElement(
                "div"
            );


        petal.className =
            "petal";


        /* Random horizontal position */

        petal.style.left =
            Math.random() *
            100 +
            "vw";


        /* Random falling speed */

        petal.style.animationDuration =
            8 +
            Math.random() * 10 +
            "s";


        /* Random delay */

        petal.style.animationDelay =
            Math.random() * 10 +
            "s";


        /* Random size */

        const size =
            15 +
            Math.random() * 20;


        petal.style.width =
            size + "px";


        petal.style.height =
            size + "px";


        container.appendChild(
            petal
        );

    }

}



/* =====================================================
   GALLERY AUTO SCROLL

   The gallery itself scrolls via a pure CSS animation
   (see .galleryTrack in style.css) since that is far
   smoother and more reliable on mobile than JS-driven
   scrollLeft updates. This function only handles
   pausing that animation on touch, so a manual swipe
   isn't fighting the auto-scroll.
===================================================== */

function startGalleryAutoScroll() {

    const track =
        document.querySelector(".galleryTrack");


    if (!track) {

        return;

    }


    let resumeTimer = null;


    track.addEventListener(
        "touchstart",
        function () {

            track.classList.add("isPaused");


            if (resumeTimer) {

                clearTimeout(resumeTimer);

            }

        },
        { passive: true }
    );


    track.addEventListener(
        "touchend",
        function () {

            /*
                Give the user a moment after they lift
                their finger before auto scroll resumes,
                so it doesn't fight a manual swipe.
            */

            resumeTimer =
                setTimeout(
                    function () {

                        track.classList.remove("isPaused");

                    },
                    1500
                );

        },
        { passive: true }
    );

}



/* =====================================================
   RSVP BUTTON
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const rsvpButton =
            document.getElementById(
                "rsvpButton"
            );


        if (rsvpButton) {

            rsvpButton.addEventListener(
                "click",
                function () {

                    const rsvpUrl =
                        "https://docs.google.com/forms/d/e/1FAIpQLSf23Wvn4I6KOgdOyFC0S2P9Llb2xaiAlMv9MppUhLpTFV1p2Q/viewform";


                    window.open(
                        rsvpUrl,
                        "_blank"
                    );

                }
            );

        }

    }
);


/* =====================================================
   BACK TO SPLASH SCREEN
===================================================== */

function backToSplashScreen() {

    const splash =
        document.getElementById(
            "splashScreen"
        );


    const main =
        document.getElementById(
            "mainContent"
        );


    if (splash) {

        splash.style.display =
            "flex";

    }


    if (main) {

        main.style.display =
            "none";

    }


    window.scrollTo({
        top: 0,
        behavior: "instant"
    });

}