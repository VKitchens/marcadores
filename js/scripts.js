document.addEventListener("DOMContentLoaded", function () {
    // Seleccionar la imagen que actúa como botón
    const toggleImage = document.getElementById('toggleImage');
    // Seleccionar todos los elementos con la clase 'oculto'
    const elementos = document.querySelectorAll('.oculto');

    // Añadir un Event Listener a la imagen
    toggleImage.addEventListener('click', function () {
        elementos.forEach(element => {
            // Alternar visibilidad de cada elemento
            if (element.style.display === 'none' || element.style.display === '') {
                element.style.display = 'block';
            } else {
                element.style.display = 'none';
            }
        });
    });
});

// Función de debounce para mejorar el rendimiento del filtrado
function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

// Filtrar elementos de portafolio y separadores
const searchInput = document.getElementById('searchInput');
const clearButton = document.getElementById('clearButton');

// Limpiar el campo de búsqueda al cargar la página
window.addEventListener('load', function () {
    searchInput.value = ''; // Vaciar el campo de búsqueda
    filterItems(''); // Mostrar todos los elementos al cargar la página
});

// Filtrar elementos basados en la búsqueda
searchInput.addEventListener('input', debounce(function () {
    const searchQuery = this.value.toLowerCase().trim(); // Convertir a minúsculas y quitar espacios
    filterItems(searchQuery);
}, 300)); // 300 ms de retardo

// Función para filtrar elementos
function filterItems(searchQuery) {
    const items = document.querySelectorAll('.portfolio-item');
    const separators = document.querySelectorAll('.separador');

    let hasVisibleItems = false; // Variable para comprobar si hay elementos visibles

    items.forEach(item => {
        const images = item.querySelectorAll('img'); // Obtener todas las imágenes dentro del item
        let matchesQuery = false; // Bandera para verificar si alguna imagen coincide

        // Verificar si alguna imagen contiene el término de búsqueda
        images.forEach(img => {
            const imgSrc = img.getAttribute('src').toLowerCase(); // Obtener la ruta completa de la imagen
            const imgName = imgSrc.substring(imgSrc.lastIndexOf('/') + 1); // Extraer solo el nombre de la imagen

            if (imgName.includes(searchQuery)) {
                matchesQuery = true; // Marcar como coincidente si alguna imagen coincide
            }
        });

        if (matchesQuery || searchQuery === '') {
            item.style.display = 'block'; // Mostrar elemento si coincide
            hasVisibleItems = true; // Marcar que hay al menos un elemento visible
        } else {
            item.style.display = 'none'; // Ocultar elemento si no coincide
        }
    });

    // Ocultar todos los separadores si hay un término de búsqueda
    separators.forEach(separator => {
        separator.style.display = searchQuery === '' ? 'block' : 'none';
    });

    // Si no hay ningún elemento visible, ocultar todos los separadores
    if (!hasVisibleItems) {
        separators.forEach(separator => {
            separator.style.display = 'none';
        });
    }
}

// Evento para borrar el contenido del campo de búsqueda
clearButton.addEventListener('click', function () {
    searchInput.value = ''; // Vaciar el campo de búsqueda
    filterItems(''); // Mostrar todos los elementos
});