import { NavLink } from 'react-router-dom'
import './LandingPage.modules.css'

const LandingPage = () => { 
return(
    <div className='Landingcontainer'>
        <div className='titlecontainer'>
            <h1>Welcomo to ARGV, Your best video game website! </h1>
        </div>
        <div className='h2container'> 
                <h2>You can search, create, view details of your favorite games, and more!</h2>
        </div>

        <div className='buttonContainer'> 
        <NavLink className='link' to='/Home' >
            <button className='buttonhome' >Go home</button>
        </NavLink>
        </div>

    </div>
)
}

export default LandingPage 