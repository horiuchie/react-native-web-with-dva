import React, { Component } from "react";
import { View, Text } from "react-native";
import Page from "../components/Page";
import Title from "../components/Title";

const LAYOUT = 1;

const Widget = ({ no, style }) => (
  <View
    style={{
      height: "100%",
      width: "100%",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      ...style
    }}
  >
    <Text>Widget No.{no}</Text>
  </View>
);

const contentStyle = orientation => ({
  flex: orientation === "landscape" ? 2.5 : 1,
  flexDirection: "column",
  alignItems: "flex-end",
  // justifyContent: "center",
  height: "100%",
  width: "100%"
});

const iStyle = layout => {
  switch (layout) {
    case 1:
      return {
        flex: 1,
        borderColor: "green",
        borderWidth: 2,
        width: "100%",
        height: "75%"
      };
    case 2:
      return { display: "none" };
    case 3:
      return { display: "none" };
    case 4:
      return {
        flex: 1,
        borderColor: "green",
        borderWidth: 2,
        width: "100%",
        height: "75%"
      };
    default:
      return {};
  }
};

const mainStyle = () => ({
  height: "100%",
  width: "100%",
  borderColor: "red",
  borderWidth: 2
});

const subStyle = orientation => ({
  borderColor: "blue",
  borderWidth: 2,
  position: "absolute",
  width: orientation === "landscape" ? "40.7%" : "36%",
  height: orientation === "landscape" ? "25%" : "36%",
  left: orientation === "landscape" ? "100%" : undefined,
  top: orientation === "landscape" ? undefined : "100%"
});

const dStyle = (layout, orientation) => {
  switch (layout) {
    case 1:
      return mainStyle();
    case 2:
      return mainStyle();
    case 3:
      return { display: "none" };
    case 4:
      return subStyle(orientation);
    default:
      return {};
  }
};

const vStyle = (layout, orientation) => {
  switch (layout) {
    case 1:
      return subStyle(orientation);
    case 2:
      return { display: "none" };
    case 3:
      return mainStyle();
    case 4:
      return mainStyle();
    default:
      return {};
  }
};

class HomePage extends Component {
  state = { orientation: "landscape" };

  componentWillMount() {}

  onLayout = event => {
    const { height, width } = event.nativeEvent.layout;
    const orientation = width > height ? "landscape" : "portrait";
    this.setState({ orientation });
  };

  render() {
    const containerStyle = {
      width: "100%",
      height: "100%",
      alignItems: "flex-end",
      justifyContent: "center",
      borderColor: "black",
      borderWidth: 5,
      flexDirection: this.state.orientation === "landscape" ? "row" : "column"
    };

    const widget1Props = {
      no: "d",
      style: dStyle(LAYOUT, this.state.orientation)
    };

    const widget2Props = {
      no: "v",
      style: vStyle(LAYOUT, this.state.orientation)
    };

    const widget3Props = {
      no: "i",
      style: iStyle(LAYOUT)
    };

    return (
      <Page>
        <Title>HomePage layout {LAYOUT}</Title>
        <View onLayout={this.onLayout} style={containerStyle}>
          <View style={contentStyle(this.state.orientation)}>
            <Widget {...widget1Props} />
            <Widget {...widget2Props} />
          </View>
          <Widget {...widget3Props} />
        </View>
      </Page>
    );
  }
}

export default HomePage;
