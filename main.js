document.addEventListener("DOMContentLoaded", () => {
  // 1. LÓGICA DO CURSOR PERSONALIZADO
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

  // 2. LÓGICA PARA TROCA DE CARDS DE SERVIÇOS
  const toggleButtons = document.querySelectorAll(".toggle-btn");
  const cards = document.querySelectorAll(".card");

  toggleButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove 'active' de todos os botões e cards
      toggleButtons.forEach((btn) => btn.classList.remove("active"));
      cards.forEach((card) => card.classList.remove("active"));

      // Adiciona 'active' ao botão clicado e ao card correspondente
      button.classList.add("active");
      const targetCardId = button.dataset.target;
      document.getElementById(targetCardId).classList.add("active");
    });
  });

  // 3. ANIMAÇÃO DE FADE-IN AO ROLAR A PÁGINA
  const fadeInElements = document.querySelectorAll(".fade-in");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("visible", entry.isIntersecting);
        // Opcional: para a observação depois que o elemento já apareceu
        if (entry.isIntersecting) {
          // Opcional: para a observação depois que o elemento já apareceu
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1, // O elemento é considerado visível quando 10% dele aparece
    }
  );

  fadeInElements.forEach((element) => {
    observer.observe(element);
  });
  // --- NOVA FUNCIONALIDADE: ESTADO ATIVO NA NAVEGAÇÃO ---
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".main-nav a");

  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        // Verifica se a seção está visível na tela
        if (entry.isIntersecting) {
          // Obtém o ID da seção visível (ex: "portfolio")
          const id = entry.target.getAttribute("id");
          const activeLink = document.querySelector(
            `.main-nav a[href="#${id}"]`
          );

          // Remove a classe ativa de todos os links primeiro
          navLinks.forEach((link) => link.classList.remove("nav-active"));

          // Adiciona a classe ativa apenas ao link correspondente
          if (activeLink) {
            activeLink.classList.add("nav-active");
          }
        }
      });
    },
    {
      threshold: 0.5, // A seção é considerada "ativa" quando 50% dela está visível
    }
  );

  // Inicia a observação para cada seção
  sections.forEach((section) => {
    navObserver.observe(section);
  });
  // --- FIM DA NOVA FUNCIONALIDADE ---

  // --- NOVA FUNCIONALIDADE: ROLAGEM HORIZONTAL COM O MOUSE ---
  // --- NOVA FUNCIONALIDADE: CARROSSEL AUTOMÁTICO INFINITO ---
  const gallery = document.querySelector(".portfolio-gallery");

  if (gallery) {
    const items = gallery.querySelectorAll(".portfolio-item");

    // Duplica todos os itens para criar o efeito de loop
    items.forEach((item) => {
      const clone = item.cloneNode(true);
      gallery.appendChild(clone);
    });
  }
  // --- FIM DA NOVA FUNCIONALIDADE ---
});
