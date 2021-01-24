import { Route, Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import ReactDom from 'react-dom';
import React from 'react';

import Main from './component/main'

const history = createBrowserHistory();

ReactDom.render(
<Router history={history}>
    <Route path="/" component={Main}></Route>
</Router>, document.body)