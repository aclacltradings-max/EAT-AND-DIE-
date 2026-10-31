/* ============================================================
   EAT BELLEFULL — landing page behaviour
   ============================================================ */

/* ------------------------------------------------------------
   CONFIG — replace with your real WhatsApp business number.
   Format: country code + number, digits only, no "+" or spaces.
   Example for Nigeria: "2348012345678"
   ------------------------------------------------------------ */
const WHATSAPP_NUMBER = "2340000000000";

const WA_BASE = "https://wa.me/";

document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("siteHeader");
  const nav = document.getElementById("primaryNav");
  const navToggle = document.getElementById("navToggle");
  const form = document.getElementById("orderForm");
  const hint = document.getElementById("formHint");
  const waFloat = document.getElementById("waFloat");
  const yearEl = document.getElementById("year");

  /* ---------- Footer year ---------- */
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Header shadow on scroll ---------- */
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Mobile navigation ---------- */
  const closeNav = () => {
    nav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open menu");
  };

  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  });

  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeNav));

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeNav();
  });

  document.addEventListener("click", (e) => {
    if (!nav.classList.contains("open")) return;
    if (!nav.contains(e.target) && !navToggle.contains(e.target)) closeNav();
  });

  /* ---------- Plan buttons pre-select the interest dropdown ---------- */
  const planSelect = document.getElementById("plan");
  document.querySelectorAll("[data-plan]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const value = btn.dataset.plan;
      const match = [...planSelect.options].find((o) => o.value === value);
      if (match) planSelect.value = value;
    });
  });

  /* ---------- Reveal on scroll ---------- */
  const revealTargets = document.querySelectorAll(
    ".section-head, .card, .feature, .price-table-wrap, .price-disclaimer, .contact-copy, .contact-form"
  );
  revealTargets.forEach((el) => el.classList.add("reveal"));

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealTargets.forEach((el) => io.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add("visible"));
  }

  /* ---------- WhatsApp message builder ---------- */
  const buildMessage = (data) => {
    const lines = [
      "Hello EAT BELLEFULL, I would like to place an order.",
      "",
      `*Name:* ${data.name}`,
      `*Phone:* ${data.phone}`,
      `*Interested in:* ${data.plan}`,
      `*Order:* ${data.items}`,
    ];
    if (data.delivery) lines.push(`*Delivery address:* ${data.delivery}`);
    lines.push("", "Sent from the EAT BELLEFULL website.");
    return lines.join("\n");
  };

  const openWhatsApp = (message) => {
    const url = `${WA_BASE}${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener");
  };

  /* ---------- Contact form -> WhatsApp ---------- */
  // Note: use getElementById, not form.name — HTMLFormElement.name is the
  // form's own name attribute, not the input named "name".
  const nameEl = document.getElementById("name");
  const phoneEl = document.getElementById("phone");
  const itemsEl = document.getElementById("items");
  const deliveryEl = document.getElementById("delivery");

  const setHint = (text, type) => {
    hint.textContent = text;
    hint.className = "form-hint" + (type ? " " + type : "");
  };

  const markInvalid = (el, invalid) => el.classList.toggle("invalid", invalid);

  function validate(el) {
    const empty = el.value.trim().length === 0;
    markInvalid(el, empty);
    return !empty;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const ok = [nameEl, phoneEl, itemsEl].map(validate).every(Boolean);

    if (!ok) {
      setHint("Please fill in your name, phone number and your order.", "error");
      return;
    }

    openWhatsApp(
      buildMessage({
        name: nameEl.value.trim(),
        phone: phoneEl.value.trim(),
        plan: planSelect.value,
        items: itemsEl.value.trim(),
        delivery: deliveryEl.value.trim(),
      })
    );
    setHint("Opening WhatsApp… tap send to deliver your order.", "success");
  });

  form.querySelectorAll("input, textarea").forEach((el) => {
    el.addEventListener("input", () => {
      if (el.value.trim()) markInvalid(el, false);
    });
  });

  /* ---------- Floating WhatsApp button ---------- */
  waFloat.addEventListener("click", (e) => {
    e.preventDefault();
    openWhatsApp("Hello EAT BELLEFULL, I have a question about your food and drinks.");
  });
});
