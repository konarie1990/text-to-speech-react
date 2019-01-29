import React, { Component } from "react";

class Pitch extends Component {
  constructor(props) {
    super(props);
    this.setPitch = props.setPitch;
    this.state = {
      input: "2"
    };
  }

  handleChange = e => {
    this.setState({
      input: e.target.value
    });
  };

  render() {
    const userInput = parseFloat(this.state.input);
    if (userInput >= 0 && userInput <= 2) {
      console.log("pitch set", userInput);

      this.setPitch(2);
    }
    return (
      <div>
        <p>pitch</p>
        <input
          className="inputArea"
          value={this.state.input}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default Pitch;
