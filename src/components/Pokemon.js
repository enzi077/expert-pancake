import React,{useState, useEffect} from 'react'
import { Typography, CircularProgress, Button, Grid } from '@material-ui/core'
import {toUpperFirstChar} from '../Constants'
import Axios from 'axios'

function Pokemon(props) {
	const {history,match}=props
	const {params}=match
	const {pokemonId}=params
    const [pokemon,setPokemon]=useState(undefined)
		
		useEffect(()=>{
			Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
					.then(response=>{
						const {data}=response
						setPokemon(data)
					})
					.catch(error=>{
						setPokemon(false)
					})
		},[pokemonId])
    
    const generatePokemonJSX=()=>{
        const {name,id,species,height,weight,types}=pokemon
        const fullImage=`https://pokeres.bastionbot.org/images/pokemon/${id}.png`
        
        return(
            <>
                <Grid 
                    container
                    style={{padding:'10px'}} 
                    direction='column' 
                    justify='flex-start'>
                    <Typography variant='h2'>
                        {`${toUpperFirstChar(name)}`}
                        {/* <img style={{marginTop:'0'}} src={front_default}/> */}
                    </Typography>
                    <img style={{height:'300px',width:'300px'}} src={fullImage}/>
                    <Typography variant='h4'>
                        Pokemon Info
                    </Typography>
                    <Typography>
                        Species:{species.name}
                    </Typography>
                    <Typography>
                        Height:{height}
                    </Typography>
                    <Typography>
                        Weight:{weight}
                    </Typography>
                    <Typography variant='h6'>Types:</Typography>
                    {types.map(typeInfo=>{
                        const{type}=typeInfo
                        const {name}=type
                        return <Typography key={name}>
                                {`${toUpperFirstChar(name)}`}
                            </Typography>
                    })}
                </Grid>
            </>
        )
    }
  return (
    <>
			{pokemon===undefined && <CircularProgress/>}
			{pokemon!==undefined && pokemon && generatePokemonJSX()}
			{pokemon===false && <Typography>Pokemon not found!</Typography>}
			{pokemon!==undefined && 
			<Button variant='contained' onClick={()=>history.push('/')}>
				Back 
			</Button>}
    </>
    )
}

export default Pokemon
