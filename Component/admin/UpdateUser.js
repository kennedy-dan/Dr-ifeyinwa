import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

import {
  TableBody,
  Table,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  Paper,
  Container,
  makeStyles,
  Grid,
  TextField,
  Button,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import {
  updateUser,
  getUserDetails,
  clearErrors,
} from "../../redux/actions/userActions";
import { UPDATE_USER_RESET } from "../../redux/constants/userConstants";

const useStyles = makeStyles((theme) => ({
  btn:{
      marginTop:'20px'
  }
}))



const UpdateUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const classes= useStyles()

  const dispatch = useDispatch();
  const router = useRouter();

  const { error, isUpdated } = useSelector((state) => state.user);
  const { user, loading } = useSelector((state) => state.userDetails);

  const userId = router.query.id;

  useEffect(() => {
    if (user && user._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      router.push("/admin/users");
      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [dispatch, isUpdated, userId, user, error]);

  const submitHandler = (e) => {
    e.preventDefault();

    const userData = {
      name,
      email,
      role,
    };

    dispatch(updateUser(user._id, userData));
  };

  return (
    <>
      <Grid container direction="column" alignItems='center'>
        <div className="row wrapper">
          <div className="col-10 col-lg-5">
            <ValidatorForm onSubmit={submitHandler}>
              <h1>Update User</h1>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Name"
                name="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
              />

              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Name"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
              />


              <Grid >
                <label htmlFor="role_field">Role</label>

                <select
                  id="role_field"
                  className="form-control"
                  name="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="user">user</option>
                  <option value="admin">admin</option>
                </select>
              </Grid>

              <Button
                type="submit"
                variant='contained'
                color='secondary'
                className={classes.btn}
              >
                Update
              </Button>
            </ValidatorForm>
          </div>
        </div>
      </Grid>
    </>
  );
};

export default UpdateUser;
