/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/* Menu show */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/* Menu hidden */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () =>{
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== CHANGE BACKGROUND HEADER ===============*/
const scrollHeader = () =>{
    const header = document.getElementById('header')
    // Add a class if the bottom offset is greater than 50 of the viewport
    this.scrollY >= 50 ? header.classList.add('scroll-header') 
                       : header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*=============== TESTIMONIAL SWIPER ===============*/
let testimonialSwiper = new Swiper(".testimonial-swiper", {
    spaceBetween: 30,
    loop: 'true',

    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});

/*=============== NEW SWIPER ===============*/
let newSwiper = new Swiper(".new-swiper", {
    spaceBetween: 24,
    loop: 'true',

    breakpoints: {
        576: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
        1024: {
          slidesPerView: 4,
        },
    },
});

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')
    
const scrollActive = () =>{
  	const scrollDown = window.scrollY

	sections.forEach(current =>{
		const sectionHeight = current.offsetHeight,
			  sectionTop = current.offsetTop - 58,
			  sectionId = current.getAttribute('id'),
			  sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

		if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
			sectionsClass.classList.add('active-link')
		}else{
			sectionsClass.classList.remove('active-link')
		}                                                    
	})
}
window.addEventListener('scroll', scrollActive)

/*=============== SHOW SCROLL UP ===============*/ 
const scrollUp = () =>{
	const scrollUp = document.getElementById('scroll-up')
    // When the scroll is higher than 350 viewport height, add the show-scroll class to the a tag with the scrollup class
	this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
						: scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*=============== SHOW CART ===============*/
const cart = document.getElementById('cart'),
      cartShop = document.getElementById('cart-shop'),
      cartClose = document.getElementById('cart-close')

/*===== CART SHOW =====*/
/* Validate if constant exists */
if(cartShop){
    cartShop.addEventListener('click', () =>{
        cart.classList.add('show-cart')
    })
}

/*===== CART HIDDEN =====*/
/* Validate if constant exists */
if(cartClose){
    cartClose.addEventListener('click', () =>{
        cart.classList.remove('show-cart')
    })
}

// Get references to the cart container, cart buttons, and cart close button
const cartContainer = document.querySelector('.cart__container'); // Cart container
const addToCartButtons = document.querySelectorAll('.button'); // All "ADD TO CART" buttons
const cartCount = document.getElementById('cart-count'); // Cart count badge

let itemCount = 0; // Initialize the cart item count

// Open the cart when the cart icon is clicked
if (cartShop) {
    cartShop.addEventListener('click', () => {
        cart.classList.add('show-cart');
    });
}

// Close the cart when the close button is clicked
if (cartClose) {
    cartClose.addEventListener('click', () => {
        cart.classList.remove('show-cart');
    });
}

// Add event listeners to all "ADD TO CART" buttons
addToCartButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
        const user = JSON.parse(sessionStorage.getItem("loggedInUser"));
            if(!user)
            {
                alert("Please Login !!");
                return;
            }

        // const userEmail = JSON.parse(sessionStorage.getItem("loggedInUser"));      
        // console.log(cartItems);

        // Get the product details (image, title, and price)
        const productCard = event.target.closest('article'); // Get the closest product card
        const productImage = productCard.querySelector('img').src; // Product image
        const productTitle = productCard.querySelector('h3').textContent; // Product title
        const productPrice = productCard.querySelector('.featured__price') 
            ? productCard.querySelector('.featured__price').textContent // Featured price
            : document.querySelector('.home__price').textContent; // Home price (for the main product)

    // const cartItems = JSON.parse(localStorage.getItem(`cart_${userEmail.email}`))||{};

    // if(cartItems[productCard]){
    //     cartItems[productCard].quantity += 1;
    // }
    // else
    // {
    //     cartItems[productCard] = {
    //         productCard,
    //         productImage,
    //         productPrice,
    //         productTitle
    //     }
    // }
    //localStorage.setItem(`cart_${userEmail.email}`, JSON.stringify(cartItems));

        // Check if the product is already in the cart
        const existingCartItem = Array.from(cartContainer.children).find((item) => {
            return item.querySelector('.cart__title').textContent === productTitle;
        });

        if (existingCartItem) {
            // If the product is already in the cart, increase its quantity
            const quantityElement = existingCartItem.querySelector('.cart__quantity');
            quantityElement.textContent = parseInt(quantityElement.textContent) + 1;
        } else {
            // Create a new cart item element
            const cartItem = document.createElement('article');
            cartItem.classList.add('cart__card');
            cartItem.innerHTML = `
                <div class="cart__box">
                    <img src="${productImage}" alt="${productTitle}" class="cart__img">
                </div>
                <div class="cart__details">
                    <h3 class="cart__title">${productTitle}</h3>
                    <span class="cart__price">${productPrice}</span>
                    <div class="cart__amount">
                        <button class="cart__decrease">-</button>
                        <span class="cart__quantity">1</span>
                        <button class="cart__increase">+</button>
                    </div>
                </div>
                <button class="cart__remove">
                    <i class="bx bx-trash"></i>
                </button>
            `;

            // Append the new cart item to the cart container
            cartContainer.appendChild(cartItem);

            // Add functionality to increase or decrease the quantity
            const increaseButton = cartItem.querySelector('.cart__increase');
            const decreaseButton = cartItem.querySelector('.cart__decrease');
            const quantityElement = cartItem.querySelector('.cart__quantity');

            increaseButton.addEventListener('click', () => {
                quantityElement.textContent = parseInt(quantityElement.textContent) + 1;
                updateCartCount();
            });

            decreaseButton.addEventListener('click', () => {
                const currentQuantity = parseInt(quantityElement.textContent);
                if (currentQuantity > 1) {
                    quantityElement.textContent = currentQuantity - 1;
                    updateCartCount();
                }
            });

            // Add functionality to remove the item from the cart
            const removeButton = cartItem.querySelector('.cart__remove');
            removeButton.addEventListener('click', () => {
                cartItem.remove();
                updateCartCount();
            });
        }

        // Update the cart count
        updateCartCount();
    });
});

