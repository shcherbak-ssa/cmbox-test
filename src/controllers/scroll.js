'use strict';

/** imports */
import $ from '../tools/get-by-id';
import {scrollIntoView} from 'scroll-js';

/** constants */
const carousel = $('carousel');
const parallax = $('parallax');
const form = $('form');
const blocks = {carousel, parallax, form};
const nearBlocks = {
  carousel: {
    prev: false,
    next: 'parallax',
  }, 
  parallax: {
    prev: 'carousel',
    next: 'form',
  }, 
  form: {
    prev: 'parallax',
    next: false,
  }
};

/** data */
let currentBlock = 'carousel';
let lastPageYOffset = pageYOffset;

/** init */
setScrollEvent();

function setScrollEvent() {
  window.addEventListener('scroll', scrollHandler, {once: true});
}
function scrollHandler() {
  if (pageYOffset < lastPageYOffset) return scrollToTop();
  if (pageYOffset > lastPageYOffset) return scrollToBottom();
}
function scrollToTop() {
  const {prev} = getNearBlocks();
  if (prev) scroll(prev);
}
function scrollToBottom() {
  const {next} = getNearBlocks();
  if (next) scroll(next);
}
function getNearBlocks() {
  return nearBlocks[currentBlock];
}
function scroll(newBlock) {
  updateCurrentBlock(newBlock);

  const block = getCurrentBlock();
  scrollIntoView(block, document.body, {behavior: 'smooth'})
    .then(() => {
      updateLastPageYOffset();
      setScrollEvent();
      console.log('currentBlock', currentBlock);
      console.log('lastPageYOffset', lastPageYOffset);
    })
}
function updateCurrentBlock(newBlock) {
  currentBlock = newBlock;
}
function getCurrentBlock() {
  return blocks[currentBlock];
}
function updateLastPageYOffset() {
  lastPageYOffset = pageYOffset;
}