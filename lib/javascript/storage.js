const createLocalStorage = (sort) =>{
    window.localStorage.setItem(sort,'');
}

export let setLocalStorage = (sort, value) => {
    window.localStorage.setItem(sort,value);
}

export let getLocalStorage = (sort) => {
    const data = window.localStorage.getItem(sort);
    if (data) {
        return JSON.parse(data);
    }
    //return JSON.parse(window.localStorage.getItem(sort));
}

export let DeleteLocalStorage = (sort, value) => {
    //window.localStorage.setItem(sort,value);
}

if(window.localStorage.getItem('User') === null){
    createLocalStorage('User');
}else if(window.localStorage.getItem('Friend') === null){
    createLocalStorage('Friend');
}else if(window.localStorage.getItem('Location') === null){
    createLocalStorage('Location');
}
