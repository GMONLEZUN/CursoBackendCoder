async function postLogin(username, password, currentCartID) {
  try {
    const response = await fetch("/api/session/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, currentCartID }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error)
  }
}

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
  console.log(currentCartID)
  localStorage.setItem("cartIdStored",currentCartID)
  return currentCartID;
}

getCartId()

const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", async e => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const response = await postLogin(username, password, currentCartID);
  if(response.status == 'ok'){
    window.location.href = '/products';
  } else {
    window.location.href = '/signup'
  }
});


const registerBtn = document.getElementById('registrate');

registerBtn.addEventListener('click', e => {
    window.location.href = '/signup'
})


const forgotPassBtn = document.getElementById('forgotPass');

forgotPassBtn.addEventListener('click', e => {
    window.location.href = '/forgot'
})