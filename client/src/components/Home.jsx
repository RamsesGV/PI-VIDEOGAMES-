import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Card from "./Card.jsx"
import Loading from "./Loading";
import styles from './styles/Home.module.css'
// import {imageSearch} from '../imagenes/imageSearch.png'
import {
    getAllVideoGames,
    getGenres,
    filterByGenres,
    getVideogameByName,
    getVideoGamesByOrigin,
    orderAlphabetically,
    orderByRating,
    deleteStates,
} from '../actions/index.js'

//Components
import Paged from "./Paged";

const Home = () => {
    //!------ PAGINADO -------

    /*
    allVideogames y genres se asignan a los resultados 
    de los selectores de Redux. Estos selectores obtienen 
    los datos relevantes del estado global de Redux.
    Se utiliza el estado local currentPage para realizar 
    un seguimiento de la página actual.
    setCurrentPage es una función que se utiliza para actualizar 
    el estado de currentPage.
    videoGamesPP se establece en 15, 
    lo que significa que se mostrarán 15 videojuegos por página.
     */
    const dispatch = useDispatch()
    const allVideogames = useSelector((state) => state.videogames)
    const genres = useSelector((state) => state.genres);
    //Estado de la página: 
    const [currentPage, setCurrentPage] = useState(1);
    const [videoGamesPP,] = useState(15);
    //division del array por cantidad de páginas requeridas
    /*
    indexOfLastVideoGame se calcula multiplicando 
    currentPage por videoGamesPP. 
    Esto da como resultado el índice 
    del último videojuego en la página actual.
     */
    const indexOfLastVideoGame = currentPage * videoGamesPP; // 1 *  15
    const indexOfFirstVideoGame = indexOfLastVideoGame - videoGamesPP; // 0 
    /*
    current se inicializa como una matriz vacía.
    Aquí se almacenarán los videojuegos que se mostrarán 
    en la página actual.
     */
    const [current, setCurrent] = useState([]); //current 15VG

    useEffect(() => {
        /*
        dispatch(getGenres()) 
        se ejecuta para obtener los géneros de la API/BD 
        y almacenarlos en el estado global de Redux.
         */
        dispatch(getGenres())
        /*
        let vg = allVideogames && allVideogames; 
        crea una variable vg que almacena allVideogames si existe.
         */
        let vg = allVideogames && allVideogames;
        /*
        Si la longitud de vg es igual a cero, 
        significa que no hay videojuegos en el estado global de Redux. 
        En ese caso, se ejecuta dispatch(getAllVideoGames()) 
        para obtener todos los videojuegos de la API 
        y almacenarlos en el estado global.
         */
        if (vg.length === 0) {
            dispatch(getAllVideoGames())
        }
        /*
        setCurrent se utiliza para establecer los videojuegos actuales 
        en función de allVideogames, 
        tomando un subconjunto que corresponde a los videojuegos 
        en la página actual 
        (utilizando slice(indexOfFirstVideoGame, indexOfLastVideoGame)).
         */
        setCurrent(
            allVideogames.slice(indexOfFirstVideoGame, indexOfLastVideoGame)
        )
    }, [allVideogames, indexOfFirstVideoGame, indexOfLastVideoGame, dispatch]
    );
    /*
    La función paged se define para actualizar currentPage 
    cuando se hace clic en un número de página en el componente Paged.
     */
    const paged = (pageNumbers) => { // prop del componente paged matriz vacia.
        setCurrentPage(pageNumbers);
    };
    /*
    En resumen, este bloque de código inicializa los géneros, 
    carga los videojuegos si no existen en el estado global 
    y establece los videojuegos actuales en función de la página actual. 
    Además, proporciona una función para actualizar currentPage 
    cuando se selecciona una página diferente.
     */
    //--------------------------
    /*
    En el componente Home, se utiliza el estado search 
    y la función setSearch para controlar el valor del campo de búsqueda. 
    La inicialización del estado search es un objeto con una propiedad 
    name inicializada en una cadena vacía.
     */
    const [search, setSearch] = useState({ //input de busqueda
        name: '',
    });

    /*
    Esta función se ejecuta cuando se realiza una selección 
    en el menú desplegable de orden alfabético. 
    Primero, llama a e.preventDefault() 
    para evitar que se realice la acción predeterminada del evento. 
    Luego, despacha la acción orderAlphabetically con el valor 
    seleccionado (e.target.value) utilizando dispatch. 
    A continuación, se establece currentPage en 1 
    y se actualiza el conjunto de resultados actuales 
    (setCurrent) 
    mediante el uso de allVideogames.slice(indexOfFirstVideoGame, indexOfLastVideoGame)
     */
    const handleOrderAlphabetically = (e) => {
        e.preventDefault()
        dispatch(orderAlphabetically(e.target.value))
        setCurrentPage(1)
        setCurrent(
            allVideogames.slice(indexOfFirstVideoGame, indexOfLastVideoGame)
        )
    }
    //mismo procedimiento diferente action
    const handleOrderRating = (e) => {
        e.preventDefault()
        dispatch(orderByRating(e.target.value))
        setCurrentPage(1)
        setCurrent(
            allVideogames.slice(indexOfFirstVideoGame, indexOfLastVideoGame)
        )
    }
    // mismo procedimiento diferente action
    const handleFilterGenres = (e) => {
        e.preventDefault()
        dispatch(filterByGenres(e.target.value))
        setCurrentPage(1)
        setCurrent(
            allVideogames.slice(indexOfFirstVideoGame, indexOfLastVideoGame)
        )
    }
    //mismo procedimiento diferente action 
    const handleGetVideoGamesByOrigin = (e) => {
        e.preventDefault()
        dispatch(getVideoGamesByOrigin(e.target.value));
        setCurrentPage(1)
        // setCurrent(
        //     getAllVideogames.slice(indexOfFirstVideoGame, indexOfLastVideoGame)
        // )
    }
    /*
    Esta función se ejecuta cuando 
    se realiza un cambio en el campo de búsqueda.
    Evita la acción predeterminada del evento, 
    actualiza el estado search utilizando la función 
    setSearch con el nuevo valor del campo de búsqueda 
    y despacha la acción getVideogameByName 
    con el valor actualizado de search.name. Además, 
    establece currentPage en 1.
     */
    const handleChange = (e) => {
        e.preventDefault()
        setSearch({
            ...search,
            [e.target.name]: e.target.value,
        })
        dispatch(getVideogameByName(search.name))
        setCurrentPage(1)
        // setCurrent(
        //     getAllVideogames.slice(indexOfFirstVideoGame, indexOfLastVideoGame)
        // )
    }
    // es practicamente lo que pasa arriba solo que al hacer click al boton
    const handleSearch = (e) => { //se ejecuta cuando clickeo boton 'go!'
        e.preventDefault();
        dispatch(getVideogameByName(search.name))
        setCurrentPage(1)
        // setCurrent(
        //     getAllVideogames.slice(indexOfFirstVideoGame, indexOfLastVideoGame)
        // )
    }
    //practicamente limpia el filtrado y reinicia el componente
    const handleClearFilters = (e) => {
        console.log("Before clearing states:", allVideogames, currentPage);
        dispatch(deleteStates())
        console.log("After clearing states:", allVideogames, currentPage);
    }

    // sytles
    const { backgroundImage, containerCard, containerLoading, searchBar, select, searchGame, searchBtn, createGame, refresh } = styles;
    return (
        <>
            <div className={backgroundImage}>
                <nav className={searchBar}>

                    <select className={select} onChange={(e) => { handleOrderAlphabetically(e) }}>
                        <option>Order</option>
                        <option value="asc">A-Z</option>
                        <option value="desc">Z-A</option>
                    </select>

                    <select className={select} onChange={(e) => handleOrderRating(e)}>
                        <option>Rating</option>
                        <option value="max">More Popular</option>
                        <option value="min">Less popular</option>
                    </select>

                    <select className={select} onChange={(e) => handleFilterGenres(e)} defaultValue={'default'}>
                        <option value="default" disabled>Genres</option>
                        {genres?.map((el, i) => {
                            return (
                                <option key={i} value={el}>
                                    {el}
                                </option>
                            )
                        })
                        }
                    </select>

                    <select className={select} onChange={(e) => { handleGetVideoGamesByOrigin(e) }}>
                        <option>Filter</option>
                        <option value="All">All Games</option>
                        <option value="Created">My Games</option>
                        <option value="From Api">Api Games</option>
                    </select>

                    <button className={refresh} onClick={e => handleClearFilters(e)}>Refresh</button>

                    <Link to="/createGame">
                        <button className={createGame}>Create VideoGame</button>
                    </Link>
                </nav>
                <div>
                    <input className={searchGame}
                        autoComplete="off"
                        type="text"
                        placeholder="Search Videgame..."
                        name='name'
                        value={search.name}
                        onChange={(e) => handleChange(e)}
                    />
                    <button className={searchBtn} onClick={(e) => handleSearch(e)}>Search</button>
                </div>
                <div style={{ marginTop: "80" }}>
                    <div className={containerCard}>

                        {current.length > 0 ? current.map(el => {
                            return (
                                <Link key={el.id} to={`/videogame/${el.id}`}>
                                    <Card
                                        name={el.name}
                                        img={el.createdInDb ? el.image : el.img}
                                        genres={el.createdInDb ?
                                            el.genres.map((el) => el.name).join(' ') :
                                            el.genres.join(' - ')
                                        }
                                    />
                                </Link>
                            )
                        }) :
                            <div className={containerLoading}>
                                <Loading />
                            </div>
                        }
                    </div>
                </div>
                <Paged
                    videoGamesPP={videoGamesPP}
                    allVideoGames={allVideogames.length}
                    paged={paged}
                />
            </div>
        </>
    )

}
export default Home;