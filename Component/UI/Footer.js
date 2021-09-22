import { Grid, makeStyles, useMediaQuery, useTheme } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  footer: {
    margin: "10px",
    fontSize: "16px",
  },
  logo: {
    fontSize: "24px",
    fontWeight: "bold",
  },
  logoGrid: {
    width: "50%",
    [theme.breakpoints.down("xs")]: {
      textAlign: "center",
    },
  },
}));

const Footer = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <footer>
    <Grid
      container
      direction="row"
      justifyContent={matchesXS ? "center" : "space-evenly"}
      style={{ marginTop: "150px", background: "#e4f5fc" }}
      alignItems="center"
    >
      <Grid item className={classes.logoGrid}>
        <p className={classes.logo}>IFY</p>
      </Grid>
      <Grid item>
        <Grid item container direction="row" style={{}}>
          <p className={classes.footer}>LinkedIn</p>
          <p className={classes.footer}>Contact</p>
          <p className={classes.footer}>About</p>
        </Grid>
      </Grid>
    </Grid>
    </footer>
  );
};

export default Footer;
