import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import { baseEndpoint, api } from './const';
import { get } from 'http';

const useStyles = makeStyles(theme => ({
  root: {
    width: '200%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));
/*
function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}
*/
function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}
export default function ListOpenings() {
  const classes = useStyles();

  const [openings, setOpenings] = React.useState([])//this asks react to watch the state of
//refresh page gets called later on load in the use effect()
  const refreshPage = () => {
    fetch(`${baseEndpoint}${api}/ChessOpenings`, {
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
        console.log(movesArray)//the.then() returns a promise if you call another .then() the value of the previous .then is passed in as a parameter in the new .then()
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

      <List component="nav" aria-label="secondary mailbox folders">
        {
          openings.map((item, index) => {
            return (
              <ListItemLink href="/admin">
                <ListItemText key={item._id} primary={item.openingName} />
              </ListItemLink>
            )
          })//iterates through array and returns new array

        }
      </List>
    </div>
  );
}

