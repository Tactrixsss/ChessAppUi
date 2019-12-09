import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SignIn from './SignIn';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { AuthContext } from './AuthProvider'
const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function MenuAppBar() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const { authenticated, setAuthenticated } = useContext(AuthContext)

    const handleMenu = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const signOut = ()=>{
        setAuthenticated(false)
        handleClose()

    }

    return (
        <div className={classes.root}>

            <AppBar position="static" style={{ width: 'auto' }}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="menu"



                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        !!LEARN CHESS AND LOVE IT!!
                    </Typography>

                    <div>
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"

                        >

                            <AccountCircle />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={open}
                            onClose={handleClose}

                        >
                            <MenuItem onClick={signOut} component={Link} to='/'>sign out</MenuItem>
                            <MenuItem onClick={handleClose} component={Link} to='/'>Home</MenuItem>
                            <MenuItem onClick={handleClose} component={Link} to='/editmoves'>Admin</MenuItem>
                            <MenuItem onClick={handleClose} component={Link} to='/signin'>sign in</MenuItem>

                        </Menu>
                    </div>

                </Toolbar>
            </AppBar>
        </div>
    );
}
