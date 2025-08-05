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
(function () {
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

// PORTFOLIO PANEL

let scrollPosition = 0;
let currentProject = null;
let currentImageIndex = 0;
let autoScrollInterval = null;

const projects = {
    // CURRENT COMPANY PROJECTS
    1: {
        image: "img/projects/maanch_logo.png",
        title: "Maanch Engagement Tracker",
        date: "Mar 2024 - Present",
        summary: "Capture the full breadth of your stewardship work",
        technologies: ["Analytics Testing", "Dashboard Testing", "Reporting Testing", "Integration Testing", "Performance Testing"],

        description: "Organise your stewardship activities and deliver long-term value to clients, drive positive change in investee companies and mitigate risk with our cloud-based solution.",
        achievements: [
            "Validated analytics accuracy across 15+ engagement metrics",
            "Tested dashboard performance for real-time data visualization",
            "Achieved 40% improvement in report generation speed",
            "Enhanced user experience through comprehensive UI/UX testing"
        ],
        images: [
            "img/projects/maanchlogo.png",
            "img/projects/maanchlogo2.webp",
            "img/projects/maanchlogo3.webp",
            "img/projects/maanchlogo4.webp",
        ]
    },

    2: {
        image: "img/projects/worktops_logo.png",
        title: "House of Worktops",
        date: "Sep 2023 - Nov 2023",
        summary: "UK-based custom worktop design and manufacturing platform specializing in premium kitchen surfaces",
        technologies: ["E-commerce Testing", "Customization Engine", "Material Calculator", "Order Management", "3D Visualization"],

        description: "Testing of specialized manufacturing e-commerce platform offering bespoke worktop solutions with advanced customization tools, material selection, and integrated manufacturing workflow management.",
        achievements: [
            "Validated 3D design customization tools with 95% customer satisfaction",
            "Tested material calculator ensuring 100% pricing accuracy across premium materials",
            "Optimized custom order workflow reducing manufacturing errors by 60%",
            "Enhanced visualization system improving customer decision-making by 45%"
        ],
        images: [
            "img/projects/howlogo.png",
            "img/projects/howlogo2.png",
            "img/projects/howlogo3.png",
            "img/projects/howlogo4.png"
        ]
    },

    3: {
        image: "img/projects/hwgroup_logo.png",
        title: "HWGroup",
        date: "Nov 2023 - Jan 2024",
        summary: "Corporate group management and business intelligence platform",
        technologies: ["Enterprise Testing", "Business Intelligence", "Multi-tenant Architecture", "Financial Reporting", "Dashboard Testing"],

        description: "Testing of comprehensive corporate management system handling multiple business units, complex financial reporting, and business intelligence analytics across organizational hierarchies.",
        achievements: [
            "Validated multi-tenant architecture supporting 100+ business units",
            "Tested financial reporting system ensuring 100% data accuracy across modules",
            "Optimized BI dashboard performance improving load times by 50%",
            "Enhanced cross-departmental workflow integration reducing processing delays by 40%"
        ],
        images: [
            "img/projects/hwgroup_logo.png",
            "img/projects/hwgroup_logo2.png",
            "img/projects/hwgroup_logo3.png",
            "img/projects/hwgroup_logo4.png"
        ]
    },

    4: {
        image: "img/projects/redpack_logo.png",
        title: "Redpack",
        date: "Oct 2023 - Dec 2023",
        summary: "UK-based logistics and package delivery management platform",
        technologies: ["Logistics Platform", "GPS Tracking", "Route Optimization", "Delivery Confirmation", "Real-time Updates"],

        description: "End-to-end testing of comprehensive delivery management system featuring package tracking, route optimization, real-time GPS monitoring, and automated delivery confirmation systems.",
        achievements: [
            "Validated GPS tracking system achieving 99.7% location accuracy",
            "Tested route optimization algorithms reducing delivery time by 35%",
            "Optimized delivery confirmation system achieving 98% success rate",
            "Enhanced real-time tracking reducing customer inquiries by 50%"
        ],
        images: [
            "img/projects/redpack_logo.png",
            "img/projects/redpack_logo2.png",
            "img/projects/redpack_logo3.png",
            "img/projects/redpack_logo4.png"
        ]
    },

    // PREVIOUS COMPANY PROJECT
    5: {
        image: "img/projects/DgNote_Logo.webp",
        title: "DgNote",
        date: "Aug 2023 - Oct 2023",
        summary: "Digital insurance platform specializing in commercial and retail insurance with focus on marine insurance",
        technologies: ["Insurance Platform", "Claims Processing", "Risk Assessment", "API Integration", "Regulatory Compliance"],

        description: "Testing of cutting-edge insurance technology platform offering instant quotes, seamless claims processing, and comprehensive risk management. Platform features 24x7 cloud access, UPI/Net Banking integration, and expert team support for commercial insurance needs.",
        achievements: [
            "Validated instant quote generation system with 99.8% accuracy",
            "Tested claims processing workflow reducing resolution time by 40%",
            "Ensured regulatory compliance across commercial and retail insurance segments",
            "Optimized premium calculation engine achieving lowest market rates"
        ],
        images: [
            "img/projects/DgNote_Logo.webp",
            "img/projects/Dgnote_Logo2.png",
            "img/projects/Dgnote_Logo3.png",
            "img/projects/Dgnote_Logo4.png"
        ]
    },

    // INTERNSHIP COMPANY PROJECTS
    6: {
        image: "img/projects/icici_logo.png",
        title: "ICICI Careers",
        date: "Jun 2023 - Aug 2023",
        summary: "Comprehensive career management platform for one of India's leading banks offering job applications, tracking, and onboarding",
        technologies: ["Enterprise Career Platform", "Mobile App Testing", "Application Tracking", "Onboarding System", "Notification System"],

        description: "Testing of sophisticated career management system handling recruitment for various banking roles including relationship managers, credit managers, and specialized positions. Platform includes iUniverse mobile app with 100K+ downloads for seamless job application experience.",
        achievements: [
            "Validated application processing for 160+ diverse banking job categories",
            "Tested onboarding facilitation system achieving 95% completion rate",
            "Optimized mobile app performance supporting 100K+ downloads",
            "Enhanced notification system ensuring timely candidate communication"
        ],
        images: [
            "img/projects/icici_logo.webp",
            "img/projects/icici_logo2.png",
            "img/projects/icici_logo3.png",
            "img/projects/icici_logo4.png"
        ]
    },

    7: {
        image: "img/projects/bmt_logo.png",
        title: "BookMyTurf",
        date: "Jan 2023 - Present",
        summary: "Cricket and sports facility booking platform connecting ground owners with teams",
        technologies: ["Mobile Testing", "Payment Gateway", "Location-based Testing", "Cross-platform Testing", "Real-time Booking"],

        description: "Comprehensive testing of sports facility booking application enabling cricket teams to book grounds online with real-time availability, transparent pricing, and seamless reservation management. Platform includes team formation, tournament organization, and coaching slot reservations.",
        achievements: [
            "Validated real-time slot availability across 50+ cricket grounds with 99.5% accuracy",
            "Tested booking flow ensuring frictionless experience for 5K+ app downloads",
            "Enhanced cross-platform reliability for time-based booking actions",
            "Optimized payment processing achieving 98% transaction success rate"
        ],
        images: [
            "img/projects/bmt_logo.webp",
            "img/projects/bmt_logo2.png",
            "img/projects/bmt_logo3.png",
            "img/projects/bmt_logo4.png"
        ]
    },

    8: {
        image: "img/projects/hrx_logo.png",
        title: "HRX Brand",
        date: "May 2023 - Sep 2023",
        summary: "Fitness and lifestyle brand by Hrithik Roshan offering sports equipment, nutrition products, and wellness solutions",
        technologies: ["E-commerce Testing", "Fitness App Testing", "Nutrition Platform", "Brand Integration", "Multi-channel Testing"],

        description: "Comprehensive testing of fitness ecosystem combining e-commerce platform with offline stores and nutrition services. Platform integrates with EatFit for healthy food options and maintains presence across multiple retail channels.",
        achievements: [
            "Tested multi-channel integration across online platform and physical stores",
            "Validated nutrition tracking and fitness goal management with 95% accuracy",
            "Optimized product recommendation engine improving customer engagement by 50%",
            "Ensured seamless brand experience across 100+ retail partners nationwide"
        ],
        images: [
            "img/projects/hrx_logo.png",
            "img/projects/hrx_logo2.png",
            "img/projects/hrx_logo3.png",
            "img/projects/hrx_logo4.png"
        ]
    },

    9: {
        image: "img/projects/dogkart_logo.png",
        title: "DogKart",
        date: "Mar 2023 - Nov 2023",
        summary: "India's comprehensive online pet store offering premium pet food, accessories, supplements, and grooming products",
        technologies: ["E-commerce Testing", "Inventory Management", "Product Catalog", "Mobile Commerce", "Payment Gateway"],

        description: "Extensive testing of pet care marketplace featuring premium brands like Orijen, Acana, and Ruffwear. Platform includes product catalog management, expert consultation services, and comprehensive pet care resources with veterinarian support.",
        achievements: [
            "Validated inventory sync across 500+ premium pet products with zero discrepancies",
            "Tested expert consultation system ensuring accurate veterinary guidance delivery",
            "Optimized product search and categorization improving user experience by 35%",
            "Enhanced mobile commerce functionality achieving 40% increase in mobile conversions"
        ],
        images: [
            "img/projects/dogkart_logo.png",
            "img/projects/dogkart_logo2.png",
            "img/projects/dogkart_logo3.png",
            "img/projects/dogkart_logo4.png"
        ]
    },

    10: {
        image: "img/projects/homecliq_logo.png",
        title: "HomeCliq",
        date: "Apr 2023 - Oct 2023",
        summary: "Real estate advisory platform providing comprehensive home buying support from purchase to interior design",
        technologies: ["PropTech Testing", "Real Estate Integration", "Advisory Platform", "Multi-vendor Testing", "Document Management"],

        description: "Quality assurance for real estate technology platform partnering with premium developers like Godrej, Hiranandani, and Lodha. Services include property advisory, home loan facilitation, and interior design coordination through integrated channel partner network.",
        achievements: [
            "Validated integration with 10+ premium real estate developers ensuring seamless data flow",
            "Tested end-to-end advisory process from property search to final possession",
            "Achieved 98% accuracy in property matching based on client requirements",
            "Optimized document management system reducing processing time by 45%"
        ],
        images: [
            "img/projects/homecliq_logo.png",
            "img/projects/homecliq_dashboard.png",
            "img/projects/homecliq_search.png",
            "img/projects/homecliq_advisory.png"
        ]
    },

    11: {
        image: "img/projects/caregiver_logo.png",
        title: "Caregiver Saathi",
        date: "Feb 2023 - Dec 2023",
        summary: "Comprehensive caregiver support and wellness ecosystem for families managing chronic/terminal illnesses",
        technologies: ["Healthcare Testing", "Privacy Compliance", "Mobile App Testing", "Community Platform", "Content Management"],

        description: "End-to-end quality assurance for holistic caregiver support platform offering workshops, counseling, support groups, learning interventions, and employee well-being programs. Platform serves caregivers navigating terminal illness and chronic conditions with validated content and curated services.",
        achievements: [
            "Ensured 100% compliance with healthcare privacy regulations and sensitive data handling",
            "Validated multi-program functionality across workshops, counseling, and support groups",
            "Tested community platform supporting 3,587+ followers and growing caregiver network",
            "Achieved 95% user satisfaction in accessing emotional support and practical resources"
        ],
        images: [
            "img/projects/caregiver_logo.png",
            "img/projects/caregiver_logo2.png",
            "img/projects/caregiver_logo3.png",
            "img/projects/caregiver_logo4.png"
        ]
    },

    12: {
        image: "img/projects/nhrdn_logo.png",
        title: "National HRD Network",
        date: "Jul 2023 - Sep 2023",
        summary: "Professional association platform for HR development through education, training, research, and experience sharing",
        technologies: ["Learning Management", "Chapter Management", "Event Management", "Member Portal", "Content Delivery"],

        description: "Quality assurance for comprehensive HR professional network managing 30+ chapters with 9,800+ members nationwide. Platform facilitates webinars, seminars, workshops, and knowledge sharing initiatives for HR community development.",
        achievements: [
            "Tested chapter coordination system managing 30+ regional chapters efficiently",
            "Validated member management platform supporting 9,800+ HR professionals",
            "Optimized event management system handling 100+ annual workshops and seminars",
            "Enhanced knowledge sharing platform improving resource accessibility by 60%"
        ],
        images: [
            "img/projects/nhrdn_logo.png",
            "img/projects/nhrdn_logo2.png",
            "img/projects/nhrdn_logo3.png",
            "img/projects/nhrdn_logo4.png"
        ]
    }
};



// Generate portfolio cards from data
function createPortfolioCards() {
    const container = document.getElementById('portfolio-grid');
    if (!container) return;

    container.innerHTML = '';

    Object.keys(projects).forEach(id => {
        const project = projects[id];

        // Get the first image from the images array for card display
        const firstImage = (project.images && project.images.length > 0)
            ? project.images[0]
            : project.image;

        const cardHTML = `
            <div class="portfolio-card" onclick="openProjectPanel(${id})">
                <div class="card-image-wrapper">
                    <img src="${firstImage}" alt="${project.title}" class="card-image"/>
                </div>
                <div class="card-content">
                    <div class="card-header">
                        <h5>${project.title}</h5>
                        <div class="project-date">${project.date}</div>
                    </div>
                    <p class="card-description">${project.summary}</p>
                    <div class="card-footer">
                        <span class="read-more">Click to view details</span>
                        <i class="arrow-icon fas fa-arrow-right"></i>
                    </div>
                </div>
            </div>
        `;

        container.innerHTML += cardHTML;
    });
}

// Scrollbar width helper
function getScrollbarWidth() {
    if (window.innerWidth === document.documentElement.clientWidth) {
        return 0;
    }

    const outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.overflow = 'scroll';
    outer.style.msOverflowStyle = 'scrollbar';
    outer.style.position = 'absolute';
    outer.style.top = '-9999px';
    document.body.appendChild(outer);

    const inner = document.createElement('div');
    outer.appendChild(inner);

    const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
    document.body.removeChild(outer);

    return Math.max(0, scrollbarWidth);
}

// Open project panel
function openProjectPanel(projectId) {
    const project = projects[projectId];
    if (!project) return;

    currentProject = projectId;
    scrollPosition = window.pageYOffset;

    document.getElementById('panel-title').textContent = project.title;
    document.getElementById('panel-date').textContent = project.date;
    document.getElementById('panel-description').textContent = project.description;

    document.getElementById('panel-tech').innerHTML =
        project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('');

    document.getElementById('panel-impact').innerHTML =
        project.achievements.map(achievement => `<li>${achievement}</li>`).join('');

    setupCarousel(project.images);

    // Reset panel scroll position to top
    const panelDetailsSection = document.querySelector('.panel-details');
    if (panelDetailsSection) {
        panelDetailsSection.scrollTop = 0;
    }

    // Alternative: Reset entire panel scroll
    const projectPanel = document.getElementById('project-panel');
    if (projectPanel) {
        projectPanel.scrollTop = 0;
    }

    document.documentElement.style.setProperty('--scroll-position', `-${scrollPosition}px`);
    document.body.classList.add('panel-open');
    document.getElementById('project-panel').classList.add('active');
    document.getElementById('panel-backdrop').classList.add('active');
}

// close panel function
function closeProjectPanel() {
    if (autoScrollInterval) {
        clearInterval(autoScrollInterval);
        autoScrollInterval = null;
    }

    const body = document.body;
    const targetScrollPosition = scrollPosition;

    // Start closing animation
    document.getElementById('project-panel').classList.remove('active');
    document.getElementById('panel-backdrop').classList.remove('active');

    // Wait for panel to completely slide out, then reset
    setTimeout(() => {
        // Reset scroll when panel is fully hidden
        const panelDetailsSection = document.querySelector('.panel-details');
        if (panelDetailsSection) {
            panelDetailsSection.scrollTop = 0;
        }

        const projectPanel = document.getElementById('project-panel');
        if (projectPanel) {
            projectPanel.scrollTop = 0;
        }

        body.classList.remove('panel-open');
        body.style.position = '';
        body.style.top = '';
        body.style.left = '';
        body.style.right = '';
        body.style.overflow = '';
        body.style.paddingRight = '';

        window.scrollTo({
            top: targetScrollPosition,
            left: 0,
            behavior: 'instant'
        });

        console.log('Scroll restored to:', window.pageYOffset);

    }, 500); // Wait for full slide-out animation 

    currentProject = null;
}


// Function to clear stuck hover effects
function clearHoverStates() {
    const cards = document.querySelectorAll('.portfolio-card');
    cards.forEach(card => {
        card.classList.remove('hover');
        card.style.transform = '';
        card.offsetHeight;
    });

    document.body.style.pointerEvents = 'none';
    setTimeout(() => {
        document.body.style.pointerEvents = '';
    }, 10);
}

// Setup carousel
function setupCarousel(images) {
    const carouselImage = document.getElementById('carousel-image');
    const indicatorsContainer = document.getElementById('carousel-indicators');

    console.log('Setting up carousel with images:', images);

    if (!carouselImage || !indicatorsContainer) {
        console.error('Carousel elements not found!');
        return;
    }

    if (!images || images.length === 0) {
        console.error('No images provided to carousel');
        return;
    }

    // Set first image
    carouselImage.src = images[0];
    currentImageIndex = 0;

    // Clear any existing auto-scroll
    if (autoScrollInterval) {
        clearInterval(autoScrollInterval);
        autoScrollInterval = null;
    }

    indicatorsContainer.innerHTML = '';
    indicatorsContainer.onclick = null;

    images.forEach((img, idx) => {
        const dot = document.createElement('div');
        dot.className = 'indicator-dot' + (idx === 0 ? ' active' : '');
        dot.setAttribute('data-index', idx);
        dot.title = `Image ${idx + 1}`;
        indicatorsContainer.appendChild(dot);
    });

    indicatorsContainer.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();

        if (e.target && e.target.classList.contains('indicator-dot')) {
            const index = parseInt(e.target.getAttribute('data-index'));

            if (!isNaN(index)) {
                if (autoScrollInterval) {
                    clearInterval(autoScrollInterval);
                    autoScrollInterval = null;
                }
                goToImage(index);
                setTimeout(() => {
                    if (images.length > 1) {
                        startAutoScroll(images);
                    }
                }, 3000);
            }
        }
    });

    const carouselControls = document.querySelector('.carousel-controls');
    if (carouselControls) {
        if (images.length > 1) {
            carouselControls.style.display = 'flex';
        } else {
            carouselControls.style.display = 'none';
        }
    }

    if (images.length > 1) {
        setTimeout(() => {
            startAutoScroll(images);
        }, 1000);
    }
}

