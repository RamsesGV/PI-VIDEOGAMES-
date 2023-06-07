const axios = require('axios')
const { Genre } = require('../db')
require('dotenv').config();
const { 
    API_KEY,
} = process.env

const getGenres = async() => { 
    const response = await axios.get
    (`https://api.rawg.io/api/genres?key=${API_KEY}`)
    try {
        let genres =  response.data.results.map((el) => el.name)
        genres.forEach((el) => { 
            Genre.findOrCreate({
                where:{
                    name:el,
                }
            })
        })
        return genres
    } catch (error) {
        console.error(error)
        throw new Error({
            error:'no se encontraron generos.'
        })
    }
}

module.exports = { getGenres }