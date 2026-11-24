const formulario = document.getElementById("formLogin");
const usuario = document.getElementById("usuario");
const clave = document.getElementById("clave");
const mensaje = document.getElementById("mensaje");
const verClave = document.getElementById("verClave");

verClave.addEventListener("click", () => {
  const mostrar = clave.type === "password";
  clave.type = mostrar ? "text" : "password";
  verClave.textContent = mostrar ? "Ocultar" : "Ver";
  verClave.setAttribute("aria-label", mostrar ? "Ocultar contraseña" : "Mostrar contraseña");
});

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const nombre = usuario.value.trim();
  const password = clave.value;

  mensaje.classList.remove("ok");

  if (nombre === "" || password.trim() === "") {
    mensaje.textContent = "Por favor, completa el usuario y la contraseña.";
    return;
  }

  const cuentas = [
    { usuario: "cliente", clave: "1234" },
    { usuario: "admin", clave: "admin123" }
  ];

  const cuentaValida = cuentas.find(cuenta =>
    cuenta.usuario === nombre.toLowerCase() && cuenta.clave === password
  );

  if (!cuentaValida) {
    mensaje.textContent = "Usuario o contraseña incorrectos.";
    return;
  }

  sessionStorage.setItem("tecnoUsuario", cuentaValida.usuario);
  window.location.href = "catalogo.html";
});
