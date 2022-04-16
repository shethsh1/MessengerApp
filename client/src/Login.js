import React, { useEffect } from 'react';
import { Link as DomLink, useHistory } from 'react-router-dom';
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
  InputAdornment
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux'
import { authLogin } from './redux/slice/authSlice'
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
    "@media (max-width: 1400px)": {
      width: '100%',
      maxWidth: '70%'
    },
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

  forgot: {
    cursor: 'pointer',
    color: theme.palette.primary.main,
    fontSize: '15px',
    fontWeight: 'bold'

  }

}));



const Login = () => {
  const classes = useStyles()
  const history = useHistory();
  const user = useSelector(state => state.auth.user)
  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formElements = form.elements;
    const username = formElements.username.value;
    const password = formElements.password.value;

    // await login({ username, password });
    await dispatch(authLogin({ username, password })).unwrap()
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

        <LinksHeader textOne={"Don't have an account?"} textTwo={"Create account"} link={"/"} />



        <Box component="form" onSubmit={handleLogin} className={classes.textFieldContainer}>

          <Typography variant="h4" gutterBottom className={classes.title}>
            Welcome back!
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
              label="password"
              aria-label="password"

              type="password"
              name="password"
              InputLabelProps={{
                style: { color: '#B0B0B0' },
              }}

              InputProps={{
                style: { fontSize: 20, letterSpacing: '1px' },
                endAdornment: <InputAdornment position="end"><Box className={classes.forgot}>Forgot?</Box></InputAdornment>,
              }}

            />
          </FormControl>


          <Box className={classes.buttonContainer}>
            <Button type="submit" color="primary" variant="contained" size="large" className={classes.submitButton}>
              Login
            </Button>
          </Box>


        </Box>

      </Grid>

    </Grid>
  );
};

export default Login;
