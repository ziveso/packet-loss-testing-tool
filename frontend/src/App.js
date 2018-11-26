import React, { Component } from "react";
import { observer } from "mobx-react";
import { Row, Col } from "antd";
import IpFinder from "./components/IpFinder";
import Packetloss from "./components/Packetloss";
import Store from "./store";
import "./App.css";

const store = new Store();

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Packet loss testing tool</h1>
        <div>Your router ip address is : {store.routerIp.get()}</div>
        <div>Your ip adress is : </div>
        <Row style={{ marginTop: "20px" }}>
          <Col md={12}>
            <Packetloss store={store} />
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
