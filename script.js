const output = document.getElementById('console-output');
const projectShowcase = document.getElementById('project-showcase');
let typingTimeout;

const data = {
    about: `> INITIATING PROFILE RETRIEVAL...
> NAME: Mauro Nahuel Uriarte
> STATUS: Lead UI Backend & Gameplay Programmer
> LOCATION: Buenos Aires, Argentina
> EXPERIENCE: 
  - Lead UI Backend @ Mega Cat Studios (New Production)
  - UI Backend Developer @ Mega Cat Studios (God of War: Sons of Sparta)
  - Full Stack Developer @ Accenture
> SUMMARY: Unity gameplay programmer focused on modular systems, scalable architecture, and production-ready code.`,
            
    skills: `> SCANNING TECH STACK...
> LANGUAGES: C#, C++, C.
> ENGINES: Unity, Unreal.
> GAMEPLAY & SYSTEMS: State Machines, AI Logic, Custom Editors, ScriptableObjects.
> ENGINEERING: OOP, Profiling, Optimization, CI/CD, APIs.
> PATTERNS: Object Pool, Service Locator, Command, Abstract Factory, Strategy, Flyweight.`,
             
    projects: `> ACCESSING PRODUCTION FILES...
> [1] Unannounced Production (Lead UI/Gameplay)
> [2] God of War: Sons of Sparta (UI Backend)
> [3] Mawasure (3D RPG Prototype)
> [4] ShadowBound (Dungeon-Management)
> LOADING VISUAL MODULES...
> READY.`
};

function showSection(key) {

    clearTimeout(typingTimeout);
    output.textContent = "";
    projectShowcase.style.display = 'none'; 
    
    typeWriter(data[key], 0, key);
}

function typeWriter(text, i, currentKey) {
    if (i < text.length) {
        output.textContent += text.charAt(i);
        
        i++;
        typingTimeout = setTimeout(() => typeWriter(text, i, currentKey), 25); 
        
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