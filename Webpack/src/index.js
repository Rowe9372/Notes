import './css/index.css';
import './css/index.scss';

import imgSrc from './images/logo.png';

let oImg = new Image();

oImg.onload = function() {
	document.body.appendChild(oImg);
};
oImg.src = imgSrc;

document.write("Hellow world!");