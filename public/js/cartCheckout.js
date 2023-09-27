const countProds = document.querySelector('.countProducts')
const currCartID = localStorage.getItem("cartIdStored");
const confirmPurchaseBTN = document.querySelector('.confirmPurchaseBTN')

document.addEventListener('DOMContentLoaded', async e =>{
    let result = await fetch(`/cart/${currCartID}/totalprods`);
    let data = await result.json();
    countProds.innerText = data.count;
})

confirmPurchaseBTN.addEventListener('click', async e =>{
    let result = await fetch(`/cart/${currCartID}/purchase`);
    let data = await result.json();
    console.log({data})
})