import React, { useCallback, useEffect, useState, useContext } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Grid, CssBaseline, Button, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { SidebarContainer } from "../components/Sidebar";
import { ActiveChat } from "../components/ActiveChat";
import { SocketContext } from "../context/socket";
import { useDispatch, useSelector } from 'react-redux'
import { authLogout } from "../redux/slice/authSlice";
import {
  setConversations,
  fetchConversations,
  addMessageToConversation,
  removeOfflineUser,
  addOnlineUser,
  readMessage
} from "../redux/slice/conversationsSlice"

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    overflow: 'auto',
    display: 'flex',
    "@media (max-width: 700px)": {
      flexWrap: 'wrap'
    }
  },
}));

const Home = () => {
  const history = useHistory();
  const user = useSelector(state => state.auth.user)
  const dispatch = useDispatch()
  const socket = useContext(SocketContext);

  const classes = useStyles();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Lifecycle

  useEffect(() => {
    // Socket init
    console.log("enabled sockets")
    socket.on("add-online-user", (id) => {
      dispatch(addOnlineUser(id))
    });
    socket.on("remove-offline-user", (id) => {
      dispatch(removeOfflineUser(id))
    });
    socket.on("new-message", (data) => {
      data.userId = user.id
      dispatch(addMessageToConversation(data))
    })
    socket.on("new-conversation", () => {
      dispatch(fetchConversations())
    });
    socket.on("read-message", (conversationId, readerId) => {
      dispatch(readMessage([conversationId, user.id, readerId]))
    })




    return () => {
      // before the component is destroyed
      // unbind all event handlers used in this component
      console.log("removed sockets")
      socket.off("add-online-user");
      socket.off("remove-offline-user");
      socket.off("new-message");
      socket.off("new-conversation");
      socket.off("read-message")
    };
  }, [socket, dispatch]);

  useEffect(() => {
    // when fetching, prevent redirect
    if (user?.isFetching) return;

    if (user && user.id) {
      setIsLoggedIn(true);
    } else {
      // If we were previously logged in, redirect to login instead of register
      if (isLoggedIn) history.push("/login");
      else history.push("/register");
    }
  }, [user, history, isLoggedIn]);

  useEffect(() => {

    if (!user.isFetching) {
      dispatch(fetchConversations())
    }
  }, [user, dispatch]);

  const handleLogout = async () => {
    if (user && user.id) {
      await dispatch(authLogout(user.id)).unwrap();
      dispatch(setConversations([]))
    }
  };

  return (
    <>
      {/* <Button onClick={handleLogout}>Logout</Button> */}
      <Box component="main" className={classes.root}>
        <CssBaseline />
        <SidebarContainer
          handleLogout={handleLogout}
        />
        <ActiveChat

        />
      </Box>
    </>
  );
};

export default Home;
