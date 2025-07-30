const productsData = [
    // Procesadores
    {
        id: 1,
        name: "AMD Ryzen 9 7950X",
        category: "cpu",
        brand: "AMD",
        price: 699.99,
        originalPrice: 799.99,
        image: "images/cpu-amd.svg",
        rating: 4.8,
        reviews: 245,
        specs: {
            "Núcleos": "16",
            "Hilos": "32",
            "Frecuencia Base": "4.5 GHz",
            "Frecuencia Boost": "5.7 GHz"
        },
        features: ["Socket AM5", "Arquitectura Zen 4", "Proceso 5nm", "PCIe 5.0"],
        stock: 15,
        description: "El procesador más potente de AMD para gaming y productividad extrema.",
        tags: ["nuevo", "popular"]
    },
    {
        id: 2,
        name: "Intel Core i9-13900K",
        category: "cpu",
        brand: "Intel",
        price: 589.99,
        originalPrice: 639.99,
        image: "images/cpu-intel.svg",
        rating: 4.7,
        reviews: 189,
        specs: {
            "Núcleos": "24",
            "Hilos": "32",
            "Frecuencia Base": "3.0 GHz",
            "Frecuencia Boost": "5.8 GHz"
        },
        features: ["Socket LGA1700", "Arquitectura Raptor Lake", "Proceso Intel 7", "PCIe 5.0"],
        stock: 8,
        description: "Procesador Intel de 13va generación con arquitectura híbrida.",
        tags: ["oferta"]
    },
    {
        id: 3,
        name: "AMD Ryzen 7 7700X",
        category: "cpu",
        brand: "AMD",
        price: 399.99,
        image: "images/cpu-amd.svg",
        rating: 4.6,
        reviews: 312,
        specs: {
            "Núcleos": "8",
            "Hilos": "16",
            "Frecuencia Base": "4.5 GHz",
            "Frecuencia Boost": "5.4 GHz"
        },
        features: ["Socket AM5", "Arquitectura Zen 4", "Proceso 5nm", "PCIe 5.0"],
        stock: 23,
        description: "Equilibrio perfecto entre rendimiento y precio para gaming.",
        tags: ["popular"]
    },

    // Tarjetas Gráficas
    {
        id: 4,
        name: "NVIDIA RTX 4090",
        category: "gpu",
        brand: "NVIDIA",
        price: 1599.99,
        originalPrice: 1699.99,
        image: "images/gpu-nvidia.svg",
        rating: 4.9,
        reviews: 156,
        specs: {
            "VRAM": "24GB GDDR6X",
            "Núcleos CUDA": "16384",
            "Frecuencia Base": "2230 MHz",
            "Frecuencia Boost": "2520 MHz"
        },
        features: ["Ray Tracing", "DLSS 3", "4K Gaming", "8K Capable"],
        stock: 5,
        description: "La tarjeta gráfica más potente del mercado para gaming 4K y creación de contenido.",
        tags: ["premium", "popular"]
    },
    {
        id: 5,
        name: "AMD Radeon RX 7900 XTX",
        category: "gpu",
        brand: "AMD",
        price: 999.99,
        originalPrice: 1099.99,
        image: "images/gpu-amd.svg",
        rating: 4.7,
        reviews: 98,
        specs: {
            "VRAM": "24GB GDDR6",
            "Núcleos de Cómputo": "6144",
            "Frecuencia Game": "2300 MHz",
            "Frecuencia Boost": "2500 MHz"
        },
        features: ["Ray Tracing", "FSR 3", "4K Gaming", "AV1 Encoding"],
        stock: 12,
        description: "Tarjeta gráfica de gama alta de AMD con excelente relación precio-rendimiento.",
        tags: ["oferta"]
    },
    {
        id: 6,
        name: "NVIDIA RTX 4070 Ti",
        category: "gpu",
        brand: "NVIDIA",
        price: 799.99,
        image: "images/gpu-nvidia.svg",
        rating: 4.6,
        reviews: 203,
        specs: {
            "VRAM": "12GB GDDR6X",
            "Núcleos CUDA": "7680",
            "Frecuencia Base": "2310 MHz",
            "Frecuencia Boost": "2610 MHz"
        },
        features: ["Ray Tracing", "DLSS 3", "1440p Gaming", "Efficient"],
        stock: 18,
        description: "Perfecta para gaming 1440p con Ray Tracing habilitado.",
        tags: ["popular"]
    },

    // Memoria RAM
    {
        id: 7,
        name: "Corsair Dominator Platinum RGB 32GB DDR5-5600",
        category: "ram",
        brand: "Corsair",
        price: 299.99,
        originalPrice: 349.99,
        image: "images/ram.svg",
        rating: 4.8,
        reviews: 167,
        specs: {
            "Capacidad": "32GB (2x16GB)",
            "Tipo": "DDR5",
            "Velocidad": "5600 MHz",
            "Latencia": "CL36"
        },
        features: ["RGB Lighting", "XMP 3.0", "Premium Heat Spreader", "Lifetime Warranty"],
        stock: 25,
        description: "Memoria RAM premium con iluminación RGB y alto rendimiento.",
        tags: ["oferta", "rgb"]
    },
    {
        id: 8,
        name: "G.Skill Trident Z5 Neo 32GB DDR5-6000",
        category: "ram",
        brand: "G.Skill",
        price: 279.99,
        image: "images/ram.svg",
        rating: 4.7,
        reviews: 142,
        specs: {
            "Capacidad": "32GB (2x16GB)",
            "Tipo": "DDR5",
            "Velocidad": "6000 MHz",
            "Latencia": "CL30"
        },
        features: ["AMD EXPO", "Intel XMP 3.0", "Optimized for Ryzen", "Aluminum Heat Spreader"],
        stock: 19,
        description: "Memoria optimizada para procesadores AMD Ryzen serie 7000.",
        tags: ["amd-optimized"]
    },
    {
        id: 9,
        name: "Kingston Fury Beast 16GB DDR4-3200",
        category: "ram",
        brand: "Kingston",
        price: 89.99,
        originalPrice: 109.99,
        image: "images/ram.svg",
        rating: 4.5,
        reviews: 289,
        specs: {
            "Capacidad": "16GB (2x8GB)",
            "Tipo": "DDR4",
            "Velocidad": "3200 MHz",
            "Latencia": "CL16"
        },
        features: ["Plug N Play", "Intel XMP", "Low Profile", "100% Tested"],
        stock: 45,
        description: "Memoria confiable y económica para builds de rendimiento.",
        tags: ["oferta", "budget"]
    },

    // Placas Madre
    {
        id: 10,
        name: "ASUS ROG Strix X670E-E Gaming WiFi",
        category: "motherboard",
        brand: "ASUS",
        price: 499.99,
        originalPrice: 549.99,
        image: "images/motherboard.svg",
        rating: 4.8,
        reviews: 134,
        specs: {
            "Socket": "AM5",
            "Chipset": "X670E",
            "Factor de Forma": "ATX",
            "Slots RAM": "4 x DDR5"
        },
        features: ["WiFi 6E", "PCIe 5.0", "USB4", "2.5G Ethernet", "RGB Lighting"],
        stock: 7,
        description: "Placa madre premium para procesadores AMD Ryzen serie 7000.",
        tags: ["oferta", "premium"]
    },
    {
        id: 11,
        name: "MSI MAG B650 Tomahawk WiFi",
        category: "motherboard",
        brand: "MSI",
        price: 249.99,
        image: "images/motherboard.svg",
        rating: 4.6,
        reviews: 198,
        specs: {
            "Socket": "AM5",
            "Chipset": "B650",
            "Factor de Forma": "ATX",
            "Slots RAM": "4 x DDR5"
        },
        features: ["WiFi 6", "PCIe 4.0", "USB 3.2", "Mystic Light RGB"],
        stock: 16,
        description: "Excelente relación precio-rendimiento para builds AMD.",
        tags: ["popular", "value"]
    },
    {
        id: 12,
        name: "Gigabyte Z790 AORUS Elite AX",
        category: "motherboard",
        brand: "Gigabyte",
        price: 329.99,
        originalPrice: 369.99,
        image: "images/motherboard.svg",
        rating: 4.7,
        reviews: 156,
        specs: {
            "Socket": "LGA1700",
            "Chipset": "Z790",
            "Factor de Forma": "ATX",
            "Slots RAM": "4 x DDR5"
        },
        features: ["WiFi 6E", "PCIe 5.0", "Thunderbolt 4", "RGB Fusion"],
        stock: 11,
        description: "Placa madre Z790 con conectividad avanzada para Intel.",
        tags: ["oferta", "intel"]
    },

    // Almacenamiento
    {
        id: 13,
        name: "Samsung 980 PRO 2TB NVMe SSD",
        category: "storage",
        brand: "Samsung",
        price: 199.99,
        originalPrice: 249.99,
        image: "images/ssd.svg",
        rating: 4.9,
        reviews: 412,
        specs: {
            "Capacidad": "2TB",
            "Interfaz": "NVMe PCIe 4.0",
            "Lectura Secuencial": "7000 MB/s",
            "Escritura Secuencial": "6900 MB/s"
        },
        features: ["PCIe 4.0", "V-NAND 3bit MLC", "Heat Spreader", "5 Year Warranty"],
        stock: 32,
        description: "SSD NVMe de alto rendimiento para gaming y creación de contenido.",
        tags: ["oferta", "popular", "high-speed"]
    },
    {
        id: 14,
        name: "WD Black SN850X 1TB NVMe SSD",
        category: "storage",
        brand: "Western Digital",
        price: 129.99,
        image: "images/ssd.svg",
        rating: 4.7,
        reviews: 298,
        specs: {
            "Capacidad": "1TB",
            "Interfaz": "NVMe PCIe 4.0",
            "Lectura Secuencial": "7300 MB/s",
            "Escritura Secuencial": "6600 MB/s"
        },
        features: ["Gaming Optimized", "RGB Heatsink", "Game Mode 2.0", "5 Year Warranty"],
        stock: 28,
        description: "SSD gaming optimizado con heatsink RGB incluido.",
        tags: ["gaming", "rgb"]
    },
    {
        id: 15,
        name: "Seagate FireCuda 530 4TB NVMe SSD",
        category: "storage",
        brand: "Seagate",
        price: 399.99,
        originalPrice: 479.99,
        image: "images/ssd.svg",
        rating: 4.6,
        reviews: 87,
        specs: {
            "Capacidad": "4TB",
            "Interfaz": "NVMe PCIe 4.0",
            "Lectura Secuencial": "7300 MB/s",
            "Escritura Secuencial": "6900 MB/s"
        },
        features: ["High Capacity", "Rescue Recovery Services", "Low Power", "5 Year Warranty"],
        stock: 9,
        description: "SSD de alta capacidad para almacenamiento masivo y rendimiento.",
        tags: ["oferta", "high-capacity"]
    }
];

