class ProductManager {
    constructor() {
        this.products = [];
        this.filteredProducts = [];
        this.currentFilters = {
            category: 'all',
            minPrice: 0,
            maxPrice: 2000,
            brands: [],
            search: '',
            sortBy: 'name'
        };
        this.currentView = 'grid';
        this.init();
    }

    async init() {
        await this.loadProducts();
        this.render();
    }

    async loadProducts() {
        try {
            // Simular carga de datos
            this.products = getProducts();
            this.filteredProducts = [...this.products];
            console.log(`Cargados ${this.products.length} productos`);
        } catch (error) {
            console.error('Error al cargar productos:', error);
        }
    }

    applyFilters(filters = {}) {
        this.currentFilters = { ...this.currentFilters, ...filters };
        this.filteredProducts = filterProducts(this.currentFilters);
        this.render();
    }

    searchProducts(searchTerm) {
        this.currentFilters.search = searchTerm;
        this.filteredProducts = filterProducts(this.currentFilters);
        this.render();
    }

    sortProducts(sortBy) {
        this.currentFilters.sortBy = sortBy;
        this.filteredProducts = filterProducts(this.currentFilters);
        this.render();
    }

    setView(view) {
        this.currentView = view;
        const container = document.getElementById('products-container');
        if (container) {
            container.className = `products-grid ${view === 'list' ? 'list-view' : ''}`;
        }
    }

    render() {
        const container = document.getElementById('products-container');
        const loading = document.getElementById('loading');

        if (!container) return;

        // Mostrar loading
        if (loading) loading.classList.remove('hidden');

        // Simular delay de carga
        setTimeout(() => {
            container.innerHTML = '';

            if (this.filteredProducts.length === 0) {
                container.innerHTML = this.renderEmptyState();
            } else {
                this.filteredProducts.forEach(product => {
                    const productElement = this.createProductCard(product);
                    container.appendChild(productElement);
                });
            }

            // Ocultar loading
            if (loading) loading.classList.add('hidden');
        }, 300);
    }

    createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.setAttribute('data-product-id', product.id);

        const discount = product.originalPrice ?
            Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

        const stockStatus = this.getStockStatus(product.stock);
        const badges = this.renderBadges(product, discount);

        card.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" 
                     alt="${product.name}" 
                     loading="lazy"
                     onerror="this.onerror=null; this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNzUgMTI1SDIyNVYxNzVIMTc1VjEyNVoiIGZpbGw9IiM5Q0E0QjIiLz4KPHN2Zz4K'; this.style.backgroundColor='#f3f4f6';">
                ${badges}
            </div>
            <div class="product-info">
                <div class="product-category">${categories[product.category]}</div>
                <h3 class="product-name">${product.name}</h3>
                
                <div class="product-specs">
                    ${Object.entries(product.specs).slice(0, 2).map(([key, value]) =>
            `<div class="product-spec">
                            <span class="product-spec-label">${key}:</span>
                            <span class="product-spec-value">${value}</span>
                        </div>`
        ).join('')}
                </div>

                <div class="product-rating">
                    <div class="product-stars">
                        ${this.renderStars(product.rating)}
                    </div>
                    <span class="product-rating-text">(${product.reviews} reviews)</span>
                </div>

                <div class="stock-status ${stockStatus.class}">
                    ${stockStatus.text}
                </div>

                <div class="product-price">
                    <div class="price-info">
                        <span class="price-current">$${product.price.toFixed(2)}</span>
                        ${product.originalPrice ?
                `<span class="price-original">$${product.originalPrice.toFixed(2)}</span>` : ''
            }
                    </div>
                    ${discount > 0 ? `<span class="price-discount">-${discount}%</span>` : ''}
                </div>

                <div class="product-actions">
                    <button class="add-to-cart-btn" 
                            data-product-id="${product.id}"
                            ${product.stock === 0 ? 'disabled' : ''}>
                        <i class="fas fa-shopping-cart"></i>
                        ${product.stock === 0 ? 'Agotado' : 'Añadir al Carrito'}
                    </button>
                    <button class="wishlist-btn" data-product-id="${product.id}">
                        <i class="far fa-heart"></i>
                    </button>
                </div>
            </div>
        `;

        // Añadir event listeners
        this.addCardEventListeners(card, product);

        return card;
    }

    addCardEventListeners(card, product) {
        // Click en la tarjeta para abrir modal
        card.addEventListener('click', (e) => {
            if (!e.target.closest('.product-actions')) {
                this.openProductModal(product);
            }
        });

        // Botón añadir al carrito
        const addToCartBtn = card.querySelector('.add-to-cart-btn');
        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                if (window.cartManager) {
                    window.cartManager.addItem(product);
                }
            });
        }

        // Botón wishlist
        const wishlistBtn = card.querySelector('.wishlist-btn');
        if (wishlistBtn) {
            wishlistBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleWishlist(product.id, wishlistBtn);
            });
        }
    }

    openProductModal(product) {
        const modal = document.getElementById('product-modal');
        const modalTitle = document.getElementById('modal-title');
        const modalBody = document.getElementById('modal-body');
        const modalOverlay = document.getElementById('modal-overlay');

        if (!modal || !modalTitle || !modalBody) return;

        modalTitle.textContent = product.name;
        modalBody.innerHTML = this.renderProductModalContent(product);

        modal.classList.add('show');
        modalOverlay.classList.add('show');

        // Event listeners para el modal
        this.addModalEventListeners(modal, modalOverlay, product);
    }

    renderProductModalContent(product) {
        const discount = product.originalPrice ?
            Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

        return `
            <div class="modal-product-content">
                <div class="modal-product-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="modal-product-details">
                    <div class="product-category">${categories[product.category]}</div>
                    <h2>${product.name}</h2>
                    
