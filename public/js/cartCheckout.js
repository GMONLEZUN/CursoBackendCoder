const countProds = document.querySelector('.countProducts')
const currCartID = localStorage.getItem("cartIdStored");


document.addEventListener('DOMContentLoaded', async e =>{
    let result = await fetch(`/cart/${currCartID}/totalprods`);
    let data = await result.json();
    countProds.innerText = data.count;
})
