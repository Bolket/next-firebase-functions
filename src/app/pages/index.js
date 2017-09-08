import React from 'react';
import Link from 'next/link';

const Index = props => (
  <div>
    <h1>NextJS Server Side</h1>
    {uid !== '' && <p>{`User uid: ${props.uid}`}</p>}
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
  const uid =
    req && req.session && req.session.decodedToken
      ? req.session.decodedToken.uid
      : '';

  return { uid };
};

export default Index;
