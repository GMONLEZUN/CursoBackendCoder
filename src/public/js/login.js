async function postLogin(username, password) {
  try {
    const response = await fetch("/api/session/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    
    const result = await response.json();
    return result;

  } catch (error) {
    console.log(error)
  }
}

const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", async e => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const response = await postLogin(username, password);
  console.log({response})
  // if(response.status == 'ok'){
  //   window.location.href = '/products';
  // } else {
  //   window.location.href = '/signup'
  // }
});


const registerBtn = document.getElementById('registrate');

registerBtn.addEventListener('click', e => {
    window.location.href = '/signup'
})


const forgotPassBtn = document.getElementById('forgotPass');

forgotPassBtn.addEventListener('click', e => {
    window.location.href = '/forgot'
})