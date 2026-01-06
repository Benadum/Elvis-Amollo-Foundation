document.addEventListener('DOMContentLoaded', () => {
    // --- 1. NAVIGATION & HEADER ---
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const logoBtn = document.getElementById('logo-btn');
    const header = document.getElementById('navbar-header');
    const backBtn = document.getElementById("backToTop");

    // Toggle Mobile Menu
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('is-active');
    });

    // Smooth Scroll to Top via Logo
    logoBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        navLinks.classList.remove('active');
        menuToggle.classList.remove('is-active');
    });

    // Close mobile menu when any nav link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('is-active');
        });
    });

    // --- 2. SCROLL-BASED EFFECTS (Header, Back-to-Top, Reveal) ---
    const reveals = document.querySelectorAll(".reveal");

    const handleScrollEffects = () => {
        const scrollY = window.scrollY;

        // Header Shrink Effect
        if (scrollY > 100) {
            header.style.padding = '5px 0';
            header.style.background = '#fcfcfc';
        } else {
            header.style.padding = '15px 0';
            header.style.background = '#fff';
        }

        // Back-to-Top Button Visibility
        backBtn.style.display = (scrollY > 300) ? "block" : "none";

        // Reveal Animations
        reveals.forEach(reveal => {
            const elementTop = reveal.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (elementTop < windowHeight - 150) {
                reveal.classList.add("active");
            }
        });
    };

    window.addEventListener("scroll", handleScrollEffects);
    backBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    handleScrollEffects(); // Run once on load

    // --- 3. IMPACT COUNTER (Intersection Observer) ---
    const countImpact = () => {
        const counters = document.querySelectorAll('.counter');
        const speed = 200;

        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText.replace(/,/g, '');
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc).toLocaleString();
                    setTimeout(updateCount, 15);
                } else {
                    counter.innerText = target.toLocaleString() + (target > 10 ? "+" : ""); 
                }
            };
            updateCount();
        });
    };

    const impactSection = document.querySelector('.impact-section');
    if (impactSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    countImpact();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        observer.observe(impactSection);
    }

    // --- 4. GALLERY & LIGHTBOX ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.close-lightbox');

    // Gallery Filtering
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');
            galleryItems.forEach(item => {
                item.style.display = (filterValue === 'all' || item.classList.contains(filterValue)) ? 'block' : 'none';
            });
        });
    });

    // Lightbox Open
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            lightboxImg.src = img.src;
            lightboxCaption.innerText = img.alt;
            lightbox.style.display = 'flex';
        });
    });

    // Lightbox Close
    const closeLightbox = () => lightbox.style.display = 'none';
    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
});

// --- HERO CAROUSEL LOGIC ---
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.carousel-prev');
const nextBtn = document.querySelector('.carousel-next');

let currentSlide = 0;
let slideInterval;

const showSlide = (index) => {
    // Reset classes
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    // Set new active slide
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    currentSlide = index;
};

const nextSlide = () => {
    let index = (currentSlide + 1) % slides.length;
    showSlide(index);
};

const prevSlide = () => {
    let index = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(index);
};

// Auto-play timer
const startAutoPlay = () => {
    slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
};

const stopAutoPlay = () => {
    clearInterval(slideInterval);
};

// Event Listeners for Manual Controls
if(nextBtn) {
    nextBtn.addEventListener('click', () => {
        stopAutoPlay();
        nextSlide();
        startAutoPlay();
    });
}

if(prevBtn) {
    prevBtn.addEventListener('click', () => {
        stopAutoPlay();
        prevSlide();
        startAutoPlay();
    });
}

// Dot Navigation
dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
        stopAutoPlay();
        showSlide(idx);
        startAutoPlay();
    });
});

// Start the carousel
startAutoPlay();


// DONATION MODAL LOGIC
const modal = document.getElementById('donation-modal');
const closeBtn = document.querySelector('.close-modal');
const causeText = document.getElementById('selected-cause');

// Open Modal and update the cause title
document.querySelectorAll('.open-donation').forEach(button => {
    button.addEventListener('click', () => {
        const cause = button.getAttribute('data-cause');
        if(causeText) causeText.innerText = cause;
        if(modal) modal.style.display = 'block';
    });
});

// Close Modal logic
if(closeBtn) {
    closeBtn.addEventListener('click', () => modal.style.display = 'none');
}

window.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
});

// --- CUSTOM PAYPAL DONATION LOGIC (NEW) ---
const paypalBtn = document.getElementById('paypal-submit-btn');

if (paypalBtn) {
    paypalBtn.addEventListener('click', () => {
        const amountInput = document.getElementById('donation-amount');
        const amount = amountInput ? amountInput.value : 0;
        const cause = document.getElementById('selected-cause') ? document.getElementById('selected-cause').innerText : "General Fund";
        const paypalEmail = "keithelvis91@gmail.com";
        
        if (!amount || amount <= 0) {
            alert("Please enter a valid donation amount.");
            return;
        }

        // Construct the PayPal URL with the custom amount and cause
        const paypalUrl = `https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=${encodeURIComponent(paypalEmail)}&item_name=${encodeURIComponent("EAF Donation: " + cause)}&amount=${amount}&currency_code=USD`;

        // Open PayPal in a new tab
        window.open(paypalUrl, '_blank');
    });
}