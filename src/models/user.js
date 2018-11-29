import { routerRedux } from "dva/router";
import { login } from "../services/user";

export default {
  namespace: "user",
  state: {},
  reducers: {},
  effects: {
    handleLogin
  },
  subscriptions: {
    setup({ history, dispatch }) {
      // こんなこともできる
      history.listen(({ pathname }) => {
        if (pathname === "/home") {
          console.log("HomePageを表示しました");
        }
      });
    }
  }
};

function* handleLogin({ type, payload }, helpers) {
  const { put, call } = helpers;
  const { result } = yield call(login, { userId: 123, password: 456 });
  yield put(routerRedux.push({ pathname: "/home" }));
}
