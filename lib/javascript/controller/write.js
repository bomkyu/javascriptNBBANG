import { Insert, Select, fileUpload } from '../db/database.js';
import { modalEventHandeller , closeModal } from '../modal/modal.js';

let session = sessionStorage.getItem("userInfo");

const writeForm = document.querySelector('#write-form')
const searchBtn = document.querySelector('.search-btn')
const modalOpen = document.querySelectorAll('.modal-open');
const closeModalBtn = document.querySelectorAll('.close-modal');
const lodging_list = document.querySelector('.lodging-list');

//파일업로드
const realUpload = document.querySelector('.real-upload');
const upload = document.querySelector('.file-upload');
const imgThumb = document.querySelector('.img-thumb');

//inputs
const telInputs = document.querySelectorAll('input[type="tel"]'); // 숫자만 적을 수 있도록 type이 tel인 애들 가져옴
const go_day_el = document.getElementById('go-date');
const come_day_el = document.getElementById('come-date');
const go_day = document.getElementById('go-day');
const come_day = document.getElementById('come-day');

const person = document.getElementById('person');
const lodging = document.getElementById('lodging')
const lodging_price = document.getElementById('lodging-price');
const tax_price = document.getElementById('tax-price');

//여행에 값이 있을경우.
const trip = await Select('Trip');
const trip_filter = trip.filter(param => {
    const hasMyId = param.manager === session || (param.friends && param.friends.some(p => p.id === session));
    return hasMyId;
});

if(trip_filter.length != 0 ){
  alert('이미 일정이 있어요!');

  location.href = '../main.html'

}

//파일업로드
upload.addEventListener('click', () => realUpload.click());
realUpload.addEventListener('change', getImageFiles);

let file;
function getImageFiles(e) {
    const files = e.currentTarget.files;
    if (files && files.length > 0) {
      file = files[0];
      const reader = new FileReader();
      
      reader.onload = function(e) {
        imgThumb.innerHTML = '';
        const imageUrl = e.target.result;
        // imgThumb.style.backgroundImage = `url(${imageUrl})`;
        let img = document.createElement("img");
        img.setAttribute("src", imageUrl);
        imgThumb.appendChild(img);
        //console.log('getImageFiles', file);
      };
      
      reader.readAsDataURL(file);
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
          <div class="img-thumb" style="background-image: url('${param.imgUrl ? param.imgUrl : '../lib/images/img_user.png'}');"></div>
      </div>
        <p>${param.userName}</p>
      </li>
    `
    user_list.innerHTML += html;
  });

  person.value = JSON.stringify(filter_user_data);

}

export const modalCarendarReciver = (date) => {
  //console.log('asdasd',date);
  if(date.sort == 'go_date'){
    go_day_el.innerText = `${date.month}월 ${date.day}일`;
    go_day.value = `${date.year}-${date.month}-${date.day}`;
    //console.log('write.js ModalCarendarReciver //// go_date', date);
  }else{
    come_day_el.innerText = `${date.month}월 ${date.day}일`;
    come_day.value = `${date.year}-${date.month}-${date.day}`
    //console.log('write.js ModalCarendarReciver //// com_date', date);
  }
  //console.log('modalCarendarReciversss //// go_day', go_day.value);
  //console.log('modalCarendarReciversss //// come_day', come_day.value);

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
    fields: ['name', 'formatted_address', 'geometry.location'],
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
            let loadging_json = {
              'lodging' : `${param.name}`,
              'address' : `${param.formatted_address }`,
              'lat' : param.geometry.location.lat(),
              'lng' : param.geometry.location.lng()
            }
            lodging.value = JSON.stringify(loadging_json);
            el.classList.add('active');
          });
        });
      });
    } else {
        alert('검색결과가 없습니다.');
    }
  }

const removeCommas = (str) => {
  if (!str.includes(',')) {
    return str;
  }
  
  return str.replace(/,/g, "");
};

writeForm.addEventListener("submit", async function(event) {
    event.preventDefault();

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
      return;
    }
  
    if(lodging_price.value === ''){
      alert('숙소 가격을 추가해주세요.');
      return;
    }

    //console.log(`가는날 : ${go_day.value} ///// 오는날 ${come_day.value}`)

    const key = 'Trip'; // 컬렉션 키
    const formatter = new Intl.DateTimeFormat('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, timeZone: 'Asia/Seoul' });
    const parts = formatter.formatToParts(new Date());
    const currentDate = `${parts[0].value}-${parts[2].value}-${parts[4].value} ${parts[6].value}:${parts[8].value}:${parts[10].value}`;

    let writeJson = {
      'manager' : session,
      'goDay': go_day.value,
      'comeDay': come_day.value,
      'person': JSON.parse(person.value.trim()),
      'logingInfo': {
        ...JSON.parse(lodging.value.trim()),
        'lodgingPrice': removeCommas(lodging_price.value.trim())
      },
      'taxPrice' : tax_price.value == null || tax_price.value == '' ? '0' : removeCommas(tax_price.value.trim()),
      'dateTime' : currentDate
    };
    
    //console.log('데이터',writeJson);
    
    fileUpload(file, currentDate)
    .then(downloadURL => {
        // 다운로드 URL을 얻은 후에 Insert 함수 호출
        if(file != null){
          const value = { ...writeJson, 'TaxImg': downloadURL }; // 다운로드 URL을 데이터에 추가
          return Insert(key, value);
        }else{
          const value = { ...writeJson, 'TaxImg' : ''}; // 이미지 파일 없이 데이터만 추가
         return Insert(key, value);
        }
        
    })
    .then(() => {
        console.log("모든 작업 완료");
        window.location.replace('../main.html');
    })
    .catch((error) => {
        console.log(error.message);
    });
});