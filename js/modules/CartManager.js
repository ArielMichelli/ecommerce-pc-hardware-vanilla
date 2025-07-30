class CartManager {
    constructor() {
        this.items = [];
        this.isOpen = false;
        this.storageKey = 'pc-hardware-cart';
        this.init();
    }

    init() {
        this.loadFromStorage();
        this.updateCartUI();
        this.bindEvents();
    }

    bindEvents() {
        // Toggle carrito
        const cartToggle = document.getElementById('cart-toggle');
        if (cartToggle) {
            cartToggle.addEventListener('click', () => this.toggleCart());
        }

        // Cerrar carrito
        const cartClose = document.getElementById('cart-close');
        const cartOverlay = document.getElementById('cart-overlay');

        if (cartClose) {
            cartClose.addEventListener('click', () => this.closeCart());
        }

        if (cartOverlay) {
            cartOverlay.addEventListener('click', () => this.closeCart());
        }

        // Checkout
        const checkoutBtn = document.getElementById('checkout-btn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => this.checkout());
        }

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.closeCart();
            }
        });
    }

    addItem(product, quantity = 1) {
        if (!product || quantity <= 0) return;

        const existingItem = this.items.find(item => item.id === product.id);

        if (existingItem) {
            existingItem.quantity += quantity;
            // Verificar stock
            if (existingItem.quantity > product.stock) {
                existingItem.quantity = product.stock;
                this.showNotification(`Solo hay ${product.stock} unidades disponibles`, 'warning');
            }
        } else {
            this.items.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: Math.min(quantity, product.stock),
                stock: product.stock
            });
        }

        this.saveToStorage();
        this.updateCartUI();
        this.showNotification(`${product.name} añadido al carrito`, 'success');

        // Animación del botón de carrito
        this.animateCartButton();
    }

    removeItem(productId) {
        const itemIndex = this.items.findIndex(item => item.id === productId);
        if (itemIndex > -1) {
            const item = this.items[itemIndex];
            this.items.splice(itemIndex, 1);
            this.saveToStorage();
            this.updateCartUI();
            this.showNotification(`${item.name} eliminado del carrito`, 'info');
        }
    }

    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        if (!item) return;

        if (quantity <= 0) {
            this.removeItem(productId);
            return;
        }

        if (quantity > item.stock) {
            quantity = item.stock;
            this.showNotification(`Solo hay ${item.stock} unidades disponibles`, 'warning');
        }

        item.quantity = quantity;
        this.saveToStorage();
        this.updateCartUI();
    }

    clearCart() {
        this.items = [];
        this.saveToStorage();
        this.updateCartUI();
        this.showNotification('Carrito vaciado', 'info');
    }

    getTotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    getItemCount() {
        return this.items.reduce((count, item) => count + item.quantity, 0);
    }

    toggleCart() {
        if (this.isOpen) {
            this.closeCart();
        } else {
            this.openCart();
        }
    }

    openCart() {
        const sidebar = document.getElementById('cart-sidebar');
        const overlay = document.getElementById('cart-overlay');

        if (sidebar && overlay) {
            sidebar.classList.add('open');
            overlay.classList.add('show');
            this.isOpen = true;
            document.body.style.overflow = 'hidden';
        }
    }

    closeCart() {
        const sidebar = document.getElementById('cart-sidebar');
        const overlay = document.getElementById('cart-overlay');

        if (sidebar && overlay) {
            sidebar.classList.remove('open');
            overlay.classList.remove('show');
            this.isOpen = false;
            document.body.style.overflow = '';
        }
    }

    updateCartUI() {
        this.updateCartCount();
        this.updateCartItems();
        this.updateCartTotal();
        this.updateCheckoutButton();
    }

    updateCartCount() {
        const cartCount = document.getElementById('cart-count');
        if (cartCount) {
            const count = this.getItemCount();
            cartCount.textContent = count;
            cartCount.style.display = count > 0 ? 'block' : 'none';
        }
    }

    updateCartItems() {
        const cartItems = document.getElementById('cart-items');
        const cartEmpty = document.getElementById('cart-empty');

        if (!cartItems || !cartEmpty) return;

        if (this.items.length === 0) {
            cartItems.style.display = 'none';
            cartEmpty.style.display = 'flex';
        } else {
            cartItems.style.display = 'block';
            cartEmpty.style.display = 'none';
            cartItems.innerHTML = this.items.map(item => this.renderCartItem(item)).join('');

            // Bind eventos para los controles de cantidad
            this.bindCartItemEvents();
        }
    }

    renderCartItem(item) {
        return `
            <div class="cart-item" data-item-id="${item.id}">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                </div>
                <div class="cart-item-controls">
                    <div class="quantity-controls">
                        <button class="quantity-btn decrease" data-id="${item.id}">
                            <i class="fas fa-minus"></i>
                        </button>
                        <input type="number" class="quantity-input" value="${item.quantity}" 
                               min="1" max="${item.stock}" data-id="${item.id}">
                        <button class="quantity-btn increase" data-id="${item.id}">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                    <button class="remove-item" data-id="${item.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    }

    bindCartItemEvents() {
        const cartItems = document.getElementById('cart-items');
        if (!cartItems) return;

        // Botones de cantidad
        cartItems.querySelectorAll('.quantity-btn.decrease').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.dataset.id);
                const item = this.items.find(item => item.id === id);
                if (item) {
                    this.updateQuantity(id, item.quantity - 1);
                }
            });
        });

        cartItems.querySelectorAll('.quantity-btn.increase').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.dataset.id);
                const item = this.items.find(item => item.id === id);
                if (item) {
                    this.updateQuantity(id, item.quantity + 1);
                }
            });
        });

        // Inputs de cantidad
        cartItems.querySelectorAll('.quantity-input').forEach(input => {
            input.addEventListener('change', () => {
                const id = parseInt(input.dataset.id);
                const quantity = parseInt(input.value);
                this.updateQuantity(id, quantity);
            });
        });

        // Botones de eliminar
        cartItems.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.dataset.id);
                this.removeItem(id);
            });
        });
    }

    updateCartTotal() {
        const cartTotal = document.getElementById('cart-total');
        if (cartTotal) {
            cartTotal.textContent = this.getTotal().toFixed(2);
        }
    }

    updateCheckoutButton() {
        const checkoutBtn = document.getElementById('checkout-btn');
        if (checkoutBtn) {
            checkoutBtn.disabled = this.items.length === 0;
        }
    }

    animateCartButton() {
        const cartToggle = document.getElementById('cart-toggle');
        if (cartToggle) {
            cartToggle.style.transform = 'scale(1.1)';
            setTimeout(() => {
                cartToggle.style.transform = '';
            }, 200);
        }
    }

    showNotification(message, type = 'info') {
        // Crear notificación
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${this.getNotificationIcon(type)}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        `;

        // Añadir al DOM
        document.body.appendChild(notification);

        // Mostrar con animación
        setTimeout(() => notification.classList.add('show'), 10);

        // Auto remove después de 3 segundos
        setTimeout(() => this.removeNotification(notification), 3000);

        // Evento para cerrar manualmente
        notification.querySelector('.notification-close').addEventListener('click', () => {
            this.removeNotification(notification);
        });
    }

    getNotificationIcon(type) {
        switch (type) {
            case 'success': return 'fa-check-circle';
            case 'warning': return 'fa-exclamation-triangle';
            case 'error': return 'fa-times-circle';
            default: return 'fa-info-circle';
        }
    }

    removeNotification(notification) {
        notification.classList.add('hide');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }

    checkout() {
        if (this.items.length === 0) return;

        // Simular proceso de checkout
        this.showNotification('Redirigiendo al checkout...', 'info');

        // Aquí iría la lógica real de checkout
        setTimeout(() => {
            alert(`Checkout iniciado!\nTotal: $${this.getTotal().toFixed(2)}\nArtículos: ${this.getItemCount()}`);
        }, 1000);
    }

    saveToStorage() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.items));
        } catch (error) {
            console.error('Error al guardar carrito:', error);
        }
    }

    loadFromStorage() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            if (stored) {
                this.items = JSON.parse(stored);
            }
        } catch (error) {
            console.error('Error al cargar carrito:', error);
            this.items = [];
        }
    }

    // Método para obtener datos del carrito (útil para integraciones)
    getCartData() {
        return {
            items: [...this.items],
            total: this.getTotal(),
            itemCount: this.getItemCount()
        };
    }
}

// Exportar para uso global
if (typeof window !== 'undefined') {
    window.CartManager = CartManager;
}
