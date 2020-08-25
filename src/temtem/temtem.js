import React from "react";
import "./temtem.css";
class TemTem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.temtem.name,
      types: props.temtem.types,
      number: props.temtem.number,
      portrait: props.temtem.portraitWikiUrl,
      wikiUrl: props.temtem.wikiUrl,
      stats: props.temtem.stats,
      traits: props.temtem.traits,
      details: props.temtem.details,
      techniques: props.temtem.techniques,
      evolution: props.temtem.evolution,
      wikiPortrait: props.temtem.wikiPortraitUrlLarge,
      locations: props.temtem.locations,
      icon: props.temtem.icon,
      lumaIcon: props.temtem.lumaIcon,
      genderRatio: props.temtem.genderRatio,
      catchRate: props.temtem.catchRate,
      hatchMins: props.temtem.hatchMins,
      tvYields: props.temtem.tvYields,
      wantsDetails: false,
    };
  }
  render() {
    const { wantsDetails, name, portrait } = this.state;
    if (wantsDetails) {
      return <div className="tem-details"></div>;
    } else {
      return (
        <div className="drop-tem" onClick={()=> this.props.onSelectedTem(this.props.temtem)}>
          <h3 className="tem-name">{name}</h3>
          <img className="portrait" src={portrait} alt={name}></img>
        </div>
      );
    }
  }
}
export default TemTem;
