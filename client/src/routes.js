import React, { useEffect, useState } from "react";
import axios from "axios";
import { Route, Switch, withRouter } from "react-router-dom";

import Signup from "./Signup.js";
import Login from "./Login.js";
import { SnackbarError, Home } from "./components";
import { SocketContext, socket } from "./context/socket";
import { useDispatch, useSelector } from 'react-redux'
import { tokenLogin, authLogout, authLogin, authRegister } from './redux/slice/authSlice'

const Routes = (props) => {


  const { user, isFetching } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const [errorMessage, setErrorMessage] = useState("");
  const [snackBarOpen, setSnackBarOpen] = useState(false);



  useEffect(() => {


    const token = async () => {
      await dispatch(tokenLogin()).unwrap()

    }

    token()



  }, [dispatch]);

  useEffect(() => {
    if (user?.error) {
      // check to make sure error is what we expect, in case we get an unexpected server error object
      if (typeof user.error === "string") {
        setErrorMessage(user.error);
      } else {
        setErrorMessage("Internal Server Error. Please try again");
      }
      setSnackBarOpen(true);
    }
  }, [user?.error]);

  if (isFetching) {
    return <div>Loading...</div>;
  }

  return (
    <SocketContext.Provider value={socket}>
      {snackBarOpen && (
        <SnackbarError
          setSnackBarOpen={setSnackBarOpen}
          errorMessage={errorMessage}
          snackBarOpen={snackBarOpen}
        />
      )}
      <Switch>
        <Route
          path="/login"
          render={() => <Login />}
        />
        <Route
          path="/register"
          render={() => <Signup />}
        />
        <Route
          exact
          path="/"
          render={(props) =>
            user?.id ? (
              <Home />
            ) : (
              <Signup />
            )
          }
        />
        <Route
          path="/home"
          render={() => <Home />}
        />
      </Switch>
    </SocketContext.Provider>
  );
};

export default withRouter(Routes);
