const output = document.getElementById('console-output');
const projectShowcase = document.getElementById('project-showcase');
let typingTimeout; // Para frenar la animación si cambian de sección rápido

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
    // 1. Limpiar todo y resetear estados
    clearTimeout(typingTimeout);
    output.innerHTML = ""; 
    projectShowcase.style.display = 'none'; // Ocultar los juegos al cambiar de sección
    
    // 2. Animar el texto correspondiente
    typeWriter(data[key], 0, key);
}

function typeWriter(text, i, currentKey) {
    if (i < text.length) {
        // Reemplazar saltos de línea con <br> para que se vea bien en HTML
        let char = text.charAt(i);
        if (char === '\n') {
            output.innerHTML += '<br>';
        } else {
            output.innerHTML += char;
        }
        
        i++;
        typingTimeout = setTimeout(() => typeWriter(text, i, currentKey), 20); // Velocidad
        
        // Auto-scroll
        const consoleScreen = document.querySelector('.console-screen');
        consoleScreen.scrollTop = consoleScreen.scrollHeight;
    } else {
        // 3. Si terminó de tipear y estábamos en "projects", mostramos la grilla
        if (currentKey === 'projects') {
            projectShowcase.style.display = 'block';
            const consoleScreen = document.querySelector('.console-screen');
            consoleScreen.scrollTop = consoleScreen.scrollHeight; // Scroll para ver la grilla
        }
    }
}

// Lógica de los Filtros de Juegos
function filterProjects(category) {
    // Manejar el botón activo
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.currentTarget.classList.add('active');

    // Filtrar tarjetas
    const projects = document.querySelectorAll('.project-card');
    projects.forEach(project => {
        if (category === 'all' || project.classList.contains(category)) {
            project.style.display = 'flex';
        } else {
            project.style.display = 'none';
        }
    });
}

// Cargar la sección "Sobre Mí" por defecto al entrar a la página
window.onload = () => showSection('about');