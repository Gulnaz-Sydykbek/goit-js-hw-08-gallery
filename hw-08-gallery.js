/*import galleryItems from './gallery-items.js';

console.log(galleryItems);

const ulGallery = document.querySelector('.js-gallery');

function items(img) {
  return img.map(({ preview, original, description }) => {
    return `
    <li class="gallery__item">
      <a
        class="gallery__link"
        href="${original}"
      >
        <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
        />
      </a>
    </li>
    `;
  })
  .join('');
}

ulGallery.insertAdjacentHTML('beforeend', items(galleryItems));

const modul = document.querySelector('.js-lightbox');
const content = document.querySelector('.lightbox__image');
const close = document.querySelector('button[data-action="close-lightbox"]');
console.log(content);

ulGallery.addEventListener('click', onClick);

function onClick(evt) {
  evt.preventDefault();
  if (!evt.target.classList.contains('gallery__image')) {
    return;
  }

  close.addEventListener('click', onClose);

  function onClose() {
    galleryItems.forEach((item) => {
      if (evt.target.alt === item.description) {
        content.src = '';
        content.alt = '';
        modul.classList.remove('is-open');
      }
    })
  }

  galleryItems.forEach((item) => {
    if (evt.target.alt === item.description) {
      content.src = `${item.original}`;
      content.alt = `${item.description}`;
      modul.classList.add('is-open');
    }
  })
}*/

//==========================================

// Кнопки влево и вправо, так и не получились (╥_╥)

/*const img = galleryItems.map((item) => {
  content.src = `${item.original}`;
  content.alt = `${item.description}`;
  return content;
})

console.log(img);

function onArrowLeft(evt) {
  if (evt.code === 'ArrowLeft') {
    console.log('hi');
    img.forEach((item) => {
    
      if (evt.target.alt === item.description) {
        console.log(item.description.indexOf(evt.target.alt));
      }


  })
  }
}

const img = galleryItems.map((item) => {
  content.src = `${item.original}`;
  content.alt = `${item.description}`;
  return content;
})

console.log(img);
console.log(img.indexOf(content.src) - 1);
console.log(Number(img.length) - 1);
const ind = Number(img.indexOf(content.src));
console.log(ind);
const inEl = ind - 1;
console.log(inEl);
console.log(img[inEl] = img[Number(img.length) - 1]);

function onArrowLeft(evt) {
  if (evt.code === 'ArrowLeft') {
    console.log('hi');
    img[inEl] = img[Number(img.length) - 1]
  }
}*/

//==========================================

import galleryItems from './gallery-items.js';

const refs = {
  gallery: document.querySelector('.js-gallery'),
  modal: document.querySelector('.js-lightbox'),
  images: document.querySelector('.lightbox__image'),
  closeBtn: document.querySelector('button[data-action="close-lightbox"]'),
  backdrop: document.querySelector('.lightbox__overlay'),
}

refs.gallery.insertAdjacentHTML('beforeend', makeGalleryItems(galleryItems));

refs.gallery.addEventListener('click', onOpenModal);
refs.closeBtn.addEventListener('click', onCloseModal);
refs.backdrop.addEventListener('click', onBackdrop);


function makeGalleryItems(img) {
  return img.map(({ preview, original, description }) => {
    return `
    <li class="gallery__item">
      <a
        class="gallery__link"
        href="${original}"
      >
        <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
        />
      </a>
    </li>
    `;
  })
  .join('');
}


function onOpenModal(evt) {
  evt.preventDefault();
  if (!evt.target.classList.contains('gallery__image')) {
    return;
  }

  galleryItems.forEach((item) => {
    if (evt.target.alt === item.description) {
      refs.images.src = `${item.original}`;
      refs.images.alt = `${item.description}`;
    }

    refs.images.addEventListener('load', onImgLoaded, {once: true})
  })

  function onImgLoaded() {
    window.addEventListener('keydown', onEscKeyDown)
    refs.modal.classList.add('is-open');
  }
}


function onCloseModal() {
  window.removeEventListener('keydown', onEscKeyDown)
  refs.modal.classList.remove('is-open');
}


function onEscKeyDown(evt) {
  if (evt.code === 'Escape') {
    onCloseModal()
  }
}


function onBackdrop(evt) {
  if (evt.currentTarget === evt.target) {
    onCloseModal()
  }
}