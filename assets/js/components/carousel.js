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