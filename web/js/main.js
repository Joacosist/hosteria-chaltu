(function () {
  "use strict";

  /* ---------- Mobile menu ---------- */
  var menuToggle = document.getElementById("menu-toggle");
  var mainNav = document.getElementById("main-nav");

  function closeMenu() {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menú");
  }

  menuToggle.addEventListener("click", function () {
    var isOpen = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    menuToggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
  });

  mainNav.querySelectorAll(".nav-link").forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });

  /* ---------- Language switch ---------- */
  var LANGS = ["es", "en", "pt"];
  var langButtons = document.querySelectorAll(".lang-btn");

  function setLang(lang) {
    if (LANGS.indexOf(lang) === -1) lang = "es";

    document.querySelectorAll("[data-lang]").forEach(function (el) {
      el.hidden = el.getAttribute("data-lang") !== lang;
    });

    langButtons.forEach(function (btn) {
      btn.classList.toggle("active", btn.getAttribute("data-set-lang") === lang);
    });

    document.querySelectorAll("[data-ph-" + lang + "]").forEach(function (field) {
      field.setAttribute("placeholder", field.getAttribute("data-ph-" + lang));
    });

    document.documentElement.setAttribute("lang", lang);
    try { localStorage.setItem("chaltu-lang", lang); } catch (e) {}
  }

  langButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      setLang(btn.getAttribute("data-set-lang"));
    });
  });

  var savedLang = null;
  try { savedLang = localStorage.getItem("chaltu-lang"); } catch (e) {}
  if (savedLang) setLang(savedLang);

  /* ---------- Lightbox gallery ---------- */
  var galleryItems = Array.prototype.slice.call(document.querySelectorAll(".gallery-item"));
  var lightbox = document.getElementById("lightbox");
  var lightboxImg = document.getElementById("lightbox-img");
  var lightboxClose = document.getElementById("lightbox-close");
  var lightboxPrev = document.getElementById("lightbox-prev");
  var lightboxNext = document.getElementById("lightbox-next");
  var currentIndex = 0;

  function openLightbox(index) {
    currentIndex = index;
    var item = galleryItems[currentIndex];
    lightboxImg.src = item.getAttribute("data-full");
    lightboxImg.alt = item.querySelector("img").alt;
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.hidden = true;
    lightboxImg.src = "";
    document.body.style.overflow = "";
  }

  function showRelative(delta) {
    currentIndex = (currentIndex + delta + galleryItems.length) % galleryItems.length;
    var item = galleryItems[currentIndex];
    lightboxImg.src = item.getAttribute("data-full");
    lightboxImg.alt = item.querySelector("img").alt;
  }

  galleryItems.forEach(function (item, index) {
    item.addEventListener("click", function () { openLightbox(index); });
  });

  lightboxClose.addEventListener("click", closeLightbox);
  lightboxPrev.addEventListener("click", function () { showRelative(-1); });
  lightboxNext.addEventListener("click", function () { showRelative(1); });
  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", function (e) {
    if (lightbox.hidden) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") showRelative(-1);
    if (e.key === "ArrowRight") showRelative(1);
  });

  /* ---------- Contact form (mailto) ---------- */
  var form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = form.name.value.trim();
      var email = form.email.value.trim();
      var message = form.message.value.trim();

      var subject = encodeURIComponent("Consulta desde la web — " + name);
      var body = encodeURIComponent(message + "\n\n— " + name + " (" + email + ")");
      window.location.href = "mailto:info@hosteriachaltu.com.ar?subject=" + subject + "&body=" + body;

      var note = form.querySelector(".form-note");
      if (note) {
        var lang = document.documentElement.getAttribute("lang") || "es";
        var messages = {
          es: "Se abrió tu programa de mail para enviar la consulta.",
          en: "Your email app opened to send the message.",
          pt: "Seu aplicativo de e-mail abriu para enviar a mensagem."
        };
        note.textContent = messages[lang] || messages.es;
      }
    });
  }

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
