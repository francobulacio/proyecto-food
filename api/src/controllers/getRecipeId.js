const { api_key } = process.env
const { Recipe } = require('../db')
const axios = require("axios");

module.exports = getRecipeId = async (id) => {
    console.log("***************** dentro de getRecipeId : ", id)
    // realizamos una comprobacion para ver si el valor id es un numero
    if (typeof id === "number") {
    // si es asi hacemos una peticion de tipo get a la api y guardamos el resultado en data
        let { data } = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${api_key}`)
        const result = data

        return ({
            id: result.id,
            title: result.title,
            summary: result.summary.replace(/<[^>]+>/g, ''), // usamos este metodo para que nos traiga etiquetas HTML
            healthScore: result.healthScore,
            image: result.image,
            dishTypes: result.dishTypes,
            diet: result.diets,
            // pasos de la recetas analizados y formateados
            
            steps: result.analyzedInstructions[0].steps?.map((element, index) => {
                return `${index + 1} : ${element['step']}`
            }).join(' ')
        })
        
    } else {
        // si el valor id no es un numero se llama la funcion findByPk en el modelo recipe.
        //se busca una receta en la DB con un id si hay la devuelve
        return await Recipe.findByPk(id)
    } 
}
