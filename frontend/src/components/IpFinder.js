import React, { Component } from "react";
import { Input } from "antd";
import { observer } from "mobx-react";

const Search = Input.Search;

export class IpFinder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      url: ""
    };
    this.onClick = this.onClick.bind(this);
  }
  
  onClick(value) {
    this.setState({ url: value });
    this.props.store.findIp(value).then(res => {
      this.setState({ address: res });
    });
  }
  render() {
    return (
      <div>
        <div style={{ maxWidth: "400px", margin: "auto" }}>
          <Search
            placeholder="custom address"
            enterButton="Find address"
            onSearch={this.onClick}
          />
        </div>
        <div>
          {this.state.url && this.state.address ? (
            <div>
              {this.state.address} is a {this.state.url}
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default observer(IpFinder);
