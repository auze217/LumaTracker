import React from "react";
import FreeTemRewards from "../temtem/free-tem.js";
import "./home.css";
class SaiPark extends React.Component {
  render() {
    const { saiParkData, saiLand, saiWater } = this.props;
    var dateRange = "";
    if (saiParkData[0] !== undefined) {
      dateRange = saiParkData[0].dateRange + "";
      dateRange = dateRange.substring(0, dateRange.indexOf("2020") + 4);
    }
    return (
      <div className="saipark">
        <div>
          <div className="lf align-center">
            <strong>SaiPark TemTem of the Week</strong>
          </div>
          <div className="align-center">({dateRange})</div>
        </div>

        <div className="sai-wrapper align-center">
          <div className="land">
            <img
              className="sai-image"
              src={saiLand.portrait}
              alt={saiLand.temtem}
            ></img>
            <h3>
              {saiLand.temtem}, App Rate: {saiLand.lumaRate}%, Min SVs:
              {saiLand.minSvs}
            </h3>
          </div>
          <div className="water">
            <img
              className="sai-image"
              src={saiWater.portrait}
              alt={saiWater.temtem}
            ></img>
            <h3>
              {saiWater.temtem}, App Rate: {saiWater.lumaRate}%, Min SVs:{" "}
              {saiWater.minSvs}
            </h3>
          </div>
        </div>
        <div className="free-rewards align-center">
          <h2>FreeTem!</h2>
          <FreeTemRewards
            api={this.props.api}
            addEncounter={this.props.addEncounter}
          ></FreeTemRewards>
        </div>
      </div>
    );
  }
}
export default SaiPark;
