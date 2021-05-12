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


export default function CooffeePreview(){
    const [data, setData] = useState([]);

    const getCoffee =()=>{
        axios
        .get(baseURL+"/coffee")
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
    }

    useEffect(() => {
        getCoffee();
        // eslint-disable-next-line
      }, []);


    return <>
    <Container>
    <h2>Catálogo de muestra cafés</h2>
    <CssBaseline />
    {data.map((cafe) => {
              return (
                <Box m={1} key={cafe._id}>
                  <Card variant="outlined">
                    <CardContent>
                      {(cafe.Region && cafe.Region.length>1) ?  
                      <Typography variant="h4" component="h4">
                        Café cultivado en {cafe.Region}
                      </Typography>
                        : <Typography variant="h4" component="h4">
                        Cosecha sin origen
                      </Typography>}
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
    </Container>
    
    
    </>

}