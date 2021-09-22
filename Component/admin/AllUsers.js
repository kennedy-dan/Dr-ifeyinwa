import React, { useState, useEffect } from "react";

import {
  TableBody,
  Table,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  Paper,
  Container,
  makeStyles
} from "@material-ui/core";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { Delete, Edit } from "@material-ui/icons";
import { toast } from "react-toastify";

import {
  getAdminUsers,
  deleteUser,
  clearErrors,
} from "../../redux/actions/userActions";
import { DELETE_USER_RESET } from "../../redux/constants/userConstants";


const useStyles = makeStyles((theme) => ({
  tit: {
    '& p': {
      fontFamily: 'Poppins'

    }
  }
}))

const AllUsers = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const classes = useStyles()

  const { loading, error, users } = useSelector((state) => state.allUsers);
  const { error: deleteError, isDeleted } = useSelector((state) => state.user);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };

  useEffect(() => {
    dispatch(getAdminUsers());

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      router.push("/admin/users");
      dispatch({ type: DELETE_USER_RESET });
    }
  }, [dispatch, error, isDeleted]);

  return (
    <Container maxWidth="lg">
      <p>All Users</p>
      <TableContainer component={Paper}>
        <Table className={classes.tit}>
          <TableHead>
            <TableRow >
              <TableCell>
                <p>User ID</p>
              </TableCell>
              <TableCell >
                <p>Name</p>
              </TableCell>
              <TableCell>
                <p>Email</p>
              </TableCell>
              <TableCell>
                <p>role</p>
              </TableCell>
              <TableCell>
                <p>update User</p>
              </TableCell>

              <TableCell>
                <p>delete User</p>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users &&
              users.map((user) => (
                <TableRow>
                  <TableCell><p>{user._id}</p></TableCell>
                  <TableCell><p>{user.name}</p></TableCell>
                  <TableCell><p>{user.email}</p></TableCell>
                  <TableCell><p>{user.role}</p></TableCell>
                  <TableCell>
                    {" "}
                    <Link href={`/admin/users/${user._id}`}>
                     <Edit />
                    </Link>
                  </TableCell>

                  <TableCell>
                    <Delete onClick={() => deleteUserHandler(user._id)} />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default AllUsers;
