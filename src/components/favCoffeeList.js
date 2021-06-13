import React from "react";
import { useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Chip from "@material-ui/core/Chip";
import { green, pink, purple } from "@material-ui/core/colors";
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';

import { useLazyQuery, gql } from '@apollo/client';
import { baseURL } from '../config';
import axios from 'axios';

const FEED_QUERY = gql`
query getFavorites($userId: String!){
    getFavorites(userId: $userId){
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
  
export default function FavCoffeeList(){
    //const [user,setUser] = useState({});
    let accessToken = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };
    const [getFavs,{ data }] = useLazyQuery(FEED_QUERY);
    
    useEffect( ()=>{
      if(accessToken){
        axios
          .get(baseURL+"/profile", config)
          .then(function (response) {
            // handle success
            console.log(response);
            if (response.status >= 200 && response.status < 400) {
              getFavs({ variables: { userId:response.data._id}});
            }
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          });
  
      }
    // eslint-disable-next-line
    } ,[]);

      return (
        <>
          <Container>
            { (accessToken && data) ? (
              <Box mt={15}>
                <h2>Tus cafés favoritos </h2>
                <CssBaseline />
                {data.getFavorites.map((cafe) => {
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
                      </Card>
                    </Box>
                  );
                })}
              </Box>
            ) : (
              <Box mt={15}>
                <h2>
                  Cargando...
                </h2>
              </Box>
            )}
          </Container>
        </>
      );

}