const inputField = document.getElementById("command-input");
const outputArea = document.getElementById("output");

const commands = {
    help: `
        <span style="color: #fff;">Comandos disponibles:</span><br>
        - <b>about</b>    : Información del sistema y perfil del desarrollador.<br>
        - <b>skills</b>   : Stack tecnológico y áreas de especialidad.<br>
        - <b>projects</b> : Registro de misiones y proyectos destacados.<br>
        - <b>clear</b>    : Limpia el buffer de la pantalla.
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

        printTerminal(`<br><span style="color: #fff;">guest@mauronu.com:~$</span> ${commandText}`);

        processCommand(commandText);
    }
});

function processCommand(cmd) {
    if (cmd === "") return;

    if (cmd === "clear") {
        outputArea.innerHTML = `
            <p>MAURO-OS v2.0.26 (tty1)</p>
            <br>
            <p>Welcome to the Dev Sandbox. Type 'help' to see available commands.</p>
            <br>
        `;
        return;
    }

    const response = commands[cmd];

    if (response) {
        printTerminal(response);
    } else {
        printTerminal(`<span style="color: red;">Error: Comando no reconocido '${cmd}'. Escribí 'help' para ver la lista de comandos.</span>`);
    }
}

function printTerminal(htmlContent) {
    const p = document.createElement("p");
    p.innerHTML = htmlContent;
    outputArea.appendChild(p);

    window.scrollTo(0, document.body.scrollHeight);
}

document.addEventListener("click", () => {
    inputField.focus();
});
