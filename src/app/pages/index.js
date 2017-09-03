import React from 'react';
import Link from 'next/link';

const Index = props => (
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

Index.getInitialProps = async ({ req }) => {
  const user = req && req.session ? req.session.decodedToken : null;

  console.log('INDEX SESSION', req.session);

  return { user };
};

export default Index;
