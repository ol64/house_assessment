import { MEMBER_API } from "./constants";

/**
 * Returns Member data from API
 * @returns {Promise<Record<string, any>>}
 */
export const fetchMemberData = async (): Promise<Record<string, any>> => {
  const res = await fetch(MEMBER_API);

  if (!res.ok) {
    throw new Error("Unable to fetch member data");
  }

  return res.json() as Record<string, any>;
};

/**
 * Parses API response and returns a list of members
 * @param data - API response
 * @returns {Record<string ,any>[]}
 */
export const getMembers = (
  data: Record<string, any>
): Record<string, any>[] => {
  return data?.MemberData?.members?.member || [];
};

/**
 * Parses API response and returns a list of all committees and subcommittees
 * @param data - API response
 * @returns {Record<string ,any>[]}
 */
export const getCommittees = (
  data: Record<string, any>
): Record<string, any>[] => {
  return data?.MemberData?.committees?.committee || [];
};

// UNUSED
// /**
//  * Parses Member data and returns the member's name
//  * @param member
//  * @returns {string}
//  */
// export const getMemberName = (member: Record<string, any>): string => {
//   return member?.["member-info"]?.namelist || "";
// };

/**
 * Helper method to search for specific members based on Name
 * @param members
 * @param searchedWords
 * @returns {Record<string, any>[]}
 */
export const getMembersByName = (
  members: Record<string, any>[],
  searchedWords: string
): Array<any> => {
  const words: Array<string> = searchedWords.split(" ");
  var filteredMembers = members.filter((e) => {
    // Change namelist into lowercase for easy comparison
    const fullName = e?.["member-info"].namelist;
    if (!fullName) return false;
    const lowerName = fullName.toLowerCase();

    // Check if the searched words are in the member's full name
    for (const word of words) {
      const lowerWord = word.toLowerCase();
      if (lowerName.indexOf(lowerWord) == -1) return false;
    }
    return true;
  });

  return filteredMembers;
};

/**
 * Helper method to compare words according to sort preferences
 * @param wordOne
 * @param wordTwo
 * @param sortOrder
 * @returns {number}
 */
export const compareWords = (
  wordOne: string,
  wordTwo: string,
  sortOrder: string
) => {
  if (wordOne === "" && wordTwo !== "") {
    return 1;
  } else if (wordOne !== "" && wordTwo === "") {
    return -1;
  } else if (sortOrder === "desc") {
    return wordOne.localeCompare(wordTwo);
  } else {
    return wordTwo.localeCompare(wordOne);
  }
};

/**
 * Helper method to find information about the committee given
 * committee or subcommittee code
 * @param code
 * @param committeesInfo
 * @returns {Record<string,any>}
 */
export const findCommitteeInfo = (
  code: string,
  committeesInfo: Record<string, any>[]
) => committeesInfo.find((e) => e?.["@comcode"].includes(code.slice(0, 2)));

/**
 * Helper method to return all relevant subcommittees by Name given
 * committee code and list of subcommittees assignments for a member
 * @param comcode
 * @param subcommittees
 * @param committeesInfo
 * @returns {Record<string,any>[]}
 */
export const getSubcommitteesNames = (
  comcode: string,
  subcommittees: Record<string, any>[],
  committeesInfo: Record<string, any>[]
) => {
  return subcommittees
    .filter((e) => {
      const subcomcode = e?.["@subcomcode"];
      return subcomcode ? subcomcode.includes(comcode.slice(0, 2)) : false;
    })
    .map((e) => {
      const committeeInfo = findCommitteeInfo(
        e?.["@subcomcode"],
        committeesInfo
      );

      const subcommittee =
        committeeInfo && committeeInfo?.subcommittee
          ? committeeInfo?.subcommittee.find(
              (subcommittee) =>
                subcommittee?.["@subcomcode"] === e?.["@subcomcode"]
            )
          : {};

      return subcommittee
        ? subcommittee?.["subcommittee-fullname"]
        : e?.["@subcomcode"];
    });
};
