import React from "react";
import { Twemoji } from "react-emoji-render";

const styles = {
  width: 100,
  height: 100,
  background: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 15,
  color: "gray",
  borderRadius: 10,
  margin: 10,
  boxShadow: "0px 10px 47px -16px rgba(0,0,0,0.5)"
};

class DemoSquareComponent extends React.Component {
  render() {
    return (
      <div className="item" style={{ ...styles }}>
        {this.props.name}
        <Twemoji text={this.props.emoji} style={{ fontSize: 30 }} />
      </div>
    );
  }
}

export default DemoSquareComponent;
