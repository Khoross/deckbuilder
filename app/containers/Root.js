// @flow
import React, { Component } from 'react';
import {StoreContext} from 'redux-react-hook';
import type { Store } from '../reducers/types';
import Routes from '../Routes';

type Props = {
  store: Store,
  history: {}
};

export default class Root extends Component<Props> {
  render() {
    const { store, history } = this.props;
    return (
      <StoreContext.Provider value={store}>
        <Routes />
      </StoreContext.Provider>
    );
  }
}
