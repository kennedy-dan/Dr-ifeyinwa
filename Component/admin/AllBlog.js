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
import { useRouter } from "next/router";

import Link from 'next/link'
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import DeleteIcon from '@material-ui/icons/Delete';

import { getAdminBlogs, deleteBlog, clearErrors } from "../../redux/actions/blogActions";
import { DELETE_BLOG_RESET } from '../../redux/constants/blogConstant'



const useStyles = makeStyles((theme) => ({
  tit: {
    '& p': {
      fontFamily: 'Poppins'

    }
  }
}))

const AllBlog = () => {

  const { loading, error, posts } = useSelector((state) => state.getBlog);
  const { error: deleteError, isDeleted } = useSelector((state) => state.blog);
  const router = useRouter()
  const classes = useStyles()
  const dispatch = useDispatch()
    
  useEffect(() => {
    dispatch(getAdminBlogs());

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
        toast.error(deleteError);
        dispatch(clearErrors())
    }

    if (isDeleted) {
        router.push('/admin/blogs')
        dispatch({ type: DELETE_BLOG_RESET })
    }
  }, [dispatch, deleteError, isDeleted]);


  const deleteBlogHandler = (id) => {
    dispatch(deleteBlog(id))
}

    return (
        <Container maxWidth='md'>
            <p>All Users</p>
      <TableContainer component={Paper}>
        <Table className={classes.tit}>
          <TableHead>
            <TableRow>
              <TableCell><p>blog ID</p></TableCell>
              <TableCell><p>Title</p></TableCell>
              <TableCell><p>Description</p></TableCell>
              <TableCell><p>delete User</p></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts &&
              posts.map((post) => (
                <TableRow>
                  <TableCell>{post._id}</TableCell>
                  <TableCell>{post.title}</TableCell>
                  <TableCell>{post.description}</TableCell>
                  <TableCell><DeleteIcon onClick={() => deleteBlogHandler(post._id)}/></TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
        </Container>
    )
}

export default AllBlog
