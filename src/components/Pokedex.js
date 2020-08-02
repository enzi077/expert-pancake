import React,{useState,useEffect} from 'react'
import {Grid,AppBar,Toolbar, Card, CardContent, 
CircularProgress, CardMedia, Typography, CardActionArea, TextField} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'
import {toUpperFirstChar} from '../Constants'
import Axios from 'axios'

const useStyles=makeStyles({
  pokedexContainer:{
    paddingTop:'20px',
    paddingLeft:'50px',
    paddingRight:'50px'
  },
  cardMedia:{
    margin: 'auto'
  },
  cardContent:{
    textAlign:'center'
  },
  searchContainer:{
      display:'flex',
      padding:'20px'
  },
  searchIcon:{
      alignSelf:'flex-end',
      marginBottom:'2px'
  },
  textField:{
      margin:'2px',
      width:'200px'
  }
})

const Pokedex=(props)=>{
  const {history}=props
  const classes=useStyles()
  const [pokemonData,setPokemonData]=useState({})
  const [filter,setFilter]=useState('')
  
  const handleChange=(e)=>{
      setFilter(e.target.value)
  }
  
  useEffect(() => {
    Axios.get('https://pokeapi.co/api/v2/pokemon?limit=100')
        .then(response=>{
          const{data}=response
          const{results}=data
          const newPokemonData={}
          results.forEach((pokemon,index)=>{
            newPokemonData[index+1]={
              id:index+1,
              name:pokemon.name,
              sprite:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index+1}.png`
            }
          })
          setPokemonData(newPokemonData)
        })
  }, [])
  
  const getPokemonCard=(pokemonId)=>{
    const {id,name,sprite}=pokemonData[pokemonId]
    return(
      <Grid item xs={12} sm={6} md={3} key={pokemonId}>
        <Card onClick={()=>history.push(`/${id}`)}>
          <CardActionArea>
            <CardMedia
              className={classes.cardMedia}
              image={sprite}
              style={{
                height:'130px',
                width:'130px'
              }}
            />
            <CardContent className={classes.cardContent}>
              <Typography>
                {`${id}.${toUpperFirstChar(name)}`}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    )
  }
  
  return(
    <>
      <AppBar position='static'>
        <Toolbar>
            <div className={classes.searchContainer}>
                <SearchIcon className={classes.searchIcon}/>
                <TextField 
                    onChange={handleChange}
                    className={classes.textField}
                    label='Pokemon'
                    variant='standard'
                />
            </div>
        </Toolbar>
      </AppBar>
      {pokemonData ? (
        <Grid container spacing={2} className={classes.pokedexContainer}>
          { Object.keys(pokemonData).map(pokemonId=>
            pokemonData[pokemonId].name.includes(filter) &&
              getPokemonCard(pokemonId)
            )
          }
        </Grid>
      ) : (
        <CircularProgress/>
      )}
    </>
  )
}

export default Pokedex
