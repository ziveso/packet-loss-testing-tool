import React, { Component } from "react";
import { Button } from "antd";
import { observer } from "mobx-react";
import { Line } from "react-chartjs-2";
import firebase from "firebase";

const data = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "My First dataset",
      fill: false,
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
};

export class Graph extends Component {
  constructor(props) {
    super(props);
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
  }

  componentDidMount() {
    firebase
      .database()
      .ref("/")
      .on("value", snap => {
        // const data = snap.map(item => item.val());
        console.log(snap.val());
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
          <Line data={data} />
        </div>
      </div>
    );
  }
}

export default observer(Graph);
