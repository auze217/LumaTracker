import React from "react";
import "./App.css";
import DBCall from "./db/db.js";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
export default function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <nav>
          <ul>
            <li id="home">
              <Link id="home-a" to="/" onClick={() => Highlight("home")}>Home</Link>
            </li>
            <li id="teminfo">
              <Link id="teminfo-a" to="/teminfo" onClick={() => Highlight("teminfo")}>Tem Info</Link>
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
              <TemInfo />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}
function Highlight(url) {
}
function Home() {
  return <DBCall></DBCall>;
}

function TemInfo() {
  return <h2>Work in Progress :(</h2>;
}
