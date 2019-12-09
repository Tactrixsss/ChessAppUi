
//Tri4IXRdkFv7J33g4mqWea0a = google secret
import React, { useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import MuiLink from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ReactGoogleLogin from 'react-google-login'
import { baseEndpoint, api } from './const'
import { AuthContext } from './AuthProvider'
function Copyright() {
    return (

        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <MuiLink color="inherit" href="https://material-ui.com/">
                Your Website
      </MuiLink>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles(theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignIn() {
    const classes = useStyles();
    const { setAuthenticated, setToken } = useContext(AuthContext)

    const submitHandler = (event) => {
        event.preventDefault()
        const data = new FormData(event.target)
        fetch(`${baseEndpoint}${api}/users/login`, {
            method: "POST",
            body: data,

        })
        .then(httpResponse => {
            if (!httpResponse.ok) {
                throw new Error("Password login failed")

            }
            else {
                return httpResponse.json()
            }
        })
        .then(token => {
            setAuthenticated(true)
            setToken(token)
        })
        .catch(error => {
            console.log(error)
        })
    }

    const googleSuccessHandler = (response) => {

        let data = {
            tokenId: response.tokenId
        }
        console.log("google")
        fetch(`${baseEndpoint}${api}/users/oauth/google`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }

        })
            .then(httpResponse => {
                if (!httpResponse.ok) {
                    throw new Error("Google login failed")

                }
                else {
                    return httpResponse.json()
                }
            })
            .then(token => {
                console.log(token)
                setAuthenticated(true)
                setToken(token)
            })
            .catch(error => {
                console.log(error)
            })

    }

    const googleFailureHandler = (response) => {
        console.log("Google Failure")
        console.log(response)
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <ReactGoogleLogin
                    clientId="1061817163593-ridc8unsnc47kqqb5c7dr0p4f7dip11d.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={googleSuccessHandler}
                    onFailure={googleFailureHandler}
                    cookiePolicy={'single_host_origin'}
                >

                </ReactGoogleLogin>
                <form className={classes.form} noValidate onSubmit={submitHandler}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <MuiLink href="#" variant="body2">
                                Forgot password?
                            </MuiLink>
                        </Grid>
                        <Grid item>
                            <MuiLink href="#" variant="body2" component={Link} to="/signup">
                                {"Don't have an account? Sign Up"}
                            </MuiLink>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}