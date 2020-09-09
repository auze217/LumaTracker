import React from "react";
import TemTable from "./tem-info-table";
export default class TemInfoMaster extends React.Component {
  sortBy = (order, type) => {
      const {currentData} = this.props;
    let temp = [];
    if (order === "asc") {
      switch (type) {
        case "number":
            temp = currentData.sort((a, b) => a.number - b.number);
            console.log(temp);
          break;
        default:
          break;
      }
    }
    else {
        switch (type) {
            case "number":
                temp = currentData.sort((a, b) => b.number - a.number);
                console.log(temp);
              break;
            default:
              break;
          }
    }
    return temp;
  };
  render() {
      const data = this.sortBy('desc', 'number');
    return <TemTable currentData={data} handleSort={this.sortBy}></TemTable>;
  }
}
