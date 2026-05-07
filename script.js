// Initialize Icons
lucide.createIcons();

// Loading Screen
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => loader.style.display = 'none', 500);
    }, 1000);
});

// Cart Logic
let cart = [];
const cartSidebar = document.getElementById('cart-sidebar');
const cartItemsContainer = document.getElementById('cart-items');
const cartBadge = document.querySelector('.cart-badge');
const cartTotal = document.getElementById('cart-total');

function toggleCart() {
    cartSidebar.classList.toggle('active');
}

function addToCart(name, price) {
    cart.push({ name, price });
    updateCartUI();
    
    // Simple Notification
    alert(`${name} ditambahkan ke keranjang!`);
}

function updateCartUI() {
    cartBadge.innerText = cart.length;
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-msg">Keranjang masih kosong nih..</p>';
        cartTotal.innerText = 'Rp0';
        return;
    }

    cartItemsContainer.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
            <div>
                <h4>${item.name}</h4>
                <p>Rp${item.price.toLocaleString()}</p>
            </div>
            <button onclick="removeFromCart(${index})">Hapus</button>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    cartTotal.innerText = `Rp${total.toLocaleString()}`;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

function checkoutWhatsApp() {
    if (cart.length === 0) return alert("Keranjang kosong!");
    
    let message = "Halo Sweetstrip_Radomm! Saya mau order:\n\n";
    cart.forEach((item, i) => {
        message += `${i+1}. ${item.name} - Rp17.000\n`;
    });
    const total = cart.length * 17000;
    message += `\nTotal: Rp${total.toLocaleString()}\nMohon info langkah selanjutnya ya!`;
    
    const waUrl = `https://wa.me/628123456789?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
}

// Fade in animation on scroll
const observerOptions = { threshold: 0.1 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.product-card, .section-title').forEach(el => observer.observe(el));
