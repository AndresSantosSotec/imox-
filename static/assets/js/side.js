const toggleButton = document.getElementById("menu-toggle");
        toggleButton.addEventListener("click", function () {
            const sidebar = document.querySelector(".sidebar");
            const mainContent = document.querySelector(".main-content");
            const listGroupItems = document.querySelectorAll(".list-group-item");
            sidebar.classList.toggle("collapsed");
            mainContent.classList.toggle("expanded");

            // Agrega/elimina la clase 'collapsed' a los elementos de la lista para ocultar el texto
            listGroupItems.forEach(item => {
                item.classList.toggle("collapsed");
            });
        });