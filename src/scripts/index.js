"use strict";
import "../pages/index.css";

/* ИМПОРТ МОДУЛЕЙ */
import {Api} from "./Api.js";
import {Card} from "./Card.js";
import {CardList} from "./Cardlist.js";
import {FormPopup} from "./FormPopup.js";
import {FormValidator} from "./FormValidator.js";
import {ImagePopup} from "./ImagePopup.js";
import {UserInfo} from "./UserInfo.js";

(function () {
    /* ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ */
    const placesListNode = document.querySelector('.places-list');                                // CardList, Card
    /* ---- РЕАЛИЗОВАНО ----
    REVIEW. Можно лучше. Наверное, в этом проекте имеет смысл передавать в параметры только объект с атрибутами карточки (смотрите
    комментарий в классе Card и ссылку на статью там же). А вообще передача объекта как параметра считается небезопасной, так как в
    том методе, куда Вы его передаёте, открывается полный доступ ко всем его свойствам и эти свойства могут быть изменены в принимающем
    методе, так как они не константы. Можно, конечно, попробовать заморозить объект перед передачей (сделать его неизменяемым), но DOM-
    элементы, по-моему, глубоко заморозить нельзя.
    О заморозке объектов можно прочитать здесь: https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze

Студент:
    К сожалению, я на данный момент не понимаю, к каким типам объектов относится требование о заморозке: ко всем или
    только к таким, которые содержат ДОМ-узлы.

    */

    // Попап "Новое место"
    const newPlacePopup = document.querySelector('.popup_type_new-place');                      // Popup
    const formNewPlace = newPlacePopup.querySelector('.popup__form');                           // Popup
    const newPlaceSubmitButton = newPlacePopup.querySelector('.popup__button');                 // ...
    const newPlaceButton = document.querySelector('.user-info__button');                        // Popup
    const newPlacePopupCloseIcon = newPlacePopup.querySelector('.popup__close');                // Popup
    const placeNameField = formNewPlace.querySelector('#place-name');                           // CardList
    const placePhotoLinkField = formNewPlace.querySelector('#place-link');                      // CardList

    // Попап "Редактировать профиль"
    const editProfilePopup = document.querySelector('.popup_type_edit-profile');                // Popup
    const formEditProfile = editProfilePopup.querySelector('.popup__form');                     // Popup
    const editProfileSubmitButton = editProfilePopup.querySelector('.popup__button');           // ...
    const editProfileButton = document.querySelector('.user-info__button-edit-profile');        // Popup
    const editProfilePopupCloseIcon = editProfilePopup.querySelector('.popup__close');          // Popup
    const userNameField = formEditProfile.querySelector('#user-name');                          // Popup, UserInfo
    const userAboutField = formEditProfile.querySelector('#user-about');                        // Popup, UserInfo

    // Попап "Обновить аватар"
    const changePhotoPopup = document.querySelector('.popup_type_change-photo');                // Popup
    const formChangePhoto = changePhotoPopup.querySelector('.popup__form');                     // Popup
    const changePhotoSubmitButton = changePhotoPopup.querySelector('.popup__button');           // ...
    const changePhotoPopupCloseIcon = changePhotoPopup.querySelector('.popup__close');          // Popup
    const userAvatarField = formChangePhoto.querySelector('#avatar');                           // Popup, UserInfo

    // Попап просмотра фотографии
    const imageViewPopup = document.querySelector('.popup_type_image-view-card');               // Popup
    const imageViewPopupCloseIcon = imageViewPopup.querySelector('.popup__close');              // Popup
    const popupImage = imageViewPopup.querySelector('.popup__image');                           // Popup

    // Профиль пользователя на странице
    const userInfoName = document.querySelector('.user-info__name');                            // Popup, UserInfo
    const userInfoAbout = document.querySelector('.user-info__about');                          // Popup, UserInfo
    const userInfoAvatar = document.querySelector('.user-info__photo');                         // Popup, UserInfo

    // Группировка атрибутов
/* Студент:
    Не знаю, правильно ли я понял рекомендацию ревьюэра и пояснения наставника по ней.
        Нужно ли объявлять этот объект снаружи или просто сразу создать его в конструкторе?
        Если снаружи, то нужно ли в нем записывать разметку и пытаться сразу же определить ее компоненты?
        Полагаю, что, поскольку компоненты в ней здесь определить невозможно (? для этого придется уже здесь реализовывать
            создание карточки), то и саму разметку здесь задавать не надо. Все равно приходится обращаться к ее компонентам
            через querySelector в методе класса Card – так пусть и она там объявляется, чтобы все в одном месте было. А здесь
        имена компонентов. Очень странно...

        UPD: новая проблема с этим методом при подключении к серверу. Этот объект так получается единственный для всех карточек,
        и при попытке добавлять в него свойства происходит путаница. Передавать в new Card его копию? Или я тогда вообще не понимаю,
        зачем он нужен.


        Каждой карточке нужно передавать свой объект с данными, а не один для всех карточек


        */
    // const cardObject = {
    //     name: null,
    //     image: null,
    //     deleteIcon: null,
    //     likeIcon: null,
    // }

    /* КОЛБЕКИ */
    function openImagePopup(imageUrl) {
        imagePopupObj.open(imageUrl);
    }
    function createPlaceCard(...args) {
        return new Card(openImagePopup, api, userInfo).createPlaceCard(...args);
    };

    function selectFormProcessor(form) {
        if (form.name === 'newPlace') {
            return cardList.addPlaceCard();
        } else if (form.name === 'editProfile') {
            return userInfo.set();
        } else if (form.name === 'changePhoto') {
            return userInfo.changePhoto();
        }
    }


    /* ЭКЗЕМПЛЯРЫ КЛАССОВ */
    const formValidator = new FormValidator();
    const newPlacePopupInst = new FormPopup(
        newPlacePopup,
        newPlacePopupCloseIcon,
        newPlaceButton,
        formNewPlace,
        newPlaceSubmitButton,
        formValidator,
        selectFormProcessor,
    );
    const editProfilePopupInst = new FormPopup(
        editProfilePopup,
        editProfilePopupCloseIcon,
        editProfileButton,
        formEditProfile,
        editProfileSubmitButton,
        formValidator,
        selectFormProcessor,
        userNameField,
        userAboutField,
        userInfoName,
        userInfoAbout,
    );
    const changePhotoPopupInst = new FormPopup(
        changePhotoPopup,
        changePhotoPopupCloseIcon,
        userInfoAvatar,
        formChangePhoto,
        changePhotoSubmitButton,
        formValidator,
        selectFormProcessor,
        userAvatarField,
    );
    const api = new Api({
        baseUrl: 'https://praktikum.tk/cohort11',
        authorization: '0b72fd76-9a90-456a-b6c4-44b360b3c5bd', // headers
        content_type: 'application/json', // headers
    });
    const imagePopupObj = new ImagePopup(imageViewPopup, imageViewPopupCloseIcon, popupImage);
    const userInfo = new UserInfo(userNameField, userAboutField, userAvatarField, { userInfoName, userInfoAbout, userInfoAvatar }, api);
    const cardList = new CardList(placesListNode, placeNameField, placePhotoLinkField, createPlaceCard, api, userInfo);

    /* ВЫЗОВЫ ФУНКЦИЙ */
    Promise.all([
        api.getUserInfo(),
        api.getCards()
    ])
        .then((responses) => {
            const [userData, initialCards] = responses;
            userInfo.get(userData);
            cardList.render(initialCards);
        })
        .catch((err)=> console.log(err));
})();


