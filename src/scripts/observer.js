export function observer(){

  const floatingDiv = document.querySelector("#section-floating-title");
  
  const sections = document.querySelectorAll(".index-section");
  
  // opciones del observador
  const options = {
    root: null, // Usar el viewport como raíz
    rootMargin: "0px",
    threshold: 0.005, // Activa el callback cuando el  10% de la sección está visible
  };
  
  // Definir la función de callback
  const onIntersect = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        floatingDiv.textContent = entry.target.id;
        entry.target.classList.add("visible");
      } else {
        entry.target.classList.remove("visible");
      }
    });
  };
  
  const onIntersectFloatingDiv = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        floatingDiv.classList.remove("notVisible");
        floatingDiv.classList.add("visible");
        entry.target.classList.add("visible");
      } else {
        floatingDiv.classList.remove("visible");
        floatingDiv.classList.add("notVisible");
      }
    });
  };
  
  // Crear el observador
  const observer = new IntersectionObserver(onIntersect, options);
  const observerFloatingDiv = new IntersectionObserver(onIntersectFloatingDiv, {threshold: 0.2})
  
  // Observar cada sección
  sections.forEach((section) => {
    observer.observe(section);
    observerFloatingDiv.observe(section);
  });
}


