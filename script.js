/* ===================================================================
   Guia de Atividades — Natura & Avon
   Menu mobile + progresso de checklist salvo no navegador (localStorage)
   =================================================================== */

(function () {
  "use strict";

  var STORAGE_PREFIX = "guia-atividades:";

  function storageGet(key) {
    try {
      var raw = localStorage.getItem(STORAGE_PREFIX + key);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function storageSet(key, value) {
    try {
      localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
    } catch (e) {
      /* localStorage indisponível (modo privado, etc.) — segue sem salvar */
    }
  }

  /* ---------- Menu mobile ---------- */

  function setupMobileMenu() {
    var toggle = document.querySelector("[data-menu-toggle]");
    var sidebar = document.querySelector(".sidebar");
    var scrim = document.querySelector("[data-scrim]");
    if (!toggle || !sidebar) return;

    function open() {
      sidebar.classList.add("is-open");
      if (scrim) scrim.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
    }
    function close() {
      sidebar.classList.remove("is-open");
      if (scrim) scrim.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }

    toggle.addEventListener("click", function () {
      sidebar.classList.contains("is-open") ? close() : open();
    });
    if (scrim) scrim.addEventListener("click", close);
    sidebar.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", close);
    });
  }

  /* ---------- Checklist de uma página de tutorial ---------- */

  function setupChecklist() {
    var page = document.body.getAttribute("data-tutorial");
    if (!page) return;

    var steps = document.querySelectorAll(".step[data-step-id]");
    if (!steps.length) return;

    var saved = storageGet(page) || {};

    function updateProgress() {
      var total = steps.length;
      var done = 0;
      steps.forEach(function (step) {
        if (step.classList.contains("is-done")) done++;
      });
      var pct = total ? Math.round((done / total) * 100) : 0;

      var fill = document.querySelector("[data-progress-fill]");
      var label = document.querySelector("[data-progress-label]");
      if (fill) fill.style.width = pct + "%";
      if (label) label.textContent = done + " de " + total + " etapas concluídas";

      storageSet("progress:" + page, { done: done, total: total, pct: pct });
    }

    steps.forEach(function (step) {
      var id = step.getAttribute("data-step-id");
      var checkbox = step.querySelector('input[type="checkbox"]');
      if (!checkbox) return;

      if (saved[id]) {
        checkbox.checked = true;
        step.classList.add("is-done");
      }

      checkbox.addEventListener("change", function () {
        saved[id] = checkbox.checked;
        storageSet(page, saved);
        step.classList.toggle("is-done", checkbox.checked);
        updateProgress();
      });
    });

    updateProgress();
  }

  /* ---------- Marcar tutoriais concluídos no índice e na barra lateral ---------- */

  function setupStatusDots() {
    document.querySelectorAll("[data-tutorial-slug]").forEach(function (el) {
      var slug = el.getAttribute("data-tutorial-slug");
      var progress = storageGet("progress:" + slug);
      if (progress && progress.total && progress.done === progress.total) {
        var dot = el.querySelector(".nav-check");
        if (dot) dot.classList.add("is-done");
        var status = el.querySelector("[data-status-text]");
        if (status) status.textContent = "Concluído";
      } else if (progress && progress.done > 0) {
        var status2 = el.querySelector("[data-status-text]");
        if (status2) status2.textContent = progress.done + "/" + progress.total;
      }
    });
  }

  /* ---------- Botão de imprimir / salvar em PDF ---------- */

  function setupPrint() {
    var btn = document.querySelector("[data-print]");
    if (!btn) return;
    btn.addEventListener("click", function () {
      window.print();
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    setupMobileMenu();
    setupChecklist();
    setupStatusDots();
    setupPrint();
  });
})();
