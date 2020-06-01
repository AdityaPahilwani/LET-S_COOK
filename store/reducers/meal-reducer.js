import { CREATE_MEAL, FETCH_MEAL, FETCH_CUISINE_MEAL } from '../actions/meal-action'

const initialState = {
    meals: [],
    userMeals: [],
    favoriteMeals: [],
    popularMeals: [],
    cuisineMEAL: [],
    cuisine: ''
};




const mealsReducer = (state = initialState, action) => {
    switch (action.type) {

        case FETCH_MEAL:
            const up=+action.meals.length-1;
            const down=+action.meals.length-4;
            console.log(down,up);
            const popular = action.meals.slice(down, up);
            console.log(action.meals);
            return {
                ...state,
                meals: action.meals,
                popularMeals: popular
            }
            break;
        case FETCH_CUISINE_MEAL:
            return {
                ...state,
                cuisineMEAL: action.MEALS,
                cuisine: action.cuisine
            }
            break;
        case CREATE_MEAL:
            const newState=action.meals;
            newState.push(action.meal)
            return{
                ...state,
                meals: newState
            }
            break;
        default:

            break;
    }
    return state;
}



export default mealsReducer;