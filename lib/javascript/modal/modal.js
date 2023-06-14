import { Insert, Select, fileUpload } from '../db/database.js';

const modalWrap = document.querySelector('.modal-wrap');
const modalContain = modalWrap.querySelector('.modal-contain')
const modalContent = document.querySelector('.modal-content');
let session = sessionStorage.getItem("userInfo");

// moddal의 type
export const modalEventHandeller = (sort, data_type) => {
    switch (sort) {
        case 'h_80':
            
            openModal();
            createElementHandler(data_type);
            break;
            
        default:
            break;
    }
}

// moddal 열기
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

  // moddal 닫기
  export const closeModal = () => {
    console.log('asd')
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

  //html 생성
  const createElementHandler = async (data_type) => {
    let html = '';
    modalContent.innerHTML = '';
    switch (data_type) {
      case 'friend':
        const user_data = await Select('User');
        const friend_request_data = await Select('FriendsRequest');
        const friendRequests = friend_request_data.filter(param => (param.requestFriend === session || param.sendFriend === session) && param.status === 'accept');
        const friendIds = friendRequests.map(param => {
          if (param.requestFriend === session) {
            return param.sendFriend;
          } else {
            return param.requestFriend;
          }
        });
        const friendLists = user_data.filter(user => friendIds.includes(user.id) && user.id !== session);

        if(friendLists.length === 0){
          const html = '<p>친구가 없어요</p>'
          modalContent.innerHTML += html;
          }else{
              friendLists.forEach((param)=>{
                  //console.log(param)
                  html = `
                          <dl class="friend-list">
                              <dt>
                              <div class="img-wrap">
                                  <div class="img-thumb" style="background-image: url('${param.imgUrl}');"></div>
                              </div>
                              </dt>
                              <dd>
                              <p class="nick-name">${param.userName}</p>
                              <p class="user-name">${param.userNickName}</p>
                              </dd>
                          </dl>
                          `;
                          modalContent.innerHTML += html;
                      
              })
          }
      break;
    
      default:
        break;
    }
  };