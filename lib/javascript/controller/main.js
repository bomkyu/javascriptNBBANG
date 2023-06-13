import { Select } from '../db/database.js'

let userInfo = sessionStorage.getItem("userInfo");
const user_info = document.querySelector('.user-info');

const createHtml = async () => {
    try {
        console.log(await Select('User'));
        
    } catch (error) {
        
    }
}

createHtml();

