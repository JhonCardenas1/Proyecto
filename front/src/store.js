import {createStore, combineReducers, applyMiddleware} from 'redux'
//para esperar las respuestas del aplicativo
import thunk from 'redux-thunk'
import{composeWithDevTools} from 'redux-devtools-extension'
import { productsReducer } from './reducer/productReducer'

const reducer = combineReducers({
    products:productsReducer
})

let initialState = {}

const middleware = [thunk]

// Para que el navegador identifique que tipo de pagina es mediante Redux por medio de los estados
const store = createStore (reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))


export default store