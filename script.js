// Função para filtrar projetos
function filterProjects(tech) {
    const projects = document.querySelectorAll('#project-grid .project-card');
    projects.forEach(project => {
        if (tech === 'all' || project.dataset.tech === tech) {
            project.style.display = 'block';
        } else {
            project.style.display = 'none';
        }
    });
}

// Função para filtrar certificados
function filterCertificates(tech) {
    const certificates = document.querySelectorAll('#certificates-grid .certificate-card');
    certificates.forEach(certificate => {
        if (tech === 'all' || certificate.dataset.tech === tech) {
            certificate.style.display = 'block';
        } else {
            certificate.style.display = 'none';
        }
    });
}
 

// Função de rolagem suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
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
