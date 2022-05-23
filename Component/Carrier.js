import {
  Grid,
  Typography,
  makeStyles,
  useMediaQuery,
  useTheme,
  Container,
} from "@material-ui/core";
import React from "react";
import { Cards } from "./UI/Card";
import Image from "next/image";
import bg from "../public/images/careerbg.svg";

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    width: "40%",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  mainGrid2: {
    width: "40%",
    align: "center",
    // height: "100vh",

    [theme.breakpoints.down("xs")]: {
      width: "100%",
      textAlign: "center",
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
      textAlign: "center",
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
      textAlign: "center",
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
        {matchesXS ? (
          <Container>
            <p className={classes.carrierDetails}>
              I have worked for various schools, Universities and colleges.I Got
              my B.Sc from the University of Nigeria, Nsukka. My M.Sc and PhD
              from univerity of Lagos and Federal University of Agriculture
              Abeokuta respectively. I Currently work as an assistant lecturer
              at Spiritan University Nneochi.
            </p>
          </Container>
        ) : (
          <p className={classes.carrierDetails}>
            I have worked for various schools, Universities and colleges. Got my
            B.Sc from the University of Nigeria, Nsukka, my M.Sc and PhD from
            univerity of Lagos and Federal University of Agriculture Abeokuta
            respectively. I Currently work as a lecturer at Spiritan University
            Nneochi.
          </p>
        )}
      </Grid>
      <Grid item className={classes.mainGrid2}>
        <Cards />
      </Grid>
    </Grid>
  );
};
export default Carrier;
