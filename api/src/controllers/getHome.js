const { Recipe } = require("../db");
const { api_key } = process.env
const axios = require("axios");


const getHome = async () => {
  
    let aux = await Recipe.findAll()

    let { data } = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${api_key}&addRecipeInformation=true&number=100`)
   // desestructuro a data para poder extraer results.que contiene las recetas de la api
    const { results } = data
    let obj = [];
    // si results no esta vacio entoces mapeame y devolvemelo con un objecto con estas propiedades.
    if (results.length) {
      
        obj = results.map((element) => {
            return {
                id: element.id,
                title: element.title,
                healthScore: element.healthScore,
                summary: element.summary.replace(/<[^>]+>/g, ''),
                image: element.image,
                diet: element.diets? element.diets: "steps not found"
            }
        })
    }
    // la funcion devuelve un nuevo array guardando a aux y obj utilizando el operador spread
    return [...aux, ...obj];
}


module.exports = getHome;