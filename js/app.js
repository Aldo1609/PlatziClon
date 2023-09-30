// Variables

let articulosCarrito = [];
const carritoCompras = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const limpiarCarrito = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');



registroEventListeners();
function registroEventListeners(){
    listaCursos.addEventListener('click', añadirCurso);

    carritoCompras.addEventListener('click', eliminarCurso);

    limpiarCarrito.addEventListener('click', () =>{
        articulosCarrito = [];

        borrarHTML();
    })
}

// Funciones

function añadirCurso(evento) {
    evento.preventDefault();


    if(evento.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = evento.target.parentElement.parentElement;
        leerDatos(cursoSeleccionado);
    }


}

function eliminarCurso(evento) {
    if(evento.target.classList.contains('borrar-curso')){
        const cursoId = evento.target.getAttribute('data-id');

        // Elimina del arreglo de articulosCarrito por el data-ID
        articulosCarrito = articulosCarrito.filter( datos => datos.id !== cursoId);

        carritoHTML(); // iterar sobre el carrito y mostrar su HTML
    }
}


function leerDatos(datos) {
    console.log(datos);

    // Crear un objeto con el contenido del curso actual
    const infoCurso = {
        img: datos.querySelector('img').src,
        titulo: datos.querySelector('h4').textContent,
        precio: datos.querySelector('.precio span').textContent,
        id: datos.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    // Revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some( datos => datos.id === infoCurso.id);
    if(existe){
        const cursos = articulosCarrito.map( datos => {
            if(datos.id === infoCurso.id){
                datos.cantidad++;
                return datos;
            }else{
                return datos;
            }
        } );
    }else{
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    carritoHTML();
}

// Muestra el carrito de compras en el HTML
function carritoHTML() {

    borrarHTML();

    // Recorre el carrito y genera el HTML
    articulosCarrito.forEach( datos => {
        const { img, titulo, precio, cantidad} = datos;
        const rows = document.createElement('tr');
        rows.innerHTML = `
            <td> <img src="${img}" width="150"> </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>

            <td>
                <a href="#" class="borrar-curso" data-id="${datos.id}"> X </a>
            </td>
        `;
        contenedorCarrito.appendChild(rows);
    } )

}

function borrarHTML() {
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}

