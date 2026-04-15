const output = document.getElementById('console-output');
const projectShowcase = document.getElementById('project-showcase');
let typingTimeout;

const data = {
    about: `> INITIATING PROFILE RETRIEVAL...
> NAME: Mauro Nahuel Uriarte
> ROLE: Unity UI & Gameplay Programmer
> STATUS: Lead UI Backend
> LOCATION: Buenos Aires, Argentina
> INFO: Specialized in mobile performance optimization, profiling, and scalable architectures for user interfaces in AAA environments.`,

    skills: `> SCANNING TECH STACK...
> LANGUAGES: C#, C++, Java, Swift, Objective-C, Kotlin.
> UNITY: Core, UI Toolkit, URP, Memory Management.
> SYSTEMS: Procedural Generation, Git, Von Neumann/Harvard Architectures.`,

    projects: `> ACCESSING PRODUCTION FILES...
> LOADING FILTERS AND MODULES...
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
    event.currentTarget.classList.add('active');

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
