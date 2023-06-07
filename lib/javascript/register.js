import { Insert, Select } from './db/database.js';

const loginForm = document.getElementById("register-form");

const idInput = document.getElementById('id');
const password1Input = document.getElementById('password1');
const password2Input = document.getElementById('password2');
const nameInput = document.getElementById('name');
const nickNameInput = document.getElementById('NickName');
const form = document.getElementById('register-form');

loginForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    const idValue = idInput.value;
    const password1Value = password1Input.value;
    const password2Value = password2Input.value;
    const nameValue = nameInput.value;
    const nickNameValue = nickNameInput.value;

    //정규식
    const idRegex = /^.{8,}$/;
    const passwordRegex = /^.{8,}$/;

    if (!idRegex.test(idValue)) {
        alert('ID는 8글자 이상이어야 하며, 특수문자는 사용 불가능합니다.');
        return;
    }
    
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

    try {
        const result = await Select('User');
        let user = result.find(param => param.id === idValue);
        if(user){
            alert('이미 등록된 아이디 입니다.');
            return;
        }else{
            const currentDate = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
           
            const userJson = {
                "id":idValue.trim(),
                "passWord":password1Value.trim(),
                "userName":nameValue.trim(),
                "userNickName":nickNameValue.trim(),
                "profileImg": "",
                "datetime" : currentDate
            }
            sessionStorage.setItem("userInfo", idValue.trim()); // 저장
            Insert('User', userJson);
            location.href = "./main.html";
        }

    } catch (error) {
        console.error(error); // 오류 처리
    }
})
