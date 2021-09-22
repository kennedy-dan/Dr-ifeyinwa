import React from "react";
import { Fragment } from "react";
import  Carrier  from "../Component/Carrier";
import  Colleague  from "../Component/Colleague";
import  Contact  from "../Component/contact";
import  HeroBlock  from "../Component/Hero";
import Layout from "../Component/layout";
import { Footer } from "../Component/UI/Footer";
import { wrapper } from "../redux/store";

/**
 * @author
 * @function HomePage
 **/

const HomePage = (props) => {
  return (
    <Fragment>
        <HeroBlock />
        <Carrier />
        <Colleague />
        <Contact />
    </Fragment>
  );
};

export default HomePage;
