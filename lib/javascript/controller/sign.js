import { Insert, Select } from '../db/database.js';

const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", async function(event) {
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
        try {
        
            let inputId = document.getElementById("id").value;
            let inputPw = document.getElementById("pw").value;
            
            let users = await Select('User');
            let user = users.find((param) => param.id == inputId && param.passWord == inputPw);

            console.log(user);
            if(user){
                sessionStorage.setItem("userInfo", inputId.trim()); // 저장
                window.location.replace('./main.html');
            }else{
                alert('아이디 혹은 비밀번호가 틀렸습니다.')
            }

            //console.log(result); // 결과 처리
        } catch (error) {
            //console.error(error); // 오류 처리
        }
    }
    
    
})