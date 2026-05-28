// Wedding Date
const WEDDING_DATE = new Date('July 25, 2026 09:00:00').getTime();

// DOM Elements
const entryGate = document.getElementById('entry-gate');
const entryVideo = document.getElementById('entry-video');
const playOverlay = document.getElementById('play-overlay');
const mainContent = document.getElementById('main-content');
const audioBtn = document.getElementById('audio-btn');
const iconOn = document.getElementById('icon-on');
const iconOff = document.getElementById('icon-off');
const bgAudio = document.getElementById('bg-audio');
const themeToggle = document.getElementById('themeToggle');
const rsvpForm = document.getElementById('rsvp-form');
const mapSection = document.getElementById('map-section');
const confettiCanvas = document.getElementById('confettiCanvas');

// Initialize
let isMusicPlaying = false;
let isDayTheme = true;
let hasStartedVideo = false;

// Scratch Canvas Setup
const scratchCanvases = [];
const heartContainers = [
    { id: 'heartContainer1', canvasId: 'scratchCanvas1', revealed: false },
    { id: 'heartContainer2', canvasId: 'scratchCanvas2', revealed: false },
    { id: 'heartContainer3', canvasId: 'scratchCanvas3', revealed: false }
];

// Countdown Timer
function updateCountdown() {
    const now = new Date().getTime();
    const distance = WEDDING_DATE - now;
    
    if (distance < 0) {
        document.getElementById('cd-days').textContent = '00';
        document.getElementById('cd-hours').textContent = '00';
        document.getElementById('cd-mins').textContent = '00';
        document.getElementById('cd-secs').textContent = '00';
        return;
    }
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    document.getElementById('cd-days').textContent = String(days).padStart(2, '0');
    document.getElementById('cd-hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('cd-mins').textContent = String(minutes).padStart(2, '0');
    document.getElementById('cd-secs').textContent = String(seconds).padStart(2, '0');
}

// Confetti Animation
class ConfettiParticle {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height - canvas.height;
        this.size = Math.random() * 10 + 5;
        this.speedY = Math.random() * 3 + 2;
        this.speedX = Math.random() * 2 - 1;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 10 - 5;
        this.color = Math.random() > 0.5 ? '#FFD700' : '#C0C0C0';
        this.shape = Math.random() > 0.5 ? 'circle' : 'rect';
    }
    
    update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.rotation += this.rotationSpeed;
        
        if (this.y > this.canvas.height) {
            this.y = -10;
            this.x = Math.random() * this.canvas.width;
        }
    }
    
    draw() {
        this.ctx.save();
        this.ctx.translate(this.x, this.y);
        this.ctx.rotate((this.rotation * Math.PI) / 180);
        this.ctx.fillStyle = this.color;
        
        if (this.shape === 'circle') {
            this.ctx.beginPath();
            this.ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
            this.ctx.fill();
        } else {
            this.ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
        }
        
        this.ctx.restore();
    }
}

let confettiParticles = [];
let confettiAnimationId;

function initConfetti() {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
    
    for (let i = 0; i < 150; i++) {
        confettiParticles.push(new ConfettiParticle(confettiCanvas));
    }
    
    animateConfetti();
}

function animateConfetti() {
    confettiCanvas.getContext('2d').clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    
    confettiParticles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    
    confettiAnimationId = requestAnimationFrame(animateConfetti);
}

function startConfetti() {
    confettiParticles.forEach(particle => {
        particle.y = Math.random() * confettiCanvas.height - confettiCanvas.height;
    });
}

function stopConfetti() {
    cancelAnimationFrame(confettiAnimationId);
    confettiCanvas.getContext('2d').clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
}

// Audio Toggle
audioBtn.addEventListener('click', () => {
    if (isMusicPlaying) {
        bgAudio.pause();
        iconOn.style.display = 'none';
        iconOff.style.display = 'block';
    } else {
        bgAudio.play().catch(e => console.log('Audio play failed:', e));
        iconOn.style.display = 'block';
        iconOff.style.display = 'none';
    }
    isMusicPlaying = !isMusicPlaying;
});

