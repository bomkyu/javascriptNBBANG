let header = document.querySelector('header');

header.innerHTML = `
                    <h1><img src="../../lib/images/ic_logo.svg" alt="로고"></h1>
                    <p class="logout"><img src="../../lib/images/ic_logout.png" alt="로그아웃 아이콘"></p>

                `
let logout = document.querySelector('.logout');
logout.addEventListener('click', ()=>{
    sessionStorage.removeItem('userInfo');
    window.location.replace('../index.html');
})

let isScrolling = false;
let timeout = null;

function hideHeader() {
    header.style.transform = "translate3d(0, -100%, 0)";
}

function showHeader() {
    header.style.transform = "translate3d(0, 0, 0)";
}

function handleScroll() {
  if (isScrolling) {
    clearTimeout(timeout);
  } else {
    hideHeader();
  }

  timeout = setTimeout(function () {
    isScrolling = false;
    showHeader();
  }, 200);

  isScrolling = true;
}

window.addEventListener("scroll", handleScroll);