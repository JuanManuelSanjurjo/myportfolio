export function mailing(){
    const emailInput = document.querySelector("#email");
    const subjectInput = document.querySelector("#subject");
    const contentInput = document.querySelector("#content");
    
    const submitBtn = document.getElementById("submitBtn");
    submitBtn.addEventListener("click", () => {
      if (
        emailInput.value !== "" ||
        subjectInput.value !== "" ||
        contentInput.value !== ""
      ) {
        submitBtn.textContent = "Sending...";
      }
      // emailInput.value = "";
      // subjectInput.value = "";
      // contentInput.value = "";
    });
}


