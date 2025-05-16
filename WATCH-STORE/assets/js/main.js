/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close')

/* Menu show */
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu')
    })
}

/* Menu hidden */
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu')
    })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () => {
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== CHANGE BACKGROUND HEADER ===============*/
const scrollHeader = () => {
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

const scrollActive = () => {
    const scrollDown = window.scrollY

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
            sectionTop = current.offsetTop - 58,
            sectionId = current.getAttribute('id'),
            sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

        if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
            sectionsClass.classList.add('active-link')
        } else {
            sectionsClass.classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*=============== SHOW SCROLL UP ===============*/
const scrollUp = () => {
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

// Fetch data from watchdata.json and dynamically populate the Featured section for Men

fetch('assets/watchdata.json')
    .then(response => response.json())
    .then(data => {
        const featuredContainer = document.getElementById('featured-container');
        let featuredHTML = '';

        // Loop through the data and generate HTML for Featured products where category = "Men"
        data.forEach(product => {
            if (product.category === 'Men') {
                featuredHTML += `
                    <article class="products__card">
                        <div class="products__box">
                            <img src="${product.image}" alt="${product.title}" class="products__img">
                        </div>
                        <h3 class="products__title">${product.title}</h3>
                        <span class="products__price">$${product.price}</span>
                        <button class="products__button" data-id="${product.id}">
                            <i class='bx bx-shopping-bag'></i>
                        </button>
                    </article>
                `;
            }
        });

        // Inject the generated HTML into the Featured container
        featuredContainer.innerHTML = featuredHTML;
    })
    .catch(error => console.error('Error fetching watch data:', error));

// Fetch data from watchdata.json and dynamically populate the Featured section for Men
fetch('assets/watchdata.json')
    .then(response => response.json())
    .then(data => {
        const featuredContainer = document.getElementById('products-container');
        let featuredHTML = '';

        // Loop through the data and generate HTML for Featured products where category = "Men"
        data.forEach(product => {
            if (product.category === 'Women') {
                featuredHTML += `
                <article class="products__card">
                    <div class="products__box">
                        <img src="${product.image}" alt="${product.title}" class="products__img">
                    </div>
                    <h3 class="products__title">${product.title}</h3>
                    <span class="products__price">$${product.price}</span>
                    <button class="products__button" data-id="${product.id}">
                        <i class='bx bx-shopping-bag'></i>
                    </button>
                    
                </article>
            `;
            }
        });

        // Inject the generated HTML into the Featured container
        featuredContainer.innerHTML = featuredHTML;
    })
    .catch(error => console.error('Error fetching watch data:', error));
    // document.addEventListener('DOMContentLoaded',()=>{
    //     up
    // })
document.addEventListener('DOMContentLoaded', () => {

    const cartContainer = document.querySelector('.cart__container'); // Cart content container
    const cartCount = document.getElementById('cart-count'); // Cart item count
    const cartTotalPrice = document.getElementById('cart-total-price'); // Total price in the cart
    const cartShop = document.getElementById('cart-shop'); // Cart button to open the cart
    const cart = document.getElementById('cart'); // Cart modal
    const cartClose = document.getElementById('cart-close'); // Close button for the cart

   updateCart();

    // Fetch data from watchdata.json
    fetch('assets/watchdata.json')
        .then(response => response.json())
        .then(data => {
            // Add event listeners to "Add to Cart" buttons
            document.querySelectorAll('.products__button').forEach(button => {

                button.addEventListener('click', () => {
                    const user = JSON.parse(sessionStorage.getItem("loggedInUser"));

                    if (!user) {
                        alert("Please log in to add items to your cart.");
                        return;
                    }
                    const productId = parseInt(button.dataset.id); // Get product ID
                    const product = data.find(item => item.id === productId); // Find product in JSON data

                    // Add product to cartArray or update quantity
                    const cart = JSON.parse(localStorage.getItem(`cart_${user.email}`)) || []
                    const existingProductInd =cart.findIndex(c=>c.id==productId)
                    if (existingProductInd>=0) {
                        // if (existingProduct.quantity < product.rating.count) {
                        //     existingProduct.quantity++;
                        // } else {
                        //     alert(`Only ${product.rating.count} items available in stock.`);
                        //     return;
                        // }
                        cart[existingProductInd].quantity+=1
                        localStorage.setItem(`cart_${user.email}`, JSON.stringify(cart))
                    } else {
                        cart.push({id : productId, image:product.image, price:product.price, title:product.title,  quantity: 1, count:product.rating.count,
    rating: product.rating })
                        localStorage.setItem(`cart_${user.email}`,JSON.stringify(cart))
                    }

                    updateCart(); // Update the cart UI
                });
            });
        })
        .catch(error => console.error('Error fetching product data:', error));

    // Update Cart UI
    function updateCart() {
        let user = JSON.parse(sessionStorage.getItem("loggedInUser"));
        if(!user){
            return
        }
        let cart = JSON.parse(localStorage.getItem(`cart_${user.email}`)) || []
        cartContainer.innerHTML = ''; // Clear the cart container
        let totalItems = 0;
        let totalPrice = 0;

        cart.forEach(item => {
            totalItems += item.quantity;
            totalPrice += item.price * item.quantity;

            // Add cart item to the cart container
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart__card');
            cartItem.innerHTML = `
                    <div class="cart__box">
                        <img src="${item.image}" alt="${item.title}" class="cart__img">
                        <div class="cart__details">
                            <h3 class="cart__title">${item.title}</h3>
                            <span class="cart__price">$${item.price}</span>
                            <div class="cart__amount">
                                <button class="cart__amount-box decrease" data-id="${item.id}">-</button>
                                <span>${item.quantity}</span>
                                <button class="cart__amount-box increase" data-id="${item.id}">+</button>
                            </div>
                        </div>
                    </div>
                    <span class="cart__item-total">$${(item.price * item.quantity).toFixed(2)}</span>
                    <i class="bx bx-trash cart__amount-trash" data-id="${item.id}"></i>
                `;
            cartContainer.appendChild(cartItem);
        });

        // Update cart count and total price
        cartCount.textContent = totalItems;
        cartTotalPrice.textContent = `$${totalPrice.toFixed(2)}`;

        // Add event listeners for quantity buttons and delete buttons
        document.querySelectorAll('.cart__amount-box').forEach(button => {
            button.addEventListener('click', () => {

                const productId = parseInt(button.dataset.id);
                const product = cart.find(item => item.id === productId);

                if (button.classList.contains('decrease')) {
                    product.quantity--;
                    if (product.quantity === 0) {
                        cart = cart.filter(item => item.id !== productId); // Remove item if quantity is 0
                    }
                } else if (button.classList.contains('increase')) {
                    if (product.quantity < product["rating"].count) {
                        product.quantity++;
                    } else {
                        alert(`Only ${product.rating.count} items available in stock.`);
                    }
                }
                localStorage.setItem(`cart_${user.email}`, JSON.stringify(cart)); //  Update localStorage
                updateCart(); // Update the cart UI
            });
        });

        document.querySelectorAll('.cart__amount-trash').forEach(button => {
            button.addEventListener('click', () => {
                const prodId = parseInt(button.dataset.id);
                cart = cart.filter(item => item.id !== prodId); // Remove item from cart
                localStorage.setItem(`cart_${user.email}`, JSON.stringify(cart)); //  Update localStorage
                updateCart(); // Refresh cart UI
            });
        });

    }

    // Show and Hide Cart
    cartShop.addEventListener('click', () => cart.classList.add('show-cart'));
    cartClose.addEventListener('click', () => cart.classList.remove('show-cart'));
});