// Start auto-scroll functionality
function startAutoScroll(images) {
    if (autoScrollInterval) {
        clearInterval(autoScrollInterval);
    }

    autoScrollInterval = setInterval(() => {
        nextImage(images);
    }, 4000);
}

// Reset auto-scroll timer (when user manually clicks)
function resetAutoScrollTimer(images) {
    if (autoScrollInterval) {
        clearInterval(autoScrollInterval);
    }

    setTimeout(() => {
        if (images.length > 1) {
            startAutoScroll(images);
        }
    }, 2000);
}

// Navigate to next image (for auto-scroll)
function nextImage(images) {
    if (!images || images.length === 0) return;

    currentImageIndex = (currentImageIndex + 1) % images.length;
    goToImage(currentImageIndex);
}

// Navigate to image
function goToImage(index) {
    if (!currentProject) return;

    const project = projects[currentProject];
    if (!project) return;

    const images = project.images;
    if (!images || images.length === 0) return;

    currentImageIndex = index;

    const carouselImage = document.getElementById('carousel-image');
    if (carouselImage) {
        carouselImage.src = images[index];
    }

    const indicators = document.querySelectorAll('.indicator-dot');
    indicators.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === index);
    });
}

// Event listeners
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && currentProject) {
        closeProjectPanel();
    }
});

