import React, { Component } from 'react';
import * as R from 'ramda';
import { View, Text } from 'react-native';
import Page from '../components/Page';

const LAYOUT = 1;
const SPLIT = true;
const SUB = true;
const FOOTER_SIZE = { width: '100%', height: 30 };

const Widget = ({ no, style }) => (
  <View
    style={{
      height: '100%',
      width: '100%',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      ...style
    }}
  >
    <Text>Widget No.{no}</Text>
  </View>
);

const interactionStyle = (orientation, parentSize) => ({
  flexGrow: orientation === 'landscape' ? 1 : 0,
  order: 4,
  borderColor: 'green',
  borderWidth: 1,
  width:
    orientation === 'landscape'
      ? parentSize.width * 0.288
      : parentSize.width,
  height:
    orientation === 'landscape'
      ? parentSize.height * 0.75
      : parentSize.height * 0.6
});

const pupupStyle = (orientation, parentSize) => ({
  flexGrow: 0,
  order: 4,
  borderColor: 'cyan',
  borderWidth: 1,
  zIndex: 2,
  width: orientation === 'landscape' ? parentSize.width * 0.5 : parentSize.width,
  height: orientation === 'landscape' ? parentSize.height : parentSize.height * 0.6
});

const mainStyle = (orientation, parentSize, maximize, split) => {
  const cond = `(${orientation}, ${maximize})`;
  console.log(cond, split);
  const baseStyle = { borderColor: 'red', borderWidth: 1, flexGrow: 1, overflow: 'hidden' };
  switch (cond) {
    case '(landscape, false)': {
      const percentage = split ? 0.5 : 0.712;
      const width = parentSize.width * percentage;
      const height = parentSize.height - 60;
      return { ...baseStyle, width, height };
    }
    case '(landscape, true)': {
      const percentage = split ? 0.5 : 1.0;
      const width = parentSize.width * percentage;
      const height = parentSize.height - 60;
      return { ...baseStyle, width, height };
    }
    default: {
      const percentage = 0.4;  // flexGrowで伸びるから固定値でOK
      // const flexGrow = split ? 0 : 1;
      const width = parentSize.width;
      const height = parentSize.height * percentage - 60;
      return { ...baseStyle, width, height/*, flexGrow*/ };
    }
  }
};

const footerStyle = (orientation, parentSize, footerSize, maximize, split) => {
  const cond = `(${orientation}, ${maximize})`;
  const baseStyle = { height: footerSize.height, borderColor: 'yellow', borderWidth: footerSize.height < 1 ? 0 : 2 };
  switch (cond) {
    case '(landscape, false)': {
      const percentage = split ? 0.5 : 0.712;
      const width = parentSize.width * percentage;
      return { ...baseStyle, width };
    }
    case '(landscape, true)': {
      const percentage = split ? 0.5 : 1.0;
      const width = parentSize.width * percentage;
      return { ...baseStyle, width };
    }
    default: {
      const width = parentSize.width;
      return { ...baseStyle, width };
    }
  }
};

const subStyle = (orientation, parentSize, activity) => {
  const baseStyle = { overflow: 'hidden', borderColor: 'blue', borderWidth: 1, zIndex: 1 };
  const display = activity ? 'flex' : 'none';
  const isLandscape = orientation === 'landscape';
  const position = isLandscape ? 'static' : 'absolute';
  const width = isLandscape ? parentSize.width * 0.288 : parentSize.width * 0.44;
  const height = isLandscape ? parentSize.height * 0.25 : width * 3 / 4;
  const right = isLandscape ? 'auto' : 1;
  const bottom = isLandscape ? 'auto' : parentSize.height * 0.6 - width * 3 / 4
  return { ...baseStyle, display, position, width, height, right, bottom };
};

const dStyle = (orientation, layout, parentSize, split) => {
  const maximize = R.includes(layout, [2, 3]);
  switch (layout) {
    case 1: 
      return { ...mainStyle(orientation, parentSize, maximize, split), order: 1 };
    case 2:
      return { ...mainStyle(orientation, parentSize, maximize, split), order: 1 };
    case 3:
      return { display: 'none' };
    case 4:
      return { ...subStyle(orientation, parentSize, SUB), order: 3 };
    default:
      return {};
  }
};

const bStyle = (orientation, layout, parentSize, split) => {
  const maximize = R.includes(layout, [2, 3]);
  return { ...footerStyle(orientation, parentSize, FOOTER_SIZE, maximize, split), order: 2 };
};

const vStyle = (orientation, layout, parentSize, split) => {
  const maximize = R.includes(layout, [2, 3]);
  switch (layout) {
    case 1:
      return { ...subStyle(orientation, parentSize, SUB), order: 3/*, display: 'none'*/ };
    case 2:
      return { display: 'none' };
    case 3: {
      return { ...mainStyle(orientation, parentSize, maximize, split), order: 1 };
    }
    case 4: {
      return { ...mainStyle(orientation, parentSize, maximize, split), order: 1 };
    }
    default:
      return {};
  }
};

const iStyle = (orientation, layout, parentSize) => {
  switch (layout) {
    case 1:
      return interactionStyle(orientation, parentSize);
    case 2:
      return { display: 'none' };
    case 3:
      return { display: 'none' };
    case 4:
      return interactionStyle(orientation, parentSize);
    default:
      return {};
  }
};

const sStyle = (orientation, parentSize, split) => {
  return split ? pupupStyle(orientation, parentSize) : { display: 'none' };
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
      style: dStyle(this.state.orientation, LAYOUT, { width, height }, SPLIT)
    };

    const widget2Props = {
      no: 'v',
      style: vStyle(this.state.orientation, LAYOUT, { width, height }, SPLIT)
    };

    const widget3Props = {
      no: 'b',
      style: bStyle(this.state.orientation, LAYOUT, { width, height }, SPLIT)
    };

    const widget4Props = {
      no: 'i',
      style: iStyle(this.state.orientation, LAYOUT, { width, height })
    };
    
    const widget5Props = {
      no: 's',
      style: sStyle(this.state.orientation, { width, height }, SPLIT)
    };

    return (
      <Page>
        <View onLayout={this.onLayout} style={containerStyle}>
          <Widget {...widget1Props} />
          <Widget {...widget2Props} />
          <Widget {...widget3Props} />
          <Widget {...widget4Props} />
          <Widget {...widget5Props} />
        </View>
      </Page>
    );
  }
}

export default HomePage;
