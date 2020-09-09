import React from "react";
import "./App.css";
import DBCall from "./db/db.js";
import TemInfoMaster from "./tem-info/tem-info-master";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
export default class App extends React.Component {
  api = "https://temtem-api.mael.tech/api/";
  constructor(props) {
    super(props);
    this.state = {
      currentData: [],
      isLoaded: false,
      isDropped: false,
      saiParkLoaded: false,
      saiParkData: [],
      saiWater: null,
      saiLand: null,
      error: null,
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
                }).lumaWikiPortraitUrlLarge,
                ...rs[0].water[0],
              };
              var sl = {
                portrait: this.state.currentData.find((tem) => {
                  let name = tem.name + "";
                  return (
                    name.toUpperCase() === rs[0].land[0].temtem.toUpperCase()
                  );
                }).lumaWikiPortraitUrlLarge,
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
  home() {
    return <DBCall props={this.state} api={this.api}></DBCall>
  }
  temInfo() {
    return <TemInfoMaster currentData={this.state.currentData}></TemInfoMaster>;
  }
  render() {
    const { isLoaded, error } = this.state;
    return (
      <Router>
        <div className="app-wrapper">
          <nav>
            <ul>
              <li id="home">
                <Link id="home-a" to="/" onClick={() => Highlight("home")}>
                  Home
                </Link>
              </li>
              <li id="teminfo">
                <Link
                  id="teminfo-a"
                  to="/teminfo"
                  onClick={() => Highlight("teminfo")}
                >
                  Tem Info
                </Link>
              </li>
            </ul>
          </nav>
          <div className="body-wrapper">
            <div className="title-wrap">
              <div className="title">
                <div>TEMTEM TRACKER</div>
                {/* <img src={Logo} alt="logo"></img> */}
              </div>
            </div>
            <Switch>
              <Route path="/teminfo">
                {this.temInfo()}
              </Route>
              <Route path="/">
                {isLoaded ? (
                  !error ? (
                   this.home()
                  ) : (
                    <div></div>
                  )
                ) : (
                  <div></div>
                )}
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}
function Highlight(url) {}

