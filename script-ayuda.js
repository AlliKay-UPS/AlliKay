document.addEventListener('DOMContentLoaded', () => {
    
    // 1. MENU HAMBURGUESA
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('nav-active');
            menuToggle.classList.toggle('toggle');
        });
    }

    // 2. ANIMACIÓN FADE IN
    const hero = document.querySelector('.hero-content');
    setTimeout(() => {
        if(hero) hero.style.opacity = '1';
        if(hero) hero.style.transform = 'translateY(0)';
    }, 100);
});