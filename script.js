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

// Sessão Mouse

window.requestAnimFrame = function () {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback) {
        window.setTimeout(callback);
      }
    );
  };
  
  function init(elemid) {
    let canvas = document.getElementById(elemid),
      c = canvas.getContext("2d"),
      w = (canvas.width = window.innerWidth),
      h = (canvas.height = window.innerHeight);
    c.fillStyle = "rgba(30,30,30,1)";
    c.fillRect(0, 0, w, h);
    return { c: c, canvas: canvas };
  }
  
  window.onload = function () {
    let c = init("canvas").c,
      canvas = init("canvas").canvas,
      w = (canvas.width = window.innerWidth),
      h = (canvas.height = window.innerHeight),
      mouse = { x: false, y: false },
      last_mouse = {};
  
    function dist(p1x, p1y, p2x, p2y) {
      return Math.sqrt(Math.pow(p2x - p1x, 2) + Math.pow(p2y - p1y, 2));
    }
  
    class segment {
      constructor(parent, l, a, first) {
        this.first = first;
        if (first) {
          this.pos = {
            x: parent.x,
            y: parent.y
          };
        } else {
          this.pos = {
            x: parent.nextPos.x,
            y: parent.nextPos.y
          };
        }
        this.l = l;
        this.ang = a;
        this.nextPos = {
          x: this.pos.x + this.l * Math.cos(this.ang),
          y: this.pos.y + this.l * Math.sin(this.ang)
        };
      }
      update(t) {
        this.ang = Math.atan2(t.y - this.pos.y, t.x - this.pos.x);
        this.pos.x = t.x + this.l * Math.cos(this.ang - Math.PI);
        this.pos.y = t.y + this.l * Math.sin(this.ang - Math.PI);
        this.nextPos.x = this.pos.x + this.l * Math.cos(this.ang);
        this.nextPos.y = this.pos.y + this.l * Math.sin(this.ang);
      }
      fallback(t) {
        this.pos.x = t.x;
        this.pos.y = t.y;
        this.nextPos.x = this.pos.x + this.l * Math.cos(this.ang);
        this.nextPos.y = this.pos.y + this.l * Math.sin(this.ang);
      }
      show() {
        c.lineTo(this.nextPos.x, this.nextPos.y);
      }
    }
  
    class tentacle {
      constructor(x, y, l, n, a) {
        this.x = x;
        this.y = y;
        this.l = l;
        this.n = n;
        this.t = {};
        this.rand = Math.random();
        this.segments = [new segment(this, this.l / this.n, 0, true)];
        for (let i = 1; i < this.n; i++) {
          this.segments.push(
            new segment(this.segments[i - 1], this.l / this.n, 0, false)
          );
        }
      }
      move(last_target, target) {
        this.angle = Math.atan2(target.y - this.y, target.x - this.x);
        this.dt = dist(last_target.x, last_target.y, target.x, target.y) + 5;
        this.t = {
          x: target.x - 0.8 * this.dt * Math.cos(this.angle),
          y: target.y - 0.8 * this.dt * Math.sin(this.angle)
        };
        if (this.t.x) {
          this.segments[this.n - 1].update(this.t);
        } else {
          this.segments[this.n - 1].update(target);
        }
        for (let i = this.n - 2; i >= 0; i--) {
          this.segments[i].update(this.segments[i + 1].pos);
        }
        if (
          dist(this.x, this.y, target.x, target.y) <=
          this.l + dist(last_target.x, last_target.y, target.x, target.y)
        ) {
          this.segments[0].fallback({ x: this.x, y: this.y });
          for (let i = 1; i < this.n; i++) {
            this.segments[i].fallback(this.segments[i - 1].nextPos);
          }
        }
      }
      // Corpo
      show(target) {
        if (dist(this.x, this.y, target.x, target.y) <= this.l) {
          c.globalCompositeOperation = "lighter";
          c.beginPath();
          c.lineTo(this.x, this.y);
          for (let i = 0; i < this.n; i++) {
            this.segments[i].show();
          }
          c.strokeStyle =
            "hsl(" +
            (this.rand * 90 + 80) +
            ",100%," +
            (this.rand * 60 + 25) +
            "%)";
          c.lineWidth = this.rand * 2;
          c.lineCap = "round";
          c.lineJoin = "round";
          c.stroke();
          c.globalCompositeOperation = "source-over";
        }
      }
      // star
      show2(target) {
        c.beginPath();
        if (dist(this.x, this.y, target.x, target.y) <= this.l) {
          c.arc(this.x, this.y, 2 * this.rand + 1, 0, 2 * Math.PI);
          c.fillStyle = "#7890FB";
        } else {
          c.arc(this.x, this.y, this.rand * 2, 0, 2 * Math.PI);
          c.fillStyle = "darkcyan";
        }
        c.fill();
      }
    }
  
    let maxl = 200,
      minl = 50,
      n = 30,
      numt = 500,
      tent = [],
      clicked = false,
      target = { x: 0, y: 0 },
      last_target = {},
      t = 0,
      q = 10;
  
    for (let i = 0; i < numt; i++) {
      tent.push(
        new tentacle(
          Math.random() * w,
          Math.random() * h,
          Math.random() * (maxl - minl) + minl,
          n,
          Math.random() * 2 * Math.PI
        )
      );
    }
    function draw() {
      if (mouse.x) {
        target.errx = mouse.x - target.x;
        target.erry = mouse.y - target.y;
      } else {
        target.errx =
          w / 2 +
          ((h / 2 - q) * Math.sqrt(2) * Math.cos(t)) /
            (Math.pow(Math.sin(t), 2) + 1) -
          target.x;
        target.erry =
          h / 2 +
          ((h / 2 - q) * Math.sqrt(2) * Math.cos(t) * Math.sin(t)) /
            (Math.pow(Math.sin(t), 2) + 1) -
          target.y;
      }
  
      target.x += target.errx / 10;
      target.y += target.erry / 10;
  
      t += 0.01;
  
      c.beginPath();
      c.arc(
        target.x,
        target.y,
        dist(last_target.x, last_target.y, target.x, target.y) + 5,
        0,
        2 * Math.PI
      );
      c.fillStyle = "#7890FB";
      c.fill();
  
      for (i = 0; i < numt; i++) {
        tent[i].move(last_target, target);
        tent[i].show2(target);
      }
      for (i = 0; i < numt; i++) {
        tent[i].show(target);
      }
      last_target.x = target.x;
      last_target.y = target.y;
    }
  
    canvas.addEventListener(
      "mousemove",
      function (e) {
        last_mouse.x = mouse.x;
        last_mouse.y = mouse.y;
  
        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
      },
      false
    );
  
    canvas.addEventListener("mouseleave", function (e) {
      mouse.x = false;
      mouse.y = false;
    });
  
    canvas.addEventListener(
      "mousedown",
      function (e) {
        clicked = true;
      },
      false
    );
  
    canvas.addEventListener(
      "mouseup",
      function (e) {
        clicked = false;
      },
      false
    );
  
    function loop() {
      window.requestAnimFrame(loop);
      c.clearRect(0, 0, w, h);
      draw();
    }
  
    window.addEventListener("resize", function () {
      (w = canvas.width = window.innerWidth),
        (h = canvas.height = window.innerHeight);
      loop();
    });
  
    loop();
    setInterval(loop, 1000 / 60);
  };

  // Fim

  // Existing JavaScript code remains the same...

