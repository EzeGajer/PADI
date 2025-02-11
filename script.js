// Menú hamburguesa
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Efecto de tipeo con palabras reemplazables en el Hero
const heroTitle = document.querySelector("#hero h1");
const phrases = [
    "¡Alcanzá tus metas con PADI!!",
    "¡Aprobá tus materias por menos de una barrita de cereal al día!!"
];

let phraseIndex = 0;
let charIndex = phrases[0].length; // Para que la primera frase aparezca completa
let isDeleting = true; // Empezar borrando para pasar a la siguiente frase

// Mostrar la primera frase directamente
heroTitle.textContent = phrases[0];

function typeEffect() {
    const currentPhrase = phrases[phraseIndex];
    if (isDeleting) {
        heroTitle.textContent = currentPhrase.substring(0, charIndex--);
    } else {
        heroTitle.textContent = currentPhrase.substring(0, charIndex++);
    }

    let typingSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentPhrase.length) {
        typingSpeed = 2000; // Espera 2 segundos antes de borrar
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length; // Pasa a la siguiente frase
        typingSpeed = 500; // Espera antes de empezar la siguiente palabra
    }

    setTimeout(typeEffect, typingSpeed);
}

setTimeout(typeEffect, 2000); // Inicia el efecto de tipeo después de 2 segundos

// Burbujas animadas con menor cantidad
const bubblesContainer = document.createElement('div');
bubblesContainer.classList.add('bubbles');
document.body.appendChild(bubblesContainer);

function createBubble() {
    if (document.querySelectorAll('.bubble').length > 5) return; // Limita la cantidad de burbujas
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');

    const size = Math.random() * 80 + 20;
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;

    bubble.style.left = `${Math.random() * 100}%`;

    bubblesContainer.appendChild(bubble);
    setTimeout(() => bubble.remove(), 8000);
}

setInterval(createBubble, 2000);

// Acordeón de preguntas frecuentes
document.querySelectorAll('.faq-question').forEach(item => {
    item.addEventListener('click', () => {
        const faqItem = item.parentElement;
        faqItem.classList.toggle('active');
    });
});

// Botón de subir al inicio
const scrollToTopBtn = document.querySelector('.scroll-to-top');

window.addEventListener('scroll', () => {
    scrollToTopBtn.style.display = window.pageYOffset > 300 ? 'block' : 'none';
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});


function showTab(event, tabId) {
    const tabs = document.querySelectorAll('.tab-content');
    const buttons = document.querySelectorAll('.tab-button');

    tabs.forEach(tab => tab.classList.remove('active'));
    buttons.forEach(button => button.classList.remove('active'));

    document.getElementById(tabId).classList.add('active');
    event.target.classList.add('active');
}

// Modal Control
const modal = document.getElementById('modal-cronograma');
const abrirBtn = document.getElementById('abrir-cronograma');
const cerrarBtn = document.getElementById('cerrar-modal');
const volverBtn = document.getElementById('volver-inicio');

abrirBtn.addEventListener('click', () => modal.style.display = 'flex');
cerrarBtn.addEventListener('click', () => modal.style.display = 'none');
volverBtn.addEventListener('click', () => {
    document.getElementById('cronograma-detalle').classList.add('hidden');
    document.getElementById('profesores').classList.add('hidden');
    document.getElementById('carrusel-materias').classList.remove('hidden');
    volverBtn.classList.add('hidden');
});

// Materias y Profesores
const materias = [
    "Matemática I", "Matemática II", "Economía I", "Intro a la Estadística",
    "ICG I", "Microeconomía", "Economía Matemática", "Macroeconomía",
    "MEAN", "TD I", "TD II", "TD III", "TD V"
];

const profesoresPorMateria = {
    "Matemática I": [{ nombre: "Belu Fernández", descripcion: "Profesora de Matemática I" }],
    "TD II": [{ nombre: "Agustina Glusman", descripcion: "Profesora de TD II" }],
    "Economía I": [{ nombre: "Juan Pérez", descripcion: "Profesor de Economía I" }]
};

const materiasCarrusel = document.getElementById('materias-carrusel');

// Generar tarjetas de materias
materias.forEach(materia => {
    const card = document.createElement('div');
    card.classList.add('materia-card');
    card.innerHTML = `<h3>${materia}</h3>`;
    card.addEventListener('click', () => mostrarProfesores(materia));
    materiasCarrusel.appendChild(card);
});

// Carrusel
document.getElementById('prev-materia').addEventListener('click', () => {
    materiasCarrusel.scrollBy({ left: -300, behavior: 'smooth' });
});
document.getElementById('next-materia').addEventListener('click', () => {
    materiasCarrusel.scrollBy({ left: 300, behavior: 'smooth' });
});

// Mostrar Profesores
function mostrarProfesores(materia) {
    document.getElementById('carrusel-materias').classList.add('hidden');
    document.getElementById('profesores').classList.remove('hidden');
    volverBtn.classList.remove('hidden');

    const profesoresContainer = document.getElementById('profesores-lista');
    profesoresContainer.innerHTML = '';

    const profesores = profesoresPorMateria[materia] || [{ nombre: "Sin Profesores Disponibles", descripcion: "" }];

    profesores.forEach(profesor => {
        const card = document.createElement('div');
        card.classList.add('profesor-card');
        card.innerHTML = `<h3>${profesor.nombre}</h3><p>${profesor.descripcion}</p>`;
        card.addEventListener('click', () => mostrarCronograma(profesor.nombre));
        profesoresContainer.appendChild(card);
    });
}

// Cronograma
let fechaActual = new Date();

document.getElementById('mes-anterior').addEventListener('click', () => {
    fechaActual.setMonth(fechaActual.getMonth() - 1);
    generarCalendario();
});

document.getElementById('mes-siguiente').addEventListener('click', () => {
    fechaActual.setMonth(fechaActual.getMonth() + 1);
    generarCalendario();
});

function mostrarCronograma(profesor) {
    document.getElementById('profesores').classList.add('hidden');
    document.getElementById('cronograma-detalle').classList.remove('hidden');
    document.getElementById('profesor-seleccionado').textContent = profesor;
    generarCalendario();
}

function generarCalendario() {
    const calendario = document.getElementById('calendario-body');
    calendario.innerHTML = '';

    const mes = fechaActual.getMonth();
    const anio = fechaActual.getFullYear();
    const primerDia = new Date(anio, mes, 1).getDay();
    const diasEnMes = new Date(anio, mes + 1, 0).getDate();

    document.getElementById('mes-actual').textContent = `${fechaActual.toLocaleString('default', { month: 'long' })} ${anio}`;

    let dia = 1;
    for (let i = 0; i < 6; i++) {
        const fila = document.createElement('tr');

        for (let j = 1; j <= 7; j++) {
            const celda = document.createElement('td');

            if ((i === 0 && j < primerDia) || dia > diasEnMes) {
                celda.innerHTML = '';
            } else {
                celda.innerHTML = `${dia}`;

                if (j === 2 || j === 4) {
                    const clase = document.createElement('div');
                    clase.classList.add('clase');
                    clase.textContent = (j === 2) ? 'Clase de Álgebra' : 'Clase de Cálculo';
                    celda.appendChild(clase);
                }

                dia++;
            }
            fila.appendChild(celda);
        }
        calendario.appendChild(fila);

        if (dia > diasEnMes) break;
    }
}

