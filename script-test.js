// === MENÚ HAMBURGUESA Y INICIALIZACIÓN ===
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Lógica del Menú Hamburguesa
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('nav-active');
            menuToggle.classList.toggle('toggle');
        });
    }

    // 2. INICIAR PRE-CARGA DE IMÁGENES (NUEVO)
    preloadImages();
});

// === DATOS DEL JUEGO ===
const gameData = {
    social: {
        title: "El Desafío Social",
        steps: [
            {
                img: 'nudo.png', 
                title: "La Llegada",
                text: "Llegas a la fiesta. La música está alta. Sientes un nudo en el estómago al cruzar la puerta.",
                options: [{ text: "Ir a una esquina y mirar el móvil.", score: 1 }, { text: "Buscar al anfitrión para saludar.", score: 0 }]
            },
            { img: 'cine.png', title: "El Círculo", text: "Te preguntan por una película que no viste.", options: [{text:"Mentir y decir que sí.",score:1},{text:"Admitir que no la viste.",score:0}]},
            { img: 'chiste.png', title: "Silencio", text: "Haces un chiste y nadie se ríe.", options: [{text:"Pensar que te odian.",score:1},{text:"Reírte de ti mismo.",score:0}]},
            { img: 'mirar.png', title: "Miradas", text: "Dos personas susurran cerca.", options: [{text:"Creer que hablan mal de ti.",score:1},{text:"Ignorarlo.",score:0}]},
            { img: 'irse.png', title: "Salida", text: "Hora de irse.", options: [{text:"Huir sin despedirse.",score:1},{text:"Despedirse de quien puedas.",score:0}]}
        ]
    },
    exam: {
        title: "La Presión del Examen",
        steps: [
              {
                img: 'noche.png',
                title: "La Noche Anterior",
                text: "Es la noche antes del final. Llevas horas estudiando sin parar.",
                options: [{ text: "Quedarte hasta las 4 AM.", score: 1 }, { text: "Dormir para descansar.", score: 0 }]
            },
            { img: 'formulas.png', title: "Pasillo", text: "Todos repasan fórmulas.", options: [{text:"Entrar en pánico.",score:1},{text:"Escuchar música.",score:0}]},
            { img: 'blanco.png', title: "Bloqueo", text: "Mente en blanco.", options: [{text:"Paralizarte.",score:1},{text:"Respirar y saltar pregunta.",score:0}]},
            { img: 'tiempo.png', title: "Tiempo", text: "Queda poco tiempo.", options: [{text:"Escribir a lo loco.",score:1},{text:"Priorizar lo importante.",score:0}]},
            { img: 'falla.png', title: "Post-Examen", text: "Te equivocaste en una.", options: [{text:"Obsesionarte con el error.",score:1},{text:"Aceptarlo y seguir.",score:0}]}
        ]
    },
    future: {
        title: "Incertidumbre Futura",
        steps: [
              {
                img: 'indeciso.png',
                title: "La Charla",
                text: "Todos saben qué estudiar menos tú.",
                options: [{ text: "Sentirte inferior.", score: 1 }, { text: "Darte tiempo.", score: 0 }]
            },
            { img: 'quehara.png', title: "Preguntas", text: "¿Qué harás en 5 años?", options: [{text:"Angustiarte.",score:1},{text:"Enfocarte en el hoy.",score:0}]},
            { img: 'redes.png', title: "Comparación", text: "Ves redes sociales de amigos exitosos.", options: [{text:"Sentirte fracasado.",score:1},{text:"Alegrarte por ellos.",score:0}]},
            { img: 'elegir.png', title: "Decisión", text: "Debes elegir una carrera.", options: [{text:"Elegir lo que eligen otros.",score:1},{text:"Elegir lo que te gusta.",score:0}]},
            { img: 'miedo.png', title: "Fracaso", text: "Miedo a equivocarte de carrera.", options: [{text:"No elegir nada.",score:1},{text:"Saber que puedes cambiar.",score:0}]}
        ]
    }
};

let currentPathData = null;
let currentStepIndex = 0;
let totalAnxietyScore = 0;

