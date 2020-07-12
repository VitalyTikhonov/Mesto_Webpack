"use strict";
class Card {
    constructor(openImagePopup, api, userInfo) {
        this.openImagePopup = openImagePopup;
        this.api = api;
        this.userInfo = userInfo;
        this.cardObject = {
            name: null,
            image: null,
            deleteIcon: null,
            likeIcon: null,
            imageUrl: null,
            id: null,
            isLiked: null,
        };
        this.viewImage = this.viewImage.bind(this);
        this.likeHandler = this.likeHandler.bind(this);
    }


    viewImage() {
        this.openImagePopup(this.cardObject.imageUrl);
    }

    removeEventListeners = () => {
        this.cardObject.image.removeEventListener('click', this.viewImage);
        this.cardObject.deleteIcon.removeEventListener('click', this.deleteIconHandler);
        this.cardObject.likeIcon.removeEventListener('click', this.likeHandler);
    }

    setEventListeners = () => {
        this.cardObject.image.addEventListener('click', this.viewImage);
        this.cardObject.deleteIcon.addEventListener('click', this.deleteIconHandler);
        this.cardObject.likeIcon.addEventListener('click', this.likeHandler);
    }


    deleteCardLocally() {
        this.removeEventListeners();
        /* РЕАЛИЗОВАНО */
        /*RE$VIEW. Надо лучше. Класс карточки, ответственный за создание элемента карточки, который можно встаывить в любую разметку,
        не должен зависеть от глобальных DOM -элементов, даже переданных в параметрах. Поэтому container надо исключить из параметров и
        избавиться от него в deleteIconHandler. Можно элемент карточки сделать свойством класса и удалить его методом remove().
         */
        this.cardElement.remove();
    }

    deleteIconHandler = (event) => {
        event.stopPropagation();
        if (window.confirm("Удалить карточку?")) {
            this.api.deleteCard(this.cardObject.id)
                .then(() => this.deleteCardLocally())
                .catch(err => {
                    /* Добавил на страницу карточки, удалил их с сервера с помощью утилиты
                    https://evgeniypanin.github.io/kill_bill/, а затем, не обновляя страницу, нажал на корзину –
                    получил 403 (Forbidden), а в Network > Preview – message: "Можно удалять только собственные посты".
                    Отсюда такая обработка: */
                    if (err.status === 403) {
                        this.deleteCardLocally();
                        console.log(`${err.status}. ${err.statusText}. Вероятно, карточка не найдена на сервере. Выполнено локальное удаление.`);
                    }
                });
        }
    }

    isMine(ownerId) {
        return ownerId === this.userInfo.id;
    }

    manageDeletePermission(ownerId) {
        if (this.isMine(ownerId)) {
            this.cardObject.deleteIcon.removeAttribute('disabled');
        }
        else {
            this.cardObject.deleteIcon.setAttribute('disabled', 'disabled');
        }
    }

    checkMyLike(likes, id) {
        return likes.some(function (like) {
            return like._id === id;
        });
    }

    setLikes(likes) {
        this.cardObject.isLiked = this.checkMyLike(likes, this.userInfo.id);
        this.cardObject.likeCount.textContent = likes.length;
        if (this.cardObject.isLiked) {
            this.cardObject.likeIcon.classList.add('like__icon_liked');
        }
        else {
            this.cardObject.likeIcon.classList.remove('like__icon_liked');
        }
    }

    likeHandler() {
        if (this.cardObject.isLiked) {
            this.api.unLikeCard(this.cardObject.id)
                .then(res => {
                    this.setLikes(res.likes);
                })
                .catch(err => console.log(err.status, err.statusText));
        } else {
            this.api.likeCard(this.cardObject.id)
                .then(res => {
                    this.setLikes(res.likes);
                })
                .catch(err => console.log(err.status, err.statusText));
        }
    }

    /* ---- НЕ ПОНЯТО ---- */
    /*REVIEW. Можно лучше. Лучше параметры placeName и imageUrl сделать параметрами конструктора и сохранить их в свойствах
    класса (смотрите также комментарий по этому поводу в классе Popup).

        Студент:
        – Откуда в экземпляр класса Card должны попадать аргмуенты placeName и imageUrl? При том, где он сейчас создается, не вижу возможности их
        туда передавать.*/

    /* ---- РЕАЛИЗОВАНО, но СОМНЕНИЯ ----- */
    /*REVIEW. Можно лучше. Чтобы не перечислять все атрибуты карточки в параметрах конструктора, можно рассмотреть вариант передачи в параметр
    конструктора объекта, например objCard, со свойствами -атрибутами карточки, и обращаться к name и link как к свойствам этого объекта objCard.name
    и objCard.link (в случае параметра-объекта к его свойствам нужно обращаться по именам, которые есть у этих свойств в действительности).
    Передача объекта в качестве значения параметра удобна, когда надо передать много аргументов (тогда их и определяют как свойства
    одного объекта), а количество атрибутов карточки может увеличиться. Про передачу в параметры функции объекта можно прочитать здесь
    http://www.webpupil.ru/javascript_pract_view.php?id=7
    Передача объекта и переменной в функцию в Javascript

    Студент:
    Какой смысл создавать такой объект снаружи, если его свойства невозможно определить снаружи, они будут null?
    И какой смысл создавать его внутри - только для группировки?
    Вот ревьюэр пишет:
    "Передача объекта в качестве значения параметра удобна [, потому что] количество атрибутов карточки может увеличиться"
    Все равно придется новые атрибуты как-то обрабатывать в классе, а значит ручками писать для этого строчки. Кроме визуальной группировки
    в конструкторе, не вижу вообще никакого смысла.

    */
    createPlaceCard = (cardData) => {
        const markup = `
                <div class="place-card">
                <div class="place-card__image">
                  <button class="place-card__delete-icon" disabled></button>
                </div>
                <div class="place-card__description">
                  <h3 class="place-card__name"></h3>
                  <div class="like">
                        <button class="like__icon"></button>
                        <span class="like__count"></span>
                  </div>
                </div>
              </div>
                        `;
        const element = document.createElement('div');
        element.insertAdjacentHTML('afterbegin', markup);
        this.cardElement = element.firstElementChild;

        this.cardObject.image = this.cardElement.querySelector('.place-card__image');
        this.cardObject.name = this.cardElement.querySelector('.place-card__name');
        this.cardObject.deleteIcon = this.cardElement.querySelector('.place-card__delete-icon');
        this.cardObject.likeIcon = this.cardElement.querySelector('.like__icon');
        this.cardObject.likeCount = this.cardElement.querySelector('.like__count');

        this.cardObject.imageUrl = cardData.link;
        this.cardObject.image.style.backgroundImage = `url(${this.cardObject.imageUrl})`;
        this.cardObject.name.textContent = cardData.name;

        this.cardObject.id = cardData._id;
        this.manageDeletePermission(cardData.owner._id);
        // console.log(cardData.owner.name); // =)
        this.setLikes(cardData.likes);
        this.setEventListeners();
        return this.cardElement;
    }
}
