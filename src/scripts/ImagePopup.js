"use strict";
import {Popup} from "./Popup.js";

class ImagePopup extends Popup {
    constructor(popup, closeIcon, popupImage) {
        super(popup, closeIcon);
        this.popupImage = popupImage;
        this.popupCloseCliсkHandler = this.popupCloseCliсkHandler.bind(this);
        this.popupCloseIconHandler = this.popupCloseIconHandler.bind(this);
        this.popupEscHandler = this.popupEscHandler.bind(this);
    }

    setPopupCloseListeners() {
        this.popupImage.addEventListener('blur', this.popupCloseCliсkHandler);
        this.closeIcon.addEventListener('click', this.popupCloseIconHandler);
        document.addEventListener('keydown', this.popupEscHandler);
    }

    removePopupCloseListeners() {
        this.popupImage.removeEventListener('blur', this.popupCloseCliсkHandler);
        this.closeIcon.removeEventListener('click', this.popupCloseIconHandler);
        document.removeEventListener('keydown', this.popupEscHandler);
    }

    /* ---- НЕ ПОНЯТО ---- */
    /*REVIEW. Можно лучше. Можно viewImageClickHandler сделать независимой от объекта события event, чтобы её можно было использовать и просто
    как функцию, а не только как слушателя. event.target тогда в ней нельзя будет использовать, но в неё можно будет ввести параметр, например,
    imageUrl и передавать значение этого параметра в классе Card. Только в этом случае параметры метода createPlaceCard класса Card placeName
    и imageUrl лучше сделать параметрами конструктора и сохранить их в свойствах класса.

        – Откуда в экземпляр класса Card должны попадать аргументы placeName и imageUrl? При том, где он сейчас создается, не вижу возможности их
        туда передавать.
        – И для чего делать viewImageClickHandler доступным как просто функция?
     */
    open(cardImageUrl) { // ранее назывался openPopup, viewImageClickHandler
        this.setPopupCloseListeners();
        this.popupImage.src = cardImageUrl;
        super.open();
        this.popupImage.focus();
    }

    popupCloseIconHandler() {
        // console.log('start Popup popupCloseIconHandler');
        this.closePopup();
        this.removePopupCloseListeners();
    }

    popupEscHandler(event) {
        // console.log('start Popup popupEscHandler');
        if (event.key === 'Escape' && this.popup) {
            this.closePopup();
            this.removePopupCloseListeners();
        }
    }

    popupCloseCliсkHandler() {
        this.closePopup();
        this.removePopupCloseListeners();
    }
}

export {ImagePopup};
