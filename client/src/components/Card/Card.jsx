const Card = ({name,img,genres}) => { 
    return(
        <div>
            <img src={img} alt="videogameimg"/>
            <h3>{name}</h3>
            <h2>
            {genres.map((genre) => (
                <span key={genre}>{genre}</span>
                ))}
            </h2>
        </div>
    )

}

export default Card