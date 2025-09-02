document.addEventListener("DOMContentLoaded", () => {
  // Typing effect for hero section
  const typingSpan = document.querySelector(".typing-text span");
  const words = [
    "Banners",
    "Icons",
    "Thumbnails",
    "Anime Typography Logos",
    "Vectors",
  ];
  let wordIndex = 0;
  function showWord() {
    typingSpan.textContent = words[wordIndex];
    wordIndex = (wordIndex + 1) % words.length;
  }
  showWord();
  setInterval(showWord, 2000);

  // 1. Cursor personalizado
  const cursor = document.querySelector(".cursor");
  const interactiveElements = document.querySelectorAll(
    "a, button, .toggle-btn, .portfolio-item"
  );

  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  });

  interactiveElements.forEach((el) => {
    el.addEventListener("mouseover", () =>
      cursor.classList.add("hover-effect")
    );
    el.addEventListener("mouseout", () =>
      cursor.classList.remove("hover-effect")
    );
  });

  // 2. Troca de cards de serviços
  const toggleButtons = document.querySelectorAll(".toggle-btn");
  const cards = document.querySelectorAll(".card");

  toggleButtons.forEach((button) => {
    button.addEventListener("click", () => {
      toggleButtons.forEach((btn) => btn.classList.remove("active"));
      cards.forEach((card) => card.classList.remove("active"));

      button.classList.add("active");
      const targetCardId = button.dataset.target;
      document.getElementById(targetCardId).classList.add("active");
    });
  });

  // 3. Animação de fade-in ao rolar a página
  const fadeInElements = document.querySelectorAll(".fade-in");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("visible", entry.isIntersecting);
        if (entry.isIntersecting) {
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  fadeInElements.forEach((element) => {
    observer.observe(element);
  });
  // 4. Estado ativo na navegação
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".main-nav a");

  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          const activeLink = document.querySelector(
            `.main-nav a[href="#${id}"]`
          );
          navLinks.forEach((link) => link.classList.remove("nav-active"));
          if (activeLink) {
            activeLink.classList.add("nav-active");
          }
        }
      });
    },
    {
      threshold: 0.5,
    }
  );

  sections.forEach((section) => {
    navObserver.observe(section);
  });
});
