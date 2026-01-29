document.addEventListener('DOMContentLoaded', () => {
    
    // MENU HAMBURGUESA
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            console.log("Hamburguesa clickeada"); // Esto te ayuda a saber si detecta el clic
            navLinks.classList.toggle('nav-active');
            menuToggle.classList.toggle('toggle');
        });
    }

    // 2. ACORDEÓN DE TIPOS
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            
            // Cierra los demás para que solo uno esté abierto a la vez
            document.querySelectorAll('.accordion-content').forEach(item => {
                if (item !== content) {
                    item.style.maxHeight = null;
                }
            });

            // Abre o cierra el actual
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });

    // 3. ANIMACIONES AL HACER SCROLL (Intersection Observer)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    animatedElements.forEach(el => observer.observe(el));

    // Forzar aparición inicial del hero
    setTimeout(() => {
        const hero = document.querySelector('.hero-content');
        if(hero) hero.classList.add('visible');
    }, 100);
});