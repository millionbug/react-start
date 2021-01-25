import { Route, Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import ReactDom from 'react-dom';
import React from 'react';

import Main from './component/main'

const history = createBrowserHistory();

const rootDiv = document.createElement('div');
rootDiv.id = 'root';

document.body.appendChild(rootDiv)

ReactDom.render(
<Router history={history}>
    <Route path="/" component={Main}></Route>
</Router>, rootDiv);