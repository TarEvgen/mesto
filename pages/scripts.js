const popupBtnOpen = document.querySelector(".profile__edit");

const popup2BtnOpen = document.querySelector(".profile__add");


const popup3BtnOpen = document.querySelector("card");

const popupFormProfile = document.querySelector(".popup_edit-profile");

const popupFormAddCards = document.querySelector(".popup_add-cards");  

const popupFormImg = document.querySelector(".popup_open-img");

const popupBtnClose = document.querySelector(".popup__close_edit-profile");
const popup2BtnClose = document.querySelector(".popup__close_add-cards");  
const popup3BtnClose = document.querySelector(".popup__close_img");
const popupLogin = document.querySelector(".profile__login");
const popupAtivity = document.querySelector(".profile__activity");

let formElement = document.querySelector(".popup__form");
let nameInput = document.querySelector(".popup__input_type_name");
let jobInput = document.querySelector(".popup__input_type_data"); 


const popapImgZoom = document.querySelector(".images")


const template = document
  .querySelector('.card')
  .content.querySelector('.element');


const template1 = document
 .querySelector('.open-img').content.querySelector('.images');
  
//console.log(template1)
//console.log(template)
const elementsList = document.querySelector('.elements__list'); 

const elementPopapOpen = document.querySelector('.popup__data');


const elementPopapOpenClose = document.querySelector('.images');

//const elementPopapOpen = document.querySelector('.images');

//console.log(elementPopapOpen)
const inputTitle = document.querySelector('.popup__input_type_title');

const inputLink = document.querySelector('.popup__input_type_link');

const btnSaveCreate = document.querySelector('.popup__save_create');







const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];






function openPopup(openPopupForm) {
  
  openPopupForm.classList.add("popup_opened");  
 nameInput.value = popupLogin.textContent;
 jobInput.value = popupAtivity.textContent;


}

function closePopup(close) {
  

  close.classList.remove("popup_opened");

  
  elementPopapOpenClose.remove()
 
}

function handleFormSubmit (evt) {
  evt.preventDefault(); 
  popupLogin.textContent = nameInput.value;
  popupAtivity.textContent = jobInput.value;
  closePopup(popupFormProfile)  
}




popupBtnClose.addEventListener("click", () => closePopup(popupFormProfile));

popup2BtnClose.addEventListener("click", () => closePopup(popupFormAddCards));

popup3BtnClose.addEventListener("click", () => closePopup(popupFormImg));


popupBtnOpen.addEventListener("click", () => openPopup(popupFormProfile));

popup2BtnOpen.addEventListener("click", () => openPopup(popupFormAddCards));


formElement.addEventListener ('submit', handleFormSubmit);



function renderCards() {

  const cards = initialCards.map((name) => {

  return createCard(name) 
   
  });
  elementsList.append(...cards); 
}

renderCards()

btnSaveCreate.addEventListener('click', (evt) => {

  evt.preventDefault();
  const name = inputTitle.value;
  const link = inputLink.value;

  const cardElement = createCard({name: name, link: link});

  elementsList.prepend(cardElement); 
  
  closePopup(popupFormAddCards) 

} );



function createCard(name) {


  const cardElement = template.cloneNode(true);
    cardElement.querySelector('.element__title').textContent = name.name;
    cardElement.querySelector('.element__img').src = name.link;
    cardElement.querySelector('.element__img').alt = name.name;

    cardElement.querySelector('.element__delete').addEventListener('click',() => {
      cardElement.remove();
    });

    cardElement.querySelector('.element__button').addEventListener('click',() => {
          
      cardElement.querySelector('.element__button').classList.toggle("element__button_active");
             
    });   


    

    cardElement.querySelector('.element__img').addEventListener('click',() => {
      
      const openI = template1.cloneNode(true);
      
      openI.querySelector('.popup__img').src = name.link;
      openI.querySelector('.popup__img').alt = name.name;
      openI.querySelector('.popup__description').textContent = name.name;
      
      popupFormImg.classList.add("popup_opened")
      
      //console.log(openI)

      elementPopapOpen.append(openI);
      
      console.log(elementPopapOpen)

      const elementPopapOpenClose = elementPopapOpen.querySelector('.images');
      
      //replaceWith
      console.log(elementPopapOpenClose)
 

       // cardElement.querySelector('.element__delete').addEventListener('click',() => {
 //   cardElement.remove();



      //popup3BtnClose.addEventListener("click", () => closePopup(popupFormImg));
      




       elementPopapOpen.querySelector('.popup__close_img').addEventListener('click',() => {
        elementPopapOpenClose.remove();
 });

 // popup3BtnClose.addEventListener("click", elementPopapOpenClose.remove('.images'));







    })
    
    return cardElement;


  

  }

