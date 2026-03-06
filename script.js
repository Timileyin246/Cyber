let cart = JSON.parse(localStorage.getItem('cart') || '[]');

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
  
    localStorage.setItem('cart', JSON.stringify(cart));
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    
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

function openCatalogue() {
    document.getElementById('fullPage').classList.add('hidden');
    document.getElementById('catalogue').classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function closeCatalogue() {
    document.getElementById('catalogue').classList.add('hidden');
    document.getElementById('fullPage').classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function phones() {
    document.getElementById('fullPage').classList.add('hidden');
    document.getElementById('phones').classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function closePhones() {
    document.getElementById('phones').classList.add('hidden');
    document.getElementById('fullPage').classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function smartWatches() {
    document.getElementById('fullPage').classList.add('hidden');
    document.getElementById('smartWatches').classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function closeSmartWatches() {
    document.getElementById('smartWatches').classList.add('hidden');
    document.getElementById('fullPage').classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function cameras() {
    document.getElementById('fullPage').classList.add('hidden');
    document.getElementById('cameras').classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function closeCameras() {
    document.getElementById('cameras').classList.add('hidden');
    document.getElementById('fullPage').classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function headphones() {
    document.getElementById('fullPage').classList.add('hidden');
    document.getElementById('headphones').classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function closeHeadphones() {
    document.getElementById('headphones').classList.add('hidden');
    document.getElementById('fullPage').classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function computers() {
    document.getElementById('fullPage').classList.add('hidden');
    document.getElementById('computers').classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function closeComputers() {
    document.getElementById('computers').classList.add('hidden');
    document.getElementById('fullPage').classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function gaming() {
    document.getElementById('fullPage').classList.add('hidden');
    document.getElementById('gaming').classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function closeGaming() {
    document.getElementById('gaming').classList.add('hidden');
    document.getElementById('fullPage').classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function getAllProducts() {
    const products = [];

    document.querySelectorAll('button[onclick^="addToCart"]').forEach(button => {
        const onclickVal = button.getAttribute('onclick');
        const match = onclickVal.match(/addToCart\('(.+?)',\s*'(.+?)',\s*(\d+\.?\d*)\)/);
        if (match) {
            products.push({
                image: match[1],
                name: match[2],
                price: parseFloat(match[3])
            });
        }
    });

    return products.filter((p, index, self) =>
        index === self.findIndex(t => t.name === p.name)
    );
}

function handleSearch(query) {
    const allSections = ['fullPage', 'catalogue', 'phones', 'smartWatches', 
                         'cameras', 'headphones', 'computers', 'gaming', 'searchResults'];
    
    if (query.trim() === '') {
        allSections.forEach(id => {
            document.getElementById(id).classList.add('hidden');
        });
        document.getElementById('fullPage').classList.remove('hidden');
        return;
    }

    allSections.forEach(id => {
        document.getElementById(id).classList.add('hidden');
    });
    document.getElementById('searchResults').classList.remove('hidden');
    document.getElementById('searchQuery').textContent = query;

    const allProducts = getAllProducts();
    const filtered = allProducts.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase())
    );

    const grid = document.getElementById('searchResultsGrid');
    const noResults = document.getElementById('noResults');

    if (filtered.length === 0) {
        grid.innerHTML = '';
        noResults.classList.remove('hidden');
    } else {
        noResults.classList.add('hidden');
        grid.innerHTML = filtered.map(p => `
            <div class="h-[420px] bg-[#F6F6F6] px-[16px] py-[24px] flex flex-col items-center gap-[16px] rounded-[9px]">
                <img class="w-[160px] h-[160px]" src="${p.image}" alt="${p.name}">
                <div class="flex flex-col text-center items-center gap-[24px]">
                    <p class="font-medium text-[16px] text-[#000000]">${p.name}</p>
                    <p class="font-semibold text-[24px] text-[#000000]">$${p.price.toFixed(2)}</p>
                    <button onclick="addToCart('${p.image}', '${p.name}', ${p.price})" 
                        class="px-[64px] py-[12px] rounded-[8px] bg-[#000000] font-medium text-[14px] text-[#FFFFFF] cursor-pointer transition-transform duration-200 hover:scale-105">
                        Buy Now
                    </button>
                </div>
            </div>
        `).join('');
    }
}

document.querySelectorAll('.searchInput').forEach(input => {
    input.addEventListener('input', (e) => {
        handleSearch(e.target.value);
    });
});

updateCart();