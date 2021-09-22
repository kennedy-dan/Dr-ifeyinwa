import { Grid, makeStyles, Button, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import Output from "editorjs-react-renderer";



const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: "60px",
  },
  Title: {
    fontSize: "40px",
    fontWeight: "bold",
    [theme.breakpoints.down('xs')]:{
      fontSize:'25px',
      textAlign:'center'
    }
  },
  description: {
    fontSize: "40px",
    width: "80%",
    textAlign: "center",
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
    // alignSelf: 'center',
    [theme.breakpoints.down('sm')]:{
      width: '70%',
    },
    [theme.breakpoints.down('xs')]:{
      fontSize:'15px',
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
    padding: "1rem 0 .3rem 0",
  },
  paragraph: {
    padding: ".5rem 0",
  },
  list: {
    container: {
      marginLeft: "3rem",
    },
    listItem: {
      padding: ".5rem 0",
    },
  },
};

const CourseDetail = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { course } = useSelector((state) => state.getSingleCourse);
  const dateCreated = new Date(course.createdAt).toLocaleString("en-US");


  const output = (
    <Output
    data={course.note}
    style={blogContentStyle}
    config={blogContentConfig}
  />
  )
 



  

  return (
    <>
    <Grid
      container
      direction="column"
      alignItems="center"
      className={classes.mainGrid}
    >
      <p>{dateCreated}</p>

      <div>
        <p className={classes.Title}>{course.courseCode}</p>
      </div>
      <>
        <p className={classes.description}>{course.title}</p>
      </>
      <Grid item>
        {course.images.map((image) => (
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

      <Typography className={classes.summary}>
          {output}
      </Typography>

    </Grid>
 
    </>
  );
};

export default CourseDetail;
