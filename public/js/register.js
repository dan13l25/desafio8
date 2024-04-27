const form = document.getElementById("loginForm");
const errorMessage = document.getElementById("errorMessage"); // Definir el elemento errorMessage

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const obj = {};
  data.forEach((value, key) => (obj[key] = value));
  
  fetch("/api/users/login", {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  })
  .then(response => {
    if (response.status === 200) {
        return response.json();
    } else {
        errorMessage.textContent = 'Este email ya es un usuario. Logueate'; 
        errorMessage.style.display = 'block';
        throw new Error('Credenciales incorrectas');
    }
  })
  .then(data => {
    const token = data.access_token; 
    localStorage.setItem('token', token); 
    console.log("Token:", token);
    console.log("Inicio de sesión exitoso!");
    window.location.href = "http://localhost:8080/api/products/"; 
  })
  .catch(error => {
    console.error('Error en el inicio de sesión:', error);
  });
});
