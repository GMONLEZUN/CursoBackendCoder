async function postSignup(first_name, last_name, age, username, password) {
  const data = {
    first_name,
    last_name,
    age,
    email: username,
    password,
  };

  const response = await fetch("/api/session/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  return result;
}

const signupForm = document.getElementById("signup-form");

signupForm.addEventListener("submit", async e => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const first_name = document.getElementById("first_name").value;
  const last_name = document.getElementById("last_name").value;
  const age = document.getElementById("age").value;

  const res = await postSignup(first_name, last_name, age, username, password) 
  if (res.status == 'ok'){
    window.location.href = '/products'
  }
  else{
    window.location.reload();
  }
  
  ;
});
