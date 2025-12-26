// --- Animated Profile Titles ---
const titles = [
  "Data Enthusiast",
  "Business Analyst",
  "Software Engineer",
  "Full Stack Developer",
  
];

let titleIndex = 0;
let charIndex = 0;
let deleting = false;
const animatedTitles = document.getElementById("animated-titles");

function typeTitles() {
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
if (animatedTitles) typeTitles();

// Filter project cards
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove active class from all buttons
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    const selectedCategory = button.getAttribute('data-category');

    projectCards.forEach(card => {
      const cardCategory = card.getAttribute('data-category');

      if (selectedCategory === 'all' || cardCategory === selectedCategory) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});


// --- Project Tag Collapse/Expand ---
document.querySelectorAll(".project-tags").forEach((tagContainer) => {
  const tags = Array.from(tagContainer.children);

  if (tags.length > 3) {
    tags.forEach((tag, idx) => {
      if (idx > 2) tag.style.display = "none";
    });

    const more = document.createElement("span");
    more.className = "project-tag more";
    more.textContent = `+${tags.length - 3}`;
    tagContainer.appendChild(more);

    more.addEventListener("click", () => {
      tags.forEach((tag) => (tag.style.display = "inline-block"));
      more.style.display = "none";

      const less = document.createElement("span");
      less.className = "project-tag less";
      less.textContent = "Less";
      tagContainer.appendChild(less);

      less.addEventListener("click", () => {
        tags.forEach((tag, idx) => {
          tag.style.display = idx > 2 ? "none" : "inline-block";
        });
        less.remove();
        more.style.display = "inline-block";
      });
    });
  }
});

// --- EmailJS Contact Form ---
(function () {
  emailjs.init("iY1JwRab24Od16KNi"); // ← Replace with your EmailJS public key
})();

const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    formStatus.textContent = "Sending...";
    formStatus.style.color = "var(--primary)";

    emailjs
      .sendForm("service_2cvtfhi", "template_0yx0kqe", this)
      .then(() => {
        formStatus.textContent = "✅ Message sent! Thank you.";
        formStatus.style.color = "green";
        contactForm.reset();
      })
      .catch((error) => {
        formStatus.textContent = "❌ Failed to send. Please try again.";
        formStatus.style.color = "red";
        console.error("EmailJS error:", error);
      });
  });
}
