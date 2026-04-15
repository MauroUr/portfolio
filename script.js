const inputField = document.getElementById("command-input");
const outputArea = document.getElementById("output");

const commands = {
    help: `
        <span style="color: #fff;">Comandos disponibles (Hacé clic en uno o escribilo):</span><br>
        - <span class="clickable-cmd" onclick="runCommand('about')">about</span>    : Información del sistema y perfil del desarrollador.<br>
        - <span class="clickable-cmd" onclick="runCommand('skills')">skills</span>   : Stack tecnológico y áreas de especialidad.<br>
        - <span class="clickable-cmd" onclick="runCommand('projects')">projects</span> : Registro de misiones y proyectos destacados.<br>
        - <span class="clickable-cmd" onclick="runCommand('clear')">clear</span>    : Limpia el buffer de la pantalla.
    `,
    about: `
        [ CARGANDO PERFIL... ]<br>
        > <b>Nombre:</b> Mauro Nahuel Uriarte<br>
        > <b>Status:</b> Lead UI Backend & Gameplay Developer en Mega Cat Studios.<br>
        > <b>Ubicación:</b> Buenos Aires, Argentina.<br>
        > <b>Background:</b> Especializado en arquitecturas escalables para interfaces de usuario, optimización de rendimiento móvil y desarrollo de lógicas de gameplay sistémicas.
    `,
    skills: `
        [ CARGANDO ARBOL DE HABILIDADES... ]<br>
        > <b>Core:</b> Unity (C#) | Arquitectura de Software | Git & Control de Versiones.<br>
        > <b>Graphics & Tech Art:</b> URP | Custom Shaders | Post-Processing.<br>
        > <b>Gameplay:</b> Procedural Generation (Worm-based algorithms, Roguelikes) | Sistemas de Inventario y Datos.
    `,
    projects: `
        [ ACCEDIENDO A REGISTROS DE PRODUCCION... ]<br>
        <b>01. Mega Cat Studios</b> [ACTUAL]<br>
        > Rol: Lead UI Backend & Gameplay Developer.<br>
        <br>
        <b>02. God of War: Sons of Sparta</b> [RELEASED]<br>
        > Rol: UI Backend Developer (Implementación de sistemas de interfaz AAA).<br>
        <br>
        <b>03. Sistemas Experimentales</b> [I+D]<br>
        > - Generador Procedural de Mundos Roguelike.<br>
        > - Sistema Modular de Donaciones con persistencia en la nube (JSON/C#).
    `,
    clear: "clear"
};

inputField.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        const commandText = inputField.value.trim().toLowerCase();
        inputField.value = ""; 
        executeCommand(commandText);
    }
});

function executeCommand(cmd) {
    if (cmd === "") return;

    printTerminal(`<br><span style="color: #fff;">guest@mauronu.com:~$</span> ${cmd}`);

    if (cmd === "clear") {
        outputArea.innerHTML = `
            <p>MAURO-OS v2.0.26 (tty1)</p>
            <br>
            <p>Welcome to the Dev Sandbox. Type or click 'help' to see available commands.</p>
            <br>
        `;
        return;
    }

    const response = commands[cmd];

    if (response) {
        printTerminal(response);
    } else {
        printTerminal(`<span style="color: red;">Error: Comando no reconocido '${cmd}'. Escribí 'help' para ver la lista.</span>`);
    }
}

function runCommand(cmd) {
    executeCommand(cmd);
    inputField.focus(); // Devuelve el cursor al input
}

function printTerminal(htmlContent) {
    const p = document.createElement("p");
    p.innerHTML = htmlContent;
    outputArea.appendChild(p);
    window.scrollTo(0, document.body.scrollHeight);
}

document.addEventListener("click", (e) => {
    if (!e.target.classList.contains('clickable-cmd')) {
        inputField.focus();
    }
});

setTimeout(() => {
    executeCommand('about');
    setTimeout(() => {
        printTerminal(`<br><span style="color: #aaaaaa;"><i>[Sistema]: Te sugiero probar el comando <span class="clickable-cmd" onclick="runCommand('help')">help</span></i></span>`);
    }, 800);
}, 1000);