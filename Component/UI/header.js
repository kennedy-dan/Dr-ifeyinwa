import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ClearIcon from "@material-ui/icons/Clear";
import { signOut } from "next-auth/client";
import Avatar from "@material-ui/core/Avatar";
import { loadUser } from "../../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";

import {
  Tabs,
  Tab,
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  Select,
  MenuItem,
} from "@material-ui/core";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import MenuIcon from "@material-ui/icons/Menu";
import { useRouter } from "next/router";
import Link from "next/link";
const useStyles = makeStyles((theme) => ({
  grow: {
    ...theme.mixins.toolbar,
  },

  growDrawer: {
    // ...theme.mixins.toolbar,
    width: "auto",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    fontFamily: theme.font.primary.main,
    fontWeight: "bold",
    cursor: "pointer",

    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
    [theme.breakpoints.down("xs")]: {
      display: "block",
      marginLeft: "2em",
    },

    color: theme.palette.secondary.main,
    marginLeft: "3em",
    marginTop: "8px",
    fontSize: "18px",
  },
  titleScroll: {
    marginTop: "8px",
    fontFamily: theme.font.primary.main,
    fontWeight: "bold",
    cursor: "pointer",
    [theme.breakpoints.down("xs")]: {
      marginLeft: "2em",
    },
    color: theme.palette.secondary.main,
    marginLeft: "3em",
    fontSize: "18px",
  },
  appBar: {
    backgroundColor: "transparent",
    transition: theme.transitions.create(["background-color"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.standard,
    }),
    // padding: "0 20px",
  },
  appBarScrolled: {
    backgroundColor: theme.palette.primary.main,
    borderBottom: "1px solid #ededed",
    transition: theme.transitions.create(["background-color"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.standard,
    }),
  },

  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  opa: {
    background: "transparent",
  },
  tab: {
    marginLeft: "25px",
    minWidth: 5,
    textTransform: "none",
    fontWeight: "bolder",
    fontFamily: theme.font.primary.main,
    opacity: 1,
    fontSize: "1em",
    border: "none",
  },
  tabScrolled: {
    marginLeft: "25px",
    minWidth: 5,
    textTransform: "none",
    fontWeight: 9000,
    fontFamily: theme.font.primary.main,
    color: "black",
    fontSize: "1em",
  },
  btn: {
    fontSize: "12px",
    color: theme.palette.primary.main,
    boxShadow: "none",
    fontFamily: theme.font.primary.main,
    textTransform: "none",
    // padding: "7px 20px ",
    borderRadius: "5px",
    height: "50%",

    "&:hover": {
      boxShadow: "none",
      backgroundColor: theme.palette.secondary.main,
      textDecoration: "none",
      color: theme.palette.primary.main,
    },
    "&:active": {
      outline: "none",
    },
  },
  scrollBtn: {
    fontSize: "13px",
    color: "black",
    boxShadow: "none",
    borderRadius: 0,
    fontFamily: theme.font.primary.main,
    textTransform: "none",
  },
  btnCont: {
    marginTop: "6px",
    marginRight: "3em",
  },
  drawerIcon: {
    fontSize: "25px",
  },
  drawer: {
    backgroundColor: theme.palette.secondary.main,
    height: "100%",
  },
  drawerList: {
    fontSize: "17px",
    fontWeight: "50px",
    color: theme.palette.primary.main,
    textAlign: "center",
    boxShadow: "none",
    borderRadius: "0px",
    "&:hover": {
      boxShadow: "0px",
    },
    "&:active": {
      outline: "none",
    },
  },
  mainListIttem: {
    marginTop: "2em",
  },
  drawerRegBtnItem: {
    color: theme.palette.primary.main,
    fontSize: "17px",
  },
  cancelIcon: {
    fontSize: "30px",
    marginRight: "31px",
    marginTop: "10px",
    color: theme.palette.primary.main,
  },
  avatar: {
    marginRight: "10px",
  },
  select: {
    "& p": {
      fontFamily: "Poppins",
    },
  },
}));

