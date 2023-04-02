export class Api {
    constructor(config) {
        this._url = config.url;
        this._headers =config.headers;
    }


    getAllCards() {
      return fetch(this._url, {
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