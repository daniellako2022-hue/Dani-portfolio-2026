(function ($) {
  "use strict";

  AOS.init({
    duration: 800,
    easing: "slide",
  });

  $(window).stellar({
    responsive: true,
    parallaxBackgrounds: true,
    parallaxElements: true,
    horizontalScrolling: false,
    hideDistantElements: false,
    scrollProperty: "scroll",
  });

  var fullHeight = function () {
    $(".js-fullheight").css("height", $(window).height());
    $(window).resize(function () {
      $(".js-fullheight").css("height", $(window).height());
    });
  };
  fullHeight();

  // loader
  var loader = function () {
    $(window).on("load", function () {
      if ($("#ftco-loader").length > 0) {
        $("#ftco-loader").removeClass("show");
      }
    });
  };
  loader();

  // Scrollax
  $.Scrollax();

  // Burger Menu
  var burgerMenu = function () {
    $("body").on("click", ".js-fh5co-nav-toggle", function (event) {
      event.preventDefault();

      if ($("#ftco-nav").is(":visible")) {
        $(this).removeClass("active");
      } else {
        $(this).addClass("active");
      }
    });
  };
  burgerMenu();

  var onePageClick = function () {
    $(document).on("click", '#ftco-nav a[href^="#"]', function (event) {
      var href = $(this).attr("href");
      if (href !== "#" && $(href).length) {
        event.preventDefault();
        $("html, body").animate(
          {
            scrollTop: $(href).offset().top - 70,
          },
          500,
        );
      }
    });
  };

  onePageClick();

  var carousel = function () {
    $(".home-slider").owlCarousel({
      loop: true,
      autoplay: true,
      lazyLoad: true, // Enable lazy loading for Owl Carousel
      margin: 0,
      animateOut: "fadeOut",
      animateIn: "fadeIn",
      nav: false,
      autoplayHoverPause: false,
      items: 1,
      navText: [
        "<span class='ion-md-arrow-back'></span>",
        "<span class='ion-chevron-right'></span>",
      ],
      responsive: {
        0: {
          items: 1,
        },
        600: {
          items: 1,
        },
        1000: {
          items: 1,
        },
      },
    });
  };
  carousel();

  $("nav .dropdown").hover(
    function () {
      var $this = $(this);
      // 	 timer;
      // clearTimeout(timer);
      $this.addClass("show");
      $this.find("> a").attr("aria-expanded", true);
      // $this.find('.dropdown-menu').addClass('animated-fast fadeInUp show');
      $this.find(".dropdown-menu").addClass("show");
    },
    function () {
      var $this = $(this);
      // timer;
      // timer = setTimeout(function(){
      $this.removeClass("show");
      $this.find("> a").attr("aria-expanded", false);
      // $this.find('.dropdown-menu').removeClass('animated-fast fadeInUp show');
      $this.find(".dropdown-menu").removeClass("show");
      // }, 100);
    },
  );

  // scroll
  var scrollWindow = function () {
    $(window).scroll(function () {
      var $w = $(this),
        st = $w.scrollTop(),
        navbar = $(".ftco_navbar"),
        sd = $(".js-scroll-wrap");

      if (st > 150) {
        if (!navbar.hasClass("scrolled")) {
          navbar.addClass("scrolled");
        }
      }
      if (st < 150) {
        if (navbar.hasClass("scrolled")) {
          navbar.removeClass("scrolled sleep");
        }
      }
      if (st > 350) {
        if (!navbar.hasClass("awake")) {
          navbar.addClass("awake");
        }

        if (sd.length > 0) {
          sd.addClass("sleep");
        }
      }
      if (st < 350) {
        if (navbar.hasClass("awake")) {
          navbar.removeClass("awake");
          navbar.addClass("sleep");
        }
        if (sd.length > 0) {
          sd.removeClass("sleep");
        }
      }
    });
  };
  scrollWindow();

  var counter = function () {
    $("#section-counter, .hero-wrap, .ftco-counter, .ftco-about").waypoint(
      function (direction) {
        if (
          direction === "down" &&
          !$(this.element).hasClass("ftco-animated")
        ) {
          var comma_separator_number_step =
            $.animateNumber.numberStepFactories.separator(",");
          $(".number").each(function () {
            var $this = $(this),
              num = $this.data("number");
            console.log(num);
            $this.animateNumber(
              {
                number: num,
                numberStep: comma_separator_number_step,
              },
              7000,
            );
          });
        }
      },
      { offset: "95%" },
    );
  };
  counter();

  var contentWayPoint = function () {
    var i = 0;
    $(".ftco-animate").waypoint(
      function (direction) {
        if (
          direction === "down" &&
          !$(this.element).hasClass("ftco-animated")
        ) {
          i++;

          $(this.element).addClass("item-animate");
          setTimeout(function () {
            $("body .ftco-animate.item-animate").each(function (k) {
              var el = $(this);
              setTimeout(
                function () {
                  var effect = el.data("animate-effect");
                  if (effect === "fadeIn") {
                    el.addClass("fadeIn ftco-animated");
                  } else if (effect === "fadeInLeft") {
                    el.addClass("fadeInLeft ftco-animated");
                  } else if (effect === "fadeInRight") {
                    el.addClass("fadeInRight ftco-animated");
                  } else {
                    el.addClass("fadeInUp ftco-animated");
                  }
                  el.removeClass("item-animate");
                },
                k * 50,
                "easeInOutExpo",
              );
            });
          }, 100);
        }
      },
      { offset: "95%" },
    );
  };
  contentWayPoint();

  // magnific popup
  $(".image-popup").magnificPopup({
    type: "image",
    closeOnContentClick: true,
    closeBtnInside: false,
    fixedContentPos: true,
    mainClass: "mfp-no-margins mfp-with-zoom", // class to remove default margin from left and right side
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0, 1], // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      verticalFit: true,
    },
    zoom: {
      enabled: true,
      duration: 300, // don't foget to change the duration also in CSS
    },
  });

  $(".popup-youtube, .popup-vimeo, .popup-gmaps").magnificPopup({
    disableOn: 700,
    type: "iframe",
    mainClass: "mfp-fade",
    removalDelay: 160,
    preloader: false,

    fixedContentPos: false,
  });
})(jQuery);

