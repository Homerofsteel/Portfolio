const translations = {
  fr: {
    nav_about: "À propos",
    nav_skills: "Compétences",
    nav_projects: "Projets",
    nav_contact: "Contact",
    hero_title: "Bonjour, je suis <span>Lucas Vernageau</span>",
    hero_text:
      "Étudiant en développement Web Full Stack.<br> Étudiant chez Ynov - Nantes",
    hero_btn: "Voir mes projets",
    about_title: "À propos de moi",
    about_text: `Étudiant passionné par le développement web, j’aime concevoir des sites simples et efficaces, pensés pour offrir une expérience utilisateur fluide et intuitive.

Actuellement en formation à Ynov Nantes, je développe mes compétences en HTML, CSS, JavaScript et en outils front et back-end dans le but de devenir développeur full stack.

Curieux et motivé, je m’intéresse également à la création de jeux vidéo, à la musique et à tout ce qui me permet d’explorer de nouvelles technologies et d’apprendre en continu.`,
    cv: "📥 Télécharger mon cv",
    skills_title: "Mes <span>Compétences</span>",
    skills_subtitle:
      "Technologies et outils avec lesquels je travaille pour construire des solutions simples et efficaces",
    langages_main: "Langages Principaux",
    advanced: "Avancé",
    intermediate: "Intermédiaire",
    langages_secondary: "Langages Secondaires",
    beginner: "Débutant",
    tools: "Outils & Technologies",
    myprojects: "Mes projets",
    sharwiki_description: "Wiki complet d'un jeu vidéo.",
    forum_description: "Un simple forum communautaire.",
    online: "● En ligne",
    details: "Détails",
    eyetracker_description: "Un simple site qui suit ta souris.",
    pacman_description: "Version modifiée de Pac-Man.",
    moreprojects: "Voir plus de projets",
    contactdetails: "Intéressé par mon profil ? N’hésitez pas à me contacter :",
    open: "Ouvrir",
    copyright: "© 2025 Lucas Vernageau",
  },
  en: {
    nav_about: "About",
    nav_skills: "Skills",
    nav_projects: "Projects",
    nav_contact: "Contact",
    hero_title: "Hello, I’m <span>Lucas Vernageau</span>",
    hero_text: "Web development student.<br> Student at Ynov - Nantes",
    hero_btn: "View my projects",
    about_title: "About Me",
    about_text: `I’m a passionate web development student who enjoys designing simple and effective websites focused on delivering a smooth and intuitive user experience.

Currently studying at Ynov Nantes, I’m developing my skills in HTML, CSS, JavaScript, and both front-end and back-end technologies, with the goal of becoming a full-stack developer.

Curious and motivated, I’m also passionate about video games, music, and exploring new technologies to keep learning and growing every day.`,
    cv: "📥 Download my resume",
    skills_title: "My <span>Skills</span>",
    skills_subtitle:
      "Technologies and tools I work with to build simple and efficient solutions",
    langages_main: "Main Languages",
    advanced: "Advanced",
    intermediate: "Intermediate",
    langages_secondary: "Secondary Languages",
    beginner: "Beginner",
    tools: "Tools & Technologies",
    myprojects: "My Projects",
    sharwiki_description: "Comprehensive wiki for a video game.",
    forum_description: "A simple community forum.",
    pacman_description: "Modified version of Pac-Man.",
    online: "● Online",
    details: "Details",
    eyetracker_description: "A simple site that tracks your mouse.",
    contactdetails: "Interested in my profile? Feel free to contact me:",
    moreprojects: "See more projects",
    open: "Open",
    copyright: "© 2025 Lucas Vernageau",
  },
};

const languageBtn = document.getElementById("language-toggle");

let currentLang = localStorage.getItem("lang") || "fr";
languageBtn.textContent = currentLang.toUpperCase();
applyTranslations(currentLang);

languageBtn.addEventListener("click", () => {
  const newLang = currentLang === "fr" ? "en" : "fr";
  setLanguage(newLang);
  languageBtn.textContent = newLang.toUpperCase();
});

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("lang", lang);
  applyTranslations(lang);
}

function applyTranslations(lang) {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (translations[lang][key]) {
      el.innerHTML = translations[lang][key];
    }
  });
}
