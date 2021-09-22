import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";

import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import dynamic from "next/dynamic";
const EditorJs = dynamic(() => import("react-editor-js"), { ssr: false });

import { createBlog, clearErrors } from "../../redux/actions/blogActions";
import { CREATE_BLOG_RESET } from "../../redux/constants/blogConstant";
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


const NewBlog = () => {
  const classes = useStyles();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [post1, setPost1] = useState("");
  const [editorTools, setEditorTools] = useState();


  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const dispatch = useDispatch();
  const router = useRouter();

  const { loading, error, success } = useSelector((state) => state.createBlog);


  const onSaveHandler = async (editorInstance) => {
      const post = await editorInstance.save();
      // const post = JSON.stringify(data)
      if (!title || title === "")
        throw new Error("Title cannot be empty. Please enter title");
      if (!post.blocks[0])
        throw new Error("Blog cannot be empty. Please enter some data");
        // props.onSave(post, title, description, images);

      const blog = {
        title,
        description,
        images,
        post,
      };
      dispatch(createBlog(blog));
   
  };



  let blogContent;
  if (!editorTools) blogContent = <p>loading...</p>;
  else
    blogContent = (
      <EditorJs
        instanceRef={(instance) => (editorInstance = instance)}
        tools={editorTools}
        // readOnly={readOnly}
        data={post1}
        placeholder={`Let's write an awesome blog!`}
      />
    );



  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      router.push("/blogs");
      dispatch({ type: CREATE_BLOG_RESET });
    }

    const importConstants = async () => {
      const tools = (await import("./EditorConstants")).default;
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
              label="Title"
              className={classes.TextField1}
              variant="filled"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              InputProps={{
                disableUnderline: true,
              }}
            ></TextField>
            <TextField
              label="description"
              className={classes.TextField1}
              variant="filled"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              InputProps={{
                disableUnderline: true,
              }}
            ></TextField>
            <Typography component="div" className={classes.blogContent}>
              {blogContent}
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
          <Button size="small" onClick={() => onSaveHandler(editorInstance)} color="secondary" variant='contained'>
            Create Blog
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default NewBlog;
