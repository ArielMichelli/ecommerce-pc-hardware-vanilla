// Aplicación principal del E-commerce PC Hardware
class App {
    constructor() {
        this.productManager = null;
        this.cartManager = null;
        this.filterManager = null;
        this.uiManager = null;
        this.isInitialized = false;
    }

    async init() {
        try {
            console.log('🚀 Iniciando PC Hardware Store...');

            // Verificar que el DOM esté listo
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.init());
                return;
            }

            // Inicializar managers en orden
            await this.initializeManagers();

            // Configurar la aplicación
            this.setupGlobalEventListeners();
            this.setupKeyboardShortcuts();

            // Marcar como inicializada
            this.isInitialized = true;

            console.log('✅ PC Hardware Store iniciada correctamente');

            // Ocultar loading inicial si existe
            this.hideInitialLoading();

        } catch (error) {
            console.error('❌ Error al inicializar la aplicación:', error);
            this.showErrorState(error);
        }
    }

    async initializeManagers() {
        // 1. UI Manager (debe ir primero para manejar estilos y efectos)
        this.uiManager = new UIManager();
        window.uiManager = this.uiManager;

        // 2. Cart Manager (independiente de productos)
        this.cartManager = new CartManager();
        window.cartManager = this.cartManager;

        // 3. Product Manager (carga productos)
        this.productManager = new ProductManager();
        window.productManager = this.productManager;

        // 4. Filter Manager (depende del product manager)
        this.filterManager = new FilterManager(this.productManager);
        window.filterManager = this.filterManager;

        console.log('📦 Managers inicializados');
    }

    setupGlobalEventListeners() {
        // Manejo de errores globales
        window.addEventListener('error', (e) => {
            console.error('Error global:', e.error);
            this.handleGlobalError(e.error);
        });

        // Manejo de errores de promesas no capturadas
        window.addEventListener('unhandledrejection', (e) => {
            console.error('Promesa rechazada no manejada:', e.reason);
            this.handleGlobalError(e.reason);
        });

        // Online/Offline status
        window.addEventListener('online', () => {
            this.showNotification('Conexión restaurada', 'success');
        });

        window.addEventListener('offline', () => {
            this.showNotification('Sin conexión a internet', 'warning');
        });

        // Performance monitoring
        if ('performance' in window) {
            window.addEventListener('load', () => {
                const loadTime = performance.now();
                console.log(`⚡ Tiempo de carga: ${Math.round(loadTime)}ms`);
            });
        }
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + K para búsqueda
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                const searchInput = document.getElementById('search-input');
                if (searchInput) {
                    searchInput.focus();
                    searchInput.select();
                }
            }

            // Escape para cerrar modales/carrito
            if (e.key === 'Escape') {
                if (this.cartManager && this.cartManager.isOpen) {
                    this.cartManager.closeCart();
                }
            }

            // Ctrl/Cmd + Shift + C para abrir carrito
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'C') {
                e.preventDefault();
                if (this.cartManager) {
                    this.cartManager.toggleCart();
                }
            }
        });
    }

    hideInitialLoading() {
        const initialLoading = document.querySelector('.initial-loading');
        if (initialLoading) {
            setTimeout(() => {
                initialLoading.style.opacity = '0';
                setTimeout(() => {
                    initialLoading.remove();
                }, 300);
            }, 500);
        }
    }

    showErrorState(error) {
        const container = document.getElementById('products-container');
        if (container) {
            container.innerHTML = `
                <div class="error-state">
                    <i class="fas fa-exclamation-triangle"></i>
                    <h3>Error al cargar la aplicación</h3>
                    <p>Ha ocurrido un error inesperado. Por favor, recarga la página.</p>
                    <button class="btn btn-primary" onclick="window.location.reload()">
                        <i class="fas fa-refresh"></i>
                        Recargar Página
                    </button>
                </div>
            `;
        }
    }

    handleGlobalError(error) {
        // Log del error
        console.error('Error capturado:', error);

        // Solo mostrar notificación en desarrollo
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            this.showNotification('Se ha producido un error. Revisa la consola.', 'error');
        }
    }

    showNotification(message, type = 'info') {
        if (this.cartManager) {
            this.cartManager.showNotification(message, type);
        }
    }

    // Métodos de utilidad para debugging y desarrollo
    getAppState() {
        return {
            initialized: this.isInitialized,
            products: this.productManager?.filteredProducts?.length || 0,
            cartItems: this.cartManager?.getItemCount() || 0,
            activeFilters: this.filterManager?.getActiveFiltersCount() || 0
        };
    }

    // Método para reinicializar la app (útil para desarrollo)
    async restart() {
        console.log('🔄 Reiniciando aplicación...');

        // Limpiar estado
        if (this.cartManager) {
            this.cartManager.clearCart();
        }

        if (this.filterManager) {
            this.filterManager.clearAllFilters();
        }

        // Reinicializar
        await this.init();
    }

    // Exportar datos (útil para backup/debugging)
    exportData() {
        return {
            cart: this.cartManager?.getCartData() || null,
            filters: this.filterManager?.exportFilters() || null,
            timestamp: new Date().toISOString()
        };
    }

    // Importar datos
    importData(data) {
        try {
            if (data.cart && this.cartManager) {
                // Restaurar carrito
                this.cartManager.items = data.cart.items || [];
                this.cartManager.updateCartUI();
                this.cartManager.saveToStorage();
            }

            if (data.filters && this.filterManager) {
                // Restaurar filtros
                this.filterManager.importFilters(data.filters);
            }

            this.showNotification('Datos importados correctamente', 'success');
        } catch (error) {
            console.error('Error al importar datos:', error);
            this.showNotification('Error al importar datos', 'error');
        }
    }
}

// Función de inicialización global
function initializeApp() {
    window.app = new App();
    window.app.init();
}

// Auto-inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

// Exponer funciones útiles para debugging en consola
window.debugApp = {
    getState: () => window.app?.getAppState(),
    restart: () => window.app?.restart(),
    export: () => window.app?.exportData(),
    import: (data) => window.app?.importData(data),
    clearCart: () => window.cartManager?.clearCart(),
    clearFilters: () => window.filterManager?.clearAllFilters()
};

// Mensajes de bienvenida en consola (solo en desarrollo)
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log(`
    🖥️ PC Hardware Store - E-commerce
    ================================
    
    🔧 Comandos de debugging disponibles:
    • debugApp.getState() - Ver estado de la aplicación
    • debugApp.restart() - Reiniciar aplicación
    • debugApp.export() - Exportar datos
    • debugApp.import(data) - Importar datos
    • debugApp.clearCart() - Vaciar carrito
    • debugApp.clearFilters() - Limpiar filtros
    
    ⌨️ Atajos de teclado:
    • Ctrl/Cmd + K - Enfocar búsqueda
    • Ctrl/Cmd + Shift + C - Abrir/cerrar carrito
    • Escape - Cerrar modales
    `);
}
