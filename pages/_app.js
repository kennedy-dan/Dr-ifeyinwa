import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../src/theme";
import Layout from "../Component/layout";
import { wrapper } from "../redux/store";

const MyApp = ({Component, pageProps}) => {
      React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
    return (
        <React.Fragment>
          <Head>
            <title>My page</title>
            <meta
              name="viewport"
              content="minimum-scale=1, initial-scale=1, width=device-width"
            />
          </Head>

          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>

        </React.Fragment>
      );
};

export default wrapper.withRedux(MyApp);

// const MyApp = ({Component, pageProps}) => {
//       React.useEffect(() => {
//     // Remove the server-side injected CSS.
//     const jssStyles = document.querySelector("#jss-server-side");
//     if (jssStyles) {
//       jssStyles.parentElement.removeChild(jssStyles);
//     }
//   }, []);
//     return (
//         <React.Fragment>
//           <Head>
//             <title>My page</title>
//             <meta
//               name="viewport"
//               content="minimum-scale=1, initial-scale=1, width=device-width"
//             />
//           </Head>

//           <ThemeProvider theme={theme}>
//             {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
//             <CssBaseline />
//             <Layout>
//               <Component {...pageProps} />
//             </Layout>
//           </ThemeProvider>

//         </React.Fragment>
//       );
// };

// export default wrapper.withRedux(MyApp);

// import React from "react";
// import PropTypes from "prop-types";
// import Head from "next/head";
// import { ThemeProvider } from "@material-ui/core/styles";
// import CssBaseline from "@material-ui/core/CssBaseline";
// import theme from "../src/theme";
// import Layout from "../Component/layout";
// // import store from "../store";
// import { Provider } from "react-redux";

// export default function MyApp(props) {
//   const { Component, pageProps } = props;

//   React.useEffect(() => {
//     // Remove the server-side injected CSS.
//     const jssStyles = document.querySelector("#jss-server-side");
//     if (jssStyles) {
//       jssStyles.parentElement.removeChild(jssStyles);
//     }
//   }, []);

//   return (
//     <React.Fragment>
//       <Head>
//         <title>My page</title>
//         <meta
//           name="viewport"
//           content="minimum-scale=1, initial-scale=1, width=device-width"
//         />
//       </Head>

//       <ThemeProvider theme={theme}>
//         {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
//         <CssBaseline />
//         <Layout>
//           <Component {...pageProps} />
//         </Layout>
//       </ThemeProvider>

//     </React.Fragment>
//   );
// }

// MyApp.propTypes = {
//   Component: PropTypes.elementType.isRequired,
//   pageProps: PropTypes.object.isRequired,
// };
