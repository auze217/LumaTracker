import React from "react";

class FreeTemRewards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rewards: [],
      error: "",
      isLoaded: false,
      releaseCount: 0,
    };
  }
  componentDidMount() {
    fetch(this.props.api + "freetem/rewards")
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        this.setState({ rewards: result, isLoaded: true }, (error) => {
          this.setState({ isLoaded: true, error });
        });
      });
  }
  addCount = () => {
    this.setState((state) => ({ releaseCount: state.releaseCount++ }));
  };
  render() {
    const { isLoaded, releaseCount, error } = this.state;
    document.body.onkeydown = (event) => {
      if (event.key === "Enter") {
        this.addCount();
      } else if (event.key === " ") this.props.addEncounter();
    };
    if (!isLoaded) {
      return <div></div>;
    } else if (isLoaded && error) {
      return <div>{error}</div>;
    } else {
      return (
        <div className="free-wrapper">
          <div className="rewards-wrap">
            <div className="rewards-wrapper">
              <div className="rewards-header">
                <div className="rh bold">Temtem Release</div>
                <div className="rh bold">Rewards</div>
              </div>
              <div className="rewards-body">
                {releaseCount >= 50 ? (
                  <div className="rb">
                    <div className="green rb-item d-flex w-50 center">50</div>
                    <div className="green rb-item d-flex w-50 center">asd</div>
                  </div>
                ) : (
                  <div className="rb">
                    <div className="rb-item d-flex w-50 center">50</div>
                    <div className="rb-item d-flex w-50 center">asd</div>
                  </div>
                )}

                {releaseCount >= 125 ? (
                  <div className="rb">
                    <div className="green rb-item d-flex w-50 center">125</div>
                    <div className="green rb-item d-flex w-50 center">asd</div>
                  </div>
                ) : (
                  <div className="rb">
                    <div className="rb-item d-flex w-50 center">125</div>
                    <div className="rb-item d-flex w-50 center">asd</div>
                  </div>
                )}
                {releaseCount >= 250 ? (
                  <div className="rb">
                    <div className="green rb-item d-flex w-50 center">250</div>
                    <div className="green rb-item d-flex w-50 center">asd</div>
                  </div>
                ) : (
                  <div className="rb">
                    <div className="rb-item d-flex w-50 center">250</div>
                    <div className="rb-item d-flex w-50 center">asd</div>
                  </div>
                )}
                {releaseCount >= 425 ? (
                  <div className="rb">
                    <div className="green rb-item d-flex w-50 center">425</div>
                    <div className="green rb-item d-flex w-50 center">asd</div>
                  </div>
                ) : (
                  <div className="rb">
                    <div className="rb-item d-flex w-50 center">425</div>
                    <div className="rb-item d-flex w-50 center">asd</div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <strong className="release-count">
            Released Temtem: {releaseCount}
          </strong>
        </div>
      );
    }
  }
}
export default FreeTemRewards;
