async function setCookie(name, lastname) {
  const response = await fetch(`/setCookie?name=${name}&lastname=${lastname}`);
  const data = await response.json();
  return data;
}

async function postLogin(username, password) {
  console.log("postlogin", username, password);
  const response = await fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  const result = await response.json();

  return result;
}

const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  postLogin(username, password).then((datos) => console.log(datos));

  //********************** */

  //se usa en el ejemplo de cookies
  //const name = document.getElementById("name").value;
  //const lastname = document.getElementById("apellido").value;

  //console.log("Usuario:", name);
  //console.log("Contraseña:", lastname);

  //setCookie(name, lastname).then((datos) => console.log(datos));
  //********************** */
});
