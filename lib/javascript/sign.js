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
        alert('아이디와 혹은 비밀번호를 입력해주세요.');
    } else {
        /*var inputId = document.getElementById("inputId").value;
        var inputPw = document.getElementById("inputPw").value;
        console.log('아이디:', inputId);
        console.log('비밀번호:', inputPw);*/
        
        // 메인 페이지로 이동
        window.location.href = "main.html";
    }
    
})