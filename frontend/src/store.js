import axios from "axios";
import { observable } from "mobx";

function getRouterIp() {
  return axios.get("/routerip");
}

class Store {
  loading = observable.box("false");
  routerIp = observable.box("");
  ips = observable([]);
  selectedValue = observable.box("");
  progress = observable.box(0);

  constructor() {
    getRouterIp().then(res => {
      this.routerIp.set(res.data);
      this.ips[0] = { name: "router ip", value: res.data };
      this.selectedValue.set(res.data);
    });
  }

  ping = address => {
    const time = 30;
    let count = 1;
    const progress = setInterval(() => {
      this.progress.set((count * 100) / time);
      count += 1;
      if (count > time) {
        this.progress.set(0);
        clearInterval(progress);
      }
    }, 1000);
    return new Promise((resolved, reject) => {
      axios
        .get("/pingIp/" + address + `?time=${time}`)
        .then(res => {
          clearInterval(progress);
          this.progress.set(100);
          resolved(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  findIp = url => {
    return new Promise((resolved, reject) => {
      axios
        .get("/getIP/" + url)
        .then(res => {
          this.ips[this.ips.length] = { name: url, value: res.data };
          resolved(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  };
}

export default Store;
