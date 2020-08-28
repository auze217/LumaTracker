import React from "react";
import TemList from "../temtem/tem-list";
import TemTem from "../temtem/temtem";
import "./home.css";
export default class Tracker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDropped: false,
      selectedData: null,
      session: 0,
      rate: 1
    };
  }
  toggle = () => {
    this.setState((state) => ({
      isDropped: !state.isDropped,
    }));
  };
  handleSelected = (temtem) => {
    this.setState((state) => ({
      selectedData: temtem,
      isDropped: !state.isDropped,
    }));
    this.resetRate();
  };
  handleRate = (event) => {
    this.setState({ rate: event.target.value });
  };
  resetRate = () => {
      this.setState({rate: 1})
      this.props.reset();
  }
  render() {
    const { currentData, count } = this.props;
    const { isDropped, selectedData, rate } = this.state;
    var totRate = rate !== 0 ? Math.trunc(8000 / rate) : 8000;
    return (
      <div>
        <div className="dropdown">
          <button className="dropdown-button" onClick={this.toggle}>
            Search Tem
          </button>
          <TemList
            currentData={currentData}
            isDropped={isDropped}
            onSelectedTem={this.handleSelected}
          ></TemList>
        </div>
        <div className="tem-info">
          <div className="temtem">
            {selectedData !== null ? (
              <TemTem temtem={selectedData} wantsDetails="true"></TemTem>
            ) : (
              <div></div>
            )}
          </div>
        </div>
        <div className="tracker">
          <div className="d-flex">
            <h2>Count: {count}</h2>
            {count > 0 ? (
              <button className="dropdown-button reset" onClick={this.resetRate}>
                Reset
              </button>
            ) : (
              <div></div>
            )}
          </div>
          <div>
            8000 /
            <input
              className="luma-rate"
              type="number"
              name="rate"
              value={rate}
              min="1"
              onChange={this.handleRate}
            />{" "}
            = {totRate} encounters,{" "}
            <strong>{Math.trunc((count / totRate) * 10000) / 100}%</strong>{" "}
            increased odds of luma encounter
          </div>
          <div className="small-text">
            *This is all just theoretical, with the more normal encounters the
            odds of finding a luma increase*
          </div>
        </div>
      </div>
    );
  }
}
