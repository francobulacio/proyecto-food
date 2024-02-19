
const { Recipe } = require('../db')
const { Op } = require("sequelize");
const { api_key } = process.env
const axios = require("axios")
const URL = "https://api.spoonacular.com/recipes/complexSearch";


const getRecipe = async (name) => {
  
    let result = await Recipe.findAll({
        // utilizamos el operador ilike para buscar coincidencias en el title
        where: {
            title: {[Op.iLike]: `%${name}%`}
        }
    })

    // llamamos la funcion getRecipeApi para buscar recetas en la Api. y las guarda en resultApi
    const resultApi = await getRecipeApi(name)
    // si hay recetas en result combina los datos de la DB y de la Api y se devuelven
    if (result.length) {
        return [...result, ...resultApi]
        // si no hay se va a ver si hay(recetas) en resultApi,Si hay las devuelve.
    } else {
        if (resultApi.length) {
            return resultApi
            // si no hay tampoco arroja un error 
        } else {
            throw Error(`No hay receta con ${name} incluido en su nombre`)
        }
    }
}

const getRecipeApi = async (name) => {
    let { data } = await axios.get(`${URL}?apiKey=${api_key}&addRecipeInformation=true&number=25`) // se solicita un maximo de 25 resultados
  // extraemos los resultados de la respuesta results y se guardan en la variable results
    const { results } = data
    let obj = [];
  
    if (results.length) {
        obj = results.map((element) => {

            return {
                id: element.id,
                title: element.title,
                healthScore: element.healthScore,
                summary: element.summary,
                image: element.image,
                diet: element.diets,
            }
        })
    }
    // devolvemos un nuevo objecto filtrando solo name.este objecto tiene resultados de la api que coinciden con el paramentro name
    return obj.filter((element) => element.title.toUpperCase().includes(name.toUpperCase()))
}
// exportamos la funcion 
module.exports = getRecipe;