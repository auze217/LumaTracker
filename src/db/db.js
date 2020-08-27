import React from "react";
import TemList from "../temtem/tem-list.js";
import "./db.css";
import FreeTemRewards from "../temtem/free-tem.js";
class DBCall extends React.Component {
  api = "https://temtem-api.mael.tech/api/";
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      type: "",
      trait: "",
      technique: "",
      number: "",
      currentData: [],
      isLoaded: false,
      isDropped: false,
      saiParkLoaded: false,
      saiParkData: [],
      selectedData: null,
      saiWater: null,
      saiLand: null,
      count: 0,
      rate: 1,
    };
  }
  componentDidMount() {
    fetch(this.api + "temtems")
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            currentData: result,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      )
      .then(() => {
        fetch(this.api + "saipark")
          .then((r) => r.json())
          .then(
            (rs) => {
              var sw = {
                portrait: this.state.currentData.find((tem) => {
                  let name = tem.name + "";
                  return (
                    name.toUpperCase() === rs[0].water[0].temtem.toUpperCase()
                  );
                }).portraitWikiUrl,
                ...rs[0].water[0],
              };
              var sl = {
                portrait: this.state.currentData.find((tem) => {
                  let name = tem.name + "";
                  return (
                    name.toUpperCase() === rs[0].land[0].temtem.toUpperCase()
                  );
                }).portraitWikiUrl,
                ...rs[0].land[0],
              };
              this.setState({
                saiParkData: rs,
                saiWater: sw,
                saiLand: sl,
                isLoaded: true,
                saiParkLoaded: true,
              });
            },
            (e) => {
              this.setState({ isLoaded: true, error: e });
            }
          );
      });
  }
  toggle = () => {
    this.setState((state) => ({
      isDropped: !state.isDropped,
    }));
  };
  handleRate = (event) => {
    this.setState({ rate: event.target.value });
  };
  addCount = () => {
    this.setState((state) => ({
      count: state.count++,
    }));
  };
  reset = () => {
    this.setState(() => ({
      count: 0,
      rate: 1,
    }));
  };
  handleSelected = (temtem) => {
    this.setState((state) => ({
      selectedData: temtem,
      isDropped: !state.isDropped,
    }));
    this.reset();
  };
  render() {
    const {
      isLoaded,
      currentData,
      error,
      isDropped,
      count,
      rate,
      selectedData,
      saiWater,
      saiLand,
      saiParkData,
    } = this.state;
    var totRate = rate !== 0 ? Math.trunc(8000 / rate) : 8000;
    var dateRange = "";
    if (saiParkData[0] !== undefined) {
      dateRange = saiParkData[0].dateRange + "";
      dateRange = dateRange.substring(0, dateRange.indexOf("2020") + 4);
    }
    if (error) {
      return <div>Error: {error}</div>;
    } else if (!isLoaded) {
      return (
        <div className="loading">
          Loading...
          <img src="" alt="Loading_Image"></img>
        </div>
      );
    } else {
      return (
        <div id="wrapper" className="wrapper">
          {/* <div className="dropdown">
            <button className="dropdown-button" onClick={this.toggle}>
              Search Tem
            </button>
            <TemList
              currentData={currentData}
              isDropped={isDropped}
              onSelectedTem={this.handleSelected}
            ></TemList>
          </div> */}
          <div className="main-page">
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
                <div></div>
                {selectedData !== null ? (
                  <div className="tem-name">
                    <strong className="lf">
                      {selectedData.name.toUpperCase()}
                    </strong>
                    <div className="tem-images">
                      <img
                        className="tem-image"
                        src={selectedData.wikiPortraitUrlLarge}
                        alt="normal"
                      ></img>
                      <img
                        className="tem-image"
                        src={selectedData.lumaWikiPortraitUrlLarge}
                        alt="luma"
                      ></img>
                    </div>
                  </div>
                ) : (
                  <div></div>
                )}

                <div className="tracker">
                  <div className="d-flex">
                    <h2>Count: {count}</h2>
                    {count > 0 ? (
                      <button
                        class="dropdown-button reset"
                        onClick={this.reset}
                      >
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
                    <strong>
                      {Math.trunc((count / totRate) * 10000) / 100}%
                    </strong>{" "}
                    increased odds of luma encounter
                  </div>
                  <div className="small-text">
                    *This is all just theoretical, with the more normal
                    encounters the odds of finding a luma increase*
                  </div>
                </div>
              </div>
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
                      {saiWater.temtem}, App Rate: {saiWater.lumaRate}%, Min
                      SVs: {saiWater.minSvs}
                    </h3>
                  </div>
                </div>
                <div className="free-rewards align-center">
                  <h2>FreeTem!</h2>
                  <FreeTemRewards
                    api={this.api + "freetem/rewards"}
                    addEncounter={this.addCount}
                  ></FreeTemRewards>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}
export default DBCall;
