import React, { Component, useState, useEffect } from "react";
import {
  Container,
  Button,
  Typography,
  Grid,
  Paper,
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  CircularProgress,
  Snackbar
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../Resources/Images/logo.png";
import { ClassNames } from "@emotion/react";

import MuiAlert from "@mui/lab/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
function UploadPage() {
  const [file, setFile] = useState(null);
  const url = "http://localhost:8000";
  const [fileList, setFileList] = useState([]);
  const [textList, setTextList] = useState([]);
  const [progressbarState,setProgressbarState] = useState(false);
  const [articleOpen,setArticleOpen] = useState(false);
  const { state } = useLocation();
  const { distance, numArticles } = state;
  const navigate = useNavigate();
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    var tempFileList = fileList;
    tempFileList.push(e.target.files[0]);
    setFileList(tempFileList);

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      var tempTextList = textList;
      tempTextList.push(text);
      setTextList(tempTextList);
    };
    reader.readAsText(e.target.files[0]);
  };

  const closeArticleOpen=(event, reason)=>{
    if (reason === "clickaway") {
      return;
    }

    setArticleOpen(false);

  }

  const handleSubmit = () => {
    if (fileList.length != numArticles) {
      setArticleOpen(true);
      return;
    }
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text_list: textList,
        distance: distance,
        num_articles: numArticles,
      }),
    };
    setProgressbarState(true);
    fetch(`${url}/engine/get-summary/`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        const finalText = data.file;
        setProgressbarState(false);
        return finalText;
      })
      .then((finalText) => {
        navigate("/download", { state: { finalText: finalText } });
      });

    // .then(() => {console.log(finalText);
    //   navigate("/download", { state: { finalText: finalText }})});
  };

  const handleDelete = () => {
    setFileList([]);
    setTextList([]);
    setFile(null);
  };
  //react component to show the file data
  const RenderFileList = () => {
    return (
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
        >
          {fileList.map((file, index) => {
            return (
              <Grid item key={index}>
                <Typography variant="h6">{file.name}</Typography>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    );
  };

  const ProgressBar=()=>{
    return(
      <Dialog
      open={progressbarState}
      aria-labelledby="simple-dialog-title"
   

      
      >
         <DialogTitle id="simple-dialog-title">Generating the Summary</DialogTitle>
        <DialogContent   style={{paddingLeft:"40%"}}>
        <CircularProgress /> 
     
        </DialogContent>
      </Dialog>
    )
  }
  

  return (
    <Container component="main" maxWidth="md">
      <ProgressBar/>
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
              <Typography variant="h4">Fetch Articles</Typography>
            </Grid>
            <Grid item>
              <img src={Logo} alt="logo" style={{ maxHeight: "100px" }}></img>
            </Grid>
          </Grid>
          <div
            style={{ width: "100%", height: "100%", marginTop: "100px" }}
          ></div>

          <Grid
            container
            direction="column"
            justify="space-between"
            alignItems="center"
          >
            <Grid item>
              {" "}
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
              >
                <Grid item>
                  {" "}
                  <Button component="label">
                    Upload Articles
                    <input
                      type="file"
                      accept=".txt"
                      hidden
                      onChange={handleFileChange}
                    />
                  </Button>
                </Grid>
                <Grid item>
                  <Button component={Link} to="/">
                    Go back
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              {" "}
              <RenderFileList />
            </Grid>
            <Grid item>
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
              >
                <Grid item>
                  {" "}
                  {fileList.length > 0 ? (
                    <Button onClick={handleSubmit}>Get Summary</Button>
                  ) : null}
                </Grid>
                <Grid item>
                  {fileList.length > 0 ? (
                    <Button onClick={handleDelete} color="error">
                      Delete All
                    </Button>
                  ) : null}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Paper>
      <Snackbar
        open={articleOpen}
        autoHideDuration={5000}
        onClose={closeArticleOpen}
      >
        <Alert onClose={closeArticleOpen} severity="error">
          Select {numArticles} articles
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default UploadPage;