export default function Header() {
  const classes = useStyles();
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useDispatch();
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const [openDrawer, setOpendrawer] = useState(false);
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [value, setValue] = useState(0);
  const { user, loading } = useSelector((state) => state.loadedUser);

  const handleChange = (e, value) => {
    setValue(value);
  };

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 150,
  });
  useEffect(() => {
    if (window.location.pathname === "/" && value !== 0) {
      setValue(0);
    } else if (window.location.pathname === "/blogs" && value !== 1) {
      setValue(1);
    } else if (window.location.pathname === "/courses" && value !== 2) {
      setValue(2);
    }
    if (!user) {
      dispatch(loadUser());
    }
  }, [dispatch, user, ]);

  const logoutHandler = () => {
    signOut();
  };

  const tabs = (
    <React.Fragment>
      <Grid item>
        <Grid container direction="row" justifyContent="center">
          <Tabs
            centered
            className={classes.tabContainer}
            value={value}
            onChange={handleChange}
          >
            <Tab
              className={`${classes.tab} ${
                trigger === false ? "" : classes.tabScrolled
              }`}
              label="Home"
              onClick={(e) => {
                e.preventDefault();
                router.push("/");
              }}
            />

            <Tab
              className={`${classes.tab} ${
                trigger === false ? "" : classes.tabScrolled
              }`}
              label="Blog"
              onClick={(e) => {
                e.preventDefault();

                router.push("/blogs");
              }}
            />

            <Tab
              className={`${classes.tab} ${
                trigger === false ? "" : classes.tabScrolled
              }`}
              label="Courses"
              onClick={(e) => {
                e.preventDefault();
                router.push("/courses");
              }}
            />
          </Tabs>
        </Grid>
      </Grid>
      <Grid item className={classes.btnCont}>
        <Grid container direction="row">
          {user ? (
            <>
              {user.role === "admin" ? (
                <>
                  <Select className={classes.select}>
                    <MenuItem>
                      <Link href="/admin/users">
                        <p>Users</p>
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link href="/admin/courses">
                        <p>Courses</p>
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link href="/admin/blogs">
                        <p>Blogs</p>
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link href="/courses/createcourse">
                        <p>Create Course</p>
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link href="/blogs/NewBlog">
                        <p>Create Blog</p>
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link href="/admin/messages">
                        <p>My Messages</p>
                      </Link>
                    </MenuItem>
                  </Select>
                  <Grid item container direction="column" xs>
                    <Avatar
                      src={user.avatar && user.avatar.url}
                      className={classes.avatar}
                    />
                  </Grid>
                </>
              ) : (
                <Grid item container direction="column" xs>
                  <Avatar
                    src={user.avatar && user.avatar.url}
                    className={classes.avatar}
                  />
                </Grid>
              )}

              <Button
                onClick={logoutHandler}
                className={classes.btn}
                variant="contained"
                color="secondary"
              >
                Log Out
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  router.push("/login");
                }}
                className={classes.btn}
                variant="contained"
                color="secondary"
              >
                Log in
              </Button>
            </>
          )}
        </Grid>
      </Grid>
    </React.Fragment>
  );

  const drawer = (
    <React.Fragment>
      <SwipeableDrawer
        anchor={"top"}
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        onClose={() => setOpendrawer(false)}
        onOpen={() => setOpendrawer(true)}
        classes={{ paper: classes.drawer }}
      >
        <div className={classes.growDrawer} />
        <Grid container direction="column">
          <Grid container direction="row" justify="flex-end">
            <ClearIcon
              className={classes.cancelIcon}
              onClick={() => setOpendrawer(false)}
            />
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="center"
            align="center"
            style={{ marginTop: "80px" }}
          >
            <List disablePadding justify="center" alignItems="center">
              <ListItem
                button
                onClick={() => setOpendrawer(false)}
                className={classes.mainListIttem}
              >
                <Link href="/">
                  <ListItemText
                    disableTypography
                    className={classes.drawerList}
                  >
                    Home
                  </ListItemText>
                </Link>
              </ListItem>
              <ListItem button onClick={() => setOpendrawer(false)}>
                <Link href="/blogs">
                  <ListItemText
                    disableTypography
                    className={classes.drawerList}
                  >
                    Blog
                  </ListItemText>
                </Link>
              </ListItem>
              <ListItem button onClick={() => setOpendrawer(false)}>
                <Link href="/courses">
                  <ListItemText
                    disableTypography
                    className={classes.drawerList}
                  >
                    Courses
                  </ListItemText>
                </Link>
              </ListItem>

              <Grid container direction="row">
                {user ? (
                  <>
                    {user.role === "admin" ? (
                      <>
                        <ListItem button onClick={() => setOpendrawer(false)}>
                          <Link href="/admin/users">
                            <ListItemText
                              disableTypography
                              className={classes.drawerList}
                            >
                              Users
                            </ListItemText>
                          </Link>
                        </ListItem>
                        <ListItem button onClick={() => setOpendrawer(false)}>
                          <Link href="/admin/courses">
                            <ListItemText
                              disableTypography
                              className={classes.drawerList}
                            >
                              All Courses
                            </ListItemText>
                          </Link>
                        </ListItem>
                        <ListItem button onClick={() => setOpendrawer(false)}>
                          <Link href="/admin/blogs">
                            <ListItemText
                              disableTypography
                              className={classes.drawerList}
                            >
                              All Blogs
                            </ListItemText>
                          </Link>
                        </ListItem>
                        <ListItem button onClick={() => setOpendrawer(false)}>
                          <Link href="/courses/createcourse">
                            <ListItemText
                              disableTypography
                              className={classes.drawerList}
                            >
                              Create Courses
                            </ListItemText>
                          </Link>
                        </ListItem>
                        <ListItem button onClick={() => setOpendrawer(false)}>
                          <Link href="/blogs/NewBlog">
                            <ListItemText
                              disableTypography
                              className={classes.drawerList}
                            >
                              Create Blog
                            </ListItemText>
                          </Link>
                        </ListItem>
                        <ListItem button onClick={() => setOpendrawer(false)}>
                          <Link href="/admin/messages">
                            <ListItemText
                              disableTypography
                              className={classes.drawerList}
                            >
                              My Messages{" "}
                            </ListItemText>
                          </Link>
                        </ListItem>
                        <ListItem button onClick={() => setOpendrawer(false)}>
                          <ListItemText
                            disableTypography
                            className={classes.drawerList}
                          >
                            <Avatar
                              src={user.avatar && user.avatar.url}
                              className={classes.avatar}
                            />
                          </ListItemText>
                        </ListItem>
                      </>
                    ) : (
                      <Grid container direction="column" xs>
                        <Avatar
                          src={user.avatar && user.avatar.url}
                          className={classes.avatar}
                        />
                      </Grid>
                    )}

                    <Button
                      onClick={logoutHandler}
                      className={classes.btn}
                      variant="contained"
                      color="secondary"
                    >
                      Log Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Link href="/login">
                      <ListItemText
                        disableTypography
                        className={classes.drawerList}
                      >
                        Log in
                      </ListItemText>
                    </Link>
                  </>
                )}
              </Grid>
            </List>
          </Grid>
        </Grid>
      </SwipeableDrawer>

      <IconButton onClick={() => setOpendrawer(!openDrawer)}>
        <MenuIcon className={classes.drawerIcon} />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div className={classes.grow}>
      <AppBar
        position="fixed"
        elevation={0}
        className={`${classes.appBar} ${
          trigger === false ? "" : classes.appBarScrolled
        }`}
      >
        <Toolbar disableGutters>
          <Grid container direction="row" justifyContent="space-between">
            <Grid item>
              <Link href="/">
                <Typography
                  className={`${classes.title} ${
                    trigger === false ? "" : classes.titleScroll
                  }`}
                  variant="h6"
                  noWrap
                >
                  IFY
                </Typography>
              </Link>
            </Grid>
            {matchesSM ? drawer : tabs}
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}
