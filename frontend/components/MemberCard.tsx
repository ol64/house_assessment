"use client";
import "@/styles/MemberCard.css";
import blankPhoto from "@/images/blank_profile.png";
import Image from "next/image";
import { Button, Modal } from "react-bootstrap";
import React, { useState } from "react";
import { getSubcommitteesNames, findCommitteeInfo } from "@/utils/helpers";

interface IProps {
  member: Record<string, any>;
  committees: Record<string, any>[];
}

export default function MemberCard({ ...props }: IProps) {
  const [showAssignments, setShowAssignments] = useState(false);
  const memberInfo = props.member?.["member-info"];
  const committeeAssignments = props.member?.["committee-assignments"];

  const handleShow = () => setShowAssignments(true);
  const handleClose = () => setShowAssignments(false);

  var committeesMap: Record<string, any> = {};
  var committees = committeeAssignments?.committee;
  const subcommittees = committeeAssignments?.subcommittee;

  // Special scenario where committee in xml is an object rather than an array
  if (typeof committees === "object" && !Array.isArray(committees)) {
    committees = [committees];
  }

  if (committees.length) {
    committees.forEach((e) => {
      const comcode = e?.["@comcode"];
      if (comcode) {
        // Convert committee code to name
        const info = findCommitteeInfo(comcode, props.committees);
        const committeeName = info ? info?.["committee-fullname"] : comcode;

        if (memberInfo?.namelist === "Rogers, Mike") {
          console.log("yes");
          console.log(props.member?.["committee-assignments"]);
        }

        var subcommitteesNames = [];
        if (subcommittees && subcommittees.length) {
          // Filter out all the relevant subcommittees and convert subcomcode to name
          subcommitteesNames = getSubcommitteesNames(
            comcode,
            subcommittees,
            props.committees
          );
        }

        committeesMap[committeeName] = subcommitteesNames;
      }
    });
  }
  return (
    <div className="card" data-style="width: 18rem;">
      <center>
        <Image
          className="headshot"
          src={blankPhoto}
          alt="Headshots"
          width={200}
          height={200}
        />
      </center>
      <div className="card-body">
        <h5 className="card-title">{`${memberInfo.firstname} ${memberInfo.lastname}`}</h5>
        <div className="card-text">
          <p>State: {`${memberInfo.state?.["state-fullname"]}`}</p>
          <p>Party: {`${memberInfo.party}`}</p>
          <p>
            Office Room:{" "}
            {`${memberInfo?.["office-room"]} ${memberInfo?.["office-building"]}`}
          </p>
          <p>Number: {`${memberInfo.phone}`}</p>
          <p className="committees" onClick={handleShow}>
            See Committee Assignments
          </p>

          <Modal centered show={showAssignments} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Committee Assignments</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {Object.entries(committeesMap).map((e) => (
                <div key={e[0]}>
                  <h5>{e[0]}</h5>
                  <ul className="subcommittees">
                    {e[1].map((e) => (
                      <li key={e}>{e}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
}
