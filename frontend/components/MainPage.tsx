"use client";
import React, { useState } from "react";
import Select from "react-select";
import MemberList from "./MemberList";
import "@/styles/MainPage.css";
import { getMembers, getMembersByName } from "@/utils/helpers";
import { OPTIONS_PARTIES, OPTIONS_STATES } from "@/utils/constants";

interface IProps {
  members: Array<any>;
}

export default function MainPage({ ...props }: IProps) {
  const [party, setParty] = useState<any | null>(null);
  const [states, setStates] = useState<any | null>(null);
  const [name, setName] = useState<any | null>(null);

  // Filter by party
  var filteredMembers = props.members;
  if (party && Object.keys(party).length && party.value != "NA") {
    filteredMembers = filteredMembers.filter(
      (e) => e?.["member-info"].party == party.value
    );
  }

  // Filter by states
  if (states && states.length) {
    filteredMembers = filteredMembers.filter((e) =>
      states.some(
        (state) => state.value == e?.["member-info"].state?.["state-fullname"]
      )
    );
  }

  // Search by name
  if (name) filteredMembers = getMembersByName(filteredMembers, name);

  // Clear all filters
  const handleReset = () => {
    setParty(null);
    setStates(null);
    setName(null);
  };

  return (
    <main className="main-container">
      <div className="filter_options">
        <Select
          className="party_filter"
          value={party}
          options={OPTIONS_PARTIES}
          placeholder="Search by Party"
          onChange={(e) => setParty(e)}
        />
        <div>
          <Select
            isMulti
            name="states"
            value={states}
            options={OPTIONS_STATES}
            className={"basic-multi-select states_filter"}
            classNamePrefix="select"
            placeholder="Select States..."
            onChange={(e) => setStates(e)}
          />
        </div>
        <input
          value={name}
          type="text"
          placeholder="Search by Name..."
          onChange={(e) => setName(e.target.value)}
        />
        <button className="clear_filter" onClick={handleReset}>
          {" "}
          Clear Filters{" "}
        </button>
      </div>
      <MemberList members={filteredMembers} />
    </main>
  );
}
