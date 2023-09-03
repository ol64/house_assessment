"use client";
import React, { useState } from "react";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSortAlphaAsc,
  faSortAlphaDesc,
} from "@fortawesome/free-solid-svg-icons";

import MemberList from "./MemberList";
import "@/styles/MainPage.css";
import { getMembersByName } from "@/utils/helpers";
import {
  OPTIONS_PARTIES,
  OPTIONS_STATES,
  OPTIONS_SORT,
  ITEMS_PER_PAGE,
} from "@/utils/constants";

interface IProps {
  members: Array<any>;
}

export default function MainPage({ ...props }: IProps) {
  const [party, setParty] = useState<any | null>(null);
  const [states, setStates] = useState<any | null>(null);
  const [name, setName] = useState<any | null>(null);
  const [sort, setSort] = useState<any | null>(null);
  const [sortOrder, setSortOrder] = useState("desc");
  const [sortIcon, setSortIcon] = useState(faSortAlphaAsc);
  const [pageNumber, setPageNumber] = useState(1);

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

  // Sort
  // TODO: traverse through the json file more efficiently
  // TODO: create helper methods for repeating code
  if (sort) {
    const category = sort.value;

    // state needs an extra layer of traversal
    if (category === "state") {
      filteredMembers.sort((a, b) => {
        if (a && b) {
          const stateOne = a?.["member-info"].state?.["state-fullname"] || "";
          const stateTwo = b?.["member-info"].state?.["state-fullname"] || "";
          if (stateOne === "" && stateTwo !== "") {
            return 1;
          } else if (stateOne !== "" && stateTwo === "") {
            return -1;
          } else if (sortOrder === "desc") {
            return stateOne.localeCompare(stateTwo);
          } else {
            return stateTwo.localeCompare(stateOne);
          }
        }
      });
    } else {
      // straightforward traversal for party and name
      filteredMembers.sort((a, b) => {
        if (a && b) {
          const wordOne = a?.["member-info"][category] || "";
          const wordTwo = b?.["member-info"][category] || "";
          if (wordOne === "" && wordTwo !== "") {
            return 1;
          } else if (wordOne !== "" && wordTwo === "") {
            return -1;
          } else if (sortOrder === "desc") {
            return wordOne.localeCompare(wordTwo);
          } else {
            return wordTwo.localeCompare(wordOne);
          }
        }
      });
    }
  }

  // Sort Asc or Desc according to toggle
  const handleSortOrder = () => {
    if (sortOrder === "desc") {
      setSortOrder("asc");
      setSortIcon(faSortAlphaAsc);
    } else {
      setSortOrder("desc");
      setSortIcon(faSortAlphaDesc);
    }
  };

  const handlePartyFilter = (e) => {
    setParty(e);
    setPageNumber(1);
  };

  const handleStatesFilter = (e) => {
    setStates(e);
    setPageNumber(1);
  };

  const handleNameSearch = (e) => {
    setName(e.target.value);
    setPageNumber(1);
  };

  // Clear all filters
  const handleReset = () => {
    setParty(null);
    setStates(null);
    setName(null);
    setPageNumber(1);
  };

  const handleSort = (e) => {
    setSort(e);
    setPageNumber(1);
  };

  const handlePageChange = (newPage: number) => {
    setPageNumber(newPage);
  };

  return (
    <main className="main-container">
      <div className="list">
        <div className="filter_options">
          <Select
            className="party_filter"
            value={party}
            options={OPTIONS_PARTIES}
            placeholder="Search by Party"
            onChange={handlePartyFilter}
          />

          <Select
            isMulti
            value={states}
            options={OPTIONS_STATES}
            className={"basic-multi-select states_filter"}
            placeholder="Select States..."
            onChange={handleStatesFilter}
          />

          <input
            value={name}
            type="text"
            placeholder="Search by Name..."
            onChange={handleNameSearch}
          />

          <button className="clear_filter" onClick={handleReset}>
            Clear Filters
          </button>
        </div>

        <div className="sort">
          <Select
            className="sort_by"
            value={sort}
            options={OPTIONS_SORT}
            placeholder="Sort By:"
            onChange={handleSort}
          />
          <FontAwesomeIcon
            onClick={handleSortOrder}
            className="toggle_sort"
            icon={sortIcon}
          />
        </div>
      </div>
      <MemberList
        members={filteredMembers}
        itemsPerPage={ITEMS_PER_PAGE}
        pageNumber={pageNumber}
        changePage={handlePageChange}
      />
    </main>
  );
}
