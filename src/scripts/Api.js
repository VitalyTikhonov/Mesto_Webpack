"use strict";
class Api {
    constructor({ baseUrl, authorization, content_type }) {
        this.baseUrl = baseUrl;
        this.authorization = authorization;
        this.content_type = content_type;
    }

    primaryResponseHandler(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(res);
    }

    getUserInfo() {
        return fetch(
            `${this.baseUrl}/users/me`,
            {
                method: 'GET',
                headers: {
                    authorization: this.authorization,
                }
            }
        )
            .then(res => this.primaryResponseHandler(res));
    }

    saveProfile(name, about) {
        return fetch(
            `${this.baseUrl}/users/me`,
            {
                method: 'PATCH',
                headers: {
                    authorization: this.authorization,
                    'Content-Type': this.content_type,
                },
                body: JSON.stringify({
                    name,
                    about,
                })
            }
        )
            .then(res => this.primaryResponseHandler(res));
    }

    changePhoto(avatar) {
        return fetch(
            `${this.baseUrl}/users/me/avatar`,
            {
                method: 'PATCH',
                headers: {
                    authorization: this.authorization,
                    'Content-Type': this.content_type,
                },
                body: JSON.stringify({
                    avatar,
                })
            }
        )
            .then(res => this.primaryResponseHandler(res));
    }

    getCards() {
        return fetch(
            `${this.baseUrl}/cards`,
            {
                method: 'GET',
                headers: {
                    authorization: this.authorization,
                }
            }
        )
            .then(res => this.primaryResponseHandler(res));
    }

    addCard(name, link) {
        return fetch(
            `${this.baseUrl}/cards`,
            {
                method: 'POST',
                headers: {
                    authorization: this.authorization,
                    'Content-Type': this.content_type,
                },
                body: JSON.stringify({
                    name,
                    link,
                })
            }
        )
            .then(res => this.primaryResponseHandler(res));
    }

    deleteCard(id) {
        return fetch(
            `${this.baseUrl}/cards/${id}`,
            {
                method: 'DELETE',
                headers: {
                    authorization: this.authorization,
                }
            }
        )
            .then(res => this.primaryResponseHandler(res));
    }

    likeCard(id) {
        return fetch(
            `${this.baseUrl}/cards/like/${id}`,
            {
                method: 'PUT',
                headers: {
                    authorization: this.authorization,
                }
            }
        )
            .then(res => this.primaryResponseHandler(res));
    }

    unLikeCard(id) {
        return fetch(
            `${this.baseUrl}/cards/like/${id}`,
            {
                method: 'DELETE',
                headers: {
                    authorization: this.authorization,
                }
            }
        )
            .then(res => this.primaryResponseHandler(res));
    }
}
