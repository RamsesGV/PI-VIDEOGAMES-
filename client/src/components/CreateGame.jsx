import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getGenres, createVideoGame } from '../actions/index.js'
import styles from './styles/CreateGame.module.css';

// me traigo las platforms 1 a 1 por que el endpoint de /platforms
// no esta permitido
const CreateGame = () => {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres);
  const platforms =
    [
      "PC",
      "PlayStation 5",
      "Xbox One",
      "PlayStation 4",
      "Xbox Series S/X",
      "Nintendo Switch",
      "iOS",
      "Android",
      "Nintendo 3DS",
      "Nintendo DS",
      "Nintendo DSi",
      "macOS",
      "Linux",
      "Xbox 360",
      "Xbox",
      "PlayStation 3",
      "PlayStation 2",
      "PlayStation",
      "PS Vita",
      "PSP",
      "Wii U",
      "Wii",
      "GameCube",
      "Nintendo 64",
      "Game Boy Advance",
      "Game Boy Color",
      "Game Boy",
      "SNES",
      "NES",
      "Classic Macintosh",
      "Apple II",
      "Commodore / Amiga",
      "Atari 7800",
      "Atari 5200",
      "Atari 2600",
      "Atari Flashback",
      "Atari 8-bit",
      "Atari ST",
      "Atari Lynx",
      "Atari XEGS",
      "Genesis",
      "SEGA Saturn",
      "SEGA CD",
      "SEGA 32X",
      "SEGA Master System",
      "Dreamcast",
      "3DO",
      "Jaguar",
      "Game Gear",
      "Neo Geo"
    ];

    /*
    En este caso, se utiliza para llamar a la acción getGenres 
    cuando el componente se monta. 
    La acción getGenres se dispara mediante dispatch, 
    que es una función proporcionada por Redux 
    para enviar acciones al store. 
    El [dispatch] en el segundo argumento del useEffect 
    indica que este efecto se activará 
    solo cuando la referencia de dispatch cambie.
     */
  useEffect(() => {
    dispatch(getGenres()); //recibe la accion
  }, [dispatch]);

  // El estado errors se utiliza para almacenar los errores de validación o cualquier otro tipo de error relacionado con el formulario.
  const [errors, setErrors] = useState({});

  /*
  El estado values se utiliza para almacenar los valores ingresados 
  ​​por el usuario en el formulario. 
  Los valores iniciales proporcionados son para los campos 
  name, image, description, released, rating, platforms y genres. 
  Estos campos representan las propiedades de un juego que se está creando.
   */
  const [values, setValues] = useState({
    name: '',
    image: '',
    description: '',
    released: '',
    rating: 0,
    platforms: [],
    genres: [],
  })

  
  //!------------VALIDACIONES/ERRORS ------------------
  /*
  Esta función se utiliza para realizar validaciones en los valores del formulario 
  y devuelve un objeto errors que contiene los mensajes de error correspondientes.
   */
  const validators = (values) => {
    let errors = {};
    if (!values.name || (/^[a-zA-Z ]{1,3}$/).test(values.name)) {
      errors.name = '*Please enter the name of the game, must be at least 3 characters long';
    }
    if (!values.description) {
      errors.description = '* Please enter the videogame description. (Max 100 characters)'
    }
    if (!values.rating || values.rating === '0') {
      errors.rating = "Please insert a number between 0.5 and 5"
    }
    if (!values.released) {
      errors.released = "Please insert a date"
    }
    if (values.platforms.length === 0) {
      errors.platforms = '*Please select at least one platform'
    }
    if (!values.genres) {
      errors.genres = '*Please select at least one genre'
    }
    return errors
  }

  const handleChange = (e) => { //cuando hay un cambio se dispara esta funcion con un e
    e.preventDefault()
    /*
    Esto actualiza el estado values del formulario. 
    Utiliza la sintaxis de propagación (...values) 
    para mantener los valores existentes
    y luego actualiza el campo específico ([e.target.name]) 
    con el nuevo valor (e.target.value). 
    Esto asegura que los valores del formulario se mantengan actualizados 
    con cada cambio realizado por el usuario.
     */
    setValues({
      ...values,
      [e.target.name]: e.target.value
    });
    
    /*
    Esto actualiza el estado errors del formulario. 
    Utiliza la función validators para validar los nuevos valores del formulario, 
    incluido el campo específico que se modificó ([e.target.name]: e.target.value). 
    Esto actualiza los mensajes de error en función de los nuevos valores del formulario.
     */
    setErrors(
      validators({
        ...values,
        [e.target.name]: e.target.value,
      })
    );
  }
  /*
  Esto permite mantener el formulario actualizado 
  y validar los cambios realizados por el usuario en tiempo real.
   */
  //-------------------------------------------------------SUBMIT----------------------------------------------------------
  const handleSubmit = (e) => { //se ejecuta cuando envío un formulario.
    e.preventDefault();
    if (values.image === null || values.image === '') {
      values.image = 'https://media.rawg.io/media/games/53f/53f65f1a0988374c18b5ee3dddbf0399.jpg'
    }
    if (!values.name ||
      !values.description ||
      !values.rating ||
      !values.released ||
      !values.platforms ||
      !values.genres
    ) {
      alert("Missing Data to send Form")
    }
    else {
      /*
      Se envía una acción al store para crear el videojuego utilizando los valores 
      del formulario. 
      El método createVideoGame  es una acción que realiza la llamada a la API 
      o realiza cualquier otra lógica necesaria para crear el videojuego.
      alert('Videogame Created'): Se muestra una alerta indicando que 
      el videojuego se ha creado exitosamente.
      setValues({ ... }): Se restablecen los valores del formulario a su estado inicial, 
      es decir, se vacían los campos.
       */
      dispatch(createVideoGame(values));
      alert('Videogame Created');
      setValues({
        name: '',
        image: '',
        description: '',
        released: '',
        rating: 0,
        platforms: [],
        genres: [],
      });
    }
  }

  const handleChangePlatform = (e) => {
    if (values.platforms.includes(e.target.value)) {
      alert('This platform has already been selected.Please choose another')
    } else {
      setValues(
        /*
        Se usa una función de actualización del estado ((state) => ({ ...state, ... })) 
        para garantizar que se preserve el valor anterior del estado 
        y solo se actualice la propiedad platforms. 
        Se agrega el nuevo valor seleccionado a platforms utilizando 
        la sintaxis de propagación (...state.platforms) 
        y se incluye el nuevo valor (e.target.value) al final del array.
         */
        (state) => ({
          ...state,
          platforms: [...state.platforms, e.target.value],
        })
      )
    }

  }

    /*
    La función recibe el evento (e) y el valor de la plataforma (p) 
    que se desea eliminar.
    Se utiliza e.preventDefault() para evitar que el evento provoque 
    un comportamiento predeterminado, como la recarga de la página.
    Luego, se llama a setValues para actualizar el estado values. 
    Se utiliza el operador de propagación (...values) 
    para copiar todos los valores existentes en values y luego se 
    filtran las plataformas para eliminar la plataforma específica que se desea eliminar. 
    Esto se hace utilizando el método filter y se compara cada elemento del array 
    values.platforms (el) con la plataforma a eliminar (p). 
    Los elementos que no coinciden se mantienen en el array resultante, 
    eliminando así la plataforma seleccionada.
     */

    /*
    En la función handleDeletePlatform, se utiliza el método filter para crear 
    un nuevo array que contiene solo las plataformas que son diferentes 
    a la plataforma específica que se desea eliminar.

    El parámetro (el) en la función de filtro representa 
    cada elemento del array values.platforms. 
    Al compararlo con la plataforma específica que se desea eliminar (p), 
    se verifica si el elemento actual es igual a la plataforma que se desea eliminar. 
    Si el elemento es diferente, se mantiene en el nuevo array resultante; 
    si el elemento es igual a la plataforma que se desea eliminar, 
    se excluye del nuevo array.

    En resumen, el filtro (el) => el !== p 
    se encarga de verificar si cada elemento del array values.platforms 
    es diferente a la plataforma específica que se desea eliminar (p). 
    Si el elemento es diferente, se mantiene en el nuevo array filtrado; 
    si el elemento es igual, se excluye del nuevo array. 
    De esta manera, se logra eliminar la plataforma seleccionada del estado values.platforms.
     */
  const handleDeletePlatform = (e, p) => {
    e.preventDefault();
    setValues({
      ...values,
      platforms: values.platforms.filter((el) => el !== p)
    })
  }

  /*
  La función handleChangeGenre se ejecuta cuando se selecciona un nuevo género 
  en el formulario. 
  Comienza verificando si el género seleccionado ya está presente en el array values.genres. 
  Si es así, muestra una alerta indicando que ese género ya ha sido seleccionado 
  y se debe elegir otro. De lo contrario, 
  utiliza la función setValues para actualizar el estado de values. 
  Utiliza el enfoque de función en setValues, 
  pasando una función de devolución de llamada que recibe el estado anterior 
  (state) y devuelve un nuevo objeto que fusiona todas las propiedades anteriores 
  y agrega el nuevo género seleccionado al array genres.
   */
  const handleChangeGenre = (e) => {
    if (values.genres.includes(e.target.value)) {
      alert('This genre has already been selected.Please choose another')
    } else {
      setValues(
        (state) => ({
          ...state,
          genres: [...state.genres, e.target.value],
        })
      )
    }
  }

  /* se activa cuando se hace clic en el botón de eliminar género. 
  Al igual que en handleDeletePlatform, 
  se utiliza e.preventDefault() para evitar que se recargue la página. 
  Luego, se utiliza la función setValues para actualizar el estado de values.
  Al igual que antes, se utiliza el enfoque de función en setValues 
  y se proporciona una función de devolución de llamada que recibe el estado anterior (prev).
  Dentro de esta función de devolución de llamada, 
  se utiliza prev.genres.filter((el) => el !== g) para crear un nuevo array de géneros 
  que excluya el género específico (g) que se desea eliminar.
   */
  const handleDeleteGenre = (e, g) => {
    e.preventDefault();
    setValues((prev) => ({
      ...prev,
      genres:
        prev.genres.filter((el) => el !== g)
    }))
  }

  const { container, inputForm, backgroundImage, raiting, nameCss, deleteBtn, createGameBtn } = styles;


  return (
    <div className={backgroundImage}>
      <div className={container} >
        <h1>Create VideoGame</h1>
        <h4>Fill in the following form:</h4>
        <form autoComplete="off" onSubmit={(e) => handleSubmit(e)}>
          {/* --------------------------------------NAME---------------------------------------- */}
          <div className={nameCss}>
            <h5>Name of the VideoGame:</h5>
            <input
              className={errors.name && 'danger'}
              type='text'
              placeholder='Name...'
              name='name' // nombre del input
              value={values.name} // valor dinámico del input que se actualiza mientras se escribe dentro del mismo
              onChange={(e) => handleChange(e)} // onChange es un "detector" que dispara un "algo/evento" cuando detecta un cambio
            />
            {errors.name && (
              <p className={errors.name && 'danger'}>{errors.name}</p>
            )}
          </div>
          {/* --------------------------------------IMAGE---------------------------------------- */}
          <div>
            <h5>Put the cover of the game:</h5>
            <input
              className={inputForm}
              type='text'
              placeholder='Image Url...'
              name='image'
              value={values.image}
              onChange={(e) => handleChange(e)}
            />
          </div>
          {/* --------------------------------------DESCRIPTION---------------------------------------- */}
          <div>
            <h5>Game description:</h5>
            <input
              className={errors.description && 'danger'}
              type='text'
              placeholder='Description...'
              name='description'
              maxLength='100'
              value={values.description}
              onChange={(e) => handleChange(e)}
            />
            {errors.description && (
              <p className={errors.description && 'danger'}>{errors.description}</p>
            )}
          </div>
          {/* --------------------------------------RELEASED---------------------------------------- */}
          <div>
            <h5>Release date:</h5>
            <input
              type='date'
              placeholder='Date...'
              name="released"
              value={values.released}
              onChange={(e) => handleChange(e)}
            />
            {errors.released && (
              <p className={errors.released && 'danger'}>{errors.released}</p>
            )}
          </div>
          {/* --------------------------------------RATING---------------------------------------- */}
          <div className={raiting}>
            <h5>Raiting:</h5>
            <input
              className={errors.rating && 'danger'}
              type="number"
              placeholder="Rating..."
              value={values.rating}
              name="rating"
              step={0.5}
              max={5.0}
              min={0.0}
              onChange={(e) => {
                handleChange(e);
              }}
            />
            {errors.rating && (
              <p className={errors.rating && 'danger'}>{errors.rating}</p>
            )}
          </div>
          {/* --------------------------------------PLATFORMS---------------------------------------- */}
          <div>
            <label >
              <h5 > Choose a platform...</h5>
              <select
                // className={errors.platforms && 'danger'}
                name='Platforms'
                onChange={(e) => handleChangePlatform(e)}
                defaultValue={'default'}
              >
                {<option value="default" disabled>Platforms...</option>}
                {platforms.map((el, i) => {
                  return (
                    <option key={i} value={el}>
                      {el}
                    </option>
                  )
                })}
              </select>
            </label>
            {/* ----------------------------------------PLATFORMS LIST----------------------------------- */}
            <ul >
              {values.platforms.length ? values.platforms.map((el, i) => (
                <div className='result' key={i}>
                  <li>
                    {el}
                    <button className={deleteBtn} onClick={(e) => { handleDeletePlatform(e, el) }}>x</button>
                  </li>
                </div>
              ))
                : errors.platforms && (
                  <p className={errors.platforms && 'danger'}>{errors.platforms}</p>
                )
              }
            </ul>
          </div>
          {/* -----------------------------------------GENRES---------------------------------------- */}
          <div>
            <label>
              <h5 className={errors.genres && 'danger'} > Choose a genre...</h5>
              <select onChange={(e) => handleChangeGenre(e)}
                className='Genres'
                name='Genres'
                defaultValue={'default'}
              >
                <option value="default" disabled>Genres...</option>
                {genres?.map((el, i) => {
                  return (
                    <option key={i} value={el}>
                      {el}
                    </option>
                  )
                })
                }
              </select>
            </label>
            {/* ----------------------------------------GENRES LIST----------------------------------- */}
            <ul className='lista'>
              {values.genres.length ? values.genres.map((el, i) => (
                <div className='result' key={i}>
                  <li>
                    {el}
                    <button className={deleteBtn} onClick={(e) => { handleDeleteGenre(e, el) }}>x</button>
                  </li>
                </div>)
              ) :
                errors.platforms && (
                  <p className={errors.platforms && 'danger'}>{errors.platforms}</p>
                )
              }
            </ul>
          </div>
          <button className={createGameBtn} type='submit'>Create Videogame</button>
        </form>
      </div>
    </div>

  )
}

export default CreateGame
