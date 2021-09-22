import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "next/link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { signIn } from "next-auth/client";
import { toast } from "react-toastify";
import BtnSpinner from "./UI/buttonSpinner";

import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  link: {
    color: theme.palette.secondary.main,
    cursor: "pointer",
  },
}));

const Login = () => {
  const classes = useStyles();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    setLoading(true);

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    console.log(result);

    setLoading(false);

    if (result.error) {
      toast.error(result.error);
    } else {
      window.location.href = "/";
    }
  };

  return (
    <Container maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log in
        </Typography>

        <ValidatorForm className={classes.form} onSubmit={submitHandler}>
          <TextValidator
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
            validators={["required", "isEmail"]}
            errorMessages={["this field is required"]}
          />
          <TextValidator
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            validators={["required"]}
            errorMessages={["this field is required"]}
          />
          {/* <FormControlLabel
            control={<Checkbox value='remember' color='primary' />}
            label='Remember me'
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
            disabled={loading ? true : false}
          >
                            {loading ? <BtnSpinner /> : 'LOGIN'}
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/register" passHref>
                <a className={classes.link}>
                  {"Don't have an account? Sign Up"}
                </a>
              </Link>
            </Grid>
          </Grid>
        </ValidatorForm>
      </div>
    </Container>
  );
};

export default Login;
