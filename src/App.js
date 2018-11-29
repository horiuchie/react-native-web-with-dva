import dva from 'dva';
import createLoading from 'dva-loading';
import { createMemoryHistory as createHistory } from "history";
import user from './models/user';
import RouterConfig from './routes';

const app = dva({
  history: createHistory(),
  ...createLoading(),
  initialState: {}
});

app.model(user);

app.router(RouterConfig);

const App = app.start();

export default App;
