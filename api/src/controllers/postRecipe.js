const { Diet } = require('../db')
const { Recipe } = require('../db')
const postRecipe = async (title, summary, healthScore, step, score, image, diet) => {
// se realiza una comprobacion para asegurar que esten summary y tittle. si alguno falta tira un error
    if (!summary || !title ) throw Error("La propiedad name o summary no tiene valor")
//utilizamos el metodo create del modelo recipe para crear una nueva instancia de receta
// este metodo devuelve un obj que seria la nueva receta creada en la DB.
    const result = await Recipe.create({title,
            image,
            summary,
            healthScore,
            step,
            score,
            diet})

 // usamos el bucle forEach para iterar sobre diet.para cada elemento se usa 
 //el metodo findOrCreate del modelo diet para buscar una dieta en la Db con el mismo nombre
 //este metodo devuelve un arreglo con dos valores el primero es la dieta encontrada o creada y el segundo un boleano

    diet.forEach(async (element) => {
            const [d, flag] = await Diet.findOrCreate({
            where: {
                name: element.toLowerCase()
            }
        })
        // usamos el metodo add para asociar las recetas creadas anteriormente(se hace usando la instacia de la receta y pasandole como argumento )
        await result.addDiets(d)
    })
    // devuelve result
    return result

}
module.exports = postRecipe;