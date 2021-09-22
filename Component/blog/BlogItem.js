import { Grid, makeStyles } from "@material-ui/core";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const useStyles = makeStyles((theme) => ({
  aTag: {
    textDecoration: "none",
    color: theme.palette.secondary.main,
  },
  postDescription: {
    // fontSize:"18px"
  },
}));

const BlogItem = ({ post }) => {
  const classes = useStyles();
  const dateCreated = new Date(post.createdAt).toLocaleString("en-US");

  return (
    <>
      <Grid item xs={4}>
        <Link href={`/blogs/${post._id}`}>
        <Image height={220} width={310} src={post.images[0].url} />
        </Link>
        <p>{dateCreated}</p>
        <h2>
          <Link href={`/blogs/${post._id}`}>
            <a className={classes.aTag}>{post.title}</a>
          </Link>
        </h2>
        <h4 className={classes.postDescription}>{post.description}</h4>
      </Grid>
    </>
  );
};

export default BlogItem;
