const inputs = document.querySelectorAll(".input-st > input");

// let userInfo = sessionStorage.getItem("userInfo");
// const currentPagePath = window.location.pathname;
// if (currentPagePath === '/index.html' || currentPagePath === '/public/index.html' || currentPagePath === '/register.html' || currentPagePath === '/public/register.html') {
//   if(userInfo){
//     if (window.location.hostname === "bomkyu.github.io") {
//       window.location.replace('/public/main.html');
//     }else{
//       window.location.replace('/main.html');
//     }
//   }
// }else{
//   alert('로그인후 이용하실 수 있습니다.')
//   if(userInfo == null){
//     if (window.location.hostname === "bomkyu.github.io") {
//       window.location.replace('/public/index.html');
//     }else{
//       window.location.replace('/index.html');
//     }
//   }
// }




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