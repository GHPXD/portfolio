// Variáveis do carrossel de certificados
let currentCertificateIndex = 0;
let currentCertificateFilter = 'all';
let filteredCertificates = [];
let certificateCarouselInterval;
let isCertificateTransitioning = false;

// Variáveis para controlar o estado do modal de virar
const flipCardInner = document.querySelector('.flip-card-inner');
const modalImageFront = document.getElementById('modalImageFront');
const modalImageBack = document.getElementById('modalImageBack');
const flipHint = document.getElementById('flip-hint');
let isFlippable = false;

// Função para criar card de certificado
function createCertificateCard(certificateName, certificateData) {
    return `
        <div class="carousel-certificate-card" data-certificate="${certificateName}">
            <div class="carousel-certificate-image-container">
                <img src="${certificateData.image[0]}" alt="${certificateName}" loading="lazy">
                <div class="carousel-certificate-overlay">
                    <h3 class="carousel-certificate-title">${certificateName}</h3>
                </div>
            </div>
            <div class="carousel-certificate-tag-legend">
                <span class="carousel-certificate-tag ${certificateData.category}">
                    ${getCategoryName(certificateData.category)}
                </span>
            </div>
        </div>
    `;
}

// Função para obter nome da categoria
function getCategoryName(category) {
    const categories = {
        full: 'Fullstack',
        back: 'Back-end',
        front: 'Front-end',
        dados: 'Dados',
        diversos: 'Diversos'
    };
    return categories[category] || category;
}

// Função para renderizar o carrossel de certificados
function renderCertificatesCarousel() {
    const carousel = document.getElementById('certificates-carousel');
    
    if (filteredCertificates.length === 0) {
        carousel.innerHTML = '<p>Nenhum certificado encontrado.</p>';
        return;
    }
    
    // Criar certificados duplicados para efeito infinito
    const certificatesToRender = [...filteredCertificates, ...filteredCertificates, ...filteredCertificates];
    
    const carouselHTML = certificatesToRender.map(certificateName => 
        createCertificateCard(certificateName, certificatesData[certificateName])
    ).join('');
    
    carousel.innerHTML = carouselHTML;
    
    // Posicionar no meio (segundo conjunto)
    const cardWidth = 350 + 25; // largura do card + gap
    carousel.style.transform = `translateX(-${filteredCertificates.length * cardWidth}px)`;
    
    // Adicionar event listeners aos cards
    addCertificateCardEventListeners();
}

// Função para mover o carrossel de certificados
function moveCertificatesCarousel(direction) {
    if (isCertificateTransitioning || filteredCertificates.length === 0) return;
    
    isCertificateTransitioning = true;
    const carousel = document.getElementById('certificates-carousel');
    const cardWidth = 350 + 25; // largura do card + gap
    
    currentCertificateIndex += direction;
    
    // Calcular nova posição
    const newPosition = -((filteredCertificates.length + currentCertificateIndex) * cardWidth);
    carousel.style.transform = `translateX(${newPosition}px)`;
    
    // Após a transição, verificar se precisa resetar
    setTimeout(() => {
        if (currentCertificateIndex >= filteredCertificates.length) {
            currentCertificateIndex = 0;
            carousel.style.transition = 'none';
            carousel.style.transform = `translateX(-${filteredCertificates.length * cardWidth}px)`;
            setTimeout(() => {
                carousel.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            }, 50);
        } else if (currentCertificateIndex < 0) {
            currentCertificateIndex = filteredCertificates.length - 1;
            carousel.style.transition = 'none';
            carousel.style.transform = `translateX(-${filteredCertificates.length * cardWidth}px)`;
            setTimeout(() => {
                carousel.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            }, 50);
        }
        isCertificateTransitioning = false;
    }, 800);
}

// Função para autoplay dos certificados
function startCertificateAutoplay() {
    clearInterval(certificateCarouselInterval);
    certificateCarouselInterval = setInterval(() => {
        moveCertificatesCarousel(1);
    }, 4000); // Muda a cada 4 segundos
}

// Função para parar autoplay dos certificados
function stopCertificateAutoplay() {
    clearInterval(certificateCarouselInterval);
}

// Função para adicionar event listeners aos cards de certificados
function addCertificateCardEventListeners() {
    const certificateCards = document.querySelectorAll('.carousel-certificate-card');
    certificateCards.forEach(card => {
        card.addEventListener('click', function() {
            const certificateName = this.dataset.certificate;
            const certificateData = certificatesData[certificateName];
            openCertificateModal(certificateName, certificateData);
        });
        
        // Pausar autoplay no hover
        card.addEventListener('mouseenter', stopCertificateAutoplay);
        card.addEventListener('mouseleave', startCertificateAutoplay);
    });
}

// Função para abrir modal do certificado 
function openCertificateModal(certificateName, certificateData) {
    const modal = document.getElementById('certificateModal');
    const captionText = document.getElementById('caption');
    
    modal.style.display = "block";
    captionText.innerHTML = certificateName;

    // Garante que o card comece sempre virado para a frente
    flipCardInner.classList.remove('is-flipped');
    
    const images = certificateData.image;
    isFlippable = Array.isArray(images) && images.length > 1;

    if (isFlippable) {
        // Se tem 2 imagens (frente e verso)
        modalImageFront.src = images[0];
        modalImageBack.src = images[1];
        flipHint.style.display = 'block'; // Mostra a dica
    } else {
        // Se tem apenas 1 imagem
        modalImageFront.src = images[0];
        modalImageBack.src = ''; // Limpa a imagem do verso
        flipHint.style.display = 'none'; // Esconde a dica
    }

    // Pausar autoplay
    stopCertificateAutoplay();
}

// Event listener para virar o card
flipCardInner.addEventListener('click', () => {
    if (isFlippable) {
        flipCardInner.classList.toggle('is-flipped');
    }
});

// Inicializar carrossel de certificados quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    // Aguardar um pouco para garantir que o DOM esteja completamente carregado
    setTimeout(() => {
        // Inicializar com todos os certificados
        filteredCertificates = Object.keys(certificatesData);
        renderCertificatesCarousel();
        startCertificateAutoplay();
        
        // Pausar autoplay quando sair da seção
        const certificatesSection = document.getElementById('certificados');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startCertificateAutoplay();
                } else {
                    stopCertificateAutoplay();
                }
            });
        });
        observer.observe(certificatesSection);
        
        // Event listeners para o modal (mantendo funcionalidade existente)
        const modal = document.getElementById('certificateModal');
        const closeBtn = document.getElementsByClassName('close')[0];
        
        // Fechar modal
        closeBtn.onclick = function() {
            modal.style.display = "none";
            startCertificateAutoplay();
        }
        
        // Fechar modal clicando fora
        modal.onclick = function(event) {
            if (event.target === modal) {
                modal.style.display = "none";
                startCertificateAutoplay();
            }
        }
        
        // Fechar modal com ESC
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && modal.style.display === 'block') {
                modal.style.display = "none";
                startCertificateAutoplay();
            }
        });
    }, 200);
});