import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow,
  Paper,
  IconButton,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import TemTableHead from "./tem-info-table-head";
import "./tem-info.css";
const useStyles = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
  container: {
    background: "#1f1f1f",
    color: "#f2f2f2",
  },
  cell: {
    color: "#f2f2f2",
    paddingTop: 0,
    paddingBottom: 0,
  },
  cellNumber: {
    width: "25px",
  },
  header: {
    color: "#f2f2f2",
    fontWeight: "bold",
    fontSize: "1.2rem",
    cursor: "pointer",
  },
  footer: {
    background: "#a3a3a3"
  }
}));
export default function TemTable(props) {
  const classes = useStyles();
  const { currentData, handleSort } = props;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <div className="table-container">
      <TableContainer component={Paper} className={classes.container}>
        <Table className={classes.table} aria-label="temtem table">
          <TemTableHead classes={classes}></TemTableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? currentData.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : currentData
            ).map((tem) => {
              var tvYields = Object.entries(tem.tvYields).filter(
                (kv) => kv[1] > 0
              );
              return (
                <TableRow key={tem.name}>
                  <TableCell
                    className={classes.cell + " " + classes.cellNumber}
                  >
                    <h3>{tem.number}</h3>
                  </TableCell>
                  <TableCell className={classes.cell}>
                    <div className="d-flex">
                      <img
                        src={tem.portraitWikiUrl}
                        alt={tem.name}
                        className="cell-portrait"
                      ></img>
                      <h3>&nbsp;{tem.name}</h3>
                    </div>
                  </TableCell>
                  <TableCell className={classes.cell}>
                    <div className="d-flex">
                      {Object.values(tem.genderRatio).map((val, i) => {
                        if (i % 2 === 0) {
                          return (
                            <h3 key={`${tem.name}-M`}>{`M: ${val}% /`}</h3>
                          );
                        } else {
                          return <h3 key={`${tem.name}-F`}>{`F: ${val}%`}</h3>;
                        }
                      })}
                    </div>
                  </TableCell>
                  <TableCell className={classes.cell}>
                    <div className="d-flex">
                      {tem.types.map((val, i) => (
                        <h3 key={`${tem.name}-${val}`}>
                          {i === 0 ? `${val}` : ` / ${val}`}
                        </h3>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className={classes.cell}>
                    <div className="d-flex">
                      {tem.traits.map((val, i) => (
                        <h3 key={`${tem.name}-${val}`}>
                          {i === 0 ? `${val}` : ` / ${val}`}
                        </h3>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className={classes.cell}>
                    <div className="d-flex">
                      {tvYields.map((val, i) => {
                        if (val[1] === 0) {
                          return null;
                        } else if (i > 0) {
                          return (
                            <h3
                              key={`${tem.name}-${val[0]}`}
                            >{`, ${val[0]}: ${val[1]}`}</h3>
                          );
                        } else {
                          return (
                            <h3
                              key={`${tem.name}-${val[0]}`}
                            >{`${val[0]}: ${val[1]}`}</h3>
                          );
                        }
                      })}
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
          <TableFooter className={classes.footer}>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={6}
              count={currentData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { "aria-label": "rows per page" },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            ></TablePagination>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
}
function TablePaginationActions(props) {
  const classes = useStyles();
  const theme = useTheme();
  const {count, page, rowsPerPage, onChangePage} = props;
  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };
  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}
