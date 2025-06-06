// Função para filtrar projetos
function filterProjects(tech) {
    currentFilter = tech;
    
    // Atualizar botões ativos
    const buttons = document.querySelectorAll('.projects-filter .filter-btn');
    buttons.forEach(btn => {
        btn.classList.remove('active');
        // Verificar se o botão corresponde à categoria selecionada
        if ((tech === 'all' && btn.textContent.trim() === 'Todos') ||
            (tech !== 'all' && btn.textContent.trim() === tech)) {
            btn.classList.add('active');
        }
    });
    
    // Filtrar projetos
    if (tech === 'all') {
        filteredProjects = Object.keys(projectsData);
    } else {
        filteredProjects = Object.keys(projectsData).filter(
            projectName => projectsData[projectName].category === tech
        );
    }
    
    // Resetar índice
    currentIndex = 0;
    
    // Renderizar carrossel
    renderCarousel();
    
    // Reiniciar autoplay
    startAutoplay();
}

// Função para filtrar certificados
function filterCertificates(tech) {
    currentCertificateFilter = tech;
    
    // Atualizar botões ativos
    const buttons = document.querySelectorAll('.certificates-filter .filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Filtrar certificados
    if (tech === 'all') {
        filteredCertificates = Object.keys(certificatesData);
    } else {
        filteredCertificates = Object.keys(certificatesData).filter(
            certificateName => certificatesData[certificateName].category === tech
        );
    }
    
    // Resetar índice
    currentCertificateIndex = 0;
    
    // Renderizar carrossel
    renderCertificatesCarousel();
    
    // Reiniciar autoplay
    startCertificateAutoplay();
}
 
// Função de rolagem suave
document.querySelectorAll('.nav-links a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animação de entrada de seções
const sections = document.querySelectorAll('section');
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

sections.forEach(section => {
    section.classList.add('fade-out');
    fadeInObserver.observe(section);
});

// Adicionar efeitos hover em ícones
const techIcons = document.querySelectorAll('.tech-icon');
techIcons.forEach(icon => {
    icon.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.2)';
    });

    icon.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Tratamento de erro para imagens dos projetos
document.addEventListener('DOMContentLoaded', function() {
    const projectImages = document.querySelectorAll('.project-card img');
    
    projectImages.forEach(img => {
        img.addEventListener('error', function() {
            // Criar imagem placeholder personalizada
            this.style.backgroundColor = '#f3f4f6';
            this.style.border = '2px dashed #d1d5db';
            this.style.display = 'flex';
            this.style.alignItems = 'center';
            this.style.justifyContent = 'center';
            this.style.color = '#6b7280';
            this.style.fontSize = '14px';
            this.style.fontWeight = '500';
            
            // Substituir por um placeholder
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIxIDE5VjVjMC0xLjEtLjktMi0yLTJINWMtMS4xIDAtMiAuOS0yIDJ2MTRjMCAxLjEuOSAyIDIgMmgxNGMxLjEgMCAyLS45IDItMnpNOC41IDEzLjVsMi41IDMuMDFMMTQuNSAxMmw0LjUgNkg1bDMuNS00LjV6IiBmaWxsPSIjOTk5Ii8+Cjwvc3ZnPgo=';
            this.alt = 'Imagem não encontrada';
        });
        
        // Adicionar loading lazy se não existir
        if (!this.hasAttribute('loading')) {
            this.setAttribute('loading', 'lazy');
        }
    });
});