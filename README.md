# 🖥️ PC Hardware Store - E-commerce Vanilla

Un e-commerce moderno y responsivo para venta de componentes de PC, desarrollado con **HTML5**, **CSS3** y **JavaScript vanilla** (sin frameworks).

## 🚀 Características

### 🎯 Funcionalidades Principales

-   **Catálogo de productos** con información detallada
-   **Sistema de filtros** avanzado (categoría, precio, marca, búsqueda)
-   **Carrito de compras** con persistencia en localStorage
-   **Vista de productos** en grilla y lista
-   **Modal de producto** con especificaciones completas
-   **Sistema de notificaciones** en tiempo real
-   **Responsive design** para todos los dispositivos

### 💻 Productos Incluidos

-   **Procesadores** (AMD Ryzen, Intel Core)
-   **Tarjetas Gráficas** (NVIDIA RTX, AMD Radeon)
-   **Memoria RAM** (DDR4, DDR5)
-   **Placas Madre** (AMD AM5, Intel LGA1700)
-   **Almacenamiento** (SSD NVMe)

### 🎨 Características de UI/UX

-   **Diseño moderno** con sistema de colores coherente
-   **Animaciones fluidas** y transiciones suaves
-   **Header sticky** con efectos de scroll
-   **Loading states** y feedback visual
-   **Sistema de notificaciones** toast
-   **Búsqueda en tiempo real**
-   **Filtros colaborativos**

## 🛠️ Tecnologías

-   **HTML5** - Estructura semántica
-   **CSS3** - Variables CSS, Grid, Flexbox, Animaciones
-   **JavaScript ES6+** - Clases, Modules, Local Storage
-   **Font Awesome** - Iconografía
-   **Google Fonts** - Tipografía

## 📁 Estructura del Proyecto

```
ecommerce-pc-hardware-vanilla/
├── index.html              # Página principal
├── css/
│   ├── main.css            # Estilos principales y variables
│   └── components/
│       ├── header.css      # Estilos del header
│       ├── product-card.css # Estilos de tarjetas de producto
│       ├── cart.css        # Estilos del carrito
│       ├── filters.css     # Estilos de filtros
│       └── modal.css       # Estilos de modales
├── js/
│   ├── app.js              # Aplicación principal
│   └── modules/
│       ├── ProductManager.js # Gestión de productos
│       ├── CartManager.js    # Gestión del carrito
│       ├── FilterManager.js  # Gestión de filtros
│       └── UIManager.js      # Gestión de UI y efectos
├── data/
│   └── products.js         # Base de datos de productos
└── images/                 # Imágenes del proyecto
```

## 🚀 Cómo Ejecutar

### Opción 1: Python HTTP Server (Recomendado)

```bash
# Navegar al directorio del proyecto
cd ecommerce-pc-hardware-vanilla

# Ejecutar servidor HTTP con Python 3
python -m http.server 3000

# Abrir en el navegador
http://localhost:3000
```

### Opción 2: VS Code Live Server

1. Instalar la extensión "Live Server" en VS Code
2. Abrir el proyecto en VS Code
3. Click derecho en `index.html` > "Open with Live Server"

### Opción 3: Cualquier servidor web local

-   XAMPP, WAMP, MAMP
-   Node.js `npx serve`
-   Nginx, Apache

## 🎮 Funcionalidades

### 🛍️ Gestión de Productos

-   **Visualización** en grilla o lista
-   **Filtrado** por categoría, precio, marca
-   **Búsqueda** por nombre o descripción
-   **Ordenamiento** por precio, nombre, rating
-   **Modal detallado** con especificaciones completas

### 🛒 Carrito de Compras

-   **Añadir/quitar** productos
-   **Modificar cantidades**
-   **Persistencia** en localStorage
-   **Cálculo automático** de totales
-   **Validación de stock**

### 🔍 Sistema de Filtros

-   **Filtros por categoría** en la navegación
-   **Rango de precios** con sliders
-   **Filtros por marca** con checkboxes
-   **Búsqueda en tiempo real**
-   **Ordenamiento múltiple**
-   **Limpiar filtros** con un click

### 📱 Responsive Design

-   **Mobile-first** approach
-   **Breakpoints** optimizados
-   **Touch-friendly** para dispositivos móviles
-   **Navegación adaptativa**

## ⌨️ Atajos de Teclado

-   `Ctrl/Cmd + K` - Enfocar búsqueda
-   `Ctrl/Cmd + Shift + C` - Abrir/cerrar carrito
-   `Escape` - Cerrar modales y carrito

## 🔧 Debugging

En la consola del navegador están disponibles estos comandos:

```javascript
// Ver estado de la aplicación
debugApp.getState();

// Reiniciar aplicación
debugApp.restart();

// Exportar datos del carrito
debugApp.export();

// Limpiar carrito
debugApp.clearCart();

// Limpiar filtros
debugApp.clearFilters();
```

## 🌟 Características Técnicas

### 🏗️ Arquitectura

-   **Modular** - Cada funcionalidad en su propio módulo
-   **Escalable** - Fácil añadir nuevas características
-   **Mantenible** - Código limpio y bien documentado
-   **Reutilizable** - Componentes independientes

### 🎨 CSS Avanzado

-   **Variables CSS** para theming consistente
-   **CSS Grid** y **Flexbox** para layouts
-   **Animaciones CSS** optimizadas
-   **Mobile-first** responsive design

### 🧩 JavaScript Moderno

-   **ES6+ Classes** para organización
-   **Async/Await** para operaciones asíncronas
-   **Local Storage** para persistencia
-   **Event Delegation** para performance
-   **Intersection Observer** para lazy loading

## 🔮 Funcionalidades Futuras

-   [ ] Wishlist/Favoritos persistente
-   [ ] Comparación de productos
-   [ ] Reviews y ratings de usuarios
-   [ ] Integración con APIs de pago
-   [ ] Sistema de usuarios y autenticación
-   [ ] Notificaciones push
-   [ ] PWA (Progressive Web App)
-   [ ] Dark mode
-   [ ] Múltiples idiomas
-   [ ] Análisis y métricas

## 📝 Notas de Desarrollo

### 🎯 Buenas Prácticas Implementadas

-   **Separación de responsabilidades**
-   **Código modular y reutilizable**
-   **Manejo de errores robusto**
-   **Performance optimizado**
-   **Accessibility considerations**
-   **SEO friendly**

### 🐛 Debugging Tips

-   Usar las herramientas de desarrollador del navegador
-   Los comandos `debugApp.*` en consola
-   Verificar la consola para errores y logs
-   Usar el inspector de elementos para CSS

## 👨‍💻 Desarrollo

Este proyecto fue desarrollado como una demostración de e-commerce moderno usando solo tecnologías web nativas, sin dependencias de frameworks externos.

### 🎨 Personalización

-   Modificar variables CSS en `css/main.css`
-   Añadir productos en `data/products.js`
-   Crear nuevos componentes en `css/components/`
-   Extender funcionalidades en `js/modules/`

¡Perfecto para aprender desarrollo web frontend moderno! 🚀
