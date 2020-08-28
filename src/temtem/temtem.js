import React from "react";
import "./temtem.css";
class TemTem extends React.Component {
  render() {
    const { wantsDetails, temtem } = this.props;
    const {name, portraitWikiUrl} = temtem;
    if (wantsDetails) {
      return <div className="tem-details">
         <div className="tem-name">
                     <strong className="lf">
                       {temtem.name.toUpperCase()}
                     </strong>
                     <div className="tem-images">
                       <img
                        className="tem-image"
                        src={temtem.wikiPortraitUrlLarge}
                        alt="normal"
                      ></img>
                      <img
                        className="tem-image"
                        src={temtem.lumaWikiPortraitUrlLarge}
                        alt="luma"
                       ></img>
                     </div>
                   </div>
      </div>;
    } else {
      return (
        <div className="drop-tem" onClick={()=> this.props.onSelectedTem(this.props.temtem)}>
          <h3 className="tem-name">{name}</h3>
          <img className="portrait" src={portraitWikiUrl} alt={name}></img>
        </div>
      );
    }
  }
}
export default TemTem;
