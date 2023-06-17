import { Select } from '../db/database.js';
import { showSpinner, hideSpinner } from '../UI/spinner.js';
let session = sessionStorage.getItem("userInfo");
const user_info = document.querySelector('.user-info');
const contain_el = document.querySelector('.contain');

const createHtml = async () => {
    try {
        showSpinner();
        const users = await Select('User');
        const users_filter = users.filter(param => param.id == session);

        const trip = await Select('Trip');
        const trip_filter = trip.filter(param => {
            const hasMyId = param.king === session || (param.person && param.person.some(p => p.id === session));
            return hasMyId;
        });
        //console.log(trip_filter);

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
                            씬나게 놀아볼까?
                        </p>
                    </dd>
                </dl>
            `
        })
        if(trip_filter.length == 0 || trip_filter == null){
            contain_el.innerHTML = `
            <div class="no-data">
                <p>일정이 없어요! 일정을 추가하시겠어요?</p>
                <a href="./subpage/write.html" class="btn btn-st1"><p>일정 추가</p><span class="plus"></span></a>
            </div>
            `
        }else{
            console.log(trip_filter);
        }
        hideSpinner();
        
    } catch (error) {
        
    }
}

createHtml();

