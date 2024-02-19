import axios from 'axios'

export const LOADER = "LOADER"
export const GET_HOME_CARDS = "GET_HOME_CARDS"
export const GET_FOOD_ID = "GET_FOOD_ID"
export const PUT_FOOD_BY_NAME = "PUT_FOOD_BY_NAME"
export const DELETE_STATE = "DELETE_STATE"
export const CREATE_RECIPE = "CREATE_RECIPE"
export const ORDER_RECIPES_HEALTH = "ORDER_RECIPES_HEALTH"
export const DISH_TYPES = "DISH_TYPES"
export const ORDER_TITLE = "ORDER_TITLE"
export const CURRENT_PAGE = "CURRENT_PAGE"
export const CLEAN_DETAIL = "CLEAN_DETAIL"
export const ORDER_ORGIN = "ORDER_ORGIN"

export const getHomeCards = () => {
    return async function (dispatch) {
        try {
        const {data} = await axios.get("http://localhost:3001/api/home")
        dispatch({type: GET_HOME_CARDS, payload: data})
    } catch (error) {
        alert("Recipes are not available at this time");
    }
  }
}

export const getFoodId = (id) => {
    return async function (dispatch) {
     try {
        const {data} = await axios.get(`http://localhost:3001/api/recipe/${id}`)
        dispatch({type: GET_FOOD_ID, payload: data})
    } catch (error) {
        alert("Recipe with ID does not exist");
    }
  }
}
export const putFoodByName = (name) => {
    return async function (dispatch) {
        try {
        console.log("actions ---------", name)
        const {data} = await axios.get(`http://localhost:3001/api/recipe?name=${name}`)
        console.log("actions ---------data-----", data)
        dispatch({type: PUT_FOOD_BY_NAME, payload: data})
    } catch (error) {
        alert("The recipe you are looking for is not available");
      }
    }
}

export const createRecipe = (obj) => {
    return {type: CREATE_RECIPE, payload: obj}
}

export const deleteState = () => {
    return {type: DELETE_STATE, payload: []}
}

export const orderRecipes = (value) => {
    return {type: ORDER_RECIPES_HEALTH, payload: value}
}

export const dishTypes = (value) => {
    return {type: DISH_TYPES, payload: value}
}
  
export const OrderTitle = (value) => {
    return {type: ORDER_TITLE, payload: value}
}
export const currentPageHandler = (value) => {
    return {type: CURRENT_PAGE, payload: value}
}

export const Loading = () => {
    return {type: LOADER}
}

export const CleanDetail = () => {
    return {type: CLEAN_DETAIL}
}