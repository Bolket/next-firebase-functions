import React from 'react';
import Link from 'next/link';

export default () =>
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
  </div>;