/*
    Неплохая работа, но по организации кода есть несколько замечаний:

    Надо исправить:
    - класс FormValidator должен только валидировать форму и не отвечать за её отправку
    В нем не должно быть проверок на какой форме произошло событие отправки
    Вешать на кнопки отправки обработчики отдельно от класса FormValidator
Студент: Исправил.

    - из методов addPlaceCard set changePhoto убрать обработку ошибки:
        – или снова выбрасывать из обработчика
            ошибки новую ошибку,
        – или возвращать отлоненный промис. Иначе сейчас попапы закрываются даже если
            запрос на сервер завершился ошибкой.
Студент: Исправил (я изначально там не сообразил, что catch оказался в середине цепочки; сейчас просто убрал его и добавил сообщение об
    ошибке для пользователя).

    - отображение изначального теста кнопки должно быть в блоке finally
Студент: Исправил.

    - для отображения карточек нужны данные пользователя, поэтому отображать их надо только когда
    все данные получены, использовать для этого Promise.all
Студент: Исправил, только не понял, зачем помещать Promise.all в один из классов (как подразумевает Ваш пример).
------  Пример был взят из другого проекта, класс действительно не нужен

    ------------------------------------------------
    Постарался дать некоторые пояснения к прошлому ревью:
Студент: Благодарю.

    Объект cardData передавать не в метод create, а в конструктор класса Card и запоминать в свойстве класса
    this.cardData = cardData  , передавать отдельно placeName и imageUrl необязательно
СТУДЕНТ: Я так и делал. Карточек много, а объект такой у них один, получается. При обращении к его свойствам
        возникают ошибки.
    -  Каждой карточке должнен передаваться свой объект с данными

    В классе ImagePopup в метод openPopup передавать не событие, а данные карточки, иначе данные откуда брать
    изображение протекают наружу класса Card, это неочень хорошо. Выглядеть должно примерно так (пример из другой
        работы):
Студент: Исправил.

    //функция которая принимает картинку и открывает попап
    function openImagePopup(imageUrl) {
            popupImage.openPopup(imageUrl);
        }

    //в класс карточки передается колбэк, теперь карточка не знает как устроен попап изображения
    //она просто вызывает переданный ей колбэк передавая в него url картинки
    //тем самым мы сделали класс Card отвечающим принципу единственной ответственности
    class Card {
        constructor(cardData, openImageCallback) {
            this.cardData = cardData;
            this.openImageCallback = openImageCallback;
            this.openImage = this.openImage.bind(this);
            ........
        }

        openImage() {
            this.openImageCallback(this.cardData.link); //передаем данные из поля класса в openImageCallback
        }

        По методам  setError и resetError  все сделано на мой взгляд нормально, единственное искать и очищать ошибки
        нужно не по всем документе, а переданно в конструтор попапе, т.е. в this.popupObj.form
Студент: Исправил.

        */


