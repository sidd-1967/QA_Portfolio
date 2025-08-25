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
        link.href = 'resume/Siddhesh_Govalkar_QA_Engineer_Resume.pdf';
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


});

// Device Detection & Redirect for coming soon on tablet and mobile
// (function () {
//     const tabletBreakpoint = 1024;  // tablet max width (change if needed)

//     function redirectToSoon() {
//         const screenWidth = window.innerWidth;

//         if (screenWidth <= tabletBreakpoint) {
//             // For mobile and tablet, redirect to coming-soon.html if not already there
//             if (!window.location.pathname.includes('coming-soon.html')) {
//                 window.location.href = 'coming-soon.html';
//             }
//         } else {
//             // For desktop (> tabletBreakpoint), do nothing (allow access)
//         }
//     }

//     // Run on initial load
//     redirectToSoon();

//     // Run on window resize
//     window.addEventListener('resize', redirectToSoon);
// })();


// Preloader
$(window).on('load', function () {
    $('#preloder').fadeOut('slow');
});

// Error handling for missing images
$(document).ready(function () {
    $('img').on('error', function () {
        $(this).attr('src', 'img/logo3.webp');
    });
});

// PORTFOLIO PANEL
let scrollPosition = 0;
let currentProject = null;
let currentImageIndex = 0;
let autoScrollInterval = null;