// Custom lazy loading for background images outside Owl Carousel
$(document).ready(function () {
  var lazyBackgrounds = $(".lazy-background");

  function getResponsiveSrc(element) {
    var viewportWidth =
      window.innerWidth || document.documentElement.clientWidth;
    // Define your breakpoints and corresponding data attributes
    if (viewportWidth < 768 && element.data("src-small")) {
      return element.data("src-small");
    } else if (
      viewportWidth >= 768 &&
      viewportWidth < 1200 &&
      element.data("src-medium")
    ) {
      return element.data("src-medium");
    } else if (element.data("src-large")) {
      // Optional: for very large screens
      return element.data("src-large");
    }
    return element.data("src"); // Fallback to default data-src
  }

  function lazyLoadBackgrounds() {
    lazyBackgrounds.each(function () {
      var $this = $(this);
      // Check if the background has already been loaded or is not yet in viewport
      if (
        !$this.hasClass("background-loaded") &&
        isElementInViewport($this[0])
      ) {
        var imageUrl = getResponsiveSrc($this);
        if (imageUrl) {
          $this.css("background-image", "url(" + imageUrl + ")");
          $this.addClass("background-loaded"); // Mark as loaded
          $this.removeAttr(
            "data-src data-src-small data-src-medium data-src-large",
          ); // Remove data attributes to prevent re-processing
        }
      }
    });
  }

  function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  $(window).on("scroll resize", lazyLoadBackgrounds);
  lazyLoadBackgrounds(); // Initial check on load
});
