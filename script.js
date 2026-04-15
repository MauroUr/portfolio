const output = document.getElementById('console-output');
const projectShowcase = document.getElementById('project-showcase');
let typingTimeout;

const data = {
    about: `> INICIANDO RECUPERACIÓN DE PERFIL...
> NOMBRE: Mauro Nahuel Uriarte
> ROL: Unity UI & Gameplay Programmer
> ESTADO: Lead UI Backend
> UBICACIÓN: Buenos Aires, Argentina
> INFO: Especializado en optimización de performance móvil, profiling y arquitecturas escalables para interfaces de usuario en entornos AAA.`,

    skills: `> ESCANEANDO STACK TECNOLÓGICO...
> LENGUAJES: C#, C++, Java, Swift, Objective-C, Kotlin.
> UNITY: Core, UI Toolkit, URP, Memory Management.
> SISTEMAS: Procedural Generation, Git, Von Neumann/Harvard Architectures.`,

    projects: `> ACCEDIENDO A ARCHIVOS DE PRODUCCIÓN...
> CARGANDO FILTROS Y MÓDULOS...
> LISTO.`
};

function showSection(key) {
    clearTimeout(typingTimeout);
    output.innerHTML = "";
    projectShowcase.style.display = 'none';

    typeWriter(data[key], 0, key);
}

function typeWriter(text, i, currentKey) {
    if (i < text.length) {
        let char = text.charAt(i);
        if (char === '\n') {
            output.innerHTML += '<br>';
        } else {
            output.innerHTML += char;
        }

        i++;
        typingTimeout = setTimeout(() => typeWriter(text, i, currentKey), 20);

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
