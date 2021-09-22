import { Grid, Typography, makeStyles, useMediaQuery, useTheme, Container } from "@material-ui/core";
import React from "react";
import { Cards } from "./UI/Card";
import Image from 'next/image'
import bg from '../public/images/careerbg.svg'


const useStyles = makeStyles((theme) => ({
  mainGrid: {
    width: "40%",
    [theme.breakpoints.down("xs")]: {
     width : "100%",
    },
  },
  mainGrid2: {
    width: "40%",
    align:"center",
    // height: "100vh",

    [theme.breakpoints.down("xs")]: {
     width : "100%",
     textAlign: 'center',
    },

  },
 
  carrier: {
    fontSize: "44px",
    fontWeight: "bold",
    [theme.breakpoints.down("md")]: {
      fontSize: "40px",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "35px",
    },
    [theme.breakpoints.down("xs")]: {
      textAlign : "center",
     },
  },
  carrierDetails: {
    fontSize: "20px",
    letterSpacing: "1px",
    lineHeight: "34px",
    [theme.breakpoints.down("md")]: {
      fontSize: "18px",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "15px",
    },
    [theme.breakpoints.down("xs")]: {
      textAlign : "center",
     },
  },
}));

 const Carrier = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-evenly"
      style={{ marginTop: "190px" }}
      alignItems="center"
    >

      <Grid item style={{}} className={classes.mainGrid}>
        <p className={classes.carrier}>My Career So Far</p>
        {matchesXS ? <Container>
          <p className={classes.carrierDetails}>
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.{" "}
        </p>
        </Container>:   <p className={classes.carrierDetails}>
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.{" "}
        </p> }
      
      </Grid>
      <Grid item className={classes.mainGrid2}>
        <Cards />
      </Grid>
    </Grid>
  );
};
export default Carrier