// BURGER MENU --> start
const burgerButton = document.querySelector('.burger-button');
const burgerMenu = document.querySelector('.burger-menu');
const menuItem = document.querySelector('.menu-item');
let allTegA = document.querySelectorAll('a');

function openBurger() {
    burgerMenu.classList.add('active');
    menuItem.classList.add('active');
    burgerButton.classList.add('active');
    document.body.classList.add('lock');
    burgerMenu.style.display = 'block';
    menuItem.style.display = 'flex';
}

function closeBurger() {
    burgerMenu.classList.remove('active');
    menuItem.classList.remove('active');
    burgerButton.classList.remove('active');
    document.body.classList.remove('lock');
}

let burgerCondition = false;

burgerButton.addEventListener('click', function () {
    if (burgerCondition === false) {
        openBurger();
        burgerCondition = true;
    } else {
        closeBurger();
        burgerCondition = false;
    }
});

allTegA = [...allTegA];
allTegA.map((item) =>
    item.addEventListener('click', function () {
        closeBurger();
        burgerCondition = false;
    })
);
// BURGER MENU <-- end

// CAROUSEL --> start
const sliderBox = document.querySelectorAll('.slider-box');
const sliderContainer = document.querySelector('.slider-container');
let intervalTimer;
let isPause = false;
let currentPosition = 100;
let setTime = 5000;

const controls = document.querySelector('.controls');
const item1 = document.getElementById('item-1');
const item2 = document.getElementById('item-2');
const item3 = document.getElementById('item-3');

function run(isPause) {
    if (!isPause) {
        intervalTimer = setInterval(() => {
            loop(currentPosition);
        }, setTime);
    } else {
        clearInterval(intervalTimer);
    }
}
run();

function loop(position) {
    pause();
    setTime = 5000;
    resume();

    let size = sliderContainer.clientWidth;
    if (size >= 480) {
        if (position < 1460) {
            position += 680;
        } else {
            position = 100;
        }
    } else {
        if (position < 1200) {
            position += 550;
        } else {
            position = 100;
        }
    }

    sliderBox.forEach((item) => {
        item.style.transform = `translateX(-${position}px)`;
    });

    if (position < 550) {
        filling(item1);
    } else if (position > 1199) {
        filling(item3);
    } else {
        filling(item2);
    }

    return (currentPosition = position);
}
loop();

function pause() {
    run((isPause = true));
}

function resume() {
    run((isPause = false));
}

sliderContainer.addEventListener('mouseenter', function () {
    pause();
});

sliderContainer.addEventListener('mouseleave', function () {
    resume();
});

function filling(item) {
    let count = 0;
    const length = 40;
    let unit = length / (setTime / 4.4);

    let time = setTime;

    const span = document.createElement('span');
    item.appendChild(span);
    span.classList.add('filling');

    const interval = setInterval(() => {
        if (!isPause) {
            time -= 4;
            count += unit;
            span.style.width = `${count}px`;
        }

        if (count >= length + 1) {
            clearInterval(interval);
            if (item.contains(span)) {
                item.removeChild(span);
            }
        }
        if (isPause) {
            return (setTime = time);
        }
    }, 1);
}

function reset(setItem, position) {
    let myArr = controls.children;

    for (let i = 0; i < myArr.length; i++) {
        if (myArr[i].firstChild) {
            myArr[i].removeChild(myArr[i].firstChild);
        }
    }

    sliderBox.forEach((item) => {
        item.style.transform = `translateX(-${position}px)`;
        currentPosition = position;
    });
    pause();
    filling(setItem);
    resume();
}

window.addEventListener('resize', () => {
    reset(item1, 100);
});

const btnLeft = document.getElementById('btn-left');
const btnRight = document.getElementById('btn-right');

btnLeft.addEventListener('click', () => {
    setTime = 5000;
    let size = sliderContainer.clientWidth;
    if (size >= 480) {
        if (currentPosition === 100) {
            reset(item3, 1460);
        } else if (currentPosition === 780) {
            reset(item1, 100);
        } else if (currentPosition === 1460) {
            reset(item2, 780);
        }
    } else { //this size for touch move
        if (currentPosition === 100) {
            reset(item3, 1200);
        } else if (currentPosition === 650) {
            reset(item1, 100);
        } else if (currentPosition === 1200) {
            reset(item2, 650);
        }
    }
});

