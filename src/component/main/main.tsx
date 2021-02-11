import React from 'react'
import Catalogue from '../catalogue/catalogue'
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';

import './main.css';

import Game from '../Game.component/Game';
import TestDiff from '../TestDiff.component';
import TestModal from '../TestModal.component/TestModal';
import TestPromise from "../TestPromise.component/TestPromise";
const catalogueArr = [
  {path: '/test-diff', name: 'test-diff'},
  {path: '/test-modal', name: 'test-modal'},
  {path: '/game', name: 'game'},
  {path: '/test-promise', name: 'test-promise'},
]
function main (props: {
  children: PropTypes.ReactComponentLike
}) {
  return (
    <div className="main">
      <Catalogue catalogueArr={catalogueArr}></Catalogue>

      <Switch>
        <div className="main-content">
          <Route path='/game' component={Game} ></Route>
          <Route path='/test-diff' component={TestDiff} ></Route>
          <Route path='/test-modal' component={TestModal} ></Route>
          <Route path='/test-promise' component={TestPromise}></Route>
        </div>
      </Switch>
      
    </div>
  )
}
export default main