import React, { Component, useState } from "react";
import {
  Container,
  Grid,
  Typography,
  Box,
  Paper,
  Button,
  TextField,
  Tooltip,
  Snackbar
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../Resources/Images/logo.png";
import MuiAlert from "@mui/lab/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
function Home() {
  const navigate = useNavigate();
  const [numArticles, setNumArticles] = useState(1);
  const [distance, setDistance] = useState(0);
  const [articleOpen,setArticleOpen] = useState(false);
  const [distanceOpen,setDistanceOpen] = useState(false);


  const closeArticleOpen=(event, reason)=>{
    if (reason === "clickaway") {
      return;
    }

    setArticleOpen(false);

  }
  const closeDistanceOpen=(event, reason)=>{
    if (reason === "clickaway") {
      return;
    }

    setDistanceOpen(false);


  }

  const handleButtonClick = () => {
    if(numArticles<1){
      setArticleOpen(true);
      return;
    }
    if(distance<1 || distance>9){
      setDistanceOpen(true);
      return;
    }
   
    navigate("/upload", {
      state: { distance: distance, numArticles: numArticles },
    });
  };
  return (
    <Container component="main" maxWidth="md">
      <Paper elevation={2}>
        <Box
          sx={{
            p: 4,
            m: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="flex-end"
          >
            <Grid item>
              <Typography variant="h5">Multi Article Summarizer</Typography>
            </Grid>
            <Grid item>
              <img src={Logo} alt="logo" style={{ maxHeight: "100px" }}></img>
            </Grid>
          </Grid>
          <div style={{ marginTop: "100px" }}></div>
          <Box
            sx={{
              py: 4,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Grid
              container
              direction="column"
              justifyContent="space-between"
              alignItems="center"
              spacing={4}
            >
              <Grid item>
                <Typography variant="P" stlye={{ textAlign: "center" }}>
                  Multi Article Summarizer helps you summarize multiple articles
                  into into concise, easy to digest content so you can free
                  yourself from information overload
                </Typography>
              </Grid>
              <Grid item>
                <Tooltip title="Please enter the number of articles you'd like to summarize">
                  <TextField
                    label="Number of Articles"
                    variant="outlined"
                    type="number"
                    value={numArticles}
                    onChange={(e) => {
                      setNumArticles(e.target.value);
                    }}
                  />
                </Tooltip>
              </Grid>
              <Grid item>
                <Tooltip title="Closeness defines how closely the given aritcles are related to each other">
                  <TextField
                    label="Closeness of articles"
                    variant="outlined"
                    type="number"
                    value={distance}
                    onChange={(e) => {
                      setDistance(e.target.value);
                    }}
                  />
                </Tooltip>
              </Grid>
              <Grid item>
                <Button onClick={handleButtonClick}>Upload Articles</Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Paper>
      <Snackbar
        open={articleOpen}
        autoHideDuration={5000}
        onClose={closeArticleOpen}
      >
        <Alert onClose={closeArticleOpen} severity="error">
          Select Atleast One Article
        </Alert>
      </Snackbar>
      <Snackbar
        open={distanceOpen}
        autoHideDuration={5000}
        onClose={closeDistanceOpen}
      >
        <Alert onClose={closeDistanceOpen} severity="error">
          Closeness must be between 1 and 10
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default Home;
