import { Select } from '../db/database.js'

let userInfo = sessionStorage.getItem("userInfo");
const test = document.querySelector('#test');

const createHtml = async () => {
    try {
        const result = await Select('User');
        let user = result.find(param => param.id === userInfo);
        
    } catch (error) {
        
    }
}

createHtml();

