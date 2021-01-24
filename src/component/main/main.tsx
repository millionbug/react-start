import React from 'react'
import Catalogue from '../catalogue/catalogue'
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';

import './main.css';

import Game from '../Game.component/Game';
import TestDiff from '../TestDiff.component';
import TestModal from '../TestModal.component/TestModal';

const catalogueArr = [
  {path: '/test-diff', name: 'test-diff'},
  {path: '/test-modal', name: 'test-modal'},
  {path: '/game', name: 'game'},
]
function main (props: {
  children: PropTypes.ReactComponentLike
}) {
  console.log('你哈哈哈哈哈哈好爽')
  return (
    <div className="main">
      <Catalogue catalogueArr={catalogueArr}></Catalogue>
      <Switch>
        <div className="main-content">
          <Route path='/game' component={Game} ></Route>
          <Route path='/test-diff' component={TestDiff} ></Route>
          <Route path='/test-modal' component={TestModal} ></Route>
        </div>
      </Switch>
    </div>
  )
}
export default main