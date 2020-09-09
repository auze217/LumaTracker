import React from "react";
import TemTable from "./tem-info-table";
export default class TemInfoMaster extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: true, //true for asc, false for desc
      type: "number",
    };
  }
  sortBy = (t) => {
    const { order, type } = this.state;
    let temp = [];
    if (t !== type) {
      //asc since sort by new type
      temp = this.sortHelper(true, t);
      this.setState({ type: t });
    } else {
      temp = this.sortHelper(!order, type);
      this.setState({ order: !order });
    }
    return temp;
  };
  sortHelper = (ord, type) => {
    const { currentData } = this.props;
    let temp = [];
    switch (type) {
      case "name":
        temp = currentData.sort((a, b) => {
          if (ord) {
            if (a.name < b.name) {
              return -1;
            } else if (a.name > b.name) {
              return 1;
            } else {
              return 0;
            }
          } else {
            if (b.name < a.name) {
              return -1;
            } else if (b.name > a.name) {
              return 1;
            } else {
              return 0;
            }
          }
        });
        break;
      default:
        //sort by number
        temp = currentData.reverse();
        break;
    }
    return temp;
  };
  render() {
    const { currentData } = this.props;
    return (
      <TemTable currentData={currentData} handleSort={this.sortBy}></TemTable>
    );
  }
}
