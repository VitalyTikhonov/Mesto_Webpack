# Mesto_Webpack v1.0.1
Учебное задание по сборке проекта с помощью Вебпака
## Функционал проекта
Настроена development- и production-сборка, а также размещение (deployment) на сервере.
Функционал страницы Mesto, который реализован мной на предыдущих этапах:
- добавление и удаление карточек с фотографиями;
- просмотр фотографий в полный размер;
- изменение данных в профиле пользователя;
- открытие и закрытие всплывающих окон для описанного выше;
- лайки под фотографиями;
- собственная валидация форм;
- подключение к API: обмен данными с сервером.
## Используемые технологии
- JavaScript
- HTML
- CSS
- WebPack
### Пакеты, задействованные в Вебпаке:
- [Babel CLI](https://babeljs.io/docs/en/babel-cli#docsNav)
- [Babel Core](https://babeljs.io/docs/en/babel-core)
- [Babel Preset Evnvironment](https://babeljs.io/docs/en/babel-preset-env#docsNav)
- [Сore JS](https://github.com/zloirock/core-js#readme)
- [PostCSS](https://postcss.org/)
- [Define plugin](https://webpack.js.org/plugins/define-plugin/)
- [Style loader](https://github.com/webpack-contrib/style-loader)
- [Optimize CSS assets](https://www.npmjs.com/package/optimize-css-assets-webpack-plugin)
и др.
## Как воспользоваться проектом
### Посмотреть на Github Pages:
https://VitalyTikhonov.github.io/Mesto_Webpack
### Для целей разработки
- Создайте локальную копию репозитория по SSH-ключу *git@github.com:VitalyTikhonov/Mesto_Webpack.git* или скачайте архив [с главной страницы репозитория](https://github.com/VitalyTikhonov/Mesto_Webpack).
- Установите в проекте Вебпак и необходимые компоненты командой _npm install_.
- Для создания финальной сборки вызывайте в консоли команду *npm run build*, сборки в режиме разработки – *npm run dev*, развертывания на сервере – *npm run deploy*.
