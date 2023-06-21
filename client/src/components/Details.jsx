import React, { useEffect } from 'react';
/*
Importa las funciones useDispatch y useSelector de la biblioteca 
react-redux. 
Estas funciones se utilizan para conectar el componente 
con el store de Redux y acceder al estado y despachar acciones.
 */
import { useDispatch, useSelector } from "react-redux";
/*
Importa la función useHistory de la biblioteca react-router-dom. 
Esta función se utiliza para acceder al objeto history 
y redireccionar a rutas diferentes.
 */
import { useHistory } from 'react-router-dom';
import styles from './styles/Details.module.css'
//import { Link } from 'react-router-dom'

/*
Importa las acciones getDetailVideoGame y deleteVideoGame 
desde el archivo index.js ubicado en la carpeta actions. 
Estas acciones son utilizadas para 
obtener los detalles de un videojuego y eliminar un videojuego respectivamente.
 */
import { getDetailVideoGame, deleteVideoGame } from '../actions/index.js';


/*
Define el componente Details como una función de flecha 
que recibe props como argumento. 
Las props contienen los datos que se pasan al componente 
desde su componente padre.
 */
const Details = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    /*
    Crea una variable detailVideoGame utilizando la función 
    useSelector para acceder al estado details del store de Redux. 
    Esto permite obtener los detalles del videojuego seleccionado.
    */
    const detailVideoGame = useSelector((state) => state.details);

    /*
    Utiliza el hook useEffect para ejecutar un efecto secundario 
    cuando el componente se monta o cuando cambia el valor de 
    props.match.params.id.
    El efecto secundario llama a la acción getDetailVideoGame 
    utilizando dispatch para obtener los detalles del 
    videojuego con el ID proporcionado en props.match.params.id.
     */
    useEffect(() => {
        dispatch(getDetailVideoGame(props.match.params.id))
    }, [dispatch, props.match.params.id])


    /*
    Define una función handleDeleteGame que se ejecuta cuando 
    se hace clic en el botón "Delete game".
    Esta función muestra un mensaje de confirmación y, 
    si el usuario confirma, 
    envía la acción deleteVideoGame utilizando dispatch 
    para eliminar el videojuego con el ID proporcionado 
    en props.match.params.id.
    Luego redirecciona al usuario a la página de inicio 
    y actualiza la página.
     */
    const handleDeleteGame = (e) => {
        e.preventDefault()
        let resultado = window.confirm('Estas seguro que desea eliminar este juego?');
        if (resultado === true) {
            window.alert('Juego borrado con éxito');
            dispatch(deleteVideoGame(props.match.params.id));
            history.push(`/home`);
            window.location.replace('');
        }

    }

    const { backgroundImage, containerDetails, deleteGame } = styles


    /*
    Utiliza una expresión condicional para renderizar 
    diferentes elementos según el valor de detailVideoGame.createdInDb.
    Si createdInDb es true, 
    renderiza los detalles del videojuego desde el objeto 
    detailVideoGame obtenido del estado.
     */

    return (
        <div className={backgroundImage}>
            {detailVideoGame.createdInDb === true
                ?
                <div className={containerDetails}>
                    <h1>
                        {detailVideoGame?.name}
                    </h1>
                    <img
                        src={detailVideoGame?.image}
                        alt='imagen'
                    />
                    <h4>Released at: {(detailVideoGame?.releaseDate).slice(0, 10)}</h4>
                    <h4>Rating: {detailVideoGame?.rating}</h4>
                    <h4>Description:
                        <p dangerouslySetInnerHTML={{ __html: detailVideoGame?.description }}></p>
                    </h4>
                    <h3>Platforms: {detailVideoGame.platforms?.map(el => el).join(' - ')}</h3>
                    <h3>
                        Genres: {detailVideoGame.genres?.map(el => el.name).join(' - ')}
                    </h3>
                {/*// <Link to={`/editVideoGame/${detailVideoGame.id}`}>
                       // <button>Modify...</button>
                        </Link> */}



                    <button className={deleteGame} onClick={(e) => handleDeleteGame(e)}>Delete game</button>
                </div>
                :
                <div className={containerDetails}>
                    <h1>
                        {detailVideoGame?.name}
                    </h1>
                    <img
                        src={detailVideoGame?.img}
                        alt='imagen'
                    />
                    <h4>Released at: {detailVideoGame?.released}</h4>
                    <h4>Rating: {detailVideoGame?.rating}</h4>
                    <p dangerouslySetInnerHTML={{ __html: detailVideoGame?.description }}></p>
                    <h3>Platforms: {detailVideoGame.platforms?.map(el => el).join(' - ')}</h3>
                    <h3>Genres: {detailVideoGame.genres?.map(el => el).join(' - ')}</h3>
                </div>
            }
        </div>
    )
}


export default Details;