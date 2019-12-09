import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 300,
  },
});

export default function ListMoves(props) {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <h1>{props.opening.openingName}</h1>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">White</TableCell>
            <TableCell align="right">Black</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.opening.moves.map(move => (
            <TableRow>
              <TableCell align="right">{move.white}</TableCell>
              <TableCell align="right">{move.black}</TableCell> 
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}




