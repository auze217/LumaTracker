import React from "react";
import TemList from "../temtem/tem-list.js";
import "./db.css";
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
      selectedData: null,
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
            isLoaded: true,
            currentData: result,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
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
  };
  render() {

    //adding listener for pressing space bar
    document.body.onkeydown = (event) => {
      if (event.key === " ") {
        this.addCount();
      }
    };
    const {
      isLoaded,
      currentData,
      error,
      isDropped,
      count,
      rate,
      selectedData,
    } = this.state;
    var totRate = rate !== 0 ? 8000 / rate : 8000;
    var left = totRate - count;
    var sadFace = left < 0;
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
        <div className="wrapper">
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
          <div className="main-page">
            <h1>TEMTEM TRACKER</h1>
            <div className="temtem">
              <div></div>
              {selectedData !== null ? (
                <div className="tem-name">
                  <h2>{selectedData.name.toUpperCase()}</h2>
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
                <h2>Count: {count}</h2>
                <div>
                  8000 /{" "}
                  <input
                    type="number"
                    name="rate"
                    value={rate}
                    min="1"
                    onChange={this.handleRate}
                  />{" "}
                  = {totRate} encounters, hopefully {left} encounters left{" "}
                  {sadFace === true ? ":(" : ":)"}
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
