import { setLocalStorage, getLocalStorage } from './storage.js';

const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", function(event) {
    event.preventDefault();
    // let inputs = document.querySelectorAll('input');

    // var isEmpty = false;
    // inputs.forEach(function(input) {
    //     if (input.value === '') {
    //     isEmpty = true;
    //     }
    // });

    // if (isEmpty) {
    //     alert('아이디 혹은 비밀번호를 확인해 주세요.');
    // } else {
    //     let inputId = document.getElementById("id").value;
    //     let inputPw = document.getElementById("pw").value;
        
    //     getLocalStorage('User').filter((param)=>{
    //         if(param.user_id == inputId && param.user_passWord == inputId){
    //             alert('해윙');
    //         }
    //     })

        
        
        
        
        // 메인 페이지로 이동
        //window.location.href = "main.html";
    }
    
})