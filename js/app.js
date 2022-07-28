//Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];


cargarEventListeners ();

function cargarEventListeners () {
    //Cuando agregas un curso presionando "Agregar al Carrito"
    listaCursos.addEventListener ('click', agregarCurso);

    //Eliminar curso
    carrito.addEventListener('click', eliminarCurso);

    //Vaciar carrito

    vaciarCarritoBtn.addEventListener('click', () => {
       articulosCarrito = [];

      vaciarHTML();
    });


}




//Funciones

function agregarCurso (e) {
    e.preventDefault();


    if (e.target.classList.contains('agregar-carrito')) {
        const curso = e.target.parentElement.parentElement;
        leerDatosCurso (curso);

        

    }

}

//Eliminar curso

function eliminarCurso (e) {
   
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');
        
        //Elimina arreglo
        articulosCarrito = articulosCarrito.filter (curso=>curso.id !== cursoId)
        
        carritoHTML();
   }

    
}




//Leer el html

function leerDatosCurso (curso){
    //console.log(curso)

//Crear un obejto curso actual
    const infoCurso = {
        imagen: curso.querySelector ('img').src,
        titulo: curso.querySelector ('h4').textContent,
        precio: curso.querySelector ('.precio span').textContent,
        id: curso.querySelector ('a').getAttribute ('data-id'),
        cantidad: 1,
    }




console.log(infoCurso);

//Agregar elementos al arreglo

if( articulosCarrito.some( curso => curso.id === infoCurso.id ) ) { 
    const cursos = articulosCarrito.map( curso => {
         if( curso.id === infoCurso.id ) {
              curso.cantidad++;
               return curso;
          } else {
               return curso;
       }
    })
    articulosCarrito = [...cursos];
}  else {
    articulosCarrito = [...articulosCarrito, infoCurso];
}

// console.log(articulosCarrito)



// console.log(articulosCarrito)
carritoHTML();
}


    //Muestra carrito en html

    function carritoHTML (){

        //Limpiar html

    vaciarHTML();


        articulosCarrito.forEach(curso => {
          const {imagen, titulo, precio, cantidad, id} = curso;
            const row = document.createElement ('tr');
            row.innerHTML = `
            <td>
                <img src = "${imagen}" width="100">
            </td>
            
            <td>${titulo} </td>
            <td>${precio} </td>
            <td>${cantidad} </td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}"> X <a/>
            </td>

            
            `;
            //Agrega html en tb
            contenedorCarrito.appendChild(row);
        })
    }


//Elimina cursos
function vaciarHTML() {
    //contenedorCarrito.innerHTML = '';

    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}










