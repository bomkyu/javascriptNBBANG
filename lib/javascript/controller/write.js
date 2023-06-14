import { Insert, Select, fileUpload } from '../db/database.js';
import { modalEventHandeller, closeModal } from '../modal/modal.js';

const writeForm = document.querySelector('#write-form')
const searchBtn = document.querySelector('.search-btn')
const modalOpen = document.querySelectorAll('.modal-open');
const closeModalBtn = document.querySelectorAll('.close-modal');

//오픈 버튼을 클릭했을떄
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

export const modalDataReciver = (data) => {
  console.log('ㅎㅇㅎㅇㅎㅇ',data)
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
    fields: ['name', 'formatted_address', 'rating', 'opening_hours'],
  };

  // 장소 서비스 객체 생성
  const service = new google.maps.places.PlacesService(document.createElement('div'));

  // 장소 검색 요청 보내기
  service.textSearch(request, handleSearchResults);
}
  
  // 장소 검색 결과 처리
function handleSearchResults(results, status) {
    const resultsDiv = document.getElementById('results');
  
    // 검색 결과 확인
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      // 검색 결과를 순회하며 결과 표시
      resultsDiv.innerHTML = '';
      for (let i = 0; i < results.length; i++) {
        const place = results[i];
        const resultItem = document.createElement('div');
        resultItem.innerHTML = `<h3>${place.name}</h3>
                                <p>${place.formatted_address}</p>
                                <p>평점: ${place.rating}</p>
                                <p>${place.opening_hours && place.opening_hours.weekday_text ? '운영 시간: ' + place.opening_hours.weekday_text.join(', ') : '운영 시간 정보 없음'}</p>`;
        resultsDiv.appendChild(resultItem);
      }
    } else {
        alert('검색결과가 없습니다.');
    }
  }
  

writeForm.addEventListener("submit", async function(event) {
    event.preventDefault();
   
});