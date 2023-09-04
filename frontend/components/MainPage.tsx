"use client";
import React, { useState } from "react";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  IconDefinition,
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
} from "@/utils/constants";

interface IProps {
  members: Array<Record<string, any>>;
  committees: Array<Record<string, any>>;
}

export default function MainPage({ ...props }: IProps) {
  const [party, setParty] = useState<Record<string, any> | null>(null);
  const [states, setStates] = useState<Array<Record<string, any>> | null>(null);
  const [name, setName] = useState<string>("");
  const [sort, setSort] = useState<Record<string, any> | null>(null);
  const [sortOrder, setSortOrder] = useState<string>("desc");
  const [sortIcon, setSortIcon] = useState<IconDefinition>(faSortAlphaAsc);
  const [pageNumber, setPageNumber] = useState<number>(1);

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

  const handlePartyFilter = (e: Record<string, any>) => {
    setParty(e);
    setPageNumber(1);
  };

  const handleStatesFilter = (e: Record<string, any>[]) => {
    setStates(e);
    setPageNumber(1);
  };

  const handleNameSearch = (e: Record<string, any>) => {
    setName(e.target.value);
    setPageNumber(1);
  };

  // Clear all filters
  const handleReset = () => {
    setParty(null);
    setStates(null);
    setName("");
    setPageNumber(1);
  };

  const handleSort = (e: Record<string, any>) => {
    setSort(e);
    setPageNumber(1);
  };

  const handlePageChange = (newPage: number) => {
    setPageNumber(newPage);
  };

  return (
    <main className="main-content">
      <div className="organize-list">
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
        committees={props.committees}
        pageNumber={pageNumber}
        changePage={handlePageChange}
      />
    </main>
  );
}
