import React from 'react';
import { Text } from 'react-native';

const Title = ({ children, style }) => (
  <Text style={{ fontWeight: 'bold', fontSize: 24, ...style }}>{children}</Text>
);

export default Title;