document.addEventListener('DOMContentLoaded', function () {
    createPortfolioCards();

    // Prevent panel clicks from closing
    const panelContent = document.querySelector('.panel-content');
    if (panelContent) {
        panelContent.addEventListener('click', function (e) {
            e.stopPropagation();
        });
    }
});

// Enhanced portfolio functions with lazy loading
let observerOptions = {
    root: null,
    rootMargin: '50px',
    threshold: 0.1
};

let imageObserver = null;

// Helper function to truncate text
function truncateText(text, maxLength) {
    if (text.length <= maxLength) {
        return text;
    }
    return text.substring(0, maxLength) + '...';
}

// Create placeholder cards first
function createPlaceholderCards() {
    const container = document.getElementById('portfolio-grid');
    if (!container) return;

    const projectCount = Object.keys(projects).length;
    container.innerHTML = '';

    for (let i = 0; i < projectCount; i++) {
        const placeholder = document.createElement('div');
        placeholder.className = 'card-placeholder';
        placeholder.setAttribute('data-project-id', Object.keys(projects)[i]);
        container.appendChild(placeholder);
    }
    container.style.display = 'grid';
    setupLazyLoading();
}

// Setup lazy loading with Intersection Observer
function setupLazyLoading() {
    if ('IntersectionObserver' in window) {
        imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const placeholder = entry.target;
                    const projectId = placeholder.getAttribute('data-project-id');
                    loadProjectCard(projectId, placeholder);
                    imageObserver.unobserve(placeholder);
                }
            });
        }, observerOptions);
        document.querySelectorAll('.card-placeholder').forEach(placeholder => {
            imageObserver.observe(placeholder);
        });
    } else {
        loadAllCards();
    }
}

