export function navScript(){
    const nav = document.querySelector("nav");
    
    const navBtn = document.querySelector(".navbtn");
    const homeLink = document.querySelector("h1 > a > p");
    const navLinks = document.querySelectorAll("nav > ul > li > a");

    const allNavLinks = [...navLinks, navBtn, homeLink];

    allNavLinks.forEach((link) => {
      if (link !== null){
        link.addEventListener("click", () => {
          nav.classList.toggle("showNav");
          navBtn.classList.toggle("navBtbEffect");
        });
      }
    })

}

