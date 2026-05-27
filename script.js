// Wedding Date
const WEDDING_DATE = new Date('July 25, 2026 09:00:00').getTime();

// DOM Elements
const envelopeContainer = document.getElementById('envelopeContainer');
const envelope = document.querySelector('.envelope');
const openEnvelopeBtn = document.getElementById('openEnvelope');
const mainContent = document.getElementById('mainContent');
const musicToggle = document.getElementById('musicToggle');
const themeToggle = document.getElementById('themeToggle');
const backgroundMusic = document.getElementById('backgroundMusic');
const rsvpForm = document.getElementById('rsvpForm');
const mapSection = document.getElementById('mapSection');
const scratchCard = document.getElementById('scratchCard');
const scratchCanvas = document.getElementById('scratchCanvas');
const confettiCanvas = document.getElementById('confettiCanvas');

// Initialize
let isMusicPlaying = false;
let isDayTheme = true;
let isScratched = false;

// Scratch Card Functionality
function initScratchCard() {
    const ctx = scratchCanvas.getContext('2d');
    const rect = scratchCard.getBoundingClientRect();
    
    scratchCanvas.width = rect.width;
    scratchCanvas.height = rect.height;
    
    // Fill with silver/gold gradient
    const gradient = ctx.createLinearGradient(0, 0, scratchCanvas.width, scratchCanvas.height);
    gradient.addColorStop(0, '#C0C0C0');
    gradient.addColorStop(0.5, '#FFD700');
    gradient.addColorStop(1, '#C0C0C0');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, scratchCanvas.width, scratchCanvas.height);
    
    // Add text
    ctx.fillStyle = '#654321';
    ctx.font = 'bold 18px Playfair Display';
    ctx.textAlign = 'center';
    ctx.fillText('Scratch to reveal', scratchCanvas.width / 2, scratchCanvas.height / 2);
    
    let isDrawing = false;
    
    function scratch(e) {
        if (!isDrawing) return;
        
        const rect = scratchCanvas.getBoundingClientRect();
        const x = (e.clientX || e.touches[0].clientX) - rect.left;
        const y = (e.clientY || e.touches[0].clientY) - rect.top;
        
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(x, y, 20, 0, Math.PI * 2);
        ctx.fill();
        
        checkScratchProgress();
    }
    
    function startScratch(e) {
        isDrawing = true;
        scratch(e);
    }
    
    function stopScratch() {
        isDrawing = false;
    }
    
    scratchCanvas.addEventListener('mousedown', startScratch);
    scratchCanvas.addEventListener('touchstart', startScratch);
    scratchCanvas.addEventListener('mousemove', scratch);
    scratchCanvas.addEventListener('touchmove', scratch);
    scratchCanvas.addEventListener('mouseup', stopScratch);
    scratchCanvas.addEventListener('touchend', stopScratch);
    scratchCanvas.addEventListener('mouseleave', stopScratch);
}

function checkScratchProgress() {
    const ctx = scratchCanvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, scratchCanvas.width, scratchCanvas.height);
    const pixels = imageData.data;
    let transparentPixels = 0;
    
    for (let i = 3; i < pixels.length; i += 4) {
        if (pixels[i] === 0) {
            transparentPixels++;
        }
    }
    
    const percentage = (transparentPixels / (pixels.length / 4)) * 100;
    
    if (percentage > 40 && !isScratched) {
        isScratched = true;
        scratchCanvas.style.transition = 'opacity 1s ease';
        scratchCanvas.style.opacity = '0';
        setTimeout(() => {
            scratchCanvas.style.display = 'none';
        }, 1000);
    }
}

// Countdown Timer
function updateCountdown() {
    const now = new Date().getTime();
    const distance = WEDDING_DATE - now;
    
    if (distance < 0) {
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        return;
    }
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
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
        this.color = Math.random() > 0.5 ? '#FFD700' : '#C0C0C0'; // Gold or Silver
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

// Music Toggle
musicToggle.addEventListener('click', () => {
    if (isMusicPlaying) {
        backgroundMusic.pause();
        musicToggle.classList.add('muted');
        musicToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
    } else {
        backgroundMusic.play().catch(e => console.log('Audio play failed:', e));
        musicToggle.classList.remove('muted');
        musicToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
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

// Envelope Opening
openEnvelopeBtn.addEventListener('click', () => {
    envelope.classList.add('open');
    
    // Start confetti after envelope opens
    setTimeout(() => {
        startConfetti();
    }, 1500);
    
    // Hide envelope and show main content
    setTimeout(() => {
        envelopeContainer.classList.add('hidden');
        mainContent.style.display = 'block';
        
        // Start music automatically when main content appears
        if (!isMusicPlaying) {
            backgroundMusic.play().catch(e => console.log('Audio play failed:', e));
            isMusicPlaying = true;
            musicToggle.classList.remove('muted');
        }
    }, 2000);
});

// RSVP Form Submission
rsvpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(rsvpForm);
    const rsvpData = Object.fromEntries(formData);
    
    // Show success message
    alert(`Thank you ${rsvpData.fullName}! Your RSVP has been submitted successfully. We look forward to celebrating with you!`);
    
    // Reset form
    rsvpForm.reset();
    
    // Reveal map section
    mapSection.style.display = 'block';
    
    // Scroll to map section smoothly
    mapSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    
    // Log data (in production, send to server)
    console.log('RSVP Data:', rsvpData);
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Set initial theme
    document.body.classList.add('day-theme');
    
    // Initialize scratch card
    initScratchCard();
    
    // Initialize confetti
    initConfetti();
    
    // Stop confetti initially (will start when envelope opens)
    stopConfetti();
    
    // Update countdown immediately and then every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
    
    // Handle window resize for confetti
    window.addEventListener('resize', () => {
        confettiCanvas.width = window.innerWidth;
        confettiCanvas.height = window.innerHeight;
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

// Add scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections for scroll animations
document.querySelectorAll('.countdown-section, .story-section, .venue-section, .rsvp-section, .gallery-section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(50px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(section);
});
