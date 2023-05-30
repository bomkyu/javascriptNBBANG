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
    const getuserStorage = getLocalStorage('User');

    const idValue = idInput.value;
    const password1Value = password1Input.value;
    const password2Value = password2Input.value;
    const nameValue = nameInput.value;
    const nickNameValue = nickNameInput.value;
    // ID 유효성 검사: 8글자 이상, 특수문자 사용 불가
    const idRegex = /^.{8,}$/;


    if (!idRegex.test(idValue)) {
        alert('ID는 8글자 이상이어야 하며, 특스문자는 사용 불가능합니다.');
        return;
    }

    // Password 유효성 검사: 8글자 이상, 두 개의 입력 값이 일치해야 함
    const passwordRegex = /^.{8,}$/;
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

    //로컬 스토리지에 저장하는부분
    
    const Userjson = `{
        id : ${getLocalStorage == null ? 0 : },
        user_id : ${idValue},
        user_passWord : ${password1Value},
        user_userName : ${nameValue},
        user_userNickName : ${nickNameValue},
        user_profileImg : ''
    }`    

    setLocalStorage('User', getLocalStorage ? [getuserStorage, Userjson] : Userjson); // 수정된 JSON 객체를 로컬 스토리지에 저장

    location.href = './main.html';
})