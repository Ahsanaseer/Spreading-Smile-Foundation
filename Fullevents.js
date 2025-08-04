// Carousel functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-image');
const dots = document.querySelectorAll('.carousel-dot');
const totalSlides = slides.length;

function showSlide(n) {
    const carousel = document.getElementById('carousel-images');
    currentSlide = (n + totalSlides) % totalSlides;
    
    carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    // Update dots
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function changeSlide(direction) {
    showSlide(currentSlide + direction);
}

function goToSlide(n) {
    showSlide(n);
}

// Auto-advance carousel every 5 seconds
setInterval(() => {
    changeSlide(1);
}, 5000);

// Touch/swipe support for mobile
let startX = 0;
let endX = 0;

const carousel = document.getElementById('carousel-images');

carousel.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

carousel.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = startX - endX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            changeSlide(1); // Swipe left - next
        } else {
            changeSlide(-1); // Swipe right - previous
        }
    }
}