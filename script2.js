// Quiero crear un tablero, que es una matriz 3x3
// Quiero tener objetos jugadores, con su nombre, token y estado?
// Quiero poner el token del jugador en la matriz, si es su turno y si no está ocupado el espacio
// Quiero revisar si hay un ganador en la matriz o no // controler?
// Quiero solitiar otra acción o avisar el resultado

// Quiero crear un tablero
// Lo voy a hacer con un módulo, una IIFE (Inmediatly Invoked Function Expression)

function gameBoardModule () {
    const filas = 3;
    const columnas = 3;
    const tablero = [] // array vacío

    for(let i = 0; i < filas; i++){
        tablero[i] = [];
        for(let j = 0; j < columnas; j++){
          tablero[i].push(0);
        }
      };
    return tablero
;}

function jugadorFactory (nombre, token, activo, marca){
    const jugador = {
    nombre,
    token,
    activo,
    marca,

    ponerPieza(tablero, casilla){
        if (casilla === "celda1"){
            tablero[0][0] = token;
        } else if (casilla === "celda2"){
            tablero[0][1] = token;
        } else if (casilla === "celda3"){
            tablero[0][2] = token;
        } else if (casilla === "celda4"){
            tablero[1][0] = token;
        } else if (casilla === "celda5"){
            tablero[1][1] = token;
        } else if (casilla === "celda6"){
            tablero[1][2] = token;
        } else if (casilla === "celda7"){
            tablero[2][0] = token;
        } else if (casilla === "celda8"){
            tablero[2][1] = token;
        } else if (casilla === "celda9"){
            tablero[2][2] = token;
        } 
        console.log(tablero);
        return(tablero);
        }    
    }
    return jugador 
};

function juegoControllerModule(){
    // creo el tablero
    let tablero = gameBoardModule();
    
    // creo los jugadores
    const jugador1 = jugadorFactory("p1", 1, 1, "X");
    const jugador2 = jugadorFactory("p2", 4, 0, "O");
    
    // condicion de victoria
    function condicion(){
        // filas
        let fila1 = tablero[0][0] + tablero[0][1] + tablero[0][2]
        let fila2 = tablero[1][0] + tablero[1][1] + tablero[1][2]
        let fila3 = tablero[2][0] + tablero[2][1] + tablero[2][2]
        // columnas 
        let columna1 = tablero[0][0] + tablero[1][0] + tablero[2][0]
        let columna2 = tablero[0][1] + tablero[1][1] + tablero[2][1]
        let columna3 = tablero[0][2] + tablero[1][2] + tablero[2][2]
        // diagonales
        let diagonal1 = tablero[0][0] + tablero[1][1] + tablero[2][2]
        let diagonal2 = tablero[0][2] + tablero[1][1] + tablero[2][0]
        // array con resultados
        let resultados = [fila1, fila2, fila3, columna1, columna2, columna3, diagonal1, diagonal2]
        // ¿ganador?
        return (resultados.includes(3) || resultados.includes(12))
    }

    window.addEventListener("click", function(e){
        /// pintar casilla
        try{
            const casilla = document.querySelector(`[id="${e.target.id}"]`)
            const titulo = document.getElementById("titulo")
            if (casilla.id.includes("celda")){
                if (jugador1.activo === 1 && casilla.textContent === "" && condicion() === false){
                    jugador1.ponerPieza(tablero, casilla.id)
                    casilla.textContent = "X"
                    titulo.textContent = "Juega O"
                    jugador1.activo = 0;
                    jugador2.activo = 1;
                } else if (jugador2.activo === 1 && casilla.textContent === "" && condicion() === false){
                    jugador2.ponerPieza(tablero, casilla.id)
                    casilla.textContent = "O"
                    titulo.textContent = "Juega X"
                    jugador1.activo = 1;
                    jugador2.activo = 0;
                }
            // ¿ganó?
            if (condicion()){
                if (jugador1.activo === 0){
                    titulo.textContent = "¡Felicidades X!"
                } else {

                    titulo.textContent = "¡Felicidades O!"                }            
            } else if (!tablero[0].includes(0) && !tablero[1].includes(0) && !tablero[2].includes(0)){
                titulo.textContent = "¡Empate!"
            } 
        /// borrar
            } else if (casilla.id.includes("reiniciar")){
                let celdas = document.querySelectorAll(".celda");
                celdas.forEach((celda) => (celda.textContent= ""));
                jugador1.activo = 1;
                titulo.textContent = "Juega X"
                tablero = gameBoardModule();
            }
        }
        catch (err){}
    })
};


const juego = juegoControllerModule();

