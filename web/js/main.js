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

  /* ---------- Gallery hover captions ---------- */
  document.querySelectorAll(".gallery-item").forEach(function (item) {
    var img = item.querySelector("img");
    if (!img) return;

    var zoom = document.createElement("span");
    zoom.className = "gallery-zoom";
    zoom.setAttribute("aria-hidden", "true");
    zoom.innerHTML = '<svg width="16" height="16"><use href="#icon-zoom"></use></svg>';
    item.appendChild(zoom);

    var scrim = document.createElement("span");
    scrim.className = "gallery-scrim";
    var caption = document.createElement("span");
    caption.className = "gallery-caption";
    caption.textContent = img.alt;
    scrim.appendChild(caption);
    item.appendChild(scrim);
  });

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

  /* ---------- Room detail modal ---------- */
  var roomModal = document.getElementById("room-modal");
  var roomModalImg = document.getElementById("room-modal-img");
  var roomModalTitle = document.getElementById("room-modal-title");
  var roomModalCapacity = document.getElementById("room-modal-capacity");
  var roomModalEquip = document.getElementById("room-modal-equip");
  var roomModalWhatsapp = document.getElementById("room-modal-whatsapp");
  var roomModalClose = document.getElementById("room-modal-close");
  var sourceEquipList = document.querySelector(".amenities-inline .check-list");

  var WHATSAPP_MESSAGES = {
    es: "Hola! Quiero consultar disponibilidad para la habitación: ",
    en: "Hi! I'd like to check availability for the room: ",
    pt: "Olá! Gostaria de consultar disponibilidade para o quarto: "
  };

  function visibleText(el) {
    var span = el.querySelector("[data-lang]:not([hidden])");
    return span ? span.textContent.trim() : el.textContent.trim();
  }

  function openRoomModal(card) {
    var img = card.querySelector(".room-card-media img");
    var title = visibleText(card.querySelector("h3"));
    var capacity = visibleText(card.querySelector(".room-card-body > p"));

    roomModalImg.src = img.src;
    roomModalImg.alt = img.alt;
    roomModalTitle.textContent = title;
    roomModalCapacity.textContent = capacity;

    roomModalEquip.innerHTML = "";
    if (sourceEquipList) {
      sourceEquipList.querySelectorAll("li").forEach(function (li) {
        roomModalEquip.appendChild(li.cloneNode(true));
      });
    }

    var lang = document.documentElement.getAttribute("lang") || "es";
    var message = (WHATSAPP_MESSAGES[lang] || WHATSAPP_MESSAGES.es) + title;
    roomModalWhatsapp.href = "https://wa.me/5492255410868?text=" + encodeURIComponent(message);

    roomModal.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function closeRoomModal() {
    roomModal.hidden = true;
    roomModalImg.src = "";
    document.body.style.overflow = "";
  }

  document.querySelectorAll("[data-room-open]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      openRoomModal(btn.closest(".room-card"));
    });
  });

  roomModalClose.addEventListener("click", closeRoomModal);
  roomModal.addEventListener("click", function (e) {
    if (e.target === roomModal) closeRoomModal();
  });
  document.addEventListener("keydown", function (e) {
    if (!roomModal.hidden && e.key === "Escape") closeRoomModal();
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

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -60px 0px" });
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("revealed"); });
  }

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
