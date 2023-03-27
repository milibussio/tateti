//
// El trablero representa el estado del juego
// Cada cuadrado posee una celda
// Creamos un método llamado colocarJugada para marcar la jugada
//

function tableroDeJuego(){
  const filas = 3;
  const columnas = 3;
  const tablero = [];

  // Ahora vamos a crear el 2d array que va a representar al tablero
  // Fila 0 es la fila de arriba
  // Columna 0 es la columna de la izquierda
  // Vamos a usar un loop-anidado para esto
  for(let i = 0; i < filas; i++){
    tablero[i] = [];
    for(let j = 0; j < columnas; j++){
      tablero[i].push((celda()));
    }
  };

  // Este es el método para conseguir todo el tablero
  const getTablero = () => tablero;

  // Para colocar una jugada, tenemos que asegurarnos que la celda esté vacía
  // Luego de eso, tenemos que cambiar la celda al número del jugador
  const colocarJugada = (fila, columna, jugador) => {
    const celdaDisponible = (tablero[fila][columna]) === 0;
    if (celdaDisponible) {return}; 
    tablero[fila][columna].agregarJugada(jugador);
  };

  // Este método es para dibujar el tablero y estado en la consolta
  // No va a ser necesario una vez que tegnamos la UI
  const imprimirTablero = () => {
    const tableroConValores = tablero.map((fila) => fila.map((celda) => celda.getValor()))
    console.log(tableroConValores);
    };
    
  // Aplicamos return para hacer públicas las varaibles que necesitamos  
  return { getTablero, colocarJugada, imprimirTablero};
}

// 
// Una celda es un cuadrado del tablero
// 0: no hay nada en ese lugar
// 1: token del jugador 1
// 2: token del jugador 2
//

function celda(){
  let valor = 0;

  // recibir el token del jugador
  const agregarJugada = (jugador) => {
    valor = jugador;
  };
  
  // Devlver los valores para que sean públicos y no estén dentro del closure
  const getValor = () => valor;
  return {agregarJugada, getValor};
}

// 
// El juegoController va a ser responsable de controlar 
// el flujo y el estado del juego
// y tamién si alguien gana
//

function juegoController(
  jugadorUnoNombre = "Jugador 1",
  jugadorDosNombre = "Jugador 2"
){
  const tablero = tableroDeJuego();
  const jugadores = [
    {
      nombre: jugadorUnoNombre,
      token: 1  
    },
    {
      nombre: jugadorDosNombre,
      token: 2
    }
  ];

  let jugadorActivo = jugadores[0];

  const cambiarTurnoJugador = () => {
    jugadorActivo = jugadorActivo === jugadores[0] ? jugadores[1]: jugadores[0];
  };

  const getJugadorActivo = () => jugadorActivo;

  const imprimirNuevaRonda = () => {
    tablero.imprimirTablero();
    console.log(`Es el turno del ${getJugadorActivo().nombre}`);
  };

  const jugarRonda = (fila, columna) => {
    // que el jugador activo coloque su token
    console.log(`colocando la ficha del ${getJugadorActivo().nombre} en la coordenada (${fila},${columna})`);
    tablero.colocarJugada(fila, columna, getJugadorActivo().token);

    // ACA VA LA LÓGICA PARA VER SI ALGUIEN GANÓ

    //cambiar de jugador
    cambiarTurnoJugador();
    imprimirNuevaRonda();
  };
  
  // iniciar juego
    imprimirNuevaRonda();
    while (true){
      let fila = prompt("F");
      let columna = prompt("C");
      jugarRonda(fila, columna);
      getJugadorActivo();
    };


  // para la consola solo necesitamos jugarRonda
  // para UI también vamos a necesitar jugador activo, así que devolveremos ambos

  return {jugarRonda, getJugadorActivo};
}

const juego = juegoController();
