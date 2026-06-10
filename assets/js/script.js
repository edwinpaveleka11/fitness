document.addEventListener('DOMContentLoaded', function () {

    /* ----- MOBILE MENU TOGGLE ----- */
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', function () {
            const isOpen = mobileMenu.style.display === 'block';
            mobileMenu.style.display = isOpen ? 'none' : 'block';
            menuBtn.textContent = isOpen ? '☰' : '✕';
            menuBtn.setAttribute('aria-expanded', String(!isOpen));
        });

        // Close menu when a link is clicked
        mobileMenu.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                mobileMenu.style.display = 'none';
                menuBtn.textContent = '☰';
                menuBtn.setAttribute('aria-expanded', 'false');
            });
        });
    }

    /* ----- SMOOTH SCROLL for all anchor links ----- */
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const headerHeight = document.querySelector('header')?.offsetHeight || 0;
                const top = target.getBoundingClientRect().top + window.scrollY - headerHeight;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    /* ----- ACTIVE NAV LINK on scroll ----- */
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('header nav ul li a');

    const observerOptions = {
        root: null,
        rootMargin: '-40% 0px -55% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                navLinks.forEach(function (link) {
                    link.classList.remove('active-nav');
                    if (link.getAttribute('href') === '#' + entry.target.id) {
                        link.classList.add('active-nav');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(function (section) {
        observer.observe(section);
    });

    /* ----- PLAY BUTTON — alert placeholder ----- */
    const playBtn = document.getElementById('play-btn');

    if (playBtn) {
        playBtn.addEventListener('click', function () {
            // Replace this block with your actual video modal logic
            alert('▶ Video player coming soon!\n\nMaaf, saat ini fitur belum bisa digunakan');
        });
    }

    /* ----- HEADER SCROLL EFFECT (shadow on scroll) ----- */
    const header = document.querySelector('header');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 10) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    /* ----- SCROLL REVEAL — fade-in on entrance ----- */
    const revealTargets = document.querySelectorAll(
        '#hero .container > *, #about > .container > *, ' +
        '.trainer-card, .review-card, #cta .container > *'
    );

    revealTargets.forEach(function (el) {
        el.classList.add('reveal');
    });

    const revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealTargets.forEach(function (el) {
        revealObserver.observe(el);
    });

    // Inject reveal CSS dynamically so it works without an extra stylesheet import
    const revealStyle = document.createElement('style');
    revealStyle.textContent = `
        .reveal {
            opacity: 0;
            transform: translateY(24px);
            transition: opacity 0.55s ease, transform 0.55s ease;
        }
        .revealed {
            opacity: 1;
            transform: translateY(0);
        }
        header.scrolled {
            box-shadow: 0 4px 24px rgba(0,0,0,0.5);
        }
        .active-nav {
            color: #1391ad !important;
        }
        .active-nav::after {
            width: 100% !important;
        }
    `;
    document.head.appendChild(revealStyle);

});