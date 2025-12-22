document.addEventListener('DOMContentLoaded', () => {
    
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const logoBtn = document.getElementById('logo-btn');

    // 1. LOGO ON-CLICK: Scroll to top
    logoBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        // Close mobile menu if open
        navLinks.classList.remove('active');
    });

    // 2. MOBILE MENU: Toggle open/close
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // 3. NAV LINKS: Smooth Scroll and Close Menu
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if(targetId.startsWith("#")) {
                navLinks.classList.remove('active');
            }
        });
    });

    // 4. NAVBAR SCROLL EFFECT: Shrink header on scroll
    window.addEventListener('scroll', () => {
        const header = document.getElementById('navbar-header');
        if (window.scrollY > 100) {
            header.style.padding = '5px 0';
            header.style.background = '#fcfcfc';
        } else {
            header.style.padding = '15px 0';
            header.style.background = '#fff';
        }
    });
});