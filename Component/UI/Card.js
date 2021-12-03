import {
  makeStyles,
  Grid,
  useMediaQuery,
  useTheme,
  Button,
} from "@material-ui/core";
import React from "react";
import firstbg from "../../public/images/car.svg";
import Image from "next/image";
import { jsPDF } from "jspdf";
import Link from "next/link";
// import cv from '../../public/images/IfyCv.pdf'
import dynamic from "next/dynamic";
import DownloadForOfflineIcon from "@material-ui/icons/ArrowDownwardRounded";

const FileViewer = dynamic(() => import("react-file-viewer"), {
  ssr: false,
});

const useStyles = makeStyles((theme) => ({
  card: {
    width: "auto",
    height: "40px",
    backgroundColor: "transparent",
    border: "2px solid black",
    borderRadius: "8px",
    fontSize: "15px",
    textTransform: "uppercase",
    paddingLeft: "10px",
    paddingRight: "10px",
    paddingTop: "5px",
    margin: "7px",
    verticalAlign: "middle",
    // zIndex:1,
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      fontSize: "13px",
      height: "30px",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "12px",
      height: "28px",
    },
  },
  bg: {
    // backgroundImage: `url(${firstbg})`,
    position: "relative",
    width: "100%",
    height: "100%",
    // background:'red',
    // height: "100vh",
    // backgroundSize: "cover",
    // backgroundPosition: "center",
    // backgroundRepeat: "no-repeat",
    // width: "100%",
  },
  btn: {
    width: "auto",
    marginTop: "20px",
    color: "black",
    backgroundColor: "#96dcfa",
    textTransform: "none",
    fontFamily: "poppins",
    fontSize: "16px",
    borderRadius: 90,
    boxShadow: "0px 9px 15px black",
    "&:hover": {
      backgroundColor: "#96dcfa",
      boxShadow: "0px 9px 15px black",
    },
  },
}));

export const Cards = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const portfolio = [
    { title: "banach Algebra", id: "1" },
    { title: "functional Analysis", id: "12" },
    { title: "numerical analysis", id: "3" },
    { title: "group theory", id: "4" },
    { title: "abelien", id: "5" },
    { title: "loop", id: "6" },
    { title: "semi-group", id: "7" },
    { title: "homomorphism", id: "8" },
  ];

  const pth = (
    <FileViewer fileType="pdf" filePath="../../public/images/ifyVitae2021.pdf" />
  );

  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      className={classes.bg}
    >
      <Image src={firstbg} layout="fill" objectFit="contain" />
      <Grid
        container
        direction="row"
        justifyContent={matchesXS ? "center" : "flex-start"}
        alignItems="center"
        style={{ zIndex: 1 }}
      >
        {portfolio.map((name) => (
          <div key={name.id} className={classes.card}>
            <p
              style={{
                margin: "0 auto",
                textAlign: "center",
                fontWeight: "bold",
                letterSpacing: "1px",
              }}
            >
              {name.title}
            </p>
          </div>
        ))}
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent={matchesXS ? "center" : "flex-start"}
      >
        <Link
          href={"/pdf/ifyVitae2021.pdf"}
          target="_blank"
          // class="butn butn-bg mt-30"
          download
        >
          <Button variant="contained" className={classes.btn}>
            <DownloadForOfflineIcon /> Download my C.V
          </Button>
        </Link>
      </Grid>
    </Grid>
  );
};
