let currentCartID;
let frontUser;

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
    console.log({result})
    return result;
  } catch (error) {
    console.log(error)
  }
}


async function getCartId(frontUser) {
  currentCartID = localStorage.getItem("cartIdStored");
  storedUser = localStorage.getItem('storedUser');
  
  if (!currentCartID || frontUser != storedUser) { 
      const res = await fetch("/cart", {
          method:"POST",
      });
      const data = await res.json();
      currentCartID = await data.data._id;
      localStorage.setItem('storedUser', frontUser)
      localStorage.setItem("cartIdStored",currentCartID)
  }
  return currentCartID;
}



const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", async e => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  currentCartID = await getCartId(username);
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