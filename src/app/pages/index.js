import React, { Component } from 'react';
import Link from 'next/link';
import withRedux from '../hocs/withRedux';

class Index extends Component {
  static async getInitialProps({ req }) {
    const uid = req && req.session && req.session.decodedToken ? req.session.decodedToken.uid : '';

    return { uid };
  }

  render() {
    return (
      <div>
        <h1>NextJS Server Side</h1>
        <ul>
          <li>
            <Link href="/a">
              <a>a</a>
            </Link>
          </li>
          <li>
            <Link href="/b">
              <a>b</a>
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default withRedux(Index);
