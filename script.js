document.addEventListener('DOMContentLoaded', function() {
    // ==================== NAVBAR SCROLL ====================
    const navbar = document.querySelector('.navbar');
    if (navbar) window.addEventListener('scroll', () => navbar.classList.toggle('scrolled', window.scrollY > 20));

    // ==================== HAMBURGER MENU ====================
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navLinks = document.getElementById('navLinks');
    if (hamburgerBtn && navLinks) {
        const toggleMenu = () => {
            navLinks.classList.toggle('show');
            hamburgerBtn.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('show') ? 'hidden' : '';
        };
        hamburgerBtn.addEventListener('click', (e) => { e.stopPropagation(); toggleMenu(); });
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('show');
                hamburgerBtn.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('show') && !hamburgerBtn.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('show');
                hamburgerBtn.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 768) {
                navLinks.classList.remove('show');
                hamburgerBtn.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // ==================== SCROLL REVEAL ====================
    const revealElements = document.querySelectorAll('.section, .hero, .gear-grid, .cost-summary');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    revealElements.forEach(el => { el.classList.add('reveal'); observer.observe(el); });

    // ==================== LIGHTBOX ====================
    const modal = document.getElementById('lightboxModal');
    const lightboxImg = document.getElementById('lightboxImg');
    const closeBtn = document.querySelector('.close-lightbox');
    if (modal && lightboxImg && closeBtn) {
        document.querySelectorAll('.gallery-item').forEach(img => {
            img.addEventListener('click', () => {
                lightboxImg.src = img.src;
                modal.style.display = 'flex';
                modal.style.opacity = '1';
                document.body.style.overflow = 'hidden';
            });
        });
        const closeModal = () => {
            modal.style.opacity = '0';
            setTimeout(() => { modal.style.display = 'none'; document.body.style.overflow = ''; }, 300);
        };
        closeBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal.style.display === 'flex') closeModal(); });
    }

    // ==================== ROUTE SLIDER ====================
    const slider = document.getElementById('routeSlider');
    const posNameSpan = document.getElementById('posNameDisplay');
    const posDetailDiv = document.getElementById('posDetailInfo');
    if (slider && posNameSpan && posDetailDiv) {
        const routePoints = [
            { name: "Basecamp Tamiajeng (690 mdpl)", detail: "Titik awal pendakian. Pastikan administrasi selesai. Bawa air minum 2-3 liter." },
            { name: "Pos 1 (750 mdpl)", detail: "Jalan aspal/paving, pemukiman & kebun. 15-20 menit." },
            { name: "Pos 2 (850 mdpl)", detail: "Jalur tanah menanjak landai, vegetasi hutan. 30-45 menit." },
            { name: "Pos 3 (1050 mdpl)", detail: "Tanjakan terasa, jalur di antara pepohonan. 30-40 menit." },
            { name: "Pos 4 (1250 mdpl)", detail: "Jalur tanah berbatu, tanjakan konstan. 30-45 menit." },
            { name: "Puncak Bayangan (1450 mdpl)", detail: "Area landai luas, spot camp favorit. Batas akhir tenda." },
            { name: "Puncak Pawitra (1.653 mdpl)", detail: "Jalur scree terjal, batuan lepas. Hati-hati. 45-60 menit." }
        ];
        function updateSlider(val) {
            const point = routePoints[parseInt(val)];
            posNameSpan.innerHTML = `<i class="fas fa-location-dot" style="color:#D4AF37;"></i> ${point.name}`;
            posDetailDiv.innerHTML = `<strong>${point.name}</strong><br>${point.detail}`;
        }
        slider.addEventListener('input', (e) => updateSlider(e.target.value));
        updateSlider(0);
    }

    // ==================== SMOOTH SCROLL ====================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
        });
    });

    // ==================== ACTIVE NAV HIGHLIGHT ====================
    const sections = document.querySelectorAll('section[id], header[id]');
    const navItems = document.querySelectorAll('.nav-links a');
    function updateActiveLink() {
        let current = '';
        sections.forEach(s => {
            const top = s.offsetTop - 100;
            if (scrollY >= top && scrollY < top + s.clientHeight) current = s.getAttribute('id');
        });
        navItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href')?.includes(current)) link.classList.add('active');
        });
    }
    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink();

    // ==================== PAYMENT MODAL (PERBAIKAN) ====================
    const paymentModal = document.getElementById('paymentModal');
    const showPaymentBtn = document.getElementById('showPaymentBtn');
    const closePaymentBtn = document.querySelector('.close-payment-modal');

    if (paymentModal && showPaymentBtn && closePaymentBtn) {
        showPaymentBtn.addEventListener('click', (e) => {
            e.preventDefault();
            paymentModal.classList.add('show');
            document.body.style.overflow = 'hidden';
        });

        const closePayment = () => {
            paymentModal.classList.remove('show');
            document.body.style.overflow = '';
        };

        closePaymentBtn.addEventListener('click', closePayment);
        paymentModal.addEventListener('click', (e) => {
            if (e.target === paymentModal) closePayment();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && paymentModal.classList.contains('show')) closePayment();
        });
    }

    // ==================== DEEP LINK FALLBACK ====================
    // Tangani tautan e-wallet agar lebih robust
    document.querySelectorAll('.btn-open[href^="shopeepay://"], .btn-open[href^="gopay://"], .btn-open[href^="intent://"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            const phone = '6285733525772';
            
            // Untuk ShopeePay dan GoPay, coba buka aplikasi, jika gagal arahkan ke halaman web
            if (href.startsWith('shopeepay://')) {
                // Fallback: jika aplikasi tidak terpasang, arahkan ke Play Store atau halaman bantuan
                setTimeout(() => {
                    // Cek apakah halaman masih di sini (artinya deep link gagal)
                    if (!document.hidden) {
                        window.location.href = `https://shopee.co.id/universal-link/shopee-pay?phone=${phone}`;
                    }
                }, 500);
            } else if (href.startsWith('gopay://')) {
                setTimeout(() => {
                    if (!document.hidden) {
                        window.location.href = `https://www.gojek.com/gopay/transfer`;
                    }
                }, 500);
            } else if (href.startsWith('intent://')) {
                // Untuk Dana, intent biasanya langsung menangani
                // Tidak perlu fallback tambahan
            }
        });
    });
});

// Fungsi copy ke clipboard (global)
function copyToClipboard(text) {
    navigator.clipboard?.writeText(text).then(() => alert('Nomor berhasil disalin: ' + text)).catch(() => {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert('Nomor disalin: ' + text);
    });
}
