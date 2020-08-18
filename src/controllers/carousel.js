'use strict';

/** imports */
import $ from '../tools/get-by-id';

/** constants */
const IS_ACTIVE_CLASS = 'is-active';
const TIMER_DELAY = 4000;

const carousel = $('carousel');
const slides = carousel.querySelectorAll('.slide');
const slidesItems = carousel.querySelectorAll('.slides .slides-item');
const slidePrevButton = $('slide-prev');
const slideNextButton = $('slide-next');

/** data */
let activeSlideId = 1;
let timerId = null;

/** init */
updateCarousel();
setSlidesItemsEvents();
setSlideButtonEvents();
setTimer();

/** change slide */
function changeSlide(slideId) {
  updateActiveSlideId(slideId);
  updateCarousel();
  updateTimer();
}
function updateActiveSlideId(slideId) {
  activeSlideId = slideId;
}
function updateCarousel() {
  slides.forEach(updateSlide);
  slidesItems.forEach(updateSlide);
}
function updateSlide(item) {
  const itemClassList = item.classList;
  const slideId = item.dataset.slideId;
  updateActiveClass(slideId, itemClassList)
}
function updateActiveClass(slideId, classList) {
  +slideId === activeSlideId
    ? classList.add(IS_ACTIVE_CLASS)
    : classList.remove(IS_ACTIVE_CLASS);
}

/** events */
function setSlidesItemsEvents() {
  slidesItems.forEach(setSlidesItemClickEvent);
}
function setSlidesItemClickEvent(item) {
  item.addEventListener('click', slidesItemClickHandler);
}
function slidesItemClickHandler({target}) {
  const slideId = +target.dataset.slideId;
  changeSlide(slideId)
}
function setSlideButtonEvents() {
  setSlidePrevClickEvent();
  setSlideNextClickEvent();
}
function setSlidePrevClickEvent() {
  slidePrevButton.addEventListener('click', slidePrevButtonClickHandler);
}
function setSlideNextClickEvent() {
  slideNextButton.addEventListener('click', slideNextButtonClickHandler);
}
function slidePrevButtonClickHandler() {
  const slideId = activeSlideId === 1 ? 4 : activeSlideId - 1;
  changeSlide(slideId)
}
function slideNextButtonClickHandler() {
  const slideId = activeSlideId === 4 ? 1 : activeSlideId + 1;
  changeSlide(slideId)
}

/** timer */
function setTimer() {
  timerId = setInterval(slideNextButtonClickHandler, TIMER_DELAY);
}
function updateTimer() {
  clearInterval(timerId);
  setTimer();
}