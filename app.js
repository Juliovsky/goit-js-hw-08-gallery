'use strict';
import images from "./gallery-items.js";

const imgContainer = document.querySelector(".js-gallery");

images.forEach(image => {
    let newElement = document.createElement("li");

    newElement.insertAdjacentHTML("afterbegin", 
    `<li class="gallery__item">
        <a class="gallery__link" href="#">
            <img class="gallery__image" src="${image.preview}"
            data-source="${image.original}" alt='${image.description}' />
        </a>
    </li>`);
    imgContainer.appendChild(newElement);
});

imgContainer.addEventListener('click', openModal);

const myModal = document.querySelector(".js-lightbox");
const modalImage = document.querySelector(".lightbox__image");

function openModal (e){
    myModal.classList.add("is-open");
    modalImage.setAttribute("src", e.target.dataset.source) ;
    if (e.target === e.currentTarget) {
        return
    }
}

const modalButton = document.querySelector('button[data-action="close-lightbox"]');
const secondClick = document.querySelector(".lightbox__overlay");

modalButton.addEventListener("click", closeButton);
secondClick.addEventListener("click", closeButton);

function closeButton() {
    myModal.classList.remove("is-open");
    modalImage.setAttribute("src", "#") ;
}
