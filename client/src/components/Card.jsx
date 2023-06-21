/*
Card es un componente funcional en React
que representa una tarjeta de visualización de información
 */

import React from 'react'
import styles from './styles/Card.module.css'

/*
Define el componente Card como una función de flecha que recibe 
props como argumento. 
Las props contienen los datos que se pasan al componente 
desde su componente padre.
 */
const Card = (props) => {

    /*
    Extrae las propiedades name, img y genres del objeto props 
    para poder utilizarlas directamente en el componente.
     */
    const {
        name,
        img,
        genres
    } = props

    const { card, cardImage, h3 } = styles
    return (


        /*
        Renderiza un encabezado h3 con la clase CSS h3. 
        El contenido del encabezado es el nombre del juego (name).
        Si la longitud del nombre es mayor a 24 caracteres, 
        se muestra una versión truncada del nombre 
        utilizando el método slice(0, 23). 
        De lo contrario, se muestra el nombre completo.
         */

        /*
        Renderiza un encabezado h6 para mostrar los géneros del juego (genres).
         */

        <div className={card}>
            <h3 className={h3}>{name?.length > 24 ? name.slice(0, 23) : name}</h3>
            <div className={cardImage} style={{ backgroundImage: `url(${img})` }} />
            <h6> {genres}</h6>
        </div>

    )
}
/*
Exporta el componente Card para poder utilizarlo en otros componentes de la aplicación.
 */
export default Card

/*
En resumen, el componente Card representa una tarjeta de visualización 
de información que muestra el nombre de un juego, su imagen y sus géneros. 
Se utiliza para representar visualmente los datos de un juego
en la interfaz de usuario.
 */