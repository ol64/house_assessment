import React from 'react';
import MemberList from '@/components/MemberList';
import { fetchMemberData } from '@/utils/helpers';

import '@/styles/page.css';

export default async function App() {
  const data = await fetchMemberData();

  return (
    <main className="main-container">
      <header>
        <h1>LCS Programming Exercise</h1>
      </header>
      <MemberList members={data} />
    </main>
  );
}

