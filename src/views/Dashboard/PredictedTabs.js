import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import DialogContentText from '@material-ui/core/DialogContentText';
import PredictedTableComponent from "./PredictedTableComponent.js";
import RecommendedTableComponents from './RecommendedTableComponents.js';
    



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
    padding: {
        padding: theme.spacing(2),
    },
    demo1: {
        backgroundColor: theme.palette.background.paper,
    },
    demo2: {
        backgroundColor: '#2e1534',
    },
}));

export default function PredictedTabs(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    React.useEffect(() => {
        // Update the document title using the browser API
        setValue(props.predictedTab)
        return () => {
          
        };
      },[props.predictedTab]);


    return (
        <div className={classes.root}>
            <div className={classes.demo1}>
                <AntTabs value={value} onChange={handleChange} aria-label="ant example">
                    <AntTab label="Scenario one" />
                    <AntTab label="Scenario two" />
                </AntTabs>
                <Typography className={classes.padding} />
            </div>
            <TabPanel value={value} index={0}>
                <DialogContentText>
                    <span style={{ fontWeight: "bold" }}>Scenario:</span>
                    <br></br>
                        Given crime type, crime location. List down and predict
                        the possible suspects that can commit the given crime type at give location
                        <br></br>
                    <span style={{ fontWeight: "bold" }}>Note: This only shows latest records from Database, not the previous searches.</span>
                </DialogContentText>
                <Typography variant="h5" style={{ textAlign: "center", color: "#616161", marginBottom: "10px" }} >
                    Predicted Suspects
                </Typography>

                <div>
                <RecommendedTableComponents />
                </div>

            </TabPanel>
            <TabPanel value={value} index={1}>
                <DialogContentText>
                    <span style={{ fontWeight: "bold" }}>Scenario:</span>

                        Given crime type, crime location and gender. List down the type of
                    race of person and age that could've commited that crime. The model takes three inputs and returns race and age of type
                    of suspects
                    <br></br>
                    <span style={{ fontWeight: "bold" }}>Note: Order is from latest to old ones.</span>
                </DialogContentText>
                <Typography variant="h5" style={{ textAlign: "center", color: "#616161", marginBottom: "10px" }} >
                    Predicted Values
                    </Typography>

                <div>
                    <PredictedTableComponent />
                </div>
            </TabPanel>

        </div>
    );
}
