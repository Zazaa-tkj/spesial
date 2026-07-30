// ===== LOGIN =====
function cekLogin() {
    const jawaban = document.getElementById('jawaban-login').value.toLowerCase().trim();
    const clean = jawaban.replace(/\s+/g, '');
    if (clean === 'ika') {
        document.getElementById('halaman-login').classList.add('hilang');
        const loading = document.getElementById('loadingOverlay');
        loading.classList.add('show');
        const progressBar = document.getElementById('progressBar');
        const progressLabel = document.getElementById('progressLabel');
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 6 + 2;
            if (progress > 100) progress = 100;
            progressBar.style.width = progress + '%';
            progressLabel.textContent = Math.round(progress) + '%';
            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    loading.classList.remove('show');
                    document.getElementById('app').style.display = 'block';
                    mulaiKonfeti();
                    navigateTo('home');
                    setTimeout(() => {
                        const goldLock = document.getElementById('goldLock');
                        goldLock.classList.add('show');
                        goldLock.style.animation = 'floatGold 1.5s ease forwards';
                        setTimeout(() => {
                            goldLock.style.animation = 'goldPulse 2.5s ease-in-out infinite';
                        }, 1500);
                    }, 800);
                }, 400);
            }
        }, 150);
    } else {
        const error = document.getElementById('pesan-error');
        error.style.display = 'block';
        error.innerHTML = '🤍 Aduh, aku nggak kenal kamu...<span class="clue">💡 Coba tulis namamu, sayang. Aku hanya untukmu.</span>';
        document.getElementById('jawaban-login').value = '';
        document.getElementById('jawaban-login').focus();
        error.style.animation = 'none';
        setTimeout(() => { error.style.animation = 'naikPelan 0.5s ease'; }, 10);
    }
}

document.getElementById('jawaban-login').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') cekLogin();
});

// ===== NAVIGASI =====
const slides = {
    home: 'slide-home',
    surat: 'slide-surat',
    timeline: 'slide-timeline',
    puisi: 'slide-puisi',
    novel: 'slide-novel',
    galeri: 'slide-galeri',
    kado: 'slide-kado'
};

function navigateTo(slideId) {
    document.querySelectorAll('.slide').forEach(s => s.classList.remove('active'));
    const target = document.getElementById(slides[slideId]);
    if (target) {
        target.classList.add('active');
        document.getElementById('slidesWrapper').scrollTop = 0;
    }
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.toggle('active', item.dataset.slide === slideId);
    });
}

document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function() {
        navigateTo(this.dataset.slide);
    });
});

// ===== KONFETI =====
function mulaiKonfeti() {
    if (typeof confetti === 'function') {
        const durasi = 5 * 1000,
            akhir = Date.now() + durasi;
        (function tembak() {
            confetti({
                particleCount: 3,
                spread: 40,
                origin: { y: 0.6 },
                colors: ['#5B9BD5', '#87CEEB', '#B5D8F7', '#D4E9FA', '#FFFFFF', '#FFE066']
            });
            if (Date.now() < akhir) requestAnimationFrame(tembak);
        })();
    }
}

// ===== KADO =====
let kadoTerbuka = false;

function bukaKado() {
    if (kadoTerbuka) return;
    kadoTerbuka = true;
    const kotak = document.getElementById('kotakKado');
    const pesan = document.getElementById('pesanKado');
    kotak.classList.add('terbuka');
    kotak.textContent = '💝';
    setTimeout(() => {
        pesan.classList.add('muncul');
        if (typeof confetti === 'function') {
            confetti({
                particleCount: 80,
                spread: 70,
                origin: { y: 0.4 },
                colors: ['#5B9BD5', '#87CEEB', '#FFE066', '#B5D8F7', '#FFFFFF']
            });
        }
        setTimeout(() => {
            const goldLock = document.getElementById('goldLock');
            goldLock.style.animation = 'none';
            goldLock.style.transform = 'scale(0) rotate(-30deg)';
            goldLock.style.opacity = '0';
            setTimeout(() => {
                goldLock.classList.add('show');
                goldLock.style.animation = 'floatGold 1.8s ease forwards';
                setTimeout(() => {
                    goldLock.style.animation = 'goldPulse 2.5s ease-in-out infinite';
                }, 1800);
            }, 100);
        }, 1200);
    }, 700);
}

// ===== LOGIN RAHASIA =====
const PASSWORD_RAHASIA = "sayang";

function bukaLoginRahasia() {
    document.getElementById('loginRahasia').classList.add('show');
    document.getElementById('passwordRahasia').value = '';
    document.getElementById('passwordRahasia').focus();
    document.getElementById('error-rahasia').style.display = 'none';
}

function tutupLoginRahasia() {
    document.getElementById('loginRahasia').classList.remove('show');
}

function cekLoginRahasia() {
    const input = document.getElementById('passwordRahasia').value.trim();
    if (input === PASSWORD_RAHASIA) {
        document.getElementById('loginRahasia').classList.remove('show');
        setTimeout(() => {
            document.getElementById('page-rahasia').classList.add('show');
            if (typeof confetti === 'function') {
                confetti({
                    particleCount: 80,
                    spread: 70,
                    origin: { y: 0.5 },
                    colors: ['#FFD700', '#FFE066', '#FFC800', '#FFB800', '#FFA500']
                });
            }
            const lock = document.getElementById('goldLock');
            lock.querySelector('.lock-icon').textContent = '🔓';
            lock.style.animation = 'goldPulse 2.5s ease-in-out infinite';
            lock.style.boxShadow = '0 8px 40px rgba(255, 215, 0, 0.3), 0 0 60px rgba(255, 215, 0, 0.1)';
        }, 400);
    } else {
        const error = document.getElementById('error-rahasia');
        error.style.display = 'block';
        error.textContent = '🤍 Kata sandi salah. Coba lagi ya...';
        document.getElementById('passwordRahasia').value = '';
        document.getElementById('passwordRahasia').focus();
        error.style.animation = 'none';
        setTimeout(() => { error.style.animation = 'naikPelan 0.5s ease'; }, 10);
    }
}

document.getElementById('passwordRahasia').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') cekLoginRahasia();
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        tutupLoginRahasia();
    }
});

// ===== PAGE RAHASIA =====
function tutupRahasia() {
    document.getElementById('page-rahasia').classList.remove('show');
    setTimeout(() => {
        const lock = document.getElementById('goldLock');
        lock.querySelector('.lock-icon').textContent = '🔒';
        lock.style.boxShadow = '0 8px 32px rgba(255, 215, 0, 0.15), 0 0 0 1px rgba(255, 215, 0, 0.08)';
    }, 300);
}

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        tutupRahasia();
    }
});

// ===== INIT =====
window.addEventListener('load', function() {
    document.getElementById('jawaban-login').focus();
});

console.log('🌤️ Happy Sweet Seventeen, Ika Sayang! 🤍');
console.log('🔒 Cari gembok emas di pojok kanan atas setelah buka kado...');
console.log('🔑 Password rahasia: "sayang" (huruf kecil)');