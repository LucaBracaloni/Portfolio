(function ($) {

    "use strict";

        // PRE LOADER
        $(window).load(function(){
          $('.preloader').delay(500).slideUp('slow'); // set duration in brackets    
        });


        // MENU
        $('.navbar-collapse a').on('click',function(){
          $(".navbar-collapse").collapse('hide');
        });

        $(window).scroll(function() {
          if ($(".navbar").offset().top > 50) {
            $(".navbar-fixed-top").addClass("top-nav-collapse");
              } else {
                $(".navbar-fixed-top").removeClass("top-nav-collapse");
              }
        });


        // PARALLAX JS
        function initParallax() {
          $('#home').parallax("60%", 100);
          $('#about').parallax("100%", 80);
          $('#project').parallax("80%", 60);
          $('#team').parallax("40%", 40);
          $('#contact').parallax("20%", 20);
          }
        initParallax();


        // Owl Carousel
        var owl = $("#owl-team");
        owl.owlCarousel({
            loop: true,
            margin: 20,
            autoplay: true,
            autoplayTimeout: 6000,
            autoplayHoverPause: true,
            responsive: {
                0: {
                    items: 1
                },
                479: {
                    items: 1
                },
                768: {
                    items: 2
                },
                979: {
                    items: 3
                },
                1199: {
                    items: 4
                }
            },
            nav: true,
            dots: true,
            mouseDrag: true,
            touchDrag: true,
            pullDrag: true,
            freeDrag: false
        });

})(jQuery);