btnRight.addEventListener('click', () => {
    setTime = 5000;
    let size = sliderContainer.clientWidth;
    if (size >= 480) {
        if (currentPosition === 100) {
            reset(item2, 780);
        } else if (currentPosition === 780) {
            reset(item3, 1460);
        } else if (currentPosition === 1460) {
            reset(item1, 100);
        }
    } else { //this size for touch move
        if (currentPosition === 100) {
            reset(item2, 650);
        } else if (currentPosition === 650) {
            reset(item3, 1200);
        } else if (currentPosition === 1200) {
            reset(item1, 100);
        }
    }
});

// CAROUSEL <-- end

console.log(
    `
1. Implementation of the burger menu on both pages: +22 ✅
- At a page width of 768px or less, the navigation panel hides, and the burger icon appears: +2 ✅
- When clicking the burger icon, the burger menu slides out from the right, and the burger icon smoothly transforms into a cross: +4 ✅
- The burger menu occupies the entire available screen area below the <header> block: +2 ✅
- When clicking the cross, the burger menu smoothly hides, moving to the right of the screen, and the cross smoothly transforms into a burger icon: +4 ✅
- The burger icon is created using HTML and CSS without the use of images: +2 ✅
- Links in the burger menu work, providing smooth scrolling to anchor points: +2 ✅
- When clicking on any link (interactive or non-interactive) in the menu, the burger menu smoothly hides to the right, and the cross smoothly transforms into a burger icon: +2 ✅
- The placement and dimensions of elements in the burger menu match the layout (horizontal centering of menu items): +2 ✅
- When the page width increases to 769px or higher, the burger icon and the open burger menu hide, and the navigation panel appears: +2 ✅

2. Implementation of the carousel on the home page: +24 ✅/❌
- Carousel elements are automatically scroll to the left with a specified time interval by default. The time interval duration is at the student's choose, but the recommended value is 5-7 seconds: +4 ✅
- The current state until the next automatic switch is shown in the progress bar of the corresponding slide by filling it with color: +4 ✅
- Only the progress bar of the current slide can be filled; the rest remain in their default state: +2 ✅
- When hovering the mouse or touch-and-hold on the displayed carousel element, the time to the element switch is paused. When the mouse cursor moves out, or the hold ends, the time continues from where it stopped: +2 ✅/❌
- The switch slides is accompanied by like the carousel animation (the method of animation execution is not verified): +4 ✅
- Manual switching in the corresponding direction is implemented by pressing left arrow button or right arrow button: +2 ✅
- For mobile devices, manual switching in the corresponding direction is additionally implemented by swiping left or right: +2 ❌
- When manually switching, the progress bar state of the switched slide resets, and the progress bar of the displayed slide starts to fill: +2 ✅
- When switching to the right after the third element, it returns to the first. When switching to the left after the first element, it returns to the third: +2 ✅

3. Categories of products on the menu page: +16 ✅
- The Coffee category is active and the corresponding products are displayed when opening or reloading the menu page: +2 ✅
- When switching categories, the products of the selected category are displayed: +2 ✅
- For screens with a width of 768px or less, when opening/reloading the page or switching categories, only 4 products are displayed. If there are more than 4 products in the displayed category, a Load More button is displayed below: +4 ✅
- When clicking the Load More button below the displayed products, the missing products are added, and the Load More button is hidden: +4 ✅
- When changing the screen width, the product display mode (8 products per page or 4 products with a Load More button) changes without page reloading: +4 ✅

4. The Modal on the menu page: +20 ✅/❌
- The Modal with the description of a specific product opens when clicking on any part of a card of product: +2 ✅
- The part of the page outside the Modal is darkened: +2 ✅
- When the Modal is open, the vertical scroll of the page becomes inactive; when closed, it becomes active again: +2 ✅
- Clicking on the area around the Modal and Close button closes it: +2 ✅
- The Modal is centered on both axes, sizes of modal elements and their layout match the design: +2 ✅
- After the Modal is opened, the 'Size' option 'S' is selected, and no option in the 'Additives' section is selected. The product's final price is the same as in the card: +2 ✅
- Only one 'Size' option can be selected. Changing this option also changes the final price of the product based on the choice (+$0.00 for S, +$0.50 for M, +$1.00 for L): +4 ✅
- Multiple 'Additives' options can be selected, and each selected option increases the final price of the product by $0.50: +4 ✅❌

5. Video on the home page: +8 ✅
- In the Enjoy block of the home page, a video is played in the background instead of an image, without sound and control elements, and without the ability to interact with it: +4 ✅
- After the video is finished, it automatically starts over: +4 ✅
    `
);