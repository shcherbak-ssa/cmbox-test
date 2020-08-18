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
  const {top, left, width: size} = item.getBoundingClientRect();
  const itemTopCenterPosition = getTopCenterPosition(top, size);
  const itemLeftCenterPosition = getLeftCenterPosition(left, size);
  return {itemTopCenterPosition, itemLeftCenterPosition}
}
function getTopCenterPosition(top, size) {
  return top + getHalfSize(size);
}
function getLeftCenterPosition(left, size) {
  return left + getHalfSize(size);
}
function getHalfSize(size) {
  return size/2;
}