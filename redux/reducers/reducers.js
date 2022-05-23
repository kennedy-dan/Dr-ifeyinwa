import { combineReducers } from "redux";

import {
  getBlogPost,
  createBlogReducer,
  getSingleBlog,
  blogReducer
} from "../reducers/blogReducer";

import {
  createCourseReducer,
  getCoursesReducer,
  getSingleCourseReducer,
  courseReducer
} from "../reducers/courseReducer";

import {
  authReducer,
  userReducer,
  forgotPasswordReducer,
  loadedUserReducer,
  allUsersReducer,
  userDetailsReducer,
} from "./userReducers";

import { createMessageReducer, createMessagesReducer, getMessages, messageReducer } from '../reducers/messageReducers'

import {createpdfReducer, getPdfs, deletePdfReducer} from '../reducers/pdfReducer'

const reducer = combineReducers({
  message: messageReducer,
  pdf: createpdfReducer,
  Pdfs: getPdfs,
  deletePdf: deletePdfReducer,
  cr: createMessagesReducer,
  messages:getMessages,
  auth:authReducer,
  loadedUser: loadedUserReducer,
  allUsers:allUsersReducer,
  user:userReducer,
  userDetails:userDetailsReducer,
  getBlog: getBlogPost,
  createBlog: createBlogReducer,
  createMessage:createMessageReducer,
  blog:blogReducer,
  getSingle: getSingleBlog,
  createCourse: createCourseReducer,
  getCourses: getCoursesReducer,
  courses:courseReducer,
  getSingleCourse: getSingleCourseReducer,
});

export default reducer;
