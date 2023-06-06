import { setLocalStorage, getLocalStorage } from './storage.js';

const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", function(event) {
    event.preventDefault();
    let inputs = document.querySelectorAll('input');

    var isEmpty = false;
    inputs.forEach(function(input) {
        if (input.value === '') {
        isEmpty = true;
        }
    });

    if (isEmpty) {
        alert('아이디 혹은 비밀번호를 확인해 주세요.');
        return;

    } else {
        let inputId = document.getElementById("id").value;
        let inputPw = document.getElementById("pw").value;

        let user = getLocalStorage('User').find(param => param.user_id === inputId && param.user_passWord === inputPw);

        if(user){
            location.href = './main.html';
        }else{
            alert('아이디 혹은 비밀번호가 틀렸습니다.')
        }

        return;
    }
    
    
})