/*
Студент: Исправил, только не понял, зачем помещать Promise.all в один из классов (как подразумевает Ваш пример).
------  Пример был взят из другого проекта, класс действительно не нужен

СТУДЕНТ: Я так и делал. Карточек много, а объект такой у них один, получается. При обращении к его свойствам
        возникают ошибки.
------  Каждой карточке должнен передаваться свой объект с данными, это тот объект который приходит с сервера
Для каждой карточки создается свой экземпляр класса Card и передается свой объект с данными, так что как получился
один объект на все карточки я немного не понял


  По 9 проектной работе: все замечания исправлены

  Если у Вас будет свободное время так же попробуйте освоить работу с сервером
  применив async/await для работы с асинхронными запросами.
  https://learn.javascript.ru/async-await
  https://habr.com/ru/company/ruvds/blog/414373/
  https://www.youtube.com/watch?v=SHiUyM_fFME
  Это часто используется в реальной работе

  Успехов в дальнейшем обучении!




*/















/* Студент, 9 СПРИНТ:
Уважаемый ревьюэр! В прошлый раз у меня приняли работу с первого раза. Я понимаю, что у вас цейтнот и что ревьюэр посчитала, что так будет
лучше. Но по ее рекомендациям у меня возникли вопросы, и в силу сложности контекста оказалось непросто передать их суть наставнику и товарищам.
В результате некоторые прояснить так и не удалось и осталось ощущение, что работа неоптимальна.
Буду Вам признателен, если Вы не примете мой проект с первого раза, даже если он для этого достаточно хорош), а посмотрите, как я проработаю
Ваши замечания, после чего оставите фидбек. Заране спасибо за Вашу работу! */

/*REVIEW. Резюме.

Хорошая работа.

Весь функционал работает правильно, сделаны дополнительные задания по полной валидации формы карточки и по закрытию всплывающих
окон клавишей ESC.
Классы независимы друг от друга, проект можно расширять не затрагивая старый функционал - соблюдён принцип открытости-закрытости
проекта.

Что можно улучшить.

---- РЕАЛИЗОВАНО ---- (первый этап – валить все 12 переменных в Popup, второй – перейти на наследование Popup) ----
1. Лучше не передавать в параметры всех классов объект popupObject, лучше передавать просто константы, которые хранят нужные
DOM-элементы. И лучше в 9-м задании так и сделать, иначе ревьюеры Вас могут не понять. Вы можете хранить для экспериментов
вариант проекта с передачей в параметры объекта, поэкспериментировать с его заморозкой (это почти что критическое требование).
(подробный комментарий в начале этого файла).

---- РЕАЛИЗОВАНО ----
2. А вот класс Card надо вообще освободить от какой-либо связи с разметкой - надо исключить из параметров container и
избавиться от него в deleteIconHandler. Можно элемент карточки сделать свойством класса и удалить его методом remove().
(это также почти что критическое требование, но не хочется из-за него задерживать Вашу работу, надеюсь, что Вы это
требование выполните).
Передавать popupObject туда так же не надо.
(комментарии в классе Card)

---- НЕ ПОНЯТО (см. комментарии в классах) ----
3. Лучше параметры placeName и imageUrl сделать параметрами конструктора и сохранить их в свойствах класса (комментарии в классе Card).

---- РЕАЛИЗОВАНО, но СОМНЕНИЯ -----
4. Чтобы не перечислять все атрибуты карточки в параметрах конструктора, можно рассмотреть вариант передачи в параметр
конструктора объекта, со свойствами - атрибутами карточки (комментарий в классе Card).

---- НЕ ПОНЯТО ----
5. Можно метод viewImageClickHandler сделать независимым от объекта события event, чтобы его можно было использовать и просто как
функцию, а не только как счлушателя. В него можно будет ввести параметр, например, imageUrl (подробный комментарий в классе Popup).

---- РЕАЛИЗОВАНО ----
6. Не нужно задавать переменным, или параметрам, имена input, submit. Это может ввести в заблуждение сопровождающего проект.
Надо inputElement, submitElement, чтобы сразу было ясно, что это такое. (подробный комментарий в классе FormValidator).


---- НЕ ПОНЯТО ----
7. Чтобы сделать функции setError и resetError независимыми от разметки, наряду с параметром элемента поля в них можно ввести
и параметр элемента, содержащего сообщение об ошибке для поля. (комментарий в классе FormValidator).

Работа принимается.

Желаю дальнейших успехов в обучении!

*/
