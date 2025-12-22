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


const counters = document.querySelectorAll('.counter');
    const speed = 200; // The higher the slower

    const animateCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 1);
                } else {
                    counter.innerText = target + "+";
                }
            };
            updateCount();
        });
    };

    // Trigger counter when it enters the viewport
    const statsSection = document.querySelector('.stats-section');
    let counted = false;

    window.addEventListener('scroll', () => {
        if (!statsSection) return;
        const sectionPos = statsSection.getBoundingClientRect().top;
        const screenPos = window.innerHeight;

        if (sectionPos < screenPos && !counted) {
            animateCounters();
            counted = true;
        }
    });
 const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and add to clicked
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // --- LIGHTBOX LOGIC ---
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.close-lightbox');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.querySelector('img').src;
            const caption = item.querySelector('img').alt;
            
            lightbox.style.display = 'flex';
            lightboxImg.src = imgSrc;
            lightboxCaption.innerText = caption;
        });
    });

    closeBtn.addEventListener('click', () => {
        lightbox.style.display = 'none';
    });

    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
        }
    });