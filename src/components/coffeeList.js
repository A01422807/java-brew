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


export default function CooffeeList() {

  const [data, setData] = useState([]);
  const [currentPage, setcurrentPage] = useState(1)
  let accessToken = localStorage.getItem('token');
  
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` }
  };

  const getCoffee = () => {
    axios.get("http://localhost:8081/coffee/page/"+currentPage,config).then(function (response) {
    // handle success
    console.log(response);
    if(response.status >=200 && response.status<400){
        setData(data.concat(response.data.docs));
        //setData(response.data.docs);
        console.log("datos",data);   
    }
    })
    .catch(function (error) {
    // handle error
    console.log(error);
    });
  };

  useEffect(() => {
    getCoffee();
  },[currentPage]);
  return (
    <Container>
    <Box mt={15}>
        <CssBaseline />
        <h2>Catálogo de cafés</h2>
      {data.map((cafe) => {
        return (
                <Box m={1} key={cafe._id}>
                    <Card variant="outlined">
                    <CardContent>
                        <Typography variant="h4" component="h4">
                        Café cultivado en {cafe.Region}
                        </Typography>
     
                        <Typography variant="h4" component="h1">
                            { (cafe.Aroma > 7.5) &&  <Chip label="Aromático" style={{ backgroundColor:pink[500], color: "white" }}/>   }
                            { (cafe.Acidity > 7.5) &&  <Chip label="Ácido" style={{ backgroundColor:green[500], color: "white" }}/>   }
                            { (cafe.Balance > 7.5) &&  <Chip label="Balanceado" color="primary"/>   }
                            { (cafe.Flavor > 7.5) &&  <Chip label="Gran sabor" style={{ backgroundColor:purple[500], color: "white" }}/>   }
                        </Typography>


                    </CardContent>
                    </Card>
                </Box>
        );
    })}
    </Box>

    <Box display="flex" justifyContent="center" my={2}>
        <Button size="large" color="secondary" onClick={()=>setcurrentPage(currentPage+1)} >
            Cargar más
        </Button>

    </Box>

    
    </Container>
  );
}
