import React from "react";
import TemTem from "./temtem";
import "./temtem.css";
class TemList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredTem: this.props.currentData,
      searchValue: ''
    };
  }
  filter = (event) => {
    let fil = this.props.currentData.filter((tem) => {
      let name = tem.name + "";
      return name.toUpperCase().includes(event.target.value.toUpperCase());
    });
    this.setState({ filteredTem: fil, searchValue: event.target.value });
  };
  render() {
    const { isDropped } = this.props;
    const { filteredTem, searchValue } = this.state;
    if (isDropped) {
      return (
        <div>
          <ul className="tem-list">
            <li>
              <input autoFocus className="tem-search-input" placeholder="Search" value={searchValue} onChange={this.filter} />
            </li>
            {filteredTem.map((item) => (
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
