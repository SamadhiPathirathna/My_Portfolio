// ===================== Animated Profile Titles =====================
const titles = ["Business Analyst", "Business Intelligence Analyst","Data Analyst", "Full Stack Developer"];
let titleIndex = 0, charIndex = 0, deleting = false;
const animatedTitles = document.getElementById("animated-titles");

function typeTitles() {
  if (!animatedTitles) return;
  const current = titles[titleIndex];
  if (!deleting) {
    animatedTitles.textContent = current.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeTitles, 1200);
      return;
    }
  } else {
    animatedTitles.textContent = current.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      deleting = false;
      titleIndex = (titleIndex + 1) % titles.length;
    }
  }
  setTimeout(typeTitles, deleting ? 60 : 120);
}
typeTitles();

// ===================== Project Tabs =====================
const tabButtons = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

tabButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    tabButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const tabId = btn.dataset.tab;
    tabContents.forEach(c => c.classList.remove("active"));
    document.getElementById(tabId).classList.add("active");
  });
});

// ===================== EmailJS Contact Form =====================
emailjs.init("YOUR_USER_ID"); // replace with your EmailJS ID
const contactForm = document.getElementById("contact-form");
contactForm.addEventListener("submit", e => {
  e.preventDefault();
  emailjs.sendForm('service_xxx', 'template_xxx', contactForm)
    .then(() => {
      document.getElementById("form-status").textContent = "Message Sent!";
      contactForm.reset();
    })
    .catch(err => {
      document.getElementById("form-status").textContent = "Error. Try again.";
      console.error(err);
    });
});

// ===================== Dark / Light Mode Toggle =====================
const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => document.body.classList.toggle("dark"));

// ===================== Smooth Scroll =====================
document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    if (target) target.scrollIntoView({ behavior: "smooth" });
  });
});
