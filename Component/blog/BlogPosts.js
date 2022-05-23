import React, { useEffect, useState } from "react";
import Spinner from "../UI/spinner";
import { useDispatch, useSelector } from "react-redux";

import { getBlogPost } from "../../redux/actions/blogActions";
import { Grid, makeStyles, useTheme, useMediaQuery } from "@material-ui/core";
import BlogItem from "./BlogItem";

const useStyles = makeStyles((theme) => ({
  BlogTitle: {
    fontSize: "41px",
    alignSelf: "center",
  },
  mainGrid: {
    width: "90%",
  },
}));

const BlogPosts = () => {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const { posts, loading } = useSelector((state) => state.getBlog);
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));

  useEffect(() => {
    dispatch(getBlogPost());
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
          <h3 className={classes.BlogTitle}>The Blog</h3>
          <Grid
            container
            direction={matchesXS ? "column" : "row"}
            alignItems={matchesXS ? "center" : ""}
            spacing={matchesXS ? "" : 4}
            className={classes.mainGrid}
          >
            {posts && posts.map((post) => <BlogItem post={post} />)}
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default BlogPosts;
