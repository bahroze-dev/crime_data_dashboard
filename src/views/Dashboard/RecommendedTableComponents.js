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
  { id: 'PERP_RACE', label: 'Race', minWidth: 100 },
  { id: 'PERP_SEX', label: 'Gender', minWidth: 100 },
  { id: 'Age', label: 'Age', minWidth: 100 },
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

export default function RecommendedTableComponents() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [predictedData,changePredictedData] = React.useState([]);
  

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  React.useEffect(() => {
    // Update the document title using the browser API
    

    fetch('http://34.96.255.76:4000/get_recommended_suspects', {
      method: 'GET', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
        },
      })
      .then(response => response.json())
      .then(data => {
        var mydata = data.recommended_suspects
        changePredictedData(mydata.recommended_suspects)
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
            {predictedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row,i) => {
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
        count={predictedData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}