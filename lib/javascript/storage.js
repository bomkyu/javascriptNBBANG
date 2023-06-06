const createLocalStorage = (sort) =>{
    window.localStorage.setItem(sort,'');
}

export let setLocalStorage = (sort, value) => {
    const jsonString = JSON.stringify(value);
    window.localStorage.setItem(sort,jsonString);
}

export let getLocalStorage = (sort) => {
    const data = window.localStorage.getItem(sort);
    if (data) {
        return JSON.parse(data);
    }
    return null;
}

export let DeleteLocalStorage = (sort, value) => {
    if(!value){
        window.localStorage.removeItem(sort);
    }else{
        
    }
    //window.localStorage.setItem(sort,value);
}

if(window.localStorage.getItem('User') === null){
    createLocalStorage('User');
}else if(window.localStorage.getItem('Friend') === null){
    createLocalStorage('Friend');
}else if(window.localStorage.getItem('Location') === null){
    createLocalStorage('Location');
}else if(window.localStorage.getItem('Login') === null){
    createLocalStorage('Login');
}
