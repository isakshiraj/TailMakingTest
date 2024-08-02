const startBtn = document.querySelector('.start-button');

const popupInfo = document.querySelector('.popupTutorial');

const exitBtn = document.querySelector('.exit-button');

const main = document.querySelector('.main');



startBtn.onclick = () => {
    popupInfo.classList.add('active');
    main.classList.add('active');
}

exitBtn.onclick = () => {
    popupInfo.classList.remove('active');
    main.classList.remove('active');
}


