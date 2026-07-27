
const btnLanguage = document.querySelector(".navbar-language-btn")
const listLanguage = document.querySelector(".list-language")

btnLanguage.addEventListener("click", () => {

    listLanguage.classList.toggle("open");


})

fecharAoClicarFora(btnLanguage, listLanguage, "open");

const flag = document.getElementById("flag");
const idiomas = document.querySelectorAll(".optionIdiomas li");

idiomas.forEach(item => {
    item.addEventListener("click", () => {

        if (item.dataset.lang === "Pt") {
            flag.className = "fi fi-br";
        }

        if (item.dataset.lang === "En") {
            flag.className = "fi fi-us";
        }

        if (item.dataset.lang === "Es") {
            flag.className = "fi fi-es";
        }

    });
});












const lista = document.querySelector(".optionIdiomas");
const conteudo = document.querySelector("main"); // ou #conteudo
const btnIdiomas = document.getElementById("language-btn");
const listaIdioma = document.getElementById("listaIdiomas");
const teste = document.getElementById("teste")


btnIdiomas.addEventListener("click", () => {
    listaIdioma.classList.toggle("activeIdiomas");
});



document.addEventListener("click", (e) => {

    if (!listaIdioma.contains(e.target) && !btnIdiomas.contains(e.target)) {

        listaIdioma.classList.remove("activeIdiomas");

    }

});


let traducoesAtuais = {};

async function carregarIdioma(lang) {


    conteudo.classList.add("blur-out");


    setTimeout(async () => {
        try {
            const response = await fetch(`/assets/language/${lang}.json`)
            const traducoes = await response.json();

            traducoesAtuais = traducoes;

            aplicarTraducoes(traducoes);

            if (typeof atualizarTerminal === "function") {
                atualizarTerminal();
            }
            localStorage.setItem("idioma", lang);
            document.querySelector(".idiomaAtivo").textContent = lang.toUpperCase();


        } catch (erro) {
            console.error("Erro:", erro);
        }

        // 👇 volta ao normal
        conteudo.classList.remove("blur-out");
        conteudo.classList.add("blur-in");

        setTimeout(() => {
            conteudo.classList.remove("blur-in");
        }, 350);

    }, 200);
}

function formatText(text) {
    return text.replace(
        /\[green\](.*?)\[\/green\]/g,
        '<span class="green">$1</span>'

    )
        .replace(
            /\[linguagens\](.*?)\[\/linguagens\]/g,
            '<span class="green">$1</span>'
        )
}




// 🔥 aplicar traduções
function aplicarTraducoes(traducoes) {
    const elementos = document.querySelectorAll("[data-i18n]");

    elementos.forEach(el => {
        const caminho = el.dataset.i18n.split(".");
        let texto = traducoes;

        for (let chave of caminho) {
            if (texto && texto[chave] !== undefined) {
                texto = texto[chave];
            } else {
                texto = null;
                break;
            }
        }

        if (texto) {
            el.innerHTML = formatText(texto);
        }
    });
}

// 🔥 clique no idioma (CORRIGIDO)
lista.addEventListener("click", (e) => {
    const li = e.target.closest("li");

    if (li) {
        const lang = li.dataset.lang;
        carregarIdioma(lang);



    }
});

// 🔥 idioma inicial
const idiomaSalvo = localStorage.getItem("idioma") || "pt";
carregarIdioma(idiomaSalvo);


