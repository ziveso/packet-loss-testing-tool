import React, { Component } from "react";
import { observer } from "mobx-react";
import IpFinder from "./components/IpFinder";
import Packetloss from "./components/Packetloss";
import Store from "./store";
import "./App.css";

const store = new Store();

class App extends Component {
  render() {
    return (
      <div>
        <h1>Packet loss testing tool</h1>
        <div>Your router ip address is : {store.routerIp.get()}</div>
        <IpFinder store={store} />
        <Packetloss store={store} />
      </div>
    );
  }
}

export default observer(App);
