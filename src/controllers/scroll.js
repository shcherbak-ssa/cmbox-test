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
let scrollIsActive = false;

/** init */
window.addEventListener('scroll', scrollHandler);

/** functions */
function scrollHandler() {
  if (scrollIsActive) return;
  if (pageYOffset < lastPageYOffset) return scrollToTop();
  if (pageYOffset > lastPageYOffset) return scrollToBottom();
}
function scrollToTop() {
  scrollIsActive = true;
  const {prev} = getNearBlocks();
  if (prev) scroll(prev);
}
function scrollToBottom() {
  scrollIsActive = true;
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
      scrollIsActive = false;
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