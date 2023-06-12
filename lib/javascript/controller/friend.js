import { Select, Insert } from '../db/database.js'
const user_search = document.getElementById('user-search');
const search_freind = document.querySelector('.search-freind');
const user_data = await Select('User');


user_search.addEventListener('input',()=>{
    let txt = user_search.value;
    
    const search_friend_data = user_data.filter(param => param.userName.includes(txt) || param.userNickName.includes(txt));
    
    search_freind.innerHTML = '';
    
    if(txt){
        search_friend_data.forEach(param => {
            const html = `
            <dl>
                <dt>
                <div class="img-wrap">
                    <div class="img-thumb" style="background-image: url('./lib/images/img_user.png');"></div>
                </div>
                </dt>
                <dd>
                <p class="nick-name">${param.userName}</p>
                <p class="user-name">${param.userNickName}</p>
                <a>친구요청</a>
                </dd>
            </dl>
            `;
            search_freind.innerHTML += html;
        });
        }
})