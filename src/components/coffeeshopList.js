import React from "react";
import { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import Box from "@material-ui/core/Box";

import axios from 'axios';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { baseURL } from '../config';

export default function CafeteriaList() {
  const [data, setData] = useState([]);
  const [currentPage, setcurrentPage] = useState(1);
  let accessToken = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };

  const getCafeteria = () => {
    if (accessToken) {
      axios
        .get(baseURL+"/cafeterias/page/" + currentPage, config)
        .then(function (response) {
          // handle success
          console.log(response);
          if (response.status >= 200 && response.status < 400) {
            setData(data.concat(response.data.cafeterias.docs));
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
    getCafeteria();
    // eslint-disable-next-line
  }, [currentPage]);

  return (
    <>
      <Container>
        {accessToken ? (
          <Box mt={15}>
            <h2>Catálogo de cafeterias</h2>
            <CssBaseline />

            {data.map((cafe) => {
              return (
                <Box m={1} key={cafe._id}>
                  <Card variant="outlined">
                    <CardContent>
                        <Typography variant="h4" component="h4">
                          {cafe.Nombre}
                        </Typography>
                    </CardContent>
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
              cafeterias
            </h2>
          </Box>
        )}
      </Container>
    </>
  );
}
