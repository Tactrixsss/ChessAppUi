import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { baseEndpoint, api } from './const';
import ListMoves from './ListMoves'
import { AuthConsumer, AuthContext } from './AuthProvider'
import EditMoves from './EditMoves'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 224,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

export default function ListOpenings() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0); // tracks what item of the array we are showing for the tab
  const [openings, setOpenings] = React.useState([])//this asks react to watch the state of
  const { authenticated } = useContext(AuthContext)
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  //refresh page gets called later on load in the use effect()
  const refreshPage = () => {

    fetch(`${baseEndpoint}${api}/chessopenings`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }

    })
      .then(httpResponse => {

        if (!httpResponse.ok) {
          throw new Error('failed to fetch openings data')
        }
        else {
          return httpResponse.json()//converts json to javascript

        }
      })
      .then(movesArray => {//movesArray is the value of the httpResponse in javascript as an array of objects.
        //the.then() returns a promise if you call another .then() the value of the previous .then is passed in as a parameter in the new .then()
        setOpenings(movesArray)
      })
      .catch(error => {
        console.log(error)
      })
  }

  //at this point we now have a payload which is an array of objects
  useEffect(refreshPage, [])

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        {
          (authenticated === true && openings.length === 0) ? (
            <Tab key={0} label="No Moves" {...a11yProps(0)}></Tab>
          ) : (
              openings.map((opening, index) => {
                return (
                  <Tab key={opening._id} label={opening.openingName} {...a11yProps(index)} />
                )
              })
            )
        }
      </Tabs>
      {
        (authenticated === true && openings.length === 0) ? (
          <TabPanel key={0} value={value} index={0}>
            <EditMoves refreshPage={refreshPage} opening={{ openingName: "", moves: [] }} addMode={true}></EditMoves>
          </TabPanel>
        ) : (
            openings.map((opening, index) => {
              return (
                <TabPanel key={opening._id} value={value} index={index}>
                  <AuthConsumer>
                    {  // say we are in JS
                      (({ authenticated }) => {  // destructure authenticated from value of AuthContext 
                        return (
                          authenticated ?  // is authenticated == true
                            <EditMoves refreshPage={refreshPage} opening={opening} addMode={false}></EditMoves> // true value
                            :
                            <ListMoves opening={opening}></ListMoves> // false value
                        )
                      })
                    }
                  </AuthConsumer>
                </TabPanel>
              )
            })
          )
      }
    </div>
  );
}
