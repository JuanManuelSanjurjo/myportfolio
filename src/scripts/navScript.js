export function navScript(){
    const navBtn = document.querySelector(".navbtn");
    const nav = document.querySelector("nav");
    
    navBtn.addEventListener("click", () => {
      nav.classList.toggle("showNav");
      navBtn.classList.toggle("navBtbEffect");
    });

}

