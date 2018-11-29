import React from 'react';
import { connect } from 'dva';
import { View, TouchableOpacity, ActivityIndicator } from 'react-native';
import Page from '../components/Page';
import Title from '../components/Title';

// mountやunmount等のライフサイクルやコンポーネント自体に状態を持たせる必要がない場合は、
// 関数でコンポーネントを書くことができる。 通称 Stateless Function Component
const LoginPage = ({ loading, onPressLogin }) => {
  return (
    <Page>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {loading ? (
          <ActivityIndicator />
        ) : (
          <TouchableOpacity onPress={onPressLogin}>
            <Title>LoginPage</Title>
          </TouchableOpacity>
        )}
      </View>
    </Page>
  );
};

// vuexで言うところのmapGetters
const mapStateToProps = ({ loading }) => ({
  loading: loading.effects['user/handleLogin']
});

// vuexで言うところのmapActions
const mapDispatchToProps = dispatch => ({
  onPressLogin: () =>
    dispatch({
      type: 'user/handleLogin',
      payload: {}
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
