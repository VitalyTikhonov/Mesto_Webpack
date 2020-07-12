"use strict";
class CardList {
    constructor(container, placeNameField, placePhotoLinkField, createPlaceCard, api, userInfo) {
        this.container = container;
        this.placeNameField = placeNameField;
        this.placePhotoLinkField = placePhotoLinkField;
        this.createPlaceCard = createPlaceCard;
        this.api = api;
        this.userInfo = userInfo; // Только для получения своих карточек в режиме разработки
    }

    render = (initialCards) => {
                // Возвращать все 22 тысячи:
                // initialCards.forEach((card) => {
                //     this.container.appendChild(this.createPlaceCard(card));
                // });

                // Возвращать последние несколько карточек:
                for (let i = initialCards.length - 20; i <= initialCards.length - 1; i++) {
                    this.container.appendChild(this.createPlaceCard(initialCards[i]));
                }

                // Возвращать только мои:
                // const myCards = initialCards.filter((card) => {
                //     return this.userInfo.id === card.owner._id;
                // });
                // myCards.forEach((card) => {
                //     this.container.appendChild(this.createPlaceCard(card));
                // });
    }

    addPlaceCard = () => {
        return this.api.addCard(this.placeNameField.value, this.placePhotoLinkField.value)
            .then(res => this.container.appendChild(this.createPlaceCard(res)));
    }
}

export {CardList};
