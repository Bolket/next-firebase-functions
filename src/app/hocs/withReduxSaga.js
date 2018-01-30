import React, { Component } from 'react';
import { END } from 'redux-saga';
import { CLIENT_ONLY } from '../actions/actionTypes';

function withReduxSaga(Target) {
  class WrappedComponent extends Component {
    static async getInitialProps(ctx) {
      const { store, isServer } = ctx;

      let props;
      if (Target.getInitialProps) {
        props = await Target.getInitialProps(ctx);
      }

      if (isServer) {
        store.dispatch(END);
        await store.sagaTask.done;
      }

      return props;
    }

    componentDidMount() {
      this.props.dispatch({ type: CLIENT_ONLY });
    }

    render() {
      return <Target {...this.props} />;
    }
  }

  return WrappedComponent;
}

export default withReduxSaga;
