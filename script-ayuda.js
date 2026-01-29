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

    // 2. ANIMACIÓN FADE IN HERO
    const hero = document.querySelector('.hero-content');
    setTimeout(() => {
        if(hero) hero.style.opacity = '1';
        if(hero) hero.style.transform = 'translateY(0)';
    }, 100);


    // =====================================================
    // 3. LÓGICA DEL WIDGET DE RESPIRACIÓN (CONTINUO)
    // =====================================================
    const breathCircle = document.getElementById('breathCircle');
    const breathLabel = document.getElementById('breathLabel');
    const breathTimer = document.getElementById('breathTimer');
    const breathBtn = document.getElementById('breathBtn');

    if (breathBtn) { 

        // Configuración
        const PHASE_DURATION = 4000; // 4 segundos
        const UPDATE_INTERVAL = 50;  // Fluidez
        
        const MIN_SIZE = 100; 
        const MAX_SIZE = 250; 
        const SIZE_DIFF = MAX_SIZE - MIN_SIZE;

        // Variables de estado
        let currentPhase = 0; // 0:Inhala, 1:Sostén, 2:Exhala, 3:Sostén
        let progressTime = 0; 
        let intervalId = null;
        let isPressing = false;

        // Textos para cada fase
        const phases = [
            { label: "Inhala", action: "grow", color: "var(--azul-palido)" },
            { label: "Sostén", action: "hold-full", color: "#cce0e3" },
            { label: "Exhala", action: "shrink", color: "var(--azul-palido)" },
            { label: "Sostén", action: "hold-empty", color: "#cce0e3" }
        ];

        // --- Actualiza el estado visual MIENTRAS se presiona ---
        function updateBreathingState() {
            progressTime += UPDATE_INTERVAL;
            
            // Si pasamos el tiempo de la fase, cambiamos a la siguiente SIN PARAR
            if (progressTime >= PHASE_DURATION) {
                nextPhase();
                return; // Salimos para que el siguiente ciclo maneje el inicio de la nueva fase
            }

            // Calcular % completado
            let percentComplete = progressTime / PHASE_DURATION;
            
            // Timer visual (4.0s bajando)
            let timeLeft = ((PHASE_DURATION - progressTime) / 1000).toFixed(1);
            breathTimer.innerText = timeLeft + "s";

            const currentConfig = phases[currentPhase];
            
            // Lógica de tamaño
            if (currentConfig.action === "grow") {
                let newSize = MIN_SIZE + (SIZE_DIFF * percentComplete);
                breathCircle.style.width = `${newSize}px`;
                breathCircle.style.height = `${newSize}px`;

            } else if (currentConfig.action === "shrink") {
                let newSize = MAX_SIZE - (SIZE_DIFF * percentComplete);
                breathCircle.style.width = `${newSize}px`;
                breathCircle.style.height = `${newSize}px`;
            
            } else if (currentConfig.action === "hold-full") {
                breathCircle.style.width = `${MAX_SIZE}px`;
                breathCircle.style.height = `${MAX_SIZE}px`;
            
            } else if (currentConfig.action === "hold-empty") {
                breathCircle.style.width = `${MIN_SIZE}px`;
                breathCircle.style.height = `${MIN_SIZE}px`;
            }
            
            breathCircle.style.backgroundColor = currentConfig.color;
        }

        // --- Cambiar de fase (Automático) ---
        function nextPhase() {
            progressTime = 0; // Reiniciamos contador interno
            currentPhase = (currentPhase + 1) % 4; // Pasamos a la siguiente fase
            
            // Actualizamos textos
            breathLabel.innerText = phases[currentPhase].label;
            breathTimer.innerText = "4.0s";
            
            // Nota: NO llamamos a stopPressing() aquí, así que el bucle sigue corriendo.
        }

        // --- Eventos del Botón ---

        function startPressing(e) {
            if(e.cancelable) e.preventDefault(); // Evitar scroll o menú contextual en móvil
            
            if (!isPressing) {
                isPressing = true;
                breathBtn.classList.add('is-pressing');
                breathBtn.innerHTML = `<i class="fas fa-fingerprint"></i> Soltar para Pausar`;
                
                // Iniciar bucle
                intervalId = setInterval(updateBreathingState, UPDATE_INTERVAL);
            }
        }

        function stopPressing() {
            if (isPressing) {
                isPressing = false;
                breathBtn.classList.remove('is-pressing');
                breathBtn.innerHTML = `<i class="fas fa-fingerprint"></i> Mantén para Continuar`;
                
                clearInterval(intervalId); 
                intervalId = null;
            }
        }

        // Mouse (PC)
        breathBtn.addEventListener('mousedown', startPressing);
        breathBtn.addEventListener('mouseup', stopPressing);
        breathBtn.addEventListener('mouseleave', stopPressing);

        // Táctil (Móvil)
        breathBtn.addEventListener('touchstart', startPressing, { passive: false });
        breathBtn.addEventListener('touchend', stopPressing);
        breathBtn.addEventListener('touchcancel', stopPressing);
    }
});