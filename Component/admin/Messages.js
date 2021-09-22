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
  makeStyles,
} from "@material-ui/core";
import { useRouter } from "next/router";

import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import DeleteIcon from "@material-ui/icons/Delete";

import { getMessages, clearErrors, deleteMessage } from "../../redux/actions/messageActions";
import { DELETE_MESSAGE_RESET } from '../../redux/constants/messageConstants'

const useStyles = makeStyles((theme) => ({
  tit: {
    "& p": {
      fontFamily: "Poppins",
    },
  },
}));

const Messages = () => {
  const { loading, error, messages } = useSelector((state) => state.messages);
  const { error: deleteError, isDeleted } = useSelector((state) => state.message);
  const router = useRouter();
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMessages());
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
        toast.error(deleteError);
        dispatch(clearErrors())
    }

    if (isDeleted) {
        router.push('/admin/messages')
        dispatch({ type: DELETE_MESSAGE_RESET })
    }
  }, [dispatch, deleteError, isDeleted]);
  const deleteMsgHandler = (id) => {
    dispatch(deleteMessage(id))
}
  return (
    <Container maxWidth='md'>
    <p>All Users</p>
<TableContainer component={Paper}>
<Table className={classes.tit}>
  <TableHead>
    <TableRow>
      <TableCell><p>Message ID</p></TableCell>
      <TableCell><p>Name</p></TableCell>
      <TableCell><p>Email</p></TableCell>
      <TableCell><p>Message</p></TableCell>
    </TableRow>
  </TableHead>
  <TableBody>
    {messages &&
      messages.map((post) => (
        <TableRow>
          <TableCell><p>{post._id}</p></TableCell>
          <TableCell><p>{post.name}</p></TableCell>
          <TableCell><p>{post.email}</p></TableCell>
          <TableCell><p>{post.message}</p></TableCell>

          <TableCell><DeleteIcon onClick={() => deleteMsgHandler(post._id)}/></TableCell>
        </TableRow>
      ))}
  </TableBody>
</Table>
</TableContainer>
</Container>
  );
};

export default Messages;
