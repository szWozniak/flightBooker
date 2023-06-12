export const getToken = () => {
    return JSON.parse(localStorage.getItem('token'));
}

//0 - wylogowany 
//1 - zalogowany, jakkolwiek 
//2 - zalogowany, pracownik
export const isPermitted = (permissionLevel) => {
    if(permissionLevel === 0) {
        if(getToken()) return false; 
        else return true;
    } 
    if(permissionLevel === 1) {
        if(getToken()) return true;
        else return false; 
    }
    if(permissionLevel === 2) {
        if(getToken() && +localStorage.getItem('permissions') === 1) return true; 
        else return false;
    }
}

export const saveToken = (token, type) => {
    localStorage.setItem('token', JSON.stringify(token));
    localStorage.setItem('permissions', type);
}

export const deleteToken = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('permissions');
}

export const getHeaders = () => {
    const config = {
        headers: { authorization: `Bearer ${getToken()}` }
    };
    
    return config;
}