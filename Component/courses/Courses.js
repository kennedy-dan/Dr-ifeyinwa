import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getCourses } from "../../redux/actions/courseActions";
import { Grid, makeStyles } from "@material-ui/core";
import CoursesItem from "./CoursesItem";
import Spinner from '../UI/spinner'

const useStyles = makeStyles((theme) => ({
  BlogTitle: {
    fontSize: "41px",
    alignSelf: "center",
  },
}));

const Courses = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { course, loading } = useSelector((state) => state.getCourses);

  useEffect(() => {
    dispatch(getCourses());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          style={{ height: 500 }}
        >
          <Spinner />
        </Grid>
      ) : (
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <h3 className={classes.BlogTitle}>All Courses</h3>
          <Grid container direction="row" spacing={4} style={{ width: "90%" }}>
            {course && course.map((cours) => <CoursesItem cours={cours} />)}
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Courses;
