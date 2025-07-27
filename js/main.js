// QA Portfolio Specific JavaScript

// Document ready function - consolidating all jQuery code
$(document).ready(function () {

    // Set background images for elements with data-setbg attribute
    $('.set-bg').each(function () {
        var bg = $(this).data('setbg');
        if (bg) {
            $(this).css('background-image', 'url(' + bg + ')');
        }
    });

    // Portfolio filtering animation
    $('.portfolio__filter li').click(function () {
        $(this).addClass('active').siblings().removeClass('active');
    });

    // Skills progress animation
    function animateSkills() {
        $('.skills__item').each(function () {
            if ($(this).hasClass('animate')) return;

            var elementTop = $(this).offset().top;
            var elementBottom = elementTop + $(this).outerHeight();
            var viewportTop = $(window).scrollTop();
            var viewportBottom = viewportTop + $(window).height();

            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                $(this).addClass('animate');
                $(this).find('li').each(function (index) {
                    $(this).delay(index * 100).animate({
                        opacity: 1,
                        marginLeft: 0
                    }, 500);
                });
            }
        });
    }

    // Fixed Progress Bar Animation for Testing Tools Section
    function animateProficiencyBars() {
        $('.tool__category').each(function () {
            if ($(this).hasClass('animated')) return;

            var elementTop = $(this).offset().top;
            var elementBottom = elementTop + $(this).outerHeight();
            var viewportTop = $(window).scrollTop();
            var viewportBottom = viewportTop + $(window).height();

            if (elementBottom > viewportTop && elementTop < (viewportBottom - 100)) {
                $(this).addClass('animated');

                $(this).find('.proficiency__bar').each(function (index) {
                    var $bar = $(this);
                    var targetWidth = $bar.data('width');

                    setTimeout(function () {
                        $bar.animate({
                            width: targetWidth
                        }, {
                            duration: 2000,
                            easing: 'swing',
                            complete: function () {
                                $bar.addClass('animation-complete');
                            }
                        });
                    }, index * 200);
                });
            }
        });
    }

    // Manual trigger for testing (hover effect)
    $('.tool__category').on('mouseenter', function () {
        if (!$(this).hasClass('animated')) {
            $(this).addClass('animated');
            $(this).find('.proficiency__bar').each(function () {
                var targetWidth = $(this).data('width');
                $(this).animate({
                    width: targetWidth
                }, 2000);
            });
        }
    });

    // Contact form validation
    $('.contact__form form').submit(function (e) {
        e.preventDefault();

        var name = $(this).find('input[placeholder="Your Name"]').val();
        var email = $(this).find('input[placeholder="Your Email"]').val();
        var message = $(this).find('textarea').val();

        if (!name || !email || !message) {
            alert('Please fill in all required fields.');
            return false;
        }

        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return false;
        }

        alert('Thank you for your message! I will get back to you within 24 hours.');
        $(this)[0].reset();
    });

    // Blog newsletter subscription
    $('.blog__sidebar form').submit(function (e) {
        e.preventDefault();
        var email = $(this).find('input[type="email"]').val();

        if (!email) {
            alert('Please enter your email address.');
            return false;
        }

        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return false;
        }

        alert('Thank you for subscribing to my QA newsletter!');
        $(this)[0].reset();
    });

    // Animate counters on scroll
    function animateCounters() {
        $('.counter__item').each(function () {
            if ($(this).hasClass('animated')) return;

            var elementTop = $(this).offset().top;
            var elementBottom = elementTop + $(this).outerHeight();
            var viewportTop = $(window).scrollTop();
            var viewportBottom = viewportTop + $(window).height();

            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                $(this).addClass('animated');
                var target = parseInt($(this).find('.cn_num').text());
                var $counter = $(this).find('.cn_num');

                $counter.text('0');
                $counter.animate({
                    counter: target
                }, {
                    duration: 2000,
                    step: function (now) {
                        $counter.text(Math.ceil(now));
                    }
                });
            }
        });
    }

    // Resume download functionality
    $('.resume-btn, a[href*="resume"]').click(function (e) {
        e.preventDefault();

        var link = document.createElement('a');
        link.href = 'assets/Siddhesh_Govalkar_QA_Engineer_Resume.pdf';
        link.download = 'Siddhesh_Govalkar_QA_Engineer_Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        if (typeof gtag !== 'undefined') {
            gtag('event', 'download', {
                'event_category': 'Resume',
                'event_label': 'QA Resume Download'
            });
        }
    });

    // Copy to clipboard functionality for code blocks
    $('pre code').each(function () {
        var code = $(this);
        var copyBtn = $('<button class="copy-btn">Copy</button>');
        code.parent().prepend(copyBtn);

        copyBtn.click(function () {
            var text = code.text();
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(text).then(function () {
                    copyBtn.text('Copied!');
                    setTimeout(function () {
                        copyBtn.text('Copy');
                    }, 2000);
                });
            } else {
                var textarea = document.createElement('textarea');
                textarea.value = text;
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);
                copyBtn.text('Copied!');
                setTimeout(function () {
                    copyBtn.text('Copy');
                }, 2000);
            }
        });
    });

    // Smooth scrolling for anchor links
    $('a[href^="#"]').on('click', function (e) {
        e.preventDefault();
        var target = this.hash;
        var $target = $(target);

        if ($target.length) {
            $('html, body').animate({
                'scrollTop': $target.offset().top - 100
            }, 1000, 'swing');
        }
    });

    // Mobile menu toggle
    $('.mobile-menu').slicknav({
        prependTo: '#mobile-menu-wrap',
        allowParentLinks: true
    });

    // Trigger animations on scroll
    $(window).scroll(function () {
        animateSkills();
        animateCounters();
        animateProficiencyBars();
    });

    // Trigger animations on page load
    animateSkills();
    animateCounters();
    animateProficiencyBars();

    // Portfolio isotope initialization
    if ($('.portfolio__gallery').length) {
        var $container = $('.portfolio__gallery');
        $container.isotope({
            itemSelector: '.portfolio__item',
            layoutMode: 'fitRows'
        });

        $('.portfolio__filter li').on('click', function () {
            var filterValue = $(this).attr('data-filter');
            $container.isotope({ filter: filterValue });
        });
    }

    // Magnific popup for portfolio items
    $('.video-popup').magnificPopup({
        type: 'iframe'
    });

    $('.image-popup').magnificPopup({
        type: 'image',
        gallery: {
            enabled: true
        }
    });

});

// Mobile Menu Initialization - Fixed
$(document).ready(function () {
    $('.header__nav__menu').slicknav({
        prependTo: '#mobile-menu-wrap',
        allowParentLinks: true,
        closeOnClick: true,
        label: 'Menu',
        duplicate: true
    });

    $(window).scroll(function () {
        if ($(this).scrollTop() > 50) {
            $('.header').addClass('scrolled');
        } else {
            $('.header').removeClass('scrolled');
        }
    });
});

// Enhanced Typing Effect
$(document).ready(function () {
    function typeWriter() {
        const typingElement = document.querySelector('.typing-text');
        if (!typingElement) return;

        const texts = typingElement.getAttribute('data-text').split(',');
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let currentText = '';

        function type() {
            const fullText = texts[textIndex];

            if (isDeleting) {
                currentText = fullText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                currentText = fullText.substring(0, charIndex + 1);
                charIndex++;
            }

            typingElement.textContent = currentText;

            let typeSpeed = isDeleting ? 100 : 150;

            if (!isDeleting && charIndex === fullText.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typeSpeed = 500;
            }

            setTimeout(type, typeSpeed);
        }

        type();
    }

    setTimeout(typeWriter, 1500);
});


// Futuristic Tech Effects
$(document).ready(function () {
    // Matrix-style text effect for hero section
    function matrixEffect() {
        const canvas = document.createElement('canvas');
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.zIndex = '-2';
        canvas.style.opacity = '0.1';
        document.body.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const matrix = "QAENGINEERAUTOMATIONTESTINGPERFORMANCEAPI01";
        const letters = matrix.split("");
        const fontSize = 14;
        const columns = canvas.width / fontSize;
        const drops = [];

        for (let x = 0; x < columns; x++) {
            drops[x] = 1;
        }

        function draw() {
            ctx.fillStyle = 'rgba(10, 10, 15, 0.04)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#00d4ff';
            ctx.font = fontSize + 'px Orbitron';

            for (let i = 0; i < drops.length; i++) {
                const text = letters[Math.floor(Math.random() * letters.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }

        setInterval(draw, 35);
    }

    // Initialize matrix effect
    matrixEffect();

    // Enhanced Custom Cursor with Trail Effect
    const CustomCursor = {
        delay: 8,
        _x: 0,
        _y: 0,
        endX: window.innerWidth / 2,
        endY: window.innerHeight / 2,
        cursorVisible: true,
        cursorEnlarged: false,
        isClicking: false, // Added click state tracking
        $dot: null,
        $outline: null,

        init: function () {
            if (window.innerWidth <= 768) return;

            $('body').css('cursor', 'none');
            $('a, button, .clickable').css('cursor', 'none');

            this.createCursorElements();
            this.setupEventListeners();
            this.animateCursor();
        },

        createCursorElements: function () {
            $('.cursor-dot, .cursor-dot-outline').remove();

            this.$dot = $('<div class="cursor-dot"></div>');
            this.$dot.css({
                position: 'fixed',
                top: '0',
                left: '0',
                width: '8px',
                height: '8px',
                background: 'var(--primary-blue)',
                borderRadius: '50%',
                pointerEvents: 'none',
                zIndex: '9999',
                boxShadow: '0 0 10px var(--primary-blue), 0 0 20px var(--primary-blue)',
                transition: 'all 0.1s ease-out', // Changed to 'all' for smoother transitions
                opacity: '0'
            });

            this.$outline = $('<div class="cursor-dot-outline"></div>');
            this.$outline.css({
                position: 'fixed',
                top: '0',
                left: '0',
                width: '40px',
                height: '40px',
                border: '2px solid rgba(0, 212, 255, 0.5)',
                borderRadius: '50%',
                pointerEvents: 'none',
                zIndex: '9998',
                transition: 'all 0.1s ease-out', // Faster transition for click responsiveness
                opacity: '0'
            });

            $('body').append(this.$dot).append(this.$outline);
        },

        createTrail: function (x, y) {
            if (Math.random() > 0.7) {
                const trail = $('<div class="cursor-trail"></div>');
                trail.css({
                    position: 'fixed',
                    left: x - 2 + 'px',
                    top: y - 2 + 'px',
                    width: '4px',
                    height: '4px',
                    background: 'var(--primary-blue)',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: '9997',
                    opacity: '0.7'
                });
                $('body').append(trail);

                setTimeout(() => trail.remove(), 500);
            }
        },

        setupEventListeners: function () {
            const self = this;

            $(document).on('mousemove', function (e) {
                self.cursorVisible = true;
                self.endX = e.clientX;
                self.endY = e.clientY;
                self.$dot.css('opacity', '1');
                self.$outline.css('opacity', '1');

                // Create trail effect
                self.createTrail(e.clientX, e.clientY);
            });

            $(document).on('mouseenter', function () {
                self.cursorVisible = true;
                self.$dot.css('opacity', '1');
                self.$outline.css('opacity', '1');
            });

            $(document).on('mouseleave', function () {
                self.cursorVisible = false;
                self.$dot.css('opacity', '0');
                self.$outline.css('opacity', '0');
            });

            // Hover effects for interactive elements
            $('a, button, .btn-primary, .btn-secondary, .services__item, .tool__category, .counter__item').on({
                mouseenter: function () {
                    if (!self.isClicking) { // Only apply hover effects if not clicking
                        self.cursorEnlarged = true;
                        self.$dot.css({
                            width: '12px',
                            height: '12px',
                            background: '#00d4ff',
                            boxShadow: '0 0 15px #00d4ff, 0 0 30px #00d4ff'
                        });
                        self.$outline.css({
                            width: '50px',
                            height: '50px',
                            borderColor: '#00d4ff',
                            borderWidth: '3px'
                        });
                    }
                },
                mouseleave: function () {
                    if (!self.isClicking) { // Only reset if not clicking
                        self.cursorEnlarged = false;
                        self.$dot.css({
                            width: '8px',
                            height: '8px',
                            background: 'var(--primary-blue)',
                            boxShadow: '0 0 10px var(--primary-blue), 0 0 20px var(--primary-blue)'
                        });
                        self.$outline.css({
                            width: '40px',
                            height: '40px',
                            borderColor: 'rgba(0, 212, 255, 0.5)',
                            borderWidth: '2px'
                        });
                    }
                }
            });

            // Special hover effects for logos
            $('.timeline-logo, .header__logo').on({
                mouseenter: function () {
                    if (!self.isClicking) {
                        self.$dot.css({
                            background: '#00d4ff',
                            boxShadow: '0 0 15px #00d4ff, 0 0 30px #00d4ff'
                        });
                        self.$outline.css({
                            borderColor: '#00d4ff'
                        });
                    }
                },
                mouseleave: function () {
                    if (!self.isClicking) {
                        self.$dot.css({
                            background: 'var(--primary-blue)',
                            boxShadow: '0 0 10px var(--primary-blue), 0 0 20px var(--primary-blue)'
                        });
                        self.$outline.css({
                            borderColor: 'rgba(0, 212, 255, 0.5)'
                        });
                    }
                }
            });

            // Fixed Click Effects - No transform conflicts
            $(document).on('mousedown', function () {
                self.isClicking = true;

                // Use width/height instead of transform scale to avoid conflicts
                self.$dot.css({
                    width: '4px',
                    height: '4px',
                    background: '#ffffff',
                    boxShadow: '0 0 20px #ffffff, 0 0 40px #00d4ff'
                });

                self.$outline.css({
                    width: '30px',
                    height: '30px',
                    borderColor: '#ffffff',
                    borderWidth: '4px'
                });
            });

            $(document).on('mouseup', function () {
                self.isClicking = false;

                // Reset to normal state
                setTimeout(function () {
                    if (self.cursorEnlarged) {
                        // Reset to hover state if still hovering
                        self.$dot.css({
                            width: '12px',
                            height: '12px',
                            background: '#00d4ff',
                            boxShadow: '0 0 15px #00d4ff, 0 0 30px #00d4ff'
                        });
                        self.$outline.css({
                            width: '50px',
                            height: '50px',
                            borderColor: '#00d4ff',
                            borderWidth: '3px'
                        });
                    } else {
                        // Reset to normal state
                        self.$dot.css({
                            width: '8px',
                            height: '8px',
                            background: 'var(--primary-blue)',
                            boxShadow: '0 0 10px var(--primary-blue), 0 0 20px var(--primary-blue)'
                        });
                        self.$outline.css({
                            width: '40px',
                            height: '40px',
                            borderColor: 'rgba(0, 212, 255, 0.5)',
                            borderWidth: '2px'
                        });
                    }
                }, 50); // Small delay to prevent conflicts
            });
        },

        animateCursor: function () {
            const self = this;

            function animate() {
                // Smooth following effect for outline
                self._x += (self.endX - self._x) / self.delay;
                self._y += (self.endY - self._y) / self.delay;

                // Calculate positions based on current sizes
                const dotSize = parseInt(self.$dot.css('width')) / 2;
                const outlineSize = parseInt(self.$outline.css('width')) / 2;

                // Update positions without interfering with size changes
                self.$outline.css({
                    left: (self._x - outlineSize) + 'px',
                    top: (self._y - outlineSize) + 'px'
                });

                self.$dot.css({
                    left: (self.endX - dotSize) + 'px',
                    top: (self.endY - dotSize) + 'px'
                });

                requestAnimationFrame(animate);
            }

            animate();
        }
    };

    // Initialize custom cursor
    CustomCursor.init();

    $(window).on('resize', function () {
        if (window.innerWidth <= 768) {
            $('.cursor-dot, .cursor-dot-outline').remove();
            $('body').css('cursor', 'auto');
        } else {
            CustomCursor.init();
        }
    });
});

// Device Detection & Redirect for coming soon on tablet and mobile
(function () {
    const tabletBreakpoint = 1024;  // tablet max width (change if needed)

    function redirectToSoon() {
        const screenWidth = window.innerWidth;

        if (screenWidth <= tabletBreakpoint) {
            // For mobile and tablet, redirect to coming-soon.html if not already there
            if (!window.location.pathname.includes('coming-soon.html')) {
                window.location.href = 'coming-soon.html';
            }
        } else {
            // For desktop (> tabletBreakpoint), do nothing (allow access)
        }
    }

    // Run on initial load
    redirectToSoon();

    // Run on window resize
    window.addEventListener('resize', redirectToSoon);
})();


// Portfolio page Filter 
document.addEventListener('DOMContentLoaded', () => {
    const containerEl = document.querySelector('.portfolio__gallery');
    const mixer = mixitup(containerEl, {
        selectors: {
            target: '.portfolio__item'
        },
        animation: {
            duration: 300
        }
    });

    const filterButtons = document.querySelectorAll('.portfolio__filter button');
    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });
});

// Preloader
$(window).on('load', function () {
    $('#preloder').fadeOut('slow');
});

// Error handling for missing images
$(document).ready(function () {
    $('img').on('error', function () {
        $(this).attr('src', 'img/placeholder.jpg');
    });
});

// Create custom cursor dot
const cursorDot = document.createElement('div');
cursorDot.classList.add('cursor-dot');
document.body.appendChild(cursorDot);

// Follow mouse movement
document.addEventListener('mousemove', (e) => {
  cursorDot.style.left = e.clientX + 'px';
  cursorDot.style.top = e.clientY + 'px';
});

// Custom Cursor Implementation - Single instance
(function() {
    'use strict';
    
    // Remove any existing cursor elements
    const existingCursor = document.querySelector('.cursor-dot');
    if (existingCursor) {
        existingCursor.remove();
    }
    
    // Create new cursor dot
    const cursorDot = document.createElement('div');
    cursorDot.classList.add('cursor-dot');
    document.body.appendChild(cursorDot);

    // Track mouse movement
    document.addEventListener('mousemove', (e) => {
        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px';
    });

    // Interactive elements for pointer transformation
    const pointerSelectors = [
        'button',
        '.neon-btn',
        '.dropdown-selected',
        '.dropdown-option',
        'a[href]',
        '[onclick]',
        'input[type="submit"]',
        'input[type="button"]'
    ];

    // Handle hover states with event delegation
    document.addEventListener('mouseover', (e) => {
        const isInteractive = pointerSelectors.some(selector => 
            e.target.matches(selector) || e.target.closest(selector)
        );
        
        if (isInteractive && !e.target.matches(':disabled')) {
            cursorDot.classList.add('pointer');
            cursorDot.classList.remove('not-allowed');
        } else if (e.target.matches('button:disabled, .neon-btn:disabled')) {
            cursorDot.classList.add('not-allowed');
            cursorDot.classList.remove('pointer');
        }
    });

    document.addEventListener('mouseout', (e) => {
        const isInteractive = pointerSelectors.some(selector => 
            e.target.matches(selector) || e.target.closest(selector)
        );
        
        if (isInteractive) {
            cursorDot.classList.remove('pointer', 'not-allowed');
        }
    });
})();