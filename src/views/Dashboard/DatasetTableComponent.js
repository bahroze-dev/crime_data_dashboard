import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

const columns = [
  { id: 'Name', label: 'Name', minWidth: 100 },
  { id: 'Age', label: 'Age', minWidth: 50 },
  { id: 'PERP_SEX', label: 'Gender', minWidth: 50 },
  { id: 'PERP_RACE', label: 'Perpetrator Race', minWidth: 100 },
  { id: 'OFNS_DESC', label: 'Offense', minWidth: 100 },
  { id: 'Local Area', label: 'Local Area', minWidth: 100 },
  { id: 'City', label: 'City', minWidth: 100 },
  { id: 'Date', label: 'Date', minWidth: 100 },
  { id: 'Time', label: 'Time', minWidth: 100 },
  { id: 'Latitude', label: 'Latitude', minWidth: 100 },
  { id: 'Longitude', label: 'Longitude', minWidth: 100 },
  

  // { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
  // {
  //   id: 'population',
  //   label: 'Population',
  //   minWidth: 170,
  //   align: 'right',
  //   format: (value) => value.toLocaleString('en-US'),
  // },
  // {
  //   id: 'size',
  //   label: 'Size\u00a0(km\u00b2)',
  //   minWidth: 170,
  //   align: 'right',
  //   format: (value) => value.toLocaleString('en-US'),
  // },
  // {
  //   id: 'density',
  //   label: 'Density',
  //   minWidth: 170,
  //   align: 'right',
  //   format: (value) => value.toFixed(2),
  // },
];


const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 500,
    minHeight: 350,
  },
});

export default function DatasetTableComponent() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [crimeData, changeCrimeData] = React.useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  React.useEffect(() => {
    // Update the document title using the browser API
    

    fetch('http://0.0.0.0:4000/getData', {
      method: 'GET', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
        },
      })
      .then(response => response.json())
      .then(crimeData => {
        changeCrimeData(crimeData.data)
      })
      .catch((error) => {
        console.error('Error:', error);
      });

  },[]);

  
  return (
    <Paper className={classes.root} square={false} variant="outlined" elevation={0}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {crimeData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row,i) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={i} >
                  {columns.map((column,j) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={j} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={crimeData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}