// Function to update the cart count badge
function updateCartCount() {
    const quantities = Array.from(cartContainer.querySelectorAll('.cart__quantity'));
    const totalItems = quantities.reduce((total, quantityElement) => {
        return total + parseInt(quantityElement.textContent);
    }, 0);

    cartCount.textContent = totalItems; // Update the count
    cartCount.style.visibility = totalItems > 0 ? 'visible' : 'hidden'; // Show or hide the badge
}
const slides = document.querySelectorAll('.slide');
let currentIndex = 0;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.style.display = i === index ? 'block' : 'none';
    });
}

document.querySelector('.next').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
});

document.querySelector('.prev').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
});

showSlide(currentIndex);

// Function to calculate and update the total price
function updateTotalPrice() {
    const cartItems = Array.from(cartContainer.querySelectorAll('.cart__card')); // Get all cart items
    let totalPrice = 0;

    cartItems.forEach(cartItem => {
        const priceElement = cartItem.querySelector('.cart__price'); // Get the price element
        const quantityElement = cartItem.querySelector('.cart__quantity'); // Get the quantity element

        const price = parseFloat(priceElement.textContent.replace('$', '')); // Remove $ and convert to a number
        const quantity = parseInt(quantityElement.textContent); // Get the quantity as a number

        totalPrice += price * quantity; // Add the product of price and quantity to the total
    });

    // Update the total price in the DOM
    const totalPriceElement = document.getElementById('cart-total-price');
    totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`; // Format to 2 decimal places
}

// Update the cart count and total price whenever the cart changes
function updateCartCount() {
    const quantities = Array.from(cartContainer.querySelectorAll('.cart__quantity'));
    const totalItems = quantities.reduce((total, quantityElement) => {
        return total + parseInt(quantityElement.textContent);
    }, 0);

    cartCount.textContent = totalItems; // Update the count
    cartCount.style.visibility = totalItems > 0 ? 'visible' : 'hidden'; // Show or hide the badge

    // Update the total price
    updateTotalPrice();
}



