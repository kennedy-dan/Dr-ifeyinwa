import Courses from "../model/courses";
import catchAsyncErrors from "../middleware/catchAsyncErrors";
import cloudinary from "cloudinary";
import ErrorHandler from "../utils/errorHandler";
import APIFeatures from "../utils/apiFeatures";

const createCourse = catchAsyncErrors(async (req, res) => {
  const images = req.body.images;

  let imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "drxdger3x/rooms",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;

  const courses = await Courses.create(req.body);

  res.status(200).json({
    success: true,
    courses,
  });
});

const getCourses = catchAsyncErrors(async (req, res) => {
  const CourseCount = await Courses.countDocuments();

  const apiFeatures = new APIFeatures(
    Courses.find().sort({ _id: -1 }),
    req.query
  );

  let course = await apiFeatures.query;

  course = await apiFeatures.query;

  res.status(200).json({
    success: true,  
    course,
    CourseCount,
  });
});


const getSingleCourse = catchAsyncErrors(async (req, res, next) => {
  const course = await Courses.findById(req.query.id);

  if (!course) {
    return next(new ErrorHandler("Course not found with this ID"));
  }

  res.status(200).json({
    success: true,
    course,
  });
});

// const downloadSingleCourse = catchAsyncErrors(async (req, res, next) => {
//   const course = await Courses.findById(req.query.id);

//   if (!course) {
//     return next(new ErrorHandler("Course not found with this ID"));
//   }

//   res.status(200).json({
//     success: true,
//     course,
//   });
// });


const allAdminCourses = catchAsyncErrors(async (req, res) => {
  const course = await Courses.find();

  res.status(200).json({
    success: true,
    course,
  });
});

const deleteCourse = catchAsyncErrors(async (req, res) => {
  const course = await Courses.findById(req.query.id);

  if (!course) {
    return next(new "course not found with this ID"(), 404);
  }

  // Delete images associated with the room
  for (let i = 0; i < course.images.length; i++) {
    await cloudinary.v2.uploader.destroy(course.images[i].public_id);
  }

  await course.remove();

  res.status(200).json({
    success: true,
    message: "the course has been deleted.",
  });
});





export { createCourse, getCourses, getSingleCourse, allAdminCourses, deleteCourse };
