window.addEventListener('load', function() {
    const loader = document.getElementById('loader');
    const mainContent = document.getElementById('main-content');
    const body = document.body;

    // Elementos
    const video = document.getElementById('bg-video');
    const playBtn = document.getElementById('btn-play-pause');
    const volumeBtn = document.getElementById('btn-volume');
    const container = document.getElementById('video-container');
    const enterLink = document.querySelector('.enter-link'); // El enlace de texto
    
    // UI Elements
    const uiElements = document.querySelectorAll('.user-interface');

    // Iconos
    const iconPlay = document.getElementById('icon-play');
    const iconPause = document.getElementById('icon-pause');
    const iconReplay = document.getElementById('icon-replay');
    const iconVolUp = document.getElementById('icon-vol-up');
    const iconVolOff = document.getElementById('icon-vol-off');

    // Funciones
    function hideUI() {
        uiElements.forEach(el => el.classList.add('ui-hidden'));
    }

    function showUI() {
        uiElements.forEach(el => el.classList.remove('ui-hidden'));
    }

    // 1. LOADER
    // CAMBIO AQUÍ: Tiempo reducido a 2000ms (2 segundos)
    setTimeout(function() {
        loader.classList.add('loader-hidden');
        if (mainContent) {
             mainContent.style.display = 'block';
             body.style.overflow = 'hidden'; 
             setTimeout(() => {
                mainContent.classList.add('visible');
             }, 50);
        }
        loader.addEventListener('transitionend', function() {
             loader.remove(); 
        });
    }, 2000); 

    // 2. FUNCIÓN MAESTRA DE PLAY/PAUSE
    function toggleVideoState() {
        if (video.paused || video.ended) {
            // ACCIÓN: REPRODUCIR
            video.play();
            iconPlay.classList.add('hidden');
            iconReplay.classList.add('hidden');
            iconPause.classList.remove('hidden');
            playBtn.style.opacity = '1';
            hideUI(); // Ocultamos todo para modo inmersivo
        } else {
            // ACCIÓN: PAUSAR
            video.pause();
            iconPause.classList.add('hidden');
            iconPlay.classList.remove('hidden');
            showUI(); // Mostramos controles
        }
    }

    // 3. LISTENERS
    
    // Clic en el botón central
    playBtn.addEventListener('click', function(e) {
        e.stopPropagation(); // Evita doble disparo
        toggleVideoState();
    });

    // Clic en toda la pantalla
    container.addEventListener('click', function() {
        toggleVideoState();
    });

    // IMPORTANTE: Evitar que el clic en el enlace de texto pause el video
    if(enterLink){
        enterLink.addEventListener('click', function(e) {
            e.stopPropagation(); // El clic no llega al contenedor
            // Dejamos que el enlace funcione y cambie de página
        });
    }

    // 4. VIDEO TERMINADO
    video.addEventListener('ended', function() {
        iconPause.classList.add('hidden');
        iconPlay.classList.add('hidden');
        iconReplay.classList.remove('hidden');
        showUI();
    });

    // 5. VOLUMEN
    video.muted = false; 
    volumeBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        if (video.muted) {
            video.muted = false;
            iconVolOff.classList.add('hidden');
            iconVolUp.classList.remove('hidden');
        } else {
            video.muted = true;
            iconVolUp.classList.add('hidden');
            iconVolOff.classList.remove('hidden');
        }
    });
});