// Load individual project card
function loadProjectCard(projectId, placeholder) {
    const project = projects[projectId];
    if (!project || !placeholder) return;

    const firstImage = (project.images && project.images.length > 0)
        ? project.images[0]
        : project.image;

    const truncatedSummary = truncateText(project.summary, 70);

    placeholder.className = 'portfolio-card';
    placeholder.onclick = () => openProjectPanel(projectId);
    placeholder.innerHTML = `
        <div class="card-image-wrapper">
            <img src="${firstImage}" alt="${project.title}" class="card-image" loading="lazy"/>
        </div>
        <div class="card-content">
            <div class="card-header">
                <h5>${project.title}</h5>
                <div class="project-date">${project.date}</div>
            </div>
            <p class="card-description">${truncatedSummary}</p>
            <div class="card-footer">
                <span class="read-more">Click to view details</span>
                <i class="arrow-icon fas fa-arrow-right"></i>
            </div>
        </div>
    `;

    placeholder.style.opacity = '0';
    setTimeout(() => {
        placeholder.style.transition = 'opacity 0.5s ease';
        placeholder.style.opacity = '1';
    }, 100);
}

// Enhanced setup lazy loading with better error handling
function setupLazyLoading() {
    if ('IntersectionObserver' in window) {
        imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const placeholder = entry.target;
                    const projectId = placeholder.getAttribute('data-project-id');

                    if (placeholder && projectId) {
                        loadProjectCard(projectId, placeholder);
                        imageObserver.unobserve(placeholder);
                    }
                }
            });
        }, observerOptions);

        const placeholders = document.querySelectorAll('.card-placeholder');
        if (placeholders.length > 0) {
            placeholders.forEach(placeholder => {
                if (placeholder) {
                    imageObserver.observe(placeholder);
                }
            });
        } else {
            console.warn('No placeholders found for lazy loading');
            loadAllCards();
        }
    } else {
        console.log('IntersectionObserver not supported, loading all cards');
        loadAllCards();
    }
}