// Configuración de categorías
const categories = {
    all: "Todos los Productos",
    cpu: "Procesadores",
    gpu: "Tarjetas Gráficas",
    ram: "Memoria RAM",
    motherboard: "Placas Madre",
    storage: "Almacenamiento"
};

// Configuración de marcas
const brands = {
    "AMD": { name: "AMD", count: 0 },
    "Intel": { name: "Intel", count: 0 },
    "NVIDIA": { name: "NVIDIA", count: 0 },
    "Corsair": { name: "Corsair", count: 0 },
    "G.Skill": { name: "G.Skill", count: 0 },
    "Kingston": { name: "Kingston", count: 0 },
    "ASUS": { name: "ASUS", count: 0 },
    "MSI": { name: "MSI", count: 0 },
    "Gigabyte": { name: "Gigabyte", count: 0 },
    "Samsung": { name: "Samsung", count: 0 },
    "Western Digital": { name: "Western Digital", count: 0 },
    "Seagate": { name: "Seagate", count: 0 }
};

// Función para obtener productos
function getProducts() {
    // Actualizar contadores de marcas
    Object.keys(brands).forEach(brand => brands[brand].count = 0);
    productsData.forEach(product => {
        if (brands[product.brand]) {
            brands[product.brand].count++;
        }
    });

    return productsData;
}

