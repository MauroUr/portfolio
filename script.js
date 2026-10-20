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

  At Mega Cat Studios: contributed to God of War: Sons of Sparta (PlayStation), and currently own the entire UI, several gameplay systems, and localization tooling on an unannounced title - while reviewing code, mentoring developers, onboarding new hires, and coordinating across UI and design teams.

> COMPETENCIES:
  - Full UI & systems ownership
  - Code review & technical mentoring
  - Cross-discipline collaboration
  - Rapid feature iteration
  - Technical communication
  - Initiative & ownership`,

    skills: `> SCANNING TECH STACK...

> PROGRAMMING:
  C# ........... [primary - Unity, systems]
  C++ .......... [Unreal, low-level]
  C ............ [algorithms, academic]
  Python ....... [tooling, scripting, automation]
  SQL .......... [data, queries]

> ENGINES:
  Unity ........ [professional - current]
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

> LEADERSHIP & PROCESS:
  - Code review & technical mentoring
  - Onboarding & knowledge transfer
  - Cross-team coordination (UI front-end, design)
  - Localization tooling & automation
  - Release management (Steam builds)

> DESIGN PATTERNS:
  Object Pool, Service Locator, Command,
  Abstract Factory, Strategy, Flyweight,
  State, Observer, Singleton, Composite,
  Template Method, Wrapper`,

    experience: `> LOADING WORK HISTORY...

> [CURRENT] Mega Cat Studios
  Unity Developer - Mar 2025 to Present
  -------------------------------------

  // PROJECT_01 - God of War: Sons of Sparta (AAA, PlayStation)
  - Contributed to gameplay and UI systems on a PlayStation title
  - Implemented and maintained UI features in a production environment
  - Built reusable UI components and custom editor tooling to support designer iteration
  - Developed scalable UI architecture for gameplay features
  - Collaborated with designers, artists and engineers across disciplines
  - Bug fixing, optimization and profiling

  // PROJECT_02 - Unannounced title (WIP, NDA) - Lead-level role
  - Sole owner of the game's entire UI, end-to-end
  - Built several complete gameplay systems
  - Developed tools to automate localization
  - Reviewed code across the team
  - Mentored internal developers and onboarded a new hire
  - Coordinated with UI front-end and design teams for UI implementation
  - Managed Steam build releases

> [PREV] Accenture
  Full Stack Developer - Mar 2022 to Aug 2023
  -------------------------------------
  - Software engineering foundation in architecture, scalable systems, APIs, CI/CD
  - Production experience with enterprise-level codebases and workflows`,

    education: `> RETRIEVING ACADEMIC RECORDS...

> [IN PROGRESS] UADE - Buenos Aires
  Facultad de Ingeniería
  Bachelor's Degree in Game Development
  Graduating 2026.

