const output = document.getElementById('console-output');
const projectShowcase = document.getElementById('project-showcase');
let typingTimeout;

const data = {
    about: `> INITIATING PROFILE RETRIEVAL...

> NAME: Mauro Nahuel Uriarte
> ROLE: Unity UI/Gameplay Programmer
> FOCUS: Modular systems, scalable architecture,
        production-ready code
> LOCATION: Buenos Aires, Argentina
> CONTACT: mauronuriarte@gmail.com

> SUMMARY:
  Gameplay programmer specialized in UI systems,
  gameplay architecture, and editor tooling for
  Unity. Experienced shipping AAA titles and
  building modular, pattern-driven game systems.

  Currently at Mega Cat Studios contributing to
  God of War: Sons of Sparta (PlayStation).

> COMPETENCIES:
  - Cross-discipline collaboration
  - Rapid feature iteration
  - Technical communication
  - Initiative & ownership`,

    skills: `> SCANNING TECH STACK...

> PROGRAMMING:
  C# ........... [primary — Unity, systems]
  C++ .......... [Unreal, low-level]
  C ............ [algorithms, academic]
  Python ....... [tooling, scripting, automation]
  SQL .......... [data, queries]

> ENGINES:
  Unity ........ [professional — current]
  Unreal ....... [secondary]

> GAMEPLAY & SYSTEMS:
  - Gameplay Programming
  - State Machines & FSM
  - AI (Decision Trees, Flocking, Steering)
  - Systems Design & Architecture

> UNITY TOOLING:
  - ScriptableObjects (data-driven design)
  - Custom Editors, Inspectors & Drawers
  - Animation Systems & Cinemachine
  - Input System (new)
  - Addressables (async asset loading)
  - Odin Inspector, DoTween

> OPTIMIZATION:
  - Custom PlayerLoop injection (no Update)
  - Object Pooling (generic, type-safe)
  - Custom AABB physics (replacing Unity)
  - MaterialPropertyBlock (GPU batching)
  - SRP Batcher, platform-specific URP
  - Event-driven UI (no per-frame polling)
  - Async scene loading
  - Profiling & memory management

> ENGINEERING:
  - OOP, SOLID Principles
  - Debugging, Profiling, Optimization
  - Architecture, Scalable Systems
  - APIs, CI/CD
  - Git (branching, PRs, conflict resolution)

> DESIGN PATTERNS:
  Object Pool, Service Locator, Command,
  Abstract Factory, Strategy, Flyweight,
  State, Observer, Singleton, Composite,
  Template Method, Wrapper`,

    experience: `> LOADING WORK HISTORY...

> [CURRENT] Mega Cat Studios
  Unity Developer — Mar 2025 to Present
  ─────────────────────────────────────
  Project: God of War: Sons of Sparta (AAA)

  - Contributed to gameplay and UI systems
    on a PlayStation title
  - Implemented and maintained UI features
    in a production environment
  - Built reusable UI components and custom
    editor tooling to support designer iteration
  - Developed scalable UI architecture for
    gameplay features
  - Collaborated with designers, artists and
    engineers across disciplines
  - Bug fixing, optimization and profiling

> [PREV] Accenture
  Full Stack Developer — Mar 2022 to Aug 2023
  ─────────────────────────────────────
  - Software engineering foundation in
    architecture, scalable systems, APIs, CI/CD
  - Production experience with enterprise-level
    codebases and workflows`,

    education: `> RETRIEVING ACADEMIC RECORDS...

> [IN PROGRESS] UADE — Buenos Aires
  Facultad de Ingeniería
  Bachelor's Degree in Game Development
  Graduating 2026.

> [2020 - 2023] UBA (FIUBA) — Buenos Aires
  Facultad de Ingeniería
  Bachelor's Degree in System's Analysis
  (unfinished — pivoted to game development)`,

    projects: `> ACCESSING PROJECT FILES...

  TIER 1 — HERO PROJECT:
> [1] God of War: Sons of Sparta
      AAA | UI Backend | Mega Cat Studios

  TIER 2 — SUPPORT PROJECTS:
> [2] Mawasure — RPG | 8 Design Patterns
> [3] ShadowBound — AI | Decision Trees + FSM
> [4] Chronicles of a Pixel — 2D Action | Beta

  TIER 3 — EXPERIMENTAL:
> [5] Bears Against Time — C (FIUBA 2020)

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

    // Scroll to top before typing
    const consoleScreen = document.querySelector('.console-screen');
    consoleScreen.scrollTop = 0;

    typeWriter(data[key], 0, key);
}

function typeWriter(text, i, currentKey) {
    if (i < text.length) {
        output.textContent += text.charAt(i);
        i++;
        typingTimeout = setTimeout(() => typeWriter(text, i, currentKey), 4);
    } else {
        if (currentKey === 'projects') {
            projectShowcase.style.display = 'block';
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
            project.style.display = project.classList.contains('hero') ? 'grid' : 'flex';
        } else {
            project.style.display = 'none';
        }
    });
}

function carouselMove(btn, direction) {
    const carousel = btn.closest('.card-carousel');
    const imgs = carousel.querySelectorAll('.carousel-img');
    const dots = carousel.querySelectorAll('.dot');

    let current = [...imgs].findIndex(img => img.classList.contains('active'));
    imgs[current].classList.remove('active');
    dots[current].classList.remove('active');

    current = (current + direction + imgs.length) % imgs.length;
    imgs[current].classList.add('active');
    dots[current].classList.add('active');
}

window.onload = () => showSection('about');
