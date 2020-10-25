import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {  MenuItem } from "@material-ui/core";

import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <div>
                    {children}

                </div>

            )}
        </div>
    );
}

const AntTabs = withStyles({
    root: {
        borderBottom: '1px solid #e8e8e8',
    },
    indicator: {
        backgroundColor: '#1890ff',
    },
})(Tabs);

const AntTab = withStyles((theme) => ({
    root: {
        textTransform: 'none',
        minWidth: 72,
        fontWeight: theme.typography.fontWeightRegular,
        marginRight: theme.spacing(4),

        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:hover': {
            color: '#40a9ff',
            opacity: 1,
        },
        '&$selected': {
            color: '#1890ff',
            fontWeight: theme.typography.fontWeightMedium,
        },
        '&:focus': {
            color: '#40a9ff',
        },
    },
    selected: {},
}))((props) => <Tab {...props} />);


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    demo1: {
        backgroundColor: theme.palette.background.paper,
    },
    form: {
        '& .MuiTextField-root': {
          margin: theme.spacing(1),
          width: '25ch',
        },
    },
}));




export default function DialogBoxTabs(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [offense, setOffense] = React.useState("");
    const [localArea, setLocalArea] = React.useState("");
    const [gender, setGender] = React.useState("");
    
    const [allOffenses,setAllOffenses] = React.useState([])
    const [allLocalArea,setAllLocalArea] = React.useState([])
    const [allGender,setAllGenders] = React.useState([])
    
    

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    React.useEffect(() => {
        // Update the document title using the browser API
        fetch('http://34.96.255.76:4000/get_scenarios_data', {
            method: 'GET', // or 'PUT'
            headers: {
              'Content-Type': 'application/json',
              },
            })
            .then(response => response.json())
            .then(data => {
              setAllOffenses(data.all_offenses)
              setAllLocalArea(data.all_Local_Area)
              setAllGenders(data.all_genders)
            })
            .catch((error) => {
              console.error('Error:', error);
          });
        return () => {
          
        };
      },[]);

    
  const handleSubmitSecnario2 = (event) => {
    fetch('http://34.96.255.76:4000/predictSuspectType', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
        },
      body:JSON.stringify({crimeType:offense,location:localArea,gender:gender})
      })
      .then(response => response.json())
      .then(data => {
        console.log(data)
      })
      .catch((error) => {
        console.error('Error:', error);
    });

    
    props.scenarioTwoCallBack()


    props.setOpen(false);
  }

  const handleSubmitSecnarioOne = (event) => {
    fetch('http://34.96.255.76:4000/recommendsSuspectList', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
        },
      body:JSON.stringify({crimeType:offense,location:localArea})
      })
      .then(response => response.json())
      .then(data => {
        console.log(data)
      })
      .catch((error) => {
        console.error('Error:', error);
    });

    
    props.scenarioOneCallBack();


    props.setOpen(false);
  }
  
  const handleChangeSelectOffense = (event) => {
    setOffense(event.target.value);
  };
  const handleChangeSelectLocalArea = (event) => {
    setLocalArea(event.target.value);
  };
  const handleChangeSelectGender = (event) => {
    setGender(event.target.value);
  };



    return (
        <div className={classes.root}>
            <div className={classes.demo1}>
                <AntTabs value={value} onChange={handleChange} aria-label="ant example">
                    <AntTab label="Scenario one" />
                    <AntTab label="Scenario two" />
                </AntTabs>
            </div>
            <TabPanel value={value} index={0}>
                <DialogContent>
                    <DialogContentText>
                        Please specify the offense type, location. These are the input parameters for the Machine learning Modal.
                        It will return predicted Suspects. After submitting you will be redirected to Predicted Tab
                  </DialogContentText>
                    <form className={classes.form} noValidate autoComplete="off">
                        <div>
                            <TextField
                                id="outlined-select-offense"
                                select
                                label="Offense Type"
                                value={offense}
                                onChange={handleChangeSelectOffense}
                                helperText="Please select Offense Type"
                                variant="outlined"
                            >
                                {allOffenses.map((option, i) => (
                                    <MenuItem key={i} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                id="outlined-select-location"
                                select
                                label="Local Area"
                                value={localArea}
                                onChange={handleChangeSelectLocalArea}
                                helperText="Please select Local Area"
                                variant="outlined"
                            >
                                {allLocalArea.map((option, i) => (
                                    <MenuItem key={i} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </div>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose} size="large" color="primary">
                        Cancel
                  </Button>
                    <Button onClick={handleSubmitSecnarioOne} size="large" color="primary">
                        Submit
                  </Button>
                </DialogActions>

            </TabPanel>
            
            <TabPanel value={value} index={1}>
                <DialogContent>
                    <DialogContentText>
                        Please specify the offense type, location and gender. These are the input parameters for the Machine learning Modal.
                        It will return predicted race of person and age. After submitting you will be redirected to Predicted Tab
                  </DialogContentText>
                    <form className={classes.form} noValidate autoComplete="off">
                        <div>
                            <TextField
                                id="outlined-select-offense"
                                select
                                label="Offense Type"
                                value={offense}
                                onChange={handleChangeSelectOffense}
                                helperText="Please select Offense Type"
                                variant="outlined"
                            >
                                {allOffenses.map((option, i) => (
                                    <MenuItem key={i} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                id="outlined-select-location"
                                select
                                label="Local Area"
                                value={localArea}
                                onChange={handleChangeSelectLocalArea}
                                helperText="Please select Local Area"
                                variant="outlined"
                            >
                                {allLocalArea.map((option, i) => (
                                    <MenuItem key={i} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                id="outlined-select-gender"
                                select
                                label="Gender"
                                value={gender}
                                onChange={handleChangeSelectGender}
                                helperText="Please select Gender Type"
                                variant="outlined"
                            >
                                {allGender.map((option, i) => (
                                    <MenuItem key={i} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </div>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose} size="large" color="primary">
                        Cancel
                  </Button>
                    <Button onClick={handleSubmitSecnario2} size="large" color="primary">
                        Submit
                  </Button>
                </DialogActions>

            </TabPanel>
            
        </div>
    );
}
