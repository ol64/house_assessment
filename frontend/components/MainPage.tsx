"use client";
import React, { useState } from 'react';
import MemberList from './MemberList';
import '@/styles/MainPage.css';
import { getMembers, getMembersByName } from '@/utils/helpers';


interface IProps {
  members: Array<any>;
}


export default function MainPage({ ...props}: IProps) {
  const [party, setParty] = useState("all")
  const [name, setName] = useState("")
  
  // Filter based on party
  var filteredMembers = props.members
  if (party != "all") {
    filteredMembers = filteredMembers.filter((e) => e?.['member-info'].party == party)
  }

  // Search by name
  if (name) filteredMembers = getMembersByName(filteredMembers, name)

  return (
    <main className="main-container">
      <div className="filter_options">
        <select className="party_filter" name="party" id="party" onChange={(e) => setParty(e.target.value)}>
          <option value="all">Search by Party</option>
          <option value="D">Democratic</option>
          <option value="R">Republican</option>
        </select>
        <input type="text" placeholder="Search By Name..." onChange={(e) => setName(e.target.value)}/>
      </div>
      <MemberList members={filteredMembers} />
    </main>
  );
}

