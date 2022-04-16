import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
  FormHelperText,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux'
import { authRegister } from './redux/slice/authSlice'
import { makeStyles } from '@material-ui/core/styles';
import SideBackground from './SideBackground';
import LinksHeader from './LinksHeader'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    minWidth: '300px'
  },
  bgContainer: {
    display: 'block',

    "@media (max-width: 959px)": {
      display: 'none'

    }

  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

  },



  textFieldContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    maxWidth: '60%',
    marginBottom: '80px',
    // if less than 1400 px
    "@media (max-width: 1400px)": {
      width: '100%',
      maxWidth: '70%'
    },
    // if less than 959 px
    "@media (max-width: 959px)": {
      width: '100%',
      maxWidth: '50%'
    }


  },

  title: {
    fontWeight: 'bold',
    marginBottom: '32px'
  },

  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '32px'
  },

  submitButton: {
    paddingLeft: '64px',
    paddingRight: '64px',
    paddingTop: '16px',
    paddingBottom: '16px'

  },

}));

const Signup = () => {
  const classes = useStyles()
  const history = useHistory();
  const user = useSelector(state => state.auth.user)
  const dispatch = useDispatch()

  const [formErrorMessage, setFormErrorMessage] = useState({});

  const handleRegister = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formElements = form.elements;
    const username = formElements.username.value;
    const email = formElements.email.value;
    const password = formElements.password.value;
    const confirmPassword = formElements.confirmPassword.value;

    if (password !== confirmPassword) {
      setFormErrorMessage({ confirmPassword: 'Passwords must match' });
      return;
    }
    await dispatch(authRegister({ username, email, password })).unwrap();
  };

  useEffect(() => {
    if (user && user.id) history.push('/home');
  }, [user, history]);

  return (
    <Grid container className={classes.root}>

      <Grid item md={5} xs={false} className={classes.bgContainer}>
        <SideBackground />
      </Grid>

      <Grid container item xs={12} md={7} className={classes.formContainer}>
        <LinksHeader textOne={"Already have an account?"} textTwo={"Login"} link={"/login"} />

        <Box component="form" onSubmit={handleRegister} className={classes.textFieldContainer}>

          <Typography variant="h4" gutterBottom className={classes.title}>
            Create an account.
          </Typography>

          <FormControl margin="normal" required fullWidth>
            <TextField
              aria-label="username"
              label="Username"
              name="username"
              type="text"
              InputLabelProps={{
                style: { color: 'grey' },
              }}
              inputProps={{
                style: { fontSize: 20 }
              }}
            />
          </FormControl>

          <FormControl margin="normal" required fullWidth>
            <TextField
              label="E-mail address"
              aria-label="e-mail address"
              type="email"
              name="email"
              InputLabelProps={{
                style: { color: 'grey' },
              }}
              inputProps={{
                style: { fontSize: 20 }
              }}
            />
          </FormControl>

          <FormControl error={!!formErrorMessage.confirmPassword} margin="normal" required fullWidth>
            <TextField
              aria-label="password"
              label="Password"
              type="password"
              inputProps={{ minLength: 6, fontSize: 20 }}
              name="password"
              InputLabelProps={{
                style: { color: 'grey' },
              }}
            />
            <FormHelperText>
              {formErrorMessage.confirmPassword}
            </FormHelperText>
          </FormControl>

          <FormControl error={!!formErrorMessage.confirmPassword} margin="normal" required fullWidth>
            <TextField
              label="Confirm Password"
              aria-label="confirm password"
              type="password"
              inputProps={{ minLength: 6, fontSize: 20 }}
              name="confirmPassword"
              InputLabelProps={{
                style: { color: 'grey' },
              }}
            />
            <FormHelperText>
              {formErrorMessage.confirmPassword}
            </FormHelperText>
          </FormControl>

          <Box className={classes.buttonContainer}>
            <Button type="submit" color="primary" variant="contained" size="large" className={classes.submitButton}>
              Create
            </Button>
          </Box>

        </Box>
      </Grid>

    </Grid>
  );
};

export default Signup;
