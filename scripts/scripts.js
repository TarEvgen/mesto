const popupBtnOpenProfile = document.querySelector(".profile__edit");
const popupBtnOpenAddCard = document.querySelector(".profile__add");

const popupFormProfile = document.querySelector(".popup_edit-profile");
const popupFormAddCards = document.querySelector(".popup_add-cards");  
const popupFormImg = document.querySelector(".popup_open-img");

const userLogin = document.querySelector(".profile__login");
const userActivity = document.querySelector(".profile__activity");

const profileForm = document.querySelector(".popup__form_profile");
const cardForm = document.querySelector(".popup__form_add-cards");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_data"); 

/////
//const templateCard = document.querySelector('.card').content.querySelector('.element');
////


const cardsContainer = document.querySelector('.elements__list'); 
const inputTitle = document.querySelector('.popup__input_type_title');
const inputLink = document.querySelector('.popup__input_type_link');

const cardDataLink = popupFormImg.querySelector('.popup__img')
const cardDataName =  popupFormImg.querySelector('.popup__img')
const CardDataContent = popupFormImg.querySelector('.popup__description')
const popupList = document.querySelectorAll('.popup')

const saveBtnCard = cardForm.querySelector('.popup__save_create')

///////////////////////////////////
class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector; 
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);

    return cardElement; 
  }


  generateCard () {

    this._element = this._getTemplate();
    this._setEventListeners();

   // console.log(this._element)
    //console.log("Созданный метод")
    this._element.querySelector('.element__title').textContent = this._name;
    this._element.querySelector('.element__img').src = this._link;

    //const elementImg = cardElement.querySelector('.element__img');
   // elementImg.src = cardData.link;
   // elementImg.src = cardData.link;

    return this._element;


  }


  _setEventListeners() {
    this._element.querySelector('.element__delete').addEventListener('click',() => {
      this._deleteCard()
     });

    this._element.querySelector('.element__button').addEventListener('click',() => {
      this._likeCard()
    });



    this._element.querySelector('.element__img').addEventListener('click',() => {
      openPopup(popupFormImg)
      console.log(popupFormImg)
      console.log(this._element)

      CardDataContent.textContent = this._name;
      cardDataLink.src = this._link; 
    
    
    })
    




    


  }


_deleteCard() {
  this._element.remove();
}

_likeCard() {
  this._element.querySelector('.element__button').classList.toggle("element__button_active");
}








/* elementImg.addEventListener('click',() => {
      openPopup(popupFormImg)           
      cardDataLink.src = cardData.link;
      cardDataName.alt = cardData.name;
      CardDataContent.textContent = cardData.name;       
    })*/













}


initialCards.forEach((item) => {

 // console.log(item)
  //console.log(item.link)
  //console.log(item.name)
  // Создадим экземпляр карточки
  const card = new Card(item, '.card_sample_place' );

  //console.log(card)
  // Создаём карточку и возвращаем наружу
  const cardElement = card.generateCard();

  // Добавляем в DOM
  cardsContainer.append(cardElement);
}); 






//const templateCard = document.querySelector('.card').content.querySelector('.element');


/*function createCard(cardData) {
  const cardElement = templateCard.cloneNode(true);
  const elementImg = cardElement.querySelector('.element__img');
    cardElement.querySelector('.element__title').textContent = cardData.name;
    elementImg.src = cardData.link;
    elementImg.alt = cardData.name;
    cardElement.querySelector('.element__delete').addEventListener('click',() => {
      cardElement.remove();
    });
      
    const buttonLike = cardElement.querySelector('.element__button');
    buttonLike.addEventListener('click',() => {
      buttonLike.classList.toggle("element__button_active");
    });   
    
    elementImg.addEventListener('click',() => {
      openPopup(popupFormImg)           
      cardDataLink.src = cardData.link;
      cardDataName.alt = cardData.name;
      CardDataContent.textContent = cardData.name;       
    })
  return cardElement;
}*/










///////////////////////////////////////
popupList.forEach((popup) =>{
  popup.addEventListener('click', function(evt) {
    if ( evt.target.classList.contains('popup__close') || evt.target === evt.currentTarget) {
      closePopup(popup);
    }  
  });
});

function closeEscapePopup(evt) {
  if (evt.key === 'Escape') {
    const popupOpen = document.querySelector('.popup_opened')
    closePopup(popupOpen); 
  }  
}

function openPopup(popup) {
  popup.classList.add("popup_opened"); 
  document.addEventListener('keydown', closeEscapePopup);
}

function openProfilePopup(popup) { 
  nameInput.value = userLogin.textContent;
  jobInput.value = userActivity.textContent;
  openPopup(popup);
} 

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener('keydown', closeEscapePopup); 
}

function handleProfileFormSubmit (evt) {
  evt.preventDefault(); 
  userLogin.textContent = nameInput.value;
  userActivity.textContent = jobInput.value;
  closePopup(popupFormProfile);
}

//renderInitialCards();

function renderInitialCards() {
  const cards = initialCards.map((cardData) => {
    return createCard(cardData) 
  });
  cardsContainer.append(...cards); 
}

cardForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const name = inputTitle.value;
  const link = inputLink.value;
  const cardElement = createCard({name: name, link: link});
  cardsContainer.prepend(cardElement); 
  closePopup(popupFormAddCards);
  cardForm.reset();
  inactiveButtonState (saveBtnCard);
});

//function createCard(cardData) {
  //const cardElement = templateCard.cloneNode(true);
  //const elementImg = cardElement.querySelector('.element__img');
    //cardElement.querySelector('.element__title').textContent = cardData.name;
   // elementImg.src = cardData.link;
   // elementImg.alt = cardData.name;
   // cardElement.querySelector('.element__delete').addEventListener('click',() => {
    //  cardElement.remove();
  //  });
      
   /* const buttonLike = cardElement.querySelector('.element__button');
    buttonLike.addEventListener('click',() => {
      buttonLike.classList.toggle("element__button_active");
    });   
    
   /* elementImg.addEventListener('click',() => {
      openPopup(popupFormImg)           
      cardDataLink.src = cardData.link;
      cardDataName.alt = cardData.name;
      CardDataContent.textContent = cardData.name;       
    })*/
  /*return cardElement;
}*/

enableValidation(formsConfig);

popupBtnOpenProfile.addEventListener("click", () => openProfilePopup(popupFormProfile));
popupBtnOpenAddCard.addEventListener("click", () => openPopup(popupFormAddCards));
profileForm.addEventListener('submit', handleProfileFormSubmit);