> [2020 - 2023] UBA (FIUBA) - Buenos Aires
  Facultad de Ingeniería
  Bachelor's Degree in System's Analysis
  (unfinished - pivoted to game development)`,
};

function showSection(key) {
    clearTimeout(typingTimeout);
    output.textContent = "";
    projectShowcase.style.display = 'none';

    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    const buttons = document.querySelectorAll('.nav-btn');
    const sectionKeys = ['projects', 'about', 'skills', 'experience', 'education'];
    const idx = sectionKeys.indexOf(key);
    if (idx >= 0 && buttons[idx]) buttons[idx].classList.add('active');

    const consoleScreen = document.querySelector('.console-screen');
    consoleScreen.scrollTop = 0;

    if (key === 'projects') {
        typeProjectsSequence();
    } else {
        typeWriter(data[key]);
    }
}

function parseLine(line) {
    if (line.trim() === '') return { lineClass: 'term-blank', segments: [] };

    if (/^> [A-Z ]+(?:\.\.\.|READY\.)$/.test(line)) {
        return { lineClass: 'term-line term-sys', segments: [{ cls: null, text: line }] };
    }

    let m = line.match(/^> (\[[^\]]+\])\s+(.+)$/);
    if (m) {
        return {
            lineClass: 'term-line term-header',
            segments: [
                { cls: 'term-prompt', text: '> ' },
                { cls: 'term-badge', text: m[1] },
                { cls: 'term-title', text: ' ' + m[2] }
            ]
        };
    }

    m = line.match(/^(> (NAME|ROLE|FOCUS|LOCATION|CONTACT):)\s+(.+)$/);
    if (m) {
        const valClass = (m[2] === 'NAME' || m[2] === 'ROLE') ? 'term-val-strong' : 'term-val';
        return {
            lineClass: 'term-line',
            segments: [
                { cls: 'term-key', text: m[1] + ' ' },
                { cls: valClass, text: m[3] }
            ]
        };
    }

    if (/^> [A-Z &]+:$/.test(line)) {
        return { lineClass: 'term-line term-section', segments: [{ cls: null, text: line }] };
    }

    m = line.match(/^\s*(\/\/ [A-Z0-9_]+ - )(.+)$/);
    if (m) {
        return {
            lineClass: 'term-line term-project',
            segments: [
                { cls: 'term-key', text: m[1] },
                { cls: 'term-sub', text: m[2] }
            ]
        };
    }

    m = line.match(/^\s*([A-Za-z#+]+)\s+(\.{3,})\s+(\[.+\])$/);
    if (m) {
        return {
            lineClass: 'term-line term-indent term-skill',
            segments: [
                { cls: 'term-val-strong', text: m[1] + ' ' },
                { cls: 'term-dots', text: m[2] + ' ' },
                { cls: 'term-meta', text: m[3] }
            ]
        };
    }

    if (/^\s*-{5,}$/.test(line)) {
        return { lineClass: 'term-line term-indent term-divider', segments: [{ cls: null, text: line.trim() }] };
    }

    m = line.match(/^\s*- (.+)$/);
    if (m) {
        return {
            lineClass: 'term-line term-bullet',
            segments: [
                { cls: 'term-key', text: '- ' },
                { cls: null, text: m[1] }
            ]
        };
    }

    const trimmed = line.trim();
    if (/^(Unity Developer|Full Stack Developer|Bachelor's Degree)/.test(trimmed)) {
        return { lineClass: 'term-line term-indent term-sub', segments: [{ cls: null, text: trimmed }] };
    }

    if (/^(Facultad de|\(unfinished)/.test(trimmed)) {
        return { lineClass: 'term-line term-indent term-meta', segments: [{ cls: null, text: trimmed }] };
    }

    return { lineClass: 'term-line term-indent term-p', segments: [{ cls: null, text: trimmed }] };
}

function typeProjectsSequence() {
    const lines = [
        '> ACCESSING PROJECT FILES...',
        '> LOADING VISUAL MODULES...',
        '> READY.'
    ];
    let lineIdx = 0;
    let charIdx = 0;
    let lineEl = null;

    function typeLine() {
        if (!lineEl) {
            lineEl = document.createElement('div');
            lineEl.className = 'term-line term-sys';
            output.appendChild(lineEl);
        }
        if (charIdx < lines[lineIdx].length) {
            lineEl.textContent += lines[lineIdx].charAt(charIdx);
            charIdx++;
            typingTimeout = setTimeout(typeLine, 4);
        } else {
            if (lineIdx === lines.length - 1) {
                projectShowcase.style.display = 'block';
                return;
            }
            typingTimeout = setTimeout(() => {
                lineEl = null;
                lineIdx++;
                charIdx = 0;
                typeLine();
            }, 1000);
        }
    }

    typeLine();
}

function typeWriter(text) {
    const parsedLines = text.split('\n').map(parseLine);
    let lineIdx = 0;
    let segIdx = 0;
    let charIdx = 0;
    let lineEl = null;
    let segEl = null;

    function step() {
        if (lineIdx >= parsedLines.length) return;
        const currentLine = parsedLines[lineIdx];

        if (!lineEl) {
            lineEl = document.createElement('div');
            lineEl.className = currentLine.lineClass;
            output.appendChild(lineEl);
            if (currentLine.segments.length === 0) {
                lineEl = null;
                lineIdx++;
                typingTimeout = setTimeout(step, 4);
                return;
            }
        }

        const currentSeg = currentLine.segments[segIdx];
        if (!segEl) {
            if (currentSeg.cls) {
                segEl = document.createElement('span');
                segEl.className = currentSeg.cls;
            } else {
                segEl = document.createTextNode('');
            }
            lineEl.appendChild(segEl);
        }

        if (charIdx < currentSeg.text.length) {
            segEl.textContent += currentSeg.text.charAt(charIdx);
            charIdx++;
            typingTimeout = setTimeout(step, 4);
        } else {
            segEl = null;
            charIdx = 0;
            segIdx++;
            if (segIdx >= currentLine.segments.length) {
                const isSysLine = currentLine.lineClass.includes('term-sys');
                lineEl = null;
                segIdx = 0;
                lineIdx++;
                if (isSysLine) {
                    typingTimeout = setTimeout(step, 1000);
                    return;
                }
            }
            step();
        }
    }

    step();
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

    if (prevEl.tagName === 'IFRAME') {
        prevEl.src = prevEl.src;
    }
}

function expandCarousel(el) {
    const carousel = el.closest('.card-carousel');
    const active = carousel ? carousel.querySelector('.carousel-img.active') : null;
    if (active && active.tagName === 'IMG') openDiagramModal(active.src, active.alt, '// IMAGE VIEW');
}

function openDiagramModal(src, alt, title) {
    const modal = document.getElementById('diagram-modal');
    const img = document.getElementById('diagram-modal-img');
    const titleEl = document.getElementById('diagram-modal-title');
    if (!modal || !img) return;

    img.src = src;
    img.alt = alt || '';
    if (title && titleEl) titleEl.textContent = title;

    const isSvg = src.toLowerCase().endsWith('.svg');
    modal.classList.toggle('modal--diagram', isSvg);

    modal.hidden = false;
    document.body.classList.add('modal-open');
}

function closeDiagramModal() {
    const modal = document.getElementById('diagram-modal');
    if (!modal || modal.hidden) return;
    modal.hidden = true;
    document.body.classList.remove('modal-open');
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const modal = document.getElementById('diagram-modal');
        if (modal && !modal.hidden) closeDiagramModal();
    }
});

window.onload = () => showSection('projects');
