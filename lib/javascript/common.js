const inputs = document.querySelectorAll(".input-st > input");

inputs.forEach((input) => {
  input.addEventListener("focus", function () {
    this.parentNode.classList.add("active");
  });

  input.addEventListener("blur", function () {
    const value = this.value;
    if (!value) {
      this.parentNode.classList.remove("active");
    }
  });
});