import { Insert, Select, fileUpload } from '../db/database.js';
import { showSpinner, hideSpinner } from '../UI/spinner.js';
import { modalDataReciver } from '../controller/write.js';

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
  disableScroll();
  modalWrap.classList.add('active')
}

// moddal 닫기
export const closeModal = () => {
  enableScroll();
  modalWrap.classList.remove('active')
};

// 모달 창이 열릴 때 스크롤을 막기 위한 코드
function disableScroll() {
  document.documentElement.style.overflow = 'hidden';
  document.body.style.overflow = 'hidden';
}

// 모달 창이 닫힐 때 스크롤을 다시 허용하기 위한 코드
function enableScroll() {
  document.documentElement.style.overflow = 'auto';
  document.body.style.overflow = 'auto';
}

function preventDefault(e) {
  e.preventDefault();
}

//html 생성
let myArray = []; // 값을 담을 배열
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
                      <dl class="friend-list ${myArray.length != 0 ? myArray.includes(param.id) ? 'active' : '' : ''}" data-friend_id="${param.id}">
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

            const friend_list = modalContent.querySelectorAll('.friend-list');
            friend_list.forEach((el)=>{
                el.addEventListener('click', (e)=>{
                  const friend_id = e.currentTarget.dataset.friend_id;
                  el.classList.toggle('active');
                    
                  if (el.classList.contains('active')) {
                    // 'active' 클래스가 있는 경우 배열에 값을 추가
                    myArray.push(friend_id);
                  } else {
                    myArray = myArray.filter(item => item !== friend_id);
                  }
                  modalDataReciver(myArray);
                })
            })
          })
        }
    break;
  
    default:
      break;
  }
};