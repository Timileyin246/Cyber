let cart = [];

function addToCart(image, name, price) {

    const existingItem = cart.find(item => item.name === name);
  
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
        image: image,
        name: name,
        price: price,
        quantity: 1
        });
    }
    
    updateCart();
    openCart();
}

function updateCart() {
    const cartItemsDiv = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');
    const cartTotal = document.getElementById('cartTotal');
  
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `$${total.toFixed(2)}`;
    
    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<p class="text-[#787878] text-center">Your cart is empty</p>';
    } else {
        cartItemsDiv.innerHTML = cart.map((item, index) => `
            <div class="flex gap-4 mb-4 pb-4">
                <img src="${item.image}" alt="${item.name}" class="w-20 h-20 object-cover rounded">
                <div class="flex-1">
                    <h3 class="font-semibold">${item.name}</h3>
                    <p class="text-[#787878]">$${item.price.toFixed(2)}</p>
                    <div class="flex items-center gap-2 mt-2">
                        <button onclick="changeQuantity(${index}, -1)" class="px-[10px] py-[5px] text-center border border-[#B5B5B5] rounded cursor-pointer hover:bg-[#B5B5B5]">-</button>
                        <span class="px-3">${item.quantity}</span>
                        <button onclick="changeQuantity(${index}, 1)" class="px-[10px] py-[5px] text-center border border-[#B5B5B5] rounded cursor-pointer hover:bg-[#B5B5B5]">+</button>
                        <button onclick="removeFromCart(${index})" class="ml-auto text-red-500 cursor-pointer hover:text-red-700">Remove</button>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

function changeQuantity(index, change) {
    cart[index].quantity += change;
    
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    
    updateCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

function openCart() {
    document.getElementById('cartSidebar').classList.remove('translate-x-full');
}

function closeCart() {
    document.getElementById('cartSidebar').classList.add('translate-x-full');
}

updateCart();