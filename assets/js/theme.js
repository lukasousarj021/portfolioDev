
let icon = document.getElementById('tema-icon');
const body = document.body

 icon.addEventListener("click", () => {

     document.body.classList.toggle("light");
   
    if( icon.classList.contains("bi-sun")){

        icon.classList.replace("bi-sun", "bi-moon");

    } else {

        icon.classList.replace ("bi-moon", "bi-sun")

    }

 })
