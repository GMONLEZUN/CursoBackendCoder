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


const sortNone = document.getElementById('sin');
const sortMayor = document.getElementById('mayor');
const sortMenor = document.getElementById('menor');

const limit = document.getElementById('limit');

limit.addEventListener('click', async e =>{
    if(limit.checked){
        if (sortNone.checked) {
            window.location.href = '/products?limit=3&sorted=0'
        } else if (sortMayor.checked){
            window.location.href = '/products?limit=3&sorted=-1'
        } else {
            window.location.href = '/products?limit=3&sorted=1'
        }
    } else {
        if (sortNone.checked) {
            window.location.href = '/products?&sorted=0'
        } else if (sortMayor.checked){
            window.location.href = '/products?&sorted=-1'
        } else {
            window.location.href = '/products?&sorted=1'
        }
    }
})

sortNone.addEventListener('click', e=>{
    if (limit.checked) {
        window.location.href = '/products?limit=3&sorted=0';
    } else {
        window.location.href = '/products?sorted=0';
    }
})

sortMayor.addEventListener('click', e=>{
    if (limit.checked) {
        window.location.href = '/products?limit=3&sorted=-1';
    } else {
        window.location.href = '/products?sorted=-1';
    }
})

sortMenor.addEventListener('click', e=>{
    if (limit.checked) {
        window.location.href = '/products?limit=3&sorted=1';
    } else {
        window.location.href = '/products?sorted=1';
    }
})

const searchForm = document.getElementById('searchForm');

searchForm.addEventListener('change', e =>{
    let value = e.target.value;
    window.location.href = `/products?search=${value}`
})

const logout = document.querySelector('.logout');

logout.addEventListener('click', async (e)=>{
    const res = await fetch(`/api/session/logout`, {
        method:"GET"
    });
    console.log(res)
    if(res.ok){
        window.location.href = '/'
    }
})
