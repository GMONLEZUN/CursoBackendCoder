const socket = io();

const productTitle = document.getElementById("productTitle");
const productDescription = document.getElementById("productDescription");
const productPrice = document.getElementById("productPrice");
const productThumbnail = document.getElementById("productThumbnail");
const productCode = document.getElementById("productCode"); 
const productStock = document.getElementById("productStock");

const deleteBtns = document.querySelectorAll('.btnEliminar');

document.getElementById('productForm').addEventListener('submit',e =>{
    e.preventDefault();
   
    socket.emit("addProduct",{
        title: productTitle.value,
        description: productDescription.value,
        price: productPrice.value,
        thumbnail: productThumbnail.value,
        code: productCode.value,
        stock: productStock
    })
    
    productTitle.value = "";
    productDescription.value = "";
    productPrice.value = "";
    productThumbnail.value = "";
    productCode.value = "";
    productStock.value = "";
    
    socket.on("updateList", (products) => {
        updateProductList(products);
      });
})

deleteBtns.forEach(btn => {
    btn.addEventListener('click', e =>{
        const productId = e.target.getAttribute('data-id')
        socket.emit('deleteProduct', {
            id: productId
        })
        socket.on("updateList", (products) => {
            updateProductList(products);
          });
    })
});

// Actualizar la lista de productos
function updateProductList(products) {
    const productList = document.getElementById("productList");
    productList.innerHTML = "";
  
    products.forEach((product) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <p>Título: ${product.title}</p>
        <p>Descripción: ${product.description}</p>
        <p>Precio: ${product.price}</p>
        <p>Thumbnail: ${product.thumbnail}</p>
        <button class="btnEliminar" data-id="${product.id}">Eliminar</button>
      `;
  
      // Agregar el evento de clic al botón de eliminación
      const btnEliminar = li.querySelector(".btnEliminar");
      btnEliminar.addEventListener('click', e =>{
        const productId = e.target.getAttribute('data-id')
        socket.emit('deleteProduct', {
            id: productId
        })
        socket.on("updateList", (products) => {
            updateProductList(products);
          });
    })
  
      productList.appendChild(li);
    });
  }