import { setLocalStorage, getLocalStorage } from './storage.js';
const loginForm = document.getElementById("register-form");

const idInput = document.getElementById('id');
const password1Input = document.getElementById('password1');
const password2Input = document.getElementById('password2');
const nameInput = document.getElementById('name');
const nickNameInput = document.getElementById('NickName');
const form = document.getElementById('register-form');

loginForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const idValue = idInput.value;
    const password1Value = password1Input.value;
    const password2Value = password2Input.value;
    const nameValue = nameInput.value;
    const nickNameValue = nickNameInput.value;
    // ID 유효성 검사: 8글자 이상, 특수문자 사용 불가

    effectFucn();

    const userJson = {
        "id": getLocalStorage('User') == null ? 1 : getLocalStorage('User').length + 1,
        "user_id":idValue.trim(),
        "user_passWord":password1Value.trim(),
        "user_userName":nameValue.trim(),
        "user_userNickName":nickNameValue.trim(),
        "user_profileImg": ""
    }
    const UserArr = new Array();
    
    
    
    if(getLocalStorage('User') != null ){
        //console.log('값이 있을때');
        UserArr.push(...getLocalStorage('User'), userJson);
        setLocalStorage('User', UserArr)

    }else{
        //console.log('값이 없을때');
        UserArr.push(userJson);
        setLocalStorage('User', UserArr)
        
    }
    console.log(UserArr);
    



    function effectFucn(){
        //정규식
        const idRegex = /^.{8,}$/;
        const passwordRegex = /^.{8,}$/;

        //로컬스토리지 값 비교
        //const duplicateUsers = getLocalStorage('User').filter(param => param.user_id === idValue);

        if (!idRegex.test(idValue)) {
            alert('ID는 8글자 이상이어야 하며, 특수문자는 사용 불가능합니다.');
        return;
        }

        
        /*if (duplicateUsers.length > 0) {
            alert('이미 사용중인 ID입니다.');
            return;
        }*/
        
        if (!passwordRegex.test(password1Value)) {
            alert('Password는 8글자 이상이어야 합니다.');
            return;
        }
        if (password1Value !== password2Value) {
            alert('Password가 일치하지 않습니다.');
            return;
        }

        // Name 유효성 검사: 특수문자 사용 불가
        const nameRegex = /^[a-zA-Z가-힣]+$/;
        if (!nameRegex.test(nameValue)) {
            alert('유효한 이름을 입력해 주세요.');
            return;
        }
    }
    //location.href = './main.html';
})
