import axios from "axios";
import { observable } from "mobx";

function getRouterIp() {
  return axios.get("/routerip");
}

class Store {
  constructor() {
    getRouterIp().then(res => {
      this.routerIp.set(res.data);
      this.pingip[0] = { name: "router ip", value: res.data };
    });
  }

  ping = address => {
    console.log(address);
    return new Promise((resolved, reject) => {
      axios
        .get("/pingIp/" + address + "?time=10")
        .then(res => resolved(res.data))
        .catch(err => reject(err));
    });
  };

  findIp = url => {
    return new Promise((resolved, reject) => {
      axios
        .get("/getIP/" + url)
        .then(res => {
          this.pingip[this.pingip.length] = { name: url, value: res.data };
          resolved(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  loading = observable.box("false");
  routerIp = observable.box("");
  pingip = observable([]);
}

export default Store;
