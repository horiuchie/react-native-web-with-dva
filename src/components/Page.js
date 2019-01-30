import React from 'react';
import { View } from 'react-native';

const Page = ({ children, style }) => (
  <View style={{ height: '100vh', width: '100%', ...style }}>{children}</View>
);

export default Page;
