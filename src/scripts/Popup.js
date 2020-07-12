"use strict";
class Popup {
    constructor(popup, closeIcon) {
        this.popup = popup;
        this.closeIcon = closeIcon;
    }

    setPopupCloseListeners() {
        // console.log('start Popup setPopupCloseListeners');
        this.closeIcon.addEventListener('click', this.popupCloseIconHandler);
        document.addEventListener('keydown', this.popupEscHandler);
    }

    open() {
        // console.log('start Popup open');
        this.popup.classList.add('popup_is-open');
    }

    closePopup() {
        // console.log('start Popup resetAndClose');
        this.popup.classList.remove('popup_is-open');
    }
}

export {Popup};
