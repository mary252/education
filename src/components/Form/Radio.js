import React, { Component } from "react";
import "./Form.css";

class Radio extends Component {
  state = {
    active_filters: null
  };

  componentWillReceiveProps({ someProp }) {
    this.setState({
      ...this.state,
      someProp
    });
  }

  render() {
    const { ischecked , disabled} = this.props;

    return (
      <div {...this.props}  className={`radio-button-container ${!disabled?ischecked ? `active` : ``:``}`}>
        { !disabled?ischecked ? <div className="dot" /> : null:null}
      </div>
    );
  }
}

export { Radio };
