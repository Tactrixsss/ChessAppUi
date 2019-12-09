import React, { forwardRef } from 'react';
import MaterialTable from 'material-table';

//icons

import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { baseEndpoint, api } from './const'
// buttons
import Button from '@material-ui/core/Button'
import { isFlowBaseAnnotation } from '@babel/types';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));



const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox{...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check{...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear{...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline{...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight{...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit{...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt{...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList{...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage{...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage{...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight{...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft{...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear{...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search{...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowUpward{...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove{...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn{...props} ref={ref} />)
};



export default function EditMoves(props) {
    console.log(props.opening)
    const classes = useStyles();
    const [openingName, setOpeningName] = React.useState(props.opening.openingName)
    const [addMode, setAddMode] = React.useState(props.addMode)
    const [state, setState] = React.useState({
        columns: [
            { title: 'White', field: 'white' },
            { title: 'Black', field: 'black' },
        ],
        data: props.opening.moves,
    });
    const deleteOpeningOnClickHandler = (event) => {
        fetch(`${baseEndpoint}${api}/ChessOpenings/${props.opening._id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        

    })
    .then(httpResult=>{
        props.refreshPage()
    })
    .catch(error=>{
        console.log(error)
    })

}
const addNewOpeningOnClickHandler = (event) => {
    setAddMode(true)
    setOpeningName('')
    setState({ ...state, data: [] })

}
const cancelOnClickHandler = (event) => {

    setAddMode(false)
    setOpeningName(props.opening.openingName)
    setState({ ...state, data: props.opening.moves })
}
const saveAllOnClickHandler = (event) => {
    let method
    let id
    if (addMode == true) {
        method = 'POST'
        id = ''
    }
    else {
        method = 'PUT'
        id = `/${props.opening._id}`
    }
    let data = {
        openingName: openingName,
        moves: state.data

    }
    fetch(`${baseEndpoint}${api}/ChessOpenings${id}`, {
        method: method,
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'

        }
    })
}

return (
    <div>


        <div>
            <Button
                variant="contained"
                color="primary"
                onClick={deleteOpeningOnClickHandler}
            >delete</Button>
            {
                addMode ? (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={cancelOnClickHandler}

                    >Cancel</Button>)
                    : (
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={addNewOpeningOnClickHandler}

                        >Add Opening</Button>)
            }
        </div>

        <div>
            <TextField
                id="standard-basic"
                className={classes.textField}
                label="Opening Name"
                margin="normal"
                value={openingName}
                onChange={(event) => { setOpeningName(event.target.value) }}

            />
        </div>
        <MaterialTable
            icons={tableIcons}
            title="Opening Moves"
            columns={state.columns}
            data={state.data}
            options={{
                search: false,
                draggable: false,
                pageSize: 20,
            }}
            editable={{
                onRowAdd: newData =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            setState(prevState => {
                                const data = [...prevState.data];
                                data.push(newData);
                                return { ...prevState, data };
                            });
                        }, 600);
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            if (oldData) {
                                setState(prevState => {
                                    const data = [...prevState.data];
                                    data[data.indexOf(oldData)] = newData;
                                    return { ...prevState, data };
                                });
                            }
                        }, 600);
                    }),
                onRowDelete: oldData =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            setState(prevState => {
                                const data = [...prevState.data];
                                data.splice(data.indexOf(oldData), 1);
                                return { ...prevState, data };
                            });
                        }, 600);
                    }),
            }}
        />
        <Button
            variant="contained"
            color="primary"
            onClick={saveAllOnClickHandler}
        >Save All
      </Button>
    </div>
);
}
