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

function jugadorFactory (nombre, token, activo){
    const jugador = {
    nombre,
    token,
    activo,

    ponerPieza(tablero){
        let fila = prompt("Indica coordenada de fila");
        let columna = prompt("Indica coordenada de columna");    
        tablero[fila][columna] = token;
    }
    
    }
    return jugador 
};

function juegoControllerModule(){
    // creo el tablero
    const tablero = gameBoardModule();
    console.log (tablero);

    // creo los jugadores
    const jugador1 = jugadorFactory("p1", 1, 1);
    const jugador2 = jugadorFactory("p2", 4, 0);
    
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

    // juego
    while(condicion() === false){
        if (jugador1.activo === 1){
            jugador1.ponerPieza(tablero)
            jugador1.activo = 0;
            jugador2.activo = 1;
        } else {
            jugador2.ponerPieza(tablero)
            jugador1.activo = 1;
            jugador2.activo = 0;
        }
        console.log(tablero);       
    }

    // ¿quién ganó?
    if (jugador1.activo === 0){
        console.log('Felicidades jugador 1')
    } else {
        console.log('Felicidades jugador 2')
    }
};

const juego = juegoControllerModule();
