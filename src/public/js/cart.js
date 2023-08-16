const addToCartBtns = document.querySelectorAll('.btnAddToCart');

const viewCart = document.querySelector('.viewCart');

let currentCartID;

async function getCartId() {
    currentCartID = localStorage.getItem("cartIdStored") 
    
    if (!currentCartID) { 
        const res = await fetch("/cart", {
            method:"POST",
        });
        const data = await res.json();
        currentCartID = await data.data._id;
    }
    localStorage.setItem("cartIdStored",currentCartID)
    return currentCartID;
}

getCartId()


addToCartBtns.forEach(btn =>{
    btn.addEventListener('click', async e =>{
        const productID = e.target.getAttribute('data-id');
        const res = await fetch(`/cart/${currentCartID}/product/${productID}`, {
            method:"POST"
        });
    })
})



viewCart.addEventListener('click', e => {
    window.open(`/cart/${currentCartID}`, "_blank")
})



const limit = document.getElementById('limit');

limit.addEventListener('click', async e =>{

  window.location.href = '/products?limit=3'
})