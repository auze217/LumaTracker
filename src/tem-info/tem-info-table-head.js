import React from "react";
import {
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@material-ui/core";

function comparator(order, sortBy) {}
function sort(data, comp) {
  console.log(data);
}
const headerCells = [
  { id: "number", label: "#", sort: true },
  { id: "name", label: "Temtem", sort: true },
  {id: "ratio", label: "M/F Ratio", sort: false},
  { id: "type", label: "Type(s)", sort: false },
  { id: "traits", label: "Trait(s)", sort: false },
  { id: "tvyields", label: "TV Yields", sort: false },
];
export default function TemTableHead(props) {
  const {
    classes,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  return (
    <TableHead>
      <TableRow>
        {headerCells.map(cell => (
            <TableCell key={cell.id} className={classes.header}>
                <div>{cell.label}</div>
            </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