// Fallback: Load all cards at once
function loadAllCards() {
    const container = document.getElementById('portfolio-grid');
    if (!container) return;

    container.innerHTML = '';

    Object.keys(projects).forEach(id => {
        const project = projects[id];

        const firstImage = (project.images && project.images.length > 0)
            ? project.images[0]
            : project.image;

        const truncatedSummary = truncateText(project.summary, 70);

        const cardHTML = `
            <div class="portfolio-card" onclick="openProjectPanel(${id})">
                <div class="card-image-wrapper">
                    <img src="${firstImage}" alt="${project.title}" class="card-image" loading="lazy"/>
                </div>
                <div class="card-content">
                    <div class="card-header">
                        <h5>${project.title}</h5>
                        <div class="project-date">${project.date}</div>
                    </div>
                    <p class="card-description">${truncatedSummary}</p>
                    <div class="card-footer">
                        <span class="read-more">Click to view details</span>
                        <i class="arrow-icon fas fa-arrow-right"></i>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += cardHTML;
    });
}

function createPortfolioCards() {
    showLoader();
    setTimeout(() => {
        createPlaceholderCards();
        setTimeout(() => {
            hideLoader();
        }, 500);

    }, 800);
}

// Show loader
function showLoader() {
    const loader = document.getElementById('portfolio-loader');
    const grid = document.getElementById('portfolio-grid');

    if (loader) loader.style.display = 'flex';
    if (grid) grid.style.display = 'none';
}

// Hide loader and show grid
function hideLoader() {
    const loader = document.getElementById('portfolio-loader');
    const grid = document.getElementById('portfolio-grid');
    const container = document.querySelector('.portfolio-grid-container');

    if (loader && grid && container) {
        loader.style.opacity = '0';

        setTimeout(() => {
            loader.style.display = 'none';
            container.classList.add('cards-loaded');
            container.style.minHeight = 'auto';
            grid.style.display = 'grid';

            setTimeout(() => {
                grid.classList.add('loaded');
            }, 50);

        }, 300);
    }
}

// Update DOMContentLoaded event
document.addEventListener('DOMContentLoaded', function () {
    createPortfolioCards();
    const panelContent = document.querySelector('.panel-content');
    if (panelContent) {
        panelContent.addEventListener('click', function (e) {
            e.stopPropagation();
        });
    }
});

// Chrome-specific performance detection and fallback
// document.addEventListener('DOMContentLoaded', () => {
//     const isChrome = /Chrome/.test(navigator.userAgent) && !/Edg/.test(navigator.userAgent);
    
//     if (isChrome) {
//         console.log('Chrome detected - Using optimized cursor mode');
        
//         // Chrome-specific implementation with minimal DOM manipulation
//         let cursor = document.querySelector('.cursor-dot');
//         let isMoving = false;
        
//         // Use direct style manipulation instead of classes
//         document.addEventListener('mousemove', (e) => {
//             // Use left/top instead of transform for Chrome
//             cursor.style.left = (e.clientX - 7.5) + 'px';
//             cursor.style.top = (e.clientY - 7.5) + 'px';
//         }, { passive: true });
        
//     } else {
//         // Use your existing smooth implementation for other browsers
//         initializeFullCursor();
//     }
// });

// Simplified cursor with Chrome-specific workaround
document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.querySelector('.cursor-dot');
    if (!cursor) return;
    
    cursor.style.opacity = '1';
    
    const isChrome = /Chrome/.test(navigator.userAgent) && !/Edg/.test(navigator.userAgent);
    
    if (isChrome) {
        console.log('Chrome detected - Using ultra-minimal mode');
        
        // Skip requestAnimationFrame - direct updates with throttling
        let lastUpdate = 0;
        
        document.addEventListener('mousemove', (e) => {
            const now = Date.now();
            if (now - lastUpdate < 10) return; // 100fps throttle
            lastUpdate = now;
            
            // Use CSS custom properties for Chrome (sometimes faster)
            cursor.style.setProperty('--x', (e.clientX - 7.5) + 'px');
            cursor.style.setProperty('--y', (e.clientY - 7.5) + 'px');
        }, { passive: true });
        
    } else {
        // Keep your existing smooth implementation for other browsers
        document.addEventListener('mousemove', (e) => {
            cursor.style.transform = `translate(${e.clientX - 7.5}px, ${e.clientY - 7.5}px)`;
        });
        
        const interactiveElements = 'a, button, input, textarea, select, [role="button"], .btn, .interactive';
        
        document.addEventListener('mouseenter', (e) => {
            if (e.target.matches(interactiveElements)) {
                cursor.classList.add('pointer');
            }
        }, true);
        
        document.addEventListener('mouseleave', (e) => {
            if (e.target.matches(interactiveElements)) {
                cursor.classList.remove('pointer');
            }
        }, true);
    }
    
    document.addEventListener('mouseleave', () => cursor.style.opacity = '0');
    document.addEventListener('mouseenter', () => cursor.style.opacity = '1');
});