// Función para obtener producto por ID
function getProductById(id) {
    return productsData.find(product => product.id === parseInt(id));
}

// Función para filtrar productos
function filterProducts(filters = {}) {
    let filtered = [...productsData];

    // Filtrar por categoría
    if (filters.category && filters.category !== 'all') {
        filtered = filtered.filter(product => product.category === filters.category);
    }

    // Filtrar por rango de precio
    if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
        filtered = filtered.filter(product => {
            const price = product.price;
            return (!filters.minPrice || price >= filters.minPrice) &&
                (!filters.maxPrice || price <= filters.maxPrice);
        });
    }

    // Filtrar por marcas
    if (filters.brands && filters.brands.length > 0) {
        filtered = filtered.filter(product => filters.brands.includes(product.brand));
    }

    // Filtrar por búsqueda de texto
    if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        filtered = filtered.filter(product =>
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm) ||
            product.brand.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm)
        );
    }

    // Ordenar resultados
    if (filters.sortBy) {
        filtered.sort((a, b) => {
            switch (filters.sortBy) {
                case 'price-low':
                    return a.price - b.price;
                case 'price-high':
                    return b.price - a.price;
                case 'rating':
                    return b.rating - a.rating;
                case 'name':
                default:
                    return a.name.localeCompare(b.name);
            }
        });
    }

    return filtered;
}

// Función para obtener productos relacionados
function getRelatedProducts(productId, limit = 4) {
    const product = getProductById(productId);
    if (!product) return [];

    return productsData
        .filter(p => p.id !== productId && p.category === product.category)
        .sort(() => Math.random() - 0.5)
        .slice(0, limit);
}

// Exportar datos para uso en otros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        productsData,
        categories,
        brands,
        getProducts,
        getProductById,
        filterProducts,
        getRelatedProducts
    };
}

// Hacer disponibles globalmente en el navegador
if (typeof window !== 'undefined') {
    window.productsData = productsData;
    window.categories = categories;
    window.brands = brands;
    window.getProducts = getProducts;
    window.getProductById = getProductById;
    window.filterProducts = filterProducts;
    window.getRelatedProducts = getRelatedProducts;
}
