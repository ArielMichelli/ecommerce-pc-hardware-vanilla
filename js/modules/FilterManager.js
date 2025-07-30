class FilterManager {
    constructor(productManager) {
        this.productManager = productManager;
        this.filters = {
            category: 'all',
            minPrice: 0,
            maxPrice: 2000,
            brands: [],
            search: '',
            sortBy: 'name'
        };
        this.init();
    }

    init() {
        this.renderBrandFilters();
        this.bindEvents();
        this.updatePriceRangeDisplay();
    }

    bindEvents() {
        // Navegación por categorías
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const category = link.dataset.category;
                this.setCategory(category);
                this.updateActiveNavLink(link);
            });
        });

        // Búsqueda
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            let searchTimeout;
            searchInput.addEventListener('input', (e) => {
                clearTimeout(searchTimeout);
                searchTimeout = setTimeout(() => {
                    this.setSearch(e.target.value);
                }, 300);
            });
        }

        // Rangos de precio
        const priceMin = document.getElementById('price-min');
        const priceMax = document.getElementById('price-max');

        if (priceMin && priceMax) {
            priceMin.addEventListener('input', () => {
                this.setPriceRange(parseInt(priceMin.value), parseInt(priceMax.value));
            });

            priceMax.addEventListener('input', () => {
                this.setPriceRange(parseInt(priceMin.value), parseInt(priceMax.value));
            });
        }

        // Ordenamiento
        const sortSelect = document.getElementById('sort-select');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                this.setSortBy(e.target.value);
            });
        }

        // Limpiar filtros
        const clearFiltersBtn = document.getElementById('clear-filters');
        if (clearFiltersBtn) {
            clearFiltersBtn.addEventListener('click', () => {
                this.clearAllFilters();
            });
        }

        // Vista de productos
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const view = btn.dataset.view;
                this.setView(view);
                this.updateActiveViewButton(btn);
            });
        });
    }

    renderBrandFilters() {
        const brandFilters = document.getElementById('brand-filters');
        if (!brandFilters) return;

        const brandsHTML = Object.entries(brands).map(([key, brand]) => {
            return `
                <div class="filter-option">
                    <input type="checkbox" id="brand-${key}" value="${key}" class="brand-checkbox">
                    <label for="brand-${key}">${brand.name}</label>
                    <span class="filter-count">${brand.count}</span>
                </div>
            `;
        }).join('');

        brandFilters.innerHTML = brandsHTML;

        // Bind eventos para checkboxes de marca
        brandFilters.querySelectorAll('.brand-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                this.updateBrandFilters();
            });
        });
    }

    updateBrandFilters() {
        const selectedBrands = Array.from(document.querySelectorAll('.brand-checkbox:checked'))
            .map(checkbox => checkbox.value);

        this.setBrands(selectedBrands);
    }

    setCategory(category) {
        this.filters.category = category;
        this.applyFilters();
    }

    setSearch(searchTerm) {
        this.filters.search = searchTerm.trim();
        this.applyFilters();
    }

    setPriceRange(min, max) {
        // Asegurar que min no sea mayor que max
        if (min > max) {
            [min, max] = [max, min];
            // Actualizar los sliders
            document.getElementById('price-min').value = min;
            document.getElementById('price-max').value = max;
        }

        this.filters.minPrice = min;
        this.filters.maxPrice = max;
        this.updatePriceRangeDisplay();
        this.applyFilters();
    }

    setBrands(brandArray) {
        this.filters.brands = brandArray;
        this.applyFilters();
    }

    setSortBy(sortBy) {
        this.filters.sortBy = sortBy;
        this.applyFilters();
    }

    setView(view) {
        if (this.productManager) {
            this.productManager.setView(view);
        }
    }

    applyFilters() {
        if (this.productManager) {
            this.productManager.applyFilters(this.filters);
        }
        this.updateFilterUI();
    }

    updateFilterUI() {
        this.updateActiveFilters();
        this.updateResultsCount();
    }

    updateActiveFilters() {
        // Actualizar contadores de marca
        this.updateBrandCounts();

        // Aquí podrías agregar lógica para mostrar filtros activos
        // como chips o tags que el usuario pueda remover
    }

    updateBrandCounts() {
        // Recalcular contadores basado en productos filtrados
        if (!this.productManager) return;

        const currentProducts = this.productManager.filteredProducts;
        const brandCounts = {};

        // Contar marcas en productos actuales
        currentProducts.forEach(product => {
            brandCounts[product.brand] = (brandCounts[product.brand] || 0) + 1;
        });

        // Actualizar UI
        Object.keys(brands).forEach(brandKey => {
            const countElement = document.querySelector(`#brand-${brandKey} + label + .filter-count`);
            if (countElement) {
                countElement.textContent = brandCounts[brandKey] || 0;
            }
        });
    }

    updateResultsCount() {
        if (!this.productManager) return;

        const count = this.productManager.getProductCount();
        const resultsText = count === 1 ? 'producto encontrado' : 'productos encontrados';

        // Aquí podrías mostrar el contador de resultados
        console.log(`${count} ${resultsText}`);
    }

    updatePriceRangeDisplay() {
        const minValue = document.getElementById('price-min-value');
        const maxValue = document.getElementById('price-max-value');

        if (minValue) minValue.textContent = this.filters.minPrice;
        if (maxValue) maxValue.textContent = this.filters.maxPrice;
    }

    updateActiveNavLink(activeLink) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        activeLink.classList.add('active');
    }

    updateActiveViewButton(activeBtn) {
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        activeBtn.classList.add('active');
    }

    clearAllFilters() {
        // Reset filtros
        this.filters = {
            category: 'all',
            minPrice: 0,
            maxPrice: 2000,
            brands: [],
            search: '',
            sortBy: 'name'
        };

        // Reset UI
        this.resetFilterUI();

        // Aplicar filtros
        this.applyFilters();

        // Reset navegación
        const allLink = document.querySelector('.nav-link[data-category="all"]');
        if (allLink) {
            this.updateActiveNavLink(allLink);
        }
    }

    resetFilterUI() {
        // Reset búsqueda
        const searchInput = document.getElementById('search-input');
        if (searchInput) searchInput.value = '';

        // Reset precio
        const priceMin = document.getElementById('price-min');
        const priceMax = document.getElementById('price-max');
        if (priceMin) priceMin.value = 0;
        if (priceMax) priceMax.value = 2000;
        this.updatePriceRangeDisplay();

        // Reset marcas
        document.querySelectorAll('.brand-checkbox').forEach(checkbox => {
            checkbox.checked = false;
        });

        // Reset ordenamiento
        const sortSelect = document.getElementById('sort-select');
        if (sortSelect) sortSelect.value = 'name';
    }

    // Métodos para filtros avanzados

    addPricePreset(min, max, label) {
        // Función para añadir presets de precio como "Menos de $100", "$100-$500", etc.
        const priceGroup = document.querySelector('.filter-group h4:contains("Precio")');
        if (priceGroup) {
            const preset = document.createElement('button');
            preset.className = 'price-preset-btn';
            preset.textContent = label;
            preset.addEventListener('click', () => {
                this.setPriceRange(min, max);
                document.getElementById('price-min').value = min;
                document.getElementById('price-max').value = max;
            });
            // Añadir al DOM después del grupo de precio
        }
    }

    getActiveFiltersCount() {
        let count = 0;

        if (this.filters.category !== 'all') count++;
        if (this.filters.search) count++;
        if (this.filters.minPrice > 0 || this.filters.maxPrice < 2000) count++;
        if (this.filters.brands.length > 0) count += this.filters.brands.length;

        return count;
    }

    exportFilters() {
        // Exportar filtros actuales (útil para compartir enlaces)
        return JSON.stringify(this.filters);
    }

    importFilters(filtersJson) {
        // Importar filtros desde JSON
        try {
            const imported = JSON.parse(filtersJson);
            this.filters = { ...this.filters, ...imported };
            this.resetFilterUI();
            this.applyFilters();
        } catch (error) {
            console.error('Error al importar filtros:', error);
        }
    }

    // Filtros por URL parameters
    updateURLParams() {
        const params = new URLSearchParams();

        if (this.filters.category !== 'all') params.set('category', this.filters.category);
        if (this.filters.search) params.set('search', this.filters.search);
        if (this.filters.minPrice > 0) params.set('minPrice', this.filters.minPrice);
        if (this.filters.maxPrice < 2000) params.set('maxPrice', this.filters.maxPrice);
        if (this.filters.brands.length > 0) params.set('brands', this.filters.brands.join(','));
        if (this.filters.sortBy !== 'name') params.set('sort', this.filters.sortBy);

        const newURL = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
        window.history.replaceState({}, '', newURL);
    }

    loadFromURLParams() {
        const params = new URLSearchParams(window.location.search);

        if (params.has('category')) this.filters.category = params.get('category');
        if (params.has('search')) this.filters.search = params.get('search');
        if (params.has('minPrice')) this.filters.minPrice = parseInt(params.get('minPrice'));
        if (params.has('maxPrice')) this.filters.maxPrice = parseInt(params.get('maxPrice'));
        if (params.has('brands')) this.filters.brands = params.get('brands').split(',');
        if (params.has('sort')) this.filters.sortBy = params.get('sort');

        this.resetFilterUI();
        this.applyFilters();
    }
}

// Exportar para uso global
if (typeof window !== 'undefined') {
    window.FilterManager = FilterManager;
}
