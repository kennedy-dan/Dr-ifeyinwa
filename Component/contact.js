import React, { useState, useEffect, useRef } from "react";
import {
  Grid,
  TextField,
  Button,
  makeStyles,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import contactbg from "../public/images/contact.svg";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Email, PanTool, Attachment } from "@material-ui/icons";
import { createMessage, clearErrors } from "../redux/actions/messageActions";
import { createPdf, clearError } from "../redux/actions/pdfActions";
import { CREATE_MESSAGE_RESET } from "../redux/constants/messageConstants";
const useStyles = makeStyles((theme) => ({
  TextField3: {
    width: "454px",
    "& .MuiFilledInput-root": {
      background: "#e4f5fc",
    },
    [theme.breakpoints.down("md")]: {
      width: "354px",
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  contactMsgGrid: {
    width: "40%",
    position: "relative",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      textAlign: "center",
    },
  },
  contactMsg: {
    fontSize: "64px",
    zIndex: 1,
    [theme.breakpoints.down("md")]: {
      fontSize: "60px",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "50px",
    },
  },
  TextFieldContainer: {
    width: "40%",
    [theme.breakpoints.down("sm")]: {
      width: "90%",
    },
  },
  TextField1: {
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.secondary.main,
    },
    "&:hover.MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.secondary.main,
    },
    "& .MuiFilledInput-root": {
      background: "#e4f5fc",
    },
    [theme.breakpoints.down("md")]: {
      width: "169px",
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  TextField2: {
    "& .MuiFilledInput-root": {
      background: "#e4f5fc",
    },
    [theme.breakpoints.down("md")]: {
      width: "169px",
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  filebtn: {
    width: "80px",
    marginTop: "10px",
    backgroundColor: "#96dcfa",
    textTransform: "none",
    fontFamily: "poppins",
    fontSize: "12px",
    borderRadius: 10,
    // boxShadow: "0px 9px 15px black",
    [theme.breakpoints.down("sm")]: {
      margin: "0 auto",
      marginTop: "10px",
    },
    "&:hover": {
      backgroundColor: "#96dcfa",
      boxShadow: "0px 9px 15px black",
    },
  },
  btn: {
    width: "100px",
    marginTop: "10px",
    backgroundColor: "#96dcfa",
    textTransform: "none",
    fontFamily: "poppins",
    fontSize: "15px",
    borderRadius: 10,
    boxShadow: "0px 9px 15px black",
    [theme.breakpoints.down("sm")]: {
      margin: "0 auto",
      marginTop: "10px",
    },
    "&:hover": {
      backgroundColor: "#96dcfa",
      boxShadow: "0px 9px 15px black",
    },
  },
  btnMsg: {
    width: "130px",
    marginTop: "10px",
    // padding:'20px',
    marginLeft: "40px",
    backgroundColor: theme.palette.secondary.main,
    textTransform: "none",
    fontFamily: "poppins",
    fontSize: "15px",
    borderRadius: 10,
    boxShadow: "0px 9px 15px black",
    [theme.breakpoints.down("sm")]: {
      margin: "0 auto",
      marginTop: "10px",
    },
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
      boxShadow: "0px 9px 15px black",
    },
  },
  mailIcon: {
    fontSize: "14px",
    marginRight: "5px",
  },
  formControll: {
    [theme.breakpoints.down("sm")]: {
      margin: "0 auto",
      width: "100%",
    },
  },
  fieContainer: {
    border: "3px solid #e4f5fc",
    width: "85%",
    display: "block",
    marginTop: "30px",
    paddingTop: "4px",
    paddingBottom: "6px",
    paddingLeft: "10px",
    borderRadius: "10px",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  attachIcon: {
    fontSize: "32px",
    cursor: "pointer",
  },
}));

const Contact = (props) => {
  const classes = useStyles();
  const theme = useTheme();

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const { success, error } = useSelector((state) => state.cr);
  const { successs, err } = useSelector((state) => state.pdf);
  const [pdfs, setPdfFile] = useState(null);

  // pdf file error state
  const [pdfError, setPdfError] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const [selectedFile, setselectedFile] = useState();

  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      toast.success("message sent");
    }
  }, [dispatch, success, error]);

  useEffect(() => {
    if (err) {
      toast.error(err);
      dispatch(clearError());
    }
    if (successs) {
      toast.success("message sent");
    }
  }, [dispatch, successs, err]);

  const submitMsg = (e) => {
    e.preventDefault();

    const msg = {
      name,
      email,
      message,
    };
    dispatch(createMessage(msg));
  };

  const handlePdfFileSubmit = (e) => {
    e.preventDefault();
    const pdfss = {
      name,
      pdfs,
    };
    console.log(pdfss);
    dispatch(createPdf(pdfss));
  };

  const fileType = ["application/pdf"];

  const handlePdfFileChange = (e) => {
    if (e.target.name === "pdf") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setPdfFile(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setPdfFile(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
      setselectedFile(e.target.files[0].name);
    }
  };

  return (
    <Grid
      container
      direction={matchesSM ? "column" : "row"}
      justifyContent="space-evenly"
      alignItems="center"
      style={{ marginTop: "180px" }}
    >
      <Grid item container className={classes.contactMsgGrid}>
        <Image src={contactbg} layout="fill" objectFit="contain" />
        <div style={{ zIndex: 1 }}>
          <h3 className={classes.contactMsg}>Want to get in touch?</h3>
        </div>
      </Grid>
      <Grid item style={{}} className={classes.TextFieldContainer}>
        <Grid container direction="column" item>
          <Grid
            container
            direction={matchesSM ? "column" : "row"}
            spacing={2}
            style={{ marginBottom: "2px" }}
            justifyContent={matchesSM ? "center" : null}
          >
            <Grid item className={classes.formControl}>
              <TextField
                label="Name"
                className={classes.TextField1}
                variant="filled"
                value={name}
                onChange={(e) => setName(e.target.value)}
                InputProps={{
                  disableUnderline: true,
                }}
              />
            </Grid>
            <Grid item className={classes.formControl}>
              <TextField
                label="Email"
                className={classes.TextField2}
                variant="filled"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                InputProps={{
                  disableUnderline: true,
                }}
              />
            </Grid>
          </Grid>
          <Grid item className={classes.formControll}>
            <TextField
              multiline
              rows={10}
              className={classes.TextField3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              variant="filled"
              label="message"
              InputProps={{
                disableUnderline: true,
              }}
            />
          </Grid>
          <Grid
            container
            direction="row"
            style={{ width: "90%", marginTop: "20px" }}
          >
            <Button
              color="primary"
              variant="contained"
              className={classes.btn}
              onClick={submitMsg}
            >
              <PanTool className={classes.mailIcon} />
              Say Hi
            </Button>
            <Link href="mailto:ifeyinwadaniel@yahoo.com">
              <Button
                color="secondary"
                variant="contained"
                className={classes.btnMsg}
              >
                <Email className={classes.mailIcon} /> Send Mail
              </Button>
            </Link>
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent={"center"}
          className={classes.fieContainer}
        >
          <form style={{ display: "block" }} className="custom-file">
            <label htmlFor="customFile" for="file-upload">
              <Attachment className={classes.attachIcon} />
              <p>{selectedFile}</p>
            </label>
            <input
              type="file"
              name="avatar"
              className="custom-file-input"
              id="customFile"
              // accept="images/*"
              onChange={onChange}
              style={{ display: "none" }}
            />
          </form>
          <Button
            color="primary"
            variant="contained"
            className={classes.filebtn}
            type="submit"
            style={{ marginTop: "5px" }}
            onClick={handlePdfFileSubmit}
          >
            Upload
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Contact;
