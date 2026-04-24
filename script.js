const output = document.getElementById('console-output');
const projectShowcase = document.getElementById('project-showcase');
let typingTimeout;

const data = {
    about: `> INITIATING PROFILE RETRIEVAL...

> NAME: Mauro Nahuel Uriarte
> ROLE: Unity UI/Gameplay Programmer
> FOCUS: Modular systems, scalable architecture, production-ready code
> LOCATION: Buenos Aires, Argentina
> CONTACT: mauronuriarte@gmail.com

> SUMMARY:
  Gameplay programmer specialized in UI systems, gameplay architecture, and editor tooling for Unity. Experienced shipping AAA titles and building modular, pattern-driven game systems.

  Currently at Mega Cat Studios contributing to God of War: Sons of Sparta (PlayStation).

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

  - Contributed to gameplay and UI systems on a PlayStation title
  - Implemented and maintained UI features in a production environment
  - Built reusable UI components and custom editor tooling to support designer iteration
  - Developed scalable UI architecture for gameplay features
  - Collaborated with designers, artists and engineers across disciplines
  - Bug fixing, optimization and profiling

> [PREV] Accenture
  Full Stack Developer — Mar 2022 to Aug 2023
  ─────────────────────────────────────
  - Software engineering foundation in architecture, scalable systems, APIs, CI/CD
  - Production experience with enterprise-level codebases and workflows`,

    education: `> RETRIEVING ACADEMIC RECORDS...

> [IN PROGRESS] UADE — Buenos Aires
  Facultad de Ingeniería
  Bachelor's Degree in Game Development
  Graduating 2026.

> [2020 - 2023] UBA (FIUBA) — Buenos Aires
  Facultad de Ingeniería
  Bachelor's Degree in System's Analysis
  (unfinished — pivoted to game development)`,

    // projects: handled by typeProjectsSequence() — staged boot lines
};

function showSection(key) {
    clearTimeout(typingTimeout);
    output.textContent = "";
    projectShowcase.style.display = 'none';

    // Update active nav button + aria-pressed
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
    });
    const buttons = document.querySelectorAll('.nav-btn');
    const sectionKeys = ['about', 'projects', 'skills', 'experience', 'education'];
    const idx = sectionKeys.indexOf(key);
    if (idx >= 0 && buttons[idx]) {
        buttons[idx].classList.add('active');
        buttons[idx].setAttribute('aria-pressed', 'true');
    }

    // Scroll to top before typing
    const consoleScreen = document.querySelector('.console-screen');
    consoleScreen.scrollTop = 0;

    if (key === 'projects') {
        typeProjectsSequence();
    } else {
        typeWriter(data[key], 0, key);
    }
}

/* Projects intro: type line → 1s pause → type next line → 1s pause → last line → show grid instantly. */
function typeProjectsSequence() {
    const lines = [
        '> ACCESSING PROJECT FILES...',
        '> LOADING VISUAL MODULES...',
        '> READY.'
    ];

    if (prefersReducedMotion) {
        output.textContent = lines.join('\n');
        projectShowcase.style.display = 'block';
        return;
    }

    let lineIdx = 0;
    let charIdx = 0;

    function typeLine() {
        if (charIdx < lines[lineIdx].length) {
            output.textContent += lines[lineIdx].charAt(charIdx);
            charIdx++;
            typingTimeout = setTimeout(typeLine, 4);
        } else {
            // Line finished.
            const isLast = lineIdx === lines.length - 1;
            if (isLast) {
                // Show grid instantly after READY is fully typed.
                projectShowcase.style.display = 'block';
                return;
            }
            // Pause 1s, then newline + next line.
            typingTimeout = setTimeout(() => {
                output.textContent += '\n';
                lineIdx++;
                charIdx = 0;
                typeLine();
            }, 1000);
        }
    }

    typeLine();
}

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function typeWriter(text, i, currentKey) {
    // Skip animation for users who prefer reduced motion
    if (prefersReducedMotion) {
        output.textContent = text;
        return;
    }
    if (i < text.length) {
        output.textContent += text.charAt(i);
        i++;
        typingTimeout = setTimeout(() => typeWriter(text, i, currentKey), 4);
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
    const prevEl = imgs[current];
    imgs[current].classList.remove('active');
    dots[current].classList.remove('active');

    current = (current + direction + imgs.length) % imgs.length;
    imgs[current].classList.add('active');
    dots[current].classList.add('active');

    // If navigating away from a video iframe, reload its src to stop playback.
    if (prevEl.tagName === 'IFRAME') {
        prevEl.src = prevEl.src;
    }
}

function expandCarousel(el) {
    const carousel = el.closest('.card-carousel');
    const active = carousel ? carousel.querySelector('.carousel-img.active') : null;
    // Only expand still images — iframes (videos) play inline.
    if (active && active.tagName === 'IMG') openDiagramModal(active.src, active.alt, '// IMAGE VIEW');
}

/* ================================ */
/* === DIAGRAM LIGHTBOX MODAL   === */
/* ================================ */
let _lastFocusBeforeModal = null;

function openDiagramModal(src, alt, title) {
    const modal = document.getElementById('diagram-modal');
    const img = document.getElementById('diagram-modal-img');
    const titleEl = document.getElementById('diagram-modal-title');
    if (!modal || !img) return;

    _lastFocusBeforeModal = document.activeElement;
    img.src = src;
    img.alt = alt || '';
    if (title && titleEl) titleEl.textContent = title;

    // Wide layout only for SVG diagrams, centered fit for photos
    const isSvg = src.toLowerCase().endsWith('.svg');
    modal.classList.toggle('modal--diagram', isSvg);

    modal.hidden = false;
    document.body.classList.add('modal-open');
    // Move focus to close button for a11y
    const closeBtn = modal.querySelector('.diagram-modal-close');
    if (closeBtn) closeBtn.focus();
}

function closeDiagramModal() {
    const modal = document.getElementById('diagram-modal');
    if (!modal || modal.hidden) return;
    modal.hidden = true;
    document.body.classList.remove('modal-open');
    // Restore focus to whatever triggered the modal
    if (_lastFocusBeforeModal && typeof _lastFocusBeforeModal.focus === 'function') {
        _lastFocusBeforeModal.focus();
    }
    _lastFocusBeforeModal = null;
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const modal = document.getElementById('diagram-modal');
        if (modal && !modal.hidden) closeDiagramModal();
    }
});

window.onload = () => showSection('about');
