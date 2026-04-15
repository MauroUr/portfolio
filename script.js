const output = document.getElementById('console-output');
const projectShowcase = document.getElementById('project-showcase');
let typingTimeout;

const data = {
    about: `> INITIATING PROFILE RETRIEVAL...
> NAME: Mauro Nahuel Uriarte
> ROLE: Unity UI/Gameplay Programmer
> LOCATION: Buenos Aires, Argentina
> CONTACT: mauronuriarte@gmail.com

> SUMMARY:
  Unity gameplay programmer focused on modular
  systems, scalable architecture, and production-
  ready code. Experience building full games and
  contributing to professional development pipelines.

> COMPETENCIES:
  - Initiative
  - Communication skills
  - Cross-discipline collaboration
  - Rapid feature iteration`,

    skills: `> SCANNING TECH STACK...

> LANGUAGES: C#, C++, C
> ENGINES: Unity, Unreal

> GAMEPLAY & SYSTEMS:
  - Gameplay Programming
  - State Machines
  - AI Logic (Decision Trees, FSM)
  - Systems Design

> UNITY TOOLS:
  - ScriptableObjects
  - Custom Editors
  - Animation Systems
  - Input System

> ENGINEERING:
  - OOP, Debugging, Profiling, Optimization
  - Architecture, Scalable Systems, APIs, CI/CD

> DESIGN PATTERNS:
  - Object Pool, Service Locator, Command
  - Abstract Factory, Strategy, Flyweight

> TOOLS: Git, Odin Inspector, DoTween`,

    experience: `> LOADING WORK HISTORY...

> [CURRENT] Mega Cat Studios | Unity Developer
  (MAR 2025 - PRESENT)
  - Contributed to gameplay and UI systems on
    God of War: Sons of Sparta (AAA title)
  - Implemented and maintained UI features in
    a production environment
  - Built reusable UI components and editor
    tooling to support iteration
  - Developed scalable UI systems for designers
    and gameplay features
  - Collaborated with designers, artists and
    engineers across disciplines
  - Bug fixing, optimization and performance
    improvements

> [PREV] Accenture | Full Stack Developer
  (MAR 2022 - AUG 2023)
  - Strong software engineering foundation
  - Architecture, scalable systems, APIs, CI/CD`,

    education: `> RETRIEVING ACADEMIC RECORDS...

> [IN PROGRESS] UADE
  Facultad de Ingeniería
  Bachelor's Degree in Game Development
  Graduating in 2026.

> [2020-2023] UBA
  Facultad de Ingeniería
  Bachelor's Degree in System's Analysis
  (unfinished)`,

    projects: `> ACCESSING PROJECT FILES...
> [1] God of War: Sons of Sparta (UI Backend — AAA)
> [2] ShadowBound (AI & Gameplay Systems)
> [3] Mawasure (3D RPG — Design Patterns)
> [4] Chronicles of a Pixel (2D Action — Beta)
> [5] Roguelike Procedural Generator (Algorithms)
> [6] Bears Against Time (Academic — C)
> LOADING VISUAL MODULES...
> READY.`
};

function showSection(key) {
    clearTimeout(typingTimeout);
    output.textContent = "";
    projectShowcase.style.display = 'none';

    // Update active nav button
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    const buttons = document.querySelectorAll('.nav-btn');
    const sectionKeys = ['about', 'skills', 'experience', 'education', 'projects'];
    const idx = sectionKeys.indexOf(key);
    if (idx >= 0 && buttons[idx]) buttons[idx].classList.add('active');

    typeWriter(data[key], 0, key);
}

function typeWriter(text, i, currentKey) {
    if (i < text.length) {
        output.textContent += text.charAt(i);
        i++;
        typingTimeout = setTimeout(() => typeWriter(text, i, currentKey), 4);

        const consoleScreen = document.querySelector('.console-screen');
        consoleScreen.scrollTop = consoleScreen.scrollHeight;
    } else {
        if (currentKey === 'projects') {
            projectShowcase.style.display = 'block';
            const consoleScreen = document.querySelector('.console-screen');
            consoleScreen.scrollTop = consoleScreen.scrollHeight;
        }
    }
}

function filterProjects(category) {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));

    if (window.event) {
        window.event.currentTarget.classList.add('active');
    }

    const projects = document.querySelectorAll('.project-card');
    projects.forEach(project => {
        if (category === 'all' || project.classList.contains(category)) {
            project.style.display = 'flex';
        } else {
            project.style.display = 'none';
        }
    });
}

window.onload = () => showSection('about');
