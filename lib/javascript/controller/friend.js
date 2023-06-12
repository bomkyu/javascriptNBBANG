import { Select, Insert } from '../db/database.js'
let session = sessionStorage.getItem("userInfo");
const user_search = document.getElementById('user-search');
const search_friend = document.querySelector('.search-friend');
const search_friend_result = document.querySelector('.search-friend-result');
const my_friend = document.querySelector('.my-friend')
const user_data = await Select('User');
const friend_request_data = await Select('FriendsRequest');
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

const friendAdd = () => {
    user_search.addEventListener('input',()=>{
        let txt = user_search.value;
        
        const search_friend_data = user_data.filter(param => param.userName.includes(txt) || param.userNickName.includes(txt));
        
        search_friend_result.innerHTML = '';
        
        if(txt){
            search_friend_data.forEach(param => {
                const html = `
                <dl class="friend-list">
                    <dt>
                    <div class="img-wrap">
                        <div class="img-thumb" style="background-image: url('./lib/images/img_user.png');"></div>
                    </div>
                    </dt>
                    <dd>
                    <p class="nick-name">${param.userName}</p>
                    <p class="user-name">${param.userNickName}</p>
                    
                    ${param.id === session ? '' : `<a class="request-friend" data-id="${param.id}">친구추가</a>`}
                    </dd>
                </dl>
                `;
                search_friend_result.innerHTML += html;

                const requestFriendLink = search_friend_result.querySelectorAll('.request-friend');
                requestFriendLink.forEach((el)=>{
                    el.addEventListener('click', (e)=>{
                        requestFriend(e.currentTarget.dataset.id);
                    })
                })
            });
        }
    })   
}

const friendList = () => {
    const friend_request = friend_request_data.filter((param) => param.requestFriend === session );
    if(friend_request){
        friend_request.forEach((param)=>{
            const html = `
            <dl class="friend-list">
                <dt>
                <div class="img-wrap">
                    <div class="img-thumb" style="background-image: url('./lib/images/img_user.png');"></div>
                </div>
                </dt>
                <dd>
                <p class="nick-name">${param.userName}</p>
                <p class="user-name">${param.userNickName}</p>
                
                ${param.id === session ? '' : `<a class="request-friend" data-id="${param.id}">수락</a>`}
                </dd>
            </dl>
            `;
            search_friend_result.innerHTML += html;
        })
    }
}

const requestFriend = (v) => {
    const userJson = {
        requestFriend : v,
        sendFriend : session,
        status : 'wait'
    }
    Insert('FriendsRequest', userJson);
    //console.log(userJson);
}