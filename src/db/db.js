import React from "react";
import "./db.css";
import SaiPark from "../home/saipark.js";
import Tracker from "../home/tracker";
class DBCall extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      rate: 1,
    };
  }
  addCount = () => {
    this.setState((state) => ({
      count: state.count++,
    }));
  };
  reset = () => {
    this.setState(() => ({
      count: 0,
    }));
  };

  render() {
    const {
      currentData,
      saiWater,
      saiLand,
      saiParkData,
    } = this.props.props;
    const {count} = this.state;
    return (
      <div id="wrapper" className="wrapper">
        <div className="main-page">
          <Tracker
            count={count}
            //rate={rate}
            reset={this.reset}
            currentData={currentData}
          ></Tracker>
          <SaiPark
            saiWater={saiWater}
            saiLand={saiLand}
            saiParkData={saiParkData}
            api={this.props.api}
            addEncounter={this.addCount}
          ></SaiPark>
        </div>
      </div>
    );
  }
}
export default DBCall;
