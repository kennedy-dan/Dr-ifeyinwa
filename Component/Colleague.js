import {
  Grid,
  Typography,
  makeStyles,
  useTheme,
  useMediaQuery,
  Container,
} from "@material-ui/core";
import React from "react";
import Image from "next/image";

const useStyles = makeStyles((theme) => ({
  colleagueGrid: {
    backgroundColor: theme.palette.primary.main,
  },
  img: {
    width: "180px",
    height: "180px",
    boxShadow: "0 1px 8px rgba(0, 0, 0, 0.2)",
    borderRadius: "50%",
    overflow: "hidden",

    [theme.breakpoints.down("xs")]: {
      margin: "auto",
    },
  },
  colleague: {
    fontSize: "44px",
    fontWeight: "bold",
    marginBottom: "30px",
    paddingTop: "100px",
    [theme.breakpoints.down("md")]: {
      fontSize: "40px",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "35px",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "35px",
      textAlign: "center",
    },
  },
  colleagueName: {
    fontSize: "20px",
    marginTop: "10px",
    fontWeight: "bold",
    [theme.breakpoints.down("xs")]: {
      textAlign: "center",
    },
  },
  colleagueTitle: {
    fontSize: "16px",
    opacity: 1,
    color: "black",
    [theme.breakpoints.down("xs")]: {
      textAlign: "center",
    },
  },
  colleagueReview: {
    fontSize: "20px",
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
  colleagueReviewGrid: {
    width: "60%",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
}));

const Colleague = (props) => {
  const classes = useStyles();
  const theme = useTheme();

  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <Grid
      container
      directon="column"
      style={{ marginTop: "180px" }}
      className={classes.colleagueGrid}
    >
      <Grid
        item
        container
        direction="row"
        xs={matchesXS ? 12 : 6}
        justifyContent="center"
      >
        <p className={classes.colleague}>On Working With Me</p>
      </Grid>
      <Grid
        container
        directon="row"
        justifyContent="space-evenly"
        style={{ paddingBottom: "100px" }}
      >
        <Grid item>
          <div className={classes.img}>
            <Image
              src="/images/ogun.png"
              alt="Mrs Daniel Image"
              width={300}
              height={300}
            />
          </div>
          <p className={classes.colleagueName}>Dr O. J. Ogunsola.</p>
          <p className={classes.colleagueTitle}>Lecturer at FUNAAB</p>
        </Grid>
        <Grid item style={{}} className={classes.colleagueReviewGrid}>
          {matchesXS ? (
            <Container>
              {" "}
              <p className={classes.colleagueReview}>
                {" "}
                " Mrs Daniel has a very high sense of creativity and vision to
                achieve her goals in academic research, learning and teaching.
                Academically, she can be rated very high. Her oral and written
                expression in English Language is excellent, an attribute which
                has made her very commendable and consistent with the academic
                environment. She is intellectually endowed, direct and affable.
                She is also emotionally and physically stable and is a woman of
                high moral virtue."{" "}
              </p>
            </Container>
          ) : (
            <p className={classes.colleagueReview}>
              {" "}
              " Mrs Daniel has a very high sense of creativity and vision to
              achieve her goals in academic research, learning and teaching.
              Academically, she can be rated very high. Her oral and written
              expression in English Language is excellent, an attribute which
              has made her very commendable and consistent with the academic
              environment. She is intellectually endowed, direct and affable.
              She is also emotionally and physically stable and is a woman of
              high moral virtue."{" "}
            </p>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};
export default Colleague;
