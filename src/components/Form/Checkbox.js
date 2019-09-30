import React, { Component } from "react";
import "./Form.css";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Checkbox extends Component {
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
    const { ischecked, disabled } = this.props;
    return (
      <div
        className={`checkbox-container ${!disabled?ischecked ? `active` : ``:``}`}
        {...this.props}
      >
        { !disabled?
        ischecked ? (
          <FontAwesomeIcon icon={faCheck} style={{ color: "#3e96d2" }} />
        ) : null:null}
      </div>
    );
  }
}

export { Checkbox };