const selectionStage = document.getElementById('selection-stage');
const narrativeStage = document.getElementById('narrative-stage');
const resultsStage = document.getElementById('results-stage');
const gameImage = document.getElementById('game-image');
const stepCounter = document.getElementById('step-counter');
const scenarioTitle = document.getElementById('scenario-title');
const scenarioText = document.getElementById('scenario-text');
const optionsBox = document.getElementById('options-box');

// --- FUNCIÓN DE PRE-CARGA (LA SOLUCIÓN) ---
function preloadImages() {
    // Recorremos todos los caminos (social, exam, future)
    for (const pathKey in gameData) {
        // Recorremos todos los pasos de cada camino
        gameData[pathKey].steps.forEach(step => {
            const img = new Image();
            img.src = step.img; // Esto obliga al navegador a descargarla YA
        });
    }
    // Precargar también la imagen por defecto por si acaso
    const defaultImg = new Image();
    defaultImg.src = 'nudo.png';
}

function startGame(pathId) {
    currentPathData = gameData[pathId].steps;
    currentStepIndex = 0;
    totalAnxietyScore = 0;
    selectionStage.style.display = 'none';
    narrativeStage.style.display = 'flex';
    renderStep();
}

// --- FUNCIÓN: VOLVER ATRÁS ---
function goBack() {
    narrativeStage.style.display = 'none';
    resultsStage.style.display = 'none';
    selectionStage.style.display = 'flex';
    currentStepIndex = 0;
    totalAnxietyScore = 0;
}

function renderStep() {
    const stepData = currentPathData[currentStepIndex];
    stepCounter.innerText = `PASO ${currentStepIndex + 1} DE ${currentPathData.length}`;
    scenarioTitle.innerText = stepData.title;
    scenarioText.innerText = stepData.text;

    // Efecto de transición suave
    gameImage.style.opacity = 0;
    
    setTimeout(() => {
        gameImage.src = stepData.img;
        // Pequeño retardo para asegurar que el src cambió antes de mostrar
        gameImage.onload = () => { gameImage.style.opacity = 1; };
        // Fallback por si la imagen ya estaba cacheada y no dispara onload
        if (gameImage.complete) { gameImage.style.opacity = 1; }
    }, 200);

    optionsBox.innerHTML = '';
    stepData.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.className = index === 0 ? 'game-btn btn-primary' : 'game-btn btn-secondary';
        btn.innerText = option.text;
        btn.onclick = () => handleChoice(option.score);
        optionsBox.appendChild(btn);
    });
}

function handleChoice(score) {
    totalAnxietyScore += score;
    currentStepIndex++;
    if (currentStepIndex < currentPathData.length) {
        renderStep();
    } else {
        showResults();
    }
}

function showResults() {
    narrativeStage.style.display = 'none';
    resultsStage.style.display = 'flex';
    const feedbackTitle = document.getElementById('feedback-title');
    const feedbackText = document.getElementById('feedback-text');
    const helplineBox = document.getElementById('helpline-box');
    
    // CAPTURAR EL BOTÓN DE AYUDA
    const btnHelpline = document.getElementById('btn-helpline');

    if (totalAnxietyScore >= 3) {
        // RESULTADO NEGATIVO (ANSIEDAD ALTA)
        feedbackTitle.innerText = "La carga se siente pesada";
        feedbackText.innerText = "Tus elecciones reflejan una tendencia a la evitación y autoexigencia.";
        helplineBox.style.display = 'block';
        
        // MOSTRAR BOTÓN DE AYUDA
        if(btnHelpline) btnHelpline.style.display = 'inline-block';
        
    } else if (totalAnxietyScore >= 1) {
        feedbackTitle.innerText = "Navegando las aguas";
        feedbackText.innerText = "A veces gestionas bien el estrés, otras veces la ansiedad gana un poco. Es normal.";
        helplineBox.style.display = 'none';
        if(btnHelpline) btnHelpline.style.display = 'none';
        
    } else {
        feedbackTitle.innerText = "Perspectiva y Calma";
        feedbackText.innerText = "¡Excelente manejo! Tienes herramientas para racionalizar tus miedos.";
        helplineBox.style.display = 'none';
        if(btnHelpline) btnHelpline.style.display = 'none';
    }
}