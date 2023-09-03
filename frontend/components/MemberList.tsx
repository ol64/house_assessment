import React, { useState } from "react";
import MemberCard from "./MemberCard";

import "@/styles/MemberList.css";

interface IProps {
  members: Array<any>;
  itemsPerPage: number;
  pageNumber: number;
  changePage: Function;
}

export default function MemberList({ ...props }: IProps) {
  const itemsPerPage = props.itemsPerPage;
  const currentPage = props.pageNumber;
  const firstItemIndex = itemsPerPage * (currentPage - 1);
  const lastItemIndex = firstItemIndex + itemsPerPage;
  const currentData = props.members.slice(firstItemIndex, lastItemIndex);

  return (
    <div className="page">
      <ol className="member_list">
        {currentData.map((member: any) => (
          <MemberCard key={member.statedistrict} member={member} />
        ))}
      </ol>
      <div className="pagination">
        <button
          onClick={() => props.changePage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          onClick={() => props.changePage(currentPage + 1)}
          disabled={lastItemIndex >= props.members.length}
        >
          Next
        </button>
      </div>
    </div>
  );
}
