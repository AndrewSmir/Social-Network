import * as axios from "axios";

//Создаем Data Access Layer - слой доступа к данным

const instance = axios.create({ //создаем инстанс нашего запроса. Это функция, которая возвращает нам объект с настройками запроса.
    baseURL: 'https://social-network.samuraijs.com/api/1.0/', //это значение будет автоматически подставляться в начало url строки (первым параметром, например, перед users?page=.....)
    withCredentials: true,
    headers: { //HEADERS -
        'API-KEY':'2aa9b183-f48f-4118-9c56-db5dfd5a00b4'}, //Все запросы, кроме get требуют ключ доступа.
})

/*
После того, как мы создали инстанс, мы делаем запросы не через axios, а через инстанс,
т.е. не axios.get, а instance.get
 */

export const usersAPI = {
     getUsers(currentPage, pageSize) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
            return response.data //Возвращаем не весь response, а только нуные нам данные. Заголовки, и д.р. - не нужно
        })
    },
    followUser(userId) {
        return instance.post(`follow/${userId}`)
            .then(response => response.data)
    },

    unfollowUser(userId){
        return instance.delete(`follow/${userId}`)
            .then(response => response.data)
    }

}

export const loginAPI = {
    login(){
        return instance.get(`auth/me`)
            .then(response => response.data)
    },

    signIn(loginData){
        return instance.post('auth/login', {email: loginData.email, password: loginData.password, rememberMe: loginData.rememberMe, captcha: loginData.captcha})
            .then(response=>response.data)
    },

    logout(){
        return instance.delete('auth/login')
            .then(response=>response.data)
    },

    getCaptchaURL(){
        return instance.get('security/get-captcha-url')
            .then(response=>response.data)
    }
}

export const profileAPI = {
    setProfile(userId){
        return instance.get(`profile/${userId}`)
            .then(response => response.data)
    },
    getStatus(userId){
        return instance.get(`profile/status/${userId}`)
            .then(response=>response.data)
    },
    updateStatus(status){
        return instance.put(`profile/status`, {status: status}) //вторым параметром в put запросе можно отправлять тело запроса. В конфигурации api заложено, что в теле запроса должен прийти объект со свойством status.
            .then(response=>response.data)
    },
    savePhoto(photoFile){
        let formData = new FormData()
        formData.append('image', photoFile)
        return instance.put('profile/photo', formData, {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        } )
    },
    saveProfile(profileData){
        return instance.put(`profile`, profileData)
    }
}