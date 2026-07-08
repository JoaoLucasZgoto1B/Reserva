

document.addEventListener("DOMContentLoaded", () => {

  const navToggle = document.getElementById("navToggle");
  const mainNav = document.getElementById("mainNav");

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    mainNav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }


  const revealTargets = document.querySelectorAll(
    ".quadrados, .benefit, .problema-grid p, .map-panel, .call-strip, .steps li, .cta-box"
  );
  revealTargets.forEach(el => el.classList.add("reveal"));

  const io = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealTargets.forEach(el => io.observe(el));

 
  const regionNotes = {
    noroeste: "<strong>Noroeste:</strong> concentra um número expressivo de municípios com MIP em curso, formando um dos blocos mais contínuos do mapa — mas ainda cercado de vizinhos sem cor.",
    norte: "<strong>Norte:</strong> é a região com a maior mancha colorida do estado, sinal de que a prática ganhou escala onde recebeu mais apoio técnico contínuo.",
    oeste: "<strong>Oeste:</strong> mostra adoção espalhada em bolsões, intercalada com áreas brancas — um padrão de avanço desigual dentro da mesma região produtora.",
    sudoeste: "<strong>Sudoeste:</strong> apresenta uma mancha compacta e bem definida, mostrando que, quando a articulação entre produtores é forte, o manejo se espalha rápido pelos municípios vizinhos.",
    sul: "<strong>Sul:</strong> tem municípios com MIP dispersos por uma área grande, mas com muitos vazios entre eles — a região que mais evidencia o tanto de território ainda descoberto."
  };

  const legendChips = document.querySelectorAll(".legend-chip");
  const regionNote = document.getElementById("regionNote");
  const defaultNote = regionNote ? regionNote.innerHTML : "";

  legendChips.forEach(chip => {
    chip.addEventListener("click", () => {
      const alreadyActive = chip.classList.contains("active");
      legendChips.forEach(c => c.classList.remove("active"));

      if (alreadyActive) {
        regionNote.innerHTML = defaultNote;
        return;
      }

      chip.classList.add("active");
      const region = chip.getAttribute("data-region");
      regionNote.innerHTML = `<p>${regionNotes[region] || ""}</p>`;
    });
  });

});