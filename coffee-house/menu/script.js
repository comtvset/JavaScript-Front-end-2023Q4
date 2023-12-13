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

// PRODUCTS --> start
let item = document.querySelectorAll('.item');
let hidden = document.querySelectorAll('.hidden');
const html = document.querySelector('html');
const offers = document.querySelector('.offers');
let productsList;
let createCounter = 0;

async function afterRequest() {
    const response = await fetch('./products.json');
    const products = await response.json();
    productsList = products;
    setCards();
    getItem();
}

function setCards() {
    productsList;
}

const btnRefresh = document.createElement('div');
const svg = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="refresh">
                    <path
                        d="M21.8883 13.5C21.1645 18.3113 17.013 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C16.1006 2 19.6248 4.46819 21.1679 8"
                        stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round" />
                    <path id="Ellipse_2" d="M17 8H21.4C21.7314 8 22 7.73137 22 7.4V3" stroke="#403F3D"
                        stroke-linecap="round" stroke-linejoin="round" />
                </g>
            </svg>`;

function actalWidth() {
    let size = html.clientWidth;

    if (size > 1072) {
        hidden = document.querySelectorAll('.hidden');
        btnRefresh.style.display = 'none';
        hidden.forEach((item) => item.classList.add('hide'));
    }
    if (size <= 1072) {
        hidden = document.querySelectorAll('.hidden');
        btnRefresh.style.display = 'flex';
        hidden.forEach((item) => item.classList.add('hide'));
    }
}

window.addEventListener('resize', actalWidth);

function btnCreateRefresh() {
    offers.appendChild(btnRefresh);
    btnRefresh.classList.add('btn-refresh');
    btnRefresh.innerHTML = svg;
}

const btnChoice = document.querySelectorAll('.btn-choice');

btnChoice.forEach((item) => {
    let segment = item.outerText.toLowerCase();
    item.addEventListener('click', function () {
        btnChoice.forEach((item) => {
            item.classList.remove('pressed');
        });

        while (offers.firstChild) {
            offers.removeChild(offers.firstChild);
        }

        item.classList.add('pressed');
        createMenu(segment);
        afterRequest();
    });
});

function createMenu(segment = 'coffee') {
    let count = 1;

    for (let i = 0; i < productsList.length; i++) {
        if (productsList[i].category.includes(segment)) {
            createCard(
                productsList[i].category,
                [count++],
                productsList[i].name,
                productsList[i].description,
                productsList[i].price,
            );
            createCounter++;
        }
    }

    if (count > 5) {
        btnCreateRefresh();
        actalWidth();
    }
    createCounter = 0;
}
setTimeout(() => {
    afterRequest();
    createMenu();
}, 500);
afterRequest();

function createCard(category, ordinal, name, description, price) {
    const divItem = document.createElement('div');
    offers.appendChild(divItem);
    divItem.classList.add('item');

    if (createCounter > 3) {
        divItem.classList.add('hidden');
        divItem.classList.add('hide');
    }

    const divImgItem = document.createElement('div');
    divItem.appendChild(divImgItem);
    divImgItem.classList.add('img-item');
    const IMG = document.createElement('img');
    divImgItem.appendChild(IMG);
    IMG.classList.add('img-settings');
    IMG.setAttribute('src', `../assets/images/${category}-${ordinal}.png`);

    const divDiscription = document.createElement('div');
    divItem.appendChild(divDiscription);
    divDiscription.classList.add('discription');

    const div = document.createElement('div');
    divDiscription.appendChild(div);

    const spanItemName = document.createElement('span');
    div.appendChild(spanItemName);
    spanItemName.classList.add('item-name');
    spanItemName.innerHTML = name;

    const spanItemInfo = document.createElement('span');
    div.appendChild(spanItemInfo);
    spanItemInfo.classList.add('item-info');
    spanItemInfo.innerHTML = description;

    const spanItemPrice = document.createElement('span');
    divDiscription.appendChild(spanItemPrice);
    spanItemPrice.classList.add('item-price');
    spanItemPrice.innerHTML = `$${price}`;



    const modalSizeChoice = document.querySelectorAll('.modal-size-choice');
    const modalAdditivesChoice = document.querySelectorAll(
        '.modal-additives-choice'
    );

    if(category === 'coffee') {
        let sizes = Object.entries(productsList[0].sizes);
        let additives = Object.entries(productsList[0].additives);

        modalSizeChoice.forEach((item, index) => {
            let size = sizes[index][1].size;
            item.childNodes[1].textContent = size;
        });
        modalAdditivesChoice.forEach((item, index) => {
            let additive = additives[index][1].name;
            item.childNodes[1].textContent = additive;
        });
    }
    if(category === 'tea') {
        let sizes = Object.entries(productsList[9].sizes);
        let additives = Object.entries(productsList[9].additives);

        modalSizeChoice.forEach((item, index) => {
            let size = sizes[index][1].size;
            item.childNodes[1].textContent = size;
        });
        modalAdditivesChoice.forEach((item, index) => {
            let additive = additives[index][1].name;
            item.childNodes[1].textContent = additive;
        });

    }
    if(category === 'dessert') {
        let sizes = Object.entries(productsList[19].sizes);
        let additives = Object.entries(productsList[19].additives);

        modalSizeChoice.forEach((item, index) => {
            let size = sizes[index][1].size;
            item.childNodes[1].textContent = size;
        });
        modalAdditivesChoice.forEach((item, index) => {
            let additive = additives[index][1].name;
            item.childNodes[1].textContent = additive;
        });
    }
}

btnRefresh.addEventListener('click', function () {
    item = document.querySelectorAll('.item');
    btnRefresh.style.display = 'none';
    item.forEach((item) => item.classList.remove('hide'));
});

// PRODUCTS <-- end

// MODAL --> start
const body = document.querySelector('body');
const modalName = document.querySelector('.item-name');
const modalInfo = document.querySelector('.item-info');
const modalPrice = document.getElementById('modal-price');
const overlay = document.querySelector('.overlay');
let modalImg = document.querySelector('.img-settings');
let actualPrice;
let priceArray = [];
let countI = 0;

function getItem() {
    item = document.querySelectorAll('.item');
    item.forEach((item) => {
        item.addEventListener('click', () => {
            openModal();

            modalName.innerHTML =
                item.childNodes[1].childNodes[0].childNodes[0].innerHTML;
            modalInfo.innerHTML =
                item.childNodes[1].childNodes[0].childNodes[1].innerHTML;
            modalPrice.innerHTML = item.childNodes[1].childNodes[1].innerHTML;
            modalImg.src = item.childNodes[0].childNodes[0].src;

            actualPrice = modalPrice.innerHTML.slice(1);
            priceArray.push('S');
            priceArray.push(actualPrice);
        });
    });
}

const modal = document.querySelector('.modal');

function openModal() {
    modal.classList.add('active-modal');
    modal.classList.add('modal-visible');
    document.body.classList.add('lock');

    // const modalSizeChoice = document.querySelectorAll('.modal-size-choice');
    // modalSizeChoice.forEach((item) => {
    //     console.dir(item.childNodes[1].textContent = '400 ml')
    // });

    // // console.log(productsList[i].sizes)
    // console.log(productsList[0].sizes)
}

const modalButton = document.querySelector('.modal-button');

modalButton.addEventListener('click', () => {
    modal.classList.remove('active-modal');
    modal.classList.remove('modal-visible');
    document.body.classList.remove('lock');

    priceArray = [];
    countI = 0;
    removePressed();

    const modalAdditivesChoice = document.querySelectorAll(
        '.modal-additives-choice'
    );
    modalAdditivesChoice.forEach((item) => {
        item.classList.remove('pressed');
    });
});

overlay.addEventListener('click', () => {
    modal.classList.remove('active-modal');
    modal.classList.remove('modal-visible');
    document.body.classList.remove('lock');

    priceArray = [];
    countI = 0;
    removePressed();
});

const modalSizeChoice = document.querySelectorAll('.modal-size-choice');
const modalAdditivesChoice = document.querySelectorAll(
    '.modal-additives-choice'
);

function check() {
    let countCheck = 0;
    modalAdditivesChoice.forEach((item) => {
        if (item.classList.contains('pressed')) {
            countCheck = countCheck + 0.5;
        }
    });
    return countCheck;
}

function removePressed() {
    modalSizeChoice.forEach((item) => {
        if (countI === 0) {
            item.classList.add('pressed');
        } else {
            item.classList.remove('pressed');
        }

        countI++;
    })

}

modalSizeChoice.forEach((item) => {
    item.addEventListener('click', function () {

        modalSizeChoice.forEach((item) => {
            item.classList.remove('pressed');
        });
        item.classList.add('pressed');
        let size = item.childNodes[0].innerText;

        if (size === 'S') {
            let result = check();
            let price = 0;

            if (result !== 0) {
                price += result;
            }

            let newPrice = +actualPrice + price;
            priceArray.pop();
            priceArray.pop();
            priceArray.push('S');
            priceArray.push(newPrice);
            modalPrice.innerHTML = `$${newPrice.toFixed(2)}`;
        }

        if (size === 'M') {
            let result = check();
            let price = 0.5;

            if (result !== 0) {
                price += result;
            }

            let newPrice = +actualPrice + price;
            priceArray.pop();
            priceArray.pop();
            priceArray.push('M');
            priceArray.push(newPrice);
            modalPrice.innerHTML = `$${newPrice.toFixed(2)}`;
        }

        if (size === 'L') {
            let result = check();
            let price = 1;

            if (result !== 0) {
                price += result;
            }

            let newPrice = +actualPrice + price;
            priceArray.pop();
            priceArray.pop();
            priceArray.push('L');
            priceArray.push(newPrice);
            modalPrice.innerHTML = `$${newPrice.toFixed(2)}`;
        }
    });
});

modalAdditivesChoice.forEach((item) => {
    item.addEventListener('click', function () {
        if (!item.classList.contains('pressed')) {
            item.classList.add('pressed');
            let newPrice = +priceArray[1] + 0.5;
            priceArray.pop();
            priceArray.push(newPrice);
            modalPrice.innerHTML = `$${newPrice.toFixed(2)}`;
        } else {
            item.classList.remove('pressed');
            let newPrice = +priceArray[1] - 0.5;
            priceArray.pop();
            priceArray.push(newPrice);
            modalPrice.innerHTML = `$${newPrice.toFixed(2)}`;
        }
    });
});

// MODAL <-- end

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

2. Implementation of the carousel on the home page: +24 ✅
- Carousel elements are automatically scroll to the left with a specified time interval by default. The time interval duration is at the student's choose, but the recommended value is 5-7 seconds: +4 ✅
- The current state until the next automatic switch is shown in the progress bar of the corresponding slide by filling it with color: +4 ✅
- Only the progress bar of the current slide can be filled; the rest remain in their default state: +2 ✅
- When hovering the mouse or touch-and-hold on the displayed carousel element, the time to the element switch is paused. When the mouse cursor moves out, or the hold ends, the time continues from where it stopped: +2 ✅
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

4. The Modal on the menu page: +20 ✅
- The Modal with the description of a specific product opens when clicking on any part of a card of product: +2 ✅
- The part of the page outside the Modal is darkened: +2 ✅
- When the Modal is open, the vertical scroll of the page becomes inactive; when closed, it becomes active again: +2 ✅
- Clicking on the area around the Modal and Close button closes it: +2 ✅
- The Modal is centered on both axes, sizes of modal elements and their layout match the design: +2 ✅
- After the Modal is opened, the 'Size' option 'S' is selected, and no option in the 'Additives' section is selected. The product's final price is the same as in the card: +2 ✅
- Only one 'Size' option can be selected. Changing this option also changes the final price of the product based on the choice (+$0.00 for S, +$0.50 for M, +$1.00 for L): +4 ✅
- Multiple 'Additives' options can be selected, and each selected option increases the final price of the product by $0.50: +4 ✅

5. Video on the home page: +8 ✅
- In the Enjoy block of the home page, a video is played in the background instead of an image, without sound and control elements, and without the ability to interact with it: +4 ✅
- After the video is finished, it automatically starts over: +4 ✅
    `
);
