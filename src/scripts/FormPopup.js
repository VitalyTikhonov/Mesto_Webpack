"use strict";
import {Popup} from "./Popup.js";

class FormPopup extends Popup {
    constructor(
        popup,
        closeIcon,
        openElement,
        form,
        submitButton,
        formValidator,
        selectFormProcessor,
        userNameField,
        userAboutField,
        userInfoName,
        userInfoAbout,
    ) {
        super(popup, closeIcon);
        this.openElement = openElement;
        this.form = form;
        this.submitButton = submitButton;
        this.formValidator = formValidator;
        this.processForm = selectFormProcessor;
        this.userNameField = userNameField;
        this.userAboutField = userAboutField;
        this.userInfoName = userInfoName;
        this.userInfoAbout = userInfoAbout;
        this.setPopupOpenListeners();
        this.inputElements = Array.from(this.form.elements).filter((inputElement) => {
            return inputElement.type !== 'submit' && inputElement.type !== 'button';
        });
        this.errorMessageElements = this.form.querySelectorAll('.popup__error');
        this.popupCloseIconHandler = this.popupCloseIconHandler.bind(this);
        this.popupEscHandler = this.popupEscHandler.bind(this);
        this.formInputHandler = this.formInputHandler.bind(this);
        this.submitButtonTexts = {
            normal: {
                empty: "",
                save: "Сохранить",
            },
            loading: "Загрузка...",
        }
    }

    setPopupOpenListeners() { //                                 НЕ ТРЕБУЕТСЯ УДАЛЯТЬ; ВЫЗЫВАЮТСЯ В КОНСТРУКТОРЕ
        /* Привязка через свойство класса почему-то не работает, хотя я уже избавился практически везде от стрелочных функций. Ок, привяжу здесь,
        все равно удалять слушатели кнопок открытия попапов не требуется. */
        this.openElement.addEventListener('click', this.open.bind(this));
    }

    setPopupCloseListeners() {
        // console.log('start FormPopup setPopupCloseListeners');
        this.closeIcon.addEventListener('click', this.popupCloseIconHandler);
        document.addEventListener('keydown', this.popupEscHandler);
    }

    removePopupCloseListeners() {
        // console.log('start Popup removePopupCloseListeners');
        this.closeIcon.removeEventListener('click', this.popupCloseIconHandler);
        document.removeEventListener('keydown', this.popupEscHandler);
    }

    setFormListeners() {
        // console.log('start FormPopup setFormListeners');
        /* Заменил делегирование от формы к инпутам на отслеживание конкретных полей – исключительно
                    в исполнение чеклиста: сомнительно, что в данном случае это необходимо. */
        this.inputElements.forEach((input) => {
            input.addEventListener('input', this.formInputHandler);
        });
        // this.form.addEventListener('input', this.formInputHandler);
        // this.form.addEventListener('input', this.formInputHandler);

        this.form.addEventListener('submit', this.formSubmitHandler, true);
    }

    removeFormListeners() {
        // console.log('start FormPopup removeFormListeners');
        this.inputElements.forEach((field) => {
            field.removeEventListener('input', this.formInputHandler);
        });
        this.form.removeEventListener('submit', this.formSubmitHandler, true);
    }

    toggleButtonState = (isValid) => {
        // console.log('start FormPopup toggleButtonState');
        if (isValid) {
            this.submitButton.removeAttribute('disabled');
        } else {
            /*  REVIEW. Можно лучше.  В методе setAttribute для булевых атрибутов второй параметр лучше задавать такой же, как сам атрибут,
            то есть: button.setAttribute('disabled', 'disabled').*/
            /* РЕАЛИЗОВАНО */
            this.submitButton.setAttribute('disabled', 'disabled');
        }
    }

    open() {
        this.setPopupCloseListeners();
        this.setFormListeners();
        super.open();
        const firstField = this.form.querySelectorAll('.popup__input')[0];
        firstField.focus(); // Должно стоять после открытия формы
        if (this.popup.classList.contains('popup_type_edit-profile')) {
            this.userNameField.value = this.userInfoName.textContent;
            this.userAboutField.value = this.userInfoAbout.textContent;
            this.toggleButtonState(true);
        }
    }

    popupCloseIconHandler() {
        // console.log('start FormPopup popupCloseIconHandler');
        this.resetAndClose(this.popup);
    }

    popupEscHandler(event) {
        // console.log('start FormPopup popupEscHandler');
        if (event.key === 'Escape' && this.popup) {
            this.resetAndClose(this.popup);
        }
    }

    resetAndClose() {
        // console.log('start FormPopup resetAndClose');
        this.closePopup();
        this.toggleButtonState(false);
        this.form.reset();
        this.formValidator.resetAllErrors(this.errorMessageElements);
        this.removeFormListeners();
        this.removePopupCloseListeners();
    }

    toggleButtonText(normal) {
        if (normal) {
            if (this.form.name === 'newPlace') {
                this.submitButton.textContent = this.submitButtonTexts.normal.empty;
                this.submitButton.classList.add('popup__button_type_plus');
                return;
            }
            this.submitButton.textContent = this.submitButtonTexts.normal.save;
            return;
        }
        this.submitButton.textContent = this.submitButtonTexts.loading;
        this.submitButton.classList.remove('popup__button_type_plus');
    }

    formInputHandler(event) {
        const inputElement = event.target;
        const errorMessageElement = this.form.querySelector(`#${inputElement.id}-error`);
        this.formValidator.manageErrorMessage(inputElement, errorMessageElement);
        this.toggleButtonState(this.formValidator.checkForm(this.inputElements));
    }

    formSubmitHandler = (event) => {
        event.preventDefault();
        this.toggleButtonText(false);
        this.processForm(this.form)
            .then(() => this.resetAndClose(this.popup))
            .catch(err => {
                alert(`Произошла ошибка: ${err.status} ${err.statusText}`);
            })
            .finally(() => {
                this.toggleButtonText(true);
            });
    }
}

export {FormPopup};