                    <div class="product-rating">
                        <div class="product-stars">
                            ${this.renderStars(product.rating)}
                        </div>
                        <span class="product-rating-text">${product.rating}/5 (${product.reviews} reviews)</span>
                    </div>

                    <div class="product-price">
                        <span class="price-current">$${product.price.toFixed(2)}</span>
                        ${product.originalPrice ?
                `<span class="price-original">$${product.originalPrice.toFixed(2)}</span>` : ''
            }
                        ${discount > 0 ? `<span class="price-discount">-${discount}%</span>` : ''}
                    </div>

                    <div class="product-description">
                        <p>${product.description}</p>
                    </div>

                    <div class="product-full-specs">
                        <h4>Especificaciones</h4>
                        ${Object.entries(product.specs).map(([key, value]) =>
                `<div class="spec-row">
                                <span class="spec-label">${key}:</span>
                                <span class="spec-value">${value}</span>
                            </div>`
            ).join('')}
                    </div>

                    <div class="product-features">
                        <h4>Características</h4>
                        <ul>
                            ${product.features.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                    </div>

                    <div class="modal-actions">
                        <div class="quantity-selector">
                            <label>Cantidad:</label>
                            <div class="quantity-controls">
                                <button class="quantity-btn" onclick="this.nextElementSibling.stepDown()">-</button>
                                <input type="number" value="1" min="1" max="${product.stock}" class="quantity-input">
                                <button class="quantity-btn" onclick="this.previousElementSibling.stepUp()">+</button>
                            </div>
                        </div>
                        <button class="add-to-cart-btn modal-add-to-cart" data-product-id="${product.id}">
                            <i class="fas fa-shopping-cart"></i>
                            Añadir al Carrito
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    addModalEventListeners(modal, modalOverlay, product) {
        // Cerrar modal
        const closeBtn = modal.querySelector('.modal-close');
        const closeModal = () => {
            modal.classList.remove('show');
            modalOverlay.classList.remove('show');
        };

        if (closeBtn) {
            closeBtn.addEventListener('click', closeModal);
        }

        modalOverlay.addEventListener('click', closeModal);

        // Añadir al carrito desde modal
        const addToCartBtn = modal.querySelector('.modal-add-to-cart');
        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', () => {
                const quantityInput = modal.querySelector('.quantity-input');
                const quantity = parseInt(quantityInput?.value) || 1;

                if (window.cartManager) {
                    window.cartManager.addItem(product, quantity);
                }
                closeModal();
            });
        }
    }

    renderBadges(product, discount) {
        let badges = '';

        if (discount > 0) {
            badges += `<span class="product-badge sale">-${discount}%</span>`;
        }

        if (product.tags?.includes('nuevo')) {
            badges += `<span class="product-badge new">Nuevo</span>`;
        }

        return badges;
    }

    renderStars(rating) {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
            stars.push('<i class="fas fa-star"></i>');
        }

        if (hasHalfStar) {
            stars.push('<i class="fas fa-star-half-alt"></i>');
        }

        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            stars.push('<i class="far fa-star"></i>');
        }

        return stars.join('');
    }

    getStockStatus(stock) {
        if (stock === 0) {
            return { class: 'out-of-stock', text: 'Agotado' };
        } else if (stock <= 5) {
            return { class: 'low-stock', text: `Últimas ${stock} unidades` };
        } else {
            return { class: 'in-stock', text: 'En Stock' };
        }
    }

    toggleWishlist(productId, button) {
        // Simular toggle wishlist
        button.classList.toggle('active');
        const icon = button.querySelector('i');

        if (button.classList.contains('active')) {
            icon.className = 'fas fa-heart';
        } else {
            icon.className = 'far fa-heart';
        }
    }

    renderEmptyState() {
        return `
            <div class="empty-state">
                <i class="fas fa-search"></i>
                <h3>No se encontraron productos</h3>
                <p>Intenta ajustar los filtros o términos de búsqueda</p>
                <button class="btn btn-primary" onclick="window.filterManager.clearAllFilters()">
                    Limpiar Filtros
                </button>
            </div>
        `;
    }

    getProductCount() {
        return this.filteredProducts.length;
    }
}

// Exportar para uso global
if (typeof window !== 'undefined') {
    window.ProductManager = ProductManager;
}
