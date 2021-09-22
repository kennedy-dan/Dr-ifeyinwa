import { Container, Grid } from "@material-ui/core";
import Head from "next/head";
import React, { Fragment } from "react";
import Footer from "./UI/Footer";
import Header from "./UI/header";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

/**
 * @author
 * @function Layout
 **/

const Layout = ({ children, title = "Ifeyinwa Daniel Website" }) => {
  return (
    <Fragment>
          <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />
      {/* <Container maxWidth="xl"> */}
      <Grid container direction="column">
        <ToastContainer position="bottom-right" />
        {children}
      </Grid>
      {/* </Container> */}
      <Footer />
    </Fragment>
  );
};

export default Layout;
