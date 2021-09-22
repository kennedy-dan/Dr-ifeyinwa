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

import { getAdmincourse, deleteCourse, clearErrors } from "../../redux/actions/courseActions";
import { DELETE_COURSE_RESET } from '../../redux/constants/coursesCostants'


const useStyles = makeStyles((theme) => ({
  tit: {
    '& p': {
      fontFamily: 'Poppins'

    }
  }
}))

const AllBlog = () => {

  const { loading, error, course } = useSelector((state) => state.getCourses);
  const { error: deleteError, isDeleted } = useSelector((state) => state.courses);
  const classes = useStyles()
  const router = useRouter()
  const dispatch = useDispatch()
    
  useEffect(() => {
    dispatch(getAdmincourse());

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
        dispatch({ type: DELETE_COURSE_RESET })
    }
  }, [dispatch, deleteError, isDeleted]);


  const deleteCourseHandler = (id) => {
    dispatch(deleteCourse(id))
}

    return (
        <Container maxWidth='md'>
            <p>All Users</p>
      <TableContainer component={Paper}>
        <Table className={classes.tit}>
          <TableHead>
            <TableRow>
              <TableCell><p>Course ID</p></TableCell>
              <TableCell><p>Course Code</p></TableCell>
              <TableCell><p>Title</p></TableCell>
              <TableCell><p>delete User</p></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {course &&
              course.map((post) => (
                <TableRow>
                  <TableCell><p>{post._id}</p></TableCell>
                  <TableCell><p>{post.courseCode}</p></TableCell>
                  <TableCell><p>{post.title}</p></TableCell>
                  <TableCell><DeleteIcon onClick={() => deleteCourseHandler(post._id)}/></TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
        </Container>
    )
}

export default AllBlog
