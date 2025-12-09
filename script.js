// 1. INTRO LOGIC
const bioText = "Kenalin, Aku Rofi. Aku memiliki kemampuan logika software Progamming dan Hardware Progamming.";

window.addEventListener('load', () => {
    // Cek Dark Mode Preference
    if(localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        updateIcons('dark');
    } else {
        updateIcons('light');
    }

    // PAKSA MUNCULKAN TOMBOL SETELAH 0.5 DETIK
    setTimeout(() => {
        document.querySelectorAll('.bar-fill').forEach(bar => bar.style.width = bar.getAttribute('data-width'));
        const actions = document.getElementById('introActions');
        if(actions) {
            actions.style.opacity = '1';
            actions.style.pointerEvents = 'auto';
        }
    }, 500);

    // Animasi Ngetik
    let i = 0; const speed = 30;
    function typeWriter() {
        if (i < bioText.length) { 
            const bio = document.getElementById("bio-typewriter");
            if(bio) bio.innerHTML += bioText.charAt(i); 
            i++; 
            setTimeout(typeWriter, speed); 
        }
    }
    setTimeout(typeWriter, 500);
});

function enterSite() {
    const overlay = document.getElementById('intro-overlay');
    // Animasi masuk tanpa suara
    gsap.to(overlay, { 
        duration: 0.8, opacity: 0, y: -50, ease: "power2.inOut", 
        onComplete: () => { 
            overlay.style.display = 'none'; 
            gsap.from(".gs-anim", { y: 30, opacity: 0, duration: 1, stagger: 0.1 }); 
        } 
    });
}

// 2. TOGGLE THEME
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    
    if(document.body.classList.contains('dark-mode')){
        localStorage.setItem('theme', 'dark');
        updateIcons('dark');
    } else {
        localStorage.setItem('theme', 'light');
        updateIcons('light');
    }
}

function updateIcons(mode) {
    const floatIcon = document.getElementById('themeIcon');
    // Intro theme button deleted in HTML, so we don't need to update it here to avoid errors
    if(mode === 'dark') {
        if(floatIcon) floatIcon.classList.replace('bi-moon-stars-fill', 'bi-sun-fill');
    } else {
        if(floatIcon) floatIcon.classList.replace('bi-sun-fill', 'bi-moon-stars-fill');
    }
}

// 3. FORM SUBMISSION (FORMSPREE AJAX)
var form = document.getElementById("my-form");
async function handleSubmit(event) {
    event.preventDefault();
    var status = document.getElementById("my-form-status");
    var btn = document.getElementById("my-form-button");
    var data = new FormData(event.target);
    
    btn.innerHTML = "Mengirim..."; btn.style.opacity = "0.7";

    fetch(event.target.action, {
        method: form.method, body: data, headers: { 'Accept': 'application/json' }
    }).then(response => {
        if (response.ok) {
            status.innerHTML = "Terima kasih! Pesan berhasil dikirim.";
            status.style.color = "var(--primary)";
            form.reset(); btn.innerHTML = "Kirim Pesan"; btn.style.opacity = "1";
        } else {
            status.innerHTML = "Oops! Ada masalah."; status.style.color = "red"; btn.innerHTML = "Coba Lagi";
        }
    }).catch(error => {
        status.innerHTML = "Oops! Ada masalah koneksi."; status.style.color = "red"; btn.innerHTML = "Kirim Pesan";
    });
}
if(form) form.addEventListener("submit", handleSubmit);

// 4. SIDEBAR MENU
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar-nav');
    const backdrop = document.querySelector('.menu-backdrop');
    const btn = document.querySelector('.menu-toggle-btn');
    
    sidebar.classList.toggle('active');
    backdrop.classList.toggle('active');
    
    // Sembunyikan tombol hamburger saat menu terbuka
    if (sidebar.classList.contains('active')) {
        btn.style.opacity = '0'; btn.style.pointerEvents = 'none';
    } else {
        btn.style.opacity = '1'; btn.style.pointerEvents = 'auto';
    }
}

// 5. CURSOR (GSAP SYNCED)
const cursorDot = document.querySelector('.cursor-dot');
const cursorCircle = document.querySelector('.cursor-circle');

// Inisialisasi posisi awal (tengah)
gsap.set(cursorDot, {xPercent: -50, yPercent: -50});
gsap.set(cursorCircle, {xPercent: -50, yPercent: -50});

document.addEventListener('mousemove', (e) => {
    // Dot gerak instan
    gsap.to(cursorDot, { x: e.clientX, y: e.clientY, duration: 0 });
    // Circle gerak smooth tapi cepat (0.15s)
    gsap.to(cursorCircle, { x: e.clientX, y: e.clientY, duration: 0.15 });
});

document.querySelectorAll('.hover-trigger').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
});

// 6. SLIDER
const slider = document.getElementById('slider');
if(slider) {
    let isDown = false; let startX; let scrollLeft;
    slider.addEventListener('mousedown', (e) => { isDown = true; startX = e.pageX - slider.offsetLeft; scrollLeft = slider.scrollLeft; });
    slider.addEventListener('mouseleave', () => { isDown = false; });
    slider.addEventListener('mouseup', () => { isDown = false; });
    slider.addEventListener('mousemove', (e) => { if (!isDown) return; e.preventDefault(); const x = e.pageX - slider.offsetLeft; const walk = (x - startX) * 2; slider.scrollLeft = scrollLeft - walk; });
}