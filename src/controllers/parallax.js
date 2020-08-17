'use strict';

/** imports */
import $ from '../tools/get-by-id';

/** constants */
const parallaxMoveSpeed = 20;
const parallax = $('parallax');
const parallaxItems = parallax.querySelectorAll('.parallax-item');
const parallaxItemsCenterPosition = setParallaxItemsCenterPosition();

/** init */
parallax.addEventListener('mousemove', mousemoveHandler);

/** mousemove hanlder */
function mousemoveHandler({clientX: cursorLeftPosition, clientY: cursorTopPosition}) {
  parallaxItems.forEach((item, index) => {
    const {itemTopCenterPosition, itemLeftCenterPosition} = parallaxItemsCenterPosition[index];
    const itemTopMovePosition = getTopMovePosition(itemTopCenterPosition, cursorTopPosition);
    const itemLeftMovePosition = getLeftMovePosition(itemLeftCenterPosition, cursorLeftPosition);
    moveParallaxItem(item, itemTopMovePosition, itemLeftMovePosition);
  }); 
}
function getTopMovePosition(itemTopCenterPosition, cursorTopPosition) {
  return getMovePosition(itemTopCenterPosition, cursorTopPosition)
}
function getLeftMovePosition(itemLeftCenterPosition, cursorLeftPosition) {
  return getMovePosition(itemLeftCenterPosition, cursorLeftPosition)
}
function getMovePosition(itemPosition, curcorPosition) {
  return (curcorPosition - itemPosition) / parallaxMoveSpeed;
}
function moveParallaxItem(item, top, left) {
  item.style.transform = `translate(${left}px, ${top}px)`;
}

/** center position */
function setParallaxItemsCenterPosition() {
  return [].map.call(parallaxItems, getParallaxItemCenterPosition);
}
function getParallaxItemCenterPosition(item) {
  const {top, left, width, height} = item.getBoundingClientRect();
  const itemTopCenterPosition = getTopCenterPosition(top, height);
  const itemLeftCenterPosition = getLeftCenterPosition(left, width);
  return {itemTopCenterPosition, itemLeftCenterPosition}
}
function getTopCenterPosition(top, height) {
  return top + getHalfSize(height);
}
function getLeftCenterPosition(left, width) {
  return left + getHalfSize(width);
}
function getHalfSize(size) {
  return size/2;
}