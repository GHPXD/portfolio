// Variáveis do carrossel
let currentIndex = 0;
let currentFilter = 'all';
let filteredProjects = [];
let carouselInterval;
let isTransitioning = false;

// Função para criar card do projeto
function createProjectCard(projectName, projectData) {
    // Adicionamos .slice(0, 5) para pegar apenas os 5 primeiros itens do array
    const techIcons = projectData.tech.slice(0, 5).map(tech => 
        `<span class="tech-icon ${tech}" title="${tech.charAt(0).toUpperCase() + tech.slice(1)}">
            <i class="${getTechIcon(tech)}"></i>
        </span>`
    ).join('');

    return `
        <div class="carousel-project-card" data-project="${projectName}">
            <div class="carousel-project-image-container">
                <img src="${projectData.image}" alt="${projectName}" loading="lazy">
                <div class="carousel-project-overlay">
                    <h3 class="carousel-project-title">${projectName}</h3>
                </div>
            </div>
            <div class="carousel-project-tech-legend">
                ${techIcons}
            </div>
        </div>
    `;
}

// Função para obter ícone da tecnologia
function getTechIcon(tech) {
    const icons = {
        python: 'fab fa-python',
        java: 'fab fa-java',
        javascript: 'fab fa-js',
        html: 'fab fa-html5',
        css: 'fab fa-css3-alt',
        pandas: 'fas fa-table',
        pyplot: 'fas fa-chart-line',
        pyspark: 'fas fa-fire',
        'spring-boot': 'fas fa-leaf',
        oraclesql: 'fas fa-database',
        mysql: 'fas fa-database',
        docker: 'fab fa-docker',
        react: 'fab fa-react',
        aws: 'fab fa-aws',
        sap: 'fas fa-cogs',
        powerbi: 'fas fa-chart-bar',
        'power-automate': 'fas fa-exchange-alt',
        selenium: 'fas fa-robot',
        numpy: 'fas fa-square-root-alt',
        pdfplumber: 'fas fa-file-pdf',
        pyinstaller: 'fas fa-box-open',
        vba: 'fas fa-file-code',
        kafka: 'fas fa-stream',
        matplotlib: 'fas fa-chart-pie',
        seaborn: 'fas fa-chart-area',
        plotly: 'fas fa-chart-line',
        dash: 'fas fa-tachometer-alt',
        tkinter: 'fas fa-desktop',
        pdf2image: 'fas fa-file-image',
        tensorflow: 'fas fa-brain',
        pytesseract: 'fas fa-spell-check'
    };
    return icons[tech] || 'fas fa-code';
}

// Função para renderizar o carrossel
function renderCarousel() {
    const carousel = document.getElementById('project-carousel');
    
    if (filteredProjects.length === 0) {
        carousel.innerHTML = '<p>Nenhum projeto encontrado.</p>';
        return;
    }
    
    // Criar projetos duplicados para efeito infinito
    const projectsToRender = [...filteredProjects, ...filteredProjects, ...filteredProjects];
    
    const carouselHTML = projectsToRender.map(projectName => 
        createProjectCard(projectName, projectsData[projectName])
    ).join('');
    
    carousel.innerHTML = carouselHTML;
    
    // Posicionar no meio (segundo conjunto)
    const cardWidth = 350 + 25; // largura do card + gap
    carousel.style.transform = `translateX(-${filteredProjects.length * cardWidth}px)`;
    
    // Adicionar event listeners aos cards
    addCardEventListeners();
}

// Função para mover o carrossel
function moveCarousel(direction) {
    if (isTransitioning || filteredProjects.length === 0) return;
    
    isTransitioning = true;
    const carousel = document.getElementById('project-carousel');
    const cardWidth = 350 + 25; // largura do card + gap
    
    currentIndex += direction;
    
    // Calcular nova posição
    const newPosition = -((filteredProjects.length + currentIndex) * cardWidth);
    carousel.style.transform = `translateX(${newPosition}px)`;
    
    // Após a transição, verificar se precisa resetar
    setTimeout(() => {
        if (currentIndex >= filteredProjects.length) {
            currentIndex = 0;
            carousel.style.transition = 'none';
            carousel.style.transform = `translateX(-${filteredProjects.length * cardWidth}px)`;
            setTimeout(() => {
                carousel.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            }, 50);
        } else if (currentIndex < 0) {
            currentIndex = filteredProjects.length - 1;
            carousel.style.transition = 'none';
            carousel.style.transform = `translateX(-${filteredProjects.length * cardWidth}px)`;
            setTimeout(() => {
                carousel.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            }, 50);
        }
        isTransitioning = false;
    }, 800);
}

// Função para autoplay
function startAutoplay() {
    clearInterval(carouselInterval);
    carouselInterval = setInterval(() => {
        moveCarousel(1);
    }, 4000); // Muda a cada 4 segundos
}

// Função para parar autoplay
function stopAutoplay() {
    clearInterval(carouselInterval);
}

// Função para adicionar event listeners aos cards
function addCardEventListeners() {
    const projectCards = document.querySelectorAll('.carousel-project-card');
    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            const projectName = this.dataset.project;
            const projectData = projectsData[projectName];
            openProjectModal(projectName, projectData);
        });
        
        // Pausar autoplay no hover
        card.addEventListener('mouseenter', stopAutoplay);
        card.addEventListener('mouseleave', startAutoplay);
    });
}

// Função para abrir modal do projeto
function openProjectModal(projectName, projectData) {
    const modal = document.getElementById('projectModal');
    const modalImage = document.getElementById('projectModalImage');
    const modalTitle = document.getElementById('projectModalTitle');
    const modalTech = document.getElementById('projectModalTech');
    const repoButton = document.getElementById('projectRepoButton');
    const readmeButton = document.getElementById('projectReadmeButton');
    
    // Configurar modal
    modalImage.src = projectData.image;
    modalImage.alt = projectName;
    modalTitle.textContent = projectName;
    
    // Configurar tecnologias
    const techIcons = projectData.tech.map(tech => 
        `<span class="tech-icon ${tech}" title="${tech.charAt(0).toUpperCase() + tech.slice(1)}">
            <i class="${getTechIcon(tech)}"></i>
        </span>`
    ).join('');
    modalTech.innerHTML = techIcons;
    
    // Configurar botões
    repoButton.href = projectData.repo;
    readmeButton.onclick = () => loadReadme(projectData.readme);
    
    // Mostrar modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Pausar autoplay
    stopAutoplay();
}

// Função para carregar README
async function loadReadme(readmePath) {
    const readmeText = document.getElementById('readmeText');
    const projectReadmeContent = document.getElementById('projectReadmeContent');
    
    try {
        const response = await fetch(readmePath);
        if (response.ok) {
            const markdownText = await response.text();
            const htmlContent = parseMarkdown(markdownText);
            readmeText.innerHTML = htmlContent;
            projectReadmeContent.style.display = 'block';
        } else {
            readmeText.innerHTML = '<p>Documentação não encontrada.</p>';
            projectReadmeContent.style.display = 'block';
        }
    } catch (error) {
        readmeText.innerHTML = '<p>Erro ao carregar a documentação.</p>';
        projectReadmeContent.style.display = 'block';
    }
}

// Parser simples de Markdown
function parseMarkdown(markdown) {
    let html = markdown;
    
    // Headers
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
    
    // Bold
    html = html.replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>');
    
    // Italic
    html = html.replace(/\*(.*)\*/gim, '<em>$1</em>');
    
    // Code blocks
    html = html.replace(/``````/gims, '<pre><code>$1</code></pre>');
    
    // Inline code
    html = html.replace(/`([^`]*)`/gim, '<code>$1</code>');
    
    // Links
    html = html.replace(/\[([^\]]*)\]\(([^\)]*)\)/gim, '<a href="$2" target="_blank">$1</a>');
    
    // Line breaks
    html = html.replace(/\n\n/gim, '</p><p>');
    html = '<p>' + html + '</p>';
    
    // Lists
    html = html.replace(/^\* (.*$)/gim, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>)/gims, '<ul>$1</ul>');
    
    return html;
}

// Função para configurar event listeners do modal
function setupModalEventListeners() {
    const projectModal = document.getElementById('projectModal');
    const projectClose = document.querySelector('.project-close');
    const closeReadmeButton = document.getElementById('closeReadmeButton');
    const projectReadmeContent = document.getElementById('projectReadmeContent');
    
    // Fechar modal
    projectClose.addEventListener('click', function() {
        projectModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        projectReadmeContent.style.display = 'none';
        startAutoplay();
    });
    
    // Fechar modal clicando fora
    projectModal.addEventListener('click', function(event) {
        if (event.target === projectModal) {
            projectModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            projectReadmeContent.style.display = 'none';
            startAutoplay();
        }
    });
    
    // Fechar README
    closeReadmeButton.addEventListener('click', function() {
        projectReadmeContent.style.display = 'none';
    });
    
    // Fechar modal com ESC
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && projectModal.style.display === 'block') {
            projectModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            projectReadmeContent.style.display = 'none';
            startAutoplay();
        }
    });
}

// Inicializar carrossel quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar com todos os projetos
    filteredProjects = Object.keys(projectsData);
    renderCarousel();
    startAutoplay();
    
    // Pausar autoplay quando sair da seção
    const projectsSection = document.getElementById('projetos');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startAutoplay();
            } else {
                stopAutoplay();
            }
        });
    });
    observer.observe(projectsSection);
    
    // Event listeners para controles do modal
    setupModalEventListeners();
});