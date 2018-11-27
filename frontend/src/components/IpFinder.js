import React, { Component } from "react";
import { Input } from "antd";
import { observer } from "mobx-react";
import axios from "axios";
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Markers,
  Marker
} from "react-simple-maps";
import world50m from "./world-50m.json";

const wrapperStyles = {
  width: "100%",
  maxWidth: 980,
  margin: "0 auto"
};

const Search = Input.Search;

export class IpFinder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      url: "",
      markers: []
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick(value) {
    this.setState({ url: value });
    this.props.store.findIp(value).then(res => {
      this.setState({ address: res });
      axios
        .get(
          `http://api.ipstack.com/${res}?access_key=1d720daed8a4c53e8dbed3eae9252b82`
        )
        .then(res => {
          console.log(res.data);
          const marker = {
            markerOffset: -25,
            name: res.data.country_name,
            coordinates: [res.data.longitude, res.data.latitude]
          };
          this.setState({ markers: [marker] });
        })
        .catch(err => console.log(err));
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
        <div style={wrapperStyles}>
          <ComposableMap
            projectionConfig={{
              scale: 205,
              rotation: [-11, 0, 0]
            }}
            width={980}
            height={551}
            style={{
              width: "100%",
              height: "auto"
            }}
          >
            <ZoomableGroup center={[0, 20]} disablePanning>
              <Geographies geography={world50m}>
                {(geographies, projection) =>
                  geographies.map(
                    (geography, i) =>
                      geography.id !== "ATA" && (
                        <Geography
                          key={i}
                          geography={geography}
                          projection={projection}
                          style={{
                            default: {
                              fill: "#ECEFF1",
                              stroke: "#607D8B",
                              strokeWidth: 0.75,
                              outline: "none"
                            },
                            hover: {
                              fill: "#607D8B",
                              stroke: "#607D8B",
                              strokeWidth: 0.75,
                              outline: "none"
                            },
                            pressed: {
                              fill: "#FF5722",
                              stroke: "#607D8B",
                              strokeWidth: 0.75,
                              outline: "none"
                            }
                          }}
                        />
                      )
                  )
                }
              </Geographies>
              <Markers>
                {this.state.markers.map((marker, i) => (
                  <Marker
                    key={i}
                    marker={marker}
                    style={{
                      default: { fill: "#FF5722" },
                      hover: { fill: "#FFFFFF" },
                      pressed: { fill: "#FF5722" }
                    }}
                  >
                    <circle
                      cx={0}
                      cy={0}
                      r={10}
                      style={{
                        stroke: "#FF5722",
                        strokeWidth: 3,
                        opacity: 0.9
                      }}
                    />
                    <text
                      textAnchor="middle"
                      y={marker.markerOffset}
                      style={{
                        fontFamily: "Roboto, sans-serif",
                        fill: "#607D8B"
                      }}
                    >
                      {marker.name}
                    </text>
                  </Marker>
                ))}
              </Markers>
            </ZoomableGroup>
          </ComposableMap>
        </div>
      </div>
    );
  }
}

export default observer(IpFinder);
