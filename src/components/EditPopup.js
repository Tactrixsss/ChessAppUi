import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton'
import { Button } from '@material-ui/core';
import {baseEndpoint,api} from './const'
function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function Popup(props) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [word, setWord] = React.useState(props.item.word);
  const [definition, setDefinition] = React.useState(props.item.definition);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const onSaveClickHandler = (event) => {
    let edited = {
      word: word,
      definition: definition,
    }
    fetch(`${baseEndpoint}${api}/glossary/${props.item._id}`,
    {
      method: "PUT",
      body: JSON.stringify(edited),
      headers: {
        "Content-Type":"application/json" 
      }
    })
    .then(httpResult=>{
      if(httpResult.statusText === "OK"){
        props.refreshPage()
        handleClose()
      }

    })

    

  }
  return (
    <span>
      <IconButton onClick={handleOpen}>
        <EditIcon></EditIcon>
      </IconButton>

      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
          <TextField
            required
            id="standard-required"
            label="Word"
            defaultValue={word}
            className={classes.textField}
            margin="normal"
            onChange= {(event)=>{setWord(event.target.value)}}
          />

          <TextField
            required
            id="standard-required"
            label="Definition"
            defaultValue={definition}
            className={classes.textField}
            margin="normal"
            onChange= {(event)=>{setDefinition(event.target.value)}}
          />
          <Button
            onClick= {onSaveClickHandler}
            variant="contained"
            color="primary"
          >
            save</Button>

          <Button
            variant="contained"
            color="primary"
            onClick={handleClose}
          >

            cancel</Button>

        </div>
      </Modal>
    </span>
  );
}