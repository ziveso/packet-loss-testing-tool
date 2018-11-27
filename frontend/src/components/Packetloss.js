import React, { Component } from "react";
import { observer } from "mobx-react";
import { Button, Radio, Progress, message } from "antd";

const RadioGroup = Radio.Group;
const radioStyle = {
  display: "block",
  height: "30px",
  lineHeight: "30px"
};

export class Packetloss extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loss: "0",
      pinging: false
    };
    this.onChange = this.onChange.bind(this);
    this.ping = this.ping.bind(this);
  }

  onChange(e) {
    this.props.store.selectedValue.set(e.target.value);
  }

  ping() {
    this.setState({ pinging: true });
    this.props.store
      .ping(this.props.store.selectedValue.get())
      .then(res => this.setState({ loss: res, pinging: false }))
      .catch(err => {
        message.error(err);
        this.setState({ pinging: false });
      });
  }

  render() {
    const _Radio = this.props.store.ips.map((item, index) => {
      return (
        <Radio style={radioStyle} value={item.value} key={`radio${index}`}>
          {item.value} : <b>{item.name}</b>
        </Radio>
      );
    });
    return (
      <div style={{}}>
        <RadioGroup
          onChange={this.onChange}
          value={this.props.store.selectedValue.get()}
        >
          {_Radio}
        </RadioGroup>
        <br />
        <Button onClick={this.ping} loading={this.state.pinging}>
          Check
        </Button>
        <br />
        {this.props.store.progress.get() === 0 ? null : (
          <div style={{ width: "250px", margin: "auto" }}>
            <Progress percent={this.props.store.progress.get()} />
          </div>
        )}
        {this.state.loss !== "0" ? (
          <div>Packet loss : {this.state.loss}</div>
        ) : null}
      </div>
    );
  }
}

export default observer(Packetloss);
