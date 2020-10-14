import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { getPokemon, requestPokemon } from '../redux/actions/pokemonsActions';
import Loader from './Loader'
import './PokemonView.css'

function PokemonView({ dispatch, match, pending, selectedPokemon, error }) {
    useEffect(() => {
        dispatch(requestPokemon(match.params.name))
    }, [])


    function rednerPokemonCard() {
        if (selectedPokemon) {
            return (
                <div className='pokemon-card'>
                    <div className='pokemon-card-header'>
                        {selectedPokemon.name}
                    </div>
                    <div className='pokemon-card-body'>
                        <div className='pokemon-images'>
                            {
                                selectedPokemon.sprites.front_default && selectedPokemon.sprites.back_default ?
                                    <div className='image1'>
                                        <img src={selectedPokemon.sprites.front_default} />
                                        <img src={selectedPokemon.sprites.back_default} />
                                    </div> :
                                    null
                            }
                            {
                                selectedPokemon.sprites.front_shiny && selectedPokemon.sprites.back_shiny ?
                                    <div className='image2'>
                                        <img src={selectedPokemon.sprites.front_shiny} />
                                        <img src={selectedPokemon.sprites.back_shiny} />
                                    </div> :
                                    null
                            }

                        </div>
                        <div className='pokemon-info'>
                            <p>Weight: <span>{selectedPokemon.weight} g.</span></p>
                            <p>Height: <span>{selectedPokemon.height} cm</span></p>
                            <p>Base Experience: <span>{selectedPokemon.base_experience} xp</span></p>
                            <p>Order: <span>{selectedPokemon.order}</span></p>
                        </div>

                        <div className='pokemon-stats'>
                            <span className='title'>Stats:</span>
                            {
                                selectedPokemon.stats.length ?
                                    selectedPokemon.stats.map(stat => (
                                        <span className='pokemon-stat' key={stat.stat.name}>
                                            {stat.stat.name}
                                            <sup>({stat.base_stat})</sup>
                                        </span>
                                    )) :
                                    'No Stats'
                            }
                        </div>

                        <div className='pokemon-types'>
                            <span className='title'>Types:</span>
                            {
                                selectedPokemon.types.length ?
                                    selectedPokemon.types.map(type => (
                                        <span className='pokemon-type' key={type.type.name}>{type.type.name}</span>
                                    )) :
                                    'No Types'
                            }
                        </div>

                    </div>
                    <div className='pokemon-card-footer'>

                    </div>
                </div>
            )
        } else {
            return <div className='no-results'>No Results</div>
        }
    }

    return (
        <div className="pokemons-view">
            {
                pending ? <Loader /> :
                    error ? 'Error' :
                        rednerPokemonCard()
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        pending: state.pokemons.pending,
        selectedPokemon: state.pokemons.selectedPokemon,
        error: state.pokemons.error,
    }
};
export default connect(mapStateToProps, null)(PokemonView);