// Add Certificate Image Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
  // Get the modal
  const modal = document.getElementById('certificateModal');
  const modalImg = document.getElementById('modalImage');
  const captionText = document.getElementById('caption');
  const closeBtn = document.getElementsByClassName('close')[0];

  // Get all certificate images
  const certImages = document.querySelectorAll('.certificate-card img');

  // Add click event to each certificate image
  certImages.forEach(img => {
      img.addEventListener('click', function() {
          modal.style.display = "block";
          modalImg.src = this.src;
          captionText.innerHTML = this.parentElement.querySelector('h3').textContent;
      });
  });

  // Close the modal when the close button is clicked
  closeBtn.onclick = function() {
      modal.style.display = "none";
  }

  // Close the modal when clicking outside the image
  modal.onclick = function(event) {
      if (event.target === modal) {
          modal.style.display = "none";
      }
  }
});

// Rest of the existing script.js code remains the same

// Toggle de Navegação Mobile
document.addEventListener('DOMContentLoaded', function() {
  // Criar menu hambúrguer para mobile
  const navContainer = document.querySelector('.nav-container');
  const navLinks = document.querySelector('.nav-links');
  
  // Criar elemento de menu hambúrguer
  const hamburgerMenu = document.createElement('div');
  hamburgerMenu.classList.add('hamburger-menu');
  hamburgerMenu.innerHTML = `
      <div class="bar"></div>
      <div class="bar"></div>
      <div class="bar"></div>
  `;
  
  // Adicionar menu hambúrguer ao container de navegação
  navContainer.appendChild(hamburgerMenu);
  
  // Alternar menu mobile
  hamburgerMenu.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      this.classList.toggle('active');
  });
  
  // Fechar menu mobile quando um link é clicado
  navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function() {
          navLinks.classList.remove('active');
          hamburgerMenu.classList.remove('active');
      });
  });
  
  // Fechar menu mobile ao clicar fora
  document.addEventListener('click', function(event) {
      if (!navContainer.contains(event.target)) {
          navLinks.classList.remove('active');
          hamburgerMenu.classList.remove('active');
      }
  });
});

// Código de script existente permanece o mesmo...