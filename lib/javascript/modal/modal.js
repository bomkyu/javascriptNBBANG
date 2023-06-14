const modalOpen = document.querySelectorAll('.modal-open');
const modalWrap = document.querySelector('.modal-wrap');
const closeModalBtn = document.querySelectorAll('.close-modal');


modalOpen.forEach((el)=>{
    el.addEventListener('click', (e)=>{
        const sort = e.currentTarget.dataset.modal_sort
        const data_type = e.currentTarget.dataset.type
        modalEventHandeller(sort, data_type);
    })
})


const modalEventHandeller = (sort, data_type) => {
    switch (sort) {
        case 'h_80':
            
            openModal(data_type);
            break;
            
        default:
            break;
    }
}

function openModal(data_type) {
    modalWrap.classList.add('active')
    // 안드로이드와 iOS 분기 처리
    const userAgent = navigator.userAgent.toLowerCase();
    const isAndroid = userAgent.includes("android");
    const isiOS = /iphone|ipad|ipod/.test(userAgent);

    if (isAndroid) {
        document.body.style.overflow = "hidden"; // 안드로이드에서는 스크롤 막기
        document.addEventListener("touchmove", preventDefault, { passive: false }); // 터치 스크롤 방지
    } else if (isiOS) {
        document.body.style.position = "fixed"; // iOS에서는 body 요소를 고정 위치로 설정하여 스크롤 막기
        document.body.style.overflow = "hidden"; // iOS에서는 스크롤 막기
    }
  }

  const closeModal = () => {
    modalWrap.classList.remove('active')
    // 안드로이드와 iOS 분기 처리
    const userAgent = navigator.userAgent.toLowerCase();
    const isAndroid = userAgent.includes("android");
    const isiOS = /iphone|ipad|ipod/.test(userAgent);
  
    if (isAndroid) {
      document.body.style.overflow = ""; // 안드로이드에서는 스크롤 허용
      document.removeEventListener("touchmove", preventDefault); // 터치 스크롤 이벤트 제거
    } else if (isiOS) {
      document.body.style.position = ""; // iOS에서는 body 요소의 고정 위치 해제
      document.body.style.overflow = ""; // iOS에서는 스크롤 허용
    }
  };

  function preventDefault(e) {
    e.preventDefault();
  }