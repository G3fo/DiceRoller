import React, { Component } from "react";
import "./App.css";
import Dice from "./components/Dice";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      diceToDraw: [],
      selectedNumberOfDice: "",
      json: null,
      totalValue: null
    };
  }

  componentDidMount() {
    setInterval(() => {
      if (this.state.json) {
        var totalValue = this.state.json.reduce((a, b) => {
          return a + b.value;
        }, 0);
      }

      this.setState(prevState => {
        return (prevState.totalValue = totalValue);
      });
    }, 100);
  }

  fetchDice = () => {
    fetch("http://roll.diceapi.com/json" + this.state.selectedNumberOfDice)
      .then(res => res.json())
      .then(data => this.setState({ json: data.dice }));
  };

  handleDice = die => {
    this.setState(() => {
      this.state.diceToDraw.push("D" + die);
    });
    let selectedNumberOfDice = this.state.selectedNumberOfDice + "/D" + die;
    this.setState({ selectedNumberOfDice: selectedNumberOfDice });
  };

  deleteDie = die => {
    this.state.diceToDraw.splice(die, 1);
    let selectedDice = "";
    this.state.diceToDraw.forEach(item => (selectedDice += "/" + item));

    this.setState({ selectedNumberOfDice: selectedDice });
  };

  render() {
    const differentDice = [4, 6, 8, 10, 12, 20];

    return (
      <div className="App">
        <div className="container" id="header">
          <h1 className="title">Elegir dados</h1>
          <div className="content" id="chooseDice">
            {differentDice.map((die, index) => {
              return (
                <Dice
                  alt={die}
                  src={"./dice/D" + die + ".png"}
                  onClick={() => this.handleDice(die)}
                  die={die}
                  key={index}
                />
              );
            })}
          </div>
          <br></br>

          <div className="content" id="toRoll">
            {this.state.selectedNumberOfDice && (
              <div>
                <button onClick={this.fetchDice} className="btn btn-danger">
                  Roll!
                </button>
              </div>
            )}

            {this.state.diceToDraw.map((die, index) => {
              return (
                <Dice
                  onClick={() => {
                    this.deleteDie(index);
                  }}
                  key={index}
                  src={"./dice/" + die + ".png"}
                  alt={die}
                  die={die}
                />
              );
            })}
          </div>
          <br></br>

          <div className="content" id="results">
            {this.state.totalValue && (
              <div>
                <h3>Total = {this.state.totalValue}</h3>
              </div>
            )}
            <br></br>
            <div className="content">
              {this.state.json
                ? this.state.json.map((die, index) => {
                    return (
                      <button className="btn btn-warning" key={index}>
                        {die.value}
                      </button>
                    );
                  })
                : ""}
            </div>
            <br></br>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
