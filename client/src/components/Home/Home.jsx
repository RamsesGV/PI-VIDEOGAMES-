import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import  Card from '../Card/Card'
import Loading from '../Loading/Loading'

import { 
getAllVideoGames,
getGenres,
filterByGenres,
getVideogameByName,
getVideoGamesByOrigin,
orderAlphabetically,
orderByRating,
deleteStates,
} from '../../redux/actions'

import Paged from '../Paged/Paged'


const Home = () => { 

const dispatch = useDispatch()
const allVideogames = useSelector((state) => state.videogames)
const genres = useSelector((state) => state.genres)

const [currentPage, setCurrentPage] = useState(1)
const [videoGamesPP,] = useState(15)

const indexOfLastVideoGame = currentPage * videoGamesPP
const indexOfFirstVideoGame = indexOfLastVideoGame - videoGamesPP
const [current,setCurrent] = useState([])
const [noGamesFound, setNoGamesFound] = useState(false)
const [filteredGames, setFilteredGames] = useState([])
const [initialLoad, setInitialLoad] = useState(true)




useEffect(() => { 
    const filtered = allVideogames.filter(game => game.genres.includes(genres)) // Reemplaza `selectedGenre` con la variable que almacena el género seleccionado
    setFilteredGames(filtered)
},[allVideogames,genres])


useEffect(() => { 
    if (filteredGames.length === 0) {
        setNoGamesFound(true);
    } else {
        setNoGamesFound(false);
    }
},[filteredGames])


useEffect(() => { 
    dispatch(getGenres())
    let vg = allVideogames && allVideogames
    if(vg.length === 0) { 
        dispatch(getAllVideoGames()).then((() => {
            setInitialLoad(false)
        }))
    } else { 
        setInitialLoad(false)
    }
    setCurrent(
        vg.slice(indexOfFirstVideoGame,indexOfLastVideoGame)
    )

    if (!initialLoad && filteredGames.length === 0) {
        setNoGamesFound(true);
    } else {
        setNoGamesFound(false);
    }

},[
    allVideogames,
    indexOfFirstVideoGame,
    indexOfLastVideoGame,
    dispatch,
    initialLoad,
    filteredGames.length
])


const paged = (pageNumbers) => { 
    setCurrentPage(pageNumbers)
}


//const [isHiden, setIsHiden] = useState(false)
const [search,setSearch] = useState({name:''})




const handleOrderAlphabetically = (event) => { 
    event.preventDefault()
    dispatch(orderAlphabetically(event.target.value))
    setCurrentPage(1)
    setCurrent(
        allVideogames.slice(indexOfFirstVideoGame,indexOfLastVideoGame)
    )
}



const handleOrderRating = (event) => { 
    event.preventDefault()
    dispatch(orderByRating(event.target.value))
    setCurrentPage(1)
    setCurrent(
        allVideogames.slice(indexOfFirstVideoGame,indexOfLastVideoGame)

    )
}



const handleFilterGenres = (event) => { 
    event.preventDefault()
    dispatch(filterByGenres(event.target.value))
    setCurrent(1)
    setCurrent(
        allVideogames.slice(indexOfFirstVideoGame,indexOfLastVideoGame)
    )
}



const handleGetVideoGamesByOrigin = (event) => { 
    event.preventDefault()
    dispatch(getVideoGamesByOrigin(event.target.value))
    setCurrentPage(1)
}



const handleChange = (event) => { 
    event.preventDefault()
    setSearch({
        ...search,
        [event.target.name]:event.target.value
    })
    dispatch(getVideogameByName(search.name))
    setCurrentPage(1)
}



const handleSearch = (event) =>  {
event.preventDefault()
dispatch(getVideogameByName(search.name))
setCurrentPage(1)
}



const handleClearFilters = (event) => { 
    dispatch(deleteStates())
}




return(
    <>
        {initialLoad ? (
        <Loading/>
    ) : (
    <div>
        <nav>

            <select onChange={(event) => {handleOrderAlphabetically(event)}}   >
                <option>Order</option>
                <option value='asc'>A-Z</option>
                <option value='desc'>Z-A</option>
            </select>


            <select onChange={(event) => handleOrderRating(event)}   >
                <option>Rating</option>
                <option value='max'>More Popular</option>
                <option value='min'>Less Popular</option>
            </select>


            <select onChange={(event) => handleFilterGenres(event)} defaultValue={'default'}   >
                <option value='default' disabled>Genres</option>
                {genres?.map((el,i) => {
                    return(
                        <option key={i} value={el}>{el}</option>
                    )
                })}
                
            
            </select>



            <select onChange={(event) =>{handleGetVideoGamesByOrigin(event) }}>
                <option>Filter</option>
                <option value='All'>All Games</option>
                <option value='Created'>My Games</option>
                <option value='From Api'>Api Games</option>
            </select>


            <button onClick={event => handleClearFilters(event)}>Clear Filters</button>

                
                    <button>Create Videogame</button>
                
        </nav>

    <div>
        <input
        autoComplete="off"
        type="text"
        placeholder="Search Videogame"
        name="name"
        value={search.name}
        onChange={(event) => handleChange(event)}
        />

        <button onClick={(event) => handleSearch(event)}>Search</button>
    </div>     

    <div>
        <div>

        {current.length > 0 ? (
            current.map((el, index) => (
            <NavLink key={index} to={`/videogames/${el.id}`}>
                <Card
                name={el.name}
                img={el.createdInDb ? el.image : el.img}
                genres={el.createdInDb
                ? el.genres.map((genre) => <span key={genre.id}>{genre.name}</span>).reduce((prev, curr) => [prev, ' ', curr])
                : el.genres.length > 0
                ? el.genres.map((genre, index) => <span key={index}>{genre}</span>).reduce((prev, curr) => [prev, ' , ', curr])
                : null
                }
                />
            </NavLink>
            ))
          ) : noGamesFound ? ( // Mostrar mensaje cuando no se encuentran juegos
            <div>No se encontraron juegos con ese género.</div>
        ) : (
            <div>
            <Loading />
            </div>
        )}
        </div>
    </div>

    <Paged
        videoGamesPP={videoGamesPP}
        allVideoGames={allVideogames.length}
        paged={paged}
    />
    </div>
    )}
</>
)
}


export default Home






