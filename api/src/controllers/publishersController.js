const axios = require('axios')

const getPublishers = async() => { 

    let response = await axios.get('https://api.rawg.io/api/publishers?key=975089cbd48846a78452db953dd911fd')

    let dataS = response.data.results
    
    const data = dataS.map((el) => { 
        return{
            name:el.name,
            games_count:el.games_count
        }
    })
    return data
}

module.exports = {getPublishers}