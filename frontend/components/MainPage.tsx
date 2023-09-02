"use client";
import React, { useState } from 'react';
import MemberList from './MemberList';
import '@/styles/MainPage.css';
import { getMembers } from '@/utils/helpers';


interface IProps {
  members: Array<any>;
}


export default function MainPage({ ...props}: IProps) {
  const [party, setParty] = useState("all")
  
  // filter based on party
  var filtered_members = props.members
  if (party != "all") {
    filtered_members = filtered_members.filter((e) => e?.['member-info'].party == party)
  }

  return (
    <main className="main-container">
      <div className="party-filter">
        <label data-for="party"> Party: </label>
        <select name="party" id="party" onChange={(e) => setParty(e.target.value)}>
          <option value="all">All Parties</option>
          <option value="D">Democratic</option>
          <option value="R">Republican</option>
        </select>
      </div>
      <MemberList members={filtered_members} />
    </main>
  );
}

