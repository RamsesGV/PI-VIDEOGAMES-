import './Card.modules.css';

const Card = ({ name, img, genres }) => {
return (
    <div>
    <img className="imagen" src={img} alt="videogameimg" />
    <h3>{name}</h3>
    <h2>
        {Array.isArray(genres) && genres.map((genre, index) => (
        <span key={index}>{genre}</span>
        ))}
    </h2>
    </div>
);
};

export default Card;
