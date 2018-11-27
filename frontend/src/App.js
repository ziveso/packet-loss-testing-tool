import React, { Component } from "react";
import { observer } from "mobx-react";
import { Row, Col } from "antd";
import firebase from "firebase/app";
import IpFinder from "./components/IpFinder";
import Packetloss from "./components/Packetloss";
import Graph from "./components/Graph";
import Store from "./store";
import "./App.css";

const store = new Store();

class App extends Component {
  constructor(props) {
    super(props);
    firebase.initializeApp({
      databaseURL: `ws://localhost:5556`
    });
  }
  render() {
    return (
      <div className="App">
        <h1>Packet loss testing tool</h1>
        <div>Your router ip address is : {store.routerIp.get()}</div>
        <div>Your ip adress is : </div>
        <Row style={{ margin: "20px 0" }}>
          <Col md={12}>
            <Packetloss store={store} />
            <br />
            <hr />
            <Graph store={store} />
          </Col>
          <Col md={12}>
            <IpFinder store={store} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default observer(App);
