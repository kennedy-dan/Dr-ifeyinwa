import { Grid, makeStyles, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import dynamic from "next/dynamic";
import Spinner from "../UI/spinner";
import Output from "editorjs-react-renderer";
const EditorJs = dynamic(() => import("react-editor-js"), { ssr: false });
const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: "60px",
  },
  Title: {
    fontSize: "40px",
    fontWeight: "bold",
    [theme.breakpoints.down('xs')]:{
      fontSize: '25px',
      textAlign:"center"
    }
  },
  description: {
    fontSize: "25px",
    width: "80%",
    textAlign:"center",

    [theme.breakpoints.down('xs')]:{
      fontSize: '20px',
      textAlign:"center"
    }
  },

  post: {
    fontSize: "22px",
    width: "50%",
    marginTop: "18px",
  },
  summary: {
    fontSize: "22px",
    maxWidth: 900,
    width: '100%',
    marginTop: "18px",
    [theme.breakpoints.down('sm')]:{
      width: '70%',
    },
    [theme.breakpoints.down('xs')]:{
      fontSize:'15px',
      // maxWidth:50,
      // width: '30%',
    }
  },
}));

const blogContentConfig = {
  header: {
    disableDefaultStyle: true,
  },
  paragraph: {
    disableDefaultStyle: true,
  },
  list: {
    disableDefaultStyle: true,
  },
};

const blogContentStyle = {
  header: {
    padding: '1rem 0 .3rem 0',
  },
  paragraph: {
    padding: '.5rem 0',
  },
  list: {
    container: {
      marginLeft: '3rem',
    },
    listItem: {
      padding: '.5rem 0',
    },
  },
};

const BlogDetail = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { blog, loading } = useSelector((state) => state.getSingle);
  const dateCreated = new Date(blog.createdAt).toLocaleString("en-US");

  useEffect(() => {}, []);
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      className={classes.mainGrid}
    >
      {loading ? (
          <Grid container direction='row'  justifyContent='center'  alignItems='center' style={{height:500}}>
          <Spinner/>
        </Grid>
      ) : (
        <>
          <p>{dateCreated}</p>

          <div>
            <p className={classes.Title}>{blog.title}</p>
          </div>
          <>
            <p className={classes.description}>{blog.description}</p>
          </>
          <Grid item>
            {blog.images.map((image) => (
              <Image
                key={image.public_id}
                className="d-block m-auto"
                src={image.url}
                alt={image.name}
                width={400}
                height={400}
              />
            ))}
          </Grid>

          <Typography item className={classes.summary}>
            <Output
              data={blog.post}
              style={blogContentStyle}
              // config={blogContentConfig}
            />
          </Typography>
        </>
      )}
    </Grid>
  );
};

export default BlogDetail;
