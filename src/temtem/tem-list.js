import React from "react";
import TemTem from "./temtem";
import "./temtem.css";
class TemList extends React.Component {

  render() {
    const { currentData, isDropped } = this.props;
    if (isDropped) {
      return (
        <div>
          <ul className="tem-list">
            {currentData.map((item) => (
              <li className="temtem" key={item.number}>
                <TemTem
                  temtem={item}
                  onSelectedTem={this.props.onSelectedTem}
                ></TemTem>
              </li>
            ))}
          </ul>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}
export default TemList;
