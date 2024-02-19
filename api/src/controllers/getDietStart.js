const { Diet } = require('../db')


const getDietStart = async (recipes) => {

   
    let arrayDiets = []

    recipes.forEach((element) => {
        arrayDiets = [...arrayDiets, ...element.diet] // guardo todos los elementos en un mismo arreglo.
    })
    const result = [...new Set(arrayDiets)]; // devuelve un nuevo arreglo borrando elementos repetidos.
   // utilizo el metodo forEach para recorrer cada elemento y crear un nuevo registro en la DB utilizando el modelo Diet
    result.forEach(async (element) => {
        // utilizo async/await para que espere a que se resuelva la promesa anterior antes de seguir con la otra

        await Diet.create({name: element})
    })
// retorno la variable result
    return result;
}
//exporto la funcion getDietStart
module.exports = getDietStart;