import {useDispatch, useSelector} from 'react-redux'
import { useHistory } from 'react-router-dom';


import {getDetailVideoGame,deleteVideogame} from '../../redux/actions'
import { useEffect } from 'react'

const Detail = (props) => { 

const dispatch = useDispatch()
const history = useHistory()
const detailVideogame = useSelector((state) => state.details)

useEffect(() => { 
    dispatch(getDetailVideoGame(props.match.params.id))
},[dispatch, props.match.params.id])


const handleDelete = (event) => { 
    event.preventDefault()
    let result = window.confirm('Estas seguro que deseas eliminar este juego?')
    if(result === true) { 
        window.alert('Juego borrado con exito')
        dispatch(deleteVideogame(props.match.params.id))
        history.push('./Home')
        window.location.replace('')
    }
}

return(
    <div>
        {detailVideogame.createdInDb === true
        
        ? 
        <div> 
            <h1>{detailVideogame?.name}</h1>
            <img src={detailVideogame?.image} alt='image'/>
            <h4>released at: {(detailVideogame?.releaseDate).slice(0,10)}</h4>
            <h4>Rating: {detailVideogame?.rating}</h4>
            <h4>
                description:
                <p dangerouslySetInnerHTML={{ __html: detailVideogame?.description }}></p>
            </h4>
            <h3>Platforms: {detailVideogame.platforms?.map(el => el).join(' - ')}</h3>
            <h3>Genres: {detailVideogame.genres?.map(el => el.name).join(' - ')}</h3>

            <button onClick={(e) => handleDelete(e)}>Delete Game</button>
        </div>

        :

        <div>
            <h1>
                {detailVideogame?.name}
            </h1>
            <img src={detailVideogame?.img} alt='img'/>

            <h4>Released at: {detailVideogame?.released}</h4>
            <h4>Rating: {detailVideogame?.raitng}</h4>
            <p dangerouslySetInnerHTML={{ __html: detailVideogame?.description }}></p>
            <h3>Platforms:{detailVideogame.platforms?.map(el => el).join(' - ')}</h3>
            <h3>Genres: {detailVideogame.genres?.map(el => el).join(' - ')}</h3>
        </div>
            }
        </div>

        
        
    
)
}
export default Detail