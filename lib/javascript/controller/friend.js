import { Select, Insert, Update } from '../db/database.js'
let session = sessionStorage.getItem("userInfo");
const user_search = document.getElementById('user-search');
const search_friend = document.querySelector('.search-friend');
const search_friend_result = document.querySelector('.search-friend-result');
const my_friend = document.querySelector('.my-friend');

const tab_btn = document.querySelectorAll('.friend-tab > li');

tab_btn.forEach(el => {
    el.addEventListener('click', (e)=>{

    const siblings = Array.from(el.parentNode.children);
    siblings.forEach(sibling => sibling.classList.remove('active'));
    
    // 클릭한 요소에 클래스 추가
    el.classList.add('active');
       tabBtn(e.currentTarget.dataset.sort);
    })
});

const tabBtn = (v) => {
    switch (v) {
        case 'friend-list':
            search_friend.style.display = 'none'
            my_friend.style.display = 'block'
            friendList();
            break;
        case 'friend-add':
            search_friend.style.display = 'block'
            my_friend.style.display = 'none'
            friendAdd();
            break;

        default:
            alert('ErrorCode[001] 관리자에게 문의하세요.');
            break;
    }
}


async function friendAdd() {
    // 이벤트 리스너 함수
    const user_data = await Select('User');
    const friend_data = await Select('FriendsRequest');
    
    function handleInputEvent() {
      
      //console.log('inputEvent안이에용');
      search_friend_result.innerHTML = '';
  
      let txt = user_search.value;
      
      const joinedData = user_data.map(user => {
        const userFriendRequests = friend_data.filter(request => {
        return request.sendFriend === user.id || request.requestFriend === user.id;
        });
    
        return {
        ...user,
        friendRequests: userFriendRequests
        };
          
      });
      const filteredData = joinedData.filter(user => {
        // 사용자 이름 또는 닉네임에 대해 입력값과 일치하는지 확인
        return (
          user.userName.includes(txt) ||
          user.userNickName.includes(txt) ||
          user.id.includes(txt)
        );
      });
  
      filteredData.forEach(param => {
        const userFriendRequests = param.friendRequests.filter(request => {
          return (
            (request.sendFriend === param.id && request.requestFriend === session) ||
            (request.sendFriend === session && request.requestFriend === param.id)
          );
        });
  
        const html = `
          <dl class="friend-list">
            <dt>
              <div class="img-wrap">
                <div class="img-thumb" style="background-image: url('${param.imgUrl}');"></div>
              </div>
            </dt>
            <dd>
              <p class="nick-name">${param.userName}</p>
              <p class="user-name">${param.userNickName}</p>
              ${
                userFriendRequests.length === 0
                  ? `<a class="request-friend" data-id="${param.id}">친구요청</a>`
                  : userFriendRequests[0].status === 'wait'
                  ? '<p class="request-friend">대기중</p>'
                  : '<p class="request-friend">친구입니다.</p>'
              }
            </dd>
          </dl>
        `;
        search_friend_result.innerHTML += html;
  
        const requestFriendLink = search_friend_result.querySelectorAll('.request-friend');
        requestFriendLink.forEach(el => {
          el.addEventListener('click', async (e) => {
            requestFriend(e.currentTarget.dataset.id, 'wait');
          });
        });
      });
  
      if (txt == '' || txt == null) {
        search_friend_result.innerHTML = '';
      }
    }
  
    // 이벤트 리스너 등록
    user_search.addEventListener('input', handleInputEvent);
  
    // input 이벤트 호출
    const event = new Event('input', {
      bubbles: true,
      cancelable: true
    });
    user_search.dispatchEvent(event);
  }

const friendList = async () => {
  const user_data = await Select('User');
  const friend_request_data = await Select('FriendsRequest');
  
  const my_friend_child_friend_request = my_friend.querySelector('.friend-request');
  const my_friend_child_friend_list = my_friend.querySelector('.friend-list-wrap');
  
  //친구요청이 있을때
  const friend_request = friend_request_data.filter(param => param.requestFriend === session && param.status == 'wait');
  const filtered_values = user_data.filter(item => {
      const matchedRequest = friend_request.find(req => req.sendFriend === item.id);
      if (matchedRequest) {
          item.sq = matchedRequest.sq;
          return true;
      }
      return false;
  });
  const friendRequests = friend_request_data.filter(param => (param.requestFriend === session || param.sendFriend === session) && param.status === 'accept');
  const friendIds = friendRequests.map(param => {
    if (param.requestFriend === session) {
      return param.sendFriend;
    } else {
      return param.requestFriend;
    }
  });
  const friendLists = user_data.filter(user => friendIds.includes(user.id) && user.id !== session);

    //console.log(friendLists);


    my_friend_child_friend_request.innerHTML = '';
    if(filtered_values.length === 0){
        const html = '<p>요청된 친구가 없어요</p>'
        my_friend_child_friend_request.innerHTML += html;
    }else{
    filtered_values.forEach((param)=>{
        const html = `
                <dl class="friend-list">
                    <dt>
                    <div class="img-wrap">
                        <div class="img-thumb" style="background-image: url('${param.imgUrl}');"></div>
                    </div>
                    </dt>
                    <dd>
                    <p class="nick-name">${param.userName}</p>
                    <p class="user-name">${param.userNickName}</p>
                    
                    <a class="request-friend accept" data-sq="${param.sq}">수락</a>
                    </dd>
                </dl>
                `;

                my_friend_child_friend_request.innerHTML += html;

                const requestFriendLink = my_friend_child_friend_request.querySelectorAll('.request-friend.accept');
                requestFriendLink.forEach((el)=>{
                    el.addEventListener('click', (e)=>{
                        requestFriend(e.currentTarget.dataset.sq, 'accept');
                    })
                })
        });
    }
    
    my_friend_child_friend_list.innerHTML = '';
    if(friendLists.length === 0){
        const html = '<p>친구가 없어요</p>'
        my_friend_child_friend_list.innerHTML += html;
    }else{
        friendLists.forEach((param)=>{
            //console.log(param)
            const html = `
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
                    my_friend_child_friend_list.innerHTML += html;
                
        })
    }
}

const requestFriend = async (v, sort) => {

    switch (sort) {
        case 'wait':
            const userJson = {
                requestFriend : v,
                sendFriend : session,
                status : sort
            }
            await Insert('FriendsRequest', userJson);
            friendAdd();
            break;
        case 'accept':
            //console.log(v);
            /*key, field, comparisonValue, updatedField, updatedValue*/
            //await updateDocumentByField("users", "age", 30, "name", "John Doe");
            await Update('FriendsRequest','sq',v,'status','accept');
            friendList();
            break;
    
        default:
            break;
    }
    
    //Insert('FriendsRequest', userJson);
    //console.log(userJson);
}

friendList();