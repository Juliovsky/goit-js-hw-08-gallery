'use strict';

import images from "./gallery-items.js";

const imgContainer = document.querySelector(".js-gallery");
const myModal = document.querySelector(".js-lightbox");
const modalImage = document.querySelector(".lightbox__image");
const modalButton = document.querySelector('button[data-action="close-lightbox"]');

let currentId = 1;

imgContainer.addEventListener('click', openModal);
modalButton.addEventListener("click", closeButton);
myModal.addEventListener("click", closeButton);
document.addEventListener('keydown', processKeys);

images.forEach(image => {
    let newElement = document.createElement("li");

    newElement.insertAdjacentHTML("afterbegin",
        `<li class="gallery__item">
        <a class="gallery__link" href="#">
            <img class="gallery__image" src="${image.preview}"
            data-source="${image.original}" alt='${image.description}'
            data-id="${currentId}" />
        </a>
    </li>`);
    imgContainer.appendChild(newElement);
    currentId++;
});

function openModal(e) {
    if (e.target.nodeName === 'IMG') {
        myModal.classList.add("is-open");
        modalImage.setAttribute("src", e.target.dataset.source);
        currentId = Number(e.target.dataset.id);
    }
}

function closeButton(e) {
    if (e.target.nodeName !== 'IMG') {
        myModal.classList.remove("is-open");
        modalImage.setAttribute("src", "#");
    }
}

function processKeys(e) {
    if (e.keyCode === 27) {
        closeButton(e);
    }

    if (e.keyCode === 37) {
        currentId -= 1;
        if (currentId > 0) {
            const prevImg = document.querySelector(`[data-id="${currentId}"]`);
            modalImage.setAttribute("src", prevImg.dataset.source);
        } else {
            currentId = 1;
        }
    }
    if (e.keyCode === 39) {
        currentId += 1;

        if (currentId < images.length) {
            const nextImg = document.querySelector(`[data-id="${currentId}"]`);
            modalImage.setAttribute("src", nextImg.dataset.source);
        } else {
            currentId = images.length - 1;
        }
    }
}