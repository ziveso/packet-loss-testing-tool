import React, { Component } from "react";
import { Button } from "antd";
import { observer } from "mobx-react";
import { Line } from "react-chartjs-2";
import firebase from "firebase";

const data = {
  labels: [],
  datasets: [
    {
      label: "graph",
      fill: false,
      data: []
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
        const res = snap.val();
        if (res) {
        data.labels = Object.keys(res);
          const values = Object.values(res);
          data.datasets = [{ ...data.datasets[0], data: values }];
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
          <Line data={data} />
        </div>
      </div>
    );
  }
}

export default observer(Graph);
