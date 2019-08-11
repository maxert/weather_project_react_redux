import React from "react";
import ReactDOM from "react-dom";
import "./css/new.scss";
import * as serviceWorker from "./serviceWorker";
import "bootstrap";
import "bootstrap/js/dist/util";
import "bootstrap/js/dist/modal";
import "bootstrap/js/dist/dropdown";
import Weather from "./react-component/weather";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers/concatReduce";
import { composeWithDevTools } from "redux-devtools-extension";
import { default as thunk } from "redux-thunk";
import {Router as BrowserRouter , Route,Switch } from "react-router-dom";
import { syncHistoryWithStore } from "react-router-redux";
import { createBrowserHistory } from "history";
import ListCity from "./react-component/ListCity";
import {saveState} from "./react-component/localstorage";

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
const history = syncHistoryWithStore(createBrowserHistory(), store);
const NoMatch = ({ location }) => (
  <div className='erorr_404 section_center d-flex align-items-center justify-content-center'>
    <h3>
     404: <code>{location.pathname}</code>
    </h3>
  </div>
);
store.subscribe (() => { 
  saveState ({ 
    list: store.getState()
  }); 
});
ReactDOM.render(
  (<Provider store={store}>
  <BrowserRouter history={history}>
  <Switch>
  <Route exact path='/' component={Weather}></Route>
  <Route exact path='/list/:id' component={ListCity}></Route>
  <Route component={NoMatch} />
    </Switch>
    </BrowserRouter>
  </Provider>),
  document.getElementById("root")|| document.createElement('div'),
);

serviceWorker.unregister();
