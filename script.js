// Wedding Date
const WEDDING_DATE = new Date('July 25, 2026 09:00:00').getTime();

// DOM Elements
const introVideoOverlay = document.getElementById('introVideoOverlay');
const introVideo = document.getElementById('introVideo');
const tapHint = document.getElementById('tapHint');
const mainContent = document.getElementById('mainContent');
const musicToggle = document.getElementById('musicToggle');
const themeToggle = document.getElementById('themeToggle');
const backgroundMusic = document.getElementById('backgroundMusic');
const rsvpForm = document.getElementById('rsvpForm');
const mapSection = document.getElementById('mapSection');
const confettiCanvas = document.getElementById('confettiCanvas');

// Initialize
let isMusicPlaying = false;
let isDayTheme = true;
let hasStartedVideo = false;

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

// Intro Video - Tap to Start
introVideoOverlay.addEventListener('click', () => {
    if (hasStartedVideo) return;
    
    hasStartedVideo = true;
    tapHint.style.display = 'none';
    
    // Unmute and play video
    introVideo.muted = false;
    introVideo.play().catch(e => {
        console.log('Video play failed:', e);
        // If autoplay fails, just continue
        introVideo.muted = true;
        introVideo.play();
    });
    
    // When video ends, reveal the main content
    introVideo.addEventListener('ended', () => {
        introVideoOverlay.classList.add('hidden');
        
        // Start confetti
        setTimeout(() => {
            startConfetti();
        }, 500);
        
        // Start music automatically when main content appears
        if (!isMusicPlaying) {
            backgroundMusic.play().catch(e => console.log('Audio play failed:', e));
            isMusicPlaying = true;
            musicToggle.classList.remove('muted');
        }
    });
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
    // Initialize confetti
    initConfetti();
    
    // Stop confetti initially (will start when video ends)
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
document.querySelectorAll('.countdown-section, .story-section, .rsvp-section, .map-section, .gallery-section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(50px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(section);
});
