import React, { Component } from "react";
import { observer } from "mobx-react";
import { Button, Radio } from "antd";

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
      value: "",
      loss: "0"
    };
    this.onChange = this.onChange.bind(this);
    this.ping = this.ping.bind(this);
  }

  onChange(e) {
    this.setState({
      value: e.target.value
    });
  }

  ping() {
    this.props.store
      .ping(this.state.value)
      .then(res => this.setState({ loss: res }));
  }

  render() {
    const _Radio = this.props.store.pingip.map((item, index) => {
      return (
        <Radio style={radioStyle} value={item.value} key={`radio${index}`}>
          {item.value} : <b>{item.name}</b>
        </Radio>
      );
    });

    return (
      <div style={{ marginTop: "50px" }}>
        <RadioGroup onChange={this.onChange} value={this.state.value}>
          {_Radio}
        </RadioGroup>
        <Button onClick={this.ping}>Check</Button>
        <div>Packetloss found {this.state.loss}</div>
      </div>
    );
  }
}

export default observer(Packetloss);
