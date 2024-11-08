let currentIndex = 0;
const projects = document.querySelectorAll('.carousel .project');
const projectCount = projects.length;
let intervalId;

// Duplica os primeiros projetos no final para criar a ilusão de continuidade
const container = projects[0].parentNode;
for (let i = 0; i < projectCount; i++) {
  const clone = projects[i].cloneNode(true);
  container.appendChild(clone);
}

function showNextProject() {
  currentIndex = (currentIndex + 1) % projectCount;
  const offset = currentIndex * projects[0].offsetWidth;
  projects.forEach((project, index) => {
    project.style.transform = `translateX(-${offset}px)`;
  });

  // Reinicia a posição sem "salto" perceptível
  if (currentIndex === projectCount) {
    setTimeout(() => {
      projects.forEach((project, index) => {
        project.style.transition = 'none'; // Desativa a transição temporariamente
        project.style.transform = `translateX(0px)`;
      });
      currentIndex = 0;
      setTimeout(() => {
        projects.forEach((project, index) => {
          project.style.transition = ''; // Reativa a transição
        });
      }, 50);
    }, 2000);
  }
}

// Inicializa o primeiro projeto
projects.forEach((project, index) => {
  project.style.transform = `translateX(-${0}px)`;
});

intervalId = setInterval(showNextProject, 2000);

// Pausa a esteira ao passar o mouse sobre as imagens
projects.forEach(project => {
  project.addEventListener('mouseover', () => {
    clearInterval(intervalId);
  });

  project.addEventListener('mouseout', () => {
    intervalId = setInterval(showNextProject, 2000);
  });
});
