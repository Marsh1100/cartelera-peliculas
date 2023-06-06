
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
//Películas individuales
let minions = new Map([["titulo","Los minions"],["genero","Animada"],["duracion","2h 15m"],["director","Juan Martínez"],["imagen","https://es.web.img3.acsta.net/pictures/15/02/04/12/29/183973.jpg"]]);
let frozen = new Map([["titulo","Frozen"],["genero","Animada"],["duracion","1h 48m"],["director","Jennifer Lee"],["imagen","https://lumiere-a.akamaihd.net/v1/images/p_frozen_18373_3131259c.jpeg?region=0%2C0%2C540%2C810"]]);

let peliculas =new Map([
    ["0",new Map([
        ["titulo","Los minions"],
        ["genero","Animada"],
        ["duracion","1h 31m"],
        ["director","Pierre Coffin"],
        ["imagen","https://es.web.img3.acsta.net/pictures/15/02/04/12/29/183973.jpg"]
    ])],
        
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
mostrarPeliculas(peliculas);
//Evento submit del formulario
form.addEventListener('submit',function(e){
    e.preventDefault(); // Evitar el envío del formulario
    e.stopPropagation();

    let namePeli =String(peliculas.size);
    console.log(namePeli);

    let pelicula = new Map();
    pelicula.set("titulo",titulo.value);
    pelicula.set("genero",genero.value);
    pelicula.set("duracion",duracion.value);
    pelicula.set("director",director.value);
    pelicula.set("imagen",imagen.value);

    peliculas.set(namePeli,pelicula)

    mostrarPeliculas(peliculas);
    
    form.reset();
    document.getElementById('agregar-peli').style.display='none';

});

function mostrarPeliculas(pelis){

    contenedorPeliculas.innerHTML="";
    pelis.forEach(function(e,index){

        //console.log(e)
        let idd = "peli"+String(index);
       // console.log((idd))
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


//Capturar el boton buscar
const botonBuscar = document.getElementById('buscar-peli');
let nombrePeli = document.getElementById('nombrePelicula');

botonBuscar.addEventListener('click',function(){
    let mostrarPeliBuscar = new Map ();

    let peliBuscar = nombrePeli.value.toUpperCase();
    let contador = 0;
    peliculas.forEach(function(value,key){
        console.log(peliculas.get(key).get("titulo"));
        let titulo = peliculas.get(key).get("titulo").toUpperCase();
        
        if(titulo.includes(peliBuscar)){
            mostrarPeliBuscar.set(contador,value);
            contador += 1;
        }
    });

    if(mostrarPeliBuscar.size>0){
        console.log(mostrarPeliBuscar)
        mostrarPeliculas(mostrarPeliBuscar);
    }else{
        mostrarPeliculas(peliculas);
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



