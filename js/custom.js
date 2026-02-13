(function () {

    "use strict";

        window.addEventListener('load', function(){
          const preloader = document.querySelector('.preloader');
          if (preloader) {
            setTimeout(() => preloader.style.display = 'none', 500);
          }
        });

        // Bootstrap 5 - chiudere navbar al click sui link (versione semplificata)
        setTimeout(function() {
          const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
          navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
              const navbarCollapse = document.querySelector('.navbar-collapse');
              if (navbarCollapse?.classList.contains('show')) {
                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                if (bsCollapse) {
                  bsCollapse.hide();
                }
              }
            });
          });
        }, 500);

        window.addEventListener('scroll', function() {
          const navbar = document.querySelector(".navbar");
          if (navbar && navbar.getBoundingClientRect().top > 50) {
            document.querySelector(".fixed-top").classList.add("top-nav-collapse");
          } else {
            document.querySelector(".fixed-top").classList.remove("top-nav-collapse");
          }
        });

        function initParallax() {
            const parallaxElements = document.querySelectorAll('[data-parallax]');
            const parallaxEffect = () => {
                parallaxElements.forEach(element => {
                    const speed = Number.parseFloat(element.dataset.parallaxSpeed) || 0.5;
                    const offset = window.pageYOffset * speed;
                    element.style.transform = `translateY(${offset}px)`;
                });
            };
            window.addEventListener('scroll', parallaxEffect);
        }
        initParallax();

        // Smooth scroll with easing for navigation links
        function smoothScrollTo(targetPosition, duration = 800) {
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            let startTime = null;

            function animation(currentTime) {
                if (startTime === null) startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                const progress = Math.min(timeElapsed / duration, 1);
                
                // Easing function (ease-in-out)
                const ease = progress < 0.5 
                    ? 4 * progress * progress * progress 
                    : 1 - Math.pow(-2 * progress + 2, 3) / 2;
                
                window.scrollTo(0, startPosition + distance * ease);
                
                if (timeElapsed < duration) {
                    requestAnimationFrame(animation);
                }
            }

            requestAnimationFrame(animation);
        }

        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#' || targetId === '') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    
                    const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
                    const targetPosition = targetElement.offsetTop - navbarHeight;
                    
                    smoothScrollTo(targetPosition);
                }
            });
        });

        // Initialize Bootstrap carousel for technical skills
        const owl = document.querySelector("#owl-team");
        if (owl && typeof bootstrap !== 'undefined' && bootstrap.Carousel) {
            bootstrap.Carousel.getOrCreateInstance(owl, {
                interval: 6000,
                ride: 'carousel',
                pause: 'hover',
                wrap: true
            });
        }

})();