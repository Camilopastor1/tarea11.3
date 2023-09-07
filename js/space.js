document.addEventListener("DOMContentLoaded", function () {
    const inputBuscar = document.getElementById("inputBuscar");
    const btnBuscar = document.getElementById("btnBuscar");
    const contenedor = document.getElementById("contenedor");
  
    btnBuscar.addEventListener("click", function () {
      const textoBusqueda = inputBuscar.value.trim();
      if (textoBusqueda !== "") {
        buscarImagenes(textoBusqueda);
      }
    });
  
    function buscarImagenes(query) {
      const url = `https://images-api.nasa.gov/search?q=${query}`;
  
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          mostrarResultados(data.collection.items);
        })
        .catch((error) => {
          console.error("Error al buscar imágenes:", error);
        });
    }
  
    function mostrarResultados(items) {
      contenedor.innerHTML = ""; 
  
      const gridContainer = document.createElement("div");
      gridContainer.classList.add("imagen-grid"); 
  
      items.forEach((item) => {
        const imgSrc = item.links[0].href;
        const title = item.data[0].title;
        const description = item.data[0].description;
        const dateCreated = item.data[0].date_created;
  
        const imagen = document.createElement("div");
        imagen.classList.add("imagen-item"); 
  
        const img = document.createElement("img");
        img.src = imgSrc;
        img.alt = title;
  
        const titulo = document.createElement("h2");
        titulo.textContent = title;
  
        const descripcion = document.createElement("p");
        descripcion.textContent = description;
  
        const fecha = document.createElement("p");
        fecha.textContent = "Fecha de creación: " + dateCreated;
  
        imagen.appendChild(img);
        imagen.appendChild(titulo);
        imagen.appendChild(descripcion);
        imagen.appendChild(fecha);
  
        gridContainer.appendChild(imagen);
      });
  
      contenedor.appendChild(gridContainer);
    }
  });