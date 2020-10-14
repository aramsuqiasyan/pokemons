import {
    GET_POKEMONS,
    GET_POKEMONS_ERROR,
    GET_POKEMONS_SUCCESS,
    GET_POKEMON,
    GET_POKEMON_SUCCESS,
    GET_POKEMON_ERROR,
    GET_TYPES_SUCCESS,
    GET_TYPES_ERROR,
    GET_TYPES
} from "../types/pokemonsTypes";

export function requestPokemons(queryParams) {
    return dispatch => {
        dispatch(getPokemons());
        fetch(`https://pokeapi.co/api/v2/pokemon?${queryParams}`)
            .then(res => res.json())
            .then(
                response => {
                    dispatch(getPokemonsSuccess(response))
                    dispatch(getTypes())
                    return fetch(`https://pokeapi.co/api/v2/type`)
                },
                error => {
                    dispatch(getPokemonsError(error))
                }
            )
            .then(res => res.json())
            .then(
                response => {
                    dispatch(getTypesSuccess(response.results))
                },
                error => {
                    dispatch(getTypesError(error))
                }
            )
    }
}

export function requestPokemonsByTypes(type) {
    return dispatch => {
        dispatch(getPokemons());
        fetch(`https://pokeapi.co/api/v2/type/${type}`)
            .then(res => res.json())
            .then(
                response => {
                    const pokemons = response.pokemon.map(pokemon => pokemon.pokemon);
                    dispatch(getPokemonsSuccess({ results: pokemons, count: 0 }))
                },
                error => {
                    dispatch(getPokemonsError(error))
                }
            )
    }
}

export function getPokemons() {
    return {
        type: GET_POKEMONS
    }
}

export function getPokemonsSuccess(result) {
    return {
        type: GET_POKEMONS_SUCCESS,
        payload: result
    }
}

export function getPokemonsError(error) {
    return {
        type: GET_POKEMONS_ERROR,
        payload: error
    }
}


export function requestPokemon(name) {
    return dispatch => {
        dispatch(getPokemon());
        fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
            .then(res => res.json())
            .then(
                (response) => {
                    dispatch(getPokemonSuccess(response))
                },
                (error) => {
                    dispatch(getPokemonError(error))
                }
            )
    }
}

export function getPokemon() {
    return {
        type: GET_POKEMON
    }
}

export function getPokemonSuccess(result) {
    return {
        type: GET_POKEMON_SUCCESS,
        payload: result
    }
}

export function getPokemonError(error) {
    return {
        type: GET_POKEMON_ERROR,
        payload: error
    }
}

export function getTypes() {
    return {
        type: GET_TYPES
    }
}

export function getTypesSuccess(result) {
    return {
        type: GET_TYPES_SUCCESS,
        payload: result
    }
}

export function getTypesError(error) {
    return {
        type: GET_TYPES_ERROR,
        payload: error
    }
}

