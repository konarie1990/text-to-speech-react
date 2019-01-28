import React, { Component } from "react";
import Speech from "speak-tts";

const speech = new Speech();
// create a global array variable and each index is new speech.init for each input/voice (init speech will have a forloop )

// create an array of property objects

class Voice extends Component {
  constructor(props) {
    const options = {
      volume: 1,
      lang: "en-GB",
      rate: 2,
      pitch: 1,
      voice: "Alex",
      splitSentences: true,
      listeners: {
        onvoiceschanged: voices => {
          console.log("Event voiceschanged", voices);
        }
      }
    };
    super(props);
    this.state = {
      volume: 1,
      lang: "en-GB",
      rate: 2,
      pitch: 1,
      voice: "Alex",
      splitSentences: true,
      listeners: {
        onvoiceschanged: voices => {
          console.log("Event voiceschanged", voices);
          this.handleInputChange = this.handleInputChange.bind(this);
        }
      }
    };

    this.speech = new Speech();
    this.speech
      .init(options)
      .then(data => {
        // The "data" object contains the list of available voices and the voice synthesis params
        console.log("Speech is ready, voices are available", data);
      })
      .catch(e => {
        console.error("An error occured while initializing : ", e);
      });
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    this.setState({
      [name]: target
    });
  }
  // handleChange = e => {
  //   this.setState({ [e.target.name]: e.target.value });
  // };

  handleSubmit = e => {
    e.preventDefault();
    // uncomment below to refresh input
    // this.setState({ textInput: "" });
  };

  speak = () => {
    speech
      .speak({
        text: this.state,
        queue: false, // current speech will be interrupted
        listeners: {
          onstart: () => {
            console.log("Start utterance");
          },
          onend: () => {
            console.log("End utterance");
          },
          onresume: () => {
            console.log("Resume utterance");
          },
          onboundary: event => {
            console.log(
              event.name +
                " boundary reached after " +
                event.elapsedTime +
                " milliseconds."
            );
          }
        }
      })
      .then(() => {
        console.log("Success !");
      })
      .catch(e => {
        console.error("An error occurred :", e);
      });
  };

  componentDidMount() {
    this.speak();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="sequenceContainer">
          <div id="step1" className="inputButtonContainer">
            <p>text</p>
            <input
              name="text"
              className="inputArea"
              value={this.state[1]}
              onChange={this.handleInputChange}
            />
            <p>pitch</p>
            <input
              name={this.pitch}
              className="inputArea"
              value={this.pitch}
              onChange={this.handleInputChange}
            />
            <button className="playButton" onClick={() => this.speak()}>
              Button 1
            </button>
          </div>
        </div>
      </form>
    );
  }
}

// to get sequencing to work - look into setInterval and setTimeout

export default Voice;
