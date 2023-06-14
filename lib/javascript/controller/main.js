import { Select } from '../db/database.js'
import { showSpinner, hideSpinner } from '../UI/spinner.js'
let session = sessionStorage.getItem("userInfo");
const user_info = document.querySelector('.user-info');

const createHtml = async () => {
    try {
        showSpinner();
        const users = await Select('User');
        const users_filter = users.filter(praam => praam.id == session);

        const trip = await Select('Trip');
        
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
        hideSpinner();
        
    } catch (error) {
        
    }
}

createHtml();

