import React, { useState, useEffect } from "react";
import {
  Typography,
  CircularProgress,
  Button,
  Grid,
  Card,
  CardActionArea,
  makeStyles
} from "@material-ui/core";
import grey from "@material-ui/core/colors/grey";
import { toUpperFirstChar } from "../Constants";
import Axios from "axios";

const useStyles = makeStyles({
  cardDes: {
    padding: "10px",
    maxWidth: "345px",
    backgroundColor: "#fce9e6"
  },
  buttonStyle: {
    backgroundColor: grey[800],
    "&:hover": {
      backgroundColor: grey[900]
    },
    color: grey[100]
  }
});

function Pokemon(props) {
  const { history, match } = props;
  const { params } = match;
  const { pokemonId } = params;
  const [pokemon, setPokemon] = useState(undefined);
  const classes = useStyles();

  useEffect(() => {
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
      .then(response => {
        const { data } = response;
        setPokemon(data);
      })
      .catch(error => {
        setPokemon(false);
      });
  }, [pokemonId]);

  const generatePokemonJSX = () => {
    const { name, id, species, height, weight, types } = pokemon;
    const fullImage = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;

    return (
      <>
        <Grid
          container
          style={{ padding: "10px" }}
          direction="column"
          justify="flex-start"
          alignItems="flex-start"
        >
          <Grid item>
            <Card className={classes.cardDes}>
              <CardActionArea>
                <Typography variant="h2">{`${toUpperFirstChar(
                  name
                )}`}</Typography>
                <img
                  alt={`${name}`}
                  style={{ height: "300px", width: "300px" }}
                  src={fullImage}
                />
                <Typography variant="h4">Pokemon Info</Typography>
                <Typography>Species:{species.name}</Typography>
                <Typography>Height:{height} feet</Typography>
                <Typography>Weight:{weight} pounds</Typography>
                <Typography variant="h6">Types:</Typography>
                {types.map(typeInfo => {
                  const { type } = typeInfo;
                  const { name } = type;
                  return (
                    <Typography key={name}>{`${toUpperFirstChar(
                      name
                    )}`}</Typography>
                  );
                })}
                <Button
                  variant="contained"
                  onClick={() => history.push("/")}
                  className={classes.buttonStyle}
                >
                  Back
                </Button>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </>
    );
  };
  return (
    <>
      {pokemon === undefined && <CircularProgress />}
      {pokemon !== undefined && pokemon && generatePokemonJSX()}
      {pokemon === false && <Typography>Pokemon not found!</Typography>}
      {pokemon === false && (
        <Button
          variant="contained"
          onClick={() => history.push("/")}
          className={classes.buttonStyle}
        >
          Back
        </Button>
      )}
    </>
  );
}

export default Pokemon;
