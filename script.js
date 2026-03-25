// script.js - Lightbox Gallery & Route Slider Interaktif

document.addEventListener('DOMContentLoaded', function() {
    // ==================== LIGHTBOX ====================
    const modal = document.getElementById('lightboxModal');
    const lightboxImg = document.getElementById('lightboxImg');
    const closeBtn = document.querySelector('.close-lightbox');
    
    if (modal && lightboxImg && closeBtn) {
        const galleryImgs = document.querySelectorAll('.gallery-item');
        galleryImgs.forEach(img => {
            img.addEventListener('click', () => {
                lightboxImg.src = img.src;
                modal.style.display = 'flex';
            });
        });
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.style.display = 'none';
        });
    }

    // ==================== SLIDER SIMULASI POS JALUR ====================
    const slider = document.getElementById('routeSlider');
    const posNameSpan = document.getElementById('posNameDisplay');
    const posDetailDiv = document.getElementById('posDetailInfo');
    
    if (slider && posNameSpan && posDetailDiv) {
        // Data pos sesuai dengan tabel
        const routePoints = [
            { name: "Basecamp Tamiajeng (690 mdpl)", detail: "Start pendakian. Pastikan izin lengkap, bawa air minimal 2-3L. Fasilitas lengkap dan area parkir." },
            { name: "Pos 1 (sekitar 750 mdpl)", detail: "Jalan aspal/paving, melewati pemukiman & kebun. Medan ringan, waktu tempuh 15-20 menit." },
            { name: "Pos 2 (sekitar 850 mdpl)", detail: "Jalur tanah mulai menanjak landai, vegetasi hutan mulai terlihat. Estimasi 30-45 menit." },
            { name: "Pos 3 (sekitar 1050 mdpl)", detail: "Tanjakan mulai terasa, jalur di antara pepohonan. Waktu tempuh 30-40 menit." },
            { name: "Pos 4 (sekitar 1250 mdpl)", detail: "Jalur tanah berbatu, tanjakan cukup konstan. Waktu 30-45 menit." },
            { name: "Puncak Bayangan (sekitar 1450 mdpl)", detail: "Area landai luas, spot camp favorit! BATAS AKHIR MENDIRIKAN TENDA. Dilarang camp di puncak Pawitra." },
            { name: "Puncak Pawitra (1.653 mdpl)", detail: "Jalur scree sangat terjal, batuan lepas dan licin. Extra hati-hati, estimasi 45-60 menit. Pemandangan 360°." }
        ];
        
        function updateSlider(value) {
            const idx = parseInt(value, 10);
            const point = routePoints[idx];
            posNameSpan.innerHTML = `<i class="fas fa-location-dot"></i> ${point.name}`;
            posDetailDiv.innerHTML = `<strong>${point.name}</strong><br>${point.detail}`;
        }
        
        slider.addEventListener('input', (e) => updateSlider(e.target.value));
        updateSlider(0); // set default
    }
    
    // Pesan di console (opsional)
    console.log("Website Gunung Penanggungan siap! Jangan lupa bawa pakaian kering cadangan.");
});