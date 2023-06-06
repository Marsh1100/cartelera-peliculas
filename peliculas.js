
//Boton agregar
const botonAgregar = document.getElementById('agregar-pelicula');
botonAgregar.addEventListener('click',function(){
    document.getElementById('main').style.filter='blur(5px)';
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

//Mapa de películas 
let peliculas =new Map([
    /* ["0",new Map([
        ["titulo","Los minions"],
        ["genero","Animada"],
        ["duracion","1h 31m"],
        ["director","Pierre Coffin"],
        ["imagen","https://es.web.img3.acsta.net/pictures/15/02/04/12/29/183973.jpg"]
    ])], */
        
    ["1",new Map([
            ["titulo","Frozen"],
            ["genero","Animada"],
            ["duracion","1h 48m"],
            ["director","Darren Aronofsky"],
            ["imagen","https://lumiere-a.akamaihd.net/v1/images/p_frozen_18373_3131259c.jpeg?region=0%2C0%2C540%2C810"]
    ])],

    ["2",new Map([
            ["titulo","La Ballena"],
            ["genero","Drama"],
            ["duracion","1h 57m"],
            ["director","Jennifer Lee"],
            ["imagen","https://cloudfront-us-east-1.images.arcpublishing.com/semana/OLPZSRUWXZEVTB7LR2PXIS3N74.jpeg"]
    ])],

    ["3",new Map([
            ["titulo","Jumanji 2"],
            ["genero","Drama"],
            ["duracion","2h 3m"],
            ["director","Jake Kasdan"],
            ["imagen","https://es.web.img3.acsta.net/pictures/19/11/04/11/54/1194009.jpg"]
    ])],
        
]);

// Función para recorrer el mapa de peliculas
function mostrarPeliculas(pelis){
    // Se inicializa el contenedor main vacio
    contenedorPeliculas.innerHTML="";

    pelis.forEach(function(e,index){

        let idd = "peli"+String(index);

        let nuevaPelicula = document.createElement("div");
        nuevaPelicula.setAttribute("class","peliculas");
        nuevaPelicula.setAttribute("id", index);

        contenedorPeliculas.appendChild(nuevaPelicula);

        document.getElementById(`${index}`).innerHTML=`
        <h4>${e.get("titulo")}</h4>
        <img type="image" src="${e.get("imagen")}" class="imagenes">
        <div class="info-peliculas" >
            <p><b>Género:</b>${e.get("genero")}</p>
            <p><b>Duración:</b>${e.get("duracion")}</p>
            <p><b>Director</b>${e.get("director")}</p>
            <button class="bi bi-trash-fill" id="${idd}"></button>
        </div>`;
    });
        
};

//Función Validar URL
function validarURL(miurl) {
    try {
   
      new URL(miurl);
      return true;
   
    } catch (err) {
   
      return false;
   
    }
  }
//Inicializar las películas (que se muestran en el HTML)
mostrarPeliculas(peliculas);

//Evento submit del formulario Crear nueva película
form.addEventListener('submit',function(e){
    e.preventDefault(); // Evitar el envío del formulario
    e.stopPropagation();

    //Creación del mapa con la información
    let pelicula = new Map();
    pelicula.set("titulo",titulo.value);
    pelicula.set("genero",genero.value);
    pelicula.set("duracion",duracion.value);
    pelicula.set("director",director.value);

    if(validarURL(imagen.value)){
        pelicula.set("imagen",imagen.value);
    }else{
        pelicula.set("imagen","https://previews.123rf.com/images/candyman/candyman0705/candyman070500301/949420-vertical-tira-de-pel%C3%ADcula.jpg");
    }

    


    //Key único para identificar nueva pelicula
    let keyPeli = uuid.v1();
    console.log(keyPeli);

    //Asignación de la nueva película al mapa de peliculas
    peliculas.set(keyPeli,pelicula)

    mostrarPeliculas(peliculas);
    
    form.reset();
    document.getElementById('agregar-peli').style.display='none';
    document.getElementById('main').style.filter='';
    

});



//Capturar el boton buscar
const botonBuscar = document.getElementById('buscar-peli');
let nombrePeli = document.getElementById('nombrePelicula');

botonBuscar.addEventListener('click',function(){
    //Mapa para contener las peliculas que tienen similitudes de búsqueda
    let mapaPeliBuscar = new Map ();

    let peliBuscar = nombrePeli.value.toUpperCase();

    if (peliBuscar==''){
        mostrarPeliculas(peliculas);
        return
    }

    let contador = 0;
    //Se recorre el mapa de películas para comparar con la búsqueda del placeholder
    peliculas.forEach(function(value,key){
        let titulo = peliculas.get(key).get("titulo").toUpperCase();
        
        if(titulo.includes(peliBuscar)){
            mapaPeliBuscar.set(contador,value);
            contador += 1;
        }
    });

    if(mapaPeliBuscar.size>0){
        mostrarPeliculas(mapaPeliBuscar);
    }else{
        Swal.fire({
            //title: 'Sweet!',
            text: 'No se encuentra la película que estás buscando...',
            imageUrl: 'https://cdn-icons-png.flaticon.com/512/3770/3770668.png',
            imageWidth: 200,
            imageAlt: 'Custom image',
          })
    }

});


//Eliminar película
document.addEventListener('click',function(event){
    try {
        if(document.getElementById(event.target.id).className == 'bi bi-trash-fill'){
            //targetElementId obtiene todo el conjunto del padre div según ID
            //let targetElementId = document.getElementById(event.target.id).parentNode.parentNode
            //targetElementId.parentNode.removeChild(targetElementId);

            let targetId = document.getElementById(event.target.id).parentNode.parentNode.id;
            peliculas.delete(targetId);
            console.log(peliculas);

            mostrarPeliculas(peliculas);
            
        }
    } catch (error) {  
    }
});



//form asignado en el HTML las nuevas pelis

/* 
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

}); */


/* //Falta mejorar porque no esta recorriendo el mapa
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


//Borrar sin Map
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
}); */