const projects = {
    // CURRENT COMPANY PROJECTS
    1: {
        image: "img/portfolio/maanch_logo.webp",
        title: "Maanch Engagement Tracker",
        date: "Mar 2024 - Present",
        summary: "Capture the full breadth of your stewardship work",
        technologies: ["Java", "Maven", "Automation", "Jenkins", "Performance Testing"],

        description: "Capture the full breadth of your stewardship work",
        achievements: [
            "Developed and maintained 50+ automated TestNG scripts in Java & Maven",
            "Increasing regression coverage from 40% to 85% and cutting execution time by 50%",
            "Reducing manual effort by 60%",
            "Enhanced user experience through comprehensive UI/UX testing"
        ],
        images: [
            "img/portfolio/maanch_logo.webp"
        ]
    },

    2: {
        image: "img/portfolio/worktops_logo.webp",
        title: "House of Worktops",
        date: "Aug 2024 - Present",
        summary: "UK’s finest worktops delivered to your home",
        technologies: ["Functional", "Automation", "Jenkins", "Integration/API", "Performance Testing"],

        description: "UK’s finest worktops delivered to your home",
        achievements: [
            "Verified a materials cost engine, achieving 100% pricing accuracy across premium substrates and sizes",
            "Optimized custom order workflows, reducing manufacturing defects by 60% and rework time by 35%.",
            "Ensured 100% premium‑material pricing accuracy through boundary, currency, and tax validations",
            "Validated worktop configurator: dimensions, cut‑outs, edge profiles, sink/hob placements, and corner types with real‑time pricing and feasibility checks"
        ],
        images: [
            "img/portfolio/worktops_logo.webp"
        ]
    },

    3: {
        image: "img/portfolio/hwgroup_logo.webp",
        title: "HWGroup",
        date: "Sept 2024 - Dec 2024",
        summary: "Global talent solutions for high growth and transformational sectors",
        technologies: ["Wordpress", "Quality Assurance", "API Testing", "UI Testing"],

        description: "Global talent solutions for high growth and transformational sectors",
        achievements: [
            "validated content integrity, navigation, and lead-gen flows across Executive Search, Interim Solutions, and sector pages, ensuring error-free copy, links, and CTAs",
            "Tested contact/brief forms, spam protection, consent, and CRM/Zapier/email integrations to prevent lead loss",
            "Optimized page speed, metadata, schema, and internal linking for practice pages and thought leadership posts",
            "Ensured cookie consent, GA/Tag Manager events on CTA clicks and form submits, with GDPR-friendly data handling"
        ],
        images: [
            "img/portfolio/hwgroup_logo.webp"
        ]
    },

    4: {
        image: "img/portfolio/redpack_logo.webp",
        title: "Redpack",
        date: "Oct 2024 - Dec 2024",
        summary: "The best packaging for your products, every time",
        technologies: ["CMS", "Integrations Testing", "UI Testing"],

        description: "The best packaging for your products, every time",
        achievements: [
            "validated product/machine pages, sector navigation, and enquiry/quote forms to ensure zero dead ends and reliable lead capture",
            "Optimized media‑heavy pages (machine images/videos), metadata, and internal linking for discoverability",
            "Verified headings hierarchy, contrast, keyboard nav, and mobile readability across stats and hero sections",
            "Ensured consent banner, GA4/GTM events on enquiries, and video plays with GDPR‑safe handling"
        ],
        images: [
            "img/portfolio/redpack_logo.webp"
        ]
    },

    5: {
        image: "img/portfolio/DgNote_logo.webp",
        title: "DgNote",
        date: "Dec 2022 - Mar 2024",
        summary: "State-of-the-Art platform for Automation & Insurance",
        technologies: ["Insurance Platform", "Automation", "Python", "API Integration", "Functional Testing"],

        description: "State-of-the-Art platform for Automation & Insurance",
        achievements: [
            "Validated quote → proposal → payment → policy issuance flows for commercial and retail lines, with instant quotes, dashboard management, and 24x7 access",
            "Verified UPI/net‑banking payments, GST handling, invoices/receipts, and consent/privacy controls across onboarding purchase",
            "Ensured responsive performance for quote calculators and dashboards under peak loads"
        ],
        images: [
            "img/portfolio/DgNote_logo.webp"
        ]
    },

    6: {
        image: "img/portfolio/icici_logo.webp",
        title: "ICICI Careers",
        date: "Jun 2022 - Nov 2022",
        summary: "Comprehensive career management platform for one of India's leading banks offering job applications, tracking, and onboarding",
        technologies: ["Website Testing", "Mobile App Testing", "Android/IOS Testing", "API Testing", "Performance Testing"],

        description: "Comprehensive career management platform for one of India's leading banks offering job applications, tracking, and onboarding",
        achievements: [
            "Validated application processing for 160+ diverse banking job categories",
            "Tested onboarding facilitation system achieving 95% completion rate",
            "Optimized mobile app performance supporting 100K+ downloads",
            "Enhanced notification system ensuring timely candidate communication"
        ],
        images: [
            "img/portfolio/icici_logo.webp"
        ]
    },

    7: {
        image: "img/portfolio/bmt_logo.webp",
        title: "BookMyTurf",
        date: "Jun 2022 - Nov 2022",
        summary: "Away from monotonous life, Play Like Champ Escape the ordinary, book your turf, and play like never before",
        technologies: ["Mobile Testing", "Payment Gateway", "Location-based Testing", "Cross-platform Testing", "Real-time Booking"],

        description: "Away from monotonous life, Play Like Champ Escape the ordinary, book your turf, and play like never before",
        achievements: [
            "Validated real-time slot availability across 50+ cricket grounds with 99.5% accuracy",
            "Tested booking flow ensuring frictionless experience for 5K+ app downloads",
            "Enhanced cross-platform reliability for time-based booking actions",
            "Optimized payment processing achieving 98% transaction success rate"
        ],
        images: [
            "img/portfolio/bmt_logo.webp"
        ]
    },

    8: {
        image: "img/portfolio/hrx_logo.webp",
        title: "HRX Brand",
        date: "Jun 2022 - Nov 2022",
        summary: "HRX MIND FUEL CHALLENGE YOUR LIMITS Be a part of the tribe that’s limitless",
        technologies: ["Quality Assurance Testing", "Fitness App Testing", "Nutrition Platform", "Brand Integration", "Multi-channel Testing"],

        description: "HRX MIND FUEL CHALLENGE YOUR LIMITS Be a part of the tribe that’s limitless",
        achievements: [
            "Tested multi-channel integration across online platform and physical stores",
            "Checked collections, HRX Hub/Connect pages, store info, and media galleries for correct links, assets, and mobile performance",
            "Ensured seamless brand experience across 100+ retail partners nationwide"
        ],
        images: [
            "img/portfolio/hrx_logo.webp"
        ]
    },

    9: {
        image: "img/portfolio/dogkart_logo.webp",
        title: "DogKart",
        date: "Jun 2022 - Nov 2022",
        summary: "India's comprehensive online pet store offering premium pet food, accessories, supplements, and grooming products",
        technologies: ["E-commerce Testing", "Inventory Management", "Product Catalog", "Mobile Commerce", "Payment Gateway"],

        description: "India's comprehensive online pet store offering premium pet food, accessories, supplements, and grooming products",
        achievements: [
            "Verified combo SKUs (e.g., toy + food bundles), discounts, and tax/shipping calculations",
            "Checked brand variants (Acana/Orijen/Little Big Paw), pack sizes, and price tiers for consistency across listings and PDPs",
            "validated category → PDP → cart → checkout → payment flows with price/stock accuracy and “Buy Now” CTAs across web/mobile"
        ],
        images: [
            "img/portfolio/dogkart_logo.webp"
        ]
    },

    10: {
        image: "img/portfolio/homecliq_logo.webp",
        title: "HomeCliq",
        date: "Jun 2022 - Nov 2022",
        summary: "Unique real estate advisory firm that supports buyers from identification/purchase, designing, management pan India",
        technologies: ["CMS", "Real Estate Integration", "Advisory Platform", "Multi-vendor Testing", "Document Management"],

        description: "Unique real estate advisory firm that supports buyers from identification/purchase, designing, management pan India",
        achievements: [
            "Validated lead funnels for property discovery → enquiry → site‑visit scheduling → loan/IDV assistance, with document uploads and follow‑ups",
            "Checked project/developer pages (e.g., Lodha/Godrej/Hiranandani mentions) for accurate specs, pricing ranges, and CTAs",
            "Optimized image-heavy listings and ensured accessible forms and error messages"
        ],
        images: [
            "img/portfolio/homecliq_logo.webp"
        ]
    },

    11: {
        image: "img/portfolio/caregiver_logo.webp",
        title: "Caregiver Saathi",
        date: "Jun 2022 - Nov 2022",
        summary: "Caregiver Saathi is a U.S.-based organization dedicated to supporting the vital work of the Caregiver Saathi Foundation in India",
        technologies: ["Healthcare Testing", "Privacy Compliance", "Mobile App Testing", "Community Platform", "Content Management"],

        description: "Caregiver Saathi is a U.S.-based organization dedicated to supporting the vital work of the Caregiver Saathi Foundation in India",
        achievements: [
            "Validated discovery → signup → community/program enrollment → consultation booking → resources access across web/mobile, ensuring clear flows for caregivers",
            "Tested scheduling, reminders, video session links, and payment/registration where applicable"
        ],
        images: [
            "img/portfolio/caregiver_logo.webp"
        ]
    },

    12: {
        image: "img/portfolio/nhrdn_logo.webp",
        title: "National HRD Network",
        date: "Jun 2022 - Nov 2022",
        summary: "India's Largest Network for HR Professionals",
        technologies: ["Learning Management", "Chapter Management", "Event Management", "Member Portal", "Content Delivery"],

        description: "India's Largest Network for HR Professionals",
        achievements: [
            "Checked chapter pages, leadership info, and event listings across 30+ cities for accurate links and updates",
            "Ensured fast load for rich event pages and WCAG‑aligned navigation/forms"
        ],
        images: [
            "img/portfolio/nhrdn_logo.webp"
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

    // Show only the first image - no carousel
    const carouselImage = document.getElementById('carousel-image');
    if (carouselImage && project.images && project.images.length > 0) {
        carouselImage.src = project.images[0];
    } else if (carouselImage) {
        carouselImage.src = 'img/logo3.webp';
    }

    // Reset panel scroll position to top
    const panelDetailsSection = document.querySelector('.panel-details');
    if (panelDetailsSection) {
        panelDetailsSection.scrollTop = 0;
    }

    const projectPanel = document.getElementById('project-panel');
    if (projectPanel) {
        projectPanel.scrollTop = 0;
    }

    document.documentElement.style.setProperty('--scroll-position', `-${scrollPosition}px`);
    document.body.classList.add('panel-open');
    projectPanel.classList.add('active');
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
function showProjectImage(images) {
    const carouselImage = document.getElementById('carousel-image');
    if (!carouselImage) {
        return;
    }
    if (!images || images.length === 0) {
        // You might want to set a placeholder here
        carouselImage.src = 'img/logo3.webp';
        return;
    }
    // Always display the first image
    carouselImage.src = images[0];
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
            loadAllCards();
        }
    } else {
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


// Mobile Menu Toggle Functionality
document.addEventListener('DOMContentLoaded', () => {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileOverlay = document.getElementById('mobile-overlay');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    if (hamburgerBtn && typeof hamburgerBtn.addEventListener === 'function') {
        hamburgerBtn.addEventListener('click', () => {
            if (hamburgerBtn && mobileOverlay) {
                hamburgerBtn.classList.toggle('active');
                mobileOverlay.classList.toggle('active');

                // Prevent body scroll when menu is open
                if (mobileOverlay.classList.contains('active')) {
                    document.body.style.overflow = 'hidden';
                } else {
                    document.body.style.overflow = '';
                }
            }
        });
    }

    if (mobileOverlay && typeof mobileOverlay.addEventListener === 'function') {
        mobileOverlay.addEventListener('click', (e) => {
            if (e.target === mobileOverlay) {
                closeMenu();
            }
        });
    }

    if (mobileNavLinks && mobileNavLinks.length > 0) {
        mobileNavLinks.forEach(link => {
            if (link && typeof link.addEventListener === 'function') {
                link.addEventListener('click', () => {
                    closeMenu();
                });
            }
        });
    }

    // Close menu function
    function closeMenu() {
        if (hamburgerBtn && mobileOverlay) {
            hamburgerBtn.classList.remove('active');
            mobileOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // Close menu on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileOverlay && mobileOverlay.classList.contains('active')) {
            closeMenu();
        }
    });
});

// Project Database Query scroll 
document.addEventListener("DOMContentLoaded", () => {
    const terminal = document.querySelector(".terminal-body");

    if (!terminal) {
        return;
    }

    terminal.addEventListener("wheel", function (e) {
        const isAtTop = terminal.scrollTop === 0;
        const isAtBottom =
            Math.ceil(terminal.scrollTop + terminal.clientHeight) >= terminal.scrollHeight;

        if ((isAtTop && e.deltaY < 0) || (isAtBottom && e.deltaY > 0)) {
            return;
        } else {
            e.stopPropagation();
        }
    }, { passive: true });
});