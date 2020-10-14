import { combineReducers } from 'redux';
import { pokemonsReducer } from './pokemonsReducer';

export const rootReducer = combineReducers({
    pokemons: pokemonsReducer
})