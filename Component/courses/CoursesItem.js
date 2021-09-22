import { Grid, makeStyles, Card, useTheme, useMediaQuery } from "@material-ui/core";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const useStyles = makeStyles((theme) => ({
  Card:{
    boxShadow: "0px 9px 15px black",
    marginBottom: '16px'
  },
  aTag: {
    textDecoration: "none",
    color: theme.palette.secondary.main,
  },
  courseCode: {
    textAlign: "center",
    fontSize: "20px",
    cursor: 'pointer'
  },
  courseTitle: {
    textAlign: "center",
    fontSize: "20px",
  },
  dateCreated:{
    fontSize: "13px",
    textAlign: "center",

  }
}));
const CoursesItem = ({ cours }) => {
  const classes = useStyles();
  const theme = useTheme()
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));

  const dateCreated = new Date(cours.createdAt).toLocaleString("en-US");
  return (
    <>
      <Grid item xs={matchesXS? '' : 4}>
        <Card className={classes.Card}>
          <p className={classes.dateCreated}>{dateCreated}</p>

          <Link href={`/courses/${cours._id}`}>
            <p className={classes.courseCode}>
              <span style={{ fontSize: "14px" }}>Course Code:</span>
              {cours.courseCode}
            </p>
          </Link>
          <p className={classes.courseTitle}>
          <span style={{ fontSize: "14px" }}>Course Title:</span>
          
            {cours.title}</p>
        </Card>
      </Grid>
    </>
  );
};

export default CoursesItem;
