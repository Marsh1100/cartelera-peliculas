

//Boton agregar
const botonAgregar = document.getElementById('agregar-pelicula');

botonAgregar.addEventListener('click',function(){
    
    document.getElementById('agregar-peli').style.display='flex';
});

//Contenedor main
let contenedorPeliculas = document.getElementById('main-peliculas');
//Datos del formulario 
let titulo = document.getElementById('titulo');
let genero = document.getElementById('genero');
let duracion = document.getElementById('duracion');
let director = document.getElementById('director');
let imagen = document.getElementById('imagen');

//Formulario
let form = document.getElementById('nueva-pelicula');

let peliculas = [];
let posicion;
form.addEventListener('submit',function(e){
    e.preventDefault(); // Evitar el envío del formulario
    e.stopPropagation();

    let pelicula = new Map();
    pelicula.set("titulo",titulo.value);
    pelicula.set("genero",genero.value);
    pelicula.set("duracion",duracion.value);
    pelicula.set("director",director.value);
    pelicula.set("imagen",imagen.value);


    peliculas.push(pelicula);
    posicion = peliculas.length-1;

    //poner en el html
    let nuevaPelicula = document.createElement("div");
    nuevaPelicula.setAttribute("class","peliculas");
    nuevaPelicula.setAttribute("id", posicion);

    contenedorPeliculas.appendChild(nuevaPelicula);

    
    asignarPeliculas(posicion);
    
    form.reset();
    document.getElementById('agregar-peli').style.display='none';

});

console.log(peliculas)

//Falta mejorar porque no esta recorriendo el mapa
function asignarPeliculas(posicion){
    let idd = "p"+String(posicion);
    console.log(idd);
    document.getElementById(`${posicion}`).innerHTML=`
    <h4>${peliculas[posicion].get("titulo")}</h4>
    <img type="image" src="${peliculas[posicion].get("imagen")}" class="imagenes">
    <div class="info-peliculas" >
        <p><b>Género:</b>${peliculas[posicion].get("genero")}</p>
        <p><b>Duración:</b>${peliculas[posicion].get("duracion")}</p>
        <p><b>Director</b>${peliculas[posicion].get("director")}</p>
        <button class="bi bi-trash-fill" id="${idd}"></button>
    </div>

    `;

};



document.addEventListener('click',function(event){

    console.log(event.target.id)
    try {
        if(document.getElementById(event.target.id).className == 'bi bi-trash-fill'){
        
        
            if(event.target.id!=null){
                let targetElementId = document.getElementById(event.target.id).parentNode.parentNode
    
                console.log(targetElementId)
            
                targetElementId.parentNode.removeChild(targetElementId)
                
            }
        }
    } catch (error) {
        
    }
    
    
    
});



