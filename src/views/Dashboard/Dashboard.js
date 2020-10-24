import React from "react";
// react plugin for creating charts
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from 'prop-types';
// @material-ui/icons

// core components
import { Slide, Fade, Paper, Typography, Tabs, Tab, Fab, MenuItem } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import AddIcon from '@material-ui/icons/Add';

// import { useSelector } from "react-redux";
import Box from '@material-ui/core/Box';

import DatasetTableComponent from "./DatasetTableComponent.js";
import PredictedTableComponent from "./PredictedTableComponent.js";



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
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));


export default function Dashboard(props) {

  // const pageAnimation = useSelector(state => state.pageAnimation);
  const classes = useStyles();
  const [value, setValue] = React.useState(0);


  const [open, setOpen] = React.useState(false);



  

  const [allOffenses,setAllOffenses] = React.useState([])
  const [allLocalArea,setAllLocalArea] = React.useState([])
  const [allGender,setAllGenders] = React.useState([])
  
  const [offense, setOffense] = React.useState(allOffenses[0]);
  const [localArea, setLocalArea] = React.useState(allLocalArea[0]);
  const [gender, setGender] = React.useState(allGender[0]);
  


  const handleChangeSelectOffense = (event) => {
    setOffense(event.target.value);
  };
  const handleChangeSelectLocalArea = (event) => {
    setLocalArea(event.target.value);
  };
  const handleChangeSelectGender = (event) => {
    setGender(event.target.value);
  };

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

    setValue(2);


    setOpen(false);
  }
  

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleClickOpen = () => {
    fetch('http://34.96.255.76:4000/get_scenario2_data', {
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
    setOpen(true);

  };

  React.useEffect(() => {
    // Update the document title using the browser API

    return () => {
      
    };
  });

  const handleClose = () => {
    setOpen(false);
  };

  console.log(allGender)
 
  return (
    <div>
      <Fade in={true} timeout={1200}>
        <div>
          <Slide in={true} direction={"up"} timeout={400}>
            <div>
              <Paper elevation={10} square={false} style={{ padding: "10px 30px 30px 30px", borderRadius: 20 }}>
                <div>
               
                  <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                    <Tab label="Instructions & Details" {...a11yProps(0)} />
                    <Tab label="Dataset" {...a11yProps(1)} />
                    <Tab label="Predicted" {...a11yProps(2)} />
                  </Tabs>
                </div>
                <div>
                  <TabPanel value={value} index={0}>


                    <Typography variant="h5" style={{ textAlign: "center", color: "#616161", marginBottom: "10px" }} >
                      Instructions
                    </Typography>
                    <DialogContentText>
                      <p>
                        <span style={{fontWeight:"bold"}}>1.</span> Click on the Predict button shown below. It will launch a dialog.
                        
                      </p>
                      <p>
                        <span style={{fontWeight:"bold"}}>2.</span> Provide the input fields and click on submit. After that you will redirected
                        to the predicted tab
                      </p>
                      <p>
                        <span style={{fontWeight:"bold"}}>Note:</span> You can move around the tabs to view the 
                        <span style={{fontWeight:"bold"}}> Dataset tab</span> and <span style={{fontWeight:"bold"}}>Predicted tab</span> to view
                        all the values that were predicted in past. The values are arranged in Descending Order.
                      </p>
                      
                     
                    </DialogContentText>
                    <Typography variant="h5" style={{ textAlign: "center", color: "#616161", marginBottom: "10px" }} >
                      Details
                    </Typography>
                    <DialogContentText>
                      This application currently predicts the the race of person (white, black, asian etc) and age of person.
                      This uses simple classification model and regression model, where we provide input <span style={{fontWeight:"bold"}}>
                        Crime Type, Gender, Location of crime.
                      </span>
                      <p>
                        The classification model uses the following features from dataset. 
                      
                      </p>
                      <p>
                      <span style={{fontWeight:"bold"}}>
                         (Local Area),	(Offense),	(Gender),	(Year),	(Month),	(Day),	(Hours),	(Minutes),  (Seconds)
                      </span>
                      </p> 
                      <p>
                        While the regression model uses the following features from dataset 
                      
                      </p>
                      <p>
                        
                        <span style={{fontWeight:"bold"}}>
                          (Local Area),	(Offense),	(Perpetrator Race),	(Gender),	(Year),	(Month),	(Day),	(Hours), (Minutes), (Seconds)

                        </span>
                      </p>
                      
                    </DialogContentText>
                </TabPanel>
                  <TabPanel value={value} index={1}>

                    <div>
                      <Typography variant="h5" style={{ textAlign: "center", color: "#616161", marginBottom: "10px" }} >
                        Dataset
                      </Typography>
                    </div>
                    <div>
                      <DatasetTableComponent />
                    </div>

                  </TabPanel>
                  <TabPanel value={value} index={2}>
                    <DialogContentText>
                      <span style={{fontWeight:"bold"}}>Scenario:</span><p>Given crime type, crime location and gender. List down the type of 
                        race of person and age that could've commited that crime. The model takes three inputs and returns race and age of type
                        of suspects
                      </p>
                      <span style={{fontWeight:"bold"}}>Note: Order is from latest to old ones.</span>
                    </DialogContentText>
                    <Typography variant="h5" style={{ textAlign: "center", color: "#616161", marginBottom: "10px" }} >
                      Predicted Values
                    </Typography>

                    <div>
                      <PredictedTableComponent />
                    </div>

                  </TabPanel>
                  <Fab variant="extended" color="secondary" aria-label="add"
                    onClick={handleClickOpen} 
                    className={classes.margin}
                    style={{
                      margin: 0,
                      top: 'auto',
                      right: 25,
                      bottom: 30,
                      left: 'auto',
                      position: 'fixed',
                      zIndex:1000,
                      }}
                    >
                      <AddIcon className={classes.extendedIcon} />
                        Predict
                  </Fab>

                </div>

              </Paper>
              <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Predict</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Please specify the offense type, location and gender. These are the input parameters for the Machine learning Modal.
                    It will return predicted race of person and age. After submitting you will be redirected to Predicted Tab
                  </DialogContentText>
                  <form className={classes.root} noValidate autoComplete="off">
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
                        {allOffenses.map((option,i) => (
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
                        {allLocalArea.map((option,i) => (
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
                        {allGender.map((option,i) => (
                          <MenuItem key={i} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </TextField>
                    </div>
                  </form>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} size="large" color="primary">
                    Cancel
                  </Button>
                  <Button onClick={handleSubmitSecnario2} size="large" color="primary">
                    Submit
                  </Button>
                </DialogActions>
              </Dialog>
            </div>

          </Slide>
        </div>
      </Fade>
    </div>
  );
}

