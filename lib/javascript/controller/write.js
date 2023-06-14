import { Insert, Select, fileUpload } from '../db/database.js';
import { modalEventHandeller, closeModal } from '../modal/modal.js';

const writeForm = document.querySelector('#write-form')
const searchBtn = document.querySelector('.search-btn')
const modalOpen = document.querySelectorAll('.modal-open');
const closeModalBtn = document.querySelectorAll('.close-modal');
const lodging_list = document.querySelector('.lodging-list');

//inputs
const telInputs = document.querySelectorAll('input[type="tel"]'); // 숫자만 적을 수 있도록 type이 tel인 애들 가져옴
const go_day = document.getElementById('go-day');
const come_day = document.getElementById('come-day');
const person = document.getElementById('person');
const lodging = document.getElementById('lodging')
const lodging_price = document.getElementById('lodging-price');
const tax_price = document.getElementById('tax-price');

const exceptionHandler = () => {
  if(go_day.value === ''){
    alert('가는 날짜를 정해주세요.');
    return;
  }

  if(come_day.value === ''){
    alert('오는 날짜를 정해주세요.');
    return;
  }

  if(person.value === ''){
    alert('함께갈 친구를 추가해주세요.');
    return;
  }

  if(lodging.value === ''){
    alert('숙소를 선택하세요')
  }

  if(lodging_price.value === ''){
    alert('숙소 가격을 추가해주세요.');
    return;
  }
}

//숫자만 입력이 가능하게
telInputs.forEach(input => {
  input.addEventListener('input', (event) => {
    const inputValue = event.target.value;
    const numericRegex = /^[0-9]*$/;

    if (!numericRegex.test(inputValue)) {
      event.target.value = inputValue.replace(/[^0-9]/g, '');
    } else if (inputValue !== '') {
      const numericValue = parseInt(inputValue.replace(/[^0-9]/g, ''));
      event.target.value = numericValue.toLocaleString();
    }
  });
});

//오픈 버튼을 클릭했을때
modalOpen.forEach((el)=>{
  el.addEventListener('click', (e)=>{
      const sort = e.currentTarget.dataset.modal_sort
      const data_type = e.currentTarget.dataset.type
      modalEventHandeller(sort, data_type);
  })
})

// 닫기 버튼을 클릭했을떄
closeModalBtn.forEach((el)=>{
  el.addEventListener('click', (e)=>{
    
    closeModal();
  })
})

const section1 = document.querySelector('.sec1');
const user_list = section1.querySelector('.user_list');
export const modalDataReciver = async (data) => {
  
  
  const user_data = await Select('User');
  const filter_user_data = user_data.filter((param)=> data.includes(param.id));
  
  user_list.innerHTML = '';
  person.value = '';
    
  filter_user_data.forEach((param) => {
    const html = `
      <li>
      <div class="img-wrap">
          <div class="img-thumb" style="background-image: url('${param.imgUrl}');"></div>
      </div>
        <p>${param.userName}</p>
      </li>
    `
    user_list.innerHTML += html;
  });

  person.value = `${filter_user_data}`

}


searchBtn.addEventListener('click',()=>{
    searchPlaces();
})

// 검색 버튼 클릭 시 장소 검색 함수 실행
function searchPlaces() {
  const searchInput = document.getElementById('place-search').value;
  
  if (searchInput === '') {
      alert('검색어를 입력하세요.');
      return;
  }

  // 장소 검색 요청
  const request = {
    query: searchInput,
    fields: ['name', 'formatted_address'],
    types: ['lodging'],
    maxResults: 3
  };

  // 장소 서비스 객체 생성
  const service = new google.maps.places.PlacesService(document.createElement('div'));

  // 장소 검색 요청 보내기
  service.textSearch(request, handleSearchResults);
}
  
  // 장소 검색 결과 처리
function handleSearchResults(results, status) {
    const resultsDiv = document.getElementById('results');
    lodging_list.innerHTML = '';
    // 검색 결과 확인
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      // 검색 결과를 순회하며 결과 표시
      resultsDiv.innerHTML = '';
      results.forEach((param, index)=>{
        const html = `
                      <li>
                        <h3 class="title">${param.name}</h3>
                        <p class="address">${param.formatted_address}</p>
                      </li>
                    `
        lodging_list.innerHTML += html;

        const lodging_list_li = lodging_list.querySelectorAll('.lodging-list > li');
        lodging_list_li.forEach(el => {
          el.addEventListener('click', async (e) => {
            Array.from(el.parentNode.children)
            .filter(sibling => sibling !== el && sibling.classList.contains('active'))
            .forEach(sibling => sibling.classList.remove('active'));
            console.log(param);
            lodging.value = `{
                          lodging : ${param.name},
                          address : ${ param.formatted_address }
                        }`
            el.classList.add('active');
          });
        });
      });
    } else {
        alert('검색결과가 없습니다.');
    }
  }
  

writeForm.addEventListener("submit", async function(event) {
    event.preventDefault();
    exceptionHandler();
    console.log('가는날', go_day.value)
    console.log('오는날', come_day.value)
    console.log('인원', person.value)
    console.log('숙소', lodging.value)
    console.log('숙소가격', lodging_price.value)
    /*const go_day = document.getElementById('go-day');
const come_day = document.getElementById('come-day');
const person = document.getElementById('person');
const lodging = document.getElementById('lodging')
const lodging_price = document.getElementById('lodging-price');
const tax_price = document.getElementById('tax-price');*/
});