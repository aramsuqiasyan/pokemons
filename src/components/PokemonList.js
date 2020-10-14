import React, { Fragment, useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux';
import { requestPokemons, requestPokemonsByTypes } from "../redux/actions/pokemonsActions";
import './PokemonList.css'
import { Link } from "react-router-dom";
import Pagination from 'rc-pagination'
import Loader from './Loader'

function PokemonsList({ dispatch, pending, pokemons, totalPokemonsCount, types, error }) {
    const [page, setPage] = useState(1);
    const typeRef = useRef(null);
    useEffect(() => {
        dispatch(requestPokemons('limit=10&offset=0'))
    }, []);


    function pageChangeHandler(page) {
        setPage(page)
        const offset = page * 10 - 10
        dispatch(requestPokemons(`limit=10&offset=${offset}`))
    }

    function searchByTypes() {
        dispatch(requestPokemonsByTypes(typeRef.current.value))
    }

    function renderTypes() {
        return (
            <div className='filterByType'>
                <select ref={typeRef}>
                    {
                        types && types.length ?
                            types.map(type => (
                                <option
                                    key={type.name}
                                    value={type.name}
                                >
                                    {titleCase(type.name)}
                                </option>
                            )) :
                            null
                    }
                </select>
                <button onClick={searchByTypes.bind(this)}>Search By Type</button>
            </div>
        )
    }

    function renderPokemons() {
        return (
            <Fragment>
                {renderTypes()}
                <ul className='list-group'>
                    {pokemons && pokemons.map((pokemon) =>
                        <li className='list-item' key={pokemon.name}>
                            <Link to={'pokemon/' + pokemon.name}>
                                <span className='name'>{titleCase(pokemon.name)}</span>
                            </Link>
                        </li>)
                    }
                </ul>
                {totalPokemonsCount ?
                    <div className='pagination-wrapper'>
                        <Pagination
                            total={totalPokemonsCount}
                            onChange={pageChangeHandler}
                            current={page}
                        />
                    </div>
                    : null
                }
            </Fragment>)
    }


    function titleCase(text) {
        return text[0].toUpperCase() + text.slice(1).toLowerCase();
    }

    return (
        <div className="pokemons-list">
            <h2 className='title'>Pokemons List</h2>
            {
                pending ? <Loader /> :
                    error ? 'ERROR' :
                        renderPokemons()
            }
        </div>
    )
}

const mapStateToProps = state => {
    return {
        pending: state.pokemons.pending,
        pokemons: state.pokemons.pokemons,
        totalPokemonsCount: state.pokemons.totalPokemonsCount,
        types: state.pokemons.types,
        error: state.pokemons.error,
    }
};
export default connect(mapStateToProps, null)(PokemonsList);
