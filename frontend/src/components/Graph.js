import React, { Component } from "react";
import { Button } from "antd";
import { observer } from "mobx-react";
import { Line } from "react-chartjs-2";
import firebase from "firebase";

export class Graph extends Component {
  constructor(props) {
    super(props);
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.state = {
      data: {
        labels: [],
        datasets: [
          {
            label: "graph",
            fill: false,
            data: []
          }
        ]
      }
    };
  }

  componentDidMount() {
    firebase
      .database()
      .ref("/")
      .on("value", snap => {
        const res = snap.val();
        if (res) {
          this.setState({
            data: { ...this.state.data, labels: Object.keys(res) }
          });
          let values = [];
          this.state.data.labels.forEach(item => {
            values.push(parseFloat(res[item].slice(0, res[item].length - 1)));
          });
          this.setState({
            data: {
              ...this.state.data,
              datasets: [{ ...this.state.data.datasets[0], data: values }]
            }
          });
        }
      });
  }

  start() {
    this.props.store.continuous.set(true);
  }
  stop() {
    this.props.store.continuous.set(false);
  }

  render() {
    return (
      <div>
        {!this.props.store.continuous.get() ? (
          <Button onClick={this.start}>check continuously</Button>
        ) : (
          <Button onClick={this.stop}>Stop</Button>
        )}
        <div style={{ maxWidth: "500px", margin: "auto" }}>
          <Line data={this.state.data} />
        </div>
      </div>
    );
  }
}

export default observer(Graph);
