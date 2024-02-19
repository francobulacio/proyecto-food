const express = require("express");
const router = express.Router();
const getHome = require('../controllers/getHome')
const getDietStart = require('../controllers/getDietStart')
const { Diet } = require('../db')


router.get('/', async (req, res) => {

    try {
        const home = await getHome()
        let auxDiets = await Diet.findAll()
        if(!auxDiets.length) {
            auxDiets = await getDietStart(home)
        }else{
            const result =auxDiets.map((element)=> element.name)
            auxDiets = [...result]
        }
        res.status(200).json({home, auxDiets});
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})
module.exports = router;