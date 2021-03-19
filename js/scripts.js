/*!
    * Start Bootstrap - Grayscale v6.0.3 (https://startbootstrap.com/theme/grayscale)
    * Copyright 2013-2020 Start Bootstrap
    * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-grayscale/blob/master/LICENSE)
    */
    (function ($) {
    "use strict"; // Start of use strict

    // Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
        if (
            location.pathname.replace(/^\//, "") ==
                this.pathname.replace(/^\//, "") &&
            location.hostname == this.hostname
        ) {
            var target = $(this.hash);
            target = target.length
                ? target
                : $("[name=" + this.hash.slice(1) + "]");
            if (target.length) {
                $("html, body").animate(
                    {
                        scrollTop: target.offset().top - 70,
                    },
                    1000,
                    "easeInOutExpo"
                );
                return false;
            }
        }
    });

    // Closes responsive menu when a scroll trigger link is clicked
    $(".js-scroll-trigger").click(function () {
        $(".navbar-collapse").collapse("hide");
    });

    $('#submitCodeForm').on('submit', function() {
        var code = document.getElementById("inputCode").value
        if (code.toUpperCase() === "MTVKOELN") {
                var win = window.open("https://t.me/joinchat/H0NhdnCAyPWmWcY6", '_blank');
                  win.focus();
                return false;
        }
        document.getElementById("inputCode").value = ""
        document.getElementById("inputCode").placeholder = "Bitte gültigen Code eingeben ..."
        return false;
    });

    $('#submitCodeForm1').on('submit', function() {
        var code = document.getElementById("inputCode1").value
        if (code.toUpperCase() === "MTVKOELN") {
                window.location.href = "program1.html";
                return false;
        }
        document.getElementById("inputCode1").value = ""
        document.getElementById("inputCode1").placeholder = "Bitte gültigen Code eingeben ..."
        return false;
    });

    $('#submitCodeForm2').on('submit', function() {
        var code = document.getElementById("inputCode2").value
        if (code.toUpperCase() === "MTVKOELN_APRIL") {
                window.location.href = "program2.html";
                return false;
        }
        document.getElementById("inputCode2").value = ""
        document.getElementById("inputCode2").placeholder = "Bitte gültigen Code eingeben ..."
        return false;
    });

    // Activate scrollspy to add active class to navbar items on scroll
    $("body").scrollspy({
        target: "#mainNav",
        offset: 100,
    });

    // Collapse Navbar
    var navbarCollapse = function () {
        if ($("#mainNav").offset().top > 100) {
            $("#mainNav").addClass("navbar-shrink");
        } else {
            $("#mainNav").removeClass("navbar-shrink");
        }
    };
    // Collapse now if page is not at top
    navbarCollapse();
    // Collapse the navbar when page is scrolled
    $(window).scroll(navbarCollapse);
})(jQuery); // End of use strict
