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

