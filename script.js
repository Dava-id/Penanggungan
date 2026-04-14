// script.js - Premium Interactive Features

document.addEventListener('DOMContentLoaded', function() {
    
    // ==================== NAVBAR SCROLL EFFECT ====================
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // ==================== SCROLL REVEAL ANIMATION ====================
    const revealElements = document.querySelectorAll('.section, .hero, .gear-grid, .cost-summary, .route-table, .interactive-slider');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: add slight delay for children
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
    
    revealElements.forEach(el => {
        el.classList.add('reveal');
        revealObserver.observe(el);
    });

    // ==================== LIGHTBOX (Enhanced) ====================
    const modal = document.getElementById('lightboxModal');
    const lightboxImg = document.getElementById('lightboxImg');
    const closeBtn = document.querySelector('.close-lightbox');
    
    if (modal && lightboxImg && closeBtn) {
        const galleryImgs = document.querySelectorAll('.gallery-item');
        galleryImgs.forEach(img => {
            img.addEventListener('click', () => {
                lightboxImg.src = img.src;
                modal.style.display = 'flex';
                modal.offsetHeight; // reflow
                modal.style.opacity = '1';
                document.body.style.overflow = 'hidden';
            });
        });
        
        const closeModal = () => {
            modal.style.opacity = '0';
            setTimeout(() => {
                modal.style.display = 'none';
                document.body.style.overflow = '';
            }, 300);
        };
        
        closeBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.style.display === 'flex') {
                closeModal();
            }
        });
    }

    // ==================== ROUTE SLIDER (Interactive) ====================
    const slider = document.getElementById('routeSlider');
    const posNameSpan = document.getElementById('posNameDisplay');
    const posDetailDiv = document.getElementById('posDetailInfo');
    
    if (slider && posNameSpan && posDetailDiv) {
        const routePoints = [
            { name: "Basecamp Tamiajeng (690 mdpl)", detail: "Titik awal pendakian. Pastikan administrasi selesai. Bawa air minum 2-3 liter. Fasilitas lengkap tersedia." },
            { name: "Pos 1 (sekitar 750 mdpl)", detail: "Jalan aspal/paving melewati pemukiman dan kebun warga. Medan ringan, estimasi 15-20 menit." },
            { name: "Pos 2 (sekitar 850 mdpl)", detail: "Jalur tanah mulai menanjak landai. Mulai masuk vegetasi hutan. Waktu tempuh 30-45 menit." },
            { name: "Pos 3 (sekitar 1050 mdpl)", detail: "Tanjakan mulai terasa, jalur di antara pepohonan rindang. Estimasi 30-40 menit." },
            { name: "Pos 4 (sekitar 1250 mdpl)", detail: "Jalur tanah berbatu dengan tanjakan konstan. Perlu tenaga ekstra. Waktu 30-45 menit." },
            { name: "Puncak Bayangan (sekitar 1450 mdpl)", detail: "Area landai luas, spot favorit untuk mendirikan tenda. Batas akhir area camp. Jangan lanjutkan tenda ke puncak." },
            { name: "Puncak Pawitra (1.653 mdpl)", detail: "Jalur scree terjal dengan batuan lepas. Hati-hati, estimasi 45-60 menit. Nikmati panorama 360 derajat." }
        ];
        
        function updateSlider(value) {
            const idx = parseInt(value, 10);
            const point = routePoints[idx];
            posNameSpan.innerHTML = `<i class="fas fa-location-dot" style="color: #D4AF37;"></i> ${point.name}`;
            posDetailDiv.innerHTML = `<strong style="font-size: 1.3rem; color: #051524; display: block; margin-bottom: 8px;">${point.name}</strong><span style="opacity: 0.85;">${point.detail}</span>`;
        }
        
        slider.addEventListener('input', (e) => updateSlider(e.target.value));
        updateSlider(0);
    }

    // ==================== SMOOTH SCROLL FOR ANCHOR LINKS ====================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === "#" || href === "") return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ==================== ACTIVE NAV HIGHLIGHT ON SCROLL ====================
    const sections = document.querySelectorAll('section[id], header[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    function updateActiveLink() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href && href.includes(current) && current !== '') {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink();
    
    console.log("✨ Gunung Penanggungan · Premium Corporate Experience");
});
