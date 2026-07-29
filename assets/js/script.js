function fecharAoClicarFora(botao, elemento, classe, icone, iconeAberto, iconeFechado) {

    document.addEventListener("click", (e) => {

        if (
            !botao.contains(e.target) &&
            !elemento.contains(e.target)
        ) {
            elemento.classList.remove(classe);

            icone.classList.replace(iconeAberto, iconeFechado);
        }

    });

}




const menu = document.getElementById("navMobile");


let ultimoScrool = 0


window.addEventListener("scroll", () => {
   
  const scroll = window.pageYOffset;

  if (scroll > ultimoScrool ) {
       
      menu.classList.add("esconder");
     
    
    } else {
    
      menu.classList.remove("esconder");
    
    }

   ultimoScrool = scroll

});








const botoes = document.querySelectorAll(".navbar-link");

botoes.forEach(botao => {
    botao.addEventListener("click", () => {
        botoes.forEach(btn => btn.classList.remove("active"));
        botao.classList.add("active");
    });
});


const menuHamburguer = document.getElementById("menuHamburguer");
const menuAside = document.getElementById("menuAside");

console.log(menuHamburguer);
console.log(menuAside);

menuHamburguer.addEventListener("click", () => {
    console.log("clicou");
    menuAside.classList.toggle("open");
   
    if(menuHamburguer.classList.contains("bi-list")){

        menuHamburguer.classList.replace("bi-list", "bi-x");

    }else{

        menuHamburguer.classList.replace("bi-x", "bi-list")

    }
});

const linksMenuAside = document.querySelectorAll(".atalhos");

linksMenuAside.forEach(link => {
    link.addEventListener("click", () => {
        menuAside.classList.remove("open");
        menuHamburguer.classList.replace("bi-x", "bi-list");
    });
});


    fecharAoClicarFora(menuHamburguer, menuAside, "open", menuHamburguer , "bi-x", "bi-list")



const sections = document.querySelectorAll(
    ".asideAtalhos, .asideContatos"
);



sections.forEach(section => {

    const titulo = section.querySelector(".txtSeparadores");
    const conteudo = section.querySelector(".content");
    const icone = section.querySelector(".iconeSeta");

    titulo.addEventListener("click", () => {

        conteudo.classList.toggle("open");

        icone.classList.toggle("bi-chevron-up");
        icone.classList.toggle("bi-chevron-down");

    });

});




 document.addEventListener("DOMContentLoaded", () => {

    const email = "lukasousa.r.j@gmail.com";

    const emailBtn = document.getElementById("emailBtn");

    console.log(emailBtn); // teste

    emailBtn.addEventListener("click", () => {

        navigator.clipboard.writeText(email)
            .then(() => {
                alert("Email copiado!");
            })
            .catch(error => {
                console.log(error);
                alert("Erro ao copiar.");
            });

    });

});



const modalReadme = document.getElementById("modalReadme");

document.getElementById("btnAbrirReadme").addEventListener("click",()=>{

    modalReadme.classList.add("openReadme");

});

document.getElementById("btnCloseReadme").addEventListener("click",()=>{

    modalReadme.classList.remove("openReadme");

});