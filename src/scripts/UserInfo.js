"use strict";
class UserInfo {
    constructor(
        userNameField,
        userAboutField,
        userAvatarField,
        { userInfoName, userInfoAbout, userInfoAvatar },
        api
    ) {
        this.userNameField = userNameField;
        this.userAboutField = userAboutField;
        this.userAvatarField = userAvatarField;
        this.userInfoName = userInfoName;
        this.userInfoAbout = userInfoAbout;
        this.userInfoAvatar = userInfoAvatar;
        this.api = api;
        this.id - null;
    }

    set() {
        return this.api.saveProfile(this.userNameField.value, this.userAboutField.value)
            .then(res => this.get(res));
            /*
                Надо исправить: из метода возвращается промис, блок catch который расположен здесь,
                он обрабатывает ошибку и выполнение продолжается как будто её не было.
                Из за этого попап закрывается даже если сервер вернул ошибку
                Если обработчик catch находится в середине цепочки обработки промиса
                из него нужно выбрасывать ошибку или возвращать отклоненный промис

                Попап нужно закрывать только если сервер ответил подтверждением, иначе
                если запрос завершиться ошибкой, а попап закроется пользователь может подумать
                что данные сохранились, т.е. перенести закрытие попапа и очистку формы в блок then
            */
    }

    changePhoto() {
        return this.api.changePhoto(this.userAvatarField.value)
            .then(res => this.get(res));
            /*
                Надо исправить: из метода возвращается промис, блок catch который расположен здесь,
                он обрабатывает ошибку и выполнение продолжается как будто её не было.
                Из за этого попап закрывается даже если сервер вернул ошибку
                Если обработчик catch находится в середине цепочки обработки промиса
                из него нужно выбрасывать ошибку или возвращать отклоненный промис

                Попап нужно закрывать только если сервер ответил подтверждением, иначе
                если запрос завершиться ошибкой, а попап закроется пользователь может подумать
                что данные сохранились, т.е. перенести закрытие попапа и очистку формы в блок then
            */
    }

    get(userData) { // обновлять данные внутри экземпляра класса
        this.userName = userData.name;
        this.userAbout = userData.about;
        this.userAvatar = userData.avatar;
        this.id = userData._id;
        this.updateOnPage();
    }

    updateOnPage() { // отображать эти данные на странице
        this.userInfoName.textContent = this.userName;
        this.userInfoAbout.textContent = this.userAbout;
        this.userInfoAvatar.style.backgroundImage = `url(${this.userAvatar})`;
    }
}

export {UserInfo};
