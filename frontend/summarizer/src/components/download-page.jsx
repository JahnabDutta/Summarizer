import React, { Component, useState, useEffect } from "react";

import {
  Container,
  Grid,
  Typography,
  Box,
  Paper,
  Button,
  TextField,
} from "@mui/material";
import { Link ,useLocation} from "react-router-dom";
import file from "../demo.txt";
import Logo from "../Resources/Images/logo.png";

function DownloadPage() {
  const { state } = useLocation();
  const {finalText } = state;
  const TextContent = () => {
    return <Typography>{finalText}</Typography>;
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
              <Typography variant="h4">Here's your article</Typography>
            </Grid>
            <Grid item>
              <img src={Logo} alt="logo" style={{ maxHeight: "100px" }}></img>
            </Grid>
          </Grid>
          <div
            style={{ width: "100%", height: "100%", marginTop: "100px" }}
          ></div>
          <TextContent></TextContent>
           <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <Grid item>
              <Button> Download</Button>
            </Grid>
            <Grid item>
              <Button component={Link} to="/">
                {" "}
                Summarize another
              </Button>
            </Grid>
          </Grid> 
        </Box>
      </Paper>
    </Container>
  );
}

export default DownloadPage;
