import { Grid, makeStyles, Button, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import dynamic from "next/dynamic";
import Output from "editorjs-react-renderer";
import { ImageOutput } from 'editorjs-react-renderer';
const EditorJs = dynamic(() => import("react-editor-js"), { ssr: false });
// const StyleSheet = dynamic(() => import("@react-pdf/renderer"), { ssr: false });
// const PDFDownloadLink = dynamic(() => import("@react-pdf/renderer"), { ssr: false });
// const View = dynamic(() => import("@react-pdf/renderer"), { ssr: false });
// const Document = dynamic(() => import("@react-pdf/renderer"), { ssr: false });
// const Text = dynamic(() => import("@react-pdf/renderer"), { ssr: false });
// const Page = dynamic(() => import("@react-pdf/renderer"), { ssr: false });

import { jsPDF } from "jspdf";

import axios from 'axios'
var FileSaver = require('file-saver');
import fileDownload from 'js-file-download'
const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: "60px",
  },
  Title: {
    fontSize: "40px",
    fontWeight: "bold",
  },
  description: {
    fontSize: "25px",
    width: "80%",
    textAlign: "center",
  },

  post: {
    fontSize: "22px",
    width: "50%",
    marginTop: "18px",
  },
  post1: {
    fontSize: "22px",
    width: "50%",
    marginTop: "18px",
  },
  post2: {
    fontSize: "22px",
    width: "50%",
    marginTop: "18px",
  },
  post3: {
    fontSize: "22px",
    width: "50%",
    marginTop: "18px",
  },
  summary: {
    fontSize: "22px",
    maxWidth: 900,
    width: '100%',
    marginTop: "18px",
    // alignSelf: 'center',
    [theme.breakpoints.down('sm')]:{
      width: '70%',
    },
    [theme.breakpoints.down('xs')]:{
      fontSize:'15px',
      // maxWidth:50,
      // width: '30%',
    }
  },
}));

const blogContentConfig = {
  header: {
    disableDefaultStyle: true,
  },
  paragraph: {
    disableDefaultStyle: true,
  },
  list: {
    disableDefaultStyle: true,
  },
};

const blogContentStyle = {
  header: {
    padding: "1rem 0 .3rem 0",
  },
  paragraph: {
    padding: ".5rem 0",
  },
  list: {
    container: {
      marginLeft: "3rem",
    },
    listItem: {
      padding: ".5rem 0",
    },
  },
};

// const styles = StyleSheet.create({
//   page: {
//     flexDirection: 'row',
//     backgroundColor: '#E4E4E4'
//   },
//   section: {
//     margin: 10,
//     padding: 10,
//     flexGrow: 1
//   }
// });

// const MyDoc = () => (
//   <Document>
//     <Page size="A4" style={styles.page}>
//       <View style>
//         <Text>Hello</Text>
//       </View>
//     </Page>
//   </Document>
// );

const CourseDetail = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { course } = useSelector((state) => state.getSingleCourse);
  const dateCreated = new Date(course.createdAt).toLocaleString("en-US");


  const output = (
    <Output
    data={course.note}
    style={blogContentStyle}
    // config={blogContentConfig}
  />
  )
 
  const bldata = course.note.blocks[0].data.text
  
  const handleDownload = () => {
    const doc = new jsPDF();

    // let split=doc.splitTextToSize(document.getElementById("text").innerText,200);
    // doc.text(document.querySelector(".content > h1").innerHTML,75,5);
    doc.text(output,5,75);
    doc.save(`${course.title}.pdf`);
    // doc.output("dataurlnewwindow");  

};




  // const handleDownload = () => {
  //   FileSaver.saveAs(
  //     `${course._id}`,
  //     // `${course.title}`
  //   );
    
  // }
  

  useEffect(() => {}, []);
  return (
    <>
    <Grid
      container
      direction="column"
      alignItems="center"
      className={classes.mainGrid}
    >
      <p>{dateCreated}</p>

      <div>
        <p className={classes.Title}>{course.courseCode}</p>
      </div>
      <>
        <p className={classes.description}>{course.Title}</p>
      </>
      <Grid item>
        {course.images.map((image) => (
          <Image
            key={image.public_id}
            className="d-block m-auto"
            src={image.url}
            alt={image.name}
            width={400}
            height={400}
          />
        ))}
      </Grid>

      <Typography className={classes.summary}>
          {output}
      </Typography>

    </Grid>
    <Button onClick={handleDownload}>Download</Button>
 
    </>
  );
};

export default CourseDetail;
