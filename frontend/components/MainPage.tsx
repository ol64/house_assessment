"use client";
import React, { useState } from "react";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  IconDefinition,
  faSortAlphaAsc,
  faSortAlphaDesc,
} from "@fortawesome/free-solid-svg-icons";
import {
  OPTIONS_PARTIES,
  OPTIONS_STATES,
  OPTIONS_SORT,
} from "@/utils/constants";
import { getMembersByName, compareWords } from "@/utils/helpers";
import MemberList from "./MemberList";

import "@/styles/MainPage.css";

interface IProps {
  members: Record<string, any>[];
  committees: Record<string, any>[];
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
  if (party && party.value != "NA") {
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
  if (sort) {
    const category = sort.value;

    // category-state needs an extra layer of traversal
    if (category === "state") {
      filteredMembers.sort((a, b) => {
        if (a && b) {
          const stateOne = a?.["member-info"].state?.["state-fullname"] || "";
          const stateTwo = b?.["member-info"].state?.["state-fullname"] || "";
          return compareWords(stateOne, stateTwo, sortOrder);
        }
      });
    } else {
      // straightforward traversal for party and name
      filteredMembers.sort((a, b) => {
        if (a && b) {
          const wordOne = a?.["member-info"][category] || "";
          const wordTwo = b?.["member-info"][category] || "";
          return compareWords(wordOne, wordTwo, sortOrder);
        }
      });
    }
  }

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
    setSort(null);
    setSortOrder("desc");
    setSortIcon(faSortAlphaAsc);
    setPageNumber(1);
  };

  const handleSort = (e: Record<string, any>) => {
    setSort(e);
    setPageNumber(1);
  };

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
