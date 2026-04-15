const output = document.getElementById('console-output');
const projectShowcase = document.getElementById('project-showcase');
let typingTimeout; // To stop animation if user clicks another section quickly

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
    // 1. Clear everything and reset states
    clearTimeout(typingTimeout);
    output.textContent = ""; // Use textContent instead of innerHTML for better performance and to prevent HTML parsing bugs
    projectShowcase.style.display = 'none'; 
    
    // 2. Animate the corresponding text
    typeWriter(data[key], 0, key);
}

function typeWriter(text, i, currentKey) {
    if (i < text.length) {
        // Append raw text character by character
        output.textContent += text.charAt(i);
        
        i++;
        // Adjust speed here (25ms is a good standard for terminal effects)
        typingTimeout = setTimeout(() => typeWriter(text, i, currentKey), 25); 
        
        // Auto-scroll
        const consoleScreen = document.querySelector('.console-screen');
        consoleScreen.scrollTop = consoleScreen.scrollHeight;
    } else {
        // 3. When typing finishes, show the grid if we are in "projects"
        if (currentKey === 'projects') {
            projectShowcase.style.display = 'block';
            const consoleScreen = document.querySelector('.console-screen');
            consoleScreen.scrollTop = consoleScreen.scrollHeight; // Scroll to reveal grid
        }
    }
}

// Logic for Project Filters
function filterProjects(category) {
    // Handle active button styling
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.currentTarget.classList.add('active');

    // Filter project cards
    const projects = document.querySelectorAll('.project-card');
    projects.forEach(project => {
        if (category === 'all' || project.classList.contains(category)) {
            project.style.display = 'flex';
        } else {
            project.style.display = 'none';
        }
    });
}

// Load "About Me" by default on boot
window.onload = () => showSection('about');