import React, { Component,useState } from "react";
import { Container, Grid, Typography, Box, Paper, Button,TextField } from "@mui/material";
import { Link ,useNavigate} from "react-router-dom";
import Logo from "../Resources/Images/logo.png";
function Home() {
  const navigate = useNavigate();
  const [distance,setDistance] = useState(0);
  const handleButtonClick = () => {
    navigate("/upload", { state: { distance: distance } });
  }
  console.log(distance);
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
          <div style={{marginTop:"100px"}}></div>
          <Box sx={{
              py:4,
              display:"flex",
              alignItems:"center",
          }}>
             <Grid
            container
            direction="column"
            justifyContent="space-between"
            alignItems="center"
            spacing={4}
          >
            <Grid item>
              <TextField label="Number of Articles" variant="outlined" type="number"
              value ={distance} onChange = {(e)=>{setDistance(e.target.value)}}/>
                
            </Grid>
            <Grid item>
          <Button onClick = {handleButtonClick}>
            Upload Articles

          </Button></Grid>

          </Grid>

          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export default Home;
