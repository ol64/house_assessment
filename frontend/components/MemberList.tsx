import React, { useState, useEffect } from "react";
import MemberCard from "./MemberCard";

import "@/styles/MemberList.css";

interface IProps {
  members: Array<any>;
  pageNumber: number;
  changePage: Function;
}

export default function MemberList({ ...props }: IProps) {
  // Determine the max number of items that can be displayed in the page
  const [pageWidth, setPageWidth] = useState<number | undefined>(undefined);
  const cardWidth = 225; // Width defined in css
  const numRows = 2;
  const numCols = pageWidth ? Math.floor(pageWidth / cardWidth) - 1 : 5;
  const itemsPerPage = numRows * numCols;

  const currentPage = props.pageNumber;
  const firstItemIndex = itemsPerPage * (currentPage - 1);
  const lastItemIndex = firstItemIndex + itemsPerPage;
  const currentData = props.members.slice(firstItemIndex, lastItemIndex);

  useEffect(() => {
    // Ensure we use client-side window
    if (typeof window !== "undefined") {
      setPageWidth(window.innerWidth);
    }

    const handleResizeWindow = () => {
      setPageWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResizeWindow);

    return () => {
      window.removeEventListener("resize", handleResizeWindow);
    };
  }, []);

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
