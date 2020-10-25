import React from "react";
// react plugin for creating charts
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from 'prop-types';
// @material-ui/icons

// core components
import { Slide, Fade, Paper, Typography, Tabs, Tab, Fab } from "@material-ui/core";
import Dialog from '@material-ui/core/Dialog';

import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import AddIcon from '@material-ui/icons/Add';

// import { useSelector } from "react-redux";
import Box from '@material-ui/core/Box';

import DatasetTableComponent from "./DatasetTableComponent.js";
import PredictedTabs from "./PredictedTabs.js";
import DialogBoxTabs from "./DialogBoxTabs.js";



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


  const [predictedTab,setPredictedTab] = React.useState(0)



  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleClickOpen = () => {

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

  const scenarioTwoCallBack= () =>{
    setValue(2);
    setPredictedTab(1);
  }
  const scenarioOneCallBack = () => {
    setValue(2);
    setPredictedTab(0);
  }
 
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
                    <div>
                      <Fade in={true} timeout={1200}>
                        <div>
                          <Slide in={true} direction={"up"} timeout={400}>
                            <div>

                              <Typography variant="h5" style={{ textAlign: "center", color: "#616161", marginBottom: "10px" }} >
                        Instructions
                      </Typography>
                              <DialogContentText  >
                                  <span style={{fontWeight:"bold"}}>1.</span> Click on the Predict button shown below. It will launch a dialog.
                                  <br></br>
                                  <span style={{fontWeight:"bold"}}>2.</span> Provide the input fields and click on submit. After that you will redirected
                                  to the predicted tab
                                  <br></br>
                                  <span style={{fontWeight:"bold"}}>Note:</span> You can move around the tabs to view the 
                                  <span style={{fontWeight:"bold"}}> Dataset tab</span> and <span style={{fontWeight:"bold"}}>Predicted tab</span> to view
                                  all the values that were predicted in past. The values are arranged in Descending Order.
                                  <br></br>                                
                              
                              </DialogContentText>
                              <Typography variant="h5" style={{ textAlign: "center", color: "#616161", marginBottom: "10px" }} >
                                Details
                              </Typography>
                              <DialogContentText>
                              <span style={{ fontWeight: "bold" }}>Scenario one:</span>This scenario predicts list of 
                               possible suspects based on the following:
                               <span style={{fontWeight:"bold"}}>
                                  (Crime Type) (Location of crime).
                                </span>
                                <br></br>                                  It takes location first as input and crime type as second input. This will list down all
                                  the specified crime type at specific location provided. 
                                <br></br>
                                  After this algorithm, selects on a possible listed suspects and find other possible suspects
                                  based on their age, race, location, gender etc. The similiar features helps as list the possibilities
                                  that another person which may have committed a different crime can commit this crime. 
                                <br></br>
                                <br></br>
                                <span style={{fontWeight:"bold"}}>Also another case:</span>
                                <br></br>
                                  A crime type that has been never commited at specified location then the algorithm searches
                                  for similiar features of people that commited same crime in another location, and which can 
                                  commit in this location too. 
                                <br></br>
                                <br></br>
                                <span style={{ fontWeight: "bold" }}>Scenario two:</span>This scenario currently predicts the the race of person (white, black, asian etc) and age of person.
                                This uses simple classification model and regression model, where we provide input <span style={{fontWeight:"bold"}}>
                                  Crime Type, Gender, Location of crime.
                                </span>
                                <br></br>
                                  The classification model uses the following features from dataset. 
                                
                                <br></br>
                                <span style={{fontWeight:"bold"}}>
                                  (Local Area),	(Offense),	(Gender),	(Year),	(Month),	(Day),	(Hours),	(Minutes),  (Seconds)
                                </span>
                                <br></br>
                                  While the regression model uses the following features from dataset 
                                  <br></br>
                                  <span style={{fontWeight:"bold"}}>
                                    (Local Area),	(Offense),	(Perpetrator Race),	(Gender),	(Year),	(Month),	(Day),	(Hours), (Minutes), (Seconds)

                                  </span>
                                
                              </DialogContentText>
                                      
                            </div>

                          </Slide>
                        </div>
                      </Fade>
                    </div>
                </TabPanel>
                  <TabPanel value={value} index={1}>
                    <div>
                      <Fade in={true} timeout={1200}>
                        <div>
                          <Slide in={true} direction={"up"} timeout={400}>
                            <div>
                              <div>
                                <Typography variant="h5" style={{ textAlign: "center", color: "#616161", marginBottom: "10px" }} >
                                  Dataset
                      </Typography>
                              </div>
                              <div>
                                <DatasetTableComponent />
                              </div>

                            </div>

                          </Slide>
                        </div>
                      </Fade>
                    </div>


                  </TabPanel>
                  <TabPanel value={value} index={2}>
                    <div>
                      <Fade in={true} timeout={1200}>
                        <div>
                          <Slide in={true} direction={"up"} timeout={400}>
                            <div>
                              <PredictedTabs predictedTab={predictedTab} />

                            </div>

                          </Slide>
                        </div>
                      </Fade>
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
                <DialogBoxTabs  
                      setOpen={setOpen} handleClose={handleClose} 
                      scenarioTwoCallBack={scenarioTwoCallBack}
                      scenarioOneCallBack={scenarioOneCallBack}
                   />                
              </Dialog>
            </div>

          </Slide>
        </div>
      </Fade>
    </div>
  );
}

