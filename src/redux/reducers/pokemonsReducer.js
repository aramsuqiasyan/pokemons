import {
    GET_POKEMONS,
    GET_POKEMONS_ERROR,
    GET_POKEMONS_SUCCESS,
    GET_POKEMON,
    GET_POKEMON_SUCCESS,
    GET_POKEMON_ERROR,
    GET_TYPES,
    GET_TYPES_SUCCESS,
    GET_TYPES_ERROR
} from "../types/pokemonsTypes";

const initialState = {
    pokemons: [],
    totalPokemonsCount: 0,
    types: [],
    selectedPokemon: null,
    pending: false,
    error: null
};

export const pokemonsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_POKEMONS:
            return { ...state, pokemons: [], pending: true };
        case GET_POKEMONS_SUCCESS:
            return { ...state, pokemons: action.payload.results,totalPokemonsCount:action.payload.count, pending: false };
        case GET_POKEMONS_ERROR:
            return { ...state, error: action.payload, pending: false };

        case GET_POKEMON:
            return { ...state, selectedPokemon: null, pending: true };
        case GET_POKEMON_SUCCESS:
            return { ...state, selectedPokemon: action.payload, pending: false };
        case GET_POKEMON_ERROR:
            return { ...state, error: action.payload, pending: false };

        case GET_TYPES:
            return { ...state, types: [], pending: true };
        case GET_TYPES_SUCCESS:
            return { ...state, types: action.payload, pending: false };
        case GET_TYPES_ERROR:
            return { ...state, error: action.payload, pending: false };
        default:
            return state;
    }
};
