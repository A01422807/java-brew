import React from "react";
import { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import Box from "@material-ui/core/Box";

import Chip from "@material-ui/core/Chip";
import { green, pink, purple } from "@material-ui/core/colors";
import axios from 'axios';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { baseURL } from '../config';
import CardActions from '@material-ui/core/CardActions';
import { useMutation, gql } from '@apollo/client';

const CREATE_LINK_MUTATION = gql`
mutation addFavorite($Aroma:Float! ,$aromaN:Float!, $Flavor:Float!, $flavorN:Float!,$Aftertaste:Float!, $aftertasteN:Float!, $acidityN:Float,$Body:Float!, $bodyN:Float!, $Balance:Float!, $balanceN:Float!, $Moisture:Float!, $moistureN:Float!,$altitudeN:Float!, $userId:String! ,$Region:String!){
  addFavorite(Aroma:$Aroma , aromaN:$aromaN, Flavor:$Flavor , flavorN:$flavorN ,  Aftertaste:$Aftertaste, aftertasteN:$aftertasteN, Acidity:11, acidityN:$acidityN, Body:$Body , bodyN:$bodyN, Balance:$Balance, balanceN:$balanceN, Moisture: $Moisture, moistureN: $moistureN, altitude_mean_meters: 123 , altitudeN:$altitudeN , userId: $userId, Region:$Region){
    Aroma
    aromaN
    Flavor
    flavorN
    Aftertaste
    aftertasteN
    Acidity
    acidityN
    Body
    bodyN
    Balance
    balanceN
    Moisture
    moistureN
    altitude_mean_meters
    altitudeN
    userId
    Region
  }
}

`;

export default function CooffeeList() {
  const [data, setData] = useState([]);
  const [currentPage, setcurrentPage] = useState(1);
  const [user,setUser] = useState({});
  let accessToken = localStorage.getItem("token");
  const [addFavorite] = useMutation(CREATE_LINK_MUTATION);
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };

  const getCoffee = () => {
    if (accessToken) {
      axios
        .get(baseURL+"/coffee/page/" + currentPage, config)
        .then(function (response) {
          // handle success
          console.log(response);
          if (response.status >= 200 && response.status < 400) {
            setData(data.concat(response.data.docs));
            //setData(response.data.docs);
          }
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    } else {
    }
  };

  useEffect(() => {
    getCoffee();
    // eslint-disable-next-line
  }, [currentPage]);

  useEffect( ()=>{
    if(accessToken){
      axios
        .get(baseURL+"/profile", config)
        .then(function (response) {
          // handle success
          console.log(response);
          if (response.status >= 200 && response.status < 400) {
            setUser( response.data );
          }
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });

    }
    // eslint-disable-next-line
  } ,[]);
  const addFav = (cafe)=>{
    console.log("Favorito a agregar: ",cafe);
    addFavorite({ variables: { 
      Aroma: cafe.Aroma,
      aromaN : cafe.aromaN,
      Flavor : cafe.Flavor,
      flavorN : cafe.flavorN,
      Aftertaste : cafe.Aftertaste,
      aftertasteN : cafe.aftertasteN,
      Acidity: cafe.Acidity,
      acidityN : cafe.acidityN,
      Body : cafe.Body,
      bodyN : cafe.bodyN,
      Balance : cafe.Balance,
      balanceN : cafe.balanceN,
      Moisture : cafe.Moisture,
      moistureN : cafe.moistureN,
      altitude_mean_meters : cafe.altitude_mean_meters,
      altitudeN : cafe.altitudeN,
      userId : user._id,
      Region : cafe.Region
    } });
  }
  return (
    <>
      <Container>
        {accessToken ? (
          <Box mt={15}>
            <h2>Catálogo de cafés</h2>
            <CssBaseline />

            {data.map((cafe) => {
              return (
                <Box m={1} key={cafe._id}>
                  <Card variant="outlined">
                    <CardContent>
                      {cafe.Region && cafe.Region.length > 1 ? (
                        <Typography variant="h4" component="h4">
                          Café cultivado en {cafe.Region}
                        </Typography>
                      ) : (
                        <Typography variant="h4" component="h4">
                          Cosecha sin origen
                        </Typography>
                      )}
                      <Typography variant="h4" component="h1">
                        {cafe.Aroma > 7.5 && (
                          <Chip
                            label="Aromático"
                            style={{
                              backgroundColor: pink[500],
                              color: "white",
                            }}
                          />
                        )}
                        {cafe.Acidity > 7.5 && (
                          <Chip
                            label="Ácido"
                            style={{
                              backgroundColor: green[500],
                              color: "white",
                            }}
                          />
                        )}
                        {cafe.Balance > 7.5 && (
                          <Chip label="Balanceado" color="primary" />
                        )}
                        {cafe.Flavor > 7.5 && (
                          <Chip
                            label="Gran sabor"
                            style={{
                              backgroundColor: purple[500],
                              color: "white",
                            }}
                          />
                        )}
                      </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                      <Button size="large" onClick={()=>addFav(cafe)} >Añadir a favoritos</Button>
                    </CardActions>
                  </Card>
                </Box>
              );
            })}
            <Box display="flex" justifyContent="center" my={2}>
              <Button
                size="large"
                color="secondary"
                onClick={() => setcurrentPage(currentPage + 1)}
              >
                Cargar más
              </Button>
            </Box>
          </Box>
        ) : (
          <Box mt={15}>
            <h2>
              Necesitas estar autenticado, inicia sesión para ver el catálogo de
              café
            </h2>
          </Box>
        )}
      </Container>
    </>
  );
}