// Theme Toggle
themeToggle.addEventListener('click', () => {
    if (isDayTheme) {
        document.body.classList.remove('day-theme');
        document.body.classList.add('night-theme');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        document.body.classList.remove('night-theme');
        document.body.classList.add('day-theme');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
    isDayTheme = !isDayTheme;
});

// Scratch Canvas Functions
function initScratchCanvas(container, canvasId) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext('2d');
    const containerEl = document.getElementById(container);
    
    const rect = containerEl.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    
    // Gold shimmer gradient for scratch layer
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#FFD700');
    gradient.addColorStop(0.25, '#E8C07A');
    gradient.addColorStop(0.5, '#F5E4C0');
    gradient.addColorStop(0.75, '#E8C07A');
    gradient.addColorStop(1, '#FFD700');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add small gold hearts pattern
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    for (let i = 0; i < 30; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = Math.random() * 12 + 4;
        drawHeart(ctx, x, y, size);
    }
    
    let isDrawing = false;
    let isRevealed = false;
    let totalPixels = canvas.width * canvas.height;
    let clearedPixels = 0;
    let checkThreshold = 0;
    
    function getMousePos(e) {
        const rect = canvas.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        return {
            x: clientX - rect.left,
            y: clientY - rect.top
        };
    }
    
    function scratch(x, y) {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(x, y, 25, 0, Math.PI * 2);
        ctx.fill();
        
        if (!isRevealed) {
            checkThreshold++;
            if (checkThreshold % 5 === 0) {
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const pixels = imageData.data;
                clearedPixels = 0;
                for (let i = 3; i < pixels.length; i += 4) {
                    if (pixels[i] === 0) clearedPixels++;
                }
                
                const percentCleared = (clearedPixels / totalPixels) * 100;
                if (percentCleared > 35) {
                    isRevealed = true;
                    containerEl.revealed = true;
                    canvas.style.opacity = '0';
                    setTimeout(() => { canvas.style.display = 'none'; }, 1000);
                    checkAllRevealed();
                }
            }
        }
    }
    
    function drawHeart(ctx, x, y, size) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.bezierCurveTo(x - size/2, y - size/2, x - size, y + size/3, x, y + size);
        ctx.bezierCurveTo(x + size, y + size/3, x + size/2, y - size/2, x, y);
        ctx.fill();
    }
    
    canvas.addEventListener('mousedown', (e) => {
        isDrawing = true;
        const pos = getMousePos(e);
        scratch(pos.x, pos.y);
    });
    
    canvas.addEventListener('mousemove', (e) => {
        if (!isDrawing) return;
        const pos = getMousePos(e);
        scratch(pos.x, pos.y);
    });
    
    canvas.addEventListener('mouseup', () => { isDrawing = false; });
    canvas.addEventListener('mouseleave', () => { isDrawing = false; });
    
    canvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        isDrawing = true;
        const pos = getMousePos(e);
        scratch(pos.x, pos.y);
    });
    
    canvas.addEventListener('touchmove', (e) => {
        e.preventDefault();
        if (!isDrawing) return;
        const pos = getMousePos(e);
        scratch(pos.x, pos.y);
    });
    
    canvas.addEventListener('touchend', () => { isDrawing = false; });
    
    return { canvas, ctx, isRevealed: () => isRevealed };
}

function checkAllRevealed() {
    const allRevealed = heartContainers.every(hc => {
        const el = document.getElementById(hc.id);
        return el && el.revealed;
    });
    
    if (allRevealed) {
        const heartsRow = document.getElementById('heartsRow');
        if (heartsRow) {
            heartsRow.classList.add('unlocked');
        }
        
        setTimeout(() => {
            const msg = document.getElementById('surpriseMessage');
            if (msg) msg.classList.add('revealed');
        }, 300);
        
        setTimeout(() => {
            const cd = document.getElementById('countdown-container');
            if (cd) cd.classList.add('revealed');
        }, 800);
        
        setTimeout(() => {
            startConfetti();
            fireConfettiBurst();
        }, 500);
    }
}

function fireConfettiBurst() {
    if (typeof confetti !== 'undefined') {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#FFD700', '#E8C07A', '#CC5500', '#FFFFFF']
        });
    }
}

// Entry Gate - Tap to Start
entryGate.addEventListener('click', () => {
    if (hasStartedVideo) return;
    
    hasStartedVideo = true;
    playOverlay.classList.add('hidden');
    
    entryVideo.muted = false;
    entryVideo.play().catch(e => {
        console.log('Video play failed:', e);
        entryVideo.muted = true;
        entryVideo.play();
    });
    
    entryVideo.addEventListener('ended', () => {
        entryGate.classList.add('fade-out');
        mainContent.classList.add('visible');
        
        setTimeout(() => {
            initScratchCanvases();
        }, 500);
        
        if (!isMusicPlaying) {
            bgAudio.play().catch(e => console.log('Audio play failed:', e));
            isMusicPlaying = true;
            iconOn.style.display = 'block';
            iconOff.style.display = 'none';
        }
    });
});

function initScratchCanvases() {
    heartContainers.forEach(hc => {
        const scratchObj = initScratchCanvas(hc.id, hc.canvasId);
        scratchCanvases.push(scratchObj);
    });
}

// RSVP Form Submission
rsvpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const submitBtn = document.getElementById('submit-btn');
    const btnText = document.getElementById('btn-text');
    const btnSpinner = document.getElementById('btn-spinner');
    
    submitBtn.disabled = true;
    btnText.textContent = 'Sending...';
    btnSpinner.style.display = 'inline-block';
    
    const formData = new FormData(rsvpForm);
    const rsvpData = Object.fromEntries(formData);
    
    setTimeout(() => {
        alert(`Thank you ${rsvpData.name || 'guest'}! Your RSVP has been submitted successfully. We look forward to celebrating with you!`);
        
        rsvpForm.reset();
        
        submitBtn.disabled = false;
        btnText.textContent = 'Send Love';
        btnSpinner.style.display = 'none';
        
        mapSection.style.display = 'block';
        
        mapSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        console.log('RSVP Data:', rsvpData);
        
        fireConfettiBurst();
    }, 1500);
});

// Intersection Observer for reveal animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, observerOptions);

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initConfetti();
    stopConfetti();
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
    
    window.addEventListener('resize', () => {
        confettiCanvas.width = window.innerWidth;
        confettiCanvas.height = window.innerHeight;
        
        scratchCanvases.length = 0;
        heartContainers.forEach(hc => {
            const canvas = document.getElementById(hc.canvasId);
            if (canvas) {
                const containerEl = document.getElementById(hc.id);
                const rect = containerEl.getBoundingClientRect();
                canvas.width = rect.width;
                canvas.height = rect.height;
            }
        });
    });
    
    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });
});

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Radio pill selection
document.querySelectorAll('.radio-pill').forEach(pill => {
    pill.addEventListener('click', function() {
        const radio = this.querySelector('input[type="radio"]');
        if (radio) {
            radio.checked = true;
            this.parentElement.querySelectorAll('.radio-pill').forEach(p => p.classList.remove('selected'));
            this.classList.add('selected');
        }
    });
});
