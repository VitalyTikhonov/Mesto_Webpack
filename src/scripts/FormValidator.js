"use strict";
class FormValidator {
    constructor() {
        this.errorMessages = {
            empty: 'Это обязательное поле',
            wronglength: 'Должно быть от 2 до 30 символов',
            wrongUrl: 'Здесь должна быть ссылка',
        };
    }

    /* ---- РЕАЛИЗОВАНО ---- */
    /* REVIEW. Можно лучше. Не нужно задавать переменным, или параметрам, имена input, submit. Это может ввести в заблуждение сопровождающего проект.
    Надо inputElement, submitElement, чтобы сразу было ясно, что это такое. Во многих инструкциях по написанию кода js требуется обязательно вводить в
    имя переменной, хранящей DOM-элемент, окончание Element. */

    /* ---- НЕ ПОНЯТО ---- */
    /*REVIEW. Можно лучше. Чтобы сделать функции setError и resetError независимыми от разметки, наряду с параметром элемента поля в них можно ввести
    и параметр элемента, содержащего сообщение об ошибке для поля.

        Студент:
        Функции setError и resetError используются непараллельно. resetError вызывается в resetAllErrors, которая экспортируется в Popup.
        Там она применяется сразу ко всей форме. Для работы setError и resetError требуется идентифицировать элемент ошибки, относящийся
        к конкретному полю ввода. Таким образом, чтобы setError и resetError требовали в параметрах элемент ошибки, придется реализовать в Popup
        какую-то идентификацию инпутов и их спанов ошибок.  Да и внутри текущего класса FormValidator функции setError и resetError вызываются через
        несколько этапов от того метода, в котором было бы логично идентифицировать спаны. Значит, пришлось бы передавать их из одного метода
        в другой. Мне кажется, это все громоздко и нецелесообразно.
        Но даже если я ошибаюсь и подобные схемы передачи не такие уж неоптимальные, как будет идентифицироваться спан в исходной точке?
        Точно так же по querySelector(`#${inputElement.id}-error. Не вижу другого способа. И какой тогда смысл усложнять?
        Если же идентифицировать спан как-то иначе – как? Аналогично другим ДОМ-узлам, из глобальной переменной? Тогда придется реализовывать
        в классах знание о конкретных полях ввода. В то время как у меня классы просто опираются на принцип именования спанов.
    */
    setError = (inputElement, errorMessageElement) => {
        errorMessageElement.textContent = inputElement.validationMessage;
    }

    resetError = (errorMessageElement) => {
        errorMessageElement.textContent = "";
    }

    resetAllErrors = (inputElements) => {
        inputElements.forEach((field) => {
            this.resetError(field);
        });
    }

    isFieldMissingValue = (inputElement) => {
        if (inputElement.validity.valueMissing) {
            inputElement.setCustomValidity(this.errorMessages.empty);
            return true;
        } else {
            inputElement.setCustomValidity('');
            return false;
        }
    }

    isWrongCharNumber = (inputElement) => {
        if (inputElement.validity.tooShort || inputElement.validity.tooLong) {
            inputElement.setCustomValidity(this.errorMessages.wronglength);
            return true;
        } else {
            inputElement.setCustomValidity('');
            return false;
        }
    }

    isNotUrl = (inputElement) => {
        if (inputElement.type === 'url' && inputElement.validity.typeMismatch) {
            inputElement.setCustomValidity(this.errorMessages.wrongUrl);
            return true;
        } else {
            inputElement.setCustomValidity('');
            return false;
        }
    }

    checkField = (inputElement) => {
        if (inputElement.type !== 'submit' && inputElement.type !== 'button') {
            if (this.isFieldMissingValue(inputElement)) {
                return false;
            } else if (this.isNotUrl(inputElement)) {
                return false;
            } else if (this.isWrongCharNumber(inputElement)) {
                return false;
            } else {
                return true;
            }
        }
    }

    manageErrorMessage = (inputElement, errorMessageElement) => {
        if (this.checkField(inputElement)) {
            this.resetError(errorMessageElement);
        } else {
            this.setError(inputElement, errorMessageElement);
        }
    }

    checkForm = (inputElements) => {
        let valid = inputElements.every((field) => {
            return this.checkField(field);
        });
        return valid;
    }
}

export {FormValidator};
