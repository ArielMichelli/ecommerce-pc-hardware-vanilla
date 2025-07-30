// Script de depuración para imágenes
document.addEventListener('DOMContentLoaded', function () {
    // Verificar carga de imágenes
    const images = document.querySelectorAll('.product-image img');

    images.forEach((img, index) => {
        img.addEventListener('load', function () {
            console.log(`✅ Imagen ${index + 1} cargada correctamente:`, this.src);
        });

        img.addEventListener('error', function (e) {
            console.error(`❌ Error cargando imagen ${index + 1}:`, this.src);
            console.error('Error details:', e);

            // Aplicar placeholder
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxyZWN0IHg9IjE3NSIgeT0iMTI1IiB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiM5Q0E0QjIiLz4KPHN2Zz4K';
            this.style.backgroundColor = '#f3f4f6';
            this.style.border = '2px dashed #9ca3af';
        });
    });

    // Mostrar estadísticas
    setTimeout(() => {
        const totalImages = images.length;
        const loadedImages = Array.from(images).filter(img => img.complete && img.naturalHeight !== 0).length;
        console.log(`📊 Estadísticas de carga: ${loadedImages}/${totalImages} imágenes cargadas`);
    }, 3000);
});
