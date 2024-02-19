import {
    CLEAN_DETAIL,
    CREATE_RECIPE, CURRENT_PAGE,
    DELETE_STATE,
    DISH_TYPES,
    GET_FOOD_ID,
    GET_HOME_CARDS, LOADER,
    ORDER_RECIPES_HEALTH, ORDER_TITLE,
    PUT_FOOD_BY_NAME
} from './actions'


const initialState = {
    foods: [],
    foodsCopy: [],
    diet: [],
    foodDetail: {},
    currentPage: 0,
    loader: true
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_HOME_CARDS:
            const {home, auxDiets} = action.payload
            return {...state, foods: home, diet: auxDiets, foodsCopy: home, currentPage: 0}

        case GET_FOOD_ID:
            return {...state, foodDetail: action.payload}

        case PUT_FOOD_BY_NAME:
            
            return {...state, foods: action.payload, currentPage: 0}

        case DELETE_STATE:
            return {...state, foods: action.payload}

        case CREATE_RECIPE:
            return {...state, foods: [action.payload, ...state.foods]}

        case ORDER_RECIPES_HEALTH:
            return {
                ...state, foods: (action.payload === 'Ascendente')
                    ? [...state.foods.sort((a, b) => a.healthScore - b.healthScore)]
                    : [...state.foods.sort((a, b) => b.healthScore - a.healthScore)],
                currentPage: 0
            }

        case ORDER_TITLE:
            return {
                ...state, foods: (action.payload === 'A-Z')
                    ? [...state.foods.sort((a, b) => a.title.localeCompare(b.title))]
                    : [...state.foods.sort((a, b) => b.title.localeCompare(a.title))],
                foodsCopy: (action.payload === 'A-Z')
                    ? [...state.foodsCopy.sort((a, b) => a.title.localeCompare(b.title))]
                    : [...state.foodsCopy.sort((a, b) => b.title.localeCompare(a.title))],
                currentPage: 0

            }

        case DISH_TYPES:
            state.foods = state.foodsCopy
            return {
                ...state,
                foods: state.foods.filter((food) => food.diet.some((d) => d === action.payload)),
                currentPage: 0
                // foods: state.foods.filter((food) => food.diet.map((d) => d === action.payload))
            }

        case CURRENT_PAGE:
            return {...state, currentPage: action.payload}

        case LOADER:
            return {
                ...state, loader: state.loader
                    ? state.loader = false
                    : state.loader = true
            }
        case CLEAN_DETAIL:
            return {
                ...state, foodDetail: {}
            }


        default:
            return {...state}
    }
}
export default rootReducer;