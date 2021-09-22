import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import dynamic from "next/dynamic";
const EditorJs = dynamic(() => import("react-editor-js"), { ssr: false });

import { createCourses, clearErrors } from "../../redux/actions/courseActions";
import { CREATE_COURSE_RESET } from "../../redux/constants/coursesCostants";

import {
  Card,
  CardContent,
  Grid,
  TextField,
  makeStyles,
  CardActions,
  Button,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  TextField1: {
    marginBottom: "10px",
    width: "100%",
  },
  card: {
    // maxWidth:'90%'
    width: "70%",
  },
  imgInput: {},
  chooseImg: {
    border: "1px solid black",
  },
}));
let editorInstance;

const Course = () => {
  const classes = useStyles();
  const [courseCode, setCourseCode] = useState("");
  const [title, setTitle] = useState("");

  const [post1, setPost1] = useState("");
  const [editorTools, setEditorTools] = useState();

  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const { loading, error, success } = useSelector(
    (state) => state.createCourse
  );

  const dispatch = useDispatch();
  const router = useRouter();

  const onSaveHandler = async (editorInstance) => {
    const note = await editorInstance.save();
    // const post = JSON.stringify(data)
    if (!title || title === "")
      throw new Error("Title cannot be empty. Please enter title");
    if (!note.blocks[0])
      throw new Error("Note cannot be empty. Please enter some data");
    // props.onSave(post, title, description, images);

    const courses = {
      title,
      courseCode,
      images,
      note,
    };
    dispatch(createCourses(courses));
  };

  let courseContent;
  if (!editorTools) courseContent = <p>loading...</p>;
  else
    courseContent = (
      <EditorJs
        instanceRef={(instance) => (editorInstance = instance)}
        tools={editorTools}
        data={post1}
        placeholder={`Create a Course!`}
      />
    );

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      router.push("/courses");
      dispatch({ type: CREATE_COURSE_RESET });
    }

    const importConstants = async () => {
      const tools = (await import("../blog/EditorConstants")).default;
      setEditorTools(tools);
    };

    importConstants();
  }, [dispatch, error, success]);

  const onChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((oldArray) => [...oldArray, reader.result]);
          setImagesPreview((oldArray) => [...oldArray, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <Grid container direction="row" justifyContent="center">
      <Card className={classes.card}>
        <CardContent>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <TextField
              label="course code"
              className={classes.TextField1}
              variant="filled"
              value={courseCode}
              onChange={(e) => setCourseCode(e.target.value)}
              InputProps={{
                disableUnderline: true,
              }}
            ></TextField>
            <TextField
              label="Title"
              className={classes.TextField1}
              variant="filled"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              InputProps={{
                disableUnderline: true,
              }}
            ></TextField>
            <Typography component="div" className={classes.blogContent}>
              {courseContent}
            </Typography>
            <Grid container direction="column">
              <label>Images</label>
              <div className="custom-file">
                <input
                  type="file"
                  name="room_images"
                  className={classes.imgInput}
                  id="customFile"
                  onChange={onChange}
                  multiple
                />
                {/* <label className={classes.chooseImg} htmlFor="customFile">
            Choose Images
          </label> */}
              </div>

              {imagesPreview.map((img) => (
                <img
                  src={img}
                  key={img}
                  alt="Images Preview"
                  className="mt-3 mr-2"
                  width="55"
                  height="52"
                />
              ))}
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => onSaveHandler(editorInstance)}>
            Create Course
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default Course;
