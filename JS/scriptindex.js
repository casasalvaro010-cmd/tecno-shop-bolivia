const productosDisponibles = [
  { id: 1, nombre: "Laptop", categoria: "computadoras", descripcion: "Computadora portátil", precio: 4200, icono: "💻" },
  { id: 2, nombre: "PC de escritorio", categoria: "computadoras", descripcion: "Equipo para estudio y trabajo", precio: 5100, icono: "🖥️" },
  { id: 3, nombre: "Celular Android", categoria: "celulares", descripcion: "Smartphone moderno", precio: 1850, icono: "📱" },
  { id: 4, nombre: "Tablet", categoria: "celulares", descripcion: "Pantalla táctil portátil", precio: 1350, icono: "📲" },
  { id: 5, nombre: "Audífonos", categoria: "audio", descripcion: "Audio estéreo", precio: 220, icono: "🎧" },
  { id: 6, nombre: "Parlante Bluetooth", categoria: "audio", descripcion: "Sonido inalámbrico", precio: 320, icono: "🔊" },
  { id: 7, nombre: "Teclado", categoria: "accesorios", descripcion: "Teclado USB", precio: 150, icono: "⌨️" },
  { id: 8, nombre: "Mouse inalámbrico", categoria: "accesorios", descripcion: "Mouse óptico", precio: 95, icono: "🖱️" }
];

const productosContenedor = document.getElementById("productos");
const listaCarrito = document.getElementById("listaCarrito");
const totalElemento = document.getElementById("total");
const contador = document.getElementById("contador");
const tituloCategoria = document.getElementById("tituloCategoria");
const mensajeCompra = document.getElementById("mensajeCompra");
const carrito = [];

const formatoBs = valor => "Bs " + valor.toLocaleString("es-BO");

const nombresCategorias = {
  todos: "Todos los productos",
  computadoras: "Computadoras",
  celulares: "Celulares y tablets",
  audio: "Audio",
  accesorios: "Accesorios"
};

function mostrarProductos(filtro = "todos") {
  const lista = filtro === "todos"
    ? productosDisponibles
    : productosDisponibles.filter(producto => producto.categoria === filtro);

  tituloCategoria.textContent = nombresCategorias[filtro] || "Todos los productos";
  contador.textContent = lista.length + (lista.length === 1 ? " producto" : " productos");
  productosContenedor.innerHTML = "";

  lista.forEach(producto => {
    const tarjeta = document.createElement("article");
    tarjeta.className = "producto";
    tarjeta.innerHTML = `
      <div class="producto__img" aria-hidden="true">${producto.icono}</div>
      <div class="producto__info">
        <h3>${producto.nombre}</h3>
        <p class="categoria">${producto.descripcion}</p>
        <p class="precio">${formatoBs(producto.precio)}</p>
        <button type="button" data-agregar="${producto.id}">Agregar al carrito</button>
      </div>`;
    productosContenedor.appendChild(tarjeta);
  });
}

function mostrarCarrito() {
  listaCarrito.innerHTML = "";
  if (carrito.length === 0) {
    const vacio = document.createElement("li");
    vacio.className = "vacio";
    vacio.textContent = "Tu carrito está vacío.";
    listaCarrito.appendChild(vacio);
  } else {
    carrito.forEach((item, indice) => {
      const fila = document.createElement("li");
      const nombre = document.createElement("span");
      nombre.textContent = item.nombre + " × " + item.cantidad;
      const precio = document.createElement("strong");
      precio.textContent = formatoBs(item.precio * item.cantidad);
      fila.append(nombre, precio);
      listaCarrito.appendChild(fila);
    });
  }
  const total = carrito.reduce((suma, item) => suma + item.precio * item.cantidad, 0);
  totalElemento.textContent = formatoBs(total);
}

productosContenedor.addEventListener("click", evento => {
  const boton = evento.target.closest("[data-agregar]");
  if (!boton) return;
  const producto = productosDisponibles.find(p => p.id === Number(boton.dataset.agregar));
  const existente = carrito.find(item => item.id === producto.id);
  if (existente) existente.cantidad++;
  else carrito.push({ ...producto, cantidad: 1 });
  mensajeCompra.textContent = "";
  mostrarCarrito();
});

document.querySelectorAll("[data-filtro]").forEach(enlace => {
  enlace.addEventListener("click", () => {
    document.querySelectorAll("[data-filtro]").forEach(item => item.classList.remove("activo"));
    enlace.classList.add("activo");
    mostrarProductos(enlace.dataset.filtro);
    cerrarMenu();
  });
});

const menu = document.getElementById("menuLateral");
const fondo = document.getElementById("fondo");
const btnMenu = document.getElementById("btnMenu");

function abrirMenu() {
  menu.classList.add("abierto");
  fondo.hidden = false;
  btnMenu.setAttribute("aria-expanded", "true");
}
function cerrarMenu() {
  menu.classList.remove("abierto");
  fondo.hidden = true;
  btnMenu.setAttribute("aria-expanded", "false");
}
btnMenu.addEventListener("click", abrirMenu);
document.getElementById("btnCerrar").addEventListener("click", cerrarMenu);
fondo.addEventListener("click", cerrarMenu);

const nombreUsuario = sessionStorage.getItem("tecnoUsuario");
if (!nombreUsuario) {
  window.location.href = "index.html";
} else {
  document.getElementById("saludo").textContent = "Hola, " + nombreUsuario;
}

document.getElementById("btnSalir").addEventListener("click", () => {
  sessionStorage.removeItem("tecnoUsuario");
  window.location.href = "index.html";
});

document.getElementById("btnVaciar").addEventListener("click", () => {
  carrito.length = 0;
  mensajeCompra.textContent = "";
  mostrarCarrito();
});

document.getElementById("btnComprar").addEventListener("click", () => {
  if (carrito.length === 0) {
    mensajeCompra.textContent = "Agrega al menos un producto antes de confirmar.";
    mensajeCompra.style.color = "#B3261E";
    return;
  }
  const total = carrito.reduce((suma, item) => suma + item.precio * item.cantidad, 0);
  mensajeCompra.textContent = "Compra de prueba registrada. Total: " + formatoBs(total) + ".";
  mensajeCompra.style.color = "#167044";
});

mostrarProductos();
mostrarCarrito();
