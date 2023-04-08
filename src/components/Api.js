export class Api {
    constructor(config) {
        this._url = config.url;
        this._headers =config.headers;
    }


    getAllCards() {
      return fetch(`${this._url}/cards`, {
        method: 'GET',
        headers: this._headers
    })
    .then((res) =>{
      // console.log(res.json());
      if (res.ok) {
        return res.json();}
        return Promise.reject('Произошла ошибка')
        
    })
}

  loadDataUser () {

    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers
  })
  .then((res) =>{
    // console.log(res.json());
    if (res.ok) {
      return res.json();}
      return Promise.reject('Произошла ошибка')
      
  })

  }

  editProfile (inputData) {
    return fetch(`${this._url}/users/me`, {

      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: inputData.user,
        about: inputData.activity
      })

    })
    .then((res) =>{
      // console.log(res.json());
      if (res.ok) {
        return res.json();}
        return Promise.reject('Произошла ошибка')
      })

  }

  addCard (data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({name: data.title, link: data.link})
    })
    .then((res) =>{
      // console.log(data);
      if (res.ok) {
        return res.json();}
        return Promise.reject('Произошла ошибка')
      })
  }
 
  deleteCard (cardId) {
    console.log(cardId, 'cardId')
    console.log(`${this._url}/cards/${cardId}`, 'cardId')
    return fetch(`${this._url}/cards/${cardId}`,{
      method: 'DELETE',
      headers: this._headers
    })
    .then((res) =>{
      // console.log(data);
      if (res.ok) {
        return res.json();}
        return Promise.reject('Произошла ошибка')
      })
  }


  addLikes (cardId) {

    return fetch(`${this._url}/cards/${cardId}/likes`,{

      method: 'PUT',
      headers: this._headers

    })
    .then((res) =>{
      // console.log(data);
      if (res.ok) {
        return res.json();}
        return Promise.reject('Произошла ошибка')
      })

  }


  deleteLikes (cardId) {

    return fetch(`${this._url}/cards/${cardId}/likes`,{

      method: 'DELETE',
      headers: this._headers

    })
    .then((res) =>{
      console.log('сработал метод удалени лайка');
      if (res.ok) {
        return res.json();}
        return Promise.reject('Произошла ошибка')
      })

  }
  




}














/*fetch('https://mesto.nomoreparties.co/v1/cohort-63/cards', {
  headers: {
    authorization: 'dac2ff7d-9ecf-480c-a9f0-aeb4dc4991bc'
  }
})
  .then(res => res.json())
  .then((result) => {
    console.log(result);
  }); */