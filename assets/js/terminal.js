const input = document.getElementById("terminal-input");
const output = document.getElementById("terminal-output");

const history = [];
let historyIndex = 0;

function getCommands() {

    return {

        help: traducoesAtuais.terminal.help,

        whoami: `
<div class="response">
${traducoesAtuais.terminal.whoami}
</div>
`,

        about: `
<div class="response">
${traducoesAtuais.terminal.about}
</div>
`,

        skills: traducoesAtuais.terminal.skills,

        projects: `
<div class="response">
${traducoesAtuais.terminal.projects}
</div>
`,

        github: `
<div class="response">
<a href="https://github.com/seuusuario" target="_blank">
github.com/seuusuario
</a>
</div>
`,

        linkedin: `
<div class="response">
<a href="https://linkedin.com/in/seuusuario" target="_blank">
linkedin.com/in/seuusuario
</a>
</div>
`

    };

}
function printCommand(command) {

    const line = document.createElement("div");

    line.className = "line";

    line.innerHTML = `
        <span class="user">lukas@portfolio</span>
        <span class="path">:~$</span>
        <span class="command">${command}</span>
    `;

    output.appendChild(line);

}

function printResponse(html) {

    const div = document.createElement("div");

    div.innerHTML = html;

    output.appendChild(div);

}

function execute(command) {

    switch (command) {

        case "help":

            printResponse(`
        <pre class="help-terminal">
            ${traducoesAtuais.terminal.help.join("\n")}
        </pre>
    `);

            break;
        case "whoami":

            printResponse(`
                <div class="response">
                    ${traducoesAtuais.terminal.whoami}
                </div>
            `);

            break;

        case "skills":

        case "skills --list":

            printResponse(`

            <pre class="skills-terminal">
                ${traducoesAtuais.terminal.skills.join("\n")}
            </pre>
            `);

      

            break;

        case "about":

            printResponse(traducoesAtuais.terminal.projects);

            setTimeout(() => {

                document.querySelector("#about").scrollIntoView({
                    behavior: "smooth"
                });

            }, 800);

            break;

        case "projects":

            printResponse(traducoesAtuais.terminal.projects);

            setTimeout(() => {

                document.querySelector("#projects").scrollIntoView({
                    behavior: "smooth"
                });

            }, 800);

            break;

        case "github":

            window.open("https://github.com/lukasousarj021", "_blank");

            break;

        case "linkedin":

            window.open("https://www.linkedin.com/in/lukas-santos-208959269/", "_blank");

            break;

        case "clear":

            output.innerHTML = "";

            return;

        default:

            printResponse(`
                <div class="response">
                    ${traducoesAtuais.terminal.error}
                </div>
            `);

    }

    output.scrollTop = output.scrollHeight;

}
input.addEventListener("keydown", (e) => {

    if (e.key === "Enter") {

        const command = input.value.trim().toLowerCase();

        if (command === "") return;

        history.push(command);

        historyIndex = history.length;

        printCommand(command);

        execute(command);

        input.value = "";

    }

    /* Histórico */

    if (e.key === "ArrowUp") {

        e.preventDefault();

        historyIndex--;

        if (historyIndex < 0)
            historyIndex = 0;

        input.value = history[historyIndex] || "";

    }

    if (e.key === "ArrowDown") {

        e.preventDefault();

        historyIndex++;

        if (historyIndex >= history.length) {

            historyIndex = history.length;

            input.value = "";

            return;

        }

        input.value = history[historyIndex];

    }

    /* Autocomplete */

    if (e.key === "Tab") {

        e.preventDefault();

        const value = input.value.toLowerCase();

        const cmd = Object.keys(commands).find(c => c.startsWith(value));

        if (cmd) {

            input.value = cmd;

        }

    }

});


window.onload = () => {

    output.innerHTML = getInitialContent();

    input();

};



function atualizarTerminal() {

    if (!traducoesAtuais.terminal) return;

    output.innerHTML = "";

    printResponse(`
<div class="response">

${traducoesAtuais.terminal.welcome}

<br><br>

${traducoesAtuais.terminal.typeHelp}

</div>
`);

}

function getInitialContent() {

    const t = traducoesAtuais.terminal;

    return `

<div class="line">
    <span class="user">lukas@dev:</span>
    <span class="path">:~$</span>
    <span class="command">whoami</span>
</div>

<div class="response">
    ${t.whoami}
</div>

<div class="line">
    <span class="user">lukas@dev:</span>
    <span class="path">:~$</span>
    <span class="command">skills --list</span>
</div>

<ul class="terminal-skills">
    ${t.skills.map(skill => `<li>${skill}</li>`).join("")}
</ul>

<div class="line">
    <span class="user">lukas@dev:</span>
    <span class="path">:~$</span>
    <span class="cursor"></span>
</div>

`;

}


function mostrarTelaInicial() {

    output.innerHTML = getInitialContent();

    hasTyped = false;

}

let hasTyped = false;


if (!hasTyped) {

    output.innerHTML = "";

    hasTyped = true;

}



if (e.key === "Enter") {

    if (!hasTyped) {

        output.innerHTML = "";

        hasTyped = true;

    }

    const command = input.value.trim().toLowerCase();


}


let idleTimer;


function resetIdleTimer() {

    clearTimeout(idleTimer);

    idleTimer = setTimeout(() => {

        mostrarTelaInicial();

    }, 8000);

}


resetIdleTimer();


document.addEventListener("click", resetIdleTimer);

document.addEventListener("keydown", resetIdleTimer);


function atualizarTerminal() {

    if (!traducoesAtuais || !traducoesAtuais.terminal) return;

    output.innerHTML = getInitialContent();

}