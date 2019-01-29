import React, { Component } from "react";
import Speech from "speak-tts";
import Pitch from "./Pitch.js";

const speech = new Speech();
// create a global array variable and each index is new speech.init for each input/voice (init speech will have a forloop )

// create an array of property objects

class Voice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      speechText: "",
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
  }

  componentDidMount() {
    const options = {
      volume: 1,
      lang: "en-GB",
      rate: 2,
      pitch: 2,
      voice: "Alex",
      splitSentences: true,
      listeners: {
        onvoiceschanged: voices => {
          console.log("Event voiceschanged", voices);
        }
      }
    };
    this.speech
      .init(options)
      .then(data => {
        // The "data" object contains the list of available voices and the voice synthesis params
        console.log("Speech is ready, voices are available", data);
      })
      .catch(e => {
        console.error("An error occured while initializing : ", e);
      });
  }

  handleChange = e => {
    console.log("UPDATING speechText", e.target.value);

    this.setState({ speechText: e.target.value });
  };

  // handleInputChange(event) {
  //   const target = event.target;
  //   const name = target.name;
  //   this.setState({
  //     [name]: target
  //   });
  // }

  handleSubmit = e => {
    e.preventDefault();
    // uncomment below to refresh input
    // this.setState({ textInput: "" });
  };

  speak = phrase => {
    speech
      .speak({
        text: phrase,
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

  // pitchValue = (1) => {
  //   speech.setPitch(1) = () => {
  //     console.log("pitch set");
  //   };
  // };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="sequenceContainer">
          <div id="step1" className="inputButtonContainer">
            <p>text</p>
            <input
              value={this.state.speechText}
              type="text"
              name="textBox"
              className="inputArea"
              onChange={this.handleChange}
            />

            {/* <Pitch setPitch={this.speech.setPitch} /> */}
            <input
              name={this.pitch}
              className="inputArea"
              onChange={this.speech.setPitch(1)}
            />
            <button
              className="playButton"
              onClick={() => this.speak(this.state.speechText)}
            >
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
