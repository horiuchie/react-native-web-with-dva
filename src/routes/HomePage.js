import React, { Component } from 'react';
import * as R from 'ramda';
import { View, Text } from 'react-native';
import Page from '../components/Page';

const LAYOUT = 1;
const DETAIL = false;
const SUB = true;
const FOOTER_HEIGHT = 60;

const dimensionProps = (obj, path=[]) => R.o(
  R.pick(['width', 'height']),
  R.pathOr({ width: 0, height: 0 }, path)
)(obj);

const Widget = ({ no, style, dimensions }) => (
  <View
    style={{
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      ...style,
      ...dimensions
    }}
  >
    <Text>Widget No.{no}</Text>
  </View>
);

const sideStyle = (orientation, parentSize, detail) => ({
  display: detail ? 'none' : 'flex',
  flexGrow: orientation === 'landscape' ? 1 : 0,
  order: 4,
  borderColor: 'green',
  borderWidth: 1,
  width: orientation === 'landscape' ? parentSize.width * 0.288 : parentSize.width,
  height: orientation === 'landscape' ? parentSize.height * 0.75 : parentSize.height * 0.6
});

const detailStyle = (orientation, parentSize, detail) => ({
  display: detail ? 'flex' : 'none',
  flexGrow: 0,
  order: 4,
  borderColor: 'cyan',
  borderWidth: 1,
  zIndex: 2,
  width: orientation === 'landscape' ? parentSize.width * 0.5 : parentSize.width,
  height: orientation === 'landscape' ? parentSize.height : parentSize.height * 0.6
});

const mainStyle = (orientation, parentSize, footerHeight, maximize, detail) => {
  const cond = `(${orientation}, ${maximize})`;
  const baseStyle = { borderColor: 'red', borderWidth: 1/*, flexGrow: 1*/, overflow: 'hidden' };
  switch (cond) {
    case '(landscape, false)': {
      const percentage = detail ? 0.5 : 0.712;
      const width = parentSize.width * percentage;
      const height = parentSize.height - footerHeight;
      return { ...baseStyle, width, height };
    }
    case '(landscape, true)': {
      const percentage = detail ? 0.5 : 1.0;
      const width = parentSize.width * percentage;
      const height = parentSize.height - footerHeight;
      return { ...baseStyle, width, height };
    }
    default: {
      const percentage = (maximize && !detail) ? 1.0 : 0.4;
      const width = parentSize.width;
      const height = parentSize.height * percentage - footerHeight;
      return { ...baseStyle, width, height };
    }
  }
};

const footerStyle = (orientation, parentSize, footerHeight, maximize, detail) => {
  const cond = `(${orientation}, ${maximize})`;
  const baseStyle = { height: footerHeight, borderColor: 'yellow', borderWidth: footerHeight < 1 ? 0 : 2 };
  switch (cond) {
    case '(landscape, false)': {
      const percentage = detail ? 0.5 : 0.712;
      const width = parentSize.width * percentage;
      return { ...baseStyle, width };
    }
    case '(landscape, true)': {
      const percentage = detail ? 0.5 : 1.0;
      const width = parentSize.width * percentage;
      return { ...baseStyle, width };
    }
    default: {
      const width = parentSize.width;
      return { ...baseStyle, width };
    }
  }
};

const subStyle = (orientation, parentSize, activity, detail) => {
  const baseStyle = { overflow: 'hidden', borderColor: 'blue', borderWidth: 1, zIndex: 1 };
  const display = (detail || !activity) ? 'none' : 'flex';
  const isLandscape = orientation === 'landscape';
  const position = isLandscape ? 'static' : 'absolute';
  const width = isLandscape ? parentSize.width * 0.288 : parentSize.width * 0.44;
  const height = isLandscape ? parentSize.height * 0.25 : width * 3 / 4;
  const right = isLandscape ? 'auto' : 1;
  const bottom = isLandscape ? 'auto' : parentSize.height * 0.6 - width * 3 / 4
  return { ...baseStyle, display, position, width, height, right, bottom };
};

