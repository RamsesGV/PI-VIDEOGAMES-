import React from "react";
import styles from './styles/Pages.module.css';

const { pagedContainer, pagedButtonsContainer, btn} = styles;

/*
export default function Paged(props) 
{ ... }: Exporta por defecto una función anónima como 
el componente Paged que recibe props como argumento.
 */
export default function Paged(props) {
  /*
  const { videoGamesPP, allVideoGames, paged } = props: 
  Utiliza la desestructuración de objetos para extraer las 
  propiedades videoGamesPP, allVideoGames y paged de las props recibidas.
   */
  const { videoGamesPP, allVideoGames, paged } = props;

  /*
  let pageNumbers = []: 
  Crea una variable pageNumbers como una matriz vacía 
  que se utilizará para almacenar los números de página.
   */
  let pageNumbers = [];

  /*
  Utiliza un bucle for para generar los números de página 
  y agregarlos a la matriz pageNumbers. 
  La cantidad de números de página se calcula dividiendo 
  la cantidad total de videojuegos (allVideoGames) 
  por la cantidad de videojuegos por página (videoGamesPP), 
  y redondeando hacia arriba utilizando Math.ceil()
   */
  for (let i = 1; i <= Math.ceil(allVideoGames / videoGamesPP); i++) {
    pageNumbers.push(i);
  }

  /*
  Utiliza la sintaxis de JSX 
  y el método map() para generar una serie de elementos de botón 
  basados en los números de página almacenados en pageNumbers. 
  El operador && se utiliza para asegurarse de que pageNumbers 
  tenga un valor antes de realizar el mapeo.
   */
  return (
    <nav className={pagedContainer}>
      <ul className={pagedButtonsContainer}>
        {pageNumbers && pageNumbers.map(n => (
          <button key={n} className={btn} onClick={() => paged(n)}>{n}</button>
        ))}
      </ul>
    </nav>
  );
}