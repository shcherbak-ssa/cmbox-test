'use strict';

/** imports */
import $ from './tools/get-by-id';
import {
  setBodyOverflowToEmpty,
  setBodyOverflowToHidden,
} from './tools/body-overflow';

// controllers
import './controllers/scroll';
import './controllers/carousel';
import './controllers/parallax';
import './controllers/form';

// assets
import './styles/main.scss';
import './assets/fonts';
import './assets/images';

/** init */
setBodyOverflowToHidden();

window.onload = () => {
  const root = $('root');
  const loader = $('loader');
  root.classList.add('is-active');
  loader.classList.add('is-hide');
  setBodyOverflowToEmpty();
  setTimeout(() => {
    loader.remove();
  }, 1000);
}