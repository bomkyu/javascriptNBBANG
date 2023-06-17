import { Select } from '../db/database.js';
import { showSpinner, hideSpinner } from '../UI/spinner.js';
let session = sessionStorage.getItem("userInfo");
const user_info = document.querySelector('.user-info');
const contain_el = document.querySelector('.contain');

const initMap = (lat, lng) => {
    // 구글 맵 초기화
    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat:lat, lng: lng },
        zoom: 18,
    });

    const marker = new google.maps.Marker({
        position: { lat: lat, lng: lng },
        map: map
    });
};


const createHtml = async () => {
    const numberWithCommas = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    try {
        showSpinner();
        const users = await Select('User');
        const users_filter = users.filter(param => param.id == session);

        const trip = await Select('Trip');
        const trip_filter = trip.filter(param => {
            const hasMyId = param.king === session || (param.person && param.person.some(p => p.id === session));
            return hasMyId;
        });

        const king_filter = users.filter(param => param.id == trip_filter[0].king);
        users_filter.forEach((param)=>{
            user_info.innerHTML=`
                <dl>
                    <dt>
                        <div class="img-wrap">
                            <div class="img-thumb" style="background-image: url('${param.imgUrl}');"></div>
                        </div>
                    </dt>
                    <dd>
                        <p>
                            안녕하세요. ${param.userName}님,<br>
                            친구들과 신나게 놀아봐요!
                        </p>
                    </dd>
                </dl>
            `
        })
        if(trip_filter.length == 0 || trip_filter == null){
            contain_el.innerHTML = ''

            contain_el.innerHTML = `
            <div class="no-data">
                <p>일정이 없어요! 일정을 추가하시겠어요?</p>
                <a href="./subpage/write.html" class="btn btn-st1"><p>일정 추가</p><span class="plus"></span></a>
            </div>
            `
        }else{
            contain_el.innerHTML = ''
            let html = '';
            const {king, goDay, comeDay, logingInfo, person, taxPrice, TaxImg} = trip_filter[0];
            const { lodging, address, lodgingPrice, lat, lng } = logingInfo;
            trip_filter.forEach(param => {
                html += `
                            <h2 class="title mt-20">일정</h2>
                            <ul class="date-selector">
                                <li>
                                    <div class="date-selector-contain modal-open" data-modal_sort="full" data-type="calendar">
                                        <p class="title">가는날</p>
                                        <p class="date" id="go-date">${goDay}</p>
                                        <input type="text" id="go-day" name="go-day"style="display: none;">
                                    </div>
                                </li>
                                <li>
                                    <div class="date-selector-contain modal-open" data-modal_sort="full" data-type="calendar">
                                        <p class="title">오는날</p>
                                        <p class="date" id="come-date">${comeDay}</p>
                                        <input type="text" id="come-day" name="come-day" style="display: none;">
                                    </div>
                                </li>
                            </ul>
                        `
                html += `
                            <h2 class="title">인원</h2>
                            <ul class="user_list" style="margin-top:30px"> 
                            <li class="king">
                                <div class="img-wrap">
                                    <div class="img-thumb" style="background-image: url('${king_filter[0].imgUrl}');"></div>
                                </div>
                                <p>${king_filter[0].userName}</p>
                            </li>
                        `
                person.forEach(frineds => {
                    let { imgUrl,userName} = frineds;
                    
                    html += `
                            <li>
                                <div class="img-wrap">
                                    <div class="img-thumb" style="background-image: url('${imgUrl}');"></div>
                                </div>
                                <p>${userName}</p>
                            </li>
                            `
                })
                html += `</ul>`
                html += `
                            <h2 class="title">숙소</h2>
                            <div id="map" style="height:300px; margin-bottom:20px"></div>
                        `
                html += `
                            <dl class="location-info">
                                <dt>이름 : </dt>
                                <dd>${lodging}</dd>
                            </dl>
                            <dl class="location-info">
                                <dt>주소 : </dt>
                                <dd>${address}</dd>
                            </dl>
                            <dl class="location-info">
                                <dt>가격 : </dt>
                                <dd>${numberWithCommas(Number(lodgingPrice))}원</dd>
                            </dl>
                        `
                        let total_pay = Number(lodgingPrice) + Number(taxPrice);

                        if(taxPrice || TaxImg){
                        html += `
                                    <h2 class="title">영수증</h2>
                                    <img src="" alt="">
                                    <dl class="location-info">
                                        <dt>금액 : </dt>
                                        <dd>${numberWithCommas(Number(taxPrice))}원</dd>
                                    </dl>
                                `
                        }
                html += `
                            <h2 class="totl-price">총금액 : ${numberWithCommas(Number(total_pay))}원</h2>
                            <h2 class="totl-price">인당금액 : ${numberWithCommas(Number(total_pay / (person.length + 1)))}원</h2>
                        `
                    contain_el.innerHTML = html;
            });

            initMap(lat, lng); // initMap 함수 호출
        }
        hideSpinner();
        
    } catch (error) {
        
    }
   
}
createHtml();
