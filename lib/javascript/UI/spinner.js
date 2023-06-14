// 바디 요소를 선택합니다.
const body = document.querySelector('body');
const spinner = document.createElement('div');
spinner.classList.add('spiner');
spinner.innerHTML = '';

body.appendChild(spinner);

// 파일 업로드 및 데이터 삽입 작업 전에 스피너를 표시하는 함수입니다.
export function showSpinner() {
    spinner.style.display = 'block';
  }
  
  // 파일 업로드 및 데이터 삽입 작업이 완료된 후에 스피너를 숨기는 함수입니다.
export  function hideSpinner() {
    spinner.style.display = 'none';
  }