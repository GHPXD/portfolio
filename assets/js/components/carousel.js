// Variáveis do carrossel de experiência
let currentExperienceIndex = 0;
const totalExperienceCards = 3;

// Função para mover o carrossel de experiência
function moveExperienceCarousel(direction) {
    const carousel = document.getElementById('experience-carousel');
    const cardWidth = window.innerWidth <= 992 ? 100 : 50; // 100% para mobile, 50% para desktop
    
    currentExperienceIndex += direction;
    
    // Loop infinito
    if (currentExperienceIndex >= totalExperienceCards) {
        currentExperienceIndex = 0;
    } else if (currentExperienceIndex < 0) {
        currentExperienceIndex = totalExperienceCards - 1;
    }
    
    // Mover carrossel
    const translateX = -(currentExperienceIndex * cardWidth);
    carousel.style.transform = `translateX(${translateX}%)`;
}

function enableSwipe(carouselId, moveFunction) {
    const carousel = document.getElementById(carouselId);
    if (!carousel) return;

    let touchStartX = 0;
    let touchEndX = 0;
    const swipeThreshold = 50;

    carousel.addEventListener('touchstart', (event) => {
        touchStartX = event.changedTouches[0].screenX;
    }, { passive: true });

    carousel.addEventListener('touchend', (event) => {
        touchEndX = event.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeDistance = touchEndX - touchStartX;
        if (Math.abs(swipeDistance) < swipeThreshold) {
            return;
        }

        if (swipeDistance < 0) {
            // Swipe para a esquerda (próximo)
            moveFunction(1);
        } else {
            // Swipe para a direita (anterior)
            moveFunction(-1);
        }
    }
}

// Ativar o swipe nos seus carrosséis quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    enableSwipe('project-carousel', moveCarousel);
    enableSwipe('certificates-carousel', moveCertificatesCarousel);
});