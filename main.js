let cartBtn = document.querySelector('.cart-button');
let added = document.querySelector('.added-done');
let cartDrwaer = document.querySelector('.cart-drawer');
let overlay = document.querySelector('.overlay');
let cartProducts = document.querySelector('.cart-products');
let totalPrice = document.querySelector('.foot .total-price span');
let sendCart = document.querySelector('.foot a');
let closeCart = document.querySelector('.close-cart');

let cart = new Map();

document.addEventListener('DOMContentLoaded', () => {
    const latestProducts = document.querySelector('.latest-products .products');
    const allProducts = document.querySelector('.all-products .products');
    
    let myRequest = new XMLHttpRequest();
    
    myRequest.onreadystatechange = () => {
        if (myRequest.readyState === 4 && myRequest.status === 200) {
        let objRequest = JSON.parse(myRequest.responseText);
        
        if (latestProducts) {
            for (let i = 0; i < 4; i++) {
                addItemTo(objRequest[i], latestProducts);
            }
        }
        
        if (allProducts) {
            for (let i = 0; i < objRequest.length; i++) {
                addItemTo(objRequest[i], allProducts);
            }
        }
        
        if (localStorage.esmilecart) {
            let array = localStorage.esmilecart.split('|');
            for (let i = 0; i < array.length; i++) {
                array[i] = array[i].split(',');
                array[i][0] = Number(array[i][0]);
                array[i][1] = Number(array[i][1]);
                cart.set(array[i][0], {product: objRequest[array[i][0]-1], qty: array[i][1]})
            }
        }
    }
};

myRequest.open("GET", "products.json", true);
myRequest.send();
});

function addItemTo(obj, ele) {
    let product = document.createElement('div');
    product.className = 'product';

    let imgContainer = document.createElement('div');
    imgContainer.className = 'image';
    product.appendChild(imgContainer);

    let img = document.createElement('img');
    img.src = obj.image;
    imgContainer.appendChild(img);
    
    let whats = document.createElement('a');
    whats.classList.add('getItem', 'whats');
    whats.href = `https://wa.me/963933855160?text=2%مرحباًC%20أود20%طلب%20المنتج20%رقم${obj.id}`;
    whats.target = '_blank';
    whats.innerHTML = 'طلب عبر واتساب';
    product.appendChild(whats);

    let inCart = document.createElement('div');
    inCart.classList.add('getItem', 'in-cart');
    inCart.innerHTML = 'إضافة إلى السلة';
    product.appendChild(inCart);

    inCart.addEventListener('click', () => {
        addToCart(obj);
    })
    
    let price = document.createElement('span');
    price.className = 'price';
    price.innerHTML = `$${obj.price}`;
    product.appendChild(price);

    ele.appendChild(product);
}

window.onscroll = () => {
    document.querySelectorAll('.section').forEach((s) => {
        if (window.scrollY >= s.offsetTop - screen.height + 300 && window.scrollY <= s.offsetTop) {
            document.querySelector(`#${s.id} .special-heading`).classList.add('open');
        } else {
            document.querySelector(`#${s.id} .special-heading`).classList.remove('open');
        }
    })
}

function decQty(p) {
    p.qty--;
    if (p.qty === 0) deleteProduct(p);
    updateCartStorage();
    updateUICart();
}

function addToCart(product) {
    if (cart.get(product.id)) cart.get(product.id).qty++;
    else cart.set(product.id, {product, qty: 1});
    updateCartStorage();
    updateUICart();
    addedDone();
}

function addedDone() {
    added.classList.remove('hidden');
    setTimeout(() => {
        added.classList.add('hidden');
    }, 2000)
}

whatsCart();

function updateCartStorage() {
    localStorage.esmilecart = '';
    cart.forEach(p => {
        if (localStorage.esmilecart === '') localStorage.esmilecart = `${p.product.id},${p.qty}`;
        else localStorage.esmilecart = localStorage.esmilecart + `|${p.product.id},${p.qty}`;
    })
    whatsCart();
}

function whatsCart() {
    if (localStorage.esmilecart === '') {
        sendCart.href = 'products.html';
        sendCart.target = '_self';
    } else {
        sendCart.href = `https://wa.me/963933855160?text=2%مرحباًC%20أود20%طلب%20المنتجات${localStorage.esmilecart}`;
        sendCart.target = '_blank'; 
    }
}

cartBtn.onclick = () => {
    cartDrwaer.style.transform = 'translateX(0)';
    overlay.classList.remove('hidden');
    updateUICart();
}

overlay.onclick = () => {
    cartDrwaer.style.transform = 'translateX(100%)';
    overlay.classList.add('hidden');
}

closeCart.onclick = () => {
    cartDrwaer.style.transform = 'translateX(100%)';
    overlay.classList.add('hidden');
}

function updateUICart() {
    cart.size ? cartProducts.innerHTML = '' : cartProducts.innerHTML = "<p class='empty'>السلة فارغة</p>";
    let total = 0;
    
    cart.forEach((p)=> {
        let productDiv = document.createElement('div');
        productDiv.className = 'product';

        addImgTo(productDiv, p);
        addInfoTo(productDiv, p);
        addDelBtnTo(productDiv, p);

        cartProducts.appendChild(productDiv);

        total += p.product.price*p.qty;
    })
    totalPrice.innerHTML = `$${total}`;
}

function addImgTo(productDiv, p) {
    let imgContainer = document.createElement('div');
    imgContainer.className = 'p-image';
    productDiv.appendChild(imgContainer);

    let img = document.createElement('img');
    img.src = p.product.image;
    imgContainer.appendChild(img);
}

function addInfoTo(productDiv, p) {
    let info = document.createElement('div');
    info.className = 'info';
    productDiv.appendChild(info);

    let price = document.createElement('div');
    price.className = 'price';
    price.innerHTML = `سعر القطعة: <span>$${p.product.price}</span>`
    info.appendChild(price);

    let count = document.createElement('div');
    count.className = 'count';
    count.innerHTML = 'عدد القطع: ';
    info.appendChild(count);

    let incdec = document.createElement('div');
    incdec.className = 'incdec';
    count.appendChild(incdec);

    let inc = document.createElement('button');
    inc.className = 'inc';
    inc.innerHTML = '+';
    incdec.appendChild(inc);
    inc.onclick = () => addToCart(p.product);

    let num = document.createElement('span');
    num.className = 'num';
    num.innerHTML = p.qty;
    incdec.appendChild(num);

    let dec = document.createElement('button');
    dec.className = 'dec';
    dec.innerHTML = '--';
    incdec.appendChild(dec);
    dec.onclick = () => decQty(p);
}

function addDelBtnTo(productDiv, p) {
    let delSpn = document.createElement('span');
    delSpn.className = 'del';
    delSpn.innerHTML = 'حذف';
    productDiv.appendChild(delSpn);
    delSpn.onclick = () => deleteProduct(p);
}

function deleteProduct(p) {
    cart.delete(p.product.id);
    updateCartStorage();
    updateUICart();
}

// for (let i = 1; i < 31; i++) {
//     console.log(    `{
//             "id": ${i},
//             "image": "images/img-${i}.jpg",
//             "price": 42
//         },`
//     );
// }