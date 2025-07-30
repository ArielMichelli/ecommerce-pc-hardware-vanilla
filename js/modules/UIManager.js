class UIManager {
    constructor() {
        this.init();
    }

    init() {
        this.bindGlobalEvents();
        this.initScrollEffects();
        this.initLazyLoading();
        this.addNotificationStyles();
    }

    bindGlobalEvents() {
        // Escape key para cerrar modales
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAllModals();
            }
        });

        // Click fuera de modales para cerrar
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-overlay')) {
                this.closeAllModals();
            }
        });

        // Scroll para header sticky effects
        window.addEventListener('scroll', this.throttle(() => {
            this.handleScroll();
        }, 100));

        // Resize para responsive adjustments
        window.addEventListener('resize', this.debounce(() => {
            this.handleResize();
        }, 250));

        // Loading states
        window.addEventListener('beforeunload', () => {
            this.showGlobalLoading();
        });
    }

    handleScroll() {
        const header = document.querySelector('.header');
        if (header) {
            const scrolled = window.scrollY > 100;
            header.classList.toggle('scrolled', scrolled);
            document.body.classList.toggle('header-fixed', scrolled);
        }

        // Back to top button
        this.updateBackToTopButton();
    }

    handleResize() {
        // Cerrar carrito en desktop si está abierto en mobile
        if (window.innerWidth > 768) {
            const cartSidebar = document.getElementById('cart-sidebar');
            if (cartSidebar && cartSidebar.classList.contains('open')) {
                if (window.cartManager) {
                    window.cartManager.closeCart();
                }
            }
        }

        // Recalcular layouts si es necesario
        this.recalculateLayouts();
    }

    initScrollEffects() {
        // Intersection Observer para animaciones
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observar elementos que se pueden animar
        document.querySelectorAll('.product-card, .filter-section, .products-header').forEach(el => {
            observer.observe(el);
        });
    }

    initLazyLoading() {
        // Intersection Observer para lazy loading de imágenes
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    updateBackToTopButton() {
        let backToTopBtn = document.getElementById('back-to-top');

        if (!backToTopBtn) {
            backToTopBtn = this.createBackToTopButton();
        }

        const showButton = window.scrollY > 300;
        backToTopBtn.classList.toggle('show', showButton);
    }

    createBackToTopButton() {
        const button = document.createElement('button');
        button.id = 'back-to-top';
        button.className = 'back-to-top-btn';
        button.innerHTML = '<i class="fas fa-arrow-up"></i>';
        button.title = 'Volver arriba';

        button.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        document.body.appendChild(button);
        return button;
    }

    closeAllModals() {
        // Cerrar modal de producto
        const productModal = document.getElementById('product-modal');
        const modalOverlay = document.getElementById('modal-overlay');

        if (productModal && productModal.classList.contains('show')) {
            productModal.classList.remove('show');
            modalOverlay.classList.remove('show');
        }

        // Cerrar carrito si está abierto
        if (window.cartManager && window.cartManager.isOpen) {
            window.cartManager.closeCart();
        }
    }

    showGlobalLoading() {
        const loading = document.createElement('div');
        loading.id = 'global-loading';
        loading.className = 'global-loading';
        loading.innerHTML = `
            <div class="loading-spinner">
                <i class="fas fa-spinner fa-spin"></i>
                <p>Cargando...</p>
            </div>
        `;
        document.body.appendChild(loading);
    }

    hideGlobalLoading() {
        const loading = document.getElementById('global-loading');
        if (loading) {
            loading.remove();
        }
    }

    recalculateLayouts() {
        // Recalcular grids si es necesario
        const productsGrid = document.querySelector('.products-grid');
        if (productsGrid) {
            // Forzar reflow
            productsGrid.style.display = 'none';
            productsGrid.offsetHeight; // trigger reflow
            productsGrid.style.display = '';
        }
    }

    addNotificationStyles() {
        if (document.getElementById('notification-styles')) return;

        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: -400px;
                background: white;
                padding: 1rem;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                display: flex;
                align-items: center;
                justify-content: space-between;
                min-width: 300px;
                max-width: 400px;
                z-index: 10000;
                transition: all 0.3s ease;
                border-left: 4px solid #ddd;
            }

            .notification.show {
                right: 20px;
            }

            .notification.hide {
                right: -400px;
                opacity: 0;
            }

            .notification-success {
                border-left-color: var(--accent-color);
            }

            .notification-warning {
                border-left-color: var(--secondary-color);
            }

            .notification-error {
                border-left-color: #ef4444;
            }

            .notification-info {
                border-left-color: var(--primary-color);
            }

            .notification-content {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                flex: 1;
            }

            .notification-content i {
                font-size: 1.125rem;
            }

            .notification-success .notification-content i {
                color: var(--accent-color);
            }

            .notification-warning .notification-content i {
                color: var(--secondary-color);
            }

            .notification-error .notification-content i {
                color: #ef4444;
            }

            .notification-info .notification-content i {
                color: var(--primary-color);
            }

            .notification-close {
                background: none;
                border: none;
                color: var(--text-secondary);
                cursor: pointer;
                padding: 0.25rem;
                border-radius: 4px;
                transition: background-color 0.2s;
            }

            .notification-close:hover {
                background-color: var(--bg-secondary);
            }

            .back-to-top-btn {
                position: fixed;
                bottom: 30px;
                right: 30px;
                background: var(--primary-color);
                color: white;
                border: none;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.125rem;
                box-shadow: var(--shadow-lg);
                transition: all 0.3s ease;
                opacity: 0;
                visibility: hidden;
                transform: translateY(20px);
                z-index: 1000;
            }

            .back-to-top-btn.show {
                opacity: 1;
                visibility: visible;
                transform: translateY(0);
            }

            .back-to-top-btn:hover {
                background: var(--primary-dark);
                transform: translateY(-2px);
            }

            .global-loading {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(255, 255, 255, 0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10001;
            }

            .loading-spinner {
                text-align: center;
                color: var(--primary-color);
            }

            .loading-spinner i {
                font-size: 2rem;
                margin-bottom: 1rem;
            }

            .header.scrolled {
                box-shadow: var(--shadow-lg);
                backdrop-filter: blur(8px);
                background: rgba(255, 255, 255, 0.95);
            }

            .animate-in {
                animation: fadeInUp 0.6s ease-out;
            }

            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            @media (max-width: 768px) {
                .notification {
                    left: 10px;
                    right: 10px;
                    min-width: auto;
                    max-width: none;
                }

                .notification.show {
                    right: 10px;
                }

                .notification.hide {
                    right: 10px;
                    transform: translateY(-100px);
                }

                .back-to-top-btn {
                    bottom: 20px;
                    right: 20px;
                    width: 45px;
                    height: 45px;
                }
            }
        `;

        document.head.appendChild(styles);
    }

    // Utilidades
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    throttle(func, limit) {
        let inThrottle;
        return function () {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // Métodos de utilidad para animaciones
    fadeIn(element, duration = 300) {
        element.style.opacity = '0';
        element.style.display = 'block';

        const start = performance.now();

        const animate = (timestamp) => {
            const elapsed = timestamp - start;
            const progress = Math.min(elapsed / duration, 1);

            element.style.opacity = progress;

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }

    fadeOut(element, duration = 300) {
        const start = performance.now();
        const startOpacity = parseFloat(getComputedStyle(element).opacity);

        const animate = (timestamp) => {
            const elapsed = timestamp - start;
            const progress = Math.min(elapsed / duration, 1);

            element.style.opacity = startOpacity * (1 - progress);

            if (progress >= 1) {
                element.style.display = 'none';
            } else {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }

    slideUp(element, duration = 300) {
        element.style.height = element.offsetHeight + 'px';
        element.style.overflow = 'hidden';
        element.style.transition = `height ${duration}ms ease`;

        setTimeout(() => {
            element.style.height = '0';
        }, 10);

        setTimeout(() => {
            element.style.display = 'none';
            element.style.height = '';
            element.style.overflow = '';
            element.style.transition = '';
        }, duration);
    }

    slideDown(element, duration = 300) {
        element.style.display = 'block';
        const height = element.offsetHeight;
        element.style.height = '0';
        element.style.overflow = 'hidden';
        element.style.transition = `height ${duration}ms ease`;

        setTimeout(() => {
            element.style.height = height + 'px';
        }, 10);

        setTimeout(() => {
            element.style.height = '';
            element.style.overflow = '';
            element.style.transition = '';
        }, duration);
    }
}

// Exportar para uso global
if (typeof window !== 'undefined') {
    window.UIManager = UIManager;
}
