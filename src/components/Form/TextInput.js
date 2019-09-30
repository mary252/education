import React, { Component } from "react";
import "./Form.css";

class TextInput extends Component {
  render() {
    const { placeholder, divClassName, errorMessage, disabled } = this.props;
    return (
      <div className={divClassName}>
        <input disabled={disabled} placeholder={placeholder} {...this.props} className={`${errorMessage ? 'error-border' : ''}`} />
        {errorMessage && (
          <label className="input-error-message">*{errorMessage}</label>
        )}
      </div>
    );
  }
}

export { TextInput };