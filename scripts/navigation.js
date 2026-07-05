const menu = document.querySelector("#menu");
const nav = document.querySelector("nav");

menu.addEventListener("click", () => {

    nav.classList.toggle("open");

    if(nav.classList.contains("open")){
        menu.innerHTML="✖";
    }else{
        menu.innerHTML="☰";
    }

});