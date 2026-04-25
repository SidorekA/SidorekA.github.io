const prog = document.getElementById("scroll-progress");
window.addEventListener("scroll", () => {
  const pct =
    (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
  prog.style.width = pct + "%";
});

const revealObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add("vis"), i * 80);
        revealObs.unobserve(e.target);
      }
    });
  },
  { threshold: 0.08 },
);
document
  .querySelectorAll(".exp-card, .int-card, .cert-card, .reveal")
  .forEach((el) => revealObs.observe(el));

const sections = document.querySelectorAll("div[id], section[id]");
const navLinks = document.querySelectorAll("nav a");
const activeObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        navLinks.forEach((a) => a.classList.remove("active"));
        const active = document.querySelector(
          'nav a[href="#' + e.target.id + '"]',
        );
        if (active) active.classList.add("active");
      }
    });
  },
  { threshold: 0.35 },
);
sections.forEach((s) => activeObs.observe(s));

const toggle = document.getElementById("navToggle");
const menu = document.getElementById("navMenu");
toggle.addEventListener("click", () => {
  toggle.classList.toggle("open");
  menu.classList.toggle("open");
});
menu.querySelectorAll("a").forEach((a) => {
  a.addEventListener("click", () => {
    toggle.classList.remove("open");
    menu.classList.remove("open");
  });
});

const langBtn = document.getElementById("langToggle");
const langLabel = document.getElementById("langLabel");
let currentLang = "pl";

function setLang(lang) {
  currentLang = lang;
  document.documentElement.setAttribute("data-lang", lang);
  langLabel.textContent = lang === "pl" ? "EN" : "PL";
  document.querySelectorAll("[data-pl]").forEach((el) => {
    const val = el.getAttribute("data-" + lang);
    if (val !== null) {
      if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
        el.value = val;
      } else {
        el.innerHTML = val;
      }
    }
  });
}

langBtn.addEventListener("click", () => {
  setLang(currentLang === "pl" ? "en" : "pl");
});

const skills = [
  ["Django", "Django"],
  ["Python", "Python"],
  ["Power BI DAX", "Power BI DAX"],
  ["GitHub Actions", "GitHub Actions"],
  ["Docker", "Docker"],
  ["Kubernetes", "Kubernetes"],
];
let si = 0;
const lt = document.getElementById("learning-text");
function nextSkill() {
  const [pl, en] = skills[si % skills.length];
  lt.textContent = currentLang === "pl" ? pl : en;
  si++;
  setTimeout(nextSkill, 3000);
}
nextSkill();
