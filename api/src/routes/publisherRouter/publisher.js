const { Router } = require('express')
const router = Router()

const { 
    getPublishers
} = require('../../controllers/publishersController')

router.get('/' , async(req,res) => { 
    let response = await getPublishers()
    try {
        if (!response) { 
            res.status(400).send('No hay nada en esta ruta')
        }
        res.status(200).json(response)
    } catch (error) {
        res.status(404).json({error:error.message})
    }
})

module.exports = router