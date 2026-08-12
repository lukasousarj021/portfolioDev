
/* ================================
   project-count
================================ */

 document.addEventListener("DOMContentLoaded", () => {

    const projectsCount = document.querySelector(".project-count");
    const cards = document.querySelectorAll(".project-card");

    projectsCount.textContent = String(cards.length).padStart(2, "0");

});

/* ================================
   CAROUSEL
================================ */

const cards = document.querySelectorAll(".project-card");
const dots = document.querySelectorAll(".carousel-dots button");

let currentIndex = 0;

let autoplay;


/* ================================
   ATUALIZAR CAROUSEL
================================ */

function updateCarousel() {

    const total = cards.length;

    cards.forEach((card, index) => {

        card.classList.remove(
            "active",
            "prev",
            "next"
        );

        /* CARD ATUAL */

        if (index === currentIndex) {

            card.classList.add("active");

        }

        /* CARD ANTERIOR */

        else if (
            index ===
            (currentIndex - 1 + total) % total
        ) {

            card.classList.add("prev");

        }

        /* PRÓXIMO CARD */

        else if (
            index ===
            (currentIndex + 1) % total
        ) {

            card.classList.add("next");

        }

    });


    /* ================================
       INDICADORES
    ================================= */

    dots.forEach((dot, index) => {

        dot.classList.toggle(
            "active",
            index === currentIndex
        );

    });

}


/* ================================
   PRÓXIMO
================================ */

function nextSlide() {

    currentIndex =
        (currentIndex + 1) % cards.length;

    updateCarousel();

}


/* ================================
   ANTERIOR
================================ */

function previousSlide() {

    currentIndex =
        (currentIndex - 1 + cards.length)
        % cards.length;

    updateCarousel();

}


/* ================================
   CLICAR NOS INDICADORES
================================ */

dots.forEach((dot, index) => {

    dot.addEventListener("click", () => {

        currentIndex = index;

        updateCarousel();

        restartAutoplay();

    });

});


/* ================================
   CLICAR NOS CARDS
================================ */

cards.forEach((card, index) => {

    card.addEventListener("click", () => {

        if (index === currentIndex) {
            return;
        }

        currentIndex = index;

        updateCarousel();

        restartAutoplay();

    });

});


/* ================================
   TECLADO
================================ */

document.addEventListener("keydown", (event) => {

    if (event.key === "ArrowRight") {

        nextSlide();

        restartAutoplay();

    }

    if (event.key === "ArrowLeft") {

        previousSlide();

        restartAutoplay();

    }

});


/* ================================
   AUTOPLAY
================================ */

function startAutoplay() {

    autoplay = setInterval(() => {

        nextSlide();

    }, 10000);

}


/* ================================
   REINICIAR AUTOPLAY
================================ */

function restartAutoplay() {

    clearInterval(autoplay);

    startAutoplay();

}


/* ================================
   PAUSAR AO PASSAR O MOUSE
================================ */

const carousel = document.querySelector(".carousel");

carousel.addEventListener("mouseenter", () => {

    clearInterval(autoplay);

});

carousel.addEventListener("mouseleave", () => {

    startAutoplay();

});


/* ================================
   SWIPE NO CELULAR
================================ */

let touchStartX = 0;
let touchEndX = 0;

carousel.addEventListener("touchstart", (event) => {

    touchStartX =
        event.changedTouches[0].screenX;

});


carousel.addEventListener("touchend", (event) => {

    touchEndX =
        event.changedTouches[0].screenX;

    handleSwipe();

});


function handleSwipe() {

    const distance =
        touchStartX - touchEndX;

    /* SWIPE PARA ESQUERDA */

    if (distance > 50) {

        nextSlide();

        restartAutoplay();

    }

    /* SWIPE PARA DIREITA */

    else if (distance < -50) {

        previousSlide();

        restartAutoplay();

    }

}


const prevButton = document.getElementById("prevProject");
const nextButton = document.getElementById("nextProject");

prevButton.addEventListener("click", () => {

    previousSlide();

    restartAutoplay();

});


nextButton.addEventListener("click", () => {

    nextSlide();

    restartAutoplay();

});


/* ================================
   INICIALIZAÇÃO
================================ */

updateCarousel();