const dStyle = (orientation, layout, parentSize, detail) => {
  const maximize = R.includes(layout, [2, 3]);
  switch (layout) {
    case 1: 
      return { ...mainStyle(orientation, parentSize, FOOTER_HEIGHT, maximize, detail), order: 1 };
    case 2:
      return { ...mainStyle(orientation, parentSize, FOOTER_HEIGHT, maximize, detail), order: 1 };
    case 3:
      return { display: 'none' };
    case 4:
      return { ...subStyle(orientation, parentSize, SUB, detail), order: 3 };
    default:
      return {};
  }
};

const bStyle = (orientation, layout, parentSize, detail) => {
  const maximize = R.includes(layout, [2, 3]);
  return { ...footerStyle(orientation, parentSize, FOOTER_HEIGHT, maximize, detail), order: 2 };
};

const vStyle = (orientation, layout, parentSize, detail) => {
  const maximize = R.includes(layout, [2, 3]);
  switch (layout) {
    case 1:
      return { ...subStyle(orientation, parentSize, SUB, detail), order: 3 };
    case 2:
      return { display: 'none' };
    case 3:
      return { ...mainStyle(orientation, parentSize, FOOTER_HEIGHT, maximize, detail), order: 1 };
    case 4:
      return { ...mainStyle(orientation, parentSize, FOOTER_HEIGHT, maximize, detail), order: 1 };
    default:
      return {};
  }
};

const iStyle = (orientation, layout, parentSize, detail) => {
  switch (layout) {
    case 1:
      return sideStyle(orientation, parentSize, detail);
    case 2:
      return { display: 'none' };
    case 3:
      return { display: 'none' };
    case 4:
      return sideStyle(orientation, parentSize, detail);
    default:
      return {};
  }
};

const sStyle = (orientation, parentSize, detail) => {
  return detailStyle(orientation, parentSize, detail);
};

// mountやunmount等のライフサイクルやコンポーネント自体に状態を持たせたい場合はClassを使用する
class HomePage extends Component {
  state = { orientation: 'landscape', height: 0, width: 0 };

  componentWillMount() {}

  onLayout = event => {
    const { height, width } = event.nativeEvent.layout;
    console.log(width, height);
    const orientation = width > height ? 'landscape' : 'portrait';
    this.setState({ orientation, height, width });
  };

  render() {
    const { width, height } = this.state;

    const containerStyle = {
      position: 'static',
      width: '100%',
      height: '100%',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      // borderColor: 'black',
      // borderWidth: 5,
      flexDirection: 'column',
      flexWrap: 'wrap'
    };

    const widget1Props = {
      no: 'd',
      style: dStyle(this.state.orientation, LAYOUT, { width, height }, DETAIL)
    };

    const widget2Props = {
      no: 'v',
      style: vStyle(this.state.orientation, LAYOUT, { width, height }, DETAIL)
    };

    const widget3Props = {
      no: 'b',
      style: bStyle(this.state.orientation, LAYOUT, { width, height }, DETAIL)
    };

    const widget4Props = {
      no: 'i',
      style: iStyle(this.state.orientation, LAYOUT, { width, height }, DETAIL)
    };
    
    const widget5Props = {
      no: 's',
      style: sStyle(this.state.orientation, { width, height }, DETAIL)
    };

    return (
      <Page>
        <View onLayout={this.onLayout} style={containerStyle}>
          <Widget {...widget1Props} dimensions={dimensionProps(widget1Props.style)} />
          <Widget {...widget2Props} dimensions={dimensionProps(widget2Props.style)} />
          <Widget {...widget3Props} dimensions={dimensionProps(widget3Props.style)} />
          <Widget {...widget4Props} dimensions={dimensionProps(widget4Props.style)} />
          <Widget {...widget5Props} dimensions={dimensionProps(widget5Props.style)} />
        </View>
      </Page>
    );
  }
}

export default